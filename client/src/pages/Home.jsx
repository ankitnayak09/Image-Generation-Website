import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
	if (data?.length > 0)
		return data.map((post) => <Card key={post._id} {...post} />);

	return (
		<h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
			{title}
		</h2>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);

	const [searchText, setSetSearchText] = useState("");
	const [searchedResults, setSearchedResults] = useState(null);
	const [searchTimeout, setSearchTimeout] = useState(null);
	const fetchPost = async () => {
		setLoading(true);

		try {
			const response = await fetch(
				"https://image-generation-website-production.up.railway.app/api/v1/post",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();

				setAllPosts(result.data.reverse());
			}
		} catch (error) {
			// alert(error)
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSetSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResults = allPosts.filter(
					(item) =>
						item.name
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						item.prompt
							.toLowerCase()
							.includes(searchText.toLowerCase())
				);

				setSearchedResults(searchResults);
			}, 500)
		);
	};

	return (
		<section className="max-w-7xl mx-auto">
			<div className="mt-16">
				<FormField
					labelName="Search posts"
					type="text"
					name="text"
					placeholder="Search posts"
					value={searchText}
					handleChange={handleSearchChange}
				/>
			</div>

			<div className="mt-10">
				{loading ? (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className="font-medium text-[#666e75] text-xl mb-3">
								Showing results for{" "}
								<span className="text-[#222328]">
									{searchText}
								</span>
							</h2>
						)}
						<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
							{searchText ? (
								<RenderCards
									data={searchedResults}
									title="No search Results found"
								/>
							) : (
								<RenderCards
									data={allPosts}
									title="No Posts Found"
								/>
							)}
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Home;
