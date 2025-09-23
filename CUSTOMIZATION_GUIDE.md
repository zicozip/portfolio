# 🛠️ Quick Customization Guide

## ⚡ Essential Changes (Before Deployment)

### 📧 **Update Your Email**
**File**: `src/components/Contact.tsx`
**Line**: ~136
```jsx
// Find and change:
<p className="text-gray-300">kim.joshua.gudez@email.com</p>
// To your email:
<p className="text-gray-300">your.email@domain.com</p>
```

### 🏷️ **Update Your Name/Brand**
**File**: `src/components/Header.tsx`
**Lines**: ~51-52
```jsx
// Change:
<span className="text-white">KJ</span>
<span className="text-green-400">Gudez</span>
// To your initials/name:
<span className="text-white">YI</span>
<span className="text-green-400">Name</span>
```

### 🖼️ **Add Your Profile Picture**
1. **Add your photo**: Save as `profile.jpg` in `public/images/`
2. **Update component**: `src/components/Hero.tsx` ~line 62
```jsx
// Replace this:
<span className="text-3xl md:text-4xl font-bold text-green-400">KJG</span>

// With this:
<img 
  src="/images/profile.jpg" 
  alt="Your Name" 
  className="w-full h-full object-cover rounded-full" 
/>
```

## 📝 Content Updates

### 🏢 **Update Your Projects**
**File**: `public/data/projects.json`
- Replace the 6 example projects with your own
- Update metrics, technologies, descriptions
- Keep the same JSON structure

### 👤 **Update About Section**
**File**: `src/components/About.tsx`
**Lines**: ~72-85
- Replace the dental/automation story with your background
- Update the journey description with your experience

### 💪 **Update Skills**
**File**: `src/components/Skills.tsx`
- **Lines ~11-48**: Update skill categories and levels  
- **Lines ~50-56**: Replace n8n nodes with your expertise
- **Lines ~147-162**: Update achievement numbers

### 📞 **Footer Contact Info**
**File**: `src/components/Footer.tsx`
**Lines**: ~32-34
```jsx
// Update footer name:
<span className="text-white">YI</span>
<span className="text-green-400">Name</span>
```

## 🎨 Visual Customization

### 🎨 **Change Colors**
**File**: `tailwind.config.js`
- Update the green theme colors
- Modify primary color palette

### 🖋️ **Update Typography**
**File**: `src/styles/App.css`
- Change fonts, sizes, spacing
- Modify CSS custom properties

## 📊 Quick Test

After customization:
1. Run `npm start` to test locally
2. Check all sections display your info correctly
3. Test the contact form
4. Verify profile picture shows properly
5. Run `npm run build` for production

## 🚀 Ready to Deploy!

Once you've updated these key items, your portfolio will be personalized and ready to showcase your work!