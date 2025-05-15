import React from 'react'

function BenefitComponent({ imageOnRight = true }) {
  return (
    <div className={`flex flex-col ${imageOnRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 max-w-4xl mx-auto`}>
      <div className='w-full md:w-3/5'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Lorem ipsum</h2>
        <p className='text-gray-600 leading-relaxed'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt vitae laboriosam, commodi 
          ullam dolorem nam maxime neque recusandae. Corrupti consequatur ea explicabo qui quibusdam 
          commodi voluptas aliquam provident rerum distinctio.
        </p>
      </div>
      <div className='w-full md:w-2/5 flex-shrink-0'>
        <img 
          src="./images/placeholder-img.webp" 
          alt="Benefit illustration" 
          className='rounded-lg w-full h-auto object-cover shadow-md'
        />
      </div>
    </div>
  )
}

export default BenefitComponent