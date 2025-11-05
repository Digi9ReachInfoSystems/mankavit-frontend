// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   MockTestQuestionsListContainer,
//   Title,
//   QuestionContainer,
//   Question,
//   QuestionNumber,
//   QuestionActions,
//   IconButton,
//   CreateButton,
//   PageFooter,
//   PageControl,
// } from "./MockTestQuestionsList.styles";
// import {
//   FaTrash,
//   FaPlus,
//   FaEdit,
//   FaArrowUp,
//   FaArrowDown,
//   FaEye,
// } from "react-icons/fa";
// import {
//   addmocktestquestions,
//   removemocktestquestions,
//   updatemocktestquestions,
//   getMocktestById,
//   rearrangeMocktestQuestions,
// } from "../../../../../api/mocktestApi";
// import { useParams } from "react-router-dom";
// import DeleteModal from "../../../component/DeleteModal/DeleteModal";
// import { toast } from "react-toastify";
// import JoditEditor from "jodit-react";
// import { getAuth } from "../../../../../utils/authService";
// import { nanoid } from "nanoid";

// // helper creators
// const createEmptyOption = () => ({ text: "", marks: -0.25, isCorrect: false });
// const createEmptyQuestion = () => ({
//   type: "mcq",
//   text: "",
//   options: [],
//   marks: 0,
//   expectedAnswer: "",
//   isPassage: false,
//   passageText: "",
//   _tempId: nanoid(),
// });

// const MockTestQuestionsList = () => {
//   const { mockTestId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleteModal, setDeleteModal] = useState({ isOpen: false, index: null });
//   const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

//   const editor = useRef(null);
//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Type here...",
//     }),
//     []
//   );

//   useEffect(() => {
//     const apiCaller = async () => {
//       const response = await getAuth();
//       if (response.isSuperAdmin === true) {
//         setReadOnlyPermissions(false);
//       } else {
//         setReadOnlyPermissions(
//           response.Permissions["courseManagement"].readOnly
//         );
//       }
//     };
//     apiCaller();
//   }, []);

//   if (!mockTestId) {
//     return <div>Error: Mock Test ID not found</div>;
//   }

//   // Load questions
//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const response = await getMocktestById(mockTestId);
//         const questionsFromServer = response?.data?.questions || [];

//         const transformed = questionsFromServer.map((q) => ({
//           text: q.questionText || "",
//           type: q.type || "mcq",
//           options:
//             q.options?.map((opt, index) => ({
//               text: opt.text,
//               marks: opt.marks ?? (index === q.correctAnswer ? 1 : -0.25),
//               isCorrect: index === q.correctAnswer,
//               raw: (opt.marks ?? (index === q.correctAnswer ? "1" : "-0.25")).toString(),
//             })) || [],
//           marks: q.marks || 0,
//           expectedAnswer: q.expectedAnswer || "",
//           _id: q._id,
//           isPassage: q.isPassage || false,
//           passageText: q.passageText || "",
//         }));

//         setQuestions(transformed);
//       } catch (error) {
//         toast.error("Could not load existing questions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuestions();
//   }, [mockTestId]);

//   // Delete
//   const handleDeleteQuestion = (qi) =>
//     setDeleteModal({ isOpen: true, index: qi });

//   const confirmDelete = async () => {
//     const { index } = deleteModal;
//     try {
//       const id = questions[index]?._id;
//       if (id) await removemocktestquestions(id, mockTestId);

//       setQuestions((prev) => prev.filter((_, i) => i !== index));

//       if (editingIndex === index) setEditingIndex(null);
//       else if (editingIndex !== null && index < editingIndex)
//         setEditingIndex((i) => i - 1);
//     } catch (error) {
//       toast.error("Failed to remove question");
//     } finally {
//       setDeleteModal({ isOpen: false, index: null });
//     }
//   };

//   // Add Question
//   const addQuestion = () => {
//     const newQuestion = createEmptyQuestion();
//     setQuestions((prev) => [...prev, newQuestion]);
//     setEditingIndex(questions.length);
//   };

//   // Reorder Question
//   const moveQuestion = async (qi, dir) => {
//     const newIndex = dir === "up" ? qi - 1 : qi + 1;
//     if (newIndex < 0 || newIndex >= questions.length) return;

