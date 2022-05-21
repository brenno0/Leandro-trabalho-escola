import { QueryClientProvider } from 'react-query'
import { queryClient } from './common/utils/queryClient'
import { Routes } from './routes/index'

export function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
  )
}