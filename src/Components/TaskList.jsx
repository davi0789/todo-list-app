import React from "react";
import Checkbox from "./Checkbox";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const TaskList = ({ list, setList, db }) => {
  const onChangeStatus = async (e) => {
    const { name, checked } = e.target;
    const taskId = name.trim();

    console.log(`Cambiando estado de la tarea con ID: ${taskId}, nuevo estado: ${checked}`);

    // Actualiza la lista local
    const updatedList = list.map((item) => ({
      ...item,
      done: item.id === taskId ? checked : item.done,
    }));
    setList(updatedList);

    // Obtener el documento usando el ID del documento
    const taskDoc = doc(db, "tasks", taskId);
    const docSnapshot = await getDoc(taskDoc);

    if (docSnapshot.exists()) {
      try {
        await updateDoc(taskDoc, { done: checked });
        console.log(`Estado de la tarea con ID ${taskId} actualizado a ${checked}`);
      } catch (error) {
        console.error(`Error al actualizar el estado de la tarea con ID ${taskId}:`, error);
      }
    } else {
      console.error(`No existe el documento con ID ${taskId}`);
    }
  };

  const onClickRemoveSelectedItems = async () => {
    const completedTasks = list.filter((item) => item.done);
    if (completedTasks.length === 0) {
      alert("No hay tareas completadas para eliminar.");
      return;
    }

    const deletePromises = completedTasks.map(async (task) => {
      const taskDoc = doc(db, "tasks", task.id);
      console.log(`Buscando documento para eliminar con ID: ${task.id}`);
      const docSnapshot = await getDoc(taskDoc);

      if (docSnapshot.exists()) {
        try {
          await deleteDoc(taskDoc);
          console.log(`Tarea eliminada: ${task.id}`);
          return true; // Indica que la eliminación fue exitosa
        } catch (error) {
          console.error(`Error al eliminar la tarea con ID ${task.id}:`, error);
          return false; // Indica que hubo un error
        }
      } else {
        console.error(`No existe el documento con ID ${task.id} para eliminar.`);
        return false; // Indica que el documento no existe
      }
    });

    // Espera a que todas las promesas de eliminación se resuelvan
    const results = await Promise.all(deletePromises);

    // Verifica si todas las eliminaciones fueron exitosas
    if (results.every((result) => result)) {
      alert("Se han eliminado las tareas completadas correctamente.");
    } else {
      alert("No se pudieron eliminar algunas tareas.");
      console.log("Resultados de eliminación:", results);
    }

    // Actualiza la lista local después de la eliminación
    const updatedList = list.filter((item) => !item.done);
    setList(updatedList);
  };

  return (
    <div className="todo-list">
      {list.length > 0 ? (
        list.map((item) => (
          <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
        ))
      ) : (
        <p>No Hay Tareas para mostrar</p>
      )}
      {list.length > 0 && (
        <p>
          <button className="button red" onClick={onClickRemoveSelectedItems}>
            Eliminar tareas completadas
          </button>
        </p>
      )}
    </div>
  );
};

export default TaskList;