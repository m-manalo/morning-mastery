import { createClient } from '@supabase/supabase-js';

// These env vars are injected by Vercel at build time.
// For local dev, create a .env.local file with these values.
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase env vars not set — backend features will be unavailable.');
}

export const supabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Store the session in localStorage so it survives page refreshes
      storage: window.localStorage,
    }
  }
);

// Signs in anonymously (creates an anonymous user on first call, reuses on
// subsequent calls since the session is persisted in localStorage).
// Returns the user ID, which we use to tie push subscriptions to this device.
export async function ensureAnonymousSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) return session.user.id;

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.user?.id || null;
  } catch (err) {
    console.warn('Anonymous auth failed:', err.message);
    return null;
  }
}

// Saves or updates this device's push subscription in the database.
export async function savePushSubscription(userId, subscription, notifyTime, timezone) {
  const sub = subscription.toJSON();
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({
      user_id: userId,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
      notify_time: notifyTime,
      timezone: timezone,
      enabled: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) throw error;
}

// Updates just the notify_time and timezone for an existing subscription.
export async function updateNotifyTime(userId, notifyTime, timezone) {
  const { error } = await supabase
    .from('push_subscriptions')
    .update({ notify_time: notifyTime, timezone, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
}

// Disables notifications for this device (keeps the row but sets enabled=false).
export async function disablePushSubscription(userId) {
  const { error } = await supabase
    .from('push_subscriptions')
    .update({ enabled: false, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
}

// Fetches this device's current push subscription settings, if any.
export async function getPushSubscription(userId) {
  const { data, error } = await supabase
    .from('push_subscriptions')
    .select('notify_time, timezone, enabled')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}
