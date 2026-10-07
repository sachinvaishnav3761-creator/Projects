# FoodAI - AI Powered Food E-commerce

Frontend-only React app (Vite + React + Bootstrap 5 + React Router + React Icons).
Cart, wishlist and login state are stored in localStorage. No backend, Firebase or MongoDB.

## Run
```bash
npm install
npm run dev
```
Open the URL printed in the terminal (usually http://localhost:5173).

## Notes
- Each dish uses a built-in illustration (works offline). To use real photos, put files in public/images and set them in the `photos` object in src/data/foods.js.
- Auth is a demo: accounts are kept in localStorage, so do not use real passwords.
