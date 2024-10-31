import React, { useState, useEffect } from "react";
import { db } from '../firebase'; 
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";

const Container = () => {
  const [list, setList] = useState([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(taskList);
    };

    fetchTasks();
  }, []); // Removed db from the dependency array

  const handleAddItem = async addItem => {
    const docRef = await addDoc(collection(db, "tasks"), addItem);
    setList(prevList => [...prevList, { id: docRef.id, ...addItem }]);
  };

  return (
    <div>
      <FormTodo handleAddItem={handleAddItem} />
      <TaskList list={list} setList={setList} db={db} />
    </div>
  );
};

export default Container;