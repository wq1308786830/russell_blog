import React from 'react';
import BigNav from './components/BigNav';
import TimeLineArticleList from './components/TimeLineArticleList';
import CategoryList from './components/CategoryList';

function Index() {
  return (
    <>
      <BigNav category={null} />
      <TimeLineArticleList />
      <CategoryList category={null} />
    </>
  );
}

export default Index;
