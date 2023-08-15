import React, { useState , useEffect, useCallback } from "react";
import axios from 'axios';
import { useInterval } from 'usehooks-ts';

function Service() {


// |||====================== Submitting a URL to backend starts here ====================|||

	const [url, setUrl] = useState('');
	const [transactionId, setTransactionId] = useState('');

	const handleSubmit = async (e) => {
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
	
			// const baseURL = `http://localhost:1000/videoSummary/getSummary/${transactionId}`;
			const baseURL = `http://localhost:1000/videoSummary/getSummary/782423d0-3b9e-11ee-86a9-d5900191e1e2`;
	
			await axios.get(baseURL).then((response) => {
	
				console.log(response);
				console.log(`this is the response.data: ${response.data.gistSummary}`);
				console.log(`this is the response.data: ${response.data.headlineSumary}`);
				console.log(`this is the response.data: ${response.data.bulletSumary}`);



		
				if(response.gistSummary != '' && response.headlineSummary != '' && response.bulletSummary != ''){
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
						Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
					</p>


					<form onSubmit={handleSubmit} >
						<div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
							<button 
								type="submit"
								className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
								Start Processing!
							</button>

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