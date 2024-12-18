import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData ={
        projectName: "",
        clientName: "",
        description: ""
    }

    const{register, handleSubmit, formState: {errors}} = useForm({defaultValues:initialValues })

    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })
    const handleForm = (formData : ProjectFormData) => mutation.mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-black">Crear Proyecto</h1>
                <p className="text-sm font-light text-gray-500 mt-1">Llena el siguiente formulario para crear un proyecto</p>
{/*                 
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors rounded"
                        to='/'
                    >
                        Volver a Proyectos
                    </Link>
                </nav> */}

                <form
                    className="mt-10 bg-white shadow-lg p-5 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register = {register}
                        errors= {errors}
                    />
                    <div className="w-full flex justify-center">
                        <input
                            type="submit"
                            value="Crear Proyecto"
                            className="border border-fuchsia-600 hover:bg-fuchsia-700 text-gray-700 p-3 hover:text-white font-bold cursor-pointer transition-colors rounded-lg"
                        />

                    </div>
                </form>
            </div>
        </>
    )
}
