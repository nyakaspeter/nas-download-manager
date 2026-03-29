import { SynologyClient } from "../common/apis/synology";
import { RequestManager } from "./requestManager";

export interface BackgroundState {
  api: SynologyClient;
  // This starts undefined, which means we haven't fetched the list of tasks yet.
  finishedTaskIds: Set<string> | undefined;
  pollRequestManager: RequestManager;
  showNonErrorNotifications: boolean;
  isInitializingExtension: boolean;
}

const state: BackgroundState = {
  api: new SynologyClient({}),
  finishedTaskIds: undefined,
  pollRequestManager: new RequestManager(),
  showNonErrorNotifications: true,
  isInitializingExtension: true,
};

export function getMutableStateSingleton() {
  return state;
}

// Expose for debugging in service worker context
(globalThis as any).getMutableStateSingleton = getMutableStateSingleton;
