import { useState } from "react";

interface TaskFormProps {
    addTask: (title: string) => void;
}

function TaskForm ({addTask}: TaskFormProps)  {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            addTask(taskTitle);
            setTaskTitle('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}  placeholder="Enter a task..." className="border p-2 flex-1" />
            <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
        </form>
    );
}

export default TaskForm