const fs = require('fs');
let code = fs.readFileSync('constants.tsx', 'utf-8');
let startStr = "export const BLOGS: BlogPost[] = [";
let startIndex = code.indexOf(startStr);

if(startIndex > -1) {
    let block = code.substring(startIndex);
    let idsMatch = block.match(/id:\s*'([a-zA-Z0-9-]+)'/g);
    let ids = idsMatch ? idsMatch.map(s => s.split("'")[1]) : [];
    console.log("Total Blogs found:", ids.length);
    
    ids.forEach(id => {
       let idx = block.indexOf("id: '" + id + "'");
       let nextIdx = block.indexOf("id: '", idx + 1);
       if(nextIdx === -1) nextIdx = block.length;
       let snippet = block.substring(idx, nextIdx);

       let hasImage = snippet.includes('image:');
       let hasExcerpt = snippet.includes('excerpt:');
       let hasTags = snippet.includes('tags:');

       if (!hasImage || !hasExcerpt || !hasTags) {
           console.log("Missing data in log: " + id + " Image:" + hasImage + ", Excerpt:" + hasExcerpt + " Tags:" + hasTags);
       } else {
           console.log("Verified SEO OK: " + id);
       }
    });

    const report = { total: ids.length, ids: ids };
    fs.writeFileSync('blogs.json', JSON.stringify(report, null, 2));
} else {
    console.log('Unable to find block');
}
