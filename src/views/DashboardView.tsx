import { Link } from "react-router-dom"
import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjects } from "@/api/ProjectAPI"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardView() {
    
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
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg rounded">
                    {data.map((project) => (
                    <li key={project._id} className="flex justify-between gap-x-2 px-5 py-3 hover:bg-gray-200 rounded">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-1">
                                <Link to={`/projects/${project._id}`}
                                className="text-fuchsia-700 cursor-pointer hover:underline text-lg font-bold"
                                >{project.projectName}</Link>
                                <p className="text-sm text-gray-600">
                                Cliente: {project.clientName}
                                </p>
                                <p className="text-sm text-gray-600">
                                {project.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            <Menu as="div" className="relative flex-none">
                                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">opciones</span>
                                <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                                </MenuButton>
                                <Transition as={Fragment} enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                                <MenuItems
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none "
                                >
                                    <MenuItem>
                                    <Link to={`/projects/${project._id}`}
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200'>
                                        Ver Proyecto
                                    </Link>
                                    </MenuItem>

                                    {project.manager === user._id && (
                                        <>
                                            <MenuItem>
                                                <Link to={`/projects/${project._id}/edit`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200'>
                                                    Editar Proyecto
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500 hover:bg-slate-200 w-full text-start'
                                                    onClick={() => mutate(project._id)}
                                                >
                                                    Eliminar Proyecto
                                                </button>
                                            </MenuItem>
                                        </>
                                    )}
                                    
                                </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center py-10">No hay proyectos aún {''}
                    <Link to='/projects/create' className="text-fuchsia-500 font-bold">Crear Proyecto</Link>
                </p>
            )}
        </>
    )
}
