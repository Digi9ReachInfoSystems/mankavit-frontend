import React, { useEffect, useState } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './Allnotes.styles';
import { getAllNotes } from '../../../../../api/notesApi';

const Allnotes = () => {
  // const data = Array(5).fill(null).map((_, index) => (  {
  //   id: 1,
  //   noteTitle: "CLAT Coaching",
  //   noteDescription:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   subjectsCount: 27,
  //   lastActive: "24-07-2024 16:22",
  //   active: true,
  // }));
  const [ notes, setNotes ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        // setSubjects(response.data.data);
        if(response && Array.isArray(response.data?.data)) {
          setNotes(response.data.data);
        }else if(Array.isArray(response.data)) {
          setNotes(response.data);
        }else {
          setNotes([]);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

 if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
const ITEMS_PER_PAGE = 5;
  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
            <TableHeader>Note Title</TableHeader>
            <TableHeader>Note Description</TableHeader>
            <TableHeader>No. of Subjects</TableHeader>
            <TableHeader>	Last Active</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {notes.slice(0, ITEMS_PER_PAGE).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.noteName}</TableCell>
              <TableCell  className='truncate-text'>{row.noteDisplayName}</TableCell>
              {/* <TableCell>{row.subjects}</TableCell> */}
              {/* i wnat to count the number of subjects  */}
              <TableCell>{row.subjects.length}</TableCell>
              <TableCell>{row.lastActive}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Allnotes;
