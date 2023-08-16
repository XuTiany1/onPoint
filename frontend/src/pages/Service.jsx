import React, { useState , useEffect, useCallback } from "react";
import axios from 'axios';
import { useInterval } from 'usehooks-ts';
import PacmanLoader from "react-spinners/PacmanLoader";

function Service() {

	const [loading, setLoading] = useState(false);
	const [summaryAvailable, setSummaryAvailable] = useState(false);


// |||====================== Submitting a URL to backend starts here ====================|||

	const [url, setUrl] = useState('');
	const [transactionId, setTransactionId] = useState('');

	const handleSubmit = async (e) => {
		setLoading(true);
		setSummaryAvailable(false);
		setTransactionId('');
		e.preventDefault();

		console.log("Start to handle submit");
		
		try {

			const rawResponse = await fetch('http://localhost:1000/videoSummary/postVideo', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					youtube_url: url,
				})
			});


		const content = await rawResponse.json();
		setTransactionId(content.responseTransactionId);

		console.log(transactionId);
		console.log(content);
		console.log(content.status);

		if (content.status === 200) {
			console.log("success");
		} else {
			console.log("something went wrong");
		}
		} catch (err) {
			console.log(err);
		}

		setUrl('');


		
	};
// ========================= Submitting a URL to backend ENDS here =======================







// || ================== Fetching backend generated summary starts here ===================||

	const [gistSummary, setgistSummary] = useState('');
	const [headlineSummary, setheadlineSummary] = useState('');
	const [bulletSummary, setbulletSummary] = useState('');

	useInterval(() => {

		console.log("hi");
		const handleFetchSummary = async () => {

			console.log("Start to try to get summary");
	
			const baseURL = `http://localhost:1000/videoSummary/getSummary/${transactionId}`;

	
			await axios.get(baseURL).then((response) => {
	
				console.log(response);
				console.log(`this is the response.data: ${response.data.gistSummary}`);
				console.log(`this is the response.data: ${response.data.headlineSumary}`);
				console.log(`this is the response.data: ${response.data.bulletSumary}`);



		
				if(response.gistSummary != '' && response.headlineSummary != '' && response.bulletSummary != ''){

					setLoading(false);
					setSummaryAvailable(true);
					setgistSummary(response.data.gistSummary);
					setheadlineSummary(response.data.headlineSummary);
					setbulletSummary(response.data.bulletSummary);
					
					console.log(`Gist summary is found: ${gistSummary}`);
					console.log(`Headline summary is found: ${headlineSummary}`);
					console.log(`Bullet summary is found: ${bulletSummary}`);
				}else{
					console.log("keep waiting!")
				}
	
			}).catch(error => {
				console.log(error);
			});

		}

		handleFetchSummary();

	},10000)

// ===================== Fetching backend generated summary ENDS here ======================

    return (

        <div className = "min-h-screen flex flex-col inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] index_beams__yWcJT"
		>

            <main className="container mx-auto px-6 pt-24 flex-1">


                
                <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate text-center">
                    Summarize Your Video With 
                </h2>

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter aos-init aos-animate bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase mb-8 text-center"> ONPOINT !</h1>




				<div className="max-w-3xl mx-auto">


					<p className="text-xl text-gray-600 mb-8 aos-init aos-animate text-center" data-aos="zoom-y-out" data-aos-delay="150">
						OnPoint provides concise summary from time-consuming video, so you only have to enter the enter the link and start saving time! 

					</p>


					<form onSubmit={handleSubmit} >
						<div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">

							{!loading && 
							<button 
								type="submit"
								className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
								Start Summarizing!
							</button>
							}

							{
								loading &&
								<button 
								type="submit"
								className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
									<svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
									<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
									</svg>
								Processing...
							</button>
							}

							<input 
								type="url"
								placeholder="Your video link..."
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"/>
						</div>
					</form>
				</div>


				<div className="space-y-8 pt-10 w-1/2 h-1/2 md:mx-auto">

					{
					summaryAvailable && 
						<div className=" bg-white shadow rounded-lg md:container md:mx-auto align-content: center overflow-y-scroll overscroll-auto box-content h-50 w-32 p-4 border-4">
							<h3 className="text-xl border-b font-mono tracking-wide overline decoration-sky-500"><b>{gistSummary}</b></h3>
					
							<br/>
					
					
					
							<p className="font-mono leading-relaxed text-left align-baseline break-all block whitespace-pre-line">
					
								<i>{headlineSummary}</i>
					
							</p>
					
							<p className="font-sans leading-relaxed text-left align-baseline hyphens-auto break-all whitespace-pre-line">
								{bulletSummary.split("-").join("\n -->")}
							</p>
								
						</div>
								
					}
					{
					!summaryAvailable && !loading &&
						<div className="md:mx-auto align-content: center ">
							<h3 className="text-l border-b font-mono tracking-wide"><b>{gistSummary}
							</b>
							Summarization speed depends on the video length. 
							<br></br>
							A typical 10 minute video takes about 2 minutes.
							
							</h3>

								
						</div>
								
					}
					{
					!summaryAvailable && loading &&
						<div className="md:mx-auto align-content: center ">

							<div className="flex justify-center items-center">
								<PacmanLoader
								loading={loading}
								size={40}
								color="blue"/>
							</div>

							<h3 className="text-m border-b font-mono tracking-wide">
							We are proccessing your video -- Thank you for your patience
							<br></br>
							</h3>

						</div>
								
					}

				</div>


				<div className="max-w-3xl mx-auto">

					{/* <form onSubmit={handleFetchSummary}>
							<button 
								type="submit"
								className="bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
										Fetch Summary!
							</button>
					</form> */}

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

export default Service