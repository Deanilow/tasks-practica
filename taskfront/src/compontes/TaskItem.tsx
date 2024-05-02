import { useTasks } from "../context/useTasks";
import { Task } from "../interface/task.interface"
import { IoCheckmarkDoneOutline, IoTrash } from "react-icons/io5";
interface Props {
    task: Task;
}

function TaskItem({ task }: Props) {

    const { deleteTask, updateTask } = useTasks();

    return (
        <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer" key={task._id}>
            <div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
            </div>
            <div className="flex gap-x-2">
                {
                    task.done ? (
                        <IoCheckmarkDoneOutline className="text-green-500" onClick={async () => {
                            await updateTask(task._id, {
                                done: !task.done
                            });
                        }}> </IoCheckmarkDoneOutline>
                    )
                        : (
                            <IoCheckmarkDoneOutline className="text-gray-500" onClick={async () => {
                                await updateTask(task._id, {
                                    done: !task.done
                                });
                            }}> </IoCheckmarkDoneOutline>
                        )
                }
                
                <IoTrash onClick={async () => {
                    if (!window.confirm('Seguro de Eliminar')) return;
                    await deleteTask(task._id);
                }}> Delete</IoTrash>
            </div>
        </div>
    )
}

export default TaskItem;