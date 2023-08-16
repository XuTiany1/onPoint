import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';



function Home() {





    return (
    
    <div className = "min-h-screen flex flex-col inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] index_beams__yWcJT">
        
        <main className="container mx-auto px-6 pt-24 flex-1">

            <div className="h-screen flex items-center justify-center"> 

                <div className="text-center font-feijoa-display text-24pt leading-tight text-gray-800 t:text-32pt l:text-48pt">
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter aos-init aos-animate">
                                Save Time.
                    </h2>
                    <br></br>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4 aos-init aos-animate">
                                Be Accurate.
                    </h2>
                    <br></br>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-8 aos-init aos-animate">
                               Start Exploring OnPoint!
                    </h2>

                    <Link to="../Service">
                        <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
                            <RocketLaunchIcon className="h-7 w-7 text-white" />

                            Start Now!
                        
                        </button>

                    </Link>


                </div>



            </div>
        </main>



            <footer className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
                <p>Built by Tianyi Xu</p>
                <div className="flex -mx-6">
                    <a href="" className="mx-3 hover:opacity-80 duration-150">About us</a> |
                    <a href="" className="mx-3 hover:opacity-80 duration-150">Contact</a>
                </div>
            </footer>


        </div>
    )
}

export default Home
