import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const VerilogModuleEditor = () => {
  const [moduleInfo, setModuleInfo] = useState({
    id: '', title: '', description: '', image: '', level: '', duration: '', rating: '', studentsCount: '',
    completed: '', totalChapters: '', progress: '', updatedAt: '', lessons: '', exercises: '', students: '',
    topics: ['']
  });

  const [codeExamples, setCodeExamples] = useState([{ title: '', difficulty: '', designCode: '', testbenchCode: '' }]);
  const [chapters, setChapters] = useState([{
    id: 1,
    title: '',
    description: '',
    estimatedTime: '',
    completed: false,
    sections: [
      { id: '1.1', title: '', content: '' }
    ]
  }]);

  const handleModuleChange = (e) => {
    setModuleInfo({ ...moduleInfo, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (chapterIndex, sectionIndex, field, value) => {
    const updated = [...chapters];
    updated[chapterIndex].sections[sectionIndex][field] = value;
    setChapters(updated);
  };

  const handleEditorChange = (chapterIndex, sectionIndex, event, editor) => {
    const data = editor.getData();
    handleSectionChange(chapterIndex, sectionIndex, 'content', data);
  };

  const addChapter = () => {
    const newId = chapters.length + 1;
    setChapters([...chapters, {
      id: newId,
      title: '',
      description: '',
      estimatedTime: '',
      completed: false,
      sections: [
        { id: `${newId}.1`, title: '', content: '' }
      ]
    }]);
  };

  const addSection = (chapterIndex) => {
    const updated = [...chapters];
    const chapter = updated[chapterIndex];
    const newSectionId = `${chapter.id}.${chapter.sections.length + 1}`;
    chapter.sections.push({ id: newSectionId, title: '', content: '' });
    setChapters(updated);
  };

  const addCodeExample = () => {
    setCodeExamples([...codeExamples, { title: '', difficulty: '', designCode: '', testbenchCode: '' }]);
  };

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>Module Information</Typography>
      <TextField fullWidth label="Title" name="title" value={moduleInfo.title} onChange={handleModuleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Description" name="description" value={moduleInfo.description} onChange={handleModuleChange} multiline rows={2} sx={{ mb: 2 }} />
      <TextField fullWidth label="Level" name="level" value={moduleInfo.level} onChange={handleModuleChange} sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom>Chapters</Typography>
      {chapters.map((chapter, cIndex) => (
        <Box key={chapter.id} border={1} borderRadius={2} p={3} mb={3}>
          <TextField
            fullWidth
            label="Chapter Title"
            value={chapter.title}
            onChange={(e) => {
              const updated = [...chapters];
              updated[cIndex].title = e.target.value;
              setChapters(updated);
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Chapter Description"
            value={chapter.description}
            onChange={(e) => {
              const updated = [...chapters];
              updated[cIndex].description = e.target.value;
              setChapters(updated);
            }}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          {chapter.sections.map((section, sIndex) => (
            <Box key={section.id} border={1} borderColor="grey.300" borderRadius={2} p={2} mb={2}>
              <Typography fontWeight={600}>Section {section.id}</Typography>
              <TextField
                fullWidth
                label="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange(cIndex, sIndex, 'title', e.target.value)}
                sx={{ mb: 2 }}
              />
              <CKEditor
                editor={ClassicEditor}
                data={section.content || ''}
                onChange={(event, editor) => handleEditorChange(cIndex, sIndex, event, editor)}
              />
              {section.content && (
                <Box mt={2}>
                  <Typography fontWeight={500}>Preview:</Typography>
                  <Box
                    mt={1}
                    p={2}
                    border={1}
                    borderRadius={2}
                    bgcolor="#f9f9f9"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Box>
              )}
            </Box>
          ))}
          <Button onClick={() => addSection(cIndex)}>+ Add Section</Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addChapter}>+ Add Chapter</Button>

      <Typography variant="h5" gutterBottom mt={6}>Code Examples</Typography>
      {codeExamples.map((example, index) => (
        <Box key={index} border={1} borderRadius={2} p={3} mb={3}>
          <TextField
            fullWidth
            label="Title"
            value={example.title}
            onChange={(e) => {
              const updated = [...codeExamples];
              updated[index].title = e.target.value;
              setCodeExamples(updated);
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Difficulty"
            value={example.difficulty}
            onChange={(e) => {
              const updated = [...codeExamples];
              updated[index].difficulty = e.target.value;
              setCodeExamples(updated);
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Design Code"
            value={example.designCode}
            onChange={(e) => {
              const updated = [...codeExamples];
              updated[index].designCode = e.target.value;
              setCodeExamples(updated);
            }}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Testbench Code"
            value={example.testbenchCode}
            onChange={(e) => {
              const updated = [...codeExamples];
              updated[index].testbenchCode = e.target.value;
              setCodeExamples(updated);
            }}
            multiline
            rows={4}
          />
        </Box>
      ))}
      <Button variant="outlined" onClick={addCodeExample}>+ Add Code Example</Button>
    </Box>
  );
};

export default VerilogModuleEditor;