//     const newQuestions = [...questions];
//     [newQuestions[qi], newQuestions[newIndex]] = [
//       newQuestions[newIndex],
//       newQuestions[qi],
//     ];
//     setQuestions(newQuestions);

//     try {
//       const questionsForApi = newQuestions.map((q) => ({
//         type: q.type,
//         questionText: q.text,
//         options:
//           q.type === "mcq"
//             ? q.options.map((opt) => ({ text: opt.text, marks: opt.marks }))
//             : [],
//         correctAnswer:
//           q.type === "mcq" ? q.options.findIndex((o) => o.isCorrect) : null,
//         marks: q.marks,
//         isPassage: q.isPassage || false,
//         passageText: q.passageText || "",
//         _id: q._id,
//       }));

//       await rearrangeMocktestQuestions(mockTestId, { questions: questionsForApi });
//     } catch {
//       toast.error("Failed to rearrange questions");
//     }
//   };

//   // Update Fields
//   const updateQuestionField = (qi, field, value) =>
//     setQuestions((prev) => {
//       const next = [...prev];
//       next[qi] = { ...next[qi], [field]: value };
//       if (field === "type" && value === "subjective") next[qi].options = [];
//       return next;
//     });

//   const updateOptionField = (qi, oi, field, value) =>
//     setQuestions((prev) => {
//       const next = [...prev];
//       const q = { ...next[qi] };
//       const options = [...q.options];
//       const opt = { ...options[oi], [field]: value };

//       if (field === "isCorrect" && value) {
//         options.forEach((o, idx) => {
//           o.isCorrect = idx === oi;
//           o.marks = o.isCorrect ? 1 : -0.25;
//           o.raw = o.marks.toString();
//         });
//       }

//       options[oi] = opt;
//       q.options = options;
//       next[qi] = q;
//       return next;
//     });

//   const addOption = (qi) =>
//     setQuestions((prev) => {
//       const next = [...prev];
//       const q = { ...next[qi] };
//       q.options = [...q.options, createEmptyOption()];
//       next[qi] = q;
//       return next;
//     });

//   const deleteOption = (qi, oi) =>
//     setQuestions((prev) => {
//       const next = [...prev];
//       next[qi].options = next[qi].options.filter((_, i) => i !== oi);
//       return next;
//     });

//   // Save Question (Safe Update)
//   const saveQuestion = async (qi) => {
//     const q = questions[qi];
//     const isSubjective = q.type === "subjective";

//     const payload = {
//       type: q.type,
//       questionText: q.text,
//       expectedAnswer: q.expectedAnswer || "",
//       isPassage: q.isPassage || false,
//       passageText: q.passageText || "",
//       marks: isSubjective ? Number(q.marks) || 0 : 0,
//     };

//     if (!isSubjective) {
//       const validOptions = q.options.filter(
//         (opt) => opt.text && opt.text.trim() !== ""
//       );
//       if (validOptions.length === 0) {
//         toast.error("Please add at least one valid option");
//         return;
//       }

//       payload.options = validOptions.map((opt) => ({
//         text: opt.text,
//         marks: Number(opt.marks),
//       }));
//       const correctIndex = validOptions.findIndex((o) => o.isCorrect);
//       payload.correctAnswer = correctIndex >= 0 ? correctIndex : 0;
//       payload.marks = Number(validOptions[correctIndex]?.marks) || 0;
//     }

//     try {
//       let res;
//       if (q._id) {
//         await updatemocktestquestions(q._id, mockTestId, payload);
//       } else {
//         res = await addmocktestquestions(mockTestId, payload);
//         const createdId =
//           res?.data?.question?._id ||
//           res?.question?._id ||
//           res?.mockTest?.questions?.slice(-1)[0]?._id;

//         if (createdId) {
//           setQuestions((prev) => {
//             const next = [...prev];
//             next[qi] = { ...next[qi], _id: createdId };
//             return next;
//           });
//         }
//       }

//       toast.success("Question saved successfully");
//       setEditingIndex(null);
//     } catch (err) {
//       toast.error("Error saving question");
//     }
//   };

