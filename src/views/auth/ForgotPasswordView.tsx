import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    
    const{ mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


    return (
        <>
            <h1 className="text-2xl font-black text-white">Reestablecer Password</h1>
            <p className="text-xl font-light text-white mt-1">
                ¿Olvidaste tu password? coloca tu email {''}
                <span className=" text-fuchsia-500 font-bold">y reestablece tu password</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-2 p-8 bg-white rounded-lg mt-5"
                noValidate
            >
                <div className="flex flex-col gap-5">
                <label
                    className="text-sm font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full p-3 rounded-md border border-gray-200"
                    {...register("email", {
                    required: "El Email de registro es obligatorio",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                    },
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
                </div>

                <input
                type="submit"
                value='Enviar Instrucciones'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                to='/auth/login'
                className="text-center text-gray-300 font-normal"
                >
                ¿Ya tienes cuenta? <span className="font-bold">Inicia Sesión</span></Link>

                <Link
                to='/auth/register'
                className="text-center text-gray-300 font-normal"
                >
                ¿No tienes cuenta? <span className="font-bold">Crea Una</span></Link>
            </nav>
        </>
    )
}