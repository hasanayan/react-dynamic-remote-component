import { RemoteModule } from "./types";

export const getRemoteModuleId = ({ url, module, scope }: RemoteModule) =>
  [url, scope, module].join();
