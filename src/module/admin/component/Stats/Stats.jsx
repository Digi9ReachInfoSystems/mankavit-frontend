import React from 'react';
import { StatsContainer, StatCard, StatTitle, StatValue, MenuIcon } from './Stats.styles';

const statsData = [
  { title: 'Total Courses', value: '1,534' },
  { title: 'Total Students', value: '869' },
  { title: 'Subjects', value: '236' },
  { title: 'Note', value: '429' },
];

const Stats = () => {
  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatCard key={index}>
          <div className='stat-header'>
            <StatTitle>{stat.title}</StatTitle>
            <MenuIcon>...</MenuIcon>
          </div>
          <StatValue>{stat.value}</StatValue>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default Stats;
