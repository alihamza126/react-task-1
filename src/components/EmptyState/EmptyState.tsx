const EmptyState = () => {
    return (
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
    )
}

export default EmptyState