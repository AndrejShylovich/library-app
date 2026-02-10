# 📚 Library App (MERN + TypeScript)

A fullstack library web application with authentication, a book catalog, and advanced search.
The project demonstrates work with a modern React stack, REST API, basic security practices, and testing.
---

## 🚀 Стек технологий

### Frontend
- **React + TypeScript**
- **Vite**
- **Redux Toolkit (RTK)**
- **CSS Modules**
- **Vitest** (unit + integration tests)
- Working with **cookies**
- Responsive and semantic layout

### Backend
- **Node.js + Express**
- **MongoDB (локальная)**
- **Mongoose**
- **Joi** (data validation)
- **bcrypt** (password hashing)
- **cors**
- **dotenv**
- **jsonwebtoken**
- MVC approach (routes, controllers, models)
- Middleware and custom error handling

---

## ✨ Core Features

### 🔐 Authentication
- Login and registration via modal window
- Unauthenticated users can use the app in demo mode
- Secure password storage using bcrypt
- Access to user data only after authentication
- JWT (JSON Web Token) is used for user authentication

---

### 📖 Book Catalog
- Catalog with **randomly generated genres** from a predefined list
- Ability to:
  - view all available books
  - perform searches

#### 🔍 Search
- Simple search by title
- Advanced “smart” search using multiple parameters
- Cookie data is used to improve search behavior

---

### 🏠 Home Page
Includes:
- A link to the **library card**
  - redirects to authentication if the user is not logged in
- **«Book of the Week»** component
  - poster is loaded via an external link
- A table with library opening hours
- Two informational cards
- **NavBar**:
  - home page
  - catalog with random genres
  - search (redirects to results page)
  - authentication / user profile
- **Footer**
  - informational and visual component

---

### 👤 User Profile
- View and edit:
  - first name
  - last name
  - email
- Logout
- Display of information about loaned and returned books

---

## 🧪 Testing

- **Vitest** is used
- Includes:
  - mock-тесты
  - integration tests
- Tests are implemented to **demonstrate skills**, not to fully cover the entire project. Priority during testing was given to the project logic.

---

## 🗂 Project Architecture

### Backend
- Routing
- Controllers
- Database models
- Middleware
- Input data validation
- Custom error handling

### Frontend
- Component-based architecture
- Redux Toolkit for state management
- Modular styles
- Separation of logic and UI

---

## 🛠 Installation & Running

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev
npm run test
