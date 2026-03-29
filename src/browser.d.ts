interface StorageChange<T> {
  oldValue?: T;
  newValue?: T;
}

type StorageChangeEvent<T> = { [K in keyof T]?: StorageChange<T[K]> };

type StorageChangeListener<T> = (
  changes: StorageChangeEvent<T>,
  areaName: "sync" | "local" | "managed",
) => void;

type NotificationTemplateType = "basic" | "image" | "list" | "progress";

interface NotificationOptions {
  type: NotificationTemplateType;
  message: string;
  title: string;
  iconUrl?: string;
  contextMessage?: string;
  priority?: 0 | 1 | 2;
  eventTime?: number;
  buttons?: {
    title: string;
    iconUrl?: string;
  }[];
  imageUrl?: string;
  items?: {
    title: string;
    message: string;
  }[];
  progress?: number;
}

interface Tab {
  active: boolean;
  audible?: boolean;
  cookieStoreId?: string;
  favIconUrl?: string;
  height?: number;
  highlighted: boolean;
  id?: number;
  incognito: boolean;
  index: number;
  mutedInfo?: {
    extensionId?: string;
    muted: boolean;
    reason?: "capture" | "extension" | "user";
  };
  openerTabId?: number;
  pinned: boolean;
  selected: boolean;
  sessionId?: string;
  status?: "loading" | "complete";
  title?: string;
  url?: string;
  width?: number;
  windowId: number;
}

interface TabCreateOptions {
  active?: boolean;
  cookieStoreId?: string;
  index?: number;
  openerTabId?: number;
  pinned?: boolean;
  selected?: boolean;
  url?: string;
}

type ContextMenusItemType = "normal" | "checkbox" | "radio" | "separator";

type ContextsMenuContextType =
  | "all"
  | "audio"
  | "browser_action"
  | "editable"
  | "frame"
  | "image"
  | "link"
  | "page"
  | "page_action"
  | "password"
  | "selection"
  | "tab"
  | "video";

interface ContextMenusOnClickData {
  checked?: boolean;
  editable: boolean;
  frameUrl?: string;
  linkUrl?: string;
  mediaType?: "image" | "video" | "audio";
  menuItemId: number | string;
  modifiers?: ("Command" | "Ctrl" | "MacCtrl" | "Shift")[];
  pageUrl?: string;
  parentMenuItemId?: number | string;
  selectionText?: string;
  srcUrl?: string;
  wasChecked?: boolean;
}

interface ContextMenusCreateOptions {
  type?: ContextMenusItemType;
  id?: string;
  title?: string;
  checked?: boolean;
  contexts?: ContextsMenuContextType[];
  parentId?: number | string;
  documentUrlPatterns?: string[];
  targetUrlPatterns?: string[];
  enabled?: boolean;
}

type ColorArray = [number, number, number, number];

interface SendMessageOptions {
  includeTlsChannelIdOptional?: boolean;
  toProxyScript?: boolean;
}

// TODO, but I don't actually need this...
type MessageSender = { __messageSenderBrand: any };

type OnMessageListener = (
  message: object | null | undefined,
  sender: MessageSender,
  sendResponse: (response: object) => void,
) => Promise<object | string | void> | boolean | void;

interface Alarm {
  name: string;
  scheduledTime: number;
  periodInMinutes?: number;
}

interface AlarmCreateInfo {
  when?: number;
  delayInMinutes?: number;
  periodInMinutes?: number;
}

type AlarmListener = (alarm: Alarm) => void;

declare const browser: {
  runtime: {
    getURL: (relativeUrl: string) => string;
    openOptionsPage: () => Promise<void>;
    sendMessage: (message: object) => Promise<object>;
    onMessage: {
      addListener: (listener: OnMessageListener) => void;
      removeListener: (listener: OnMessageListener) => void;
      hasListener: (listener: OnMessageListener) => boolean;
    };
  };
  action: {
    setBadgeText: (options: { text: string; tabId?: number }) => Promise<void>;
    setBadgeBackgroundColor: (options: {
      color: string | ColorArray;
      tabId?: number;
    }) => Promise<void>;
    setIcon: (options: {
      imageData?: ImageData | Record<string, ImageData>;
      path?: string | Record<string, string>;
      tabId?: number;
    }) => Promise<void>;
  };
  storage: {
    local: {
      get: <T>(input: null | string | string[]) => Promise<T>;
      set: <T>(input: T) => Promise<void>;
      clear: () => Promise<void>;
    };
    session: {
      get: <T = any>(input: null | string | string[]) => Promise<T>;
      set: <T>(input: T) => Promise<void>;
      clear: () => Promise<void>;
    };
    onChanged: {
      addListener: <T extends object>(listener: StorageChangeListener<T>) => void;
      removeListener: <T extends object>(listener: StorageChangeListener<T>) => void;
      hasListener: <T extends object>(listener: StorageChangeListener<T>) => boolean;
    };
  };
  notifications: {
    create: (id: string | undefined, options?: NotificationOptions) => Promise<string>;
  };
  tabs: {
    create: (options?: TabCreateOptions) => Promise<Tab>;
  };
  contextMenus: {
    create: (options?: ContextMenusCreateOptions, callback?: () => void) => number | string;
    update: (id: number | string, options?: ContextMenusCreateOptions) => Promise<void>;
    removeAll: () => Promise<void>;
    onClicked: {
      addListener: (
        listener: (info: ContextMenusOnClickData, tab?: Tab) => void,
      ) => void;
    };
  };
  alarms: {
    create: (name: string, alarmInfo: AlarmCreateInfo) => Promise<void>;
    get: (name: string) => Promise<{ name: string; periodInMinutes?: number } | undefined>;
    clear: (name: string) => Promise<boolean>;
    onAlarm: {
      addListener: (listener: AlarmListener) => void;
    };
  };
  i18n: {
    getMessage: (messageName: string, placeholders?: (string | number)[]) => string;
    getUILanguage: () => string;
  };
};

// chrome.storage.session is not wrapped by webextension-polyfill, so we declare the
// minimal subset we need on the native chrome namespace.
declare const chrome: {
  storage: {
    session: {
      get: (key: string) => Promise<Record<string, any>>;
      set: (items: Record<string, any>) => Promise<void>;
    };
  };
};
