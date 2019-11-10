import React from 'react';
import styled from 'styled-components';
import Row from './Row';
import { ClearSearchIcon, GoogleSearchIcon } from './Icons';
import { motion } from 'framer-motion';

const AppSectionWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px -4px 16px rgba(3, 13, 41, 0.1);
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 40px;
`;

const ContentView = styled.div`
  position: relative;
`;

const FooterView = styled.footer`
  background: #ffffff;
  box-shadow: inset 0px 1px 0px rgba(3, 13, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

const FooterLink = styled.a`
  font-size: 14;
  line-height: 20px;
  font-weight: 400;
  color: #9a9ea9;
  text-decoration: none;
  span {
    color: #0057ff;
  }
`;

const SearchView = styled.div`
  width: 100%;
  height: 56px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px 10px 0px 0px;
  position: relative;
`;

const SearchInput = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #030d29;
  padding: 0 20px;
  &:placeholder {
    opacity: 0.4;
  }
`;

const SearchFieldResetOption = styled(motion.div)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 200ms ease-in-out;
  cursor: pointer;
`;

const ListView = styled.div`
  width: 100%;
  height: 408px;
  overflow: scroll;
  background-color: #f9fafc;
`;

const SearchIndicationView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SearchTextIndicator = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
`;

function AppSection({
  tabs,
  onRemove,
  onSelect,
  isAudible,
  filterValue,
  onFilterChange,
  onClearSearchInput,
}) {
  const openInNewTab = (url) => {
    console.log('open url ', url);
    window.open(url, '_blank');
  };

  const onSearch = (event) => {
    if (tabs && filterValue.length >= 1 && tabs.length < 1) {
      if (event.key === 'Enter') {
        openInNewTab(`https://www.google.com/search?q=${filterValue}`);
      }
    }
  };

  return (
    <AppSectionWrapper>
      <ContentView>
        <SearchView>
          <SearchInput
            spellCheck={false}
            value={filterValue}
            onChange={onFilterChange}
            placeholder="Search Tabs..."
            autoFocus
            type="text"
            onKeyDown={onSearch}
          />
          <SearchFieldResetOption
            animate={{ opacity: filterValue.length > 0 ? 0.24 : 0 }}
            whileHover={{ opacity: filterValue.length > 0 && 0.48 }}
            onClick={onClearSearchInput}
          >
            <ClearSearchIcon />
          </SearchFieldResetOption>
        </SearchView>
        {console.log('tabs are ', tabs)}
        <ListView>
          {tabs &&
            tabs.map((tab, index) => (
              <Row
                tab={tab}
                key={index}
                onRemove={onRemove}
                onSelect={onSelect}
                isAudible={isAudible}
              />
            ))}
          {tabs && filterValue.length >= 1 && tabs.length < 1 && (
            <SearchIndicationView>
              <GoogleSearchIcon />
              <SearchTextIndicator>
                Enter and Search on Google
              </SearchTextIndicator>
            </SearchIndicationView>
          )}
        </ListView>
      </ContentView>

      <FooterView>
        <FooterLink
          href="https://www.twitter.com/_abhiii"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by <span>abhi</span>
        </FooterLink>
      </FooterView>
    </AppSectionWrapper>
  );
}

export default AppSection;
