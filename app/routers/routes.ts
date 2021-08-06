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
        component: (): ILoadComponent => import('src/components/homepage'),
      },
    ],
    hideInMenu: true,
  },
  {
    title: 'Three.JS',
    code: 'three.js',
    children: [
      {
        title: 'Demos',
        code: 'threejs-demos',
        children: [
          {
            title: 'Creating a scene',
            link: '/threejs/demos/creating-a-scene',
            component: (): ILoadComponent => import('src/components/threejs/creating-a-scene'),
          },
          {
            title: 'Drawing a line',
            link: '/threejs/demos/drawing-a-line',
            component: (): ILoadComponent => import('src/components/threejs/drawing-lines'),
          },
          {
            title: 'Update BufferGeometry',
            link: '/threejs/demos/update-buffer-geometry',
            component: (): ILoadComponent => import('src/components/threejs/update-buffer-geometry'),
          },
          {
            title: 'Use Post-processing',
            link: '/threejs/demos/use-post-processing',
            component: (): ILoadComponent => import('src/components/threejs/use-post-processing'),
          },
          {
            title: 'Sierpinski',
            link: '/threejs/demos/sierpinski',
            component: (): ILoadComponent => import('src/components/threejs/sierpinski'),
          },
          {
            title: 'Swap cards',
            link: '/threejs/demos/swap-cards',
            component: (): ILoadComponent => import('src/components/threejs/swap-cards'),
          },
        ],
      },
    ],
  },
  {
    title: 'Original WebGL',
    code: 'original-webgl',
    children: [
      {
        title: 'Demos',
        code: 'original-webgl-demos',
        children: [
          {
            title: 'Sierpinski',
            link: '/original-webgl/demos/sierpinski',
            component: (): ILoadComponent => import('src/components/original-webgl/sierpinski'),
          },
          {
            title: 'Rotating Square',
            link: '/original-webgl/demos/rotating-square',
            component: (): ILoadComponent => import('src/components/original-webgl/rotating-square'),
          },
          {
            title: 'Drawing Board',
            link: '/original-webgl/demos/drawing-board',
            component: (): ILoadComponent => import('src/components/original-webgl/drawing-board'),
          },
          {
            title: 'Cubes',
            link: '/original-webgl/demos/cubes',
            component: (): ILoadComponent => import('src/components/original-webgl/cubes'),
          },
        ],
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
        component: (): ILoadComponent => import('src/components/homepage'),
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
