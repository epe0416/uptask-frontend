import { Task } from "@/types/index"
import TaskCard from "./TaskCard"

type TaskListProps = {
    tasks: Task[]
}
type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    complete: [],
}

const statusTraslation : {[key: string]: string}={
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    complete: 'Completado',
}

const statusStyle : {[key: string]: string}={
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    complete: 'border-t-emerald-500',
}

export default function TaskList({tasks}: TaskListProps) {
    
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
        <>
            <h2 className="text-2xl font-black my-5">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                        <div className={`border border-slate-300 bg-white p-2 border-t-4 ${statusStyle[status]} rounded flex justify-between capitalize font-light`}>
                            <h3>{statusTraslation[status]}</h3>                           
                            <p className="font-bold">{tasks.length}</p>
                        </div>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
