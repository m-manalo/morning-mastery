// Development-only endpoint to send a test push to a specific user.
// Protected by CRON_SECRET. Remove or protect further before going public.
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

module.exports = async function handler(req, res) {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get all enabled subscriptions and send a test push to each
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('enabled', true);

  if (error) return res.status(500).json({ error: error.message });
  if (!subscriptions?.length) return res.status(200).json({ message: 'No subscriptions found' });

  const payload = JSON.stringify({
    title: 'Test — Morning Mastery',
    body: 'Notifications are working! Your daily reminder is set up correctly ✓',
    icon: '/icons/icon-192.png',
    tag: 'test',
    data: { url: '/' }
  });

  const results = await Promise.allSettled(
    subscriptions.map(sub =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      )
    )
  );

  const sent = results.filter(r => r.status === 'fulfilled').length;
  return res.status(200).json({ sent, total: subscriptions.length });
};
