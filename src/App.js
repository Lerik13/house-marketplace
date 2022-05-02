import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Listing from "./pages/Listing";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route path="/category/:categoryName/:listingId" element={<Listing />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					
					<Route path="/create-listing" element={<PrivateRoute />}>
						<Route path="/create-listing" element={<CreateListing />} />
					</Route>
					
					
					<Route path="/edit-listing/:listingId" element={<EditListing />} />
					<Route path="/contact/:landlordId" element={<Contact />} />
				</Routes>
				<Navbar />
			</BrowserRouter>

			<ToastContainer />
		</>
	);
}

export default App;
