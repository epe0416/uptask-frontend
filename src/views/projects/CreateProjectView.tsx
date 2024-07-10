import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function CreateProjectView() {
    const initialValues ={
        projectName: "",
        clientName: "",
        description: ""
    }

    const{register, handleSubmit, formState: {errors}} = useForm({defaultValues:{} })

    const handleForm = (data) => {
        console.log(data)
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">
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

                <form
                    className="mt-10 bg-white shadow-lg p-5 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
