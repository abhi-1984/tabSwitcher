import React from 'react';
import styled from 'styled-components';
import Row from './Row';

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
  padding: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

const FooterLink = styled.a`
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  color: #9a9ea9;
  text-decoration: none;
  span {
    color: #0057ff;
  }
`;

const SearchView = styled.div`
  width: 100%;
  height: 64px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px 10px 0px 0px;
`;

const SearchInput = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #030d29;
  opacity: 0.4;
  padding: 0 20px;
`;

const ListView = styled.div`
  width: 100%;
  height: 372px;
  overflow: scroll;
  background-color: white;
`;

function AppSection({ tabs, onRemove, onSelect }) {
  return (
    <AppSectionWrapper>
      <ContentView>
        <SearchView>
          <SearchInput placeholder="Search Tabs..." autoFocus type="text" />
        </SearchView>

        <ListView>
          {tabs &&
            tabs.map((tab, index) => (
              <Row
                tab={tab}
                key={index}
                onRemove={onRemove}
                onSelect={onSelect}
              />
            ))}
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
