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

parseSimplifiedDrawings('data/nose.ndjson', (err, drawings) => {
    console.log("before")
    if(err) {
      console.log(err); 
    } else {
      const json = JSON.stringify(drawings);
      fs.writeFile('data/MY_JSON_FILE.json', json, 'utf8', ()=>console.log("DONE"));
    }
 })


/*
var obj = {
   table: []
};


obj.table.push({id: 1, square:2});


var json = JSON.stringify(obj);



fs.writeFile('myjsonfile.json', json, 'utf8', callback);

fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push({id: 2, square:3}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
}});
*/