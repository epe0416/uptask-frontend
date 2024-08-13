import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
    return (
        <>
            <div className='bg-gray-800 min-h-screen flex flex-col items-center'>
                <div className='py-5 lg:py-5 mx-auto w-[450px]'>
                    <div className='w-60 mx-auto'>
                        <Logo/>
                    </div>
                    
                    <div className='mt-5 w-full flex justify-center'>
                        <div className='w-[450px]'>
                            <Outlet/>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
