
function About() {
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

export default About