//   if (loading) return <div>Loading questions...</div>;

//   return (
//     <MockTestQuestionsListContainer>
//       <Title>📝 Mock Test Questions</Title>

//       {questions.length === 0 ? (
//         !readOnlyPermissions && (
//           <CreateButton onClick={addQuestion}>
//             <FaPlus /> Create New Question
//           </CreateButton>
//         )
//       ) : (
//         <>
//           {questions.map((q, qi) => {
//             const isEditing = editingIndex === qi;
//             return (
//               <QuestionContainer key={q._id || q._tempId}>
//                 <Question>
//                   <QuestionNumber>
//                     Q {qi + 1}.{" "}
//                     <div
//                       dangerouslySetInnerHTML={{ __html: q.text }}
//                       style={{ fontWeight: 600 }}
//                     />
//                   </QuestionNumber>

//                   <QuestionActions>
//                     <IconButton
//                       onClick={() => setEditingIndex(qi)}
//                       title={!readOnlyPermissions ? "Edit" : "View"}
//                     >
//                       {!readOnlyPermissions ? <FaEdit /> : <FaEye />}
//                     </IconButton>

//                     {!readOnlyPermissions && (
//                       <>
//                         <IconButton
//                           onClick={() => handleDeleteQuestion(qi)}
//                           title="Delete"
//                         >
//                           <FaTrash color="red" />
//                         </IconButton>
//                         <PageControl>
//                           <IconButton
//                             onClick={() => moveQuestion(qi, "up")}
//                             disabled={qi === 0}
//                             title="Move up"
//                           >
//                             <FaArrowUp
//                               color={qi === 0 ? "gray" : "green"}
//                             />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => moveQuestion(qi, "down")}
//                             disabled={qi === questions.length - 1}
//                             title="Move down"
//                           >
//                             <FaArrowDown
//                               color={
//                                 qi === questions.length - 1 ? "gray" : "red"
//                               }
//                             />
//                           </IconButton>
//                         </PageControl>
//                       </>
//                     )}
//                   </QuestionActions>
//                 </Question>

//                 {isEditing && (
//                   <div
//                     style={{
//                       border: "1px solid #eee",
//                       padding: "1rem",
//                       marginTop: ".75rem",
//                       borderRadius: 4,
//                       background: "#fafafa",
//                     }}
//                   >
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={q.isPassage}
//                         onChange={(e) =>
//                           updateQuestionField(qi, "isPassage", e.target.checked)
//                         }
//                       />{" "}
//                       Passage-based question
//                     </label>

//                     <label style={{ marginLeft: "1rem" }}>
//                       Type:&nbsp;
//                       <select
//                         value={q.type}
//                         onChange={(e) =>
//                           updateQuestionField(qi, "type", e.target.value)
//                         }
//                       >
//                         <option value="mcq">MCQ</option>
//                         <option value="subjective">Subjective</option>
//                       </select>
//                     </label>

//                     {q.isPassage && (
//                       <div style={{ marginTop: "1rem" }}>
//                         <label>Passage Text:</label>
//                         <JoditEditor
//                           ref={editor}
//                           value={q.passageText}
//                           config={config}
//                           onChange={(c) =>
//                             updateQuestionField(qi, "passageText", c)
//                           }
//                         />
//                       </div>
//                     )}

//                     <div style={{ marginTop: "1rem" }}>
//                       <label>Question Text:</label>
//                       <JoditEditor
//                         ref={editor}
//                         value={q.text}
//                         config={config}
//                         onChange={(c) => updateQuestionField(qi, "text", c)}
//                       />
//                     </div>

