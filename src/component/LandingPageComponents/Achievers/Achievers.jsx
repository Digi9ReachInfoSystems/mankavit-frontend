import React, { useEffect, useMemo, useState } from 'react';
import {
  AchieversSection,
  Title,
  Highlight,
  Description,
  Grid,
  Card,
  AvatarWrap,
  Avatar,
  Name,
  Achievement,
  ProgressBarWrapper,
  ProgressBar,
  LoadingMessage,
  ErrorMessage,
  ViewAllButton,
  TopBar,
  Chip,
  ChipCount,
} from './Achievers.styles';
import { getAllAchievers } from '../../../api/achieverApi';

const Achievers = ({ navigateOnViewAll = false, viewAllPath = '/achievers' }) => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedExam, setSelectedExam] = useState('All');

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        setLoading(true);
        const res = await getAllAchievers();
        const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];

        // sort by sequence ascending: 1, 1.1, 2, 2.1 ...
        const sorted = list.slice().sort((a, b) => {
          const A = Number.parseFloat(a?.sequence ?? Number.POSITIVE_INFINITY);
          const B = Number.parseFloat(b?.sequence ?? Number.POSITIVE_INFINITY);
          return A - B;
        });

        setAchievers(sorted);
      } catch (e) {
        console.error('Error fetching achievers:', e);
        setError(e?.message || 'Failed to load achievers');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, []);

  // Build exam options + counts
  const { examOptions, countsByExam } = useMemo(() => {
    const counts = achievers.reduce((acc, cur) => {
      const key = (cur?.exam_name || 'Unknown').trim();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const options = Object.keys(counts).sort((a, b) => a.localeCompare(b));
    return { examOptions: options, countsByExam: counts };
  }, [achievers]);

  // Filter achievers based on selected exam
  const filteredAchievers = useMemo(() => {
    if (selectedExam === 'All') return achievers;
    return achievers.filter(a => (a?.exam_name || 'Unknown').trim() === selectedExam);
  }, [achievers, selectedExam]);

  // limit to 8 unless "view all"
  const visible = showAll ? filteredAchievers : filteredAchievers.slice(0, 8);

  if (loading) return <LoadingMessage>Loading achievers...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!achievers || achievers.length === 0) return <LoadingMessage>No achievers data available</LoadingMessage>;

  const handleViewAll = () => {
    if (navigateOnViewAll) {
      window.location.href = viewAllPath;
    } else {
      setShowAll(true);
    }
  };

  const handleSelect = (exam) => {
    setSelectedExam(exam);
    setShowAll(false); // reset pagination whenever filter changes
  };

  const totalCount = achievers.length;
  const filteredCount = filteredAchievers.length;

  return (
    <AchieversSection>
      <Title>
        Meet Our <Highlight>Achievers</Highlight>
      </Title>

      {/* Horizontal filter top bar */}
      <TopBar role="tablist" aria-label="Filter achievers by exam">
        <Chip
          role="tab"
          aria-selected={selectedExam === 'All'}
          $active={selectedExam === 'All'}
          onClick={() => handleSelect('All')}
        >
          All <ChipCount>{totalCount}</ChipCount>
        </Chip>

        {examOptions.map((exam) => (
          <Chip
            key={exam}
            role="tab"
            aria-selected={selectedExam === exam}
            $active={selectedExam === exam}
            title={exam}
            onClick={() => handleSelect(exam)}
          >
            {exam} <ChipCount>{countsByExam[exam]}</ChipCount>
          </Chip>
        ))}
      </TopBar>

      {/* Grid of cards */}
      <Grid>
        {visible.map((achiever, idx) => (
          <Card key={achiever._id || idx}>
            <AvatarWrap>
              <Avatar src={achiever.image || 'default-avatar.png'} alt={achiever.name || 'Achiever'} />
            </AvatarWrap>
            <Name>{(achiever.name || '').toUpperCase()}</Name>
            <Achievement>
              {/* “CLAT PG 2022 - AIR 1” style */}
              {achiever.exam_name}{achiever.exam_name ? ' - ' : ''}AIR {achiever.rank}
            </Achievement>
          </Card>
        ))}
      </Grid>

      {/* Optional progress bar (kept for visual polish) */}
      <ProgressBarWrapper>
        <ProgressBar width={scrollProgress} />
      </ProgressBarWrapper>

      {/* VIEW ALL button shows only when there are > 8 filtered items and not already showing all */}
      {!showAll && filteredCount > 8 && (
        <ViewAllButton onClick={handleViewAll}>VIEW ALL</ViewAllButton>
      )}
    </AchieversSection>
  );
};

export default Achievers;
