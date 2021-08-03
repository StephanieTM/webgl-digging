import React from 'react';
import { Tabs } from 'antd';
import ColoredCube from './colored-cube';

const { TabPane } = Tabs;

export default function Comp(): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cubes</h1>
      <Tabs tabPosition="right">
        <TabPane tab="Colored Cube" key="colored-cube">
          <ColoredCube />
        </TabPane>
      </Tabs>
    </div>
  );
}
