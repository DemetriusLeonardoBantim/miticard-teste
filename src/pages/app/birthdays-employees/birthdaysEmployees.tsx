import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'


export function BirthdaysEmployees () {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const pageIndex = z.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],
        queryFn: () =>
            getOrders({
                pageIndex,
                orderId,
                customerName,
                status: status === 'all' ? null : status,
            }),
    })

    function handlePaginate(pageIndex: number) {
        setSearchParams((state) => {
            state.set('page', (pageIndex + 1).toString())

            return state
        })
    }

    return (
        <>
            <Helmet title="Aniversariantes" />

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Aniversariantes</h1>
                <div className="space-y-2.5">

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Nome</TableHead>
                                    <TableHead className="w-[180px]">Tipo de usuário</TableHead>
                                    <TableHead className="w-[140px]">Endereço</TableHead>
                                    <TableHead className="w-[140px]">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]">Número para contato</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </div>

                    {result && (
                        <Pagination
                            onPageChange={handlePaginate}
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount}
                            perPage={result.meta.perPage}
                        />
                    )}
                </div>
            </div>
        </>
    )
}