const sharp = require('sharp');
const fs = require('fs');

async function fixFavicon() {
  try {
    // Read original
    const inputBuffer = fs.readFileSync('public/favicon.png');
    
    // Google requires favicons to be multiples of 48px square.
    // 192x192 is the perfect modern size.
    await sharp(inputBuffer)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/favicon-fixed.png');
      
    console.log('Successfully created optimized 192x192 favicon!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fixFavicon();
