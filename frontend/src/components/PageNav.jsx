import { NavLink } from "react-router-dom";
import { TvIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from "react";

function PageNav() {

    let [isOpen, setisOpen] = useState(false);

    return (
        <div className = 'shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-10 py-4 md:flex justify-between items-center bg-white'>

                {/* logo here */}
                <div className='flex text-2xl cursor-pointer item-center gap-1'>
                    <TvIcon className="h-7 w-7 text-black" />
                    <span className='font-bold'>onPoint</span>
                </div>

                {/* Menu icon here */}
                <div onClick={() => setisOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                    {
                        isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>



                <ul className={`md:flex md:items-center md:pb-0 pb:12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    <li className='font-semibold my-7 md:my-0 md:ml-8'>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className='font-semibold my-7 md:my-0 md:ml-8'>
                        <NavLink to="/service">Service</NavLink>
                    </li>

                </ul>
                
            </div>
        </div>
    )
}

export default PageNav
