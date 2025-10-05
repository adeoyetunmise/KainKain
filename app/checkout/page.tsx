"use client"

import dynamic from 'next/dynamic'

// Dynamically import CheckoutPage with SSR disabled
const CheckoutPage = dynamic(() => import('@/components/checkout/CheckoutPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#ece8e5] pt-28 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p>Loading checkout...</p>
          </div>
        </div>
      </div>
    </div>
  )
})

const page = () => {
  return (
    <main>
      <CheckoutPage />
    </main>
  )
}

export default page