/* eslint-disable @typescript-eslint/no-unused-vars */
import Module from "module";
import React, { memo, useEffect } from "react";
import {
  getModule,
  RemoteComponent,
  useRemoteModule,
} from "react-dynamic-remote-component";

function App() {
  return (
    <>
      <React.Suspense fallback="loading">
        <RemoteComponent
          url="http://localhost:3002/remoteEntry.js"
          scope="app2"
          module="./Button"
        />
      </React.Suspense>
      <React.Suspense fallback="loading">
        <InnerApp />
      </React.Suspense>
    </>
  );
}

const remoteModule1 = {
  url: "http://localhost:3002/remoteEntry.js",
  scope: "app2",
  module: "./App",
};

const remoteModule2 = {
  url: "http://localhost:3002/remoteEntry.js",
  scope: "app2",
  module: "./Button",
};

getModule({
  url: "http://localhost:3002/remoteEntry.js",
  scope: "app2",
  module: "./App",
}).then(({ routes }: any) => {
  //now I have access to the export named 'routes'
});

const InnerApp = memo(() => {
  // const t = useRemoteModule(remoteModule1);
  // const a = useRemoteModule(remoteModule2);
  // const b = useRemoteModule(remoteModule2);
  // const c = useRemoteModule(remoteModule2);
  console.log("render");

  return <></>;
});

export default App;

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    //@ts-expect-error
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
