import "./commonContext";

import { saveLastSevereError } from "../errorHandlers";

self.addEventListener("error", (e) => {
  e.preventDefault();
  saveLastSevereError(e.error);
});

self.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
  e.preventDefault();
  saveLastSevereError(e.reason);
});
