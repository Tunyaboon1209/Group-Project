import React, { useState } from "react";

function App() {
  let [isCreate, setIsCreate] = useState(false);
  let [text, setText] = useState({
    title: "",
    content: "",
  });
  let [note, setNote] = useState([]);
  let [isOpenNote, setIsOpenNote] = useState(false);
  let [openedNote, setOpenedNote] = useState('');
  let [sideBarNotes, setSideBarNotes] = useState([]);

  function createNote() {
    setIsCreate(true);
    setIsOpenNote(false);
    setOpenedNote('');
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setText((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function saveNote() {
    if (isOpenNote) {
      // ถ้าโน้ตเปิดอยู่ให้ทำการอัพเดทข้อมูลของโน้ตที่ถูกเปิด
      setNote(prevNotes => {
        const updatedNotes = prevNotes.map(noteItem => {
          if (noteItem === openedNote) {
            return { ...openedNote, ...text }; // อัพเดท title และ content ใหม่
          }
          return noteItem;
        });
        return updatedNotes;
      });
      setIsOpenNote(false);
      setOpenedNote('');
    } else {
      // ถ้าเป็นการสร้างโน้ตใหม่
      const newNote = { ...text }; // สร้างโน้ตใหม่จากข้อมูลใน text
      setNote(prevNotes => [...prevNotes, newNote]); // เพิ่มโน้ตใหม่เข้าไปใน array ของ note
      setSideBarNotes(prevNotes => [...prevNotes, newNote.title]); // เพิ่ม title ของโน้ตใหม่เข้าไปใน sidebar
    }
    setText({ title: "", content: "" }); // เคลียร์ค่าใน textarea หลังจากบันทึก
  }

  function openNote(index) {
    setIsCreate(false);
    setIsOpenNote(true);
    setOpenedNote(note[index]);
  }

  const changeOpenedNote = (event) => {
    const { name, value } = event.target;
    setOpenedNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  return (
    <div className="index">
      <div className="sideBar">
        <div className="userInfoBox"></div>
        <div className="noteListBox">
          {sideBarNotes.map((noteTitle, index) => (
            <div className="noteList" key={index} onClick={() => openNote(index)}>
              {noteTitle}
            </div>
          ))}
        </div>
        <div className="addButtonBox">
          <button onClick={createNote} className="addButton">
            Add new note
          </button>
        </div>
      </div>

      <div className="workSpace">
        {isOpenNote && (
          <form>
            <textarea
              className="title"
              name="title"
              placeholder="Untitle"
              onChange={changeOpenedNote}
              value={openedNote.title}
            />
            <textarea
              className="content"
              name="content"
              cols="30"
              rows="10"
              placeholder="type some text..."
              onChange={changeOpenedNote}
              value={openedNote.content}
            />
            <div className="saveButton" onClick={saveNote}>save</div>
          </form>
        )}

        {isCreate && (
          <form>
            <textarea
              className="title"
              name="title"
              placeholder="Untitle"
              onChange={handleChange}
              value={text.title}
            />
            <textarea
              className="content"
              name="content"
              cols="30"
              rows="10"
              placeholder="type some text..."
              onChange={handleChange}
              value={text.content}
            />
            <div className="saveButton" onClick={saveNote}>save</div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;