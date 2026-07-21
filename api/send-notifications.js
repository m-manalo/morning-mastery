// Vercel Serverless Function — triggered once daily by GitHub Actions at 07:00 UTC.
// Sends push notifications to all enabled subscriptions.
// Per-minute time matching was removed since GitHub Actions free tier
// doesn't reliably support per-minute schedules — runs every few hours instead.
const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const NOTIFICATION_PAYLOAD = JSON.stringify({
  title: 'Morning Mastery',
  body: "Time for your 5 daily questions — takes about 3 minutes ☀️",
  icon: '/icons/icon-192.png',
  badge: '/icons/icon-192.png',
  tag: 'daily-reminder',
  renotify: false,
  data: { url: '/' }
});

module.exports = async function handler(req, res) {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = new Date();
  console.log(`Cron fired at UTC ${now.toISOString()} — sending to all enabled subscriptions`);

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

  console.log(`Sending to ${subscriptions.length} active subscription(s)`);

  const results = await Promise.allSettled(
    subscriptions.map(async sub => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          NOTIFICATION_PAYLOAD
        );
        return { userId: sub.user_id, status: 'sent' };
      } catch (err) {
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
