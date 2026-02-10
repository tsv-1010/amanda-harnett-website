# 🚀 Deployment Guide for Amanda's Website

## How to Get Your Site Online

Choose one of these methods based on your needs and budget:

---

## 🆓 Option 1: Netlify (EASIEST - FREE)

**Best for:** Quick, easy deployment with custom domain support

### Steps:
1. **Create Account**
   - Go to https://netlify.com
   - Click "Sign up"
   - Use Google or GitHub account

2. **Deploy**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your entire `amanda-harnett-website` folder
   - Wait ~30 seconds

3. **Get Free Domain**
   - You'll get a free URL like `amanda-harnett.netlify.app`
   - Can connect custom domain later

4. **Custom Domain** (Optional)
   - Buy domain from GoDaddy, Namecheap, or Google Domains
   - Go to Site settings → Domain management
   - Follow Netlify's DNS setup instructions

**Cost:** Free tier available, $19+/month for custom domain email

---

## 🆓 Option 2: GitHub Pages (FREE)

**Best for:** Developers who use GitHub

### Steps:
1. **Create Repository**
   - Go to https://github.com
   - Create new repository named `amandaharnett.github.io`
   - Make it public

2. **Upload Files**
   ```bash
   cd amanda-harnett-website
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/amandaharnett.github.io.git
   git push -u origin main
   ```

3. **Enable Pages**
   - Go to repository Settings
   - Scroll to "Pages"
   - Select branch "main"
   - Save

4. **Access Your Site**
   - URL: `https://amandaharnett.github.io`
   - Live in ~1 minute

**Cost:** Completely free
**Domain:** Free, but ending in `.github.io`

---

## 💰 Option 3: Traditional Hosting (PAID)

**Best for:** Full control and professional domain

### Popular Hosts:
- **Bluehost**: $2.95-$12.95/month (includes domain)
- **GoDaddy**: $2.99-$8.99/month
- **SiteGround**: $3.99-$7.99/month
- **Hostinger**: $2.99-$5.99/month

### Steps:
1. **Choose Host & Plan**
   - Look for "Basic" or "Essential" plan
   - Usually $3-10/month

2. **Purchase Domain**
   - Buy domain (if not included)
   - Usually $10-15/year

3. **Upload Files**
   - Host will provide FTP access
   - Use FileZilla or similar FTP client
   - Upload `amanda-harnett-website` folder contents to `/public_html`

4. **Access Your Site**
   - Point domain to hosting
   - Wait 24-48 hours for DNS to propagate
   - Site goes live at `https://amandaharnett.com`

**Cost:** $50-150/year total

---

## 🎯 Option 4: Vercel (FREE-PAID)

**Best for:** Developers comfortable with command line

### Steps:
1. **Create Account** at https://vercel.com
2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```
3. **Deploy**
   ```bash
   cd amanda-harnett-website
   vercel
   ```
4. **Follow prompts** and you're live!

**Cost:** Free tier available
**Domain:** Free subdomain, or connect custom domain

---

## 📋 Pre-Launch Checklist

Before deploying, make sure:

### Content
- [ ] All text is finalized and proofread
- [ ] All images are optimized (under 200KB each)
- [ ] All links are tested and working
- [ ] Social media links are correct
- [ ] Contact email is correct

### Images
- [ ] Hero image added (600x600px+)
- [ ] Gallery images added (5+ images)
- [ ] About image added (600x800px+)
- [ ] Partner logos added
- [ ] All images are compressed

### SEO/Metadata
- [ ] Page title updated
- [ ] Meta description added
- [ ] Open Graph tags added (for social sharing)
- [ ] Favicon created and linked
- [ ] Google Analytics code added (if wanted)

### Testing
- [ ] Mobile: Tested on iPhone and Android
- [ ] Tablet: Tested on iPad or Android tablet
- [ ] Desktop: Tested on Chrome, Firefox, Safari
- [ ] Links: All links work (internal and external)
- [ ] Images: All images load correctly
- [ ] Forms: Contact form works (if added)

### Performance
- [ ] Page loads in under 3 seconds
- [ ] No console errors (F12 → Console)
- [ ] Mobile score: 80+ (Google PageSpeed Insights)
- [ ] Desktop score: 90+ (Google PageSpeed Insights)

---

## 🔧 Post-Launch Setup

### 1. Domain Setup
**If using custom domain:**
```
1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. Point domain to hosting provider
3. Update DNS records (instructions from your host)
4. Wait 24-48 hours for propagation
5. Test that website works on new domain
```

### 2. Email Setup
**Create professional email (`your-email@amandaharnett.com`):**
- Use Netlify Forms + Formspree for contact forms
- Set up Google Workspace ($6/user/month) for professional email
- Or use Zoho Mail (free option)

### 3. Google Search Console
```
1. Go to Google Search Console
2. Add your website
3. Verify ownership (add HTML file or DNS record)
4. Submit sitemap.xml
5. Monitor search performance
```

### 4. Bing Webmaster Tools
```
1. Go to Bing Webmaster Tools
2. Add your website
3. Verify and submit sitemap
```

### 5. Google Analytics
```
1. Create Google Analytics account
2. Add tracking code to HEAD section of index.html
3. Start monitoring visitor behavior
```

### 6. SSL Certificate
- **Netlify**: Automatic (included)
- **GitHub Pages**: Automatic (included)
- **Traditional Hosting**: Usually included or auto-enabled

Verify: Your URL should start with `https://` (the 's' is important)

