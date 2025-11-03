# mycrud-frontend

A minimal Next.js frontend for the mycrud Spring Boot backend.

Prerequisites
- Node 18+ and npm installed
- Backend running at http://localhost:8080 (or update `.env.local`)

Quick start (Windows cmd.exe)

```
cd C:\Users\lenovo\java\mycrud\frontend
npm install
npm run dev
```

Open http://localhost:3000

Notes
- Ensure your Spring Boot app allows CORS from http://localhost:3000 (e.g. @CrossOrigin or WebMvcConfigurer).
- Adjust fields in `components/UserForm.js` to match your backend `User` model.

