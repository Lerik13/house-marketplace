import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase.config'
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
	const auth = getAuth()

	const [changeDetails, setChangeDetails] = useState(false);

	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData

	const navigate = useNavigate()

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
		</main>
	</div>
}

export default Profile