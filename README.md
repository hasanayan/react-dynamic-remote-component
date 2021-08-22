# react-dynamic-remote-component

Allows you to dynamically load a component from a remote using webpack 5's module federation.

# Motivation

With basic settings of module federation, url for a remote module needs to be specified during build-time. However, in some cases, it might be necessary to be able to specify remote module urls during runtime. This package allows you to load remote modules in general and React components from remotes that are specified during runtime.

# RemoteComponent Usage

![remote component usage](https://i.imgur.com/5cL4Rel.png)

# useRemoteModule Usage

![remote module usage](https://i.imgur.com/nT5yID0.png)

Please keep in mind, any component taking advantage of useRemoteModule should be wrapped with React.Suspense
