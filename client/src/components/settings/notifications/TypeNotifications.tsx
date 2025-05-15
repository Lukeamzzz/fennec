import ToggleButton from "@/components/settings/notifications/shared/ToggleButton";

function TypeNotifications() {
    return(
        <div className="bg-white rounded-lg p-6 ">
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" className="size-6">
                    <path
                          d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"/>
                </svg>

                <h2 className="text-xl font-medium align-middle pl-2">Tipos de Notificaciones</h2>
            </div>


            <p className="text-gray-500 text-center text-sm mb-6">
                Selecciona qué tipo de notificaciones deseas recibir.
            </p>
            <div>
                <div className="flex justify-between pb-2">
                    <h3 className=" text-left text-sm align-middle">Actualizaciones del mercado</h3>
                    <ToggleButton/>
                </div>

                <div className="flex justify-between pb-2">
                    <h3 className=" text-left text-sm align-middle">Alertas de propiedades</h3>
                    <ToggleButton/>
                </div>

                <div className="flex justify-between pb-2">
                    <h3 className=" text-left text-sm align-middle">Recordatorios de inversión</h3>
                    <ToggleButton/>
                </div>

                <div className="flex justify-between pb-2">
                    <h3 className=" text-left text-sm align-middle">SMS</h3>
                    <ToggleButton/>
                </div>


            </div>

        </div>
    )
}

export default TypeNotifications