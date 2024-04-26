import React, { useState } from 'react';

function App() {
  let [notes, setNotes] = useState([]); // state เก็บโน๊ตทั้งหมดไว้แบบ array
  let [title, setTitle] = useState(''); //ตัวแปรสำหรับเก็บข้อมูลที่กรอกเข้ามาในช่อง title
  let [content, setContent] = useState(''); //ตัวแปรสำหรับเก็บข้อมูลที่กรอกเข้ามาในช่อง content
  let [selectedNoteIndex, setSelectedNoteIndex] = useState(null); // เพิ่ม state เก็บ index ของโน๊ตที่ถูกเลือก

  function handleTitleChange(event) { // function ในการรับค่าในช่อง title
    setTitle(event.target.value); 
  }

  function handleContentChange(event) { // function ในการรับค่าในช่อง content
    setContent(event.target.value);
  }

  function handleSaveNote() { //function ที่ทำงานเมื่อทำการกด save
    if (title.trim() !== '') { //ตรวจสอบว่า มีการกรอกข้อมูลในช่อง title หรือไม่
      let newNote = { //ถ้ามีการเพิ่ม title จะทำการเพิ่มข้อมูลที่ได้รับ ไปเก็บไว้ใน notes
        title: title, //ซึ่งนี่จะเป็นวิธีการบันทึกข้อมูลของทั้งการสร้างโน๊ตใหม่ และการแก้ไขโน๊ตเก่า
        content: content
      };
      if (selectedNoteIndex !== null) { // ถ้ามีโน๊ตที่ถูกเลือกเพื่อแก้ไข (เป็นการบันทึกการแก้ไข)
        let updatedNotes = [...notes]; //นำ notes ที่มีทั้งหมดมาไว้ในตัวแปร เพื่อนำไปอัพเดทข้อมูลหลังทำการแก้ไข
        updatedNotes[selectedNoteIndex] = newNote; //ระบุโน๊ตที่จะทำการแก้ไข โดยใช้ index ที่ได้รับมาจาก onClick ของ note list และนำไปเก็บไว้ในตัวแปร newNotes เพราะ เมื่อมีการคลิกโน๊ตจาก note list ข้อมูลของโน๊ตที่ถูกคลิก จะไปแสดงที่ช่องเดียวกันกับการสร้างใหม่ ทำให้เก็บไว้ในตัวแปรเดียวกันได้
        setNotes(updatedNotes); //อัพเดทรายการโน๊ตทั้งหมดใหม่ โดยที่โน๊ตที่ทำการแก้ไข จะไปอยู่ที่ตำแหน่งสุดท้าย
        setSelectedNoteIndex(null); // รีเซ็ต state ของโน๊ตที่ถูกเลือก
      } else {
        setNotes([...notes, newNote]); //ถ้าไม่ใช่การแก้ไขโน๊ต ก็จะเป็นการเพิ่มโน๊ตใหม่ไปยังตำแหน่งสุดท้าย ตามปกติ
      }
      setTitle(''); //รีเซ็ตช่องกรอก title
      setContent(''); //รีเซ็ตช่องกรอก content
    }
  }

  function handleEditNote(index) { //ฟังก์ชั่นที่ทำงานเมื่อมีการคลิกที่โน๊ตจาก note list เพื่อทำการแก้ไข โดยเมื่อคลิกจะมีการส่งค่า index ของโน๊ตที่ถูกคลิกมาที่ฟังก์ชั่น
    let noteToEdit = notes[index]; //และนำ index ที่ได้ มาใช้ในการระบุตำแหน่งของข้อมูลใน array ของ notes และนำข้อมูลที่ถูกระบุ ไปเก็บไว้ในตัวแปร noteToEdit
    setTitle(noteToEdit.title); //นำข้อมูลในส่วน title ของ noteToEdit (หัวข้อของโน๊ตที่เราจะแก้) ไปแสดงที่พื้นที่ในการกรอก title เพื่อเตรียมรับการแก้ไข
    setContent(noteToEdit.content); //เหมือนบรรทัดบน แต่เป็น content
    setSelectedNoteIndex(index); // เซ็ต state เพื่อระบุว่าโน๊ตที่เลือกจะถูกแก้ไข
  }

  function handleDeleteNote(index) { //ฟังก์ชั่นที่ทำงานเมื่อมีการคลิกที่โน๊ตจาก note list เพื่อทำการลบ
    let updatedNotes = [...notes]; //สร้างตัวแปรมาเก็บค่าโน๊ตทั้งหมด เพื่อนำไปแก้ไข
    updatedNotes.splice(index, 1); //ใช้ method .splice เพื่อกำหนดว่าจะลบโน๊ตตัวไหน โดย parameter ที่ต้องกรอกให้ method นี้ คือ index ของข้อมูลที่ต้องการลบ และ จำนวนข้อมูลที่ต้องการลบนับจากตำแหน่งของ index
    setNotes(updatedNotes); //ทำการอัพเดทข้อมูลของ notes ทั้งหมดหลังจากลบข้อมูลที่เลือกแล้ว
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
                <h3 onClick={() => handleEditNote(index)}>{entry.title}</h3>
                <button onClick={() => handleDeleteNote(index)} className='deleteItem'>Delete</button>
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
          <button className='saveButton' onClick={handleSaveNote}>Save</button>
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
              <button className='saveButton' onClick={handleSaveNote}>Save</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;