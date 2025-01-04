import './global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey='pizzashop-themes' defaultTheme='dark'>
        <Toaster richColors />
        <Helmet titleTemplate='%s | miticard' />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}