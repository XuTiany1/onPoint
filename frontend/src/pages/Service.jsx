import React, { useState , useEffect } from "react";
import axios from 'axios';

function Service() {


	// |||====================== Submitting a URL to backend starts here ====================|||
	const [url, setUrl] = useState('');
	const [status, setStatus] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('loading');
		setMessage('');
		
		try {
			let res = await fetch("http://localhost:1000/testDB/postvideo", {
			method: "POST",
			body: JSON.stringify({
			url: url,
			}),
		});
		let resJson = await res.json();

		if (res.status === 200) {
			setUrl("")
			setMessage("Url Successfully Uploaded");
		} else {
			setMessage("Some error occured");
		}
		} catch (err) {
		console.log(err);
		}
		
	};
	// ========================= Submitting a URL to backend ends here =======================





	// || ================== Fetching backend generated summary starts here ===================||

	const [transactionId, setTransactionId] = useState('');
	const [summary, setSummary] = useState('');
	const [error, setError] = React.useState(null);

	const baseURL = "http://localhost:1000/testDB/findSummary:d26beee0-3252-11ee-ab99-b583e28fde0b";


	console.log('REACHED HERE');


	React.useEffect(() => {
		axios.get(baseURL).then((response) => {
			setSummary(response.data);
		}).catch(error => {
			setError(error);
		});
	}, []);

	console.log(`${summary.summary}`);



	// ===================== Fetching backend generated summary ends here ======================





    return (

        <div className = "min-h-screen flex flex-col ">

            <main className="container mx-auto px-6 pt-24 flex-1 text-center">
                
                <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">
                    Welcome to
                </h2>

                <h1 className="text-3xl md:text-6xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase mb-8"> ONPOINT !</h1>

                <div className="text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-blue-400 bg-opacity-10 w-fit mx-auto mb-8 rounded-full">
                    Hello
                </div>
	


				<form onSubmit={handleSubmit} >

					<div className="flex flex-col md:flex-row justify-center mb-4">
						<input
							placeholder="Your video link..."
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="text-2xl placeholder:text-gray-400 placeholder:italic py-4 px-6 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 focus:bg-opacity-20 duration-150 md:rounded-tr-none md:rounded-br-none rounded-full outline-none mb-4 md:mb-0"
						/>
						<input
							type="submit"
							value="SUBMIT!"
							className=" bg-blue-300 md:rounded-tl-none md:rounded-bl-none rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 font-bold uppercase cursor-pointer hover:opacity-75 duration-150"
						/>
					</div>

					<div className="opacity-75 italic">
						After entering your video link, the summary will be generated down below!
					</div>

					<div><p>{summary.summary}</p></div>

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
