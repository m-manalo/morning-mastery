// Vercel Serverless Function — called by the cron job daily.
// Finds all enabled subscriptions whose notify_time matches the current
// UTC minute (adjusted for each user's timezone), and sends them a push.
const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role — bypasses RLS, server-side only
);

const NOTIFICATION_PAYLOAD = JSON.stringify({
  title: 'Morning Mastery',
  body: "Your daily 5 questions are ready. 3 minutes, then you're done ☀️",
  icon: '/icons/icon-192.png',
  badge: '/icons/icon-192.png',
  tag: 'daily-reminder',
  renotify: false,
  data: { url: '/' }
});

module.exports = async function handler(req, res) {
  // Protect the endpoint — only Vercel's cron (or an explicit secret) can trigger it
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = new Date();
  const currentHour = now.getUTCHours().toString().padStart(2, '0');
  const currentMinute = now.getUTCMinutes().toString().padStart(2, '0');
  const currentUTCTime = `${currentHour}:${currentMinute}:00`;

  console.log(`Cron fired at UTC ${currentUTCTime}`);

  // Fetch all enabled subscriptions
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('enabled', true);

  if (error) {
    console.error('Failed to fetch subscriptions:', error);
    return res.status(500).json({ error: error.message });
  }

  if (!subscriptions?.length) {
    return res.status(200).json({ sent: 0, message: 'No active subscriptions' });
  }

  // Filter to subscriptions whose local time matches the current UTC minute,
  // accounting for each subscriber's timezone.
  const toNotify = subscriptions.filter(sub => {
    try {
      const localTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: sub.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      return localTime === sub.notify_time;
    } catch {
      // Invalid timezone — skip rather than crash
      return false;
    }
  });

  console.log(`${toNotify.length} of ${subscriptions.length} subscriptions match current time`);

  // Send pushes in parallel, collect results
  const results = await Promise.allSettled(
    toNotify.map(async sub => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          NOTIFICATION_PAYLOAD
        );
        return { userId: sub.user_id, status: 'sent' };
      } catch (err) {
        // 410 Gone = subscription expired/invalid — disable it to stop retrying
        if (err.statusCode === 410) {
          await supabase
            .from('push_subscriptions')
            .update({ enabled: false })
            .eq('user_id', sub.user_id);
          return { userId: sub.user_id, status: 'expired' };
        }
        return { userId: sub.user_id, status: 'failed', error: err.message };
      }
    })
  );

  const sent = results.filter(r => r.value?.status === 'sent').length;
  const expired = results.filter(r => r.value?.status === 'expired').length;
  const failed = results.filter(r => r.value?.status === 'failed').length;

  console.log(`Results: ${sent} sent, ${expired} expired, ${failed} failed`);
  return res.status(200).json({ sent, expired, failed });
};
