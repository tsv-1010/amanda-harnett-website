# 🚀 Amanda Harnett Website - Quick Start Guide

## What You've Created

A modern, professional website for Amanda Harnett featuring:
- **Responsive design** that works on all devices
- **Sand & blush pink color scheme** ("Born in the snow, lives in the sand")
- **Smooth animations and effects** inspired by top athlete websites
- **Multiple sections** showcasing career, achievements, and personality
- **No dependencies** - runs in any modern browser

## 📂 File Structure

```
amanda-harnett-website/
├── index.html                 ← Main website
├── styles.css                 ← All styling & animations
├── script.js                  ← Interactive features
├── README.md                  ← Full documentation
├── CUSTOMIZATION.md           ← Content checklist
├── HEAD_TAGS_REFERENCE.html   ← SEO & meta tags
├── config.json                ← Site configuration
├── assets/
│   ├── PLACEHOLDER_GUIDE.html ← Image requirements
│   └── placeholders/          ← Create image folders here
│       ├── hero/
│       ├── gallery/
│       ├── about/
│       └── partners/
└── QUICK_START.md            ← This file
```

## ✅ Getting Started (5 Minutes)

### Step 1: View the Website
1. Open `index.html` in any web browser
2. You'll see the full website with placeholder images
3. All functionality works immediately

### Step 2: Understand the Layout
The website has these main sections:
- **Hero** - Big introduction with tagline
- **Stats** - Quick facts about Amanda
- **Message** - Personal message section
- **Gallery** - Horizontal scrolling photos
- **On Court / Off Court** - Split sections with alternating layouts
- **About** - Career details and highlights
- **Partners** - Sponsor grid
- **Social** - Social media links
- **Footer** - Contact info

### Step 3: Plan Your Customizations
Using `CUSTOMIZATION.md` as your guide:
1. Gather photos (see `assets/PLACEHOLDER_GUIDE.html`)
2. Update social media handles
3. Update partner information
4. Customize content text

## 🎨 Customization Examples

### Change a Color
**In `styles.css` (line 8):**
```css
--blush: #E89B9B;  /* Change this hex code */
```

### Update Text
**In `index.html` (line 57):**
```html
<p class="hero-subtitle">
    Professional Beach Volleyball Player  ← Change this
</p>
```

### Add Social Links
**In `index.html` (line 388):**
```html
<a href="https://instagram.com/amandaharnett" class="social-link">Instagram</a>
```

### Add Images
**Create folders first:**
```
assets/
├── hero/
│   └── amanda.jpg
├── gallery/
│   ├── photo1.jpg
│   └── photo2.jpg
```

**Then update HTML:**
```html
<img src="assets/hero/amanda.jpg" alt="Amanda Harnett">
```

## 🖼️ Image Quick Reference

| Section | Aspect Ratio | Size | Count | Location |
|---------|-------------|------|-------|----------|
| Hero | 1:1 (Square) | 600x600px+ | 1 | `assets/hero/` |
| Gallery | 16:10 | 800x500px+ | 5+ | `assets/gallery/` |
| Dual | 1:1 (Square) | 600x600px+ | 2 | `assets/about/` |
| About | 3:4 (Portrait) | 600x800px+ | 1 | `assets/about/` |
| Partners | 1:1 (Square) | 300x300px+ | 4+ | `assets/partners/` |

**Open `assets/PLACEHOLDER_GUIDE.html` for detailed image requirements.**

## 🎯 Deployment Options

### Option 1: Netlify (Easiest - Free)
1. Go to https://netlify.com
2. Drag & drop your folder
3. Done! You have a live website

### Option 2: GitHub Pages (Free)
1. Create GitHub account
2. Create repository named `amanda-harnett-website`
3. Push files to GitHub
4. Enable Pages in settings

### Option 3: Your Own Host
1. Purchase domain
2. Get hosting (any HTML hosting works)
3. Upload files via FTP/SFTP
4. Point domain to hosting

### Option 4: Local Server
For development/testing:
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

## 🔧 Browser Support

