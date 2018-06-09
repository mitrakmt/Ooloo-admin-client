import React from 'react';

import './listTitle.css';

const ListTitle = ({ showAddContainerStatus, showAddContainer, title }) => (
  <div className="listTitle">
    <div className="listTitle-headerContainer">
      <h1 className="listTitle-headerContainer-title">{title}</h1>
    </div>
    <div className="listTitle-addButtonContainer">
      <h2 className="listTitle-addButtonContainer-icon" onClick={showAddContainer}>
        {showAddContainerStatus ? 'x' : '+'}
      </h2>
    </div>
  </div>
);

export default ListTitle;
