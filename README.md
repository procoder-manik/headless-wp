# 🚀 Headless WordPress React Frontend

A modern, high-performance decoupled front-end application built with **React** and styled using **Tailwind CSS**, consuming WordPress purely as a Headless CMS via the **WordPress REST API**.

---

## 🌐 Live Demos & Endpoints

| Service | Link |
| :--- | :--- |
| **Production Frontend (Vercel)** | [https://headless-wp-nine.vercel.app/](https://headless-wp-nine.vercel.app/) |
| **WordPress Backend / API Server** | [https://demo.manikhossain.in/](https://demo.manikhossain.in/) |
| **REST API Base URL** | `https://demo.manikhossain.in/wp-json/wp/v2/` |

---

## ✨ Features

- ⚡ **Decoupled Headless Architecture**: WordPress backend handles content management, while React delivers an interactive Single Page Application (SPA).
- 🎨 **Utility-First Styling**: Styled with **Tailwind CSS** for responsive design.
- 📡 **REST API Integration**: Dynamic content fetching for posts, media, categories, and custom fields.
- 🚀 **Performance Optimized**: Component-level loading states, structured component trees, and client-side routing.
- ☁️ **Cloud Native Deployment**: Automated continuous deployment configured for Vercel.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ (Create React App)
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **HTTP Client:** Fetch API / Axios
- **Backend CMS:** WordPress (Self-Hosted on Apache/Nginx)
- **Deployment:** Vercel (Frontend), Custom Hosting (WordPress backend)

---

## 📁 Project Structure

```text
headless-wp/
├── frontend/                     # React Single-Page Application
│   ├── public/                   # Static assets & index.html
│   ├── src/
│   │   ├── components/           # Reusable UI components (Navbar, Footer, Card, etc.)
│   │   ├── services/             # API handlers (WordPress REST API fetchers)
│   │   ├── App.css               # Global application styles
│   │   ├── App.js                # Main router & root application wrapper
│   │   ├── App.test.js           # Unit test definitions
│   │   ├── index.css             # Tailwind CSS directives (@tailwind base/components/utilities)
│   │   ├── index.js              # React DOM render entry point
│   │   └── setupTests.js         # Jest and React Testing Library setup
│   ├── .env                      # Local environment variables
│   ├── .gitignore                # Git untracked pattern definitions
│   ├── package.json              # Project dependencies, scripts, and versions
│   ├── postcss.config.js         # PostCSS configuration for Tailwind
│   └── tailwind.config.js        # Tailwind CSS customizations & themes
└── README.md                     # Root project documentation
```

---

## ⚙️ Getting Started

Follow these steps to run the frontend locally:

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Accessible WordPress REST API endpoint

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>/frontend
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the `frontend` folder:

```env
REACT_APP_WP_API_URL=https://demo.manikhossain.in/wp-json/wp/v2
```

### 4. Install Dependencies

```bash
npm install
```

> **Note:** If you experience peer dependency warnings or conflicts, run:
> ```bash
> npm install --legacy-peer-deps
> ```

### 5. Launch Development Server

```bash
npm start
```

The application will start and open automatically at [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

In the `frontend` directory, you can execute:

| Command | Action |
| :--- | :--- |
| `npm start` | Runs the app in development mode on [http://localhost:3000](http://localhost:3000) with hot-reloading. |
| `npm test` | Launches the interactive test runner. |
| `npm run build` | Compiles a production-ready, minified build to the `build/` directory. |
| `npm run eject` | Copies build configurations and dependencies directly into your project (one-way operation). |

---

## 🔌 API Integration Guide

This frontend connects to the WordPress REST API to ingest content dynamically. Example request to retrieve posts:

```javascript
// Example service call
const API_URL = process.env.REACT_APP_WP_API_URL || 'https://demo.manikhossain.in/wp-json/wp/v2';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts?_embed`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};
```

> **WordPress Setup Tip:** Ensure **CORS** headers are enabled on your WordPress server if you encounter origin policy blocks when querying from localhost.

---

## 🗺️ Project Roadmap

- [x] Decoupled WordPress backend and React frontend connection
- [x] Dynamic REST API post fetching with embedded featured images
- [x] Responsive layout using Tailwind CSS
- [x] Continuous deployment pipeline on Vercel
- [ ] **Phase 2:** Implement React Router for dedicated single-post routes (`/posts/:id` or `/posts/:slug`)
- [ ] **Phase 3:** Integrate WPGraphQL / Apollo Client for query optimization
- [ ] **Phase 4:** Pagination, category filtering, and live search functionality
- [ ] **Phase 5:** Progressive Web App (PWA) offline caching support

---

## 🚀 Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `frontend`.
4. Add the environment variable `REACT_APP_WP_API_URL` with value `https://demo.manikhossain.in/wp-json/wp/v2`.
5. Click **Deploy**.

---

## 👤 Author

- **Live Site:** [headless-wp-nine.vercel.app](https://headless-wp-nine.vercel.app/)
- **Backend Admin:** [demo.manikhossain.in](https://demo.manikhossain.in/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
