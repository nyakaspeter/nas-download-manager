import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../src/popup/index.scss";

const messages = require("../../_locales/en/messages.json") as Record<
  string,
  { message: string; placeholders?: Record<string, { content: string }> }
>;

function getMessage(name: string, substitutions?: string | string[]) {
  const entry = messages[name];
  if (!entry) {
    return name.replace(/_/g, " ");
  }

  const values =
    substitutions == null ? [] : Array.isArray(substitutions) ? substitutions : [substitutions];
  let message = entry.message;
  Object.entries(entry.placeholders ?? {}).forEach(([placeholderName, placeholder]) => {
    const match = /^\$(\d+)$/.exec(placeholder.content);
    const replacement = match ? values[Number(match[1]) - 1] ?? "" : placeholder.content;
    message = message.replace(new RegExp(`\\$${placeholderName}\\$`, "gi"), replacement);
  });
  return message;
}

(globalThis as any).browser = {
  i18n: { getMessage, getUILanguage: () => "en-US" },
  runtime: {
    openOptionsPage: () => undefined,
    sendMessage: async () => ({ success: true, result: undefined }),
  },
  tabs: { create: () => undefined },
};

const { Popup } = require("../../src/popup/Popup") as typeof import("../../src/popup/Popup");

const transfer = (
  sizeDownloaded: number,
  speedDownload: number,
  sizeUploaded = 0,
  speedUpload = 0,
) => ({
  downloaded_pieces: 0,
  size_downloaded: sizeDownloaded,
  size_uploaded: sizeUploaded,
  speed_download: speedDownload,
  speed_upload: speedUpload,
});

const tasks = [
  {
    id: "ubuntu",
    type: "http" as const,
    username: "download-user",
    title: "Ubuntu 26.04 LTS.iso",
    size: 6.2 * 1024 ** 3,
    status: "downloading" as const,
    additional: { transfer: transfer(2.8 * 1024 ** 3, 8.4 * 1024 ** 2) },
  },
  {
    id: "documentary",
    type: "bt" as const,
    username: "download-user",
    title: "Documentary.mkv",
    size: 4.8 * 1024 ** 3,
    status: "paused" as const,
    additional: { transfer: transfer(1.1 * 1024 ** 3, 0) },
  },
  {
    id: "archive",
    type: "http" as const,
    username: "download-user",
    title: "archive.zip",
    size: 920 * 1024 ** 2,
    status: "finished" as const,
    additional: { transfer: transfer(920 * 1024 ** 2, 0) },
  },
];

const client = {
  openDownloadStationUi: () => undefined,
  createTasks: () => undefined,
  pauseTask: async () => ({ success: true, result: undefined }),
  resumeTask: async () => ({ success: true, result: undefined }),
  deleteTasks: async () => ({ success: true, result: undefined }),
  getConfig: async () => ({ success: true, result: {} }),
  listDirectories: async () => ({ success: true, result: [] }),
  testConnectionAndLogin: async () => ({ success: true, data: {} }),
} as any;

document.documentElement.classList.add("theme-dark");

ReactDOM.render(
  <Popup
    tasks={tasks}
    taskFetchFailureReason={null}
    tasksLastInitiatedFetchTimestamp={Date.now() - 2500}
    tasksLastCompletedFetchTimestamp={Date.now() - 3000}
    visibleTasks={{
      downloading: true,
      uploading: true,
      completed: true,
      errored: true,
      other: true,
    }}
    changeVisibleTasks={() => undefined}
    taskSort="name-asc"
    changeTaskSort={() => undefined}
    badgeDisplay="total"
    changeBadgeDisplay={() => undefined}
    showInactiveTasks={true}
    changeShowInactiveTasks={() => undefined}
    client={client}
  />,
  document.getElementById("body"),
);
