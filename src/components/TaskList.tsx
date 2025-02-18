import { Task } from '../Types'
import { useState } from 'react';

interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
    editTask: (id: number, newTask: string) => void;
    editOpen: boolean;
    setEditOpen: (editOpen: boolean) => void;
}

function TaskList({ tasks, toggleTask, deleteTask, editTask, setEditOpen, editOpen}: TaskListProps) {
    const [editedTask, setEditedTask] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    


    return (
    <ul>
        {tasks.map((task) => (
            <li key={task.id} className='flex justify-center gap-10 p-2 mt-10 border-b'>
                {editId === task.id ? 
                <input value={editedTask} onChange={(e) => setEditedTask(e.target.value)} type='text' placeholder='edit' className='bg-black text-white rounded-xl p-1'></input>
                :
                <span onClick={() => toggleTask(task.id)} className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                </span>
                }

                {editId === task.id ? 
                <button onClick={() => {setEditId(null), editTask(task.id, editedTask)}}>
                ✅
                </button>
                : <button onClick={() => {setEditId(task.id), setEditedTask(task.title)}}>
                    ✏️
                </button>}
                
                <button onClick={() => {deleteTask(task.id)}} className='text-red-500'>
                    ❌
                </button>
            </li>
        )) }
    </ul>
  )
}






export default TaskList;