✅ Modern browsers (Chrome, Firefox, Safari, Edge)
✅ Mobile browsers (iOS Safari, Chrome Android)
❌ Internet Explorer (won't work, but that's okay in 2026!)

## 💡 Pro Tips

1. **Optimize Images First**
   - Use https://tinypng.com to compress
   - Use WebP format for modern browsers
   - Keep file sizes under 200KB

2. **Test Everything**
   - Check on phone and tablet
   - Test all links work
   - Verify email links are correct

3. **SEO**
   - Add meta tags from `HEAD_TAGS_REFERENCE.html`
   - Set up Google Search Console
   - Submit sitemap to Google

4. **Performance**
   - Images are most important
   - Use a CDN if you have budget
   - Monitor Core Web Vitals

## 📱 Mobile Experience

The website is fully responsive:
- **Desktop (1024px+)** - Full featured experience
- **Tablet (768-1024px)** - Optimized grid layouts  
- **Mobile (<768px)** - Hamburger menu, stacked layouts

All features work perfectly on phones!

## 🎬 Animation Effects

The site includes these smooth effects:
- ✨ Fade-in animations as you scroll
- 🎨 Gradient backgrounds that shift
- 🖱️ Hover effects on links and buttons
- 📜 Smooth scroll interactions
- 📱 Mobile menu transitions

All effects are CSS-based (no jQuery needed).

## 📝 Content Checklist

Before launching, make sure to:
- [ ] Add all images
- [ ] Update all text content
- [ ] Add social media links
- [ ] Add partner information
- [ ] Update contact email
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Optimize images
- [ ] Set up domain

## 🆘 Troubleshooting

**Images not showing?**
- Check file path is correct
- Make sure image files exist in `assets/` folder
- Use forward slashes in paths: `assets/hero/image.jpg`

**Styles look wrong?**
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure `styles.css` is in same folder as `index.html`

**Scripts not working?**
- Make sure `script.js` is in same folder
- Check browser console for errors (F12)

**Mobile menu not showing?**
- Hamburger should appear when browser width < 768px
- On desktop, regular navigation menu shows

## 📞 Getting Help

**For HTML/CSS questions:** See `README.md`
**For customization:** See `CUSTOMIZATION.md`
**For image requirements:** Open `assets/PLACEHOLDER_GUIDE.html` in browser
**For SEO/Meta tags:** See `HEAD_TAGS_REFERENCE.html`

## 🎉 Next Steps

1. **This Week:**
   - Gather photos (5-10 high quality images)
   - Update all text content
   - Add social media handles

2. **Next Week:**
   - Add images to folders
   - Test on all devices
   - Deploy to free hosting

3. **After Launch:**
   - Monitor analytics
   - Update with tournament results
   - Share on social media

## ✨ Your Color Palette

Every color has been carefully chosen to match the "Born in the Snow, Lives in the Sand" theme:

```
Primary Sand:  #D4A574  (Warm, earthy)
Light Sand:    #E8C5A0  (Soft, inviting)
Dark Sand:     #9E7E54  (Deep, professional)
Blush Pink:    #E89B9B  (Warm, welcoming)
Light Blush:   #F2B8B8  (Soft, elegant)
Dark Blush:    #D47676  (Deep, strong)
```

These colors evoke:
- 🏜️ Warm desert sand
- 🌅 Golden sunsets
- 🏐 Beach volleyball energy
- ❄️ Cool, professional tone

## 🚀 Launch Confidence Checklist

- [x] Site is fully functional
- [x] Works on all devices
- [x] No external dependencies
- [x] Professional design
- [x] Fast and optimized
- [x] Easy to customize
- [x] Well documented
- [x] Ready to deploy

**You're ready to launch! 🎉**

---

**Questions?** Check the documentation files or read the inline comments in the code.

**Want to make changes?** Use `CUSTOMIZATION.md` as your guide.

**Need images?** Open `assets/PLACEHOLDER_GUIDE.html` for requirements.

**Good luck, Amanda!** 🏐⭐
