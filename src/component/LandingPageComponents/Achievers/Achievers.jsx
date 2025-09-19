import React, { useEffect, useMemo, useState } from 'react';
import {
  AchieversSection,
  Title,
  Highlight,
  Grid,
  Card,
  AvatarWrap,
  Avatar,
  Name,
  Achievement,
  LoadingMessage,
  ErrorMessage,
  ViewAllButton,
  TopBar,
  Chip,
  ChipCount,
  SectionHeader,
  FilterLabel,
  AchievementText,
} from './Achievers.styles';
import { getAllAchievers } from '../../../api/achieverApi';

const normalizeExam = (raw) => {
  // Remove standalone 4-digit years, collapse spaces, uppercase for consistent keys
  return String(raw ?? 'Unknown')
    .replace(/\b(19|20)\d{2}\b/g, '') // drop years like 2022, 2023, 2024...
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
};


const Achievers = ({ navigateOnViewAll = false, viewAllPath = '/achievers' }) => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedExam, setSelectedExam] = useState('All');

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        setLoading(true);
        const res = await getAllAchievers();
        // console.log('Fetched achievers:', res);
        const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];

        const sorted = list.slice().sort((a, b) => {
          const A = Number.parseFloat(a?.sequence ?? Number.POSITIVE_INFINITY);
          const B = Number.parseFloat(b?.sequence ?? Number.POSITIVE_INFINITY);
          return A - B;
        });

        setAchievers(sorted);
      } catch (e) {
        // console.error('Error fetching achievers:', e);
        setError(e?.message || 'Failed to load achievers');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, []);

 const { examOptions, countsByExam } = useMemo(() => {
    const counts = achievers.reduce((acc, cur) => {
      const key = normalizeExam(cur?.exam_name);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const options = Object.keys(counts).sort((a, b) => a.localeCompare(b));
    return { examOptions: options, countsByExam: counts };
  }, [achievers]);
  

 const filteredAchievers = useMemo(() => {
    if (selectedExam === 'All') return achievers;
    return achievers.filter(a => normalizeExam(a?.exam_name) === selectedExam);
  }, [achievers, selectedExam]);

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
    setShowAll(false);
  };

  const totalCount = achievers.length;
  const filteredCount = filteredAchievers.length;

  return (
    <AchieversSection>
      <SectionHeader>
        <Title>
          Meet Our <Highlight>Achievers</Highlight>
        </Title>
        {/* <FilterLabel>Filter by exam:</FilterLabel> */}
      </SectionHeader>

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

      <Grid>
        {visible.map((achiever, idx) => (
          <Card key={achiever._id || idx}>
            <AvatarWrap>
              <Avatar src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${achiever.image}` || 'default-avatar.png'} alt={achiever.name || 'Achiever'} />
            </AvatarWrap>
            <Name>{(achiever.name || '').toUpperCase()}</Name>
            <Achievement>
              <AchievementText>
                {/* {achiever.exam_name}
                {achiever.exam_name ? ' - ' : ''} */}
                AIR {achiever.rank}
              </AchievementText>
            </Achievement>
          </Card>
        ))}
      </Grid>

      {!showAll && filteredCount > 8 && (
        <ViewAllButton onClick={handleViewAll}>VIEW ALL</ViewAllButton>
      )}
    </AchieversSection>
  );
};

export default Achievers;