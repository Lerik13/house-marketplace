# Listing app - House Marketplace

React app for Creating/Searching Listings for rent or sale houses/appartments

Design: mobile-first<br>
Database + Authontification + File storage: Firebase

### Client Functionality:
<ol>
  <li>Register User (/sign-up)</li>
  <li>Login/Logout User (/sign-in)<br>
      test user: tets@test.com, password: test123        
  </li>
  <li>SignIn & SignUp with Google account </li>
  <li>Forgot Password
  </li>
  <li>For unauthorized user:<br> 
    - observe listings in <br>
      <ul>
        <li>main page 'Explore',</li>
        <li>places for Rent (/category/rent),</li>
        <li>places for Sale (/category/sale)</li>
        <li>Offers page</li>
      </ul>
    - see all details about certain listing and be able to contact with landlord
  </li>
  <li>For authorized user (Profile page):<br>
      <ul>
        <li>Change Profile details: name and email</li>
        <li>Add listing for rent or sell in Profile page</li>
        <li>See all user's listings</li>
        <li>Edit/Delete own listings</li>
      </ul>    
  </li>
  <li>See all user's tickets</li>
  <li>Edit description of user's ticket if the ticket is not-clossed</li>
  <li>Change status for ticket <br>
    ticket created with status='new',<br>
    if status is closed, user cannot edit the ticket, <br>
    user has possibility to reopen the ticket, status will be open</li>
  <li>Add/Edit/Remove Note for user's ticket if the ticket is not-clossed and this note is not from Admin</li>
</ol>

### Developing details (libs):
<ul>
  <li>react
  <li>react-router-dom -- page navigation</li>
  <li>firebase<br>
      - Add authentication for email/password and Google<br>
      - Enable Firestore Database
      - Add rules for Firestore Database
      - Create 3 composite indexes for advanced querying:
        1) collection=Listing (fields: type Asc, timestamp Desc)
        2) collection=Listing (fields: userRef Asc, timestamp Desc)
        3) collection=Listing (fields: offer Asc, timestamp Desc)    
  </li>
  <li>react-toastify -- nice alerts</li>
  <li>axios -- for async http-queries</li>
  <li>uuid -- create unique id</li>
  <li>react-icons - use icons of FontAwesome</li>
  <li>leaflet, react-leaflet -- Map, Geolocation (leaflet@3.1.0, react-leaflet/core@1.0.2)<br>
    Geolocation -- The listings use Google geocoding to get the coords from the address field.
  </li>
  <li>swiper - slider images (swiper@6.8.1)</li>
</ul>

#### Deploying:
<h5>set Environment Variables:</h5>
  - Google Geocode API key (REACT_APP_GEOCODE_API_KEY)

