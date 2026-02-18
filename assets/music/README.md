# 🎵 Music Assets

Add music files here for the "What I'm Listening To" player.

## File Format
- **Recommended:** MP3 (best compatibility)
- **Also supported:** WAV, M4A, AAC

## Naming Convention
The JavaScript expects files named:
- `track1.mp3`
- `track2.mp3`
- `track3.mp3`
- `track4.mp3`
- `track5.mp3`

Or update the playlist in `script.js` to match your filenames.

## To Customize Tracks
Edit the `playlist` array in `script.js` (search for "initMusicPlayer"):

```javascript
const playlist = [
    {
        title: 'Your Song Title',
        artist: 'Artist Name',
        src: 'assets/music/your-file.mp3'
    },
    // ... more tracks
];
```

## Notes
- Keep file sizes reasonable (5-10MB per track recommended)
- Ensure you have rights to use the music
- Consider royalty-free or licensed tracks for public sites
