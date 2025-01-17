import React, { useState } from 'react';


const FormTodo = props => {
	
    const { handleAddItem } = props;
    const [description, setDescription] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        console.log(description);
        handleAddItem({
            done: false,
            id: (+new Date()).toString(),
            description
          });
          setDescription("");
      };
    return (
        <form onSubmit={handleSubmit}>
        <div className="todo-list">
            <div className="file-input">
            <input
                type="text"
                className="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button
                className="button pink"
                disabled={description ? "" : "disabled"}
            >
                Agregar
            </button>
            </div>
        </div>
        </form>
    );
};

export default FormTodo;