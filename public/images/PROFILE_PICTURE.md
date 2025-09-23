# Profile Picture Instructions

To add your profile picture:

1. **Add your image**: Place your profile photo as `profile.jpg` (or `profile.png`) in this directory
2. **Update the component**: In `src/components/Hero.tsx`, uncomment the img tag and comment out the KJG placeholder:

```jsx
// Replace the KJG placeholder with:
<img 
  src="/images/profile.jpg" 
  alt="Kim Joshua Gudez" 
  className="w-full h-full object-cover rounded-full" 
/>
```

## Recommended image specs:
- **Size**: 400x400px minimum
- **Format**: JPG or PNG
- **Style**: Professional headshot
- **Quality**: High resolution for crisp display

The circular frame with green border will automatically contain your photo!