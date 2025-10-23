import { useEffect, useState } from 'react'
import './App.css'
import InvoiceSidebar from './components/Sidebar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import type { InvoiceForm } from './types';
import StickySidebar from './components/StickySidebar';

function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { invoice: { forms } }: { invoice: { forms: InvoiceForm[]; }; } = useSelector((state: { invoice: { forms: InvoiceForm[]; }; }) => state);
  const [invoices, setInvoices] = useState(forms);
  const navigate = useNavigate();
  const onAddNew = () => {
    setIsOpenSideBar(true)
  }
  const onClose = () => {
    setIsOpenSideBar(false)
  }

  useEffect(() => {
    setInvoices(forms)

  }, [forms])

  const handleFilter = (e: any) => {
    console.log(e.target.value)
    if (e.target.value === 'pending') {
      return setInvoices(forms.filter(invoice => invoice.status === 'pending'))
    } else if (e.target.value === 'paid') {
      return setInvoices(forms.filter(invoice => invoice.status === 'paid'))
    } else {
      setInvoices(forms)
    }
  }




  return (
    <div className='w-full   flex flex-col items-center justify-center mt-52'>
      <InvoiceSidebar isOpen={isOpenSideBar} onClose={onClose} />
      <div className=" w-full sm:min md:w-4xl">
        <Header lenght={forms.length} filterChange={handleFilter} onClick={onAddNew} />
        {/* <div className='h-full w-full absolute inset-0 bg-gray-300'></div> */}
        <div className='mt-20 flex flex-col gap-3'>
          {
            invoices.map((invoice: InvoiceForm, index: number) => (
              <div key={index} onClick={() => navigate(`/invoice-details`, { state: invoice.invoiceNumber })} className='flex gap-x-20 gap-y-2 shadow-lg shadow-gray-300 flex-wrap justify-between hover:border-primary border border-transparent ease-in duration-150 rounded-lg cursor-pointer bg-white p-4' >
                <span className=' font-semibold'>#{invoice.invoiceNumber}</span>
                <span className=' text-gray-500'>  {invoice.invoiceDate}</span>
                <span className=' text-gray-500'>{invoice.billTo.name} </span>
                <span className=' font-semibold'>${invoice.items.reduce((total, item) => total + item.price * item.qty, 0)}</span>
                <span className={`${invoice.status === 'pending' ? 'bg-[#FFF9F2] text-[#fab05b]' : 'text-[#afde52] bg-[#ECFCCB]'} px-5 py-1 rounded `}>{invoice.status}</span>
              </div>
            ))
          }
          {
            invoices.length === 0 &&
            <div className='text-2xl flex flex-col items-center font-semibold'>
              <img src="https://myapp-devahsanabdullah.vercel.app/images/empty.svg" className=' w-1/3' alt="no data" />
              <div className='flex flex-col gap-4 mt-8 items-center w-full'>
                <h3 className='text-md  whitespace-nowrap'>There is nothing here</h3>
                <p className='text-[14px] font-light text-center'>
                  Create an invoice by clicking the <b className='font-semibold'>New Invoice </b>
                  button and get started, or change the <b className='font-semibold'>Filter by Status</b>
                </p>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default App
