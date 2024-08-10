import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {}

    return (
        <>
            <h1 className="text-2xl font-black text-white">Crear Cuenta</h1>
            <p className="text-xl font-light text-white mt-1">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-2 p-8 bg-white rounded-lg mt-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
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

                <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-bold"
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full p-3 rounded-md border border-gray-200"
                    {...register("name", {
                    required: "El Nombre de usuario es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                    minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                </div>

                <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-bold"
                >Repetir Password</label>

                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full p-3 rounded-md border border-gray-200"
                    {...register("password_confirmation", {
                    required: "Repetir Password es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                    })}
                />

                {errors.password_confirmation && (
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                )}
                </div>

                <input
                type="submit"
                value='Registrarme'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded-lg"
                />
            </form>
            <nav className="mt-5 flex flex-col space-y-2">
                <Link
                    to={'/auth/login'}
                    className="text-cneter text-gray-300 font-normal"
                >¿Ya tienes cuenta? <span className="font-bold">Inicia Sesión</span></Link>
            </nav>
        </>
    )
}