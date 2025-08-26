import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Content,
  LeftImage,
  RightSection,
  Heading,
  SubHeading,
  ToolsRow,
  SearchWrap,
  SearchInput,
  SearchIcon,
  CountPill,
  Controls,
  ControlButton,
  FaqList,
  QuestionItem,
  QuestionHeader,
  QuestionText,
  ArrowIcon,
  AnswerWrap,
  AnswerInner,
  Answer,
  ViewAllButton,
  LoadingMessage,
  ErrorMessage,
  NoFaqMessage,
  Skeleton,
  SkeletonRow
} from "./GotQuestions.styles";
import { getAllfaqs } from "../../../api/faqApi";
import ladyJustice from "../../../assets/Study2.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const INITIAL_VISIBLE = 10;

const GotQuestion = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIds, setOpenIds] = useState([]); // allow multiple open
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllfaqs();

        // Normalize response
        let data = [];
        if (Array.isArray(response)) data = response;
        else if (Array.isArray(response?.data)) data = response.data;
        else if (Array.isArray(response?.faqs)) data = response.faqs;
        else throw new Error("Invalid FAQ data format");

        // Stable shape: { _id, question, answer }
        setFaqs(
          data.map((d, i) => ({
            _id: d._id || String(i),
            question: d.question || "Untitled question",
            answer: d.answer || ""
          }))
        );
      } catch (err) {
        setError(err?.message || "Could not load FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return faqs;
    return faqs.filter(
      f =>
        f.question?.toLowerCase().includes(term) ||
        f.answer?.toLowerCase().includes(term)
    );
  }, [faqs, q]);

  const visibleFaqs = useMemo(() => {
    if (showAll) return filteredFaqs;
    return filteredFaqs.slice(0, INITIAL_VISIBLE);
  }, [filteredFaqs, showAll]);

  const toggleId = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(visibleFaqs.map(f => f._id));
  const collapseAll = () => setOpenIds([]);

  const allVisibleOpen = visibleFaqs.length > 0 && visibleFaqs.every(f => openIds.includes(f._id));

  return (
    <Container>
      <Content>
        {/* <LeftImage src={ladyJustice} alt="Justice illustration" /> */}

        <RightSection>
          <Heading>Got questions?</Heading>
          <SubHeading>
            Quickly find answers to common queries. Use search, then expand any question to view details.
          </SubHeading>

          <ToolsRow>
            <SearchWrap>
              <SearchIcon><IoSearchOutline /></SearchIcon>
              <SearchInput
                type="search"
                placeholder="Search questions…"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShowAll(false); // reset pagination when searching
                }}
                aria-label="Search FAQs"
              />
            </SearchWrap>

            <CountPill>
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </CountPill>

            <Controls>
              <ControlButton onClick={allVisibleOpen ? collapseAll : expandAll}>
                {allVisibleOpen ? "Collapse all" : "Expand all"}
              </ControlButton>
              {/* <ControlButton onClick={() => setShowAll(s => !s)}>
                {showAll
                  ? `Show less`
                  : `Show more (${Math.max(filteredFaqs.length - INITIAL_VISIBLE, 0)})`}
              </ControlButton> */}
            </Controls>
          </ToolsRow>

          {/* States */}
          {loading && (
            <FaqList aria-busy="true" aria-live="polite">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i}>
                  <Skeleton $h={16} />
                  <Skeleton $h={12} />
                </SkeletonRow>
              ))}
            </FaqList>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!loading && !error && filteredFaqs.length === 0 && (
            <NoFaqMessage>No FAQs matched your search.</NoFaqMessage>
          )}

          {!loading && !error && filteredFaqs.length > 0 && (
            <>
              <FaqList>
                {visibleFaqs.map((faq) => {
                  const isOpen = openIds.includes(faq._id);
                  return (
                    <QuestionItem key={faq._id}>
                      <QuestionHeader
                        onClick={() => toggleId(faq._id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq._id}`}
                      >
                        <QuestionText>{faq.question}</QuestionText>
                        <ArrowIcon $open={isOpen}>
                          <IoIosArrowDown />
                        </ArrowIcon>
                      </QuestionHeader>

                      <AnswerWrap id={`faq-panel-${faq._id}`} $open={isOpen}>
                        <AnswerInner>
                          <Answer>
                            {faq.answer || "No answer available."}
                          </Answer>
                        </AnswerInner>
                      </AnswerWrap>
                    </QuestionItem>
                  );
                })}
              </FaqList>

              {filteredFaqs.length > INITIAL_VISIBLE && (
                <ViewAllButton onClick={() => setShowAll(s => !s)}>
                  {showAll
                    ? "Show less"
                    : `Show more (${filteredFaqs.length - INITIAL_VISIBLE})`}
                </ViewAllButton>
              )}
            </>
          )}

          {/* If you have a full FAQ page, re-enable this */}
          {/* <ViewAllButton onClick={() => navigate('/faq')}>
            View All Questions
          </ViewAllButton> */}
        </RightSection>
      </Content>
    </Container>
  );
};

export default GotQuestion;
