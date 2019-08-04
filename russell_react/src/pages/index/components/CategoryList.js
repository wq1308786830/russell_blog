import React from 'react';
import { Collapse, Icon } from 'antd/lib/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CategoryList(props) {
  const { category } = props;

  const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden'
  };

  return (
    <>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      >
        {category &&
          category.map(c => {
            return (
              <Collapse header={c.name} key={c.id} style={customPanelStyle}>
                {c.subCategory &&
                  c.subCategory.map(s => (
                    <Link key={s.id} to={`/articles/${s.id}`}>
                      {s.name}
                    </Link>
                  ))}
              </Collapse>
            );
          })}
      </Collapse>
    </>
  );
}

CategoryList.propTypes = {
  category: PropTypes.array.isRequired
};

export default CategoryList;
