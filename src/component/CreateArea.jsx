import React from "react";

function CreateArea(props) {

    return(
        <div className="addButtonBox">
            <button onClick={props.createNote} className="addButton">Add new note</button>
        </div>
    )
}

export default CreateArea;