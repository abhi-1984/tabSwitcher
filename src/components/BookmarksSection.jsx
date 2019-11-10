import React from 'react';
import styled from 'styled-components';

const BookmarksSectionWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px -4px 16px rgba(3, 13, 41, 0.1);
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 40px;
`;

function BookmarksSection() {
  return (
    <BookmarksSectionWrapper>
      <h1>bookmarks</h1>
    </BookmarksSectionWrapper>
  );
}

export default BookmarksSection;
