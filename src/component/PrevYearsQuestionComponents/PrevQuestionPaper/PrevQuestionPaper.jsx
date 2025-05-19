import React from 'react';
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

const years = ['2024', '2023', '2022', '2021', '2020'];

const PrevQuestionPaper = () => {
  return (
    <Container>
      <h2>Previous Question Paper</h2>

      <TelegramBanner>
        <img src={Telegram} alt="Telegram" />
        <TelegramButton>Join Our Telegram Channel</TelegramButton>
      </TelegramBanner>

      <PaperSection>
        {[1, 2, 3, 4].map((item) => (
          <PaperCard key={item}>
            <img className="image-placeholder" alt="Paper Thumbnail" src={study1} />
            <div className='content'>
              <PaperTitle>CLAT LL.M Question Paper</PaperTitle>
              <YearButtons>
                {years.map((year) => (
                  <YearButton key={year}>{year}</YearButton>
                ))}
                <CustomAntdSelect
                  placeholder="Select Year"
                  options={years.map(year => ({ value: year, label: year }))}
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
