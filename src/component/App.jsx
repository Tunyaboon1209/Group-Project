import React, { useState } from "react";
import CreateArea from "./CreateArea";

function App() {
  let [isCreate, setIsCreate] = useState(false);

  function createNote() {
    setIsCreate((prevValue) => {
      return !prevValue;
    });
    console.log(isCreate);
  }

  return (
    <div className="index">
      <div className="sideBar">
        <div className="userInfoBox"></div>
        <div className="noteListBox">
          <div className="noteList">Untitle</div>
          <div className="noteList">Untitle</div>
        </div>
        <CreateArea createNote={createNote} />
      </div>
      <div className="workSpace">
        {isCreate ? (
          <form>
            <textarea
              className="title"
              name="Title"
              placeholder="Untitle..."
              onKeyPress={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  console.log("Enter pressed!");
                }
              }}
            />
            <textarea
              className="content"
              name="content"
              cols="30"
              rows="10"
              placeholder="type some text..."
            />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default App;
