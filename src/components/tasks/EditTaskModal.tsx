import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId}: EditTaskModalProps) {

    const navigate = useNavigate()

    /** Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        const data = { projectId, taskId, formData }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all p-10">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-xl my-2"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                    
                                    <TaskForm
                                        register = { register }
                                        errors = { errors }
                                    />
                                    <div className='flex justify-center'>
                                        <input
                                            type="submit"
                                            className="border border-fuchsia-600 hover:bg-fuchsia-700 text-gray-700 p-3 hover:text-white font-bold cursor-pointer transition-colors rounded-lg"
                                            value='Guardar Tarea'
                                        />
                                        
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}