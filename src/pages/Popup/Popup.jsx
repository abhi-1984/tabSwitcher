/*global chrome*/
import React, { useState, useEffect } from 'react';
import './Popup.css';
import styled from 'styled-components';
import Tabs from '../../components/Tabs';
import Fuse from 'fuse.js';
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
  const [filterValue, setFilterValue] = useState('');

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

  const handleFilterChange = ({ target: { value } }) => {
    setFilterValue(value);
    setHighlightedIndex(
      value === '' ? this.getActiveIndex(tabs, currentWindowId) : 0
    );
  };

  const filterTabs = (tabs, filterValue) => {
    if (filterValue === '') {
      return tabs;
    }

    const options = {
      threshold: 0.5,
      keys: ['title', 'url'],
    };

    const fuse = new Fuse(tabs, options);

    return fuse.search(filterValue);
  };

  const handleClearSearchInput = () => {
    setFilterValue('');
  };

  return (
    <AppWrapper>
      <Tabs />
      <AppSection
        tabs={filterTabs(tabs, filterValue)}
        onChange={handleHighlightChange}
        onRemove={handleTabRemove}
        highlightedIndex={highlightedIndex}
        onSelect={handleTabSelect}
        isAudible={isAudible}
        filterValue={filterValue}
        onFilterChange={handleFilterChange}
        onClearSearchInput={handleClearSearchInput}
      />
    </AppWrapper>
  );
}

export default Popup;
