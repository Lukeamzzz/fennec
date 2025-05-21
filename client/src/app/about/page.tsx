
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import Image from "next/image";
import TrustedClients from "@/components/home/TrustedClients";

const AboutPage = () => {
  const metrics = [
    { value: "1000+", label: "Properties analyzed" },
    { value: "$2.5M", label: "Investment value" },
    { value: "500+", label: "Active users" },
    { value: "16", label: "Regions Covered" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-30">
        {/* Partners Section */}
        <TrustedClients />

        {/* Metrics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-orange-500 mb-2">{metric.value}</h3>
                <p className="text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">The Fennec Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We have spent years developing cutting-edge real estate analytics, building robust digital experiences, 
            and working with industry leaders to bring you the best possible platform for your investment decisions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;