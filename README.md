# 🌟 Social Media Submission System

This project is a **Social Media Submission System** that allows users to submit their name, social media handle, and upload multiple images. The submitted data is displayed on an admin dashboard, showcasing each user's details and uploaded images.

---

## 🌐 Deployment Links

- **Frontend**: [https://social-media-ykmd.onrender.com](https://social-media-ykmd.onrender.com)
- **Backend**: [https://social-media-1-50hs.onrender.com](https://social-media-1-50hs.onrender.com)

---

## 🚀 Features

### 🧑‍💻 User Features:

1. **Form Submission**:

   - Users can input their name.
   - Users can input their social media handle.
   - Users can upload multiple images using a file input.

2. **Submit Data**:

   - Data is stored in a database upon submission.

### 👨‍💼 Admin Features:

1. **Admin Dashboard**:

   - Fetches and displays user submissions dynamically.
   - Displays:
     - User's Name
     - Social Media Handle
     - Uploaded Images (as thumbnails or clickable links).

2. **Dynamic Updates**:

   - Dashboard updates automatically when new submissions are made.

---

## 🛠️ Technology Stack

| **Aspect**   | **Technology**       |
| ------------ | -------------------- |
| **Frontend** | ReactJS              |
| **Backend**  | Node.js with Express |
| **Database** | MongoDB (MERN stack) |
| **Styling**  | TailwindCSS          |

---

## 📂 Project Structure

```plaintext
Social-Media/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── submissionController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── submissionRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json

├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form.js
│   │   │   ├── Dashboard.js
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🔗 API Endpoints

### ✅ Sign Up Endpoint

**POST /auth/signup**

**Request Payload**:

```json
{
   "name": "manish",
   "email": "manish@gmail.com",
   "password": "1234"
}
```

**Response**:

```json
{
   "message": "account is created",
   "success": true
}
```

### ✅ Login Endpoint

**POST /auth/login**

**Request Payload**:

```json
{
   "email": "manish@gmail.com",
   "password": "1234"
}
```

**Response**:

```json
{
   "message": "login success",
   "success": true,
   "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   "email": "manish@gmail.com",
   "name": "manish"
}
```

### ✅ Form Submission Endpoint

**POST /auth/formsubmission**

**Request Payload** (form-data):

| Key            | Value         |
| -------------- | ------------- |
| `name`         | `manish`      |
| `socialhandle` | `manishinsta` |
| `image`        | (files)       |

**Response**:

```json
{
   "message": "form submission is successful",
   "success": true
}
```

### ✅ Fetch All Submissions

**GET /form/getallsubmission**

**Response**:

```json
{
    "message": "fetch all the submissions",
    "success": true,
    "data": [
        {
            "_id": "6793a9d208ae79912f699bc6",
            "name": "saurav",
            "socialhandle": "sauravkumarinsta",
            "image": [
                "https://th.bing.com/th/id/OIP.B29P-JotxZYlRA7smM4ghAHaE8?rs=1&pid=ImgDetMain"
            ],
            "__v": 0
        },
        {
            "_id": "6793b90c0989b8686484a9d4",
            "name": "novneet",
            "socialhandle": "novneetkumarinsta",
            "image": [
                "https://th.bing.com/th/id/OIP.Q9kBpTumB4I5s4NBU5tuEwHaEK?rs=1&pid=ImgDetMain"
            ],
            "__v": 0
        }
    ]
}
```

---

## 🔄 How It Works

1. **User Submission**:

   - The form allows users to enter their details and upload images.
   - Upon clicking "Submit," data is sent to the backend and stored in the database.

2. **Admin Dashboard**:

   - Displays all submissions in a clean and dynamic UI.
   - Shows user information and uploaded images.

---

## 🚀 Future Improvements

- Add user authentication for form submissions and admin access.
- Implement image compression for faster uploads.
- Enhance dashboard UI with filters and sorting capabilities.

