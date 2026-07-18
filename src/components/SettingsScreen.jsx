import { useState, useEffect } from 'react';
import { SUBJECT_CONFIG } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP } from '../utils/gameUtils';
import { getSoundEnabled, setSoundEnabled, playSound } from '../utils/sound';
import { isPushSupported, getNotificationPermission, enableNotifications, disableNotifications, getUserTimezone } from '../utils/notifications';
import { ensureAnonymousSession, getPushSubscription, updateNotifyTime } from '../utils/supabase';

export default function SettingsScreen({ subjects, streak, stats, onHome, onRedoCalibration }) {
  const [soundOn, setSoundOn]           = useState(getSoundEnabled());
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifTime, setNotifTime]       = useState('08:00');
  const [notifStatus, setNotifStatus]   = useState('idle'); // idle | loading | success | error
  const [notifError, setNotifError]     = useState('');
  const [userId, setUserId]             = useState(null);
  const pushSupported = isPushSupported();

  const totalAnswered = stats?.totalAnswered || 0;
  const totalCorrect = stats?.totalCorrect || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const longestStreak = Math.max(stats?.longestStreak || 0, streak?.count || 0);

  // On mount, check existing notification state
  useEffect(() => {
    async function loadNotifState() {
      if (!pushSupported) return;
      const permission = getNotificationPermission();
      if (permission !== 'granted') return;

      const uid = await ensureAnonymousSession();
      setUserId(uid);
      if (!uid) return;

      const sub = await getPushSubscription(uid).catch(() => null);
      if (sub) {
        setNotifEnabled(sub.enabled);
        setNotifTime(sub.notify_time?.slice(0, 5) || '08:00');
      }
    }
    loadNotifState();
  }, [pushSupported]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('tap');
  }

  async function handleNotifToggle() {
    if (notifStatus === 'loading') return;
    setNotifStatus('loading');
    setNotifError('');

    if (notifEnabled) {
      // Turn off
      const result = await disableNotifications();
      if (result.success) {
        setNotifEnabled(false);
        setNotifStatus('idle');
      } else {
        setNotifError('Failed to disable. Please try again.');
        setNotifStatus('error');
      }
    } else {
      // Turn on
      const timezone = getUserTimezone();
      const timeForDB = notifTime + ':00'; // HH:MM -> HH:MM:SS for the time column
      const result = await enableNotifications(timeForDB, timezone);
      if (result.success) {
        setNotifEnabled(true);
        setNotifStatus('success');
        const uid = await ensureAnonymousSession();
        setUserId(uid);
        setTimeout(() => setNotifStatus('idle'), 2500);
      } else {
        const msgs = {
          push_unsupported: 'Push notifications aren\'t supported on this browser.',
          permission_denied: 'You\'ve blocked notifications — enable them in your browser settings.',
          vapid_missing: 'Notification service not configured yet — env vars may be missing.',
          auth_failed: 'Could not connect to Supabase. Check env vars and anonymous auth setting.',
        };
        setNotifError(msgs[result.error] || `Error: ${result.error}`);
        setNotifStatus('error');
      }
    }
  }

  async function handleTimeChange(e) {
    const newTime = e.target.value;
    setNotifTime(newTime);
    if (!notifEnabled || !userId) return;
    try {
      await updateNotifyTime(userId, newTime + ':00', getUserTimezone());
    } catch {
      // Silent fail — time will resync on next toggle
    }
  }

  return (
    <div className="screen-inner">
      <div className="quiz-top-row">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <span className="t-secondary small">Settings</span>
      </div>

      <p className="app-title" style={{ marginBottom: '1rem' }}>Your stats</p>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{stats?.daysCompleted || 0}</p>
          <p className="t-secondary small">days completed</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">{longestStreak} 🔥</p>
          <p className="t-secondary small">longest streak</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">{accuracy}%</p>
          <p className="t-secondary small">accuracy</p>
        </div>
      </div>

      <p className="t-secondary small center" style={{ marginBottom: '1.25rem' }}>
        {totalAnswered} questions answered, {totalCorrect} correct, all-time
      </p>

      <div className="divider" />

      <p className="section-label">your levels</p>
      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const level = getLevelFromXP(xp);
        const sc = SUBJECT_COLORS[key];
        return (
          <div key={key} className="rc-row">
            <div className="rc-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
              {cfg.label.slice(0, 2)}
            </div>
            <span className="rc-name" style={{ flex: 1 }}>{cfg.label}</span>
            <span className="lv-badge" style={{ background: sc.bg, color: sc.color }}>Level {level}</span>
          </div>
        );
      })}

      <div className="divider" />
      <p className="section-label">preferences</p>

      {/* Sound toggle */}
      <button className="settings-toggle-row" onClick={toggleSound}>
        <span className="settings-toggle-label">🔊 Sound effects</span>
        <span className={`toggle-switch${soundOn ? ' toggle-switch--on' : ''}`}>
          <span className="toggle-switch-knob" />
        </span>
      </button>

      {/* Notification toggle */}
      {!pushSupported ? (
        <div className="notif-unsupported">
          🔔 Daily reminders aren't supported on this browser. Install the app to your home screen to enable them.
        </div>
      ) : (
        <>
          <button
            className="settings-toggle-row"
            onClick={handleNotifToggle}
            disabled={notifStatus === 'loading'}
          >
            <span className="settings-toggle-label">
              🔔 Daily reminder
              {notifStatus === 'loading' && <span className="notif-loading"> ...</span>}
              {notifStatus === 'success' && <span className="notif-success"> ✓ Set!</span>}
            </span>
            <span className={`toggle-switch${notifEnabled ? ' toggle-switch--on' : ''}`}>
              <span className="toggle-switch-knob" />
            </span>
          </button>

          {notifEnabled && (
            <div className="notif-time-row">
              <span className="settings-toggle-label">⏰ Remind me at</span>
              <input
                type="time"
                className="notif-time-input"
                value={notifTime}
                onChange={handleTimeChange}
              />
            </div>
          )}

          {notifStatus === 'error' && (
            <p className="notif-error">{notifError}</p>
          )}

          {notifEnabled && (
            <p className="t-secondary small" style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
              You'll get a daily nudge at {notifTime} every day to start your questions.
            </p>
          )}
        </>
      )}

      <div className="divider" />

      <button className="btn-secondary" style={{ marginTop: 0 }} onClick={onRedoCalibration}>
        Redo difficulty calibration
      </button>
      <p className="t-secondary small center" style={{ marginTop: 8 }}>
        This resets your subject levels back to a fresh starting point — your stats above are kept.
      </p>

      <button className="dev-reset" onClick={() => {
        localStorage.removeItem('mm_daily_v2');
        localStorage.removeItem('mm_inprogress_v1');
        window.location.reload();
      }}>dev reset daily</button>

      <button className="dev-reset" onClick={() => {
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('mm_')) localStorage.removeItem(k);
        });
        window.location.reload();
      }}>dev reset all</button>
    </div>
  );
}
