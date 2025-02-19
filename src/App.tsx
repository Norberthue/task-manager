import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import { Task} from './Types'
import TaskForm from './components/TaskForm';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  
  // load and save tasks from/to local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  
  
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newTask: string) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, title: newTask} : task))
  }

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
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
