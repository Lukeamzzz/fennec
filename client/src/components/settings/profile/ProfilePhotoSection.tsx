function ProfilePhotoSection() {
    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ProfilePhotoSection;