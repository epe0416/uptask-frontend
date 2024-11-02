import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery} from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from '../../components/tasks/AddTaskModal';
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading} = useAuth()

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })
    
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if(isLoading && authLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>

    if(data && user) return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black">{data.projectName}</h1>
                    <p className="font-light text-gray-500 mt-1">{data.description}</p>
                    <p className="font-light text-gray-500 mt-1">Cantidad de tareas: <span className="font-bold">{data.tasks.length}</span></p>
                </div>
                {isManager(data.manager, user._id) && (
                    <nav className="my-5 flex gap-3">
                        <button
                            type="button"
                            className="border border-purple-600 px-3 py-2 text-gray-700 text-sm font-bold hover:bg-purple-700 hover:text-white cursor-pointer transition-colors rounded"
                            onClick={() => navigate(location.pathname + '?newTask=true')}
                        >
                            Agregar Tarea
                        </button>
                        <Link
                            to={'team'}
                            className="border border-fuchsia-600 hover:bg-fuchsia-700 hover:text-white px-3 py-2 text-gray-700 text-sm font-bold cursor-pointer transition-colors rounded"
                        >
                            Colaboradores
                        </Link>
                    </nav>
                )}

            </div>

            <TaskList
                tasks = {data.tasks}
                canEdit = {canEdit}
            />
            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
        </>
    )
}

