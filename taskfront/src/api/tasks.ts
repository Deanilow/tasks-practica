import { CreateTask, UpdateTask } from '../interface/task.interface'

const API = 'http://localhost:3000/api';

export const createTaskRequest = async (task: CreateTask) => {
    return await fetch(`${API}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const GetTaskRequest = () => fetch(`${API}/tasks`)

export const DeleteTaskRequest = (id: string) => fetch(`${API}/tasks/${id}`, { method: 'DELETE' })

export const UpdateTaskRequest = async (id: string, task: UpdateTask) => {
    return await fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}