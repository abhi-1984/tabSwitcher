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
  const [isAudible, setAudible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const promises = [
        new Promise((resolve) => {
          chrome.tabs.query({}, (tabs) => resolve(tabs));
        }),
        new Promise((resolve) => {
          chrome.windows.getCurrent({}, ({ id }) => resolve(id));
        }),
      ];

      Promise.all(promises).then(([tabs, currentWindowId]) => {
        const highlightedIndex = getActiveIndex(tabs, currentWindowId);
        setTabs(tabs);
        setCurrentWindowId(currentWindowId);
        setHighlightedIndex(highlightedIndex);
        setAudible(tabs.audible);
      });
    }, 200);
  }, []);

  const getActiveIndex = (tabs, currentWindowId) =>
    tabs &&
    tabs.findIndex((tab) => tab.windowId === currentWindowId && tab.active);

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

  const handleHighlightChange = (highlightedIndex) => {
    setHighlightedIndex(highlightedIndex);
  };

  return (
    <AppWrapper>
      <Tabs />
      <AppSection
        tabs={tabs}
        onChange={handleHighlightChange}
        onRemove={handleTabRemove}
        highlightedIndex={highlightedIndex}
        onSelect={handleTabSelect}
        isAudible={isAudible}
      />
    </AppWrapper>
  );
}

export default Popup;
