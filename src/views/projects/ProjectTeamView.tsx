import { Link, useNavigate, useParams } from "react-router-dom"

export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    const projectId = params.projectId!
    return (
        <>
            <h1 className="text-2xl font-black">Administrar Equipo</h1>
            <p className="text-lg font-light text-gray-500 mt-1">Administra el equipo de trabajo para este proyecto</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                    onClick={() => navigate(location.pathname + '?addMember=true')}
                >
                    Agregar Colaborador
                </button>
                <Link
                    to={`/projects/${projectId}`}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                >
                    Volver al Proyecto
                </Link>
            </nav>
        </>
    )
}
