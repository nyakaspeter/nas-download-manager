import type { OmitStrict } from "../../types";

import type { State as State_8, Settings as Settings_8 } from "./8";

export {
  VisibleTaskSettings,
  TaskSortType,
  NotificationSettings,
  CachedTasks,
  Logging,
  BadgeDisplayType,
  ConnectionSettings,
  Protocol,
} from "./8";

export type ThemeMode = "auto" | "light" | "dark";

export interface StateVersion {
  stateVersion: 9;
}

export interface Settings extends Settings_8 {
  themeMode: ThemeMode;
}

export interface State extends StateVersion, OmitStrict<State_8, "settings" | "stateVersion"> {
  settings: Settings;
}

export function migrate(state: State_8): State {
  return {
    ...state,
    stateVersion: 9,
    settings: {
      ...state.settings,
      themeMode: "auto",
    },
  };
}
