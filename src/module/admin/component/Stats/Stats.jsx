


import React, { useEffect, useState } from 'react';
import { StatsContainer, StatCard, StatTitle, StatValue, MenuIcon } from './Stats.styles';

import { getNoOfCourses } from '../../../../api/courseApi'; // <-- update path
import { getNoOfNotes } from '../../../../api/notesApi';
import { getNoOfStudents } from '../../../../api/authApi';
import { getNoOfSubjects } from '../../../../api/subjectApi';
const Stats = () => {
  const [stats, setStats] = useState({
    courses: null,
    students: null,
    subjects: null,
    notes: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch all stats in parallel
        const [coursesRes, studentsRes, subjectsRes, notesRes] = await Promise.all([
          getNoOfCourses(),
          getNoOfStudents(),
          getNoOfSubjects(),
          getNoOfNotes(),
        ]);
        setStats({
          courses: coursesRes.count ?? 0,
          students: studentsRes.count ?? 0,
          subjects: subjectsRes.count ?? 0,
          notes: notesRes.count ?? 0,
        });
      } catch (err) {
        // If error, keep stats at 0 or show error message
        setStats({ courses: 0, students: 0, subjects: 0, notes: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsData = [
    { title: 'Total Courses', value: stats.courses ?? '-' },
    { title: 'Total Students', value: stats.students ?? '-' },
    { title: 'Subjects', value: stats.subjects ?? '-' },
    { title: 'Notes', value: stats.notes ?? '-' },
    // { title: 'Mock Tests(is not integarted)', value: stats.notes ?? '-' },
  ];

  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatCard key={index}>
          <div className='stat-header'>
            <StatTitle>{stat.title}</StatTitle>
            {/* <MenuIcon>...</MenuIcon> */}
          </div>
          <StatValue>
            {loading ? <span style={{ fontSize: '12px' }}>Loading...</span> : stat.value}
          </StatValue>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default Stats;
