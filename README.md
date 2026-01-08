# John Carlo A. Catilo - Portfolio 2026

A modern, interactive portfolio website built with React, Three.js, and Framer Motion. Features stunning 3D animations, smooth transitions, and a fully responsive design.

## 🚀 Features

- **3D Visualizations**: Interactive Three.js scenes with animated spheres and particles
- **Smooth Animations**: Framer Motion powered transitions and scroll animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Beautiful gradient themes and intuitive navigation
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Vite** - Build tool and dev server

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jccatilo/jc-portfolio-2026.git
cd jc-portfolio-2026
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder. You can preview it with:

```bash
npm run preview
```

## 📁 Project Structure

```
jc-portfolio-2026/
├── src/
│   ├── components/
│   │   ├── About.jsx          # About section
│   │   ├── Contact.jsx        # Contact section
│   │   ├── Education.jsx      # Education & certifications
│   │   ├── Experience.jsx     # Professional experience timeline
│   │   ├── Hero.jsx           # Hero section with 3D scene
│   │   ├── LoadingScreen.jsx  # Loading screen component
│   │   ├── Navigation.jsx     # Navigation bar
│   │   ├── Projects.jsx       # Featured projects
│   │   └── Skills.jsx         # Skills showcase
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                  # This file
```

## 🎨 Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: #00d4ff;
  --secondary: #7b2ff7;
  --dark: #0a0a0a;
  --dark-gray: #1a1a1a;
  --light-gray: #2a2a2a;
  --text: #ffffff;
  --text-muted: #b0b0b0;
}
```

### Content

Update the content in each component file:
- `src/components/Hero.jsx` - Hero section content
- `src/components/About.jsx` - About section
- `src/components/Experience.jsx` - Professional experience
- `src/components/Education.jsx` - Education and certifications
- `src/components/Skills.jsx` - Skills and expertise
- `src/components/Projects.jsx` - Featured projects
- `src/components/Contact.jsx` - Contact information

## 🌐 Deployment

### Deploy to GitHub Pages (Recommended)

**Using GitHub Actions (Automatic):**

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/jc-portfolio-2026.git
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. Update base path (if needed):
   - If your repository name is different, update `base` in `vite.config.js`
   - For user pages (`username.github.io`), set `base: '/'`

4. Push changes - GitHub Actions will automatically deploy!

**Using gh-pages (Manual):**
```bash
npm run deploy
```

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://netlify.com)
3. Or connect your GitHub repository for automatic deployments

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**John Carlo A. Catilo**
- Email: catilo.johncarlo07@gmail.com
- GitHub: [@jccatilo](https://github.com/jccatilo)
- Portfolio: [jccatilo.github.io](https://jccatilo.github.io)

---

Built with ❤️ using React, Three.js, and modern web technologies.
