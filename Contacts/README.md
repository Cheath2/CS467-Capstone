**Contacts API**

* This folder contains the backend API for maanging user-specific job-related contacts.  
* It is built using **Node.js**, **Express**, and **MongoDB**, and secure with **JWT authentication**.

---

**Core Features**

* User-authenticated CRUD operations on contacts 
* Protected routes using JWT tokens 
* MongoDB data model with Mongoose 
* Auto timestamps for created/updated entries 

---

**API Endpoints**

All endpoints are **protected** - they require a valid JWT token in the 'Authorization' header.

---

**Create a Contact**

[screenshot]

**Get All Contacts**

[screenshot]

**Update a Contact**

[screenshot]

**Delete a Contact**

[screenshot]

---

**Setup Instructions**

1) npm install 
2) create .env file 

 [screenshot]

3) start the server using node server.js or npx nodemon server.js 
4) Server will run at http://localhost:port

---

**Requirements**
1) Node.js
2) MongoDB (local or Atlas)
3) Postman for testing 
4) Working auth/login system to generate JWTs. 
