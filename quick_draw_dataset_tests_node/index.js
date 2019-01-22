const fs = require('fs');
//const ndjson = require('ndjson'); // npm install ndjson
const express = require('express');
const cors = require('cors');

const app = express()

const eyes = require('./data/filteredEyes.json');
const mouths = require('./data/filteredMouths.json');
/*

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


*/
// use it before all route definitions
app.use( cors({origin: '*'}) );

app.get('/', (req, res) => {

  const indexes = {
    rightEye: Math.floor(Math.random()*eyes.length),
    leftEye: Math.floor(Math.random()*eyes.length),
    mouth: Math.floor(Math.random()*mouths.length),
  }

  const rightEye = eyes[ indexes.rightEye ];
  const leftEye = eyes[ indexes.leftEye ]
  const mouth = mouths[ indexes.mouth ]

  res.send({rightEye, leftEye, mouth, indexes});
/*
  console.log("CALLED");

  parseSimplifiedDrawings('data/mouth.ndjson', (err, drawings) => {
    console.log("before")
    if(err) {
      console.log(err);
      res.send("ERRO")
    } else {
      res.send(drawings[0]);
    }
  })
*/
  //res.send('Hello World!')
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))


/*
function parseSimplifiedDrawings(fileName, callback) {
  var drawings = [];
  var fileStream = fs.createReadStream(fileName)
  fileStream
    .pipe(ndjson.parse())
    .on('data', function(obj) {
      drawings.push(obj)
    })
    .on("error", callback)
    .on("end", function() {
      callback(null, drawings)
    });
}

parseSimplifiedDrawings("data/mouth.ndjson", function(err, drawings) {
  if(err) return console.error(err);

  console.log("# of drawings:", drawings.length);
  console.log("\n\nprimeiro objeto\n\n");
  console.log(drawings[0].drawing);
})
*/