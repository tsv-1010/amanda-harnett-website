# Amanda Harnett - Professional Website

A modern, responsive website for Amanda Harnett, professional beach volleyball player from Canada competing on the AVP, FIVB, and NORCECA tours.

## 🏐 Design Theme

**"Born in the Snow, Lives in the Sand"**

The site features a sophisticated color palette inspired by this theme:
- **Sand colors**: #D4A574 (main), #E8C5A0 (light), #9E7E54 (dark)
- **Blush pink**: #E89B9B (accent), #F2B8B8 (light), #D47676 (dark)

## 📁 Project Structure

```
amanda-harnett-website/
├── index.html          # Main HTML file with semantic markup
├── styles.css          # Complete styling with animations & effects
├── script.js           # Interactive features and smooth scrolling
├── README.md           # This file
└── assets/             # Placeholder for images and media
    ├── hero/           # Hero section images
    ├── gallery/        # Gallery and tournament photos
    ├── about/          # About section images
    └── partners/       # Partner logos
```

## 🎨 Design Features

### Effects (Inspired by reference sites)
- **Smooth scroll effects** - Parallax backgrounds and scroll-triggered animations
- **Gradient overlays** - Sand to blush pink gradients throughout
- **Interactive hover states** - Smooth transitions on all interactive elements
- **Responsive gallery** - Horizontal scrolling gallery with snap points
- **Mobile navigation** - Hamburger menu with smooth transitions
- **Animated sections** - Elements fade in as you scroll

### Sections
1. **Hero** - Eye-catching introduction with tagline
2. **Stats** - Quick facts (Tour, Location, Goal)
3. **Message** - Personal message from Amanda
4. **Gallery** - Horizontal scroll of tournament moments
5. **On Court / Off Court** - Dual-column sections with alternating layout
6. **About** - Career highlights and background
7. **Partners** - Sponsorship grid
8. **Social** - Call-to-action for social media
9. **Footer** - Contact and legal information

## 📱 Responsive Breakpoints

- **Desktop**: Full experience with all features
- **Tablet (1024px)**: Optimized grid layouts
- **Mobile (768px)**: Stacked layouts, hamburger navigation
- **Small Mobile (480px)**: Compact views, single column

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in a modern web browser. No build process required!

### Option 2: Local Development Server
For best experience with smooth scrolling and effects:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## 🖼️ Image Setup

### Required Images
The site includes placeholders for images. Replace them with actual photos:

1. **Hero Image** (id="heroImage")
   - Aspect ratio: 1:1 (square)
   - Recommended: 600x600px or larger
   - Format: WebP or JPG

2. **Gallery Images** (class="gallery-img")
   - Aspect ratio: 16:10 (landscape)
   - Recommended: 800x500px or larger
   - Format: WebP or JPG

3. **Dual Section Images** (class="dual-img")
   - Flexible aspect ratio
   - Recommended: 600x600px or larger
   - Format: WebP or JPG

4. **About Section Image** (class="about-img")
   - Aspect ratio: 3:4 (portrait)
   - Recommended: 600x800px or larger
   - Format: WebP or JPG

### How to Add Images
Replace image paths in `index.html`:
```html
<!-- Change from empty src -->
<img src="" alt="...">

<!-- To your image path -->
<img src="assets/hero/amanda-hero.jpg" alt="Amanda Harnett">
```

## 🎯 Customization Guide

### Colors
Edit the CSS variables in `styles.css` (lines 2-11):
```css
:root {
    --sand: #D4A574;
    --blush: #E89B9B;
    /* ... other colors ... */
}
```

### Content
Update text in `index.html`:
- Hero section (line 51-60)
- Stats cards (line 81-96)
- Message section (line 108-118)
- About section (line 198-222)
- Partner names and links

### Social Links
Update footer social links with actual URLs:
```html
<a href="https://instagram.com/amandaharnett" class="social-link">Instagram</a>
```

## 📧 Contact & Forms

To add a contact form, you'll need a backend service or third-party solution like:
- Formspree
- EmailJS
- Netlify Forms
- Your own backend API

Update the link in the footer:
```html
<a href="mailto:contact@amandaharnett.com">Business Inquiries</a>
```

## 🔗 Links to Update

- Instagram, TikTok, YouTube, Twitter handles
- Partner websites and logos
- Contact email address
- Privacy policy and terms pages

## 💡 Enhancement Ideas

1. **Add high-quality photography** throughout
2. **Create dedicated pages** for tournaments, results, and rankings
3. **Add blog/news section** for updates and insights
4. **Implement dark mode** toggle
5. **Add video highlights** section
6. **Create merchandise shop** integration
7. **Add live tournament calendar** via API
8. **Integrate with social media feeds**

## 🔧 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Internet Explorer: Not supported (modern browsers only)

## 📄 License

© 2026 Amanda Harnett. All rights reserved.

## 🤝 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern layouts, animations, gradients
- **Vanilla JavaScript** - No dependencies, lightweight
- **Responsive Design** - Mobile-first approach

---

**Ready to go live?** 
- Ensure all images are optimized
- Test on multiple devices
- Update all placeholder text and links
- Configure your domain and hosting
