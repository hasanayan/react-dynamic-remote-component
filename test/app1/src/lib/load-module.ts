/* eslint-disable no-unreachable */
export const loadModule = (url: string, scope: string, module: string) => {
  return async () => {
    try {
      //@ts-expect-error
      await __webpack_init_sharing__("default");
      const container = window[scope];

      if (!container.isInitialized) {
        container.isInitialized = true;
        //@ts-expect-error
        await container.init(__webpack_share_scopes__.default);
      }

      const factory = await window[scope].get(module);

      const Module = factory();

      return Module;
    } catch (e) {
      const error = new Error(
        `There was a problem loading the remote module. Please check the parameters (url: ${url} scope: ${scope} module: ${module})`
      );
      error.name = "RemoteModuleLoadingError";
      throw error;
    }
  };
};
