/*global chrome*/
import React, { useState, useEffect } from 'react';
import './Popup.css';
import styled from 'styled-components';
import Tabs from '../../components/Tabs';
import AppSection from '../../components/AppSection';

const AppWrapper = styled.div`
  background-color: #f9fafc;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  overflow: hidden;
`;

function Popup() {
  const [tabs, setTabs] = useState(null);
  const [currentWindowId, setCurrentWindowId] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    chrome.tabs.query({}, (tabs) => getTabs(tabs));
  }, []);

  const getTabs = (tabs) => {
    console.log('tabs are ', tabs);

    setTabs(tabs);
  };

  const handleTabRemove = (tab) => {
    console.log('clicked tab is ', tab);
    chrome.tabs.remove(tab.id);

    let updatedTabs = tabs.filter(({ id }) => id !== tab.id);
    console.log('updated tabs length is ', updatedTabs.length);
    setTabs(updatedTabs);
  };

  const handleTabSelect = (tab) => {
    chrome.windows.update(tab.windowId, { focused: true });
    chrome.tabs.update(tab.id, { active: true });
  };

  return (
    <AppWrapper>
      <Tabs />
      <AppSection
        tabs={tabs}
        onRemove={handleTabRemove}
        onSelect={handleTabSelect}
      />
    </AppWrapper>
  );
}

export default Popup;
