import React from "react";
import Checkbox from "./Checkbox";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const TaskList = ({ list, setList, db }) => {
  
  const onChangeStatus = async e => {
    const { name, checked } = e.target;
    console.log(`Cambiando estado de la tarea con ID: ${name}, nuevo estado: ${checked}`); // Agrega este log

    // Actualiza la lista local
    const updatedList = list.map(item => ({
      ...item,
      done: item.id === name ? checked : item.done
    }));
    setList(updatedList);

    // Verifica si el documento existe antes de actualizar
    const taskDoc = doc(db, "tasks", name);
    const docSnapshot = await getDoc(taskDoc);
    
    if (docSnapshot.exists()) {
      // Actualiza el estado en Firestore
      try {
        await updateDoc(taskDoc, { done: checked });
        console.log(`Estado de la tarea con ID ${name} actualizado a ${checked}`);
      } catch (error) {
        console.error(`Error al actualizar el estado de la tarea con ID ${name}:`, error);
      }
    } else {
      console.error(`No existe el documento con ID ${name}`);
    }
  };

  const onClickRemoveSelectedItems = async () => {
    const completedTasks = list.filter(item => item.done);

    console.log("Tareas completadas a eliminar:", completedTasks);

    const deletePromises = completedTasks.map(async task => {
      const taskDoc = doc(db, "tasks", task.id);
      const docSnapshot = await getDoc(taskDoc); // Verificar si el documento existe antes de eliminar

      if (docSnapshot.exists()) {
        try {
          console.log(`Eliminando tarea con ID: ${task.id}`);
          await deleteDoc(taskDoc);
          console.log(`Tarea eliminada: ${task.id}`);
        } catch (error) {
          console.error(`Error al eliminar la tarea con ID ${task.id}:`, error);
        }
      } else {
        console.error(`No existe el documento con ID ${task.id} para eliminar.`);
      }
    });

    // Espera a que todas las promesas de eliminación se resuelvan
    await Promise.all(deletePromises);

    // Actualiza la lista local después de la eliminación
    const updatedList = list.filter(item => !item.done);
    setList(updatedList);
  };

  const chk = list.map(item => (
    <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
  ));

  return (
    <div className="todo-list">
      {list.length ? chk : "No Tareas"}
      {list.length ? (
        <p>
          <button className="button red" onClick={onClickRemoveSelectedItems}>
            Eliminar tareas completadas
          </button>
        </p>
      ) : null}
    </div>
  );
};

export default TaskList;