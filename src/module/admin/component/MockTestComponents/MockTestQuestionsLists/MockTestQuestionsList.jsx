// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   MockTestQuestionsListContainer,
//   Title,
//   PageContainer,
//   PageHeader,
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
// // Helper Functions
// const createEmptyOption = () => ({ text: "", marks: -0.25, isCorrect: false });
// const createEmptyQuestion = () => ({
//   type: "mcq",
//   text: "",
//   options: [],
//   marks: 0,
//   expectedAnswer: "",
//   isPassage: false,
//   passageText: "",
// });

// // New helper: Group questions into pages (e.g., 5 per page)
// const groupIntoPages = (questions = [], pageSize = 5) => {
//   const result = [];
//   for (let i = 0; i < questions.length; i += pageSize) {
//     result.push({
//       questions: questions.slice(i, i + pageSize),
//     });
//   }
//   return result;
// };

// const MockTestQuestionsList = () => {
//   const { mockTestId } = useParams(); // Get mockTestId from URL
//   const [pages, setPages] = useState([]);
//   const [editingRef, setEditingRef] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     type: null, // 'question' or 'page'
//     index: null, // question index or page index
//     pageIndex: null, // for question deletion
//   });
//   const editor = useRef(null);
//   const config = useMemo(
//     () => ({
//       readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//       placeholder: "Type here...",
//     }),
//     []
//   );
//   if (!mockTestId) {
//     return <div>Error: Mock Test ID not found</div>;
//   }

//   // How many questions exist before each page starts
//   const pageOffsets = useMemo(() => {
//     const offsets = [];
//     let sum = 0;
//     pages.forEach((p, i) => {
//       offsets[i] = sum;
//       sum += p?.questions?.length || 0;
//     });
//     return offsets;
//   }, [pages]);

//   const getQuestionNumber = (pi, qi) => (pageOffsets[pi] || 0) + qi + 1;

//   // Load questions from server on mount
//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const response = await getMocktestById(mockTestId);
//         const questionsFromServer = response.data?.questions || [];

//         // Transform questions to match frontend structure
//         const transformedQuestions = questionsFromServer.map((q) => ({
//           text: q.questionText,
//           type: q.type,
//           options: q.options
//             ? q.options.map((opt, index) => ({
//                 text: opt.text,
//                 marks: opt.marks || (index === q.correctAnswer ? 1 : -0.25),
//                 isCorrect: index === q.correctAnswer,
//                 raw: (
//                   opt.marks || (index === q.correctAnswer ? "1" : "-0.25")
//                 ).toString(),
//               }))
//             : [],
//           marks: q.marks || 0,
//           expectedAnswer: q.expectedAnswer || "",
//           _id: q._id,
//           isPassage: q.isPassage || false,
//           passageText: q.passageText || "",
//         }));

//         const initialPages = groupIntoPages(transformedQuestions);
//         setPages(initialPages);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to load questions", error);
//         toast.error("Could not load existing questions");
//         setLoading(false);
//       }
//     };

//     loadQuestions();
//   }, [mockTestId]);

//   const addPage = () => setPages((prev) => [...prev, { questions: [] }]);

//   const handleDeletePage = (pi) => {
//     setDeleteModal({
//       isOpen: true,
//       type: "page",
//       index: pi,
//       pageIndex: null,
//     });
//   };

//   const handleDeleteQuestion = (pi, qi) => {
//     setDeleteModal({
//       isOpen: true,
//       type: "question",
//       index: qi,
//       pageIndex: pi,
//     });
//   };

//   const confirmDelete = async () => {
//     const { type, index, pageIndex } = deleteModal;

//     try {
//       if (type === "question") {
//         const questionId = pages[pageIndex].questions[index]._id;
//         if (questionId) {
//           await removemocktestquestions(questionId, mockTestId);
//           console.log("Question removed successfully", questionId);
//         }

