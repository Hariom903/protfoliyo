# Full-Stack Developer Portfolio

Welcome to my professional Full-Stack Developer Portfolio repository. This project is a complete, dynamic web application designed to showcase my skills, projects, and professional experience.

## 🚀 Features

- **Dynamic Frontend Landing Page:**
  - Fully responsive, corporate-style UI.
  - Built-in **Dark/Light Mode** toggle that remembers user preferences via LocalStorage.
  - Projects and Skills sections dynamically fetch data from the backend API.
  - Seamless Contact Form that submits data asynchronously without page reloads.

- **ATS-Friendly Resume:**
  - A dedicated `resume.html` page built with strict semantic HTML.
  - Easily parsed by Applicant Tracking Systems (ATS).
  - Includes a customized print stylesheet to instantly export as a clean, professional PDF.

- **Admin Dashboard UI:**
  - A secure and professional admin interface (`admin.html`).
  - Provides full CRUD operations to manage Projects, Skills, and Messages directly from the UI.
  - Includes dynamic statistic metrics and a sidebar layout.

- **Node.js & SQLite Backend API:**
  - RESTful API built with **Express.js** (located in the `backend/` folder).
  - Powered by a lightweight **SQLite3** database (`database.sqlite`).
  - Endpoints to Create, Read, Update, and Delete data.

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (CSS Variables for Theming), Vanilla JavaScript, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Tools:** Fetch API, CORS, Body-Parser

## ⚙️ Installation & Setup

Want to run this portfolio locally? Follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hariom903/protfoliyo.git
   cd protfoliyo
   ```

2. **Start the Backend Server:**
   Open a terminal and navigate to the `backend` folder to install dependencies and run the server.
   ```bash
   cd backend
   npm install
   node server.js
   ```
   *The API will start running on `http://localhost:3000`.*

3. **Run the Frontend:**
   - Open `index.html` in your favorite browser to view the dynamic Landing Page.
   - Open `admin.html` to access the Admin Panel (requires the Node.js server to be running to fetch live data).

## 📂 Project Structure

```text
protfoliyo/
├── index.html           # Main dynamic Landing Page
├── style.css            # Global styles and Dark Mode variables
├── script.js            # Frontend logic & API integration
├── resume.html          # ATS-Friendly Resume page
├── resume.css           # Resume print styling
├── admin.html           # Admin Dashboard layout
├── admin.css            # Dashboard styling
├── admin.js             # Admin Dashboard CRUD logic
└── backend/             # Node.js + Express API
    ├── server.js        # Main server and routing file
    ├── package.json     # Node dependencies
    ├── database.sqlite  # SQLite Database
    └── seed_more.js     # DB Seeding script
```

## 📬 Contact
Created by **Hariom Dangi**  
Email: [hariomdangi266@gmail.com](mailto:hariomdangi266@gmail.com)  
LinkedIn: [Hariom Dangi](https://www.linkedin.com/in/hariom-dangi-2a5a51325)
