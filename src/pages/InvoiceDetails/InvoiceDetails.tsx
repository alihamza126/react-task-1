import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFormData, setPaidData } from '../../redux/slice/InvoiceSlice';
import Drawer from '../../components/Drawer';
import Button from '../../shared/Button/Button';
import Chip from '../../shared/chip';
import { BiCaretLeft } from "react-icons/bi";
import type { InvoiceForm } from '../../types';

const InvoiceDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { forms } = useSelector((state: any) => state.invoice);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const invoice = forms.find((ele: InvoiceForm) => {
    return ele.invoiceNumber === location.state
  })
  const totalPayed = invoice.items.reduce((total: number, item: any) => {
    return total + item.price * item.qty;
  }, 0);


  const handleDelete = (id: number) => {
    dispatch(deleteFormData(id));
    return navigate('/')
  }
  const handlePaid = (id: number) => {
    dispatch(setPaidData(id));
  }

  const handleClose = () => {
    setSidebarOpen(false);
  }




  return (
    <div className='md:px-32 ms-0 md:ms-[100px] md:py-20 flex flex-col md:items-center justify-around '>
      <Drawer isOpen={sidebarOpen} invoice={invoice} isUpdate={true} onClose={handleClose} />
      {/* //for back */}
      <div className='sm:w-5xl md:w-7xl'>
        <div className='w-full'>
          <span onClick={() => navigate(-1)} className='mt-24 md:mt-8 md:0 cursor-pointer flex items-center text-2xl font-semibold primary-text'>
            <BiCaretLeft />
            back
          </span>
        </div>

        <div className='flex md:flex-row  flex-col mt-5 py-10 shadow-2xs gap-y-3   card-shadow bg-white px-8 rounded-xl justify-between'>
          <div className=' capitalize flex items-center justify-center gap-6 '>
            <h2>Status</h2>
            <Chip color={invoice.status === 'pending' ? 'warning' : 'success'}>{invoice.status}</Chip>
          </div>
          <div className='flex gap-2 justify-center text-xs md:text-[18px]'>
            <Button color='secondary' onClick={() => setSidebarOpen(true)} >Edit</Button>
            <Button color='danger' onClick={() => handleDelete(invoice.invoiceNumber)} showAlert>Delete</Button>
            {
              invoice.status === 'pending' && <Button color='primary' onClick={() => handlePaid(invoice.invoiceNumber)}>Mark <a href=""></a>s paid</Button>
            }
          </div>
        </div>
        <div className='flex  overflow-x-hidden shadow-2xs card-shadow flex-col mt-6 py-10  bg-white px-4   md:px-8 rounded-xl justify-between'>
          <div className='grid grid-cols-3  gap-6'>
            <div className=' col-span-2  row-span-2 '>
              <div>
                <h2># {invoice.invoiceNumber}</h2>
                <p className='primary-text'>{invoice.description}  </p>
              </div>
              <div className='flex justify-between mt-50'>
                <div className='flex-1 flex flex-col gap-2    '>
                  <span>
                    <p className='primary-text font-light'>Invoice Date</p>
                    <p className=' font-semibold'>{invoice.invoiceDate}</p>
                  </span>
                  <span>
                    <p className='primary-text font-light'>Payment Due</p>
                    <p className=' font-semibold'>Net {invoice.paymentTerm} days</p>
                  </span>
                </div>
                <div className='flex-1'>
                  <div className='flex-1 flex flex-col gap-2  '>
                    <span>
                      <p className='primary-text'>Bill To</p>
                      <p className=' font-semibold'>{invoice.billTo.name}</p>
                    </span>
                    <span className='primary-text'>
                      <p>{invoice.billFrom.address}</p>
                      <p>{invoice.billFrom.city}</p>
                      <p>{invoice.billFrom.country}</p>
                      <p>{invoice.billFrom.postCode}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=' col-span-1  row-span-1 flex flex-col gap-1'>
              <div className='primary-text'>
                <p>Gulshan Colony Near Pizza Story University Chock Bahawalpur</p>
                <p>Bahawalpur</p>
                <p>63100</p>
                <p>Pakistan</p>
              </div>
              <div className='hidden md:block mt-25'>
                <span>
                  <p className='primary-text'>Sent To</p>
                  <p className=' font-semibold'>{invoice.billTo.email}</p>
                </span>
              </div>
            </div>
          </div>
          <div className='sm:hidden md:hidden mt-16'>
            <span>
              <p className='primary-text'>Sent To</p>
              <p className=' font-semibold'>{invoice.billTo.email}</p>
            </span>
          </div>

          <div className='bg-gray-100 p-2 md:p-6 mt-20 flex flex-col gap-4  rounded-2xl w-full'>
            <div className='w-full flex  primary-text font-light justify-around'>
              <span className='w-[40%]'>Item Name</span>
              <span>Qty</span>
              <span>Price</span>
              <span>total</span>
            </div>
            {/* for fields */}
            {invoice?.items?.map((item: any, index: number) => (
              <div key={index} className='w-full flex justify-around'>
                <span className='w-[40%]'>{item.name}</span>
                <span>{item.qty}</span>
                <span>{item.price}</span>
                <span>{parseInt(item.price) * parseInt(item.qty)}</span>
              </div>
            ))}
            {/* for total view */}
            <div className='w-full bg-[#000000] text-white   rounded-2xl py-6 flex justify-between px-4 md:px-6'>
              <span>AMOUNT DUE</span>
              <span>${totalPayed}</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default InvoiceDetails