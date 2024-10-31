import React, { Fragment } from "react";

const Checkbox = props => {
  const {
    onChange,
    data: { id, description, done }
  } = props;
  console.log(props.data);
  return (
    <Fragment>
      <label className="todo new-item">
        <input
          className="todo__state"
          name={id}
          type="checkbox"
          checked={done}
          onChange={onChange}
        />
        <div className="todo__text">{description}</div> {/* Descripción de la tarea */}
      </label>
    </Fragment>
  );
};

export default Checkbox;