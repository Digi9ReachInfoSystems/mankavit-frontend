import React, { useEffect, useState } from 'react';
import { 
  Container, PaperSection, PaperCard, PaperTitle, 
  YearButtons, YearButton, CustomAntdSelect
} from './PrevQuestionPaper.styles';
import study1 from "../../../assets/Study1.png";
import { getAllQuestionPapers } from '../../../api/questionPaperApi';
import { FiDownload } from "react-icons/fi";

const PrevQuestionPaper = () => {
  const [groups, setGroups] = useState({}); // { [title]: [{year, url}] }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getAllQuestionPapers();
        const raw = Array.isArray(resp?.data) ? resp.data : resp;

        // normalize both shapes:
        // A) [{ title, papers:[{year, question_url}] }]
        // B) [{ title, year, question_url }]
        const flat = raw.flatMap(item => {
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
        }).filter(x => x.title && x.year && x.url);

        // group by title and sort years desc
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

  const downloadFile = (url, filename = "question-paper.pdf") => {
    // Works when same-origin or when the file host allows download attribute.
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename); // may be ignored cross-origin
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Container>
      <h2>Previous Question Paper</h2>

      <PaperSection>
        {Object.entries(groups).map(([title, entries]) => (
          <PaperCard key={title}>
            <img className="image-placeholder" alt="Paper Thumbnail" src={study1} />
            <div className="content">
              <PaperTitle>{title} Question paper</PaperTitle>

              <YearButtons>
                {entries.map(({ year, url }, idx) => (
                  <div key={`${title}-${year}-${idx}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <YearButton onClick={() => openInNewTab(url)} title="Open in new tab">
                      {year}
                    </YearButton>
                    {/* <FiDownload
                      style={{ cursor: "pointer" }}
                      title="Download"
                      onClick={() => downloadFile(url, `${title}-${year}.pdf`)}
                      size={18}
                    /> */}
                  </div>
                ))}

                {/* <CustomAntdSelect
                  placeholder="Year"
                  onChange={(value) => {
                    const selected = entries.find(e => String(e.year) === String(value));
                    if (selected) openInNewTab(selected.url);
                  }}
                  options={entries.map(e => ({ value: e.year, label: e.year }))}
                /> */}
              </YearButtons>
            </div>
          </PaperCard>
        ))}
      </PaperSection>
    </Container>
  );
};

export default PrevQuestionPaper;
