import React from 'react';
import { Link } from 'react-router-dom';
import { IRouteConfig } from 'app/routers/routes';

interface IMenuProps {
  menus: IRouteConfig[];
}

interface IMenuItemProps {
  menu: IRouteConfig;
}

export default function Menu(props: IMenuProps): JSX.Element {
  const { menus } = props;

  return (
    <div className="menu-container">
      {menus.map(menu => {
        if (menu.hideInMenu) {
          return null;
        }
        if (menu.children) {
          return (
            <div key={menu.code}>
              <div className="menu-title">{menu.title}</div>
              <div className="menu-children-container">
                <Menu menus={menu.children}></Menu>
              </div>
            </div>
          );
        } else {
          return <MenuItem key={menu.link} menu={menu} />
        }
      })}
    </div>
  );
}

Menu.Item = MenuItem;

function MenuItem(props: IMenuItemProps): JSX.Element {
  const { menu } = props;

  return (
    <div className="menu-item">
      <Link to={menu.link || ''}>{menu.title}</Link>
    </div>
  );
}
