# Jericho Tupaz - Portfolio Website

A modern, responsive personal portfolio website built with React, Vite, and TailwindCSS. Features a dark UI with violet accents, smooth animations, and a professional design showcasing software development and OSINT expertise.

## 🚀 Features

- **Modern Design**: Dark theme with violet/purple gradients and subtle glows
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Components**: Hover effects, smooth scrolling, and form validation
- **Professional Sections**: Hero, About, Experience, Skills, Projects, Certifications, and Contact
- **Accessibility**: Proper focus states and accessible contrast ratios

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS, Autoprefixer

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── assets/
│       └── Resume_Tupaz_Jericho.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Violet (violet-400 to violet-800)
- **Background**: Dark slate (dark-800 to dark-900)
- **Text**: White and gray variations
- **Accents**: Purple, blue, green, red for different categories

### Typography
- **Headings**: Bold, large text with gradient effects
- **Body**: Clean, readable text with proper line height
- **Font**: System fonts with fallbacks

### Components
- **Cards**: Rounded corners with subtle borders and hover effects
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with validation states
- **Navigation**: Sticky navbar with smooth scrolling

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Updating Personal Information
Edit the following files to update personal information:

1. **Hero Section**: `src/components/Hero.jsx`
2. **About Section**: `src/components/About.jsx`
3. **Experience**: `src/components/Experience.jsx`
4. **Skills**: `src/components/Skills.jsx`
5. **Projects**: `src/components/Projects.jsx`
6. **Certifications**: `src/components/Certifications.jsx`
7. **Contact**: `src/components/Contact.jsx`

### Styling Customization
- **Colors**: Modify `tailwind.config.js` for color changes
- **Animations**: Update `src/index.css` for custom animations
- **Layout**: Adjust component classes for layout changes

## 📄 Sections Overview

### Hero Section
- Animated background with floating elements
- Name, title, and tagline
- Call-to-action buttons (View Projects, Download Resume)

### About Section
- Professional bio
- Contact information with icons
- Profile photo placeholder

### Experience Section
- Timeline layout for work experience and education
- Detailed descriptions and responsibilities
- Visual timeline with icons

### Skills Section
- Categorized skills with color-coded badges
- Programming, Data, IT Support, OS, and Cybersecurity categories
- Interactive skill chips

### Projects Section
- Project cards with descriptions and tech stacks
- Live demo and source code links
- Category badges for easy identification

### Certifications Section
- Grid layout for certifications and training
- Issuer information and years
- Category-based color coding

### Contact Section
- Contact form with client-side validation
- Contact information display
- Success message handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### GitHub Pages
1. Add `"homepage": "https://username.github.io/repo-name"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to package.json
4. Run `npm run deploy`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: jerichoescorial16@gmail.com
- **Phone**: 0921405****
- **Location**: Quezon City

---

Built with ❤️ by Strwbrrybluu
