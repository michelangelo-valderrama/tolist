import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from '@/pages/router'
import '@fontsource-variable/work-sans'
import '@fontsource-variable/source-code-pro'
import '@/styles/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools
      buttonPosition="top-right"
      initialIsOpen={false}
      position="right"
    />
  </QueryClientProvider>
)
