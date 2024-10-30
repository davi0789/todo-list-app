import React, { useState, useEffect } from "react";
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, addDoc, getDocs } from "firebase/firestore"; // Importa las funciones necesarias
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";

const Container = () => {
  const [list, setList] = useState([]); // (B-1)

  // Cargar tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Tareas cargadas:", taskList);
      setList(taskList);
    };

    fetchTasks();
  }, [db]); // Solo se necesita `db` si puede cambiar

  const handleAddItem = async addItem => {
    // Agregar tarea a Firestore
    const docRef = await addDoc(collection(db, "tasks"), addItem);
    setList(prevList => [...prevList, { id: docRef.id, ...addItem }]); // (B-2)
  };

  return (
    <div>
      <FormTodo handleAddItem={handleAddItem} />
      <TaskList 
        list={list} 
        setList={setList} 
        db={db} 
      />
    </div>
  );
};

export default Container;