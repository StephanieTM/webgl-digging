import React from 'react';
import { Tabs } from 'antd';
import Points2D from './sierpinski-2d-points';
import Lines2D from './sierpinski-2d-lines';

const { TabPane } = Tabs;

export default function Comp(): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Sierpinski</h1>
      <Tabs tabPosition="top">
        <TabPane tab="2d-points" key="2d-points">
          <Points2D />
        </TabPane>
        <TabPane tab="2d-lines" key="2d-lines">
          <Lines2D />
        </TabPane>
      </Tabs>
    </div>
  );
}