//                     {q.type === "mcq" && (
//                       <div style={{ marginTop: "1.5rem" }}>
//                         <h4>Options</h4>
//                         {q.options.map((opt, oi) => (
//                           <div
//                             key={oi}
//                             style={{
//                               display: "grid",
//                               gridTemplateColumns:
//                                 "1fr 100px 120px 30px",
//                               gap: "0.5rem",
//                               marginBottom: "0.5rem",
//                               alignItems: "center",
//                             }}
//                           >
//                             <input
//                               placeholder={`Option ${oi + 1}`}
//                               value={opt.text}
//                               onChange={(e) =>
//                                 updateOptionField(
//                                   qi,
//                                   oi,
//                                   "text",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                             <input
//                               type="text"
//                               placeholder="Marks"
//                               value={opt.raw ?? opt.marks.toString()}
//                               onChange={(e) => {
//                                 const val = e.target.value;
//                                 const valid = /^-?\d*\.?\d*$/.test(val);
//                                 if (valid) {
//                                   updateOptionField(qi, oi, "raw", val);
//                                   const num = parseFloat(val);
//                                   if (!isNaN(num))
//                                     updateOptionField(qi, oi, "marks", num);
//                                 }
//                               }}
//                             />
//                             <label>
//                               <input
//                                 type="checkbox"
//                                 checked={opt.isCorrect}
//                                 onChange={(e) =>
//                                   updateOptionField(
//                                     qi,
//                                     oi,
//                                     "isCorrect",
//                                     e.target.checked
//                                   )
//                                 }
//                               />{" "}
//                               Correct
//                             </label>
//                             {!readOnlyPermissions && (
//                               <IconButton
//                                 onClick={() => deleteOption(qi, oi)}
//                                 style={{ color: "red" }}
//                               >
//                                 <FaTrash size={14} />
//                               </IconButton>
//                             )}
//                           </div>
//                         ))}
//                         {!readOnlyPermissions && (
//                           <CreateButton onClick={() => addOption(qi)}>
//                             <FaPlus /> Add New Option
//                           </CreateButton>
//                         )}
//                       </div>
//                     )}

//                     {q.type === "subjective" && (
//                       <div style={{ marginTop: "1.5rem" }}>
//                         <label>Marks:</label>
//                         <input
//                           type="text"
//                           value={q.raw ?? q.marks.toString()}
//                           onChange={(e) => {
//                             const input = e.target.value;
//                             const valid = /^[-+]?(\d+)?(\.\d*)?$/.test(
//                               input
//                             );
//                             if (valid) {
//                               updateQuestionField(qi, "raw", input);
//                               const parsed = Number(input);
//                               if (!isNaN(parsed))
//                                 updateQuestionField(qi, "marks", parsed);
//                             }
//                           }}
//                         />
//                       </div>
//                     )}

//                     <div style={{ marginTop: "1.5rem" }}>
//                       <label>Answer & Explanation:</label>
//                       <JoditEditor
//                         ref={editor}
//                         value={q.expectedAnswer}
//                         config={config}
//                         onChange={(c) =>
//                           updateQuestionField(qi, "expectedAnswer", c)
//                         }
//                       />
//                     </div>

//                     {!readOnlyPermissions && (
//                       <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
//                         <CreateButton onClick={() => saveQuestion(qi)}>
//                           Save Question
//                         </CreateButton>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </QuestionContainer>
//             );
//           })}

//           {!readOnlyPermissions && (
//             <PageFooter>
//               <CreateButton onClick={addQuestion}>
//                 <FaPlus /> Create New Question
//               </CreateButton>
//             </PageFooter>
//           )}
//         </>
//       )}

//       <DeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, index: null })}
//         onDelete={confirmDelete}
//       />
//     </MockTestQuestionsListContainer>
//   );
// };



