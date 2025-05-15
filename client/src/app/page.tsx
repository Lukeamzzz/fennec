import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      
      <div className=" w-full h-fit bg-neutral-50 flex flex-col justify-center items-center text-center gap-y-10 py-40">
        <h1 className="text-gray-900 text-5xl font-bold w-1/2">Optimiza tus decisiones con inteligencia inmobiliaria</h1>
        <p className="text-gray-900 text-xl font-medium w-1/2">Accede a análisis estratégicos, visualizaciones claras y modelos predictivos para entender el mercado, anticipar tendencias y tomar decisiones con mayor confianza.</p>
        <img src="./images/3DHouse.png" alt="" className="w-1/3"/>
      </div>
    
      <div className="bg-gray-900 w-full shadow-xl h-screen">
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">Marcas que confían en nosotros</h2>
        </div>
      </div>

      <div className="bg-neutral-50 w-full h-screen flex flex-col items-center text-center py-20">
        <h1 className="text-gray-900 text-5xl font-bold w-1/2">Convertimos datos en oportunidades</h1>

      </div>
      
      <Footer/>
    </div>
  );
}