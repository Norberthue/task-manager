import { Task } from '../Types'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: string, completed: boolean) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newTask: string) => void;
}

function TaskList({ tasks, toggleTask, deleteTask, editTask }: TaskListProps) {
    const [editedTask, setEditedTask] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    
    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            setEditId(null);
            editTask(id, editedTask);
        } else if (e.key === "Escape") {
            setEditId(null);
          }
    }
 

    return (
        <div className='max-w-lg mx-auto mt-6 bg-white shadow-lg rounded-lg p-6'>
             <ul className='space-y-3'>
                <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.li
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity:1, y:0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        key={task.id} className='flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm transition hover:bg-gray-200'>
                            {editId === task.id ? (
                                <motion.input value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    onKeyDown={(e) => {handleKeyDown(e, task.id)}}
                                    autoFocus
                                    type='text' 
                                    className='flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'  
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}>
                                </motion.input>
                                ) : ( 
                                <span onClick={() => toggleTask(task.id)} className={`flex-1 cursor-pointer text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {task.title}
                                </span>
                                )}

                                <div className='flex gap-2'>
                                    {editId === task.id ? 
                                        <>
                                            <button className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition' onClick={() => {setEditId(null), editTask(task.id, editedTask)}}>
                                            ✅
                                            </button>
                                            <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition" onClick={() => setEditId(null)}>
                                            ❌
                                            </button>
                                        </>
                                    
                                        : <button  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={() => {setEditId(task.id), setEditedTask(task.title)}}>
                                            ✏️
                                        </button>}
                                        
                                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={() => {deleteTask(task.id)}}>
                                            🗑
                                        </button>
                                </div>
                           
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
   
  )
}






export default TaskList;