// export default MockTestQuestionsList;
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MockTestQuestionsListContainer,
  Title,
  QuestionContainer,
  Question,
  QuestionNumber,
  QuestionActions,
  IconButton,
  CreateButton,
  PageFooter,
  PageControl,
} from "./MockTestQuestionsList.styles";
import { FaTrash, FaPlus, FaEdit, FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";
import {
  addmocktestquestions,
  removemocktestquestions,
  updatemocktestquestions,
  getMocktestById,
  rearrangeMocktestQuestions,
} from "../../../../../api/mocktestApi";
import { useParams } from "react-router-dom";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { getAuth } from "../../../../../utils/authService";
import { nanoid } from "nanoid";

// helpers
const createEmptyOption = () => ({ 
  text: "", 
  marks: -0.25, 
  isCorrect: false,
  _optionId: nanoid() // Add unique ID for each option
});

const createEmptyQuestion = () => ({
  type: "mcq",
  text: "",
  options: [],
  marks: 0,
  expectedAnswer: "",
  isPassage: false,
  passageText: "",
  _tempId: nanoid(),
  _stableKey: nanoid(), // This will remain constant throughout the question's lifecycle
});

const MockTestQuestionsList = () => {
  const { mockTestId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    index: null,
  });
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Type here...",
    }),
    []
  );

  if (!mockTestId) {
    return <div>Error: Mock Test ID not found</div>;
  }

  // load questions on mount
 useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await getMocktestById(mockTestId);
        const questionsFromServer = response?.data?.questions || [];

        const transformed = questionsFromServer.map((q) => {
          // CRITICAL FIX: Always use a consistent stable key based on _id
          // Prefix with "server_" to distinguish from temp keys
          const stableKey = q._id ? `server_${q._id}` : nanoid();
          
          return {
            text: q.questionText,
            type: q.type,
            options: q.options
              ? q.options.map((opt, index) => ({
                text: opt.text,
                marks: opt.marks ?? (index === q.correctAnswer ? 1 : -0.25),
                isCorrect: index === q.correctAnswer,
                raw: (opt.marks ?? (index === q.correctAnswer ? "1" : "-0.25")).toString(),
                _optionId: nanoid(),
              }))
              : [],
            marks: q.marks || 0,
            expectedAnswer: q.expectedAnswer || "",
            _id: q._id,
            isPassage: q.isPassage || false,
            passageText: q.passageText || "",
            _stableKey: stableKey, // This is now consistent!
          };
        });

        setQuestions(transformed);
      } catch (error) {
        toast.error("Could not load existing questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [mockTestId]);


  // deletion
  const handleDeleteQuestion = (qi) =>
    setDeleteModal({ isOpen: true, index: qi });

  const confirmDelete = async () => {
    const { index } = deleteModal;
    try {
      const id = questions[index]?._id;
      if (id) await removemocktestquestions(id, mockTestId);

      setQuestions((prev) => {
        const next = [...prev];
        next.splice(index, 1);
        return next;
      });

      if (editingIndex === index) setEditingIndex(null);
      if (editingIndex !== null && index < editingIndex) {
        setEditingIndex((i) => i - 1);
      }
    } catch (error) {
      toast.error("Failed to remove question");
    } finally {
      setDeleteModal({ isOpen: false, index: null });
    }
  };

  // add
  const addQuestion = () => {
    setQuestions((prev) => {
      const newQuestion = createEmptyQuestion();
      const updated = [...prev, newQuestion];
      setEditingIndex(updated.length - 1);
      return updated;
    });
  };

  // move / reorder
  const moveQuestion = async (qi, dir) => {
    if (editingIndex !== null) {
      toast.warn("Please save or cancel your current edits before reordering questions");
      return;
    }
    
    const newIndex = dir === "up" ? qi - 1 : qi + 1;
    if (newIndex < 0 || newIndex >= questions.length) return;

    try {
      const newQuestions = [...questions];
      [newQuestions[qi], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[qi]];

      // prepare API payload
      const questionsForApi = newQuestions.map((q) => {
        const isMcq = q.type === "mcq";
        return {
          type: q.type,
          questionText: q.text,
          options: isMcq
            ? q.options.map((opt) => ({
              text: opt.text,
              marks: opt.marks,
            }))
            : [],
          correctAnswer: isMcq ? q.options.findIndex((o) => o.isCorrect) : null,
          marks: q.marks,
          isPassage: q.isPassage || false,
          passageText: q.passageText || "",
          _id: q._id,
        };
      });

      await rearrangeMocktestQuestions(mockTestId, { questions: questionsForApi });

      setQuestions(newQuestions);
      if (editingIndex === qi) setEditingIndex(newIndex);
      else if (editingIndex === newIndex) setEditingIndex(qi);
    } catch (error) {
      toast.error("Failed to rearrange questions. Please try again.");
    }
  };

  // field updates - using immutable updates
  const updateQuestionField = (qi, field, value) =>
    setQuestions((prev) => {
      const next = prev.map((question, index) => {
        if (index !== qi) return question;
        
        const updatedQuestion = { ...question, [field]: value };
        
        if (field === "type" && value === "subjective") {
          updatedQuestion.options = [];
        }
        
        return updatedQuestion;
      });
      return next;
    });

  const updateOptionField = (qi, oi, field, value) =>
    setQuestions((prev) => {
      const next = prev.map((question, qIndex) => {
        if (qIndex !== qi) return question;
        
        const options = question.options.map((opt, optIndex) => {
          if (optIndex !== oi) return opt;
          
          const updatedOption = { ...opt, [field]: value };
          
          if (field === "isCorrect") {
            if (value === true) {
              updatedOption.marks = 1;
              updatedOption.raw = "1";
            } else {
              updatedOption.marks = -0.25;
              updatedOption.raw = "-0.25";
            }
          }
          
          return updatedOption;
        });

        // If marking an option as correct, unmark all others
        if (field === "isCorrect" && value === true) {
          return {
            ...question,
            options: options.map((opt, idx) => 
              idx === oi ? opt : { ...opt, isCorrect: false }
            )
          };
        }
        
        return { ...question, options };
      });
      return next;
    });

  const addOption = (qi) =>
    setQuestions((prev) => {
      const next = prev.map((question, index) => {
        if (index !== qi) return question;
        return {
          ...question,
          options: [...question.options, createEmptyOption()]
        };
      });
      return next;
    });

  const deleteOption = (qi, oi) => {
    const q = questions[qi];
    if (q.options.length <= 1) {
      toast.warn("Cannot delete the only option");
      return;
    }
    
    const correctOptionExists = q.options.some((opt, idx) => idx !== oi && opt.isCorrect);
    if (!correctOptionExists && q.options[oi].isCorrect) {
      toast.warn("Please select another correct option before deleting this one");
      return;
    }
    
    setQuestions((prev) => {
      const next = prev.map((question, index) => {
        if (index !== qi) return question;
        return {
          ...question,
          options: question.options.filter((_, idx) => idx !== oi)
        };
      });
      return next;
    });
  };

  // save - FIXED VERSION
// save - FIXED VERSION (without mandatory subjective answer)
const saveQuestion = async (qi) => {
  const q = questions[qi];
  const isSubjective = q.type === "subjective";
  
  // Validation for MCQ questions - ENHANCED
  if (!isSubjective) {
    const validOptions = (q.options || []).filter((opt) => opt.text && opt.text.trim() !== "");
    if (validOptions.length === 0) {
      toast.error("Please add at least one valid option");
      return;
    }
    
    const hasCorrectOption = validOptions.some(opt => opt.isCorrect);
    if (!hasCorrectOption) {
      toast.error("Please select exactly one correct option for the MCQ question");
      return;
    }
    
    // Additional validation: ensure only one correct option
    const correctOptionsCount = validOptions.filter(opt => opt.isCorrect).length;
    if (correctOptionsCount > 1) {
      toast.error("MCQ questions can have only one correct option");
      return;
    }
  }
  
  // For subjective questions, only validate marks (not expectedAnswer)
  if (isSubjective) {
    if (!q.marks || q.marks <= 0) {
      toast.error("Please provide valid marks for the subjective question");
      return;
    }
  }

  const payload = {
    type: q.type,
    questionText: q.text,
    expectedAnswer: q.expectedAnswer || "", // Can be empty string
    isPassage: q.isPassage || false,
    passageText: q.passageText || "",
  };

  if (isSubjective) {
    payload.marks = Number(q.marks) || 0;
  } else {
    const validOptions = (q.options || []).filter((opt) => opt.text && opt.text.trim() !== "");
    payload.options = validOptions.map((opt) => ({
      text: opt.text,
      marks: Number(opt.marks),
      isCorrect: !!opt.isCorrect,
    }));
    const correctIndex = validOptions.findIndex((o) => o.isCorrect);
    payload.correctAnswer = correctIndex >= 0 ? correctIndex : 0;
    payload.marks = Number(validOptions[correctIndex]?.marks) || 0;
  }

  try {
    let res;
    if (q._id) {
      res = await updatemocktestquestions(q._id, mockTestId, payload);
    } else {
      res = await addmocktestquestions(mockTestId, payload);
    }

    // CRITICAL FIX: Update state properly without losing stable keys
    setQuestions(prev => {
      const next = [...prev];
      const existingQuestion = next[qi];
      
      if (q._id) {
        // Update existing question - preserve stable key
        next[qi] = {
          ...existingQuestion,
          ...payload,
          _id: q._id, // Keep existing ID
          _stableKey: existingQuestion._stableKey, // Preserve stable key!
        };
      } else {
        // New question - extract ID from response and preserve stable key
        const created = res?.mockTest?.questions?.find((x) => x.questionText === q.text) ||
          res?.data?.question ||
          res?.question;
          
        if (created?._id) {
          next[qi] = {
            ...existingQuestion,
            _id: created._id,
            _stableKey: existingQuestion._stableKey, // Preserve the original stable key!
          };
        }
      }
      return next;
    });
    
    setEditingIndex(null);
    toast.success("Question saved successfully");
  } catch (err) {
    console.error("Save question error:", err);
    toast.error("Error saving question. Please try again.");
  }
};
  // Cancel editing without saving
  const cancelEditing = () => {
    setEditingIndex(null);
  };

  if (loading) return <div>Loading questions...</div>;

  return (
    <MockTestQuestionsListContainer>
      <Title>📝 Mock Test Questions</Title>

      {questions.length === 0 ? (
        <>
          {!readOnlyPermissions && (
            <CreateButton onClick={addQuestion}>
              <FaPlus /> Create New Question
            </CreateButton>
          )}
        </>
      ) : (
        <>
          {questions.map((q, qi) => {
            const isEditing = editingIndex === qi;
            return (
              <QuestionContainer key={q._stableKey}>
                <Question>
                  <QuestionNumber>
                    Q {qi + 1}.{" "}
                    <div
                      dangerouslySetInnerHTML={{ __html: q.text }}
                      style={{ fontWeight: 600 }}
                    />
                  </QuestionNumber>

                  <QuestionActions>
                    <IconButton onClick={() => setEditingIndex(qi)} title="Edit">
                      {!readOnlyPermissions ? <FaEdit /> : <FaEye />}
                    </IconButton>
                    {!readOnlyPermissions && (
                      <>
                        <IconButton onClick={() => handleDeleteQuestion(qi)} title="Delete">
                          <FaTrash color="red" />
                        </IconButton>
                        <PageControl>
                          <IconButton
                            onClick={() => moveQuestion(qi, "up")}
                            disabled={qi === 0 || editingIndex !== null}
                            title={editingIndex !== null ? "Save edits first" : "Move up"}
                          >
                            <FaArrowUp color={qi === 0 || editingIndex !== null ? "gray" : "green"} />
                          </IconButton>
                          <IconButton
                            onClick={() => moveQuestion(qi, "down")}
                            disabled={qi === questions.length - 1 || editingIndex !== null}
                            title={editingIndex !== null ? "Save edits first" : "Move down"}
                          >
                            <FaArrowDown color={qi === questions.length - 1 || editingIndex !== null ? "gray" : "red"} />
                          </IconButton>
                        </PageControl>
                      </>
                    )}
                  </QuestionActions>
                </Question>

                {isEditing && (
                  <div
                    style={{
                      border: "1px solid #eee",
                      padding: "1rem",
                      marginTop: ".75rem",
                      borderRadius: 4,
                      background: "#fafafa",
                    }}
                  >
                    <label style={{ display: "block", marginBottom: "1rem", fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={q.isPassage}
                        onChange={(e) => updateQuestionField(qi, "isPassage", e.target.checked)}
                        style={{ marginRight: "0.5rem" }}
                      />
                      This is a passage-based question
                    </label>

                    <label style={{ fontWeight: 600 }}>
                      Question Type:&nbsp;
                      <select
                        value={q.type}
                        onChange={(e) => updateQuestionField(qi, "type", e.target.value)}
                      >
                        <option value="mcq">MCQ</option>
                        <option value="subjective">Subjective</option>
                      </select>
                    </label>

                    {q.isPassage && (
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          style={{
                            fontWeight: 600,
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Passage Text:
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={q.passageText}
                          config={config}
                          tabIndex={1}
                          onChange={(content) => updateQuestionField(qi, "passageText", content)}
                        />
                      </div>
                    )}

                    <div style={{ marginTop: "1rem" }}>
                      <label
                        style={{
                          fontWeight: 600,
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Question Text:
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={q.text}
                        config={config}
                        tabIndex={1}
                        onChange={(content) => updateQuestionField(qi, "text", content)}
                      />
                    </div>

                    {q.type === "mcq" && (
                      <div style={{ marginTop: "1.5rem" }}>
                        <h4 style={{ marginBottom: ".5rem" }}>Options</h4>
                        {q.options.map((opt, oi) => (
                          <div
                            key={opt._optionId || oi}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 100px 120px 30px",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            <input
                              placeholder={`Option ${oi + 1}`}
                              value={opt.text}
                              onChange={(e) =>
                                updateOptionField(qi, oi, "text", e.target.value)
                              }
                              style={{
                                width: "90%",
                                padding: "0.5rem",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Marks"
                              value={opt.raw ?? opt.marks.toString()}
                              onChange={(e) => {
                                const input = e.target.value;
                                const valid = /^-?\d*\.?\d*$/.test(input);
                                if (valid) {
                                  updateOptionField(qi, oi, "raw", input);
                                  const num = parseFloat(input);
                                  if (!isNaN(num)) {
                                    updateOptionField(qi, oi, "marks", num);
                                  }
                                }
                              }}
                              style={{
                                width: "90%",
                                padding: "0.5rem",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />

                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontSize: "16px",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={opt.isCorrect}
                                onChange={(e) => {
                                  if (readOnlyPermissions) {
                                    return;
                                  } else {
                                    updateOptionField(qi, oi, "isCorrect", e.target.checked)
                                  }
                                }}
                              />
                              Correct
                            </label>

                            {!readOnlyPermissions && q.options.length > 1 && (
                              <IconButton
                                onClick={() => deleteOption(qi, oi)}
                                style={{ color: "red", padding: "0.25rem" }}
                              >
                                <FaTrash size={14} />
                              </IconButton>
                            )}
                          </div>
                        ))}
                        {!readOnlyPermissions && (
                          <CreateButton onClick={() => addOption(qi)}>
                            <FaPlus /> Add New Option
                          </CreateButton>
                        )}
                      </div>
                    )}

                    {q.type === "subjective" && (
                      <div style={{ marginTop: "1.5rem" }}>
                        <label>Marks</label>
                        <input
                          type="text"
                          placeholder="Marks"
                          value={q.raw ?? q.marks.toString()}
                          onChange={(e) => {
                            const input = e.target.value;
                            const valid = /^[-+]?(\d+)?(\.\d*)?$/.test(input);
                            if (valid) {
                              updateQuestionField(qi, "raw", input);
                              const parsed = Number(input);
                              if (!isNaN(parsed)) {
                                updateQuestionField(qi, "marks", parsed);
                              }
                            }
                          }}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            marginTop: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    )}

                    <div style={{ marginTop: "1.5rem" }}>
                      <label>Answer and Explanation</label>
                      <JoditEditor
                        ref={editor}
                        value={q.expectedAnswer}
                        config={config}
                        tabIndex={1}
                        onChange={(content) => updateQuestionField(qi, "expectedAnswer", content)}
                      />
                    </div>

                    <div style={{ marginTop: "1.5rem", textAlign: "right", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <button 
                        onClick={cancelEditing}
                        style={{
                          padding: "8px 16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          background: "white",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                      {!readOnlyPermissions && (
                        <CreateButton onClick={() => saveQuestion(qi)}>
                          Save Question
                        </CreateButton>
                      )}
                    </div>
                  </div>
                )}
              </QuestionContainer>
            );
          })}

          <PageFooter>
            {!readOnlyPermissions && (
              <CreateButton onClick={addQuestion}>
                <FaPlus /> Create New Question
              </CreateButton>
            )}
          </PageFooter>
        </>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, index: null })}
        onDelete={confirmDelete}
      />
    </MockTestQuestionsListContainer>
  );
};

export default MockTestQuestionsList;