# 🚀 Headless WordPress React Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/WordPress-REST%20API-21759B?logo=wordpress&logoColor=white" alt="WordPress">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer%20Motion-13.2-FF0055?logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Platform-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel">
</p>

> A modern, high-performance **decoupled front-end application** built with **React 19** and styled using **Tailwind CSS**, consuming WordPress purely as a **Headless CMS** via the **WordPress REST API**.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| ⚡ **Decoupled Architecture** | WordPress handles content management; React delivers an interactive SPA |
| 🎨 **Utility-First Styling** | Powered by Tailwind CSS with responsive design |
| 📡 **REST API Integration** | Dynamic fetching for posts, media, categories, and custom fields |
| 🌙 **Dark/Light Mode** | User-toggleable theme with localStorage persistence |
| 🎭 **Smooth Animations** | Framer Motion for fluid page transitions and interactions |
| 🖱️ **Custom Cursor** | Interactive cursor with hover states for enhanced UX |
| 📱 **Fully Responsive** | Mobile-first design that scales beautifully |
| 🔍 **SEO Friendly** | Dynamic content rendering with proper meta tags |

### Pages Included

- 🏠 **Home** - Hero section, testimonials carousel, team showcase, case studies
- 📝 **Blog** - WordPress posts with featured images and categories
- 📖 **Single Post** - Full article view with related content
- 📁 **Case Studies** - Portfolio of client work
- 👥 **About** - Company information and team
- 📧 **Contact** - Contact form and information
- ❌ **404 Not Found** - Custom error page

### Technical Highlights

- **React 19** with hooks and functional components
- **React Router v7** for client-side routing with scroll-to-top
- **Axios** for HTTP requests with interceptors
- **Framer Motion** for production-ready animations
- **Custom scroll animations** and parallax effects
- **Marquee carousel** with tech stack logos
- **Team member carousel** with social links

---

## 🌐 Live Demo

