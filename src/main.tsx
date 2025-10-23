import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/Store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InvoiceDetails from './pages/InvoiceDetails.tsx'
import StickySidebar from './components/StickySidebar.tsx'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StickySidebar /> 
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/invoice-details' element={<InvoiceDetails />} />
      </Routes>
    </Provider>
  </BrowserRouter>

)
