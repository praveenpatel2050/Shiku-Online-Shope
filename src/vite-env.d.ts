/// <reference types="vite/client" />

declare module "react/jsx-runtime" {
  export default any;
}

declare interface AppRoute {
  pathName: string;
  name: string;
}