//         setPages((prev) => {
//           const copy = [...prev];
//           copy[pageIndex].questions.splice(index, 1);
//           // Remove page if it's now empty
//           if (copy[pageIndex].questions.length === 0) {
//             return copy.filter((_, i) => i !== pageIndex);
//           }
//           return copy;
//         });
//       } else if (type === "page") {
//         setPages((prev) => prev.filter((_, i) => i !== index));
//       }
//     } catch (error) {
//       // alert('Failed to remove item');
//       toast.error("Failed to remove item");
//       console.error(error);
//     } finally {
//       setDeleteModal({
//         isOpen: false,
//         type: null,
//         index: null,
//         pageIndex: null,
//       });
//     }
//   };

//   const addQuestion = (pi = 0) => {
//     setPages((prev) => {
//       const newPages = [...prev];
//       while (newPages.length <= pi) newPages.push({ questions: [] });
//       const questions = newPages[pi].questions;
//       const nextIndex = questions.length;
//       newPages[pi] = {
//         ...newPages[pi],
//         questions: [...questions, createEmptyQuestion()],
//       };
//       setEditingRef({ page: pi, q: nextIndex }); // Open only this one
//       return newPages;
//     });
//   };

//   const moveQuestion = async (pi, qi, dir) => {
//     const newQi = dir === "up" ? qi - 1 : qi + 1;

//     // Check if new position is valid
//     if (newQi < 0 || newQi >= pages[pi].questions.length) {
//       return; // No change if move is invalid
//     }

//     try {
//       // Create a new array for questions
//       const newQuestions = [...pages[pi].questions];

//       // Swap the questions
//       [newQuestions[qi], newQuestions[newQi]] = [
//         newQuestions[newQi],
//         newQuestions[qi],
//       ];

//       // Prepare the data for the API call
//       const questionsForApi = newQuestions.map((q) => {
//         const isMcq = q.type === "mcq";
//         return {
//           type: q.type,
//           questionText: q.text,
//           options: isMcq
//             ? q.options.map((opt) => ({
//                 text: opt.text,
//                 marks: opt.marks,
//               }))
//             : [],
//           correctAnswer: isMcq ? q.options.findIndex((o) => o.isCorrect) : null,
//           marks: q.marks,
//           isPassage: q.isPassage || false,
//           passageText: q.passageText || "",
//           _id: q._id,
//         };
//       });

//       // Call the API to rearrange questions
//       await rearrangeMocktestQuestions(mockTestId, {
//         questions: questionsForApi,
//       });

//       // Update the UI only after successful API call
//       setPages((prev) => {
//         const copy = [...prev];
//         copy[pi] = {
//           ...copy[pi],
//           questions: newQuestions,
//         };
//         return copy;
//       });
//     } catch (error) {
//       console.error("Failed to rearrange questions:", error);
//       // alert("Failed to rearrange questions. Please try again.");
//       toast.error("Failed to rearrange questions. Please try again.");
//     }
//   };

//   const updateQuestionField = (pi, qi, field, value) =>
//     setPages((prev) => {
//       const copy = [...prev];
//       copy[pi].questions[qi][field] = value;
//       if (field === "type") {
//         if (value === "subjective") {
//           copy[pi].questions[qi].options = [];
//         }
//       }
//       return copy;
//     });

//   const updateOptionField = (pi, qi, oi, field, value) =>
//     setPages((prev) => {
//       const copy = [...prev];
//       const question = copy[pi].questions[qi];
//       const option = question.options[oi];

//       // Update the field
//       option[field] = value;

//       // If this is the correct answer checkbox being changed
//       if (field === "isCorrect") {
//         if (value === true) {
//           // Set marks to 1 for the correct answer
//           option.marks = 1;
//           option.raw = "1";

//           // Uncheck all other options
//           question.options.forEach((o, idx) => {
//             if (idx !== oi) {
//               o.isCorrect = false;
//               // Reset other options to default -0.25 if they're not correct
//               if (o.marks > 0) {
//                 o.marks = -0.25;
//                 o.raw = "-0.25";
//               }
//             }
//           });
//         } else {
//           // When unchecking, set marks back to -0.25
//           option.marks = -0.25;
//           option.raw = "-0.25";
//         }
//       }

//       return copy;
//     });

