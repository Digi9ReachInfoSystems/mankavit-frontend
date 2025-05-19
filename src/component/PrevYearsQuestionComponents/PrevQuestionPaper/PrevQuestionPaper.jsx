import React, { useEffect, useState } from 'react';
import { 
  Container, 
  TelegramBanner, 
  PaperSection, 
  PaperCard, 
  PaperTitle, 
  YearButtons, 
  YearButton, 
  TelegramButton,
  CustomAntdSelect
} from './PrevQuestionPaper.styles';
import Telegram from "../../../assets/telegram-logo.svg";
import study1 from "../../../assets/Study1.png";
import { getAllQuestionPapers } from '../../../api/questionPaperApi';

const PrevQuestionPaper = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllQuestionPapers();
        setPapers(data);
      } catch (error) {
        console.error('Error fetching question papers:', error);
      }
    };
    fetchData();
  }, []);

  // Group papers by title
  const grouped = papers.reduce((acc, paper) => {
    const { title, year, question_url } = paper;
    if (!acc[title]) acc[title] = [];
    acc[title].push({ year, url: question_url });
    return acc;
  }, {});

  const handleYearClick = (url) => {
    // Open PDF in new tab
    window.open(url, '_blank');
  };

  return (
    <Container>
      <h2>Previous Question Paper</h2>

      <TelegramBanner>
        <img src={Telegram} alt="Telegram" />
        <TelegramButton>Join Our Telegram Channel</TelegramButton>
      </TelegramBanner>

      <PaperSection>
        {Object.entries(grouped).map(([title, entries]) => (
          <PaperCard key={title}>
            {/* Static thumbnail image */}
            <img className="image-placeholder" alt="Paper Thumbnail" src={study1} />

            <div className="content">
              <PaperTitle>{title}</PaperTitle>

              <YearButtons>
                {entries.map(({ year, url }) => (
                  <YearButton
                    key={year}
                    onClick={() => handleYearClick(url)}
                  >
                    {year}
                  </YearButton>
                ))}

                <CustomAntdSelect
                  placeholder="Select Year"
                  onChange={(value) => {
                    const selected = entries.find(e => e.year === value);
                    if (selected) handleYearClick(selected.url);
                  }}
                  options={entries.map(e => ({ value: e.year, label: e.year }))}
                />
              </YearButtons>
            </div>
          </PaperCard>
        ))}
      </PaperSection>
    </Container>
  );
};

export default PrevQuestionPaper;