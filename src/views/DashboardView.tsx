import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjects } from "@/api/ProjectAPI"

export default function DashboardView() {
    
    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })
    
    if(isLoading) return 'Cargando...'

    if(data) return (
        <>
            <h1 className="text-2xl font-black">Mis Proyectos</h1>
            <p className="text-lg font-light text-gray-500 mt-1">Maneja y administra tus proyectos</p>
            
            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                    to='/projects/create'
                >
                    Nuevo Proyecto
                </Link>
            </nav>

            {data.length ? (
                <p>Si hay proyectos</p>
            ) : (
                <p className="text-center py-10">No hay proyectos aún {''}
                    <Link to='/projects/create' className="text-fuchsia-500 font-bold">Crear Proyecto</Link>
                </p>
            )}
        </>
    )
}