//   const addOption = (pi, qi) =>
//     setPages((prev) =>
//       prev.map((page, pIdx) =>
//         pIdx === pi
//           ? {
//               ...page,
//               questions: page.questions.map((question, qIdx) =>
//                 qIdx === qi
//                   ? {
//                       ...question,
//                       options: [...question.options, createEmptyOption()],
//                     }
//                   : question
//               ),
//             }
//           : page
//       )
//     );

//   const deleteOption = (pi, qi, oi) => {
//     setPages((prev) =>
//       prev.map((page, pIdx) =>
//         pIdx === pi
//           ? {
//               ...page,
//               questions: page.questions.map((question, qIdx) =>
//                 qIdx === qi
//                   ? {
//                       ...question,
//                       options: question.options.filter(
//                         (_, optIdx) => optIdx !== oi
//                       ),
//                     }
//                   : question
//               ),
//             }
//           : page
//       )
//     );
//   };

//   const saveQuestion = async (pi, qi) => {
//     const question = pages[pi].questions[qi];
//     const payload = {};
//     const isSubjective = question.type === "subjective";

//     payload.type = question.type;
//     payload.questionText = question.text;
//     payload.expectedAnswer = question.expectedAnswer || "";
//     payload.isPassage = question.isPassage || false;
//     payload.passageText = question.passageText || "";

//     if (isSubjective) {
//       payload.expectedAnswer = "";
//       payload.marks = Number(question.marks) || 0;
//     } else {
//       // Filter out empty options (where text is empty or whitespace)
//       const validOptions = question.options.filter(
//         (opt) => opt.text && opt.text.trim() !== ""
//       );

//       // If no valid options, show error and return
//       if (validOptions.length === 0) {
//         toast.error("Please add at least one valid option");
//         return;
//       }

//       payload.options = validOptions.map((opt) => ({
//         text: opt.text,
//         marks: Number(opt.marks),
//         isCorrect: opt.isCorrect || false, // Make sure to include isCorrect in the payload
//       }));

//       const correctIndex = validOptions.findIndex((o) => o.isCorrect);
//       payload.correctAnswer = correctIndex >= 0 ? correctIndex : 0;
//       payload.marks = Number(validOptions[correctIndex]?.marks) || 0;
//     }

//     try {
//       let res;
//       const questionId = question._id;

//       if (questionId) {
//         // Update existing question
//         res = await updatemocktestquestions(questionId, mockTestId, payload);
//         console.log("Updated question:", res);
//       } else {
//         // Add new question
//         res = await addmocktestquestions(mockTestId, payload);
//         console.log("Added new question:", res);

//         const newQuestion = res?.mockTest?.questions?.find((q) => !q.__isNew);
//         if (!newQuestion) {
//           // alert('Server did not return a valid question');
//           toast.error("Server did not return a valid question");
//           console.error("No question returned in response", res);
//           return;
//         }

//         setPages((prev) => {
//           const copy = [...prev];
//           copy[pi].questions[qi]._id = newQuestion._id;
//           return copy;
//         });
//       }

//       setEditingRef(null);
//     } catch (err) {
//       console.error("Save question error:", err);
//       // alert('Error saving question. Please try again.');
//       toast.error("Error saving question. Please try again.");
//     }
//   };

//   const isEditing = (pi, qi) => editingRef?.page === pi && editingRef?.q === qi;

//   if (loading) {
//     return <div>Loading questions...</div>;
//   }

//   return (
//     <MockTestQuestionsListContainer>
//       <Title>📝 Mock Test Question Pages</Title>
//       {pages.length === 0 ? (
//         <CreateButton onClick={() => addQuestion()}>
//           <FaPlus /> Create New Question
//         </CreateButton>
//       ) : (
//         <>
//           {pages.map((page, pi) => (
//             <PageContainer key={pi}>
//               <PageHeader>
//                 Page {pi + 1} (Total Questions: {page.questions.length})
//                 <IconButton onClick={() => handleDeletePage(pi)}>
//                   <FaTrash color="red" />
//                 </IconButton>
//               </PageHeader>
//               {page.questions.map((q, qi) => {
//                 const isThisEditing = isEditing(pi, qi);
//                 return (
//                   <QuestionContainer key={qi}>
//                     <Question>
//                       {/* <QuestionNumber>
//                         Question {qi + 1}.{" "}
//                         <div dangerouslySetInnerHTML={{ __html: q.text }}></div>
//                       </QuestionNumber> */}
//                       <QuestionNumber>
//                         Q {getQuestionNumber(pi, qi)}.{" "}
//                         <div dangerouslySetInnerHTML={{ __html: q.text }} style={{
//                           fontWeight: "600"
//                         }}></div>
//                       </QuestionNumber>

