import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { IRouteConfig } from 'app/routers/routes';
import { getRoutes } from 'app/layout/utils';
import Header from './Header';
import Menu from './Menu';
import './index.less';

interface IPCLayoutProps {
  menus: IRouteConfig[];
}

export default function Layout(props: IPCLayoutProps): JSX.Element {
  const { menus } = props;
  const routes = getRoutes(menus);

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <div className="app-menu">
          <div>
            <Menu menus={menus} />
          </div>
        </div>
        <div className="app-content">
          <Suspense fallback={<Spin spinning tip="Loading..." />}>
            <Switch>
              {
                routes.map(route => (route.component && route.link) ?
                  <Route key={route.link} exact path={route.link} component={lazy(route.component)} /> :
                  null)
              }
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
