import React from 'react'
import TrustedClients from '../../components/home/TrustedClients'
import DataComponent from '@/components/home/DataComponent'
import PlanSection from '@/components/payments/PlanSection/PlanSection'
import PortafolioChart from '@/components/platform/investment-insights/portafolio/portafolio-chart/PortafolioChart'
import DashboardPropertyCard from '@/components/platform/dashboard/property-card/DashboardPropertyCard'
import PortafolioRisk from '@/components/platform/investment-insights/portafolio/portafolio-risk/PortafolioRisk'
import PropertyList from '@/components/platform/investment-insights/search/property-list/PropertyList'
import SearchFilters from '@/components/platform/investment-insights/search/search-filters/SearchFilters'


function page() {
    const propertyData = {
        name: 'Casa de Playa',
        location: 'Tulum, México',
        description: 'Hermosa casa frente al mar con acceso privado a la playa.',
        price: 450000,
        size: 320,
        bathrooms: 3,
        bedrooms: 4,
        previousPrices: [400000, 420000, 440000],
        valuation3Years: 500000,
        valuation5Years: 550000,
        growthRate: 5.2,
        roiMonthly: 1800,
        breakevenYears: 7,
        occupancyRate: 85,
        riskFactors: ['Huracanes', 'Regulación de alquileres'],
        amenities: ['Piscina', 'Wi-Fi', 'Aire acondicionado'],
        investmentGrade: 'A',
        phone: '+52 998 123 4567'
    };
  return (
      <div className='w-full min-h-screen flex flex-col justify-center items-center gap-10 p-10'>
          <h1>Test Page for React Components</h1>
          <TrustedClients/>
          <DataComponent/>
          <PlanSection/>
          <PortafolioChart/>
          <PortafolioRisk/>
          <SearchFilters/>
          <PropertyList/>
      </div>
  )
}

export default page