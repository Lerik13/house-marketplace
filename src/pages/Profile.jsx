import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase.config'
import { getAuth, updateProfile } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'
import { getStorage, ref, deleteObject } from 'firebase/storage'

function Profile() {
	const auth = getAuth()
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData

	const navigate = useNavigate()
	
	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, 'listings')
			const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
			const querySnap = await getDocs(q)

			let listings = []

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data()
				})
			})
			setListings(listings)
			setLoading(false)
		}

		fetchUserListings()
	}, [auth.currentUser.uid]);

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const removeFilesFromStorage =  (imgUrls) => {
		const storage = getStorage()

		imgUrls.map((imgUrl) => {
			const imgRef = ref(storage, imgUrl);
			// Delete the file
			deleteObject(imgRef).then(() => {
				console.log('Image file is deleted successfully');
			}).catch((e) => {
				toast.error('Error during deleting files in Storage')
				console.log(e);
			});
		})
	} 
	
	const onDelete = async (listingId, imgUrls) => {

		if (window.confirm('Are you sure you want to delete listing?')) {
			await deleteDoc( doc(db, 'listings', listingId) )
			const updatedListings = listings.filter((listing) => listing.id !== listingId)
			setListings(updatedListings)
			removeFilesFromStorage(imgUrls)
			toast.success('Successfully deleted listing')
		}
	}

	const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in Firebase
				await updateProfile(auth.currentUser, {
					displayName: name
				})
				// Update in Firestore
				const userRef = doc(db, 'users', auth.currentUser.uid)
				await updateDoc(userRef, {
					name
				})
			}
		} catch (error) {
			toast.error('Could not update profile details')
		}
	}

	return <div className="profile">
		<header className="profileHeader">
			<p className="pageHeader">MyProfile</p>
			<button type='button' className="logOut" onClick={onLogout}>
				Logout
			</button>
		</header>

		<main>
			<div className="profileDetailsHeader">
				<p className="profileDetailsText">Personal Details</p>
				<p className="changePersonalDetails" onClick={() => {
					changeDetails && onSubmit()
					setChangeDetails((prevState) => !prevState)
				}}>
					{changeDetails ? 'done' : 'change'}
				</p>
			</div>

			<div className="profileCard">
				<form>
					<input 
						type="text"
						id="name"
						className={!changeDetails ? 'profileName' : 'profileNameActive'} 
						disabled={!changeDetails}
						value={name}
						onChange={onChange}
					/>
					<input 
						type="text"
						id="email"
						className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
						disabled={!changeDetails}
						value={email}
						onChange={onChange}
					/>
				</form>
			</div>

			<Link to='/create-listing' className="createListing">
				<img src={homeIcon} alt="home" />
				<p>Sell or Rent your home</p>
				<img src={arrowRight} alt="arrow right" />
			</Link>

			{!loading && listings?.length > 0 && (
				<>
					<p className="listingText">Your Listings</p>
					<ul className="listingsList">
						{listings.map((listing) => (
							<ListingItem 
								key={listing.id}
								listing={listing.data}
								id={listing.id}
								onDelete={() => onDelete(listing.id, listing.data.imgUrls)}
								onEdit={() => onEdit(listing.id)}
							/>
						))}
					</ul>
				</>
			)}
		</main>
	</div>
}

export default Profile