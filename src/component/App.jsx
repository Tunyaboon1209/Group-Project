import React, { useState } from "react";

function App() {
  let [isCreate, setIsCreate] = useState(false);

  function createNote() {
    setIsCreate((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div className="index">

      <div className="sideBar">
        <div className="userInfoBox"></div>
        <div className="noteListBox">
          <div className="noteList">Untitle</div>
          <div className="noteList">Untitle</div>
        </div>
        <div className="addButtonBox">
          <button onClick={createNote} className="addButton">
            Add new note
          </button>
        </div>
      </div>

      <div className="workSpace">
        {isCreate ? (
        <div>
          <form>
            <textarea className="title" name="Title" placeholder="Untitle" />
            <textarea
              className="content"
              name="content"
              cols="30"
              rows="10"
              placeholder="type some text..."
            />
          </form>
          {/* <div className="tpBox">
            <div className="tpItem">
              <div className="tpContent">To-Do List</div>
            </div>
            <div className="tpItem">
              <div className="tpContent">To-Do List</div>
            </div>
            <div className="tpItem">
              <div className="tpContent">To-Do List</div>
            </div>
            <div className="tpItem">
              <div className="tpContent">To-Do List</div>
            </div>
          </div> */}
        </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;