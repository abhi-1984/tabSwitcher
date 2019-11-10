/*global chrome*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClearIcon, MuteIcon, AudibleIcon, PinIcon } from './Icons';

const RowView = styled(motion.div)`
  cursor: pointer;
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 32px 1fr;
  grid-column-gap: 8px;
  align-items: center;
  padding: 0 12px;
  background-color: #fff;
  transition: all 200ms ease;
  position: relative;

  &:hover {
    background-color: #f4f5f7;
    color: #0057ff;
    .options-wrapper {
      right: 0;
      div {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`;

const RowIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  width: calc(100%);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RowOptions = styled.div`
  position: absolute;
  z-index: 2;
  height: 100%;
  top: 0;
  bottom: 0;
  background-color: #f4f5f7;
  right: -136px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 200ms ease-in-out;
`;

const RowOption = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 6px;
  transform: scale(0.7);
  opacity: 0;
  transition: all 300ms ease-in-out;
  transition-delay: 100ms;

  background-color: ${(props) =>
    props.action === 'mute'
      ? '#0057ff'
      : props.action === 'pin'
      ? '#E79739'
      : '#CC242F'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const favIconPlaceholder = (
  <svg viewBox="0 0 16 16" fill="none" stroke="#5A5A5A" strokeWidth="1">
    <polygon points="3.5,1.5 8.5,1.5 12.5,5.5 12.5,14.5 3.5,14.5" />
    <polyline points="8.5,1.5 8.5,5.5 12.5,5.5" />
  </svg>
);

function Row({ tab, onRemove, onSelect }) {
  const [isMuted, setMuted] = useState(tab.mutedInfo.muted);

  const handleAudioPlayback = (tab) => {
    if (isMuted) {
      chrome.tabs.update(tab.id, { muted: false });
      setMuted(false);
    } else {
      chrome.tabs.update(tab.id, { muted: true });
      setMuted(true);
    }
  };

  return (
    <RowView
      onClick={(event) => {
        onSelect(tab);
        event.stopPropagation();
      }}
    >
      <RowIconWrapper>
        {/^https?:\/\//.test(tab.favIconUrl) ? (
          <Logo src={tab.favIconUrl} alt={tab.title} />
        ) : (
          favIconPlaceholder
        )}
      </RowIconWrapper>

      <Title>{tab.title}</Title>

      {console.log('tab is muted', tab.muted)}

      <RowOptions className="options-wrapper">
        {tab.audible && (
          <RowOption
            action="mute"
            onClick={(event) => {
              handleAudioPlayback(tab);
              event.stopPropagation();
            }}
          >
            {isMuted ? <MuteIcon /> : <AudibleIcon />}
          </RowOption>
        )}

        <RowOption
          onClick={(event) => {
            event.stopPropagation();
          }}
          action="pin"
        >
          <PinIcon />
        </RowOption>

        <RowOption
          action="close"
          onClick={(event) => {
            onRemove(tab);
            event.stopPropagation();
          }}
        >
          <ClearIcon />
        </RowOption>
      </RowOptions>
    </RowView>
  );
}

export default Row;
