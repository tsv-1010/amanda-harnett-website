# Amanda Harnett Website - Content & Customization Checklist

## 🎯 Before Launch

### Content Updates
- [ ] Replace all placeholder text with Amanda's actual information
- [ ] Add hero image (square, 600x600px+)
- [ ] Add gallery images (5+ photos, 800x500px+)
- [ ] Add dual section images (2 images, 600x600px+)
- [ ] Add about section portrait (3:4 aspect, 600x800px+)
- [ ] Update social media links
- [ ] Update contact email address

### Images & Media
- [ ] Optimize all images (compress for web, use WebP where possible)
- [ ] Create `assets/` folder structure:
  ```
  assets/
  ├── hero/
  │   └── amanda.jpg
  ├── gallery/
  │   ├── tournament-1.jpg
  │   ├── tournament-2.jpg
  │   ├── training-1.jpg
  │   └── training-2.jpg
  ├── about/
  │   └── amanda-portrait.jpg
  └── partners/
      ├── avp-logo.png
      ├── partner-1.png
      └── partner-2.png
  ```

### Navigation & Links
- [ ] Update all internal links to point to correct sections
- [ ] Add external links to tours (AVP, FIVB, NORCECA)
- [ ] Link to social media profiles
- [ ] Add partner links in partners section
- [ ] Set up contact form or email link

### Metadata
- [ ] Update page title and meta description
- [ ] Add Open Graph tags for social sharing
- [ ] Set up favicon (AH logo)
- [ ] Add Google Analytics (if needed)

### Partners & Sponsorships
- [ ] Replace "[Partner Logo]" placeholders with actual logos
- [ ] Add partner website links
- [ ] Update partner descriptions

### Styling Customization
- [ ] Verify sand/blush color palette matches brand
- [ ] Test all hover effects and animations
- [ ] Check responsive design on real devices
- [ ] Ensure proper font loading

## 🚀 Launch Checklist

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on tablet (iPad, Galaxy Tab)
- [ ] Test on mobile (iPhone, Android)
- [ ] Verify all links work correctly
- [ ] Check image loading and optimization
- [ ] Test form submissions (if applicable)
- [ ] Verify cross-browser compatibility
- [ ] Check accessibility (WCAG 2.1 AA)
- [ ] Optimize Core Web Vitals
- [ ] Set up SSL certificate
- [ ] Configure domain name
- [ ] Set up email forwarding
- [ ] Create robots.txt and sitemap.xml
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

## 📱 Performance Tips

### Image Optimization
```bash
# Using ImageMagick
convert input.jpg -quality 80 -strip output.jpg

# Using FFmpeg for WebP
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp
```

### Lazy Loading
Consider adding lazy loading to images:
```html
<img src="image.jpg" alt="description" loading="lazy">
```

### CDN
Consider using a CDN for images and assets:
- Cloudinary
- Imgix
- AWS CloudFront

## 🔐 Security Considerations

- [ ] Update email addresses to actual addresses
- [ ] Use environment variables for sensitive data (if needed)
- [ ] Enable HTTPS/SSL
- [ ] Add security headers
- [ ] Regular backup of content
- [ ] Keep dependencies updated

## 📊 Analytics & Tracking

- [ ] Set up Google Analytics
- [ ] Add conversion tracking
- [ ] Monitor user behavior
- [ ] Track social media clicks
- [ ] Set up heat mapping

## 🎨 Brand Guidelines

### Color Palette
- **Primary Sand**: #D4A574
- **Light Sand**: #E8C5A0
- **Dark Sand**: #9E7E54
- **Blush**: #E89B9B
- **Light Blush**: #F2B8B8
- **Dark Blush**: #D47676

### Typography
- **Headers**: Space Mono, 700 weight
- **Body**: Inter, 300-400 weight

### Spacing
- Use 0.5rem (8px) as base unit
- Follow multiples: 0.5, 1, 1.5, 2, 3, 4, 6 rem

## 📝 Content Templates

### Tournament Results
```
Tournament Name | Location | Date | Result
AVP Series | Los Angeles, CA | Jan 2026 | Finalist
```

### Quote Format
Use italic styling for quotes:
```html
<span class="tagline">"Your quote here"</span>
```

## 🔄 Regular Maintenance

- [ ] Update tournament results monthly
- [ ] Refresh gallery with new photos
- [ ] Update social media feeds
- [ ] Monitor site analytics
- [ ] Check for broken links
- [ ] Update partner information
- [ ] Security patches and updates

---

**Color Palette Testing:**
- Sand: Used for primary accents, borders, section dividers
- Blush: Used for secondary accents, hover states
- White/Black: Text and backgrounds for contrast

**Font Pairing:**
- Space Mono (monospace) for headers - bold, modern
- Inter (sans-serif) for body - clean, readable

