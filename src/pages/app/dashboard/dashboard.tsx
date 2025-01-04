import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount'
import { RevenueChart } from './revenue-chart'
import { PopularProductsChart } from './popular-products-chart'

export function Dashboard() {
    return (
        <>
            <Helmet title='Financeiro' />
            <div className='flex flex-col gap-4'>
                <h1 className="text-3xl font-bold tracking-tighter">Financeiro</h1>

                <div className='grid grid-cols-3 gap-4 justify-between pb-2'>
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <RevenueChart />
                </div>
            </div>
        </>

    )
}