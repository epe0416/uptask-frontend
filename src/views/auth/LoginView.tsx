import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const {mutate} = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <h1 className="text-2xl font-black text-white">Iniciar Sesión</h1>
            <p className="text-xl font-light text-white mt-1">
                Comienza a planear tus proyectos {''}
                <span className=" text-fuchsia-500 font-bold">iniciando sesión</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-2 p-8 bg-white rounded-lg mt-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-bold"
                >Email</label>

                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full p-3 rounded-md border border-gray-200"
                    {...register("email", {
                    required: "El Email es obligatorio",
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

                <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-bold"
                >Password</label>

                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full p-3 rounded-md border border-gray-200"
                    {...register("password", {
                    required: "El Password es obligatorio",
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                </div>

                <input
                type="submit"
                value='Iniciar Sesión'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded-lg"
                />
            </form>
            <nav className="mt-5 flex flex-col space-y-2 items-center">
                <Link
                    to={'/auth/register'}
                    className="text-cneter text-gray-300 font-normal"
                >¿No tienes cuenta? <span className="font-bold">Crea Una</span></Link>
                <Link
                    to={'/auth/forgot-password'}
                    className="text-cneter text-gray-300 font-normal"
                >¿Olvidaste tu contraseña? <span className="font-bold">Reestablecer</span></Link>
            </nav>
        </>
    )
}