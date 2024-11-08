import { Project, ProjectFormData } from "@/types/index";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    const navigate = useNavigate()

    const{register, handleSubmit, formState: {errors}} = useForm({defaultValues:
        {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
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
                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="border border-fuchsia-600 hover:bg-fuchsia-700 text-gray-700 p-3 hover:text-white font-bold cursor-pointer transition-colors rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
