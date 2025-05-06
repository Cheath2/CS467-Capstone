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

<img width="762" alt="Screenshot 2025-04-30 at 5 28 35 PM" src="https://github.com/user-attachments/assets/cd3ccaa9-3012-4da7-9b1f-8483a350411e" />


**Get All Contacts**

<img width="765" alt="Screenshot 2025-04-30 at 5 29 45 PM" src="https://github.com/user-attachments/assets/1783ae6f-09c6-4dfa-8a51-863b4dbb31a8" />


**Update a Contact**

<img width="763" alt="Screenshot 2025-04-30 at 5 31 58 PM" src="https://github.com/user-attachments/assets/b54b8ecf-6803-40b3-8ffb-6a9cb0bf3d49" />


**Delete a Contact**

<img width="760" alt="Screenshot 2025-04-30 at 5 33 26 PM" src="https://github.com/user-attachments/assets/8e00218c-0711-4603-b52e-da740926af0e" />


---

**Setup Instructions**

1) npm install 
2) create .env file 

   <img width="213" alt="Screenshot 2025-04-30 at 6 10 07 PM" src="https://github.com/user-attachments/assets/d7e54e2f-8e01-44e6-a18d-442c8624abc9" />


3) start the server using node server.js or npx nodemon server.js 
4) Server will run at http://localhost:port

---

**Requirements**
1) Node.js
2) MongoDB (local or Atlas)
3) Postman for testing 
4) Working auth/login system to generate JWTs. 
