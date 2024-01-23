import React from 'react'
import { Card } from '../../ui/dashboard/cards'
import RevenueChart from '../../ui/dashboard/revenue-chart'
import LatestInvoices from '../../ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { revenue } from '../../lib/placeholder-data'
// To fetch data for the <RevenueChart/> component, import the fetchRevenue function from data.ts
import {  fetchCardData } from '../../lib/data'
//import {fetchRevenue, fetchLatestInvoices,} from '../../lib/data'
//remove fetchRevenue, fetchLatestInvoices, and its instances from this file so as to use SUSPENSE to stream it as a component
import { Suspense } from 'react'
//import Suspense from react and wrap it around <RevenueChart/>
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons'
// import the above as a fallback component for the revenue chart


export default async function Page() {
  // const revenue = await fetchRevenue()
  // const latestInvoices = await fetchLatestInvoices()
  const {numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices} = await fetchCardData()
  return(
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      {/* CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title='Collected' value={totalPaidInvoices} type='collected'/>
        <Card title='Pending' value={totalPendingInvoices} type='pending'/>
        <Card title='Total Invoices' value={numberOfInvoices} type='invoices'/>
        <Card title='Total Customers' value={numberOfCustomers} type='customers'/>
      </div>
      {/* CHARTS */}
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        {/* <RevenueChart revenue={revenue}/> */}
        {/* replace the above with the Suspense Component */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        
      </div>
    </main>
  )
 
}
