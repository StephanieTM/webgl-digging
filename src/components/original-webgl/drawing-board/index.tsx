import React from 'react';
import { Tabs } from 'antd';
import Dots from './dots';
import Lines from './lines';
import Triangles from './triangles';

const { TabPane } = Tabs;

export default function Comp(): JSX.Element {

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drawing Board</h1>
      <Tabs tabPosition="right">
        <TabPane tab="Draw Dots" key="draw-dots">
          <Dots />
        </TabPane>
        <TabPane tab="Draw Lines" key="draw-lines">
          <Lines />
        </TabPane>
        <TabPane tab="Draw Triangles" key="draw-triangles">
          <Triangles />
        </TabPane>
      </Tabs>
    </div>
  );
}
