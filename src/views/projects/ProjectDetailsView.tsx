import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery} from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from '../../components/tasks/AddTaskModal';

export default function ProjectDetailsView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>

    if(data) return (
        <>
            <h1 className="text-2xl font-black">{data.projectName}</h1>
            <p className="text-lg font-light text-gray-500 mt-1">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                    onClick={() => navigate('?newTask=true')}
                >
                    Agregar Tarea
                </button>
            </nav>
            <AddTaskModal/>
        </>
    )
}

