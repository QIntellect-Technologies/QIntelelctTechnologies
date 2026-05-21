const fs = require('fs');

let code = fs.readFileSync('constants.tsx', 'utf-8');
const startIndex = code.indexOf('export const BLOGS: BlogPost[] = [');
const endIndex = code.indexOf('export const INDUSTRIES: Industry[] = [');
let blogBlock = code.substring(startIndex, endIndex);

let idsMatch = blogBlock.match(/id:\s*'([a-zA-Z0-9-]+)'/g);
let ids = idsMatch ? idsMatch.map(s => s.split("'")[1]) : [];
let missing = [];

ids.forEach(id => {
   let idx = blogBlock.indexOf("id: '" + id + "'");
   let nextIdx = blogBlock.indexOf("id: '", idx + 1);
   if (nextIdx === -1) nextIdx = blogBlock.length;
   let snippet = blogBlock.substring(idx, nextIdx);

   let hasImage = /image:\s*['"](.*?)['"]/.test(snippet);
   let hasExcerpt = /excerpt:\s*['"](.*?)['"]/.test(snippet);
   let hasTags = /tags:\s*\[(.*?)\]/.test(snippet);

   if (!hasImage || !hasExcerpt || !hasTags) {
       missing.push({ id: id, hasImage: hasImage, hasExcerpt: hasExcerpt, hasTags: hasTags });
   }
});

console.log("Missing data in blogs:", missing);
