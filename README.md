# Listing app - House Marketplace

React app for Creating/Searching Listings for rent or sale houses/appartments
```
test user: tets@test.com, password: test123
```
using stack of technologies:  React + Firebase;

Design: mobile-first

Database + Authontification + File storage: Firebase<br>
![DB Schema](https://github.com/Lerik13/house-marketplace/blob/master/schema_firebase_db.jpg?raw=true "DB Schema")

### Client Functionality:
1. Register User (/sign-up)
2. Login/Logout User (/sign-in)
```
test user: tets@test.com, password: test123
```
3. SignIn & SignUp with Google account
4. Forgot Password
5. For unauthorized user:
  - observe listings in:
    - main page 'Explore',
    - places for Rent (/category/rent),
    - places for Sale (/category/sale)
    - Offers page
  - see all details about certain listing and be able to contact with landlord  
 6. For authorized user (Profile page):
      <ul>
  - Change Profile details: name and email
  - Add listing for rent or sell in Profile page
  - See all user's listings
  - Edit/Delete own listings
7. See all user's tickets
8. Edit description of user's ticket if the ticket is not-clossed
9. Change status for ticket <br>
ticket created with status='new',<br>
if status is closed, user cannot edit the ticket, <br>
user has possibility to reopen the ticket, status will be open
9. /Add/Edit/Remove Note for user's ticket if the ticket is not-clossed and this note is not from Admin

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

