import { FC } from "react";
import { Route } from "react-router";

export const routes = [
  <Route path="page1">
    <span>Hello from app2 page 1</span>
  </Route>,
  <Route path="page2">
    <span>Hello from app2 page 2</span>
  </Route>,
];

const Provider: FC = ({ children }) => <div>{children}</div>;

const app = {
  routes,
  Provider,
};

export default app;
