import { Outlet } from 'react-router-dom'
import Logo from '@/components/Logo';

export default function AppLayout() {
    return (
        <>
            <header className='bg-gray-800 py-3 shadow-lg'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-24'>
                        <Logo/>
                    </div>
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-3 p-2'>
                <Outlet/>
            </section>

            <footer className='py-3'>
                <p className='text-center'>
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>

            </footer>
        </>
    )
}
