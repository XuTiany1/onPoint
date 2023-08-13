import React, { useState , useEffect } from "react";
import axios from 'axios';

function Service() {


// |||====================== Submitting a URL to backend starts here ====================|||

	const [url, setUrl] = useState('');
	const [status, setStatus] = useState('');
	const [message, setMessage] = useState('');
	const [transactionId, setTransactionId] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('loading');
		setMessage('');

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



		if (content.status === 200) {
			setUrl("")
			setMessage("Url Successfully Uploaded");
		} else {
			setMessage("Some error occured");
		}
		} catch (err) {
			console.log(err);
		}
		
	};
// ========================= Submitting a URL to backend ENDS here =======================







// || ================== Fetching backend generated summary starts here ===================||

	const [summary, setSummary] = useState('');
	const [error, setError] = React.useState(null);



	const handleFetchSummary = async (e) => {

		e.preventDefault();

		console.log("Start to try to get summary");

		const baseURL = `http://localhost:1000/videoSummary/getSummary/${transactionId}`;

		await axios.get(baseURL).then((response) => {

			console.log(response);

			setSummary(response.data);

		}).catch(error => {
			setError(error);
		});

		console.log(`The summary is found: ${summary}`);

	}



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

				<div className="max-w-3xl mx-auto">

					<form onSubmit={handleFetchSummary}>
							<button 
								type="submit"
								className="bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
										Fetch Summary!
							</button>
					</form>


					<p>Summary Displayed Below:</p>

					<p>{summary}</p>

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