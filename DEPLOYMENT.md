
# Portfolio Website Deployment Guide

This modern portfolio website is built with React, TypeScript, Tailwind CSS, and includes advanced features like Framer Motion animations, Three.js 3D elements, and particle effects.

## Features Included

- ✅ Responsive design for all device sizes
- ✅ Smooth animations with Framer Motion
- ✅ Interactive 3D elements with Three.js
- ✅ Particle background effects
- ✅ Professional About section with 3D avatar
- ✅ Projects showcase with hover effects
- ✅ Animated skills progress bars
- ✅ Featured articles section
- ✅ Certificate gallery with modal views
- ✅ Contact form with social links
- ✅ Downloadable resume functionality
- ✅ Smooth scrolling navigation

## Customization Instructions

### 1. Personal Information
Update the following files with your personal information:

**src/components/portfolio/Hero.tsx**
- Change "John Doe" to your name
- Update the description and call-to-action text
- Replace resume download link and filename

**src/components/portfolio/About.tsx**
- Update the about text and statistics
- Replace the avatar placeholder with your photo

**src/components/portfolio/Contact.tsx & Footer.tsx**
- Update contact information (email, phone, social links)
- Replace placeholder social media URLs

### 2. Projects
Edit **src/components/portfolio/Projects.tsx**:
- Replace project data with your actual projects
- Update images, descriptions, technologies, and links
- Add or remove projects as needed

### 3. Skills
Modify **src/components/portfolio/Skills.tsx**:
- Update skill categories and proficiency levels
- Add or remove skills based on your expertise

### 4. Articles
Update **src/components/portfolio/Articles.tsx**:
- Replace with your actual blog posts or Articles
- Update links to point to your published content

### 5. Certificates
Edit **src/components/portfolio/Certificates.tsx**:
- Add your actual certificates and achievements
- Update images and descriptions

### 6. Resume PDF
- Place your resume PDF file in the `public` folder
- Update the download link in `Hero.tsx` to point to your file

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Prepare your project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Push your code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Deploy with default settings

3. **Custom Domain (Optional):**
   - Go to your project dashboard on Vercel
   - Navigate to Settings > Domains
   - Add your custom domain

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to deploy
   - Or connect your GitHub repository for automatic deployments

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages section
   - Select `gh-pages` branch as source

## Environment Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Local Development
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Performance Optimization Tips

1. **Image Optimization:**
   - Compress images before adding them
   - Use WebP format when possible
   - Consider using a CDN for images

2. **Code Splitting:**
   - The project already implements React.lazy for components
   - Consider splitting large dependencies if needed

3. **SEO Optimization:**
   - Update meta tags in `index.html`
   - Add Open Graph tags for social sharing
   - Include structured data markup

## Browser Support

This portfolio supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues:

1. **Build fails:**
   - Ensure Node.js version is 18 or higher
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **3D elements not rendering:**
   - Check if WebGL is supported in the browser
   - Ensure Three.js dependencies are properly installed

3. **Particles not showing:**
   - Verify tsparticles dependencies are installed
   - Check browser console for any errors

### Performance Issues:
- Reduce particle count in `Hero.tsx` for slower devices
- Optimize images and use appropriate formats
- Consider lazy loading for heavy components

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all dependencies are properly installed
3. Verify Node.js and npm versions meet requirements

## License

This portfolio template is free to use and modify for personal and commercial projects.
