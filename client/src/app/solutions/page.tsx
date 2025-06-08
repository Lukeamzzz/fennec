"use client";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { ArrowRight, BarChart3, Building2, Calculator, ChartNoAxesCombined, CircleDollarSign, Database, Eye, Search, Shield, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import {useState, useEffect, SVGProps} from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  isPrimary?: boolean;
}

const ServiceCard = ({ title, description, features, Icon }: ServiceCardProps) => {
  return (
    <div className="rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white border border-gray-200 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-500">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-lg transition-all duration-300 bg-orange-100 group-hover:bg-white/20">
          <Icon className="h-8 w-8 transition-all duration-300 text-orange-600 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold ml-4 transition-all duration-300 text-gray-900 group-hover:text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-lg mb-6 transition-all duration-300 text-gray-600 group-hover:text-white/90">
        {description}
      </p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center transition-all duration-300 text-gray-700 group-hover:text-white/90">
            <div className="w-2 h-2 rounded-full mr-3 transition-all duration-300 bg-orange-500 group-hover:bg-white/60"></div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SolutionCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  benefits: string[];
  index?: number;
}

const CTATypingEffect = () => {
  const words = ["Transform", "Revolutionize", "Optimize", "Enhance"];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingSpeed = 120;

    if (isDeleting) {
      typingSpeed -= 40;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentWord.slice(0, prev.length + 1)
      );

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2500);
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <h2 className="text-4xl font-bold text-white mb-4">
      Ready to <span className="text-orange-200">{displayText}</span>
      <span className="blinking-cursor">|</span> Your Real Estate Strategy?
      <style>{`
        .blinking-cursor {
          animation: blink 1.3s step-end infinite;
          color: rgba(255, 255, 255, 0.8);
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </h2>
  );
};

const SolutionCard = ({ title, description, Icon, benefits, index = 0 }: SolutionCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100 transform ${
      isVisible 
        ? 'translate-y-0 opacity-100 scale-100' 
        : 'translate-y-8 opacity-0 scale-95'
    } hover:scale-105 hover:-translate-y-2`}>
      <div className="flex items-center mb-4">
        <div className={`p-3 bg-orange-100 rounded-lg transition-all duration-300 ${
          isVisible ? 'rotate-0' : 'rotate-12'
        }`}>
          <Icon className="h-6 w-6 text-orange-600" />
        </div>
        <h4 className="text-xl font-semibold ml-3 text-gray-900">{title}</h4>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <ul className="space-y-2">
        {benefits.map((benefit, benefitIndex) => (
          <li key={benefitIndex} className={`flex items-center text-sm text-gray-700 transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`} style={{ transitionDelay: `${(index * 200) + (benefitIndex * 100)}ms` }}>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function SolutionsPage() {
  const services = [
    {
      title: "Property Intelligence Platform",
      description: "Advanced property search and analysis platform with real-time market data and comprehensive property insights.",
      features: [
        "Smart property search with advanced filters",
        "Real-time market data and trends",
        "Comprehensive property details and analytics",
        "Interactive maps and location insights",
        "Property comparison tools"
      ],
      Icon: Search,
      isPrimary: true
    },
    {
      title: "Investment Analytics",
      description: "Sophisticated tools for property investment analysis, risk assessment, and portfolio optimization.",
      features: [
        "ROI and cash flow projections",
        "Market trend analysis and forecasting",
        "Risk assessment and mitigation strategies",
        "Portfolio performance tracking",
        "Investment opportunity scoring"
      ],
      Icon: ChartNoAxesCombined
    },
    {
      title: "Market Intelligence",
      description: "Deep market insights and competitive analysis to help you make informed real estate decisions.",
      features: [
        "Neighborhood market analysis",
        "Price trend forecasting",
        "Comparative market analysis (CMA)",
        "Market timing recommendations",
        "Economic indicators tracking"
      ],
      Icon: TrendingUp
    },
    {
      title: "Property Valuation",
      description: "AI-powered property valuation using advanced algorithms and comprehensive market data.",
      features: [
        "Automated valuation models (AVM)",
        "Comparative market analysis",
        "Price per square meter analysis",
        "Historical price tracking",
        "Valuation confidence scoring"
      ],
      Icon: CircleDollarSign
    }
  ];

  const solutions = [
    {
      title: "For Real Estate Investors",
      description: "Comprehensive tools for identifying, analyzing, and managing real estate investments.",
      Icon: Building2,
      benefits: [
        "Investment opportunity identification",
        "Portfolio diversification analysis",
        "Cash flow optimization",
        "Market timing strategies"
      ]
    },
    {
      title: "For Real Estate Agents",
      description: "Professional tools to serve clients better with accurate market data and insights.",
      Icon: Users,
      benefits: [
        "Client presentation tools",
        "Market reports generation",
        "Property comparison analysis",
        "Lead qualification assistance"
      ]
    },
    {
      title: "For Property Developers",
      description: "Market intelligence and site analysis tools for development project planning.",
      Icon: Calculator,
      benefits: [
        "Site selection analysis",
        "Market demand forecasting",
        "Competitive landscape analysis",
        "Development feasibility studies"
      ]
    },
    {
      title: "For Financial Institutions",
      description: "Risk assessment and portfolio management tools for real estate lending and investment.",
      Icon: Shield,
      benefits: [
        "Credit risk assessment",
        "Portfolio risk management",
        "Market exposure analysis",
        "Regulatory compliance support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Solutions & Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Comprehensive real estate intelligence solutions designed to transform how you discover, analyze, and invest in properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/platform/property-search" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Start Exploring
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link href="/plans" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and insights to help you make smarter real estate decisions with confidence and precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Solutions by Industry Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">Solutions by Industry</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Tailored solutions for different professionals in the real estate ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technology to deliver accurate, real-time insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Big Data Analytics</h3>
              <p className="text-gray-600">
                Process millions of property records and market data points to provide comprehensive insights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-gray-600">
                AI-powered algorithms that learn from market patterns to provide accurate predictions and valuations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Continuous market monitoring and instant updates to keep you informed of the latest changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <CTATypingEffect />
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Fennec for their real estate intelligence needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link href="/plans" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View All Plans
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
} 