import "../common/init/nonContentContext";
import { onStoredStateChange, maybeMigrateState } from "../common/state";
import { saveLastSevereError } from "../common/errorHandlers";
import { onStoredStateChange as onStoredStateChangeListener } from "./onStateChange";
import { initializeContextMenus } from "./contextMenus";
import { initializeMessageHandler } from "./messages";
import { pollTasks } from "./actions";
import { getMutableStateSingleton } from "./backgroundState";
import { loadSessionState, saveSessionState } from "./sessionPersistence";

initializeContextMenus();
initializeMessageHandler();

// Track whether initialization is complete. Alarm-triggered polls must wait for this
// to avoid polling with an uninitialized client (no settings, no SID), which would fail
// and clear the badge.
let initPromise: Promise<void>;

// MV3: Use alarms API for periodic polling instead of setInterval
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "poll-tasks") {
    initPromise.then(() => {
      const state = getMutableStateSingleton();
      pollTasks(state.api, state.pollRequestManager);
    });
  }
});

// Persist SID to session storage after successful login so it survives service worker restarts
const backgroundState = getMutableStateSingleton();
backgroundState.api.onLoginSuccess = (sid) => {
  saveSessionState({ sid });
};

// Initialize: migrate state, then let onStoredStateChange configure the API client settings,
// and THEN restore the saved SID. This ordering is critical — if we restore the SID before
// onStoredStateChange runs, partiallyUpdateSettings() would detect "changed" settings on the
// fresh client and call maybeLogout(), immediately invalidating the restored session.
initPromise = maybeMigrateState()
  .then(() => {
    onStoredStateChange(onStoredStateChangeListener);
  })
  .then(() => loadSessionState())
  .then((session) => {
    if (session.sid) {
      backgroundState.api.restoreSession(session.sid);
    }
    if (session.finishedTaskIds) {
      backgroundState.finishedTaskIds = new Set(session.finishedTaskIds);
    }
  })
  .catch(saveLastSevereError);
