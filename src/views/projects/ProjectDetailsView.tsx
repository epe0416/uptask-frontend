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
            <h1 className="text-2xl font-black">{data.projectName}</h1>
            <p className="text-lg font-light text-gray-500 mt-1">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >
                        Agregar Tarea
                    </button>
                    <Link
                        to={'team'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                    >
                        Colaboradores
                    </Link>
                </nav>
            )}
            
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

