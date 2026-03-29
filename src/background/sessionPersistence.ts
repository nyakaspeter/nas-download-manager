// MV3 service workers can be terminated at any time. chrome.storage.session persists
// across service worker restarts (but not browser restarts), making it ideal for
// ephemeral state like auth sessions and notification dedup tracking.
//
// Note: webextension-polyfill doesn't wrap chrome.storage.session, so we access it
// directly via the chrome namespace.

interface PersistedSessionState {
  sid: string | undefined;
  finishedTaskIds: string[] | undefined;
}

const SESSION_KEY = "__backgroundSession";

export async function saveSessionState(state: Partial<PersistedSessionState>): Promise<void> {
  const existing = await loadSessionState();
  await chrome.storage.session.set({
    [SESSION_KEY]: { ...existing, ...state },
  });
}

export async function loadSessionState(): Promise<PersistedSessionState> {
  const result = await chrome.storage.session.get(SESSION_KEY);
  return (result as any)[SESSION_KEY] ?? { sid: undefined, finishedTaskIds: undefined };
}
