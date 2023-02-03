/* eslint-disable @typescript-eslint/no-unused-vars */
import Module from "module";
import React, { memo, useState} from "react";
import {
  getModule,
  RemoteComponent,
  useRemoteModule,
} from "react-dynamic-remote-component";
import Button from "./Button";

function App() {
  const [userName, setName] = useState("");
  const nameEntry = <input value={userName} onChange={event=>setName(event.target.value)}/>
  const HostButton = () => <Button name={userName}/>;
  const RemoteButton = () => (
  <RemoteComponent
    url="http://localhost:3002/remoteEntry.js"
    scope="app2"
    module="./Button"
    name={userName}
  />
  );
  return (
    <>
      {nameEntry}
      <HostButton/>
      <React.Suspense fallback="loading">
        <RemoteButton/>
      </React.Suspense>
      <React.Suspense fallback="loading">
        {/* <InnerApp /> */}
      </React.Suspense>
    </>
  );
}
export default App;
// const remoteModule1 = {
//   url: "http://localhost:3002/remoteEntry.js",
//   scope: "app2",
//   module: "./App",
// };

// const remoteModule2 = {
//   url: "http://localhost:3002/remoteEntry.js",
//   scope: "app2",
//   module: "./Button",
// };

// getModule({
//   url: "http://localhost:3002/remoteEntry.js",
//   scope: "app2",
//   module: "./App",
// }).then(({ routes }: any) => {
//   //now I have access to the export named 'routes'
// });

// const InnerApp = memo(() => {
//   // const t = useRemoteModule(remoteModule1);
//   // const a = useRemoteModule(remoteModule2);
//   // const b = useRemoteModule(remoteModule2);
//   // const c = useRemoteModule(remoteModule2);
//   console.log("render");

//   return <></>;
// });

// export default App;

// class ErrorBoundary extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: any) {
//     return { hasError: true };
//   }

//   render() {
//     //@ts-expect-error
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }
