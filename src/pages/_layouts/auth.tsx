import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className='min-h-screen grid grid-cols-2 antialiased'>
            <div className='h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between'>
                <div>
                    <div className='flex items-center gap-3 text-lg font-medium text-foreground'>
                        <span className="font-semibold">miticard</span>
                    </div>
                </div>

                <footer className="text-sm">
                    Painel do parceiro &copy; miticard - {new Date().getFullYear()}
                </footer>
            </div>

            <div className="relative flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}