| Service | Link |
|:--------|:-----|
| **Production Frontend** | [https://headless-wp-nine.vercel.app/](https://headless-wp-nine.vercel.app/) |
| **WordPress Backend** | [https://demo.manikhossain.in/](https://demo.manikhossain.in/) |
| **REST API Base URL** | `https://demo.manikhossain.in/wp-json/wp/v2/` |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React SPA)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │   Header    │  │    Footer    │  │    Page Components     │  │
│  │  (Navbar)   │  │              │  │  - Home               │  │
│  └─────────────┘  └──────────────┘  │  - Blog               │  │
│                                      │  - Case Studies       │  │
│  ┌──────────────────────────────────┐│  - About             │  │
│  │         Shared Components        ││  - Contact           │  │
│  │  - TeamCarousel                 ││  - 404               │  │
│  │  - GlobalCTA                    │└────────────────────────┘  │
│  │  - RecentPosts                  │                             │
│  └──────────────────────────────────┘                             │
├─────────────────────────────────────────────────────────────────┤
│                      React Router v7                            │
│                    (Client-Side Routing)                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVER (WordPress CMS)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌─────────────────┐  ┌───────────────┐  │
│  │   REST API       │  │   Media Library │  │   Database    │  │
│  │   /wp-json/wp/v2 │  │   (Images/Vids) │  │   (Posts/Meta)│  │
│  └──────────────────┘  └─────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI library |
| React DOM | 19.2 | DOM rendering |
| React Router | 7.18 | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first CSS |
| Framer Motion | 13.2 | Animations |
| Axios | 1.20 | HTTP client |
| PostCSS | 8.5 | CSS processing |
| Autoprefixer | 10.5 | Vendor prefixes |

### Backend (Headless CMS)

| Technology | Purpose |
|------------|---------|
| WordPress | Content Management System |
| WordPress REST API | Data API |
| PHP 8+ | Server-side processing |
| MySQL/MariaDB | Database |

### Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Custom VPS |

---

## 📁 Project Structure

```text
headless-wp/
├── frontend/                          # React Single-Page Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header/           # Navigation header
│   │   │   │   └── Footer/          # Site footer
│   │   │   ├── pages/
│   │   │   │   ├── Home/           # Homepage
│   │   │   │   ├── About/          # About page
│   │   │   │   ├── Contact/        # Contact page
│   │   │   │   ├── Posts/          # Blog listing
│   │   │   │   ├── SinglePost/     # Single post view
│   │   │   │   ├── CaseStudies/    # Portfolio listing
│   │   │   │   ├── SingleCaseStudy/# Portfolio detail
│   │   │   │   └── NotFound/       # 404 page
│   │   │   ├── sections/
│   │   │   │   ├── RecentPosts/    # Latest posts section
│   │   │   │   ├── TeamCarousel/  # Team showcase
│   │   │   │   ├── CaseStudies/   # Case studies section
│   │   │   │   └── GlobalCTA/    # Call-to-action
│   │   │   └── shared/            # Reusable components
│   │   ├── services/              # API handlers
│   │   ├── App.js                # Root component + routing
│   │   ├── App.test.js           # Unit tests
│   │   ├── index.css             # Tailwind directives
│   │   ├── index.js              # Entry point
│   │   └── setupTests.js         # Test configuration
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── package.json              # Dependencies
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── README.md                 # Frontend documentation
├── server/                        # WordPress backend (optional)
│   ├── wp-admin/
│   ├── wp-content/
│   ├── wp-includes/
│   └── wp-config.php
├── deploy/                        # Deployment scripts
│   └── database-posts.sql
├── .gitignore
├── LICENSE                        # MIT License
└── README.md                      # This file
```

---

## ⚙️ Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18.x or later |
| npm | 9.x or later |

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/headless-wp.git
cd headless-wp/frontend
```

#### 2. Install Dependencies

```bash
npm install
```

> **Note:** If you encounter peer dependency warnings, use:
> ```bash
> npm install --legacy-peer-deps
> ```

#### 3. Configure Environment Variables

Create a `.env` file in the `frontend` root:

```env
# WordPress REST API Configuration
REACT_APP_API_ROOT=https://demo.manikhossain.in/wp-json/wp/v2
REACT_APP_WP_API_URL=https://demo.manikhossain.in/wp-json/wp/v2

# Custom API Endpoints (if available)
REACT_APP_CUSTOM_API_ROOT=https://demo.manikhossain.in/wp-json/custom/v1
```

#### 4. Start Development Server

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

| Command | Description |
|:--------|:------------|
| `npm start` | Development server with hot-reload |
| `npm run build` | Production build to `build/` |
| `npm test` | Interactive test runner |
| `npm run eject` | Copy build configs (irreversible) |

---

## 🔌 API Integration

### WordPress REST API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/posts` | Fetch all posts |
| `/posts/{id}` | Fetch single post |
| `/posts?slug={slug}` | Fetch post by slug |
| `/categories` | Fetch all categories |
| `/tags` | Fetch all tags |
| `/media/{id}` | Fetch media/attachments |
| `/pages` | Fetch all pages |
| `/users/{id}` | Fetch user data |

### Example API Calls

```javascript
// Fetch posts with embedded media
const response = await axios.get(`${API_ROOT}/posts?_embed&per_page=10`);

// Fetch single post by slug
const response = await axios.get(`${API_ROOT}/posts?slug=${slug}&_embed`);

// Fetch categories
const response = await axios.get(`${API_ROOT}/categories?per_page=20`);
```

---

## 🎨 Customization

### Theme Configuration

Edit `tailwind.config.js` to customize colors, fonts, and spacing:

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f97316',  // Orange
        secondary: '#3b82f6', // Blue
      },
    },
  },
  plugins: [],
}
```

### Adding New Pages

1. Create a new component in `src/components/pages/`
2. Add the route in `src/App.js`:

```jsx
<Route path="/new-page" element={<NewPage isDark={isDark} />} />
```

### Connecting to Your WordPress

1. Update `.env` with your WordPress URL
2. Ensure CORS is enabled on your WordPress server
3. Install required plugins:
   - [REST API CORS](https://wordpress.org/plugins/wp-cors/)
   - [WP REST API Cache](https://wordpress.org/plugins/wp-rest-api-cache/)

---

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Push to GitHub
2. Import repository to [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `REACT_APP_API_ROOT` = `https://your-wordpress-site.com/wp-json/wp/v2`
5. Deploy!

### Deploy Backend to VPS

```bash
# Using WordOps or similar
wo site create yourdomain.com --wpfc
```

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

The project uses:
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **user-event** - User interaction simulation

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Cumulative Layout Shift | < 0.1 |

---

## 🗺️ Roadmap

### Completed ✅

- [x] Decoupled WordPress backend and React frontend
- [x] Dynamic REST API post fetching
- [x] Embedded featured images
- [x] Responsive Tailwind CSS layout
- [x] Dark/Light theme toggle
- [x] Smooth page transitions
- [x] Team member carousel
- [x] Testimonials carousel
- [x] Case studies section
- [x] Contact form
- [x] Custom 404 page
- [x] Vercel deployment

### Upcoming 🚧

- [ ] **Phase 2:** Advanced single-post routes with related posts
- [ ] **Phase 3:** WPGraphQL integration with Apollo Client
- [ ] **Phase 4:** Category/tag filtering and live search
- [ ] **Phase 5:** Progressive Web App (PWA) support
- [ ] **Phase 6:** Advanced caching with SWR/React Query
- [ ] **Phase 7:** Internationalization (i18n) support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React Team](https://react.dev/) - For the amazing UI library
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS
- [Framer](https://www.framer.com/) - For smooth animations
- [WordPress](https://wordpress.org/) - For the headless CMS
- [Vercel](https://vercel.com/) - For hosting

---

## 👤 Author

| | |
|:--|:--|
| **Name** | Manik Hossain |
| **Frontend** | [headless-wp-nine.vercel.app](https://headless-wp-nine.vercel.app/) |
| **Backend** | [demo.manikhossain.in](https://demo.manikhossain.in/) |

---

<p align="center">
  <strong>Star ⭐ this repo if you find it helpful!</strong>
</p>
