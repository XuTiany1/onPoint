

function Service() {
    return (

        <div className = "min-h-screen flex flex-col ">

            <main className="container mx-auto px-6 pt-16 flex-1 text-center">
                
                <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">
                    Welcome to
                </h2>

                <h1 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase mb-8">
                    onPoint!
                </h1>

                <div className="text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-blue-400 bg-opacity-10 w-fit mx-auto mb-8 rounded-full">
                    Hello~~ please enter your video link below!
                </div>

				<form 
					action="" 
					method="post" 
					id=""
					name=""
					target="">

					<div className="flex flex-col md:flex-row justify-center mb-4">
						<input
							placeholder="Your video link..."
							type="email"
							name="member[email]"
							id="member_email"
							className="text-2xl placeholder:text-gray-400 placeholder:italic py-4 px-6 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 focus:bg-opacity-20 duration-150 md:rounded-tr-none md:rounded-br-none rounded-full outline-none mb-4 md:mb-0"
						/>
						<input
							type="submit"
							value="SUBMIT!"
							name=""
							id=""
							className=" bg-blue-300 md:rounded-tl-none md:rounded-bl-none rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 font-bold uppercase cursor-pointer hover:opacity-75 duration-150"
						/>
					</div>

					<div className="opacity-75 italic">
						After entering your video link, the summary will be generated down below!
					</div>

				</form>









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

export default Service