//                       <QuestionActions>
//                         <IconButton
//                           onClick={() => setEditingRef({ page: pi, q: qi })}
//                         >
//                           <FaEdit />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDeleteQuestion(pi, qi)}
//                         >
//                           <FaTrash color="red" />
//                         </IconButton>
//                         <PageControl>
//                           <IconButton
//                             onClick={() => moveQuestion(pi, qi, "up")}
//                             disabled={qi === 0}
//                             title="Move question up"
//                           >
//                             <FaArrowUp color={qi === 0 ? "gray" : "green"} />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => moveQuestion(pi, qi, "down")}
//                             disabled={qi === page.questions.length - 1}
//                             title="Move question down"
//                           >
//                             <FaArrowDown
//                               color={
//                                 qi === page.questions.length - 1
//                                   ? "gray"
//                                   : "red"
//                               }
//                             />
//                           </IconButton>
//                         </PageControl>
//                       </QuestionActions>
//                     </Question>
//                     {isThisEditing && (
//                       <div
//                         style={{
//                           border: "1px solid #eee",
//                           padding: "1rem",
//                           marginTop: ".75rem",
//                           borderRadius: 4,
//                           background: "#fafafa",
//                         }}
//                       >
//                         <label
//                           style={{
//                             display: "block",
//                             marginBottom: "1rem",
//                             fontWeight: 600,
//                           }}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={q.isPassage}
//                             onChange={(e) =>
//                               updateQuestionField(
//                                 pi,
//                                 qi,
//                                 "isPassage",
//                                 e.target.checked
//                               )
//                             }
//                             style={{ marginRight: "0.5rem" }}
//                           />
//                           This is a passage-based question
//                         </label>
//                         <label style={{ fontWeight: 600 }}>
//                           Question Type:&nbsp;
//                           <select
//                             value={q.type}
//                             onChange={(e) =>
//                               updateQuestionField(
//                                 pi,
//                                 qi,
//                                 "type",
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="mcq">MCQ</option>
//                             <option value="subjective">Subjective</option>
//                           </select>
//                         </label>
//                         {q.isPassage && (
//                           <div style={{ marginBottom: "1.5rem" }}>
//                             <label
//                               style={{
//                                 fontWeight: 600,
//                                 display: "block",
//                                 marginBottom: "0.5rem",
//                               }}
//                             >
//                               Passage Text:
//                             </label>
//                             <JoditEditor
//                               ref={editor}
//                               value={q.passageText}
//                               config={config}
//                               tabIndex={1}
//                               onBlur={(newContent) =>
//                                 updateQuestionField(
//                                   pi,
//                                   qi,
//                                   "passageText",
//                                   newContent
//                                 )
//                               }
//                               onChange={(newContent) =>
//                                 updateQuestionField(
//                                   pi,
//                                   qi,
//                                   "passageText",
//                                   newContent
//                                 )
//                               }
//                             />
//                           </div>
//                         )}
//                         <div style={{ marginTop: "1rem" }}>
//                           <label
//                             style={{
//                               fontWeight: 600,
//                               display: "block",
//                               marginBottom: "0.5rem",
//                             }}
//                           >
//                             Question Text:
//                           </label>
//                           <JoditEditor
//                             ref={editor}
//                             value={q.text}
//                             config={config}
//                             tabIndex={1}
//                             onBlur={(newContent) => {
//                               console.log("new", newContent);
//                             }}
//                             onChange={(newContent) => {
//                               updateQuestionField(pi, qi, "text", newContent);
//                             }}
//                           />
//                         </div>
//                         {q.type === "mcq" && (
//                           <div style={{ marginTop: "1.5rem" }}>
//                             <h4 style={{ marginBottom: ".5rem" }}>Options</h4>
//                             {q.options.map((opt, oi) => (
//                               <div
//                                 key={oi}
//                                 style={{
//                                   display: "grid",
//                                   gridTemplateColumns: "1fr 100px 100px 30px",
//                                   gap: "0.5rem",
//                                   marginBottom: "0.5rem",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <input
//                                   placeholder={`Option ${oi + 1}`}
//                                   value={opt.text}
//                                   onChange={(e) =>
//                                     updateOptionField(
//                                       pi,
//                                       qi,
//                                       oi,
//                                       "text",
//                                       e.target.value
//                                     )
//                                   }
//                                   style={{
//                                     width: "90%",
//                                     padding: "0.5rem",
//                                     fontSize: "16px",
//                                     border: "1px solid #ccc",
//                                     borderRadius: "4px",
//                                   }}
//                                 />
//                                 <input
//                                   type="text"
//                                   placeholder="Marks"
//                                   value={opt.raw ?? opt.marks.toString()}
//                                   onChange={(e) => {
//                                     const input = e.target.value;

