import React, { useEffect, useState } from 'react';
import { 
  Container, PaperSection, PaperCard, PaperTitle, 
  YearButtons, YearButton, CustomAntdSelect
} from './PrevQuestionPaper.styles';
import study1 from "../../../assets/Study1.png";
import { getAllQuestionPapers } from '../../../api/questionPaperApi';
import Whatsapp from "../../../assets/whatsapp.svg";
import Telegram from "../../../assets/telegram.svg";

// Direct links
const WHATSAPP_LINK = "https://wa.me/917979700796";
const TELEGRAM_LINK = "https://t.me/llm_entrances_clat_ailet";

const VISIBLE_COUNT = 4;

const PrevQuestionPaper = () => {
  const [groups, setGroups] = useState({}); // { [title]: [{year, url}] }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getAllQuestionPapers();
        const raw = Array.isArray(resp?.data) ? resp.data : resp;

        const flat = raw
          .flatMap(item => {
            if (Array.isArray(item?.papers)) {
              return item.papers.map(p => ({
                title: item.title,
                year: p.year,
                url: p.question_url,
              }));
            }
            return [{
              title: item.title,
              year: item.year,
              url: item.question_url,
            }];
          })
          .filter(x => x.title && x.year && x.url);

        const grouped = flat.reduce((acc, { title, year, url }) => {
          acc[title] ??= [];
          acc[title].push({ year, url });
          return acc;
        }, {});
        Object.keys(grouped).forEach(k => {
          grouped[k].sort((a, b) => String(b.year).localeCompare(String(a.year)));
        });

        setGroups(grouped);
      } catch (e) {
        console.error("Error fetching question papers:", e);
      }
    };
    fetchData();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <h2>Previous Question Paper</h2>

      {/* WhatsApp & Telegram icons row (using your direct links) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "6px 0 18px",
        }}
      >
        <span style={{ fontSize: 14, opacity: 0.8 }}>Join us:</span>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          title="Open WhatsApp"
          aria-label="Open WhatsApp"
        >
          <img
            src={Whatsapp}
            alt="WhatsApp"
            style={{ width: 42, height: 42, objectFit: "contain", display: "block" }}
          />
        </a>
        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Telegram"
          aria-label="Open Telegram"
        >
          <img
            src={Telegram}
            alt="Telegram"
            style={{ width: 42, height: 42, objectFit: "contain", display: "block" }}
          />
        </a>
      </div>

      <PaperSection>
        {Object.entries(groups).map(([title, entries]) => {
          const visible = entries.slice(0, VISIBLE_COUNT);
          const overflow = entries.slice(VISIBLE_COUNT);

          return (
            <PaperCard key={title}>
              <img className="image-placeholder" alt="Paper Thumbnail" src={study1} />
              <div className="content">
                <PaperTitle>{title} Question paper</PaperTitle>

                <YearButtons>
                  {visible.map(({ year, url }, idx) => (
                    <div
                      key={`${title}-btn-${year}-${idx}`}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <YearButton onClick={() => openInNewTab(url)} title="Open in new tab">
                        {year}
                      </YearButton>
                    </div>
                  ))}

                  {overflow.length > 0 && (
                    <CustomAntdSelect
                      placeholder="Select"
                      size='middle'
                      onChange={(value) => value && openInNewTab(value)}
                      options={overflow.map((e, i) => ({
                        value: e.url,
                        label: String(e.year),
                        key: `${title}-opt-${e.year}-${i}`,
                      }))}
                      style={{ minWidth: 140 }}
                    />
                  )}
                </YearButtons>
              </div>
            </PaperCard>
          );
        })}
      </PaperSection>
    </Container>
  );
};

export default PrevQuestionPaper;
