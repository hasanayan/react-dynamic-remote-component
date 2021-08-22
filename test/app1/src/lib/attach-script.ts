import { RemoteModule } from "./types";
import { getRemoteModuleId } from "./utils";

export const attachScript = (remoteModule: RemoteModule) => {
  const id = getRemoteModuleId(remoteModule);

  const existingElement = document.getElementById(id);

  if (existingElement) {
    //@ts-expect-error
    if (window[remoteModule.scope]) return Promise.resolve(true);
    else
      return new Promise((resolve) => {
        existingElement.onload = (e) => {
          resolve(true);
        };
      });
  }
  const element = document.createElement("script");
  element.src = remoteModule.url;
  element.type = "text/javascript";
  element.async = true;
  element.id = id;

  const scriptLoadPromise = new Promise<HTMLScriptElement>(
    (resolve, reject) => {
      element.onload = () => resolve(element);
      element.onerror = (e) => {
        reject(e);
      };
    }
  );

  document.head.appendChild(element);

  return scriptLoadPromise;
};

export const detachScript = (id: string) => {
  const element = document.getElementById(id);
  if (element) document.head.removeChild(element);
};
