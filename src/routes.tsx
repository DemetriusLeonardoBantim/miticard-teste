import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { BirthdaysEmployees } from './pages/app/birthdays-employees/birthdaysEmployees'
import { Orders } from './pages/app/orders/orders'
import { AddEmployees } from './pages/app/add-employees/add-employess'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Error } from './pages/error'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/add-employess',
                element: <AddEmployees />,
            },
            {
                path: '/birthdays',
                element: <BirthdaysEmployees />
            }
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/sign-up',
                element: <SignUp />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])