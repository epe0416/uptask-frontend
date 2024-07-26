import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import { Task } from "@/types/index"
import { useNavigate } from "react-router-dom"

type TaskCardProps = {
    task: Task
}
export default function TaskCard({task}: TaskCardProps) {

    const navigate = useNavigate()

    return (
        <li className="p-4 bg-white border-slate-300 flex justify-between gap-3 rounded-md shadow-md hover:shadow-lg hover:bg-sky-50">
            <div className="min-w-0 flex flex-col gap-y-2">
                <button
                    type="button"
                    className="font-bold text-slate-600 text-left"
                >
                    {task.name}
                </button>
                <p className="text-slate-500">{task.description}</p>
            </div>
            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200 w-full text-start'>
                                    Ver Tarea
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-200 w-full text-start'
                                    onClick={() => navigate(location.pathname + `?editTask=${task._id}`)} 
                                >
                                    Editar Tarea
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500 hover:bg-slate-200 w-full text-start'>
                                    Eliminar Tarea
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
        </div>
        </li>
    )
}
