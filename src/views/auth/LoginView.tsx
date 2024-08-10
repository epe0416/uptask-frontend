import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = (formData: UserLoginForm) => { }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-2 p-8 bg-white rounded-lg"
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
            <nav className="mt-5 flex flex-col space-y-2">
                <Link
                    to={'/auth/register'}
                    className="text-cneter text-gray-300 font-normal"
                >¿No tienes cuenta? <span className="font-bold">Crea Una</span></Link>
            </nav>
        </>
    )
}