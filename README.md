# 🎬 Movie Explorer

A sleek and responsive movie discovery app built with **Next.js 15**, **TailwindCSS 4**, and **The Movie Database (TMDB) API**.  
Browse trending movies, search your favorites, and manage personalized watchlists — all with a seamless light/dark theme experience.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Parth--Gupta05%2Fmovieexplorer-blue?logo=github)](https://github.com/Parth-Gupta05/movieexplorer)

---

## 🚀 Features

✅ **Modern Stack**
- Built using **Next.js 15 (App Router)**  
- Styled with **Tailwind CSS v4.1**  
- Smooth animations using **Framer Motion**

✅ **User Features**
- 🔍 Search for movies using TMDB API  
- ♾️ Infinite scroll for popular movies  
- ❤️ Add/remove movies to your favorites (persisted in `localStorage`)  
- 🔒 Simple authentication using localStorage (register/login/logout)  
- 🌓 Fully functional **Dark/Light/System** theme toggle with SSR-safe setup  
- ⚡ Responsive, fast, and mobile-friendly UI  

✅ **Developer Goodies**
- Local storage–based session management  
- Custom hooks & context for theme and auth  
- TypeScript + Modular components  
- Toast notifications (using `react-toastify`)  

---

## 🧩 Tech Stack

| Tool | Purpose |
|------|----------|
| **Next.js 15** | Framework for SSR/SSG React apps |
| **Tailwind CSS 4.1** | Utility-first styling |
| **TypeScript** | Type-safe React development |
| **Framer Motion** | UI animations |
| **React Toastify** | Toast notifications |
| **TMDB API** | Movie data source |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Parth-Gupta05/movieexplorer.git
cd movieexplorer
```
2️⃣ Install dependencies
```
npm install
```
# or
```
yarn install
```
3️⃣ Setup environment variables
Create a .env.local file in the project root and add your TMDB API key:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
You can get an API key by creating a free account on The Movie Database (TMDB).

4️⃣ Run the development server
```
npm run dev
```
# or
```
yarn dev
```
Then open 👉 http://localhost:3000

🧠 Project Structure
```
movieexplorer/
├── app/
│   ├── page.tsx
│   ├── favorites/
│   ├── movies/
│   └── auth/
├── components/
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   └── MovieCard.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   └── UserContext.tsx
├── lib/
│   └── tmdb.ts
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── package.json
└── README.md
```

🌙 Theme System
The app supports Light, Dark, and System themes.

🔐 Authentication System
A minimal, dependency-free local authentication:

Users can register and login using email/password.

Credentials are stored locally (in localStorage).

Favorites are user-specific and sync with the logged-in account.

🧾 License
This project is licensed under the MIT License — free to use and modify.

💡 Inspiration
This project was inspired by building a fully client-side, API-driven movie explorer that combines modern UI principles with Next.js 15’s app directory and Tailwind 4’s simplicity.

🧑‍💻 Author
Parth Gupta

[![GitHub Repo](https://img.shields.io/badge/GitHub-Parth--Gupta05%2Fmovieexplorer-blue?logo=github)](https://github.com/Parth-Gupta05/movieexplorer)

Live link: 
[Check out the live app here](https://movieexplorer-m4be.vercel.app/auth/login)
