# react-dynamic-remote-component

Allows you to dynamically load a component from a remote using webpack 5's module federation.
Created based on @ScripteAlchemy's (Module Federation's creator, Zack Jackson) [dynamic-system-host](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host) example

![](https://img.shields.io/npm/v/react-dynamic-remote-component.svg?style=flat)
![](https://img.shields.io/npm/dt/react-dynamic-remote-component.svg?style=flat)

# Motivation

With basic settings of module federation, url for a remote module needs to be specified during build-time. However, in some cases, it might be necessary to be able to specify remote module urls during runtime. This package allows you to load remote modules in general and React components from remotes that are specified during runtime.

# Installation

```
npm install react-dynamic-remote-component --save
```

or

```
yarn add react-dynamic-remote-component
```


# RemoteComponent Usage

![remote component usage](https://i.imgur.com/ArgZ7fH.png)

# useRemoteModule Usage

![remote module usage](https://i.imgur.com/nT5yID0.png)

Please keep in mind, any component taking advantage of useRemoteModule should be wrapped with React.Suspense
