import { ChangeEvent, FormEvent, useState } from "react"
import { useTasks } from '../context/useTasks'

export default function TaskForm() {

    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false
    });

    const { createTask } = useTasks()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask({ ...task, [e.target.name]: e.target.value })

    const handleSummit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTask(task)
    }

    return (
        <div>
            <form onSubmit={handleSummit}>
                <input className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Write a title" type="text" name="title" onChange={handleChange}></input>

                <textarea className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" name="description" rows={3} onChange={handleChange}></textarea>
                <label className="inline-flex items-center gap-x-2" htmlFor="">
                    <input className="h-5 text-indigo-600" type="checkbox" onChange={
                        (e) => setTask({ ...task, done: !task.done })
                    }></input>
                    <span>Done</span>
                </label>
                <button className="bg-indigo-500 px-3 block py-2 w-full">
                    Save
                </button>
            </form>
        </div>
    )
}
