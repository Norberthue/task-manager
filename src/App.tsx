import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import { Task} from './Types'
import TaskForm from './components/TaskForm';
import Auth from './components/Auth';
import { db, auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";



function App() {
  const [user, setUser] = useState(auth.currentUser);
  const  [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  
  // collect data for user
  const tasksCollection = collection(db, "tasks");

   const getTasks = async () => {
    const user = auth.currentUser;
    if (!user) return [];
  
    const q = query(tasksCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
   const addTask = async (title: string) => {
    const user = auth.currentUser;
    if (!user) return;
  
    await addDoc(tasksCollection, {
      title,
      completed: false,
      userId: user.uid, // 🔥 Link task to the logged-in user
    });
    setTasks([...tasks, { id: user.uid, title, completed: false }]);
  };
  
   const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
   const editTask = async (id: string, newTitle: string) => {
    await updateDoc(doc(db, "tasks", id), { title: newTitle });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task)));
  };
  
   const toggleTask = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "tasks", id), { completed });
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  //user authentication
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTasks();
      } else {
        setTasks([]);
      }
    });
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setTasks([]);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {user ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <h2>{user.email}</h2>
            <button onClick={handleSignOut} className="bg-red-500 text-white p-2">Logout</button>
          </div>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} editTask={editTask} toggleTask={toggleTask} deleteTask={deleteTask} />
        </>
      ) : (
        <Auth onAuthSuccess={() => setUser(auth.currentUser)} />
      )}
    </div>
  )
}

export default App

