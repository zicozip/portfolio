# KJGudez - n8n Automation Specialist Portfolio

A modern, responsive React portfolio website showcasing n8n automation expertise, built with TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and modern hooks
- **Smooth Animations**: Powered by Framer Motion for fluid, professional animations
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Real Project Showcase**: 6 detailed automation projects based on actual n8n workflows
- **Interactive Components**: Dynamic project filtering, modal details, and contact form
- **Performance Optimized**: Code splitting, lazy loading, and optimized builds
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Static site ready

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section with typing animation
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills showcase
│   ├── Portfolio.tsx   # Project portfolio
│   ├── ProjectModal.tsx# Project detail modal
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Site footer
├── hooks/              # Custom React hooks
│   └── usePortfolio.ts # Portfolio data management
├── types/              # TypeScript type definitions
│   └── portfolio.ts    # Portfolio interfaces
├── styles/             # CSS and styling
│   └── App.css        # Main styles with Tailwind
└── data/               # Project data
public/
└── data/
    └── projects.json   # Portfolio project data
```

## 🎨 Key Components

### Hero Section
- Dynamic typing animation
- Responsive gradient background
- Call-to-action buttons
- Performance metrics display

### Portfolio Showcase
- 6 real n8n automation projects
- Category-based filtering
- Interactive project cards
- Detailed modal views
- Workflow step visualization

### Skills Section
- n8n expertise breakdown
- 30+ integration showcases
- Animated skill bars
- Achievement metrics

### Contact Form
- Real-time validation
- Accessible form design
- Success/error feedback
- Professional contact information

## 📊 Portfolio Projects

1. **Intelligent Lead Management System** - Gmail + Asana + Google Drive automation
2. **Automated Financial Reporting** - Asana + Xero integration
3. **AI-Powered Email Attachment Processing** - Gmail + AI document analysis
4. **Universal Document Intelligence System** - Multi-format document processing
5. **Smart Inventory Management Integration** - Real-time inventory monitoring
6. **AI-Powered Lead Enrichment Pipeline** - Multi-source data aggregation

## ⚡ Quick Customization Checklist

**Before deploying, update these essential items:**

- [ ] **Email**: Change `kim.joshua.gudez@email.com` in `src/components/Contact.tsx`
- [ ] **Name**: Update "KJ" and "Gudez" in `src/components/Header.tsx` 
- [ ] **Profile Picture**: Add `profile.jpg` to `public/images/` and update `src/components/Hero.tsx`
- [ ] **Projects**: Edit your projects in `public/data/projects.json`
- [ ] **Project Images**: Add multiple n8n workflow screenshots to `public/images/projects/` (now supports image galleries with thumbnails and fullscreen viewing)
- [ ] **About Story**: Update your background in `src/components/About.tsx`
- [ ] **Skills**: Modify your expertise in `src/components/Skills.tsx`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd kim-portfolio

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts

- `npm start` - Runs development server at http://localhost:3000
- `npm run build` - Creates production build
- `npm test` - Runs test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## 🎯 Customization Guide

### 📧 Personal Information
**Email Address**: Update your contact email in:
- `src/components/Contact.tsx` - Line ~136: Change `kim.joshua.gudez@email.com`
- `src/components/Footer.tsx` - For footer contact info (if added)

**Name & Branding**: Update your name in:
- `src/components/Header.tsx` - Line ~51-52: Change "KJ" and "Gudez"
- `src/components/Footer.tsx` - Line ~32-34: Update footer name
- `src/components/Hero.tsx` - Line ~62: Update profile initials "KJG"

### 🖼️ Profile Picture
**Replace Placeholder**:
1. Add your photo as `profile.jpg` in `public/images/`
2. In `src/components/Hero.tsx` around line ~62-63:
   ```jsx
   // Replace this line:
   <span className="text-3xl md:text-4xl font-bold text-green-400">KJG</span>
   
   // With this:
   <img 
     src="/images/profile.jpg" 
     alt="Your Name" 
     className="w-full h-full object-cover rounded-full" 
   />
   ```

### 📊 Projects
**Add/Edit Projects**: Update `public/data/projects.json`
- Add new projects following the existing schema
- Update metrics, descriptions, technologies
- Change project categories and highlights

### 🖼️ Project Images & n8n Workflow Screenshots
**New Feature**: Each project now supports **multiple images** with an interactive gallery, thumbnails, and fullscreen viewing!

**To Add Your n8n Workflow Screenshots**:

1. **Prepare Your Images**:
   - Take screenshots of your n8n workflows (multiple per project)
   - Recommended size: 1200x600px or larger for best quality
   - Save as `.png` or `.jpg` format
   - Name them descriptively (e.g., `lead-management-overview.png`, `lead-management-nodes.png`)

2. **Add Multiple Images to Each Project**:
   - Create folder: `public/images/projects/`
   - Place your workflow screenshots there
   - Update each project in `public/data/projects.json` to include multiple images:
   ```json
   {
     "id": 1,
     "title": "Your Project",
     "images": [
       {
         "url": "/images/projects/your-workflow-overview.png",
         "altText": "Workflow overview",
         "caption": "Complete workflow showing all major steps",
         "isMain": true
       },
       {
         "url": "/images/projects/your-workflow-nodes.png",
         "altText": "Node configuration details",
         "caption": "Detailed node configuration and settings"
       },
       {
         "url": "/images/projects/your-workflow-execution.png",
         "altText": "Execution results",
         "caption": "Sample execution results and data flow"
       }
     ],
     "description": "..."
   }
   ```

3. **Image Gallery Features**:
   - **Navigation**: Arrow keys and click navigation between images
   - **Thumbnails**: When multiple images exist, thumbnails appear below main image
   - **Fullscreen**: Click any image to open in fullscreen overlay
   - **Captions**: Each image can have descriptive captions
   - **Keyboard Support**: Arrow keys for navigation, ESC to close
   - **Download**: Download button in fullscreen mode
   - **Auto-play**: Optional slideshow mode (disabled by default)

4. **Image Schema**:
   Each image in the `images` array supports:
   ```typescript
   {
     url: string;          // Path to image file
     altText: string;      // Accessibility alt text
     caption?: string;     // Optional caption shown on image
     isMain?: boolean;     // Mark as primary/thumbnail image
   }
   ```

5. **Best Practices for Multiple n8n Screenshots**:
   - **Overview Shot**: Wide view showing entire workflow (mark as `isMain: true`)
   - **Node Details**: Close-ups of important node configurations
   - **Execution Results**: Screenshots showing successful runs and data
   - **Integration Points**: Focus on API connections and data transformations
   - **Error Handling**: Show error handling and retry mechanisms
   - **Performance**: Include execution time and performance metrics when relevant

**Pro Tips for n8n Screenshots**:
- Use n8n's "Fit to View" option before taking screenshots
- Include key nodes and connections in the shot
- Consider showing both the workflow and execution data
- For complex workflows, break them into logical sections
- Use consistent zoom levels for better gallery experience
- Add meaningful captions to help viewers understand each step

### 🎨 Styling & Theme
**Colors**: Update `tailwind.config.js` or `src/styles/App.css`
**Components**: Modify individual component files in `src/components/`
**Animations**: Customize Framer Motion animations in components

### 📝 Content Sections
**About Section**: Edit `src/components/About.tsx`
- Update personal story (~line 72-85)
- Change feature descriptions (~line 28-47)

**Skills Section**: Edit `src/components/Skills.tsx`
- Update skill categories (~line 11-48)
- Change n8n nodes list (~line 50-56)
- Modify achievements (~line 147-162)

**Contact Info**: Edit `src/components/Contact.tsx`
- Update contact details (~line 130-158)
- Change "What to Expect" list (~line 163-168)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag & drop the `build` folder
- **Vercel**: Connect GitHub repo for auto-deployment
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build files to S3 bucket

## 🔧 Performance Features

- Code splitting and lazy loading
- Optimized images and assets
- Efficient re-renders with React.memo
- Smooth 60fps animations
- Accessible and semantic HTML

## 📱 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kim Joshua Gudez** - n8n Automation Specialist

- Doctor of Dental Medicine turned automation specialist
- Specializing in workflow optimization and business process automation through AI-driven insights
- Expert in n8n, JavaScript, and API integrations
- Passionate about transforming business processes with intelligent automation

---

*Built with ❤️ using React, TypeScript, and modern web technologies*
