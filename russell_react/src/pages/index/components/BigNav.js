import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BigNav(props) {
  const { category } = props;
  return (
    <>
      <div>
        <img alt="avatar" src="https://oss.biosan.cn/weichat/mine/WechatIMG1.jpeg" />
      </div>
      <nav>
        {category ? category.map(i => <Link to={`/category/${i.id}`}>{i.name}</Link>) : null}
      </nav>
    </>
  );
}

BigNav.propTypes = {
  category: PropTypes.array.isRequired
};

export default BigNav;
