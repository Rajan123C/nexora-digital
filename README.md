# Nexora Digital — Premium Digital Agency Website

Nexora Digital is a modern, responsive, high-performance static website for a premium creative digital agency. Built entirely with clean semantic **HTML5**, modern **CSS3**, and modular **vanilla JavaScript** — zero third-party framework dependencies.

---

## 🌟 Features

- **Modern Dark Aesthetic**: Deep navy palette (`#050d1a`), electric-blue accents, ambient glow effects, and high-contrast typography.
- **Glassmorphism Navigation**: Sticky header with dynamic blur, scroll-spy section highlighting via `IntersectionObserver`, and reading progress indicator.
- **Accessible Mobile Drawer**: Smooth slide-in navigation menu with backdrop blur, full keyboard navigation, and focus management.
- **Engaging Hero Section**: Dynamic agency headline, interactive SaaS dashboard mockup with animated chart bars, live counting metrics, and floating badge components.
- **Services Showcase**: 6 tailored agency offerings featuring 3D interactive card tilt effects and custom glowing accent borders.
- **Portfolio Gallery with Category Filtering**: 6 fictional demonstration projects with category filtering (**All**, **Web Dev**, **Design**, **Marketing**) and animated transitions.
- **4-Step Process Section**: Structured workflow (**Discovery → Planning → Development → Delivery**) connected by glowing gradient timeline tracks.
- **Client Testimonials**: Demonstration reviews with star ratings and client roles (clearly labeled as demonstration placeholders).
- **Client-Side Validated Contact Form**: Comprehensive input validation (name, email, subject, message), real-time error clearance, animated loading state, and user-friendly demo submission modal.
- **Performance & Accessibility**: Optimized for Web Vitals, fully responsive across mobile, tablet, and desktop viewports, with support for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic elements, accessible ARIA attributes, search engine optimized metadata.
- **CSS3**: CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, 3D CSS Transforms, Keyframe Animations.
- **JavaScript (ES6+)**: Vanilla JavaScript, `IntersectionObserver` API, event delegation, smooth scrolling, and client-side validation without frameworks.

---

## 📁 Project Structure

```
nexora-digital/
├── .gitignore          # Ignored system and temporary files
├── README.md           # Project documentation and setup guide
├── index.html          # Main HTML document and semantic structure
├── style.css           # Global stylesheet, design system tokens, and responsive layout
├── script.js           # Interactive functionality, animations, and form validation
└── assets/             # Directory for project media and assets
```

---

## 🚀 Local Development

To run the project locally on your machine, clone this repository and use any static file server:

### Option 1: Python HTTP Server (Recommended)
```bash
# In the project root directory
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Node.js `serve` / `npx`
```bash
npx serve .
```

### Option 3: VS Code Live Server Extension
Open the folder in Visual Studio Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## ☁️ Deployment on Vercel

This project is 100% static and ready for instant deployment on [Vercel](https://vercel.com):

1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select **"Import Git Repository"**.
3. Choose the **`nexora-digital`** repository.
4. Leave the default settings (Framework Preset: *Other*, Root Directory: `./`).
5. Click **"Deploy"**.

Your website will be live with an SSL certificate and global CDN in seconds!

---

## 📄 License & Attribution

Designed and developed for demonstration and portfolio presentation purposes. Free to use and customize.