---

## 📊 Monitoring Your Site

### Check These Regularly:
1. **Google PageSpeed Insights**: https://pagespeed.web.dev
2. **Google Search Console**: https://search.google.com/search-console
3. **Uptime Monitoring**: Use Uptime Robot (free)
4. **Analytics**: Google Analytics dashboard

### Speed Optimization Tips:
- Compress images further (TinyPNG.com)
- Consider CDN for images (Cloudinary, Imgix)
- Enable gzip compression on server
- Minimize CSS/JS (only if needed)
- Use lazy loading for images below fold

---

## 🔐 Security Checklist

- [ ] HTTPS enabled (green lock icon)
- [ ] Contact form uses HTTPS
- [ ] No sensitive data in HTML/CSS/JS
- [ ] Regular backups enabled
- [ ] Keep domain renewal current
- [ ] Strong password on hosting account

---

## 💬 Domain Registration

**Popular Domain Registrars:**
- **Namecheap**: Cheap domains, good support
- **Google Domains**: Easy to use, integrated services
- **GoDaddy**: Largest, lots of add-ons
- **Bluehost**: Often included with hosting

**Domain Cost:** Typically $10-15/year

**Good Domains for Amanda:**
- amandaharnett.com
- amandabeachvolleyball.com
- ahvolleyball.com
- itsAmandaHarnett.com

---

## 📱 Mobile App (Optional)

After launching website, consider:
- **Native iOS/Android app** (expensive, $5,000-20,000)
- **Progressive Web App** (cheaper, app-like experience)
- **Simple mobile site** (you have this already!)

For now, focus on getting the website perfect!

---

## 🆘 Troubleshooting Deployment

### Site Not Loading
1. Check domain DNS settings
2. Verify files uploaded correctly
3. Check hosting provider status page
4. Wait 24-48 hours for DNS propagation

### Images Not Showing
1. Verify image paths are correct
2. Check images are in correct folder
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try accessing from different device

### Mobile Site Broken
1. Test on actual mobile device (not just browser zoom)
2. Check viewport meta tag is present
3. Verify CSS media queries working
4. Test touch interactions

### Slow Loading
1. Optimize images (compress to <100KB each)
2. Enable CDN for images
3. Check Google PageSpeed Insights
4. Contact hosting provider for help

---

## 🎉 Success Indicators

You'll know deployment worked when:
✅ Domain loads your website
✅ All images display correctly
✅ All links work
✅ Mobile version displays properly
✅ Search engines can crawl it
✅ Green HTTPS lock icon shows
✅ Google Analytics tracking works

---

## 🚀 Recommended Path for Amanda

**Week 1: Finalize Content**
- Gather professional photos
- Update all text
- Optimize images
- Test locally

**Week 2: Deploy**
- Choose Netlify (easiest)
- Upload website
- Get free domain (`.netlify.app`)
- Test everything

**Week 3: Enhance**
- Buy custom domain (`amandaharnett.com`)
- Set up Google Analytics
- Set up contact form
- Share on social media

**Ongoing: Maintain**
- Update tournament results monthly
- Add new gallery photos
- Monitor analytics
- Keep content fresh

---

## 💡 Additional Resources

**Learning:**
- MDN Web Docs: https://developer.mozilla.org
- Web.dev: https://web.dev
- Netlify Docs: https://docs.netlify.com

**Tools:**
- Google PageSpeed Insights: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com
- Can I Use: https://caniuse.com

**Support:**
- Netlify Support: https://support.netlify.com
- Stack Overflow: https://stackoverflow.com
- GitHub Discussions: https://github.com/discussions

---

**Your website is ready to launch! Choose your deployment method and go live! 🎉**
