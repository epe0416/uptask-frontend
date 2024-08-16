import NewPasswordToken from '@/components/auth/NewPasswordToken';
import { useState } from 'react';
import NewPasswordForm from '../../components/auth/NewPasswordForm';

export default function NewPasswordView() {

    const [isValidToken, setIsValidToken] = useState(false)
    return (
        <>
            <h1 className="text-2xl font-black text-white">Reestablecer Password</h1>
            <p className="text-xl font-light text-white mt-1">
                Ingresa el código que recibiste  {''}
                <span className=" text-fuchsia-500 font-bold"> en tu Email</span>
            </p>

            {!isValidToken ? <NewPasswordToken/> : <NewPasswordForm/> }
        </>
    )
}
