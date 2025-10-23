import { IoAddCircleOutline } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


type headerProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    filterChange: Function,
    lenght: Number
}

const Header = ({ onClick, filterChange, lenght }: headerProps) => {
    const [selected, setSelected] = useState("all");

    const handleChange = (value: string) => {
        setSelected(value);
        filterChange({ target: { value } });
    };

    const options = [
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "all", label: "All" },
    ];

    return (
        <div className="flex flex-col w-full  justify-center items-center overflow-hidden">
            <div className="h-16 justify-between px-8 w-full  flex">
                {/* Left Section */}
                <div>
                    <h1 className="text-3xl font-bold">Invoices</h1>
                    <p className="text-gray-500">There are {lenght.toString()} total invoices</p>
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center">
                    <Menu as="div" className="relative font-semibold inline-block text-left">
                        <MenuButton className="flex gap-2 items-center focus:outline-none">
                            Filter by Status
                            <FaChevronDown size={18} className="ml-2 text-gray-500" />
                        </MenuButton>

                        <MenuItems
                            anchor="bottom"
                            className="absolute right-0 mt-2  w-28 origin-top-right bg-white border border-gray-100 rounded-xl shadow-lg focus:outline-none z-10"
                        >
                            <div className="py-2">
                                {options.map((opt) => (
                                    <MenuItem key={opt.value}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleChange(opt.value)}
                                                className={` flex  justify-start items-center w-max text-left gap-3 px-4 py-2 text-sm ${active ? "bg-gray-50" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="status"
                                                    checked={selected === opt.value}
                                                    readOnly
                                                    className="w-4 h-4  p-1 inline text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                />
                                                <span className="text-gray-700 inline text-left">{opt.label}</span>
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </Menu>
                </div>

                {/* New Invoice Button (Desktop) */}
                <div className="hidden md:flex items-center">
                    <button
                        onClick={onClick}
                        className="px-4 py-2 flex items-center gap-x-2 bg-[#7C5CFB] text-white rounded-full"
                    >
                        <IoAddCircleOutline size={24} /> New Invoice
                    </button>
                </div>
            </div>

            {/* Mobile Button */}
            <div className="flex md:hidden justify-center mt-4">
                <button
                    onClick={onClick}
                    className="px-4 py-2 flex items-center gap-x-2 bg-[#7C5CFB] text-white rounded-full"
                >
                    <IoAddCircleOutline size={24} /> New Invoice
                </button>
            </div>
        </div>
    );
};


export default Header