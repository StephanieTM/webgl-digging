import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ILoadComponent = Promise<{ default: ComponentType<RouteComponentProps>}>;

export interface IRouteConfig {
  title: string;
  link?: string;
  code?: string;
  key?: string;
  children?: IRouteConfig[];
  component?: () => ILoadComponent;
  hideInMenu?: boolean;
  icon?: JSX.Element;
}

const pcRoutes: IRouteConfig[] = [
  {
    title: 'Home',
    code: 'home',
    children: [
      {
        title: 'Hello World',
        link: '/',
        component: (): ILoadComponent => import('src/components/helloWorld'),
      },
    ],
  },
  {
    title: 'Three.JS',
    code: 'three.js',
    children: [
      {
        title: 'Creating a scene',
        link: '/threejs/creating-a-scene',
        component: (): ILoadComponent => import('src/components/threejs/creating-a-scene'),
      },
      {
        title: 'Drawing a line',
        link: '/threejs/drawing-a-line',
        component: (): ILoadComponent => import('src/components/threejs/drawing-lines'),
      },
      {
        title: 'Update BufferGeometry',
        link: '/threejs/update-buffer-geometry',
        component: (): ILoadComponent => import('src/components/threejs/update-buffer-geometry'),
      },
    ],
  },
];

const mobileRoutes: IRouteConfig[] = [
  {
    title: 'Mine',
    code: 'mine',
    children: [
      {
        title: 'Mine',
        link: '/mine',
        component: (): ILoadComponent => import('src/mobile/mine'),
      },
    ],
  },
  {
    title: 'Home',
    code: 'home',
    children: [
      {
        title: 'Hello World',
        link: '/',
        component: (): ILoadComponent => import('src/components/helloWorld'),
      },
    ],
  },
  {
    title: 'Mall',
    code: 'mall',
    children: [
      {
        title: 'Mall',
        link: '/mall',
        component: (): ILoadComponent => import('src/mobile/mall'),
      },
    ],
  },
  {
    title: 'Login',
    code: 'login',
    hideInMenu: true,
    link: '/login',
    component: (): ILoadComponent => import('src/mobile/login'),
  },
];

export {
  pcRoutes,
  mobileRoutes,
};
