import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo';
import NavMenu from '@/components/NavMenu';

export default function AppLayout() {
    return (
        <>
            <header className='bg-gray-800 py-3 shadow-lg'>
                <div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-28'>
                        <Logo/>
                    </div>

                    <NavMenu/>
                </div>
            </header>

            <section className='max-w-screen-xl mx-auto mt-3 p-2'>
                <Outlet/>
            </section>

            <footer className='py-3'>
                <p className='text-center'>
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>

            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
