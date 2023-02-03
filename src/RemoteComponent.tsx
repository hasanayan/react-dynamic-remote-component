import { FC } from "react";
import { attachScript } from "./attach-script";
import { loadModule } from "./load-module";
import { RemoteModule } from "./types";
import { suspend } from "./suspend";
import { getRemoteModuleId } from "./utils";

export type RemoteComponentPropsWithoutProps = {
  url: string;
  scope: string;
  module: string;
  unLoadScriptOnUnmount?: boolean;
  exportName?: string;
};

export type RemoteComponentProps = RemoteComponentPropsWithoutProps & {
  [rest: string]: any;
}

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

export const RemoteComponent: FC<RemoteComponentProps> = (
  {
    unLoadScriptOnUnmount=true,
    exportName="default",
    children,
    url,
    scope,
    module,
    ...props
  }
  ) => {
  const remoteModule: RemoteModule = {
    url: url,
    scope: scope,
    module: module,
  };
  const { [exportName]: Component } = getModuleSuspended(remoteModule);

  return <Component {...props}/>;
};