//                                     // Allow negative numbers with decimals
//                                     const validInput = /^-?\d*\.?\d*$/.test(
//                                       input
//                                     );

//                                     if (validInput) {
//                                       updateOptionField(
//                                         pi,
//                                         qi,
//                                         oi,
//                                         "raw",
//                                         input
//                                       );

//                                       // Convert to number when valid
//                                       const numberValue = parseFloat(input);
//                                       if (!isNaN(numberValue)) {
//                                         updateOptionField(
//                                           pi,
//                                           qi,
//                                           oi,
//                                           "marks",
//                                           numberValue
//                                         );
//                                       }
//                                     }
//                                   }}
//                                   style={{
//                                     width: "90%",
//                                     padding: "0.5rem",
//                                     fontSize: "16px",
//                                     border: "1px solid #ccc",
//                                     borderRadius: "4px",
//                                   }}
//                                 />

//                                 <label
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.25rem",
//                                     fontSize: "16px",
//                                   }}
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     checked={opt.isCorrect}
//                                     onChange={(e) =>
//                                       updateOptionField(
//                                         pi,
//                                         qi,
//                                         oi,
//                                         "isCorrect",
//                                         e.target.checked
//                                       )
//                                     }
//                                     style={{
//                                       width: "90%",
//                                       padding: "0.5rem",
//                                       fontSize: "16px",
//                                       border: "1px solid #ccc",
//                                       borderRadius: "4px",
//                                     }}
//                                   />
//                                   Correct
//                                 </label>
//                                 <IconButton
//                                   onClick={() => deleteOption(pi, qi, oi)}
//                                   style={{ color: "red", padding: "0.25rem" }}
//                                 >
//                                   <FaTrash size={14} />
//                                 </IconButton>
//                               </div>
//                             ))}
//                             <CreateButton onClick={() => addOption(pi, qi)}>
//                               <FaPlus /> Add New Option
//                             </CreateButton>
//                           </div>
//                         )}
//                         {q.type === "subjective" && (
//                           <div style={{ marginTop: "1.5rem" }}>
//                             <label>Marks</label>

//                             <input
//                               type="text"
//                               placeholder="Marks"
//                               value={q.raw ?? q.marks.toString()}
//                               onChange={(e) => {
//                                 const input = e.target.value;

//                                 // Regex: optional +/-, then digits, optional decimal point and digits
//                                 const validInput = /^[-+]?(\d+)?(\.\d*)?$/.test(
//                                   input
//                                 );

//                                 if (validInput) {
//                                   updateQuestionField(pi, qi, "raw", input);

