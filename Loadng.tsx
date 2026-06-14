export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">

            <div className="backdrop-blur-md bg-white/60 border border-gray-200 px-8 py-6 rounded-2xl shadow-lg flex flex-col items-center">

                <div className="h-10 w-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

                <p className="mt-3 text-sm text-gray-600 animate-pulse">
                    Loading...Please be patient
                </p>

            </div>

        </div>
    )
}