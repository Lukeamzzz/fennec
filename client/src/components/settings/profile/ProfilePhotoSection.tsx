function ProfilePhotoSection() {
    return (
        <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium text-center mb-2">Foto de perfil</h2>
            <p className="text-gray-500 text-center text-sm mb-6">
                Esta foto se mostrará en tu perfil y será visible para otros usuarios.
            </p>

            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="flex flex-col items-center space-y-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-orange-500 text-white-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Cambiar foto
                    </button>
                    <button className="text-sm text-gray-600 hover:text-orange-500">
                        Eliminar foto
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePhotoSection;