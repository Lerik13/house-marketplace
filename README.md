# Listing app - House Marketplace

React app for Creating/Searching Listings for rent or sale houses/appartments
```
test user: test@test.com, password: test123
```
using stack of technologies:  React + Firebase;

Design: mobile-first

Database + Authontification + File storage: Firebase<br>
![DB Schema](https://github.com/Lerik13/house-marketplace/blob/master/schema_firebase_db.jpg?raw=true "DB Schema")

### Client Functionality:
1. Register User (/sign-up)
2. Login/Logout User (/sign-in)
```
test user: test@test.com, password: test123
```
![Login](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/1.jpg?raw=true "Login")

3. SignIn & SignUp with Google account
4. Forgot Password
5. For unauthorized user observe listings in:
  - main page 'Explore',
  - places for Rent (/category/rent),
  - places for Sale (/category/sale)
    
![Explore](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/2.jpg?raw=true "Explore")
    
  - Offers page
    
![Offers](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/3.jpg?raw=true "Offers")

  - see all details about certain listing and be able to contact with landlord
  
![Listing](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/4.jpg?raw=true "Listing")
![Contact](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/7.jpg?raw=true "Contact")

6. For authorized user (Profile page):
    
  - Change Profile details: name and email
  
  ![ProfilePage](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/5.jpg?raw=true "ProfilePage")
  
  - Add listing for rent or sell in Profile page
    - See all user's listings
    - Edit/Delete own listings

  ![AddListing](https://github.com/Lerik13/house-marketplace/blob/master/screenshots/6.jpg?raw=true "AddListing")
  
### Developing details (libs):
- react
- react-router-dom -- page navigation
- firebase
  - Add authentication for email/password and Google
  - Enable Firestore Database
  - Add rules for Firestore Database
  - Create 3 composite indexes for advanced querying:
    - collection=Listing (fields: type Asc, timestamp Desc)
    - collection=Listing (fields: userRef Asc, timestamp Desc)
    - collection=Listing (fields: offer Asc, timestamp Desc)
  
- react-toastify -- nice alerts
- axios -- for async http-queries
- uuid -- create unique id
- react-icons -- use icons of FontAwesome
- leaflet, react-leaflet -- Map, Geolocation (leaflet@3.1.0, react-leaflet/core@1.0.2)<br>
Geolocation -- The listings use Google geocoding to get the coords from the address field.
- swiper -- slider images (swiper@6.8.1)
  
### Deploying:
#### set Environment Variables:
1. Google Geocode API key (REACT_APP_GEOCODE_API_KEY)