//                                   const parsed = Number(input);
//                                   if (!isNaN(parsed)) {
//                                     updateQuestionField(
//                                       pi,
//                                       qi,
//                                       "marks",
//                                       parsed
//                                     );
//                                   }
//                                 }
//                               }}
//                               style={{
//                                 width: "100%",
//                                 padding: "0.5rem",
//                                 marginTop: "0.5rem",
//                                 border: "1px solid #ccc",
//                                 borderRadius: "4px",
//                               }}
//                             />
//                           </div>
//                         )}
//                         <div style={{ marginTop: "1.5rem" }}>
//                           <label>Answer and Explaination</label>
//                           <JoditEditor
//                             ref={editor}
//                             value={q.expectedAnswer}
//                             config={config}
//                             tabIndex={1}
//                             onBlur={(newContent) => {
//                               console.log("new", newContent);
//                             }}
//                             onChange={(newContent) =>
//                               updateQuestionField(
//                                 pi,
//                                 qi,
//                                 "expectedAnswer",
//                                 newContent
//                               )
//                             }
//                           />
//                         </div>
//                         <div
//                           style={{ marginTop: "1.5rem", textAlign: "right" }}
//                         >
//                           <CreateButton onClick={() => saveQuestion(pi, qi)}>
//                             Save Question
//                           </CreateButton>
//                         </div>
//                       </div>
//                     )}
//                   </QuestionContainer>
//                 );
//               })}
//               <PageFooter>
//                 <CreateButton onClick={() => addQuestion(pi)}>
//                   <FaPlus /> Create New Question
//                 </CreateButton>
//               </PageFooter>
//             </PageContainer>
//           ))}
//         </>
//       )}

//       <DeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={() =>
//           setDeleteModal({
//             isOpen: false,
//             type: null,
//             index: null,
//             pageIndex: null,
//           })
//         }
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

// helpers
const createEmptyOption = () => ({ text: "", marks: -0.25, isCorrect: false });
const createEmptyQuestion = () => ({
  type: "mcq",
  text: "",
  options: [],
  marks: 0,
  expectedAnswer: "",
  isPassage: false,
  passageText: "",
});

