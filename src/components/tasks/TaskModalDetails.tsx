import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function TaskModalDetails() {

    const [errorTask, setErrorTask] = useState(false)

    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const show = taskId ? true : false

    const {data, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    useEffect(() => {
        function errorNavigate(){
            if(isError){
                toast.error(error.message, {toastId: 'error'})
                setErrorTask(true)
            }
        }
        errorNavigate()
    },[isError, projectId, error, errorTask])

    if(errorTask && isError){
        return <Navigate to={`/projects/${projectId}`}/>
    }

    console.log(data)

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: </p>
                                    <p className='text-sm text-slate-400'>Última actualización: </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-2xl my-2"
                                    >Titulo aquí
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción:</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}