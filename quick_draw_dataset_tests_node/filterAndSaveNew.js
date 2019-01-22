var fs = require('fs');
const ndjson = require('ndjson'); 

const parseSimplifiedDrawings = (fileName, callback) => {
  const drawings = [];
  const fileStream = fs.createReadStream(fileName);
  console.log("before fileStream");

  fileStream
    .pipe(ndjson.parse())
    .on('data', (obj) => drawings.push(obj))
    .on("error", callback)
    .on("end", ()=>callback(null, drawings));
}

parseSimplifiedDrawings('data/mouth.ndjson', (err, drawings) => {
    console.log("before")
    if(err) {
      console.log(err); 
    } else {
      //const json = JSON.stringify(drawings);

      console.log(`\ndrawings.length: ${drawings.length}`)

      console.log('\nstart\n\n')
      const filteredDrawings = drawings.filter((d)=>{
        return d.recognized;
      })
      console.log('\n\nend\n');

      console.log(`\nfiltered.length: ${filteredDrawings.length}\n`);

      console.log('filtered drawing 0');
      console.log(filteredDrawings[0]);


      const json = JSON.stringify(filteredDrawings);
      fs.writeFile('data/filteredMouth.json', json, 'utf8', ()=>console.log("DONE"));
    }
 })