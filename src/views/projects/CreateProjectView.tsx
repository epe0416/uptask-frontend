import { Link } from "react-router-dom"

export default function CreateProjectView() {
    return (
        <>
            <h1 className="text-2xl font-black">Crear Proyecto</h1>
            <p className="text-lg font-light text-gray-500 mt-1">Llena el siguiente formulario para crear un proyecto</p>
            
            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                    to='/'
                >
                    Volver a Proyectos
                </Link>
            </nav>
        </>
    )
}
