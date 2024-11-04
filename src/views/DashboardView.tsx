import { Link, useLocation, useNavigate } from "react-router-dom"
// import { Fragment } from 'react'
// import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjects } from "@/api/ProjectAPI"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import DeleteProjectModal from "@/components/projects/DeleteProjectModal"

export default function DashboardView() {
    
    const location = useLocation()
    const navigate = useNavigate()
    const { data: user, isLoading: authLoading} = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteProject,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            toast.success(data)
        },
    })
    
    if(isLoading && authLoading) return 'Cargando...'

    if(data && user) return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black">Mis Proyectos</h1>
                    <p className="font-light text-gray-500">Maneja y administra tus proyectos</p>
                </div>
                <nav className="my-5">
                    <Link
                        className="border border-purple-400 hover:bg-purple-500 text-gray-700 px-5 py-2 hover:text-white text-sm font-bold cursor-pointer transition-colors rounded"
                        to='/projects/create'
                    >
                        Nuevo Proyecto
                    </Link>
                </nav>
            </div>
            
            
            

            {data.length ? (
                // <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg rounded">
                    <table className="min-w-max w-full table-auto mt-5 rounded-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal rounded-md">
                                <th className="py-3 px-6 text-left ">Proyecto</th>
                                <th className="py-3 px-6 text-left">Cliente</th>
                                <th className="py-3 px-6 text-center w-96">Descripción</th>
                                <th className="py-3 px-6 text-center">Tipo Usuario</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                {data.map((project) => (
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-200">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                    <Link to={`/projects/${project._id}`}
                                    className="text-fuchsia-700 cursor-pointer hover:underline font-bold"
                                    >{project.projectName}</Link>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>{project.clientName}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex items-center">
                                        <span>{project.description}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                { isManager(project.manager, user._id)
                                        ?
                                        <p className="font-bold text-xs bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">Manager</p>
                                        :
                                        <p className="font-bold text-xs bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">Colaborador</p>
                                        }
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`/projects/${project._id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                        {isManager(project.manager, user._id) && (
                                            <>
                                        <Link to={`/projects/${project._id}/edit`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                    
                    // <li key={project._id} className="flex justify-between gap-x-2 px-5 py-3 hover:bg-gray-200 rounded items-center">
                    //     <div className="flex min-w-0 gap-x-4">
                            
                    //             <div>
                    //                 <Link to={`/projects/${project._id}`}
                    //                 className="text-fuchsia-700 cursor-pointer hover:underline text-lg font-bold"
                    //                 >{project.projectName}</Link>
                    //                 <p className="text-sm text-gray-600">
                    //                 Cliente: {project.clientName}
                    //                 </p>
                    //                 <p className="text-sm text-gray-600">
                    //                 {project.description}
                    //                 </p>

                    //             </div>
                    //     </div>
                    //             <div className="mb-2">
                    //                 { isManager(project.manager, user._id)
                    //                 ?
                    //                     <p className="font-bold text-xs bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">Manager</p>
                    //                 :
                    //                     <p className="font-bold text-xs bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">Colaborador</p>
                    //                 }
                    //             </div>
                    //     <div className="flex shrink-0 items-center gap-x-6">
                    //         <Menu as="div" className="relative flex-none">
                    //             <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    //             <span className="sr-only">opciones</span>
                    //             <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    //             </MenuButton>
                    //             <Transition as={Fragment} enter="transition ease-out duration-100"
                    //             enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    //             leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    //             leaveTo="transform opacity-0 scale-95">
                    //             <MenuItems
                    //                 className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none "
                    //             >
                    //                 <MenuItem>
                    //                 <Link to={`/projects/${project._id}`}
                    //                     className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200'>
                    //                     Ver Proyecto
                    //                 </Link>
                    //                 </MenuItem>

                    //                 {isManager(project.manager, user._id) && (
                    //                     <>
                    //                         <MenuItem>
                    //                             <Link to={`/projects/${project._id}/edit`}
                    //                                 className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200'>
                    //                                 Editar Proyecto
                    //                             </Link>
                    //                         </MenuItem>
                    //                         <MenuItem>
                    //                             <button
                    //                                 type='button'
                    //                                 className='block px-3 py-1 text-sm leading-6 text-red-500 hover:bg-slate-200 w-full text-start'
                    //                                 onClick={() => mutate(project._id)}
                    //                             >
                    //                                 Eliminar Proyecto
                    //                             </button>
                    //                         </MenuItem>
                    //                     </>
                    //                 )}
                                    
                    //             </MenuItems>
                    //             </Transition>
                    //         </Menu>
                    //     </div>
                    // </li>
                    ))}
                </table>
                /**{/* </ul> }*/
            ) : (
                <p className="text-center py-10">No hay proyectos aún {''}
                    <Link to='/projects/create' className="text-fuchsia-500 font-bold">Crear Proyecto</Link>
                </p>
            )}
            <DeleteProjectModal/>
        </>
    )
}
