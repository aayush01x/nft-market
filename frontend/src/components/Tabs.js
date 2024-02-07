// Tabs.js
import React from 'react';
import styled from '@emotion/styled';

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? '#3498db' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
`;

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default Tabs;
