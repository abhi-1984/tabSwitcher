/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClearIcon } from './Icons';

const RowView = styled(motion.div)`
  cursor: pointer;
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: 20px 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  padding: 0 12px;
  background-color: #fff;
  transition: all 200ms ease;
  &:hover {
    background-color: rgba(0, 87, 255, 0.08);
    color: #0057ff;
    .closeView {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseView = styled(motion.div)`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 300ms ease-in-out;
  transform: scale(0.6);
`;

const RowIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  background-color: rgb(255, 255, 255);
  padding: 3px;
  margin: 3px;
  border-radius: 3px;
  flex: 0 0 auto;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  width: calc(100%);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const favIconPlaceholder = (
  <svg viewBox="0 0 16 16" fill="none" stroke="#5A5A5A" strokeWidth="1">
    <polygon points="3.5,1.5 8.5,1.5 12.5,5.5 12.5,14.5 3.5,14.5" />
    <polyline points="8.5,1.5 8.5,5.5 12.5,5.5" />
  </svg>
);

function Row({ tab, onRemove, onSelect }) {
  return (
    <RowView onClick={() => onSelect(tab)}>
      <RowIconWrapper>
        {/^https?:\/\//.test(tab.favIconUrl) ? (
          <Logo src={tab.favIconUrl} alt={tab.title} />
        ) : (
          favIconPlaceholder
        )}
      </RowIconWrapper>

      <Title>{tab.title}</Title>

      <CloseView
        onClick={() => {
          console.log('closed tab is ', tab);
          onRemove(tab);
        }}
        className="closeView"
      >
        <ClearIcon />
      </CloseView>
    </RowView>
  );
}

export default Row;
