import React, { useEffect, useState } from 'react';
import { StatsContainer, StatCard, StatTitle, StatValue } from './Stats.styles';
import { useNavigate } from 'react-router-dom';

import { getNoOfCourses } from '../../../../api/courseApi';
import { getNoOfNotes } from '../../../../api/notesApi';
import { getNoOfStudents } from '../../../../api/authApi';
import { getNoOfSubjects } from '../../../../api/subjectApi';

const Stats = () => {
  const navigate = useNavigate();
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
        setStats({ courses: 0, students: 0, subjects: 0, notes: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsData = [
    { title: 'Total Courses', value: stats.courses ?? '-', onClick: () => navigate('/admin/course-management') },
    { title: 'Total Students', value: stats.students ?? '-', onClick: () => navigate('/admin/student-management') },
    { title: 'Subjects', value: stats.subjects ?? '-', onClick: () => navigate('/admin/subject-management') },
    { title: 'Notes', value: stats.notes ?? '-', onClick: () => navigate('/admin/notes-management') },
  ];

  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          onClick={stat.onClick}
          style={{ cursor: stat.onClick ? 'pointer' : 'default' }}
        >
          <div className='stat-header'>
            <StatTitle>{stat.title}</StatTitle>
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
