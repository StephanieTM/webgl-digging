import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mobileRoutes, pcRoutes } from 'app/routers/routes';
import GlobalStore from './global-store';
import PCLayout from './pc';
import MobileLayout from './mobile';



export default function AppLayout(): JSX.Element {
  const { isMobile } = GlobalStore.useContainer();

  return (
    <Router basename="/webgl-digging">
      {isMobile ? <MobileLayout menus={mobileRoutes} /> : <PCLayout menus={pcRoutes} />}
    </Router>
  );
}