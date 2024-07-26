import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo';
import NavMenu from '@/components/NavMenu';

export default function AppLayout() {
    return (
        <>
            <header className=' sticky top-0 bg-gray-800 py-3 shadow-lg'>
                <div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-28 hover:bg-slate-700 hover:bg-gradient-to-t rounded'>
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
                    Todos los derechos reservados {new Date().getFullYear()}&#174;
                </p>

            </footer>

            <ToastContainer
                position="bottom-left"
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
