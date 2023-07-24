import { NavLink } from "react-router-dom";
import { TvIcon } from '@heroicons/react/24/solid'

function PageNav() {
    // let Links = [

    //     {name: 'Home', link:'/'},
    //     {name: 'About', link:'/'},
    //     {name: 'Service', link:'/'},

    // ]

    return (
        <div className = 'shadow-md w-full'>
            <div className='md:px-10 py-4 '>
                {/* logo here */}

                <div className='flex text-2xl cursor-pointer item-center gap-1'>
                    <TvIcon className="h-7 w-7 text-black" />
                    <span className='font-bold'>onPoint</span>
                </div>

                { /* nav links here */ }
                <ul>
                    {/* <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Service</NavLink>
                    </li> */}

                </ul>
                
            </div>
        </div>
    )
}

export default PageNav
