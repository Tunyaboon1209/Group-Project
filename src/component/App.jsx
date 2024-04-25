import React, { useState } from 'react';

function App() {
  let [notes, setNotes] = useState([]);
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');
  let [selectedNoteIndex, setSelectedNoteIndex] = useState(null); // เพิ่ม state เก็บ index ของโน๊ตที่ถูกเลือก

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleSaveEntry() {
    if (title.trim() !== '') {
      let newNote = {
        title: title,
        content: content
      };
      if (selectedNoteIndex !== null) { // ถ้ามีโน๊ตที่ถูกเลือกเพื่อแก้ไข
        let updatedNotes = [...notes];
        updatedNotes[selectedNoteIndex] = newNote; // แทนที่โน๊ตเดิมด้วยโน๊ตใหม่
        setNotes(updatedNotes);
        setSelectedNoteIndex(null); // รีเซ็ต state ของโน๊ตที่ถูกเลือก
      } else {
        setNotes([...notes, newNote]);
      }
      setTitle('');
      setContent('');
    }
  }

  function handleEditEntry(index) {
    let entryToEdit = notes[index];
    setTitle(entryToEdit.title);
    setContent(entryToEdit.content);
    setSelectedNoteIndex(index); // เซ็ต state เพื่อระบุว่าโน๊ตที่เลือกจะถูกแก้ไข
  }

  function handleDeleteEntry(index) {
    let updatedEntries = [...notes];
    updatedEntries.splice(index, 1);
    setNotes(updatedEntries);
    if (selectedNoteIndex === index) {
      setSelectedNoteIndex(null); // ถ้าโน๊ตที่ถูกเลือกในรายการถูกลบออกแล้ว เราจะรีเซ็ต state ของโน๊ตที่ถูกเลือก
    }
  }

  return (
    <div className='index'>
      <div className='sideBar'>
        <ul className='noteListBox'>
          {notes.map((entry, index) => (
            <div className='listItem'>
              <li key={index}>
                <h3 onClick={() => handleEditEntry(index)}>{entry.title}</h3>
                <button onClick={() => handleDeleteEntry(index)} className='deleteItem'>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {selectedNoteIndex !== <div className='workSpace'>
        <div className='inputArea'>
          <input
            className='title'
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            className='content'
            placeholder="Content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <button className='saveButton' onClick={handleSaveEntry}>Save</button>
        </div>
      </div> && ( // ถ้ามีโน๊ตที่ถูกเลือกเพื่อแก้ไข
          <div className='workSpace'>
            <div className='inputArea'>
              <input
                className='title'
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              <textarea
                className='content'
                placeholder="Content"
                value={content}
                onChange={handleContentChange}
              ></textarea>
              <button className='saveButton' onClick={handleSaveEntry}>Save</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;