const MockTestQuestionsList = () => {
  const { mockTestId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    index: null, // question index
  });
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
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

        const transformed = questionsFromServer.map((q) => ({
          text: q.questionText,
          type: q.type,
          options: q.options
            ? q.options.map((opt, index) => ({
              text: opt.text,
              marks: opt.marks ?? (index === q.correctAnswer ? 1 : -0.25),
              isCorrect: index === q.correctAnswer,
              raw: (opt.marks ?? (index === q.correctAnswer ? "1" : "-0.25")).toString(),
            }))
            : [],
          marks: q.marks || 0,
          expectedAnswer: q.expectedAnswer || "",
          _id: q._id,
          isPassage: q.isPassage || false,
          passageText: q.passageText || "",
        }));

        setQuestions(transformed);
      } catch (error) {
        console.error("Failed to load questions", error);
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
      console.error(error);
      toast.error("Failed to remove question");
    } finally {
      setDeleteModal({ isOpen: false, index: null });
    }
  };

  // add
  const addQuestion = () => {
    setQuestions((prev) => {
      const next = [...prev, createEmptyQuestion()];
      setEditingIndex(next.length - 1);
      return next;
    });
  };

  // move / reorder
  const moveQuestion = async (qi, dir) => {
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
      console.error("Failed to rearrange questions:", error);
      toast.error("Failed to rearrange questions. Please try again.");
    }
  };

  // field updates
  const updateQuestionField = (qi, field, value) =>
    setQuestions((prev) => {
      const next = [...prev];
      next[qi] = { ...next[qi], [field]: value };
      if (field === "type" && value === "subjective") {
        next[qi].options = [];
      }
      return next;
    });

  const updateOptionField = (qi, oi, field, value) =>
    setQuestions((prev) => {
      const next = [...prev];
      const q = { ...next[qi] };
      const options = [...q.options];
      const opt = { ...options[oi], [field]: value };

      if (field === "isCorrect") {
        if (value === true) {
          opt.marks = 1;
          opt.raw = "1";
          options.forEach((o, idx) => {
            if (idx !== oi) {
              o.isCorrect = false;
              if (o.marks > 0) {
                o.marks = -0.25;
                o.raw = "-0.25";
              }
            }
          });
        } else {
          opt.marks = -0.25;
          opt.raw = "-0.25";
        }
      }

      options[oi] = opt;
      next[qi] = { ...q, options };
      return next;
    });

  const addOption = (qi) =>
    setQuestions((prev) => {
      const next = [...prev];
      const q = { ...next[qi] };
      q.options = [...q.options, createEmptyOption()];
      next[qi] = q;
      return next;
    });

  const deleteOption = (qi, oi) =>
    setQuestions((prev) => {
      const next = [...prev];
      const q = { ...next[qi] };
      q.options = q.options.filter((_, idx) => idx !== oi);
      next[qi] = q;
      return next;
    });

  // save
  const saveQuestion = async (qi) => {
    const q = questions[qi];
    const isSubjective = q.type === "subjective";
    const payload = {
      type: q.type,
      questionText: q.text,
      expectedAnswer: q.expectedAnswer || "",
      isPassage: q.isPassage || false,
      passageText: q.passageText || "",
    };

    if (isSubjective) {
      // payload.expectedAnswer = "";
      payload.marks = Number(q.marks) || 0;
    } else {
      const validOptions = (q.options || []).filter((opt) => opt.text && opt.text.trim() !== "");
      if (validOptions.length === 0) {
        toast.error("Please add at least one valid option");
        return;
      }
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
        // try to set the new _id from response
        const created =
          res?.mockTest?.questions?.find((x) => !x.__isNew) ||
          res?.data?.question ||
          res?.question;
        if (created?._id) {
          setQuestions((prev) => {
            const next = [...prev];
            next[qi] = { ...next[qi], _id: created._id };
            return next;
          });
        }
      }
      setEditingIndex(null);
    } catch (err) {
      console.error("Save question error:", err);
      toast.error("Error saving question. Please try again.");
    }
  };

  if (loading) return <div>Loading questions...</div>;

  return (
    <MockTestQuestionsListContainer>
      <Title>📝 Mock Test Questions</Title>

      {questions.length === 0 ? (
        <>
          {
            !readOnlyPermissions && (
              <CreateButton onClick={addQuestion}>
                <FaPlus /> Create New Question
              </CreateButton>
            )
          }
        </>
      ) : (
        <>
          {questions.map((q, qi) => {
            const isEditing = editingIndex === qi;
            return (
              <QuestionContainer key={q._id || `temp-${qi}`}>
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
                    {
                      !readOnlyPermissions && (
                        <>
                          <IconButton onClick={() => handleDeleteQuestion(qi)} title="Delete">
                            <FaTrash color="red" />
                          </IconButton>
                          <PageControl>
                            <IconButton
                              onClick={() => moveQuestion(qi, "up")}
                              disabled={qi === 0}
                              title="Move up"
                            >
                              <FaArrowUp color={qi === 0 ? "gray" : "green"} />
                            </IconButton>
                            <IconButton
                              onClick={() => moveQuestion(qi, "down")}
                              disabled={qi === questions.length - 1}
                              title="Move down"
                            >
                              <FaArrowDown color={qi === questions.length - 1 ? "gray" : "red"} />
                            </IconButton>
                          </PageControl>
                        </>
                      )
                    }


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
                            key={oi}
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

                                }
                                }
                                style={{
                                  width: "90%",
                                  padding: "0.5rem",
                                  fontSize: "16px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              />
                              Correct
                            </label>

                            {
                              !readOnlyPermissions && (
                                <IconButton
                                  onClick={() => deleteOption(qi, oi)}
                                  style={{ color: "red", padding: "0.25rem" }}
                                >
                                  <FaTrash size={14} />
                                </IconButton>
                              )
                            }


                          </div>
                        ))}
                        {
                          !readOnlyPermissions && (
                            <CreateButton onClick={() => addOption(qi)}>
                              <FaPlus /> Add New Option
                            </CreateButton>
                          )
                        }

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

                    <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
                      {
                        !readOnlyPermissions && (
                          <CreateButton onClick={() => saveQuestion(qi)}>
                            Save Question
                          </CreateButton>
                        )
                      }

                    </div>
                  </div>
                )}
              </QuestionContainer>
            );
          })}

          <PageFooter>
            {
              !readOnlyPermissions && (
                <CreateButton onClick={addQuestion}>
                  <FaPlus /> Create New Question
                </CreateButton>
              )
            }

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
