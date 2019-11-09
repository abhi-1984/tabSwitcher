import React, { useState } from 'react';
import styled from 'styled-components';

const TabsView = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const Tab = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.isActive ? '#0057ff' : '#030d29;')}
  cursor: pointer;
  &:last-child {
    margin-left: 32px;
  }
`;

function Tabs() {
  const [selectedTab, setSelectedTab] = useState('Tabs');

  return (
    <TabsView>
      <Tab isActive={selectedTab === 'Tabs'}>Tabs</Tab>
      <Tab isActive={selectedTab === 'Bookmarks'}>Bookmarks</Tab>
    </TabsView>
  );
}

export default Tabs;
