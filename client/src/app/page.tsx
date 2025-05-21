import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import {ArrowRight, ChartNoAxesCombined, CircleDollarSign, Gauge, Shield, TrendingUp } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import Link from "next/link";
import TypingEffect from "@/lib/TypingEffect";

export default function Home() {
  return (
    <div>
      <Navbar/>
      
      <div className="w-full bg-[#F56C12] flex items-center justify-around text-center h-screen px-10 pt-20 shadow-xl">
        <div className="w-1/2 space-y-10 text-left">
          <h1 className="text-white text-6xl font-bold">Optimize your decisions with real estate intelligence</h1>
          <p className="text-white text-2xl">Access strategic analysis, intuitive visualizations and predictive models to understand the market, anticipate trends and make decisions with greater confidence.</p>
        </div>
        
        <img src="./images/3DHouse.png" alt="" className="w-1/3"/>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#F56C12" d="M0,160L30,165.3C60,171,120,181,180,160C240,139,300,85,360,53.3C420,21,480,11,540,32C600,53,660,107,720,117.3C780,128,840,96,900,117.3C960,139,1020,213,1080,208C1140,203,1200,117,1260,85.3C1320,53,1380,75,1410,85.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
      </svg>

      <div className="bg-white w-full mb-30">
        <h1 className="text-gray-900 text-5xl font-bold text-center mb-7">We turn data into opportunities</h1>
        <h4 className="text-gray-600 text-center text-xl font-medium mb-10">Discover the potential and real value of any property with Fennec's advanced tools</h4>

        <div className="grid grid-cols-3 gap-7 mx-5">
          <FeatureCard
            title="Precise Valuation"
            description="Leverage advanced algorithms to analyze multiple factors and determine accurate property values."
            Icon={CircleDollarSign}
          />
          <FeatureCard
            title="Market Analysis"
            description="Track local and regional trends to uncover prime investment opportunities."
            Icon={TrendingUp}
          />
          <FeatureCard
            title="Risk Assessment"
            description="Analyze potential risks to make informed and safer investment decisions."
            Icon={Shield}
          />
          <FeatureCard
            title="Performance Tracking"
            description="Monitor historical performance and future projections to optimize investments."
            Icon={ChartNoAxesCombined}
          />
          <FeatureCard
            title="Intuitive Dashboard"
            description="Visualize real-time data with dynamic charts and dashboards for deeper insights."
            Icon={Gauge}
          />
          
          <div className="bg-white text-xl font-semibold flex items-center justify-center border-2 border-orange-500 border-dashed rounded-xl hover:scale-103 duration-300">
            <Link href="/plans">
              <button className="flex items-center"> 
                Get Started with Fennec
                <ArrowRight className="h-6 w-6 ml-2" />
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 py-20 text-center">
          <TypingEffect/>
        </div>
        

      </div>
      <Footer/>
    </div>
  );
}