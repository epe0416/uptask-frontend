import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function NotFount() {
    return (
        <>
            <div className='bg-gray-800 min-h-screen flex flex-col items-center'>
                <div className='py-5 lg:py-5 mx-auto w-[450px]'>
                    <div className='w-60 mx-auto'>
                        <Logo/>
                    </div>
                    
                    <div className='mt-5 w-full flex justify-center'>
                        <div className='w-[450px]'>
                            <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
                            <p className="mt-10 text-center text-white">
                                Tal vez quieras ir a {' '}
                                <Link className="text-fuchsia-500" to={'/'}>Proyectos</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}