import { ensureAnonymousSession, savePushSubscription, disablePushSubscription } from './supabase';

// The VAPID public key — safe to expose client-side, this is its intended use.
const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;

// Converts a base64 string to a Uint8Array (required by the push API).
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

// Returns true if the browser supports push notifications.
export function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

// Returns the current notification permission state.
export function getNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission; // 'default' | 'granted' | 'denied'
}

// Full enable flow:
// 1. Ensure anonymous Supabase session exists for this device
// 2. Request notification permission from the browser
// 3. Subscribe to push via the service worker
// 4. Save the subscription + preferred time to Supabase
// Returns { success: boolean, error?: string }
export async function enableNotifications(notifyTime, timezone) {
  if (!isPushSupported()) {
    return { success: false, error: 'push_unsupported' };
  }
  if (!VAPID_PUBLIC_KEY) {
    console.error('VAPID public key missing — check REACT_APP_VAPID_PUBLIC_KEY env var');
    return { success: false, error: 'vapid_missing' };
  }

  try {
    // Step 1 — anonymous session
    console.log('Step 1: Getting anonymous session...');
    const userId = await ensureAnonymousSession();
    console.log('Step 1 result — userId:', userId);
    if (!userId) return { success: false, error: 'auth_failed' };

    // Step 2 — permission
    console.log('Step 2: Requesting notification permission...');
    const permission = await Notification.requestPermission();
    console.log('Step 2 result — permission:', permission);
    if (permission !== 'granted') {
      return { success: false, error: 'permission_denied' };
    }

    // Step 3 — push subscription via service worker
    console.log('Step 3: Subscribing to push manager...');
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    console.log('Step 3 result — subscription endpoint:', subscription.endpoint);

    // Step 4 — save to Supabase
    console.log('Step 4: Saving subscription to Supabase...');
    await savePushSubscription(userId, subscription, notifyTime, timezone);
    console.log('Step 4 complete — subscription saved');

    return { success: true };
  } catch (err) {
    console.error('enableNotifications failed at step above:', err);
    return { success: false, error: err.message };
  }
}

// Disables notifications — unsubscribes from push manager and marks
// the row in Supabase as disabled (we keep the row for easy re-enabling).
export async function disableNotifications() {
  try {
    const userId = await ensureAnonymousSession();

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) await subscription.unsubscribe();

    if (userId) await disablePushSubscription(userId);

    return { success: true };
  } catch (err) {
    console.error('disableNotifications failed:', err);
    return { success: false, error: err.message };
  }
}

// Gets the user's timezone automatically — falls back to London if unavailable.
export function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London';
  } catch {
    return 'Europe/London';
  }
}
