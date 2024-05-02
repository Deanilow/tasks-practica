import { createContext, useEffect, useState } from 'react'
import { createTaskRequest, GetTaskRequest, DeleteTaskRequest, UpdateTaskRequest } from '../api/tasks';
import { CreateTask, UpdateTask, Task } from '../interface/task.interface';

interface TaskContextValue {
    tasks: Task[];
    createTask: (task: CreateTask) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async () => { },
    deleteTask: async () => { },
    updateTask: async () => { }
})

interface Props {
    children: React.ReactNode
}

export const TaskProvider: React.FC<Props> = ({ children }) => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        GetTaskRequest().then((response) => response.json())
            .then((data) => setTasks(data))

    }, [])

    const createTask = async (task: CreateTask) => {
        const res = await createTaskRequest(task);
        const data = await res.json();
        setTasks([...tasks, data])
    }

    const deleteTask = async (id: string) => {
        const res = await DeleteTaskRequest(id);
        if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
    }

    const updateTask = async (id: string, task: UpdateTask) => {
        const res = await UpdateTaskRequest(id, task);
        const data = await res.json();

        setTasks(tasks.map(task => task._id === id ? { ...task, ...data } : task))

        console.log(data)
    }


    return (
        <TaskContext.Provider
            value={{ tasks, createTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}