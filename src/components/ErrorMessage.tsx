export default function ErrorMessage({children}: {children: React.ReactNode}) {
    return (
        <div className="text-center my-3 border-l-4 border-red-700 bg-red-100 text-red-600 font-bold p-2 text-sm rounded">
            {children}
        </div>
    )
}
