import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from '../firebase.config'

function Category() {
	const limitListings = 5
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);

	const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get reference
				const listingRef = collection(db, 'listings')

				//Create a query
				const q = query(
					listingRef, 
					where('type', '==', params.categoryName), 
					orderBy('timestamp', 'desc'), 
					limit(limitListings)
				)

				//Execute query
				const querySnap = await getDocs(q)

				const lastVisible = querySnap.docs[querySnap.docs.length - 1]
				setLastFetchedListing(lastVisible)

				const listings = []
				
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data()
					})
				})

				setListings(listings)
				setLoading(false)
			} catch (error) {
				toast.error('Could not fetch listings')
			}
		}

		fetchListings()
	}, [params.categoryName]);

	// Pagination - Load more
	const onFetchMoreListings = async () => {
		try {
			// Get reference
			const listingRef = collection(db, 'listings')

			//Create a query
			const q = query(
				listingRef, 
				where('type', '==', params.categoryName), 
				orderBy('timestamp', 'desc'), 
				startAfter(lastFetchedListing),
				limit(limitListings)
			)

			//Execute query
			const querySnap = await getDocs(q)

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(lastVisible)

			const listings = []
			
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data()
				})
			})

			setListings((prevState) => [...prevState, ...listings])
			setLoading(false)
		} catch (error) {
			toast.error('Could not fetch listings')
		}
	}

	return (
		<div className="category">
			<header>
				<p className="pageHeader">
					{params.categoryName === 'rent'
						? 'Places for rent'
						: 'Places for sell'}
				</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="categoryListings">
							{listings.map((listing) => (
								<ListingItem
									listing={listing.data}
									id={listing.id}
									key={listing.id}
								/>
							))}
						</ul>
					</main>

					<br />
					<br />
					{lastFetchedListing && (
						<p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
					)}
				</>
			) : (
				<p>No listings for {params.categoryName}</p>
			)}
		</div>
	)
}

export default Category