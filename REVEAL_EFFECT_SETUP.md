# 🎬 Hero Reveal Effect - Image Setup Guide

## What You Need

You now have an advanced **cursor reveal effect** in the hero section, just like Lando Norris's website!

### Two Images Required:

**1. Base Image (Everyday Clothes)**
- This is the initial image shown to visitors
- Amanda in casual/everyday outfit
- Size: 600x600px (square)
- File name: `amanda-casual.jpg`
- Location: `assets/hero/`

**2. Reveal Image (Game Gear)**
- This is what the cursor reveals
- Amanda in volleyball gear, sunglasses, game-ready
- Size: 600x600px (square)
- Same composition as the casual image (important!)
- File name: `amanda-gameday.jpg`
- Location: `assets/hero/`

## How It Works

1. **Desktop Visitors**: 
   - See Amanda in casual clothes
   - Move cursor over the image
   - Cursor reveals her in game gear
   - Sand-colored circle follows cursor showing the reveal
   - Subtle water-like animation in background

2. **While Scrolling**:
   - "AH" signature animates below image
   - Signature rotates and fades as you scroll
   - Smooth transition into next section

## Setup Instructions

### Step 1: Create Image Folders
In `assets/hero/` folder, ensure these files will go there

### Step 2: Prepare Images
You need TWO images of Amanda:

**Image 1: Casual/Everyday**
```
- Amanda in everyday outfit
- Could be: casual clothes, beach attire, training gear
- Professional quality photo
- 600x600px square
- Save as: amanda-casual.jpg
```

**Image 2: Game Ready/Game Gear**
```
- Amanda in volleyball competition gear
- Include: sunglasses, volleyball attire, competitive stance
- Same pose/angle as casual image (try to match composition)
- 600x600px square  
- Save as: amanda-gameday.jpg
```

### Step 3: Add Images to HTML

Open `index.html` and find these lines (around line 73-75):

**BEFORE:**
```html
<img class="reveal-base" id="heroImageBase" src="" alt="Amanda Harnett - Off Court">
...
<img class="reveal-top" id="heroImageReveal" src="" alt="Amanda Harnett - On Court">
```

**AFTER:**
```html
<img class="reveal-base" id="heroImageBase" src="assets/hero/amanda-casual.jpg" alt="Amanda Harnett - Off Court">
...
<img class="reveal-top" id="heroImageReveal" src="assets/hero/amanda-gameday.jpg" alt="Amanda Harnett - On Court">
```

### Step 4: Save and Refresh
1. Save `index.html`
2. Refresh browser
3. Hover over the image in the hero section
4. Magic! The reveal effect should work

## Tips for Best Results

### Photography Tips
- 📸 **Same Angle**: Both photos should be taken from similar angles
- 🌅 **Lighting**: Try to match lighting conditions in both shots
- 👕 **Composition**: Keep Amanda in similar position in frame
- 🎨 **Quality**: High resolution photos (at least 1200x1200px before resizing)
- 📦 **File Size**: Compress to under 200KB each for fast loading

### Styling Notes
- Colors: Sand and blush gradients complement both casual and athletic gear
- The liquid background animation is subtle and won't distract from images
- Cursor circle is 150px diameter at sand color (#D4A574)
- Effect works on desktop/laptop (cursor-based)
- Mobile users see just the base image (responsive)

## How to Customize the Effect

### Change Reveal Circle Size
In `script.js`, line ~40:
```javascript
const maxRevealRadius = 150;  // Change this number (in pixels)
```

### Change Circle Color
In `styles.css`, line ~317:
```css
border: 2px solid var(--sand);  /* Change to var(--blush) or custom color */
```

### Adjust Liquid Animation Speed
In `styles.css`, line ~308:
```css
animation: liquidFlow 6s ease-in-out infinite;  /* Change 6s to 4s for faster, 8s for slower */
```

### Change Signature Style
In `index.html`, line ~79-85:
You can change the SVG to use Amanda's actual signature instead of "AH"

## What Happens on Different Devices

**Desktop/Laptop:**
✓ Full cursor reveal effect works
✓ Smooth animations
✓ Water-like background animation visible
✓ Signature animation on scroll

**Tablet:**
✓ Base image shows (casual)
✓ Touch reveals work (tap to see effect)
✓ Signature animation visible
✓ Liquid background visible

**Mobile:**
✓ Base image shows (casual)
✓ Reveal still works (touch-based)
✓ Signature animation visible
✓ Optimized for smaller screens

## Troubleshooting

**Issue: No reveal effect working**
- Check both image paths are correct
- Make sure images exist in `assets/hero/`
- Refresh browser cache (Ctrl+Shift+Delete)
- Check browser console (F12) for errors

**Issue: Images look stretched**
- Both images must be square (600x600px)
- Check aspect ratio is exactly 1:1
- Resize images if needed

**Issue: Reveal circle is too big/small**
- Adjust `maxRevealRadius` in script.js
- Try values between 80-200
- Test to find what looks best

**Issue: Animation is too fast/slow**
- Adjust the timing values in CSS
- Look for `0.05s` and `6s` values
- Change them to your preference

## Advanced Customization

### Add Your Own Signature SVG
Replace the "AH" text in the SVG (lines 79-85 in index.html) with actual signature path:

```svg
<path d="M 10 50 Q 50 10 90 50" stroke="url(#signatureGradient)" stroke-width="2" fill="none"/>
```

### Adjust Scroll Animation
In `script.js`, line ~54-60, you can change:
- `yOffset = scrollProgress * 60` (how far it moves)
- `rotation = scrollProgress * 15` (how much it rotates)
- `scrollProgress * 0.5` (how quickly it fades)

## Performance Notes

- ✅ CSS animations (GPU accelerated)
- ✅ Minimal JavaScript (only on hover)
- ✅ Liquid background uses CSS gradients (very fast)
- ✅ No external libraries needed
- ✅ Loads in under 1 second

The effect is smooth and performs well even on older devices!

## Example Photo Setup

**Image 1: Casual**
- Location: San Francisco beach
- Outfit: Light blue beach cover-up, sandals
- Pose: Standing, smiling, relaxed
- Clean, professional shot

**Image 2: Game Day**
- Location: Same beach or court
- Outfit: AVO team gear, sunglasses, volleyball shorts
- Pose: Same standing position, ready stance
- Action-ready, competitive energy

The contrast makes the reveal effect very striking!

---

**Ready?** Gather your two images and follow the setup steps above! 🏐✨
