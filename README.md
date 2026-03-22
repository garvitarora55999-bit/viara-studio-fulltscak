# Viara Studios

**Luxury jewellery e-commerce frontend + minimal Node.js backend**  
Designed & Developed by **Garvit Arora** · 1st Semester Student · Aspiring Full-Stack Developer

---

## Project Structure

```
viarastudios/
├── frontend/
│   ├── index.html          ← Homepage
│   ├── about.html          ← Maison / Our Story
│   ├── collections.html    ← Collections
│   ├── bespoke.html        ← Bespoke Services
│   ├── contact.html        ← Contact (developer info + form)
│   └── assets/             ← Product images
│
└── backend/
    ├── server.js           ← Express server
    ├── package.json
    └── .gitignore
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Install & Run

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

---

## API Endpoints

| Method | Route            | Description                        |
|--------|------------------|------------------------------------|
| `GET`  | `/api/health`    | Health check                       |
| `POST` | `/api/contact`   | Submit a contact form message      |
| `GET`  | `/api/messages?token=viara-admin-2026` | View all messages (admin) |

### POST `/api/contact` — Request Body

```json
{
  "name":    "Priya Sharma",
  "email":   "priya@example.com",
  "subject": "Collaboration",
  "message": "Hey Garvit, love the project!"
}
```

### Response

```json
{
  "success": true,
  "message": "Message received. Garvit will get back to you soon!"
}
```

Messages are saved in-memory (cleared on restart) and also written to `backend/messages.json` for persistence.

---

## Contact

📧 **garvitarora55999@gmail.com**

Feel free to reach out for collaborations, feedback, internships, or just to say hello!

---

*© 2026 Viara Studios. All rights reserved.*
