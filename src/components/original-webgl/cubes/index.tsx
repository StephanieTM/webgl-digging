import React from 'react';
import { Tabs } from 'antd';
import ColoredCube from './colored-cube';
import ColoredCubeElementVer from './colored-cube-element-version';

const { TabPane } = Tabs;

export default function Comp(): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cubes</h1>
      <Tabs tabPosition="right">
        <TabPane tab="Colored Cube" key="colored-cube">
          <h2><code style={{ margin: '0 10px' }}>drawArrays</code>Version</h2>
          <ColoredCube />
          <h2><code style={{ margin: '0 10px' }}>drawElements</code>Version</h2>
          <ColoredCubeElementVer />
        </TabPane>
      </Tabs>
    </div>
  );
}
