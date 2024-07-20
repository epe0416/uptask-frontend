import { ProjectFormData } from "@/types/index";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";

type EditProjectFormProps = {
    data: ProjectFormData
}

export default function EditProjectForm({data}: EditProjectFormProps) {

    const{register, handleSubmit, formState: {errors}} = useForm({defaultValues:
        {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        console.log(formData)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-black">Editar Proyecto</h1>
                <p className="text-lg font-light text-gray-500 mt-1">Llena el siguiente formulario para editar el proyecto</p>

                <form
                    className="mt-10 bg-white shadow-lg p-5 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register = {register}
                        errors= {errors}
                    />
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
