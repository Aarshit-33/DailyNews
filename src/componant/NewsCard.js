import React, { useState, useEffect } from 'react';
import defaultImage from '../images/default.png';
import News from './News';
import api from './rec.json'; // comment out when not using json file

export default function NewsCard() {
	const [artical, setArtical] = useState([]);

	const [popupDisplay, setPopupDisplay] = useState(false);
	const [data, setData] = useState([]);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let dt = (date) => {
		return [
			date.getDate() +
				' ' +
				months[date.getMonth()] +
				', ' +
				date.getFullYear(),
		];
	};
	const pageSize = 9;
	const [totalResults, setTotalResults] = useState(0);
	const [page, setPage] = useState(1);

	// // to use news api
	// let api = `https://newsapi.org/v2/top-headlines?country=in&apiKey=79790959ff6a4c5b8352a631b8b7badd&page=${page}&pageSize=${pageSize}`;
	// let api = Record;

	// const fetchData = (apiURL) => {
	// 	fetch(apiURL)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setArtical(data.articles);
	// 			setTotalResults(data.totalResults);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	// // console.log(api);
	// useEffect(() => {
	// 	fetchData(api);
	// 	setPopupDisplay(false);
	// }, [api]);

	// to use local json file
	const fetchData = (api) => {
		setArtical(api.articles);
		setTotalResults(api.totalResults);
	};
	// console.log(api);

	useEffect(() => {
		fetchData(api);
		setPopupDisplay(false);
	}, []);

	return (
		<>
			<div className="">
				<h1
					id="top"
					className=" pt-3 px-10 sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900 dark:text-white">
					Top Headlines :
				</h1>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
					{artical &&
						artical.map((records) => {
							return (
								<div key={records.url}>
									{/* <!-- component --> */}

									<div className="flex flex-col justify-between max-w-2xl min-h-full mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-xl shadow-slate-700 dark:shadow-slate-900">
										<div className="">
											<img
												className="object-cover w-full h-64"
												src={
													records.urlToImage
														? records.urlToImage
														: defaultImage
												}
												alt="Article"
											/>

											<div className="p-4 h-1/3">
												<div>
													<span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
														{records.source.name
															? records.source
																	.name
															: 'Anonymous'}
													</span>
													<span className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white">
														{records.title
															? records.title
																	.length > 50
																? records.title.substring(
																		0,
																		50,
																  ) + '...'
																: records.title
															: 'Title not available'}
													</span>
													<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
														{records.description
															? records
																	.description
																	.length >
															  200
																? records.description.substring(
																		0,
																		200,
																  ) + '...'
																: records.description
															: 'Description not available'}
													</p>
												</div>
											</div>
										</div>
										<div className="relative p-5">
											<div className="w-full flex items-center justify-between">
												<button
													onClick={() => {
														setData([
															{
																title: records.title,
																url: records.url,
																urlToImage:
																	records.urlToImage,
																author: records.author,
																description:
																	records.description,
																publishedAt:
																	records.publishedAt,
																content:
																	records.content,
																source: records
																	.source
																	.name,
															},
														]);
														// console.log(data);
														setPopupDisplay(true);
													}}
													className="flex items-center space-x-1 min-w-fit px-2 py-1 font-normal tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
													<span className="">
														details
													</span>
													<img
														className="w-5 mt-1"
														src="https://img.icons8.com/ios-filled/100/FFFFFF/advance.png"
														alt=">"
													/>
												</button>
												<span className="min-w-fit mx-1 text-xs text-gray-600 dark:text-gray-300">
													{dt(
														new Date(
															records.publishedAt,
														),
													)}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
				{popupDisplay && <News data={data} display={setPopupDisplay} />}

				{/*  comment out if using news api  */}
				{/* <div className="flex justify-center mx-5">
					{page > 1 && (
						<button
							onClick={() => {
								setPage(page - 1);
								fetchData(api);
							}}
							type="button"
							className="flex justify-center items-center
					space-x-2 border border-gray-700 bg-gray-700 text-white
					rounded-md px-4 py-2 m-2 transition duration-500 ease
					select-none hover:bg-gray-800 focus:outline-none
					focus:shadow-outline
					{page <= 1  'cursor-not-allowed'}
					">
							<svg
								fill="#fff"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								width="10"
								height="10">
								<g data-name="Rewind back ward">
									<path d="M9.414,16l9.293-9.293A1,1,0,0,0,18,5H11a1,1,0,0,0-.707.293l-10,10a1,1,0,0,0,0,1.414l10,10A1,1,0,0,0,11,27h7a1,1,0,0,0,.707-1.707Z" />
									<path d="M22.414,16l9.293-9.293A1,1,0,0,0,31,5H24a1,1,0,0,0-.707.293l-10,10a1,1,0,0,0,0,1.414l10,10A1,1,0,0,0,24,27h7a1,1,0,0,0,.707-1.707Z" />
								</g>
							</svg>
							<span className="font-mono">Privious</span>
						</button>
					)}
					{page < Math.ceil(totalResults / pageSize) && (
						<button
							onClick={() => {
								setPage(page + 1);
								fetchData(api);
							}}
							type="button"
							className="flex justify-center items-center
					space-x-2 border border-gray-700 bg-gray-700 text-white
					rounded-md px-4 py-2 m-2 transition duration-500 ease
					select-none hover:bg-gray-800 focus:outline-none
					focus:shadow-outline">
							<span className="font-mono">Next</span>
							<svg
								fill="#fff"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								width="10"
								height="10">
								<g data-name="Fast forward">
									<path d="M31.707,15.293l-10-10A1,1,0,0,0,21,5H14a1,1,0,0,0-.707,1.707L22.586,16l-9.293,9.293A1,1,0,0,0,14,27h7a1,1,0,0,0,.707-.293l10-10A1,1,0,0,0,31.707,15.293Z" />
									<path d="M18.707,15.293l-10-10A1,1,0,0,0,8,5H1A1,1,0,0,0,.293,6.707L9.586,16,.293,25.293A1,1,0,0,0,1,27H8a1,1,0,0,0,.707-.293l10-10A1,1,0,0,0,18.707,15.293Z" />
								</g>
							</svg>
						</button>
					)}
				</div> */}
				<div className="h-5"> </div>
			</div>
		</>
	);
}
