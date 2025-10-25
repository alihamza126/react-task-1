import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/header';
import type { InvoiceForm } from './types';
import Drawer from './components/Drawer';
import Chip from './shared/chip';
import EmptyState from './components/EmptyState';
import InvoiceItem from './components/InvoiceItem/InvoiceItem';

function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { invoice: { forms } }: { invoice: { forms: InvoiceForm[]; }; } = useSelector((state: { invoice: { forms: InvoiceForm[]; }; }) => state);
  const [invoices, setInvoices] = useState(forms);
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
      <Drawer isOpen={isOpenSideBar} onClose={onClose} />
      <div className=" w-full sm:min md:w-4xl">
        <Header lenght={forms.length} filterChange={handleFilter} onClick={onAddNew} />
        <div className='mt-20 flex flex-col gap-3'>
          {
            invoices.map((invoice: InvoiceForm, index: number) => (
              <InvoiceItem key={index} invoice={
                {
                  invoiceNumber: invoice.invoiceNumber,
                  invoiceDate: invoice.invoiceDate,
                  billTo: invoice.billTo,
                  items: invoice.items,
                  status: invoice.status
                }
              } />
            ))
          }
          {
            invoices.length === 0 &&
            <EmptyState />
          }
        </div>
      </div>
    </div >
  )
}

export default App
