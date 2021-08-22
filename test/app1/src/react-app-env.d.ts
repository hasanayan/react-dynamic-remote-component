/// <reference types="react-scripts" />

declare module globalThis {
  var remoteObjectDictionary: Record<string, any> | undefined;
  var remoteModuleDictionary: Record<string, any> | undefined;
}
