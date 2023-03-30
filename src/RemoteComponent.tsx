import { attachScript } from "./attach-script";
import { loadModule } from "./load-module";
import { suspend } from "./suspend";
import { RemoteModule } from "./types";
import { getRemoteModuleId } from "./utils";

export type RemoteComponentProps = RemoteModule & {
  unLoadScriptOnUnmount?: boolean;
  exportName?: "string";
};

export const getModule = (remoteModule: RemoteModule) => {
  window.remoteModuleDictionary = window.remoteModuleDictionary || {};
  const id = getRemoteModuleId(remoteModule);
  const existingModule = window.remoteModuleDictionary[id];

  if (existingModule) return existingModule;
  else {
    window.remoteModuleDictionary[id] = new Promise(async (resolve, reject) => {
      try {
        await attachScript(remoteModule);

        const _module = await loadModule(
          remoteModule.url,
          remoteModule.scope,
          remoteModule.module
        )();

        resolve(_module);
      } catch (e) {
        reject(e);
      }
    });
    return window.remoteModuleDictionary[id];
  }
};

const getModuleSuspended = (remoteModule: RemoteModule) => {
  window.remoteObjectDictionary = window.remoteObjectDictionary || {};
  const id = getRemoteModuleId(remoteModule);
  const existingCaller = window.remoteObjectDictionary[id];
  if (existingCaller) return existingCaller();
  else {
    const caller = suspend(getModule(remoteModule));
    window.remoteObjectDictionary[id] = caller;
    return caller();
  }
};

export const useRemoteModule = (remoteModule: RemoteModule) => {
  return getModuleSuspended(remoteModule);
};

export function RemoteComponent<ExtraProps>(props: RemoteComponentProps) {
  const {
    unLoadScriptOnUnmount = true,
    exportName = "default",
    url,
    scope,
    module,
    ...componentProps
  } = props;

  const { [exportName]: Component } = getModuleSuspended({
    url,
    scope,
    module,
  });

  return <Component {...componentProps} />;
}
