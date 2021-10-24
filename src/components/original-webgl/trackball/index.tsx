import React from 'react';
import { Tabs } from 'antd';
import TrackBallCommon from './trackball-common';
import TrackBallQuaterion from './trackball-quaterion';

const { TabPane } = Tabs;

export default function TrackBall(): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Trackball</h1>
      <Tabs tabPosition="right">
        <TabPane tab="Trackball" key="common">
          <TrackBallCommon />
        </TabPane>
        <TabPane tab="Trackball with quaterion" key="quaterion">
          <TrackBallQuaterion />
        </TabPane>
      </Tabs>
    </div>
  );
}
