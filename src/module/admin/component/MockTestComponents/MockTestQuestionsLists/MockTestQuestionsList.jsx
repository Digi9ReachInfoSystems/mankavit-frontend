import React, { useState } from 'react';
import {
  MockTestQuestionsListContainer,
  Title,
  PageContainer,
  PageHeader,
  QuestionContainer,
  Question,
  QuestionNumber,
  QuestionActions,
  IconButton,
  CreateButton,
  PageFooter,
  PageControl,
} from './MockTestQuestionsList.styles';
import {
  FaTrash,
  FaPlus,
  FaEdit,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

// Create new blank option
const createEmptyOption = () => ({ text: '', marks: 0, isCorrect: false });

// Create new question with no options
const createEmptyQuestion = () => ({
  type: 'mcq',
  text: '',
  options: [],
  marks: 0,
});

const MockTestQuestionsList = () => {
  const [pages, setPages] = useState([]);
  const [editingRef, setEditingRef] = useState(null);

  const addPage = () => setPages(prev => [...prev, { questions: [] }]);

  const deletePage = (pi) =>
    setPages(prev => prev.filter((_, i) => i !== pi));

const addQuestion = (pi = 0) => {
  setPages(prev => {
    const newPages = [...prev];
    while (newPages.length <= pi) newPages.push({ questions: [] });

    const questions = newPages[pi].questions;
    const nextIndex = questions.length;
    newPages[pi] = {
      ...newPages[pi],
      questions: [...questions, createEmptyQuestion()],
    };

    setEditingRef({ page: pi, q: nextIndex }); // Open only this one

    return newPages;
  });
};


  const deleteQuestion = (pi, qi) =>
    setPages(prev => {
      const copy = [...prev];
      copy[pi].questions.splice(qi, 1);
      return copy;
    });

  const moveQuestion = (pi, qi, dir) =>
    setPages(prev => {
      const copy = [...prev];
      const swap = dir === 'up' ? qi - 1 : qi + 1;
      if (swap < 0 || swap >= copy[pi].questions.length) return prev;
      [copy[pi].questions[qi], copy[pi].questions[swap]] = [
        copy[pi].questions[swap],
        copy[pi].questions[qi],
      ];
      return copy;
    });

  const updateQuestionField = (pi, qi, field, value) =>
    setPages(prev => {
      const copy = [...prev];
      copy[pi].questions[qi][field] = value;

      if (field === 'type') {
        if (value === 'subjective') {
          copy[pi].questions[qi].options = [];
        }
      }
      return copy;
    });

  const updateOptionField = (pi, qi, oi, field, value) =>
    setPages(prev => {
      const copy = [...prev];
      copy[pi].questions[qi].options[oi][field] = value;

      if (field === 'isCorrect' && value === true) {
        copy[pi].questions[qi].options.forEach((o, idx) => {
          if (idx !== oi) o.isCorrect = false;
        });
      }

      return copy;
    });
const addOption = (pi, qi) =>
  setPages(prev =>
    prev.map((page, pIdx) =>
      pIdx === pi
        ? {
            ...page,
            questions: page.questions.map((question, qIdx) =>
              qIdx === qi
                ? {
                    ...question,
                    options: [...question.options, createEmptyOption()],
                  }
                : question
            ),
          }
        : page
    )
  );


  const isEditing = (pi, qi) =>
    editingRef?.page === pi && editingRef?.q === qi;

  return (
    <MockTestQuestionsListContainer>
      <Title>📝 Mock Test Question Pages</Title>

      {pages.length === 0 ? (
        <CreateButton onClick={() => addQuestion()}>
          <FaPlus /> Create New Question
        </CreateButton>
      ) : (
        <>
          {pages.map((page, pi) => (
            <PageContainer key={pi}>
              <PageHeader>
                Page {pi + 1} (Total Questions: {page.questions.length})
                <IconButton onClick={() => deletePage(pi)}>
                  <FaTrash color="red" />
                </IconButton>
              </PageHeader>

{page.questions.map((q, qi) => {
  const isThisEditing = isEditing(pi, qi);
  return (
    <QuestionContainer key={qi}>
      <Question>
        <QuestionNumber>{qi + 1}.</QuestionNumber>
        <QuestionActions>
          <IconButton onClick={() => setEditingRef({ page: pi, q: qi })}>
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => deleteQuestion(pi, qi)}>
            <FaTrash color="red" />
          </IconButton>
          <PageControl>
            {qi > 0 && (
              <IconButton onClick={() => moveQuestion(pi, qi, 'up')}>
                <FaArrowUp color="green" />
              </IconButton>
            )}
            {qi < page.questions.length - 1 && (
              <IconButton onClick={() => moveQuestion(pi, qi, 'down')}>
                <FaArrowDown color="red" />
              </IconButton>
            )}
          </PageControl>
        </QuestionActions>
      </Question>

                  {isEditing(pi, qi) && (
                    <div
                      style={{
                        border: '1px solid #eee',
                        padding: '1rem',
                        marginTop: '.75rem',
                        borderRadius: 4,
                        background: '#fafafa',
                      }}
                    >
                      <label style={{ fontWeight: 600 }}>
                        Question Type:&nbsp;
                        <select
                          value={q.type}
                          onChange={(e) =>
                            updateQuestionField(pi, qi, 'type', e.target.value)
                          }
                        >
                          <option value="mcq">MCQ</option>
                          <option value="subjective">Subjective</option>
                        </select>
                      </label>

                      <div style={{ marginTop: '1rem' }}>
                        <textarea
                          placeholder="Type your question here…"
                          value={q.text}
                          rows={4}
                          style={{ width: '100%' }}
                          onChange={(e) =>
                            updateQuestionField(pi, qi, 'text', e.target.value)
                          }
                        />
                      </div>

                      {q.type === 'mcq' && (
                        <div style={{ marginTop: '1.5rem' }}>
                          <h4 style={{ marginBottom: '.5rem' }}>Options</h4>
                          {q.options.map((opt, oi) => (
                            <div
                              key={oi}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 100px 100px',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                              }}
                            >
                              <input
                                placeholder={`Option ${oi + 1}`}
                                value={opt.text}
                                onChange={(e) =>
                                  updateOptionField(pi, qi, oi, 'text', e.target.value)
                                }
                              />
                              <input
                                type="number"
                                min={0}
                                placeholder="Marks"
                                value={opt.marks}
                                onChange={(e) =>
                                  updateOptionField(
                                    pi,
                                    qi,
                                    oi,
                                    'marks',
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <label
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={opt.isCorrect}
                                  onChange={(e) =>
                                    updateOptionField(
                                      pi,
                                      qi,
                                      oi,
                                      'isCorrect',
                                      e.target.checked
                                    )
                                  }
                                />
                                Correct
                              </label>
                            </div>
                          ))}

                          <CreateButton onClick={() => addOption(pi, qi)}>
                            <FaPlus /> Add New Option
                          </CreateButton>
                        </div>
                      )}

                      {q.type === 'subjective' && (
                        <div style={{ marginTop: '1.5rem' }}>
                          <label>Marks</label>
                          <input
                            type="number"
                            min={0}
                            placeholder="Marks"
                            value={q.marks}
                            onChange={(e) =>
                              updateQuestionField(pi, qi, 'marks', Number(e.target.value))
                            }
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                          />
                        </div>
                      )}

                      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                        <CreateButton onClick={() => setEditingRef(null)}>
                          Save Question
                        </CreateButton>
                      </div>
                    </div>
      )}
    </QuestionContainer>
  );
})}

              <PageFooter>
                <CreateButton onClick={() => addQuestion(pi)}>
                  <FaPlus /> Create New Question
                </CreateButton>
              </PageFooter>
            </PageContainer>
          ))}

          <CreateButton onClick={addPage}>
            <FaPlus /> Create New Page
          </CreateButton>
        </>
      )}
    </MockTestQuestionsListContainer>
  );
};

export default MockTestQuestionsList;
