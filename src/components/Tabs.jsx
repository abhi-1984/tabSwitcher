import React, { useState } from 'react';
import styled from 'styled-components';

const TabsView = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  position: relative;
`;

const Tab = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.isActive ? '#0057ff' : '#030d29')};
  cursor: pointer;
  margin-bottom: 6px;
  &:first-child {
    margin-right: 32px;
  }
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  width: ${(props) => (props.activeTab === 'Tabs' ? '35px' : '81px')};
  height: 2px;
  background-color: #0057ff;
  border-radius: 1px;
  left: ${(props) => (props.activeTab === 'Tabs' ? '20px' : '87px')};
  bottom: 16px;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

function Tabs({ activeTab, onTabChange }) {
  return (
    <TabsView>
      <Tab onClick={() => onTabChange('Tabs')} isActive={activeTab === 'Tabs'}>
        Tabs
      </Tab>
      <Tab
        onClick={() => onTabChange('Bookmarks')}
        isActive={activeTab === 'Bookmarks'}
      >
        Bookmarks
      </Tab>
      <ActiveTabIndicator activeTab={activeTab} />
    </TabsView>
  );
}

export default Tabs;
