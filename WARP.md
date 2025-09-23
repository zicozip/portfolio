# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```powershell
# Start development server (http://localhost:3000)
npm start

# Create production build
npm run build

# Run tests
npm test

# Run tests in watch mode (for single test development)
npm test -- --watch

# Eject from Create React App (irreversible)
npm run eject
```

### Development Workflow
- Use `npm start` for live development with hot reloading
- Test changes locally before building
- Run `npm run build` to verify production build works
- The build outputs to `build/` directory

## Architecture Overview

### Project Structure
This is a **React 18 + TypeScript** portfolio website built with **Create React App** architecture:

- **Single Page Application** with smooth scrolling sections (no routing between pages)
- **Component-based architecture** with reusable, self-contained components
- **Custom hook pattern** for data management (`usePortfolio`)
- **Data-driven content** loaded from JSON configuration
- **Modern animations** using Framer Motion
- **Responsive design** with Tailwind CSS

### Key Architectural Patterns

#### Data Management
- **Central data source**: `public/data/projects.json` contains all portfolio project data
- **Custom hook**: `src/hooks/usePortfolio.ts` provides data access layer with loading states, filtering, and search
- **TypeScript interfaces**: `src/types/portfolio.ts` defines all data structures

#### Component Architecture
- **Layout components**: Header (navigation), Footer
- **Section components**: Hero, About, Skills, Portfolio, Contact (each represents a page section)
- **Feature components**: ProjectModal, ImageGallery (complex interactive features)
- **Atomic design approach**: Self-contained components with props interface

#### State Management
- **Local component state** for UI interactions (modals, galleries, forms)
- **Shared state** through custom hooks rather than global state management
- **Loading and error states** handled consistently across data-fetching components

#### Animation Strategy
- **Framer Motion** for complex animations and transitions
- **CSS animations** for simple effects and performance-critical animations
- **Intersection Observer** for scroll-triggered animations (`react-intersection-observer`)

### Styling Architecture
- **Tailwind CSS** for utility-first styling
- **Custom CSS** in `src/styles/App.css` for complex animations and global styles
- **CSS custom properties** for consistent theming (green color scheme)
- **Responsive design** with mobile-first approach
- **Consistent spacing and typography** through Tailwind's design system

### Performance Considerations
- **Image optimization**: Multiple image support with lazy loading in gallery
- **Animation performance**: Hardware acceleration with `transform3d`
- **Smooth scrolling**: Optimized scroll behavior and prevent scroll restoration
- **Bundle optimization**: Code splitting ready (though not heavily used due to SPA nature)

## Key Features Implementation

### Image Gallery System
The portfolio features a sophisticated image gallery (`ImageGallery.tsx`) that supports:
- **Multiple images per project** with sequential workflow documentation
- **Fullscreen mode** with zoom, pan, and keyboard navigation
- **Thumbnail navigation** for multi-image projects
- **Download functionality** in fullscreen mode
- **Mobile-responsive** touch gestures

### Project Modal System
Complex modal implementation (`ProjectModal.tsx`) with:
- **Body scroll locking** when modal is open
- **Keyboard navigation** (ESC to close, arrows for navigation)
- **Performance optimizations** for smooth scrolling within modal
- **Comprehensive project data display** including metrics, workflow steps, and technologies

### Data Structure
Projects follow a comprehensive schema supporting:
- **Multiple images** with captions and main image designation
- **Rich metadata** including metrics, technologies, workflow steps
- **Categorization** for filtering functionality
- **Integration tracking** for showcasing technical breadth

## Development Guidelines

### Adding New Projects
1. **Update data**: Add project to `public/data/projects.json` following the existing schema
2. **Add images**: Place project images in `public/images/projects/`
3. **Test locally**: Verify project appears correctly in all views (grid, modal, mobile)

### Modifying Components
- **Component isolation**: Each component should be self-contained with clear props interface
- **Animation consistency**: Use existing Framer Motion patterns for new animations
- **Responsive design**: Test all changes on mobile, tablet, and desktop breakpoints
- **Accessibility**: Maintain ARIA labels and keyboard navigation support

### Styling Changes
- **Tailwind first**: Use Tailwind utilities before writing custom CSS
- **CSS custom properties**: Use existing color variables in `src/styles/App.css`
- **Animation performance**: Prefer `transform` and `opacity` for smooth animations
- **Mobile responsiveness**: Always test layout changes on small screens

### Performance Optimization
- **Image optimization**: Ensure images are properly sized (recommended 1200x600px for project images)
- **Animation performance**: Use `will-change` property sparingly and clean up after animations
- **Bundle size**: Monitor build output and avoid unnecessary dependencies

## Customization Focus Areas

### Personal Information
- **Contact email**: `src/components/Contact.tsx` (~line 136)
- **Name/branding**: `src/components/Header.tsx` (~lines 51-52) and `src/components/Footer.tsx`
- **Profile picture**: Replace initials in `src/components/Hero.tsx` (~line 62)

### Content Areas
- **About section**: Personal story in `src/components/About.tsx` (~lines 72-85)
- **Skills section**: Technical skills in `src/components/Skills.tsx` (~lines 11-48)
- **Project data**: Complete project portfolio in `public/data/projects.json`

### Visual Theme
- **Color scheme**: Primary colors in `tailwind.config.js` and `src/styles/App.css`
- **Typography**: Font choices and sizing in CSS custom properties
- **Animations**: Timing and easing adjustments in Framer Motion configurations

## Deployment Considerations
- **Static build**: Project builds to static files suitable for any static hosting
- **Asset paths**: All assets use relative paths compatible with subdirectory deployment
- **Environment**: No environment-specific configurations needed for basic deployment
- **Build verification**: Always run `npm run build` before deployment to catch build issues

## Testing Strategy
- **Component testing**: React Testing Library setup included
- **Visual regression**: Manual testing across breakpoints
- **Performance testing**: Monitor Core Web Vitals and animation performance
- **Accessibility testing**: Verify keyboard navigation and screen reader compatibility