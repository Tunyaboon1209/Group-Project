import React, { useState } from "react";

function App() {
  let [inputText, setInputText] = useState({
    //สร้างตัวแปรเพื่อเก็บข้อมูลที่ทำการกรอกเข้ามาทาง textArea
    title: "",
    content: "",
  });
  let [notes, setNotes] = useState([]);
  let [editNoteIndex, setEditNoteIndex] = useState(null);

  function handleChange(event) {
    let { name, value } = event.target;
    setInputText((prevInputText) => ({
      // ใช้ prevState แทนการใช้ useCallback
      ...prevInputText, // ยังคงเก็บค่าเก่าไว้
      [name]: value, // ตั้งค่าใหม่โดยใช้ name เป็น key
    }));
  }

  function createNote() {
    if (editNoteIndex !== null) {
      //ถ้าเป็นการเปิดโน๊ตเก่าขึ้นมาแก้ไข
      let newNotes = [...notes];
      newNotes[editNoteIndex] = {
        title: inputText.title,
        content: inputText.content,
      };
      setNotes(newNotes);
      setEditNoteIndex(null);
      setInputText({
        title: "",
        content: "",
      });
    } else {
      setNotes((prevNotes) => {
        return [...prevNotes, inputText];
      });
    }
    setInputText({
      title: "",
      content: "",
    });
  }

  function saveNote() {
    if (editNoteIndex !== null) {
      //ถ้าเป็นการเปิดโน๊ตเก่าขึ้นมาแก้ไข
      let newNotes = [...notes];
      newNotes[editNoteIndex] = {
        title: inputText.title,
        content: inputText.content,
      };
      setNotes(newNotes);
      setEditNoteIndex(null);
    } else {
      setNotes((prevNotes) => {
        return [...prevNotes, inputText];
      });
    }
  }

  function editNote(index) {
    // เมื่อคลิกที่รายชื่อโน๊ตบน side bar
    if (editNoteIndex !== index) {
      let newNotes = [...notes];
      newNotes[editNoteIndex] = {
        title: inputText.title, // ใช้ inputText ในการอัพเดท title
        content: inputText.content, // ใช้ inputText ในการอัพเดท content
      };
      setNotes(newNotes);
    } else if (editNoteIndex === index) {
      return
    } else {
      setNotes((prevNotes) => {
        return [...prevNotes, inputText];
      });
    }
    setInputText({
      title: notes[index].title,
      content: notes[index].content,
    });
    setEditNoteIndex(index); // บอกว่าโน๊ตที่เราเปิดขึ้นมาแก้ไขคืออันไหน
    console.log(editNoteIndex, index);
  }  

  return (
    <div className="index">
      {/* ส่วนของ side bar */}
      <div className="sideBar">
        <div className="userInfoBox"></div>
        <div className="noteListBox">
          <ul className="noteList">
            {notes.map((noteItem, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    editNote(index);
                  }}
                >
                  {noteItem.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="addButtonBox">
          <button className="addButton" onClick={createNote}>
            Add new note
          </button>
        </div>
      </div>

      <div className="workSpace">
        <form>
          <textarea
            className="title"
            name="title"
            placeholder="Untitle"
            onChange={handleChange}
            value={inputText.title}
          />
          <textarea
            className="content"
            name="content"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={inputText.content}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
