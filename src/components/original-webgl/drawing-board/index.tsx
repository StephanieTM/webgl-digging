import React from 'react';
import { Tabs } from 'antd';
import ClickAndDrawDots from './click-and-draw-dots';

const { TabPane } = Tabs;

export default function Comp(): JSX.Element {

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drawing Board</h1>
      <Tabs tabPosition="right">
        <TabPane tab="Draw Dots" key="click-and-draw-dots">
          <ClickAndDrawDots />
        </TabPane>
      </Tabs>
    </div>
  );
}
