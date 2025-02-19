import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import { Task} from './Types'
import TaskForm from './components/TaskForm';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  
  //fetch tasks from firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
      }));
      setTasks(fetchedTasks);
    }

    fetchTasks();
  }, []);

 // Add task to Firestore
  const addTask = async (title: string) => {
    const docRef = await addDoc(collection(db, "tasks"), { title, completed: false });
    setTasks([...tasks, { id: docRef.id, title, completed: false }]);
  };

  // Toggle task completion in Firestore
  const toggleTask = async (id: string) => {
    const taskRef = doc(db, "tasks", id);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await updateDoc(taskRef, { completed: !tasks.find((task) => task.id === id)?.completed });
  };

  // Edit task title in Firestore
  const editTask = async (id: string, newTitle: string) => {
    const taskRef = doc(db, "tasks", id);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task)));
    await updateDoc(taskRef, { title: newTitle });
  };

  // Delete task from Firestore
  const deleteTask = async (id: string) => {
    const taskRef = doc(db, "tasks", id);
    setTasks(tasks.filter((task) => task.id !== id));
    await deleteDoc(taskRef);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask}></TaskForm>
      <TaskList  editTask={editTask} tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask}></TaskList>
    </div>
  )
}

export default App
