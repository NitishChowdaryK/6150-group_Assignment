# 🛒 NovaCart – Group Assignment 5

NovaCart is a responsive e-commerce web application built using HTML, CSS, Bootstrap, and JavaScript.

This project implements client-side user authentication using Local Storage (no database required), as required for Group Assignment 5.

---

# 👥 Group Members & Responsibilities

| Member   | Responsibility |
|-----------|----------------|
| Nitish   | Git repository setup, login.html |
| Adithya  | index.html (homepage layout & components) |
| Nihar    | index.html (carousel, products, modals) |
| Rithwik  | style.css (UI styling & enhancements) |
| Murali   | login.js (login authentication logic) |
| Team     | register.js (registration logic) |

---

# 📂 Project Structure

NovaCart/
│
├── index.html
├── login.html
├── register.html
├── style.css
├── login.js
├── register.js
└── README.md

---

# 🔐 Authentication Flow (Local Storage Based)

This project implements user authentication entirely on the client side using browser Local Storage.

No backend or database is used.

---

## 1️⃣ Registration Page (register.html)

User enters:
- Email / Username
- Password (minimum 8 characters, must include at least 1 number)

Process:
- User credentials are saved to Local Storage.
- Stored under the key: "novacart_users"
- After successful registration, user is redirected to login.html.

---

## 2️⃣ Login Page (login.html)

User enters:
- Email / Username
- Password

Process:
- Credentials are validated against stored users in Local Storage.
- If credentials match:
  - A session object is created.
  - Stored under the key: "novacart_session"
  - User is redirected to index.html.
- If credentials do not match:
  - Error message is displayed.

---

# 🧠 How Local Storage Is Used

## Stored Users

Key:
novacart_users

Example Value:
[
  {
    "id": "user@example.com",
    "password": "password123",
    "createdAt": "2024-..."
  }
]

---

## Stored Session

Key:
novacart_session

Example Value:
{
  "id": "user@example.com",
  "loginAt": "2024-..."
}

---

# 🎨 Features Implemented

✔ Responsive Bootstrap layout  
✔ Navigation bar with dropdown  
✔ Product cards  
✔ Carousel component  
✔ Modals (Newsletter + Quick View)  
✔ Toast notifications  
✔ Accordion FAQ section  
✔ Client-side authentication  
✔ Form validation  
✔ Password visibility toggle  
✔ Clean Git branching workflow  

---

# 🚀 How To Run The Project

1. Clone the repository:

git clone <https://github.com/NitishChowdaryK/6150-group_Assignment.git>

2. Open the project folder in VS Code.

3. Open index.html in a browser.

4. Click Login → Create Account.

5. Register a new user.

6. Login using your newly created credentials.

No server required. The project runs entirely in the browser.

---

# 🧩 Git Workflow Strategy

Each team member worked in separate feature branches:

feature-login  
feature-register  
feature-homepage  
feature-styling  

Branches will be merged into main after completion.

Example commit messages:

feat: create login page UI  
feat: implement localStorage login validation  
feat: implement registration using localStorage  
style: improve card shadows and navbar styling  
docs: add full project README  

---

# ⚠️ Important Notes

- This is a course project.
- Authentication is client-side only.
- Passwords are stored in plain text (for educational purposes only).
- Local Storage is used to demonstrate browser-based persistence.
- Real-world applications require secure backend authentication and password encryption.

---

# 📚 Technologies Used

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript (ES6)
- Browser Local Storage
- Git & GitHub

---

# 📈 Learning Outcomes

- Understanding client-side storage
- Implementing authentication without a database
- Handling form validation
- Managing session state using Local Storage
- Collaborating using Git branches
- Separating logic into multiple JS files

---

# 🔮 Future Improvements

- Add protected dashboard page
- Encrypt stored passwords
- Add shopping cart persistence
- Add session expiration logic

---

# 📜 License

This project is for academic purposes only.

© NovaCart – Group Assignment 5
