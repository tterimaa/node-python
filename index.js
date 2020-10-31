const express = require('express')
const spawn = require('child_process').spawn
const app = express()
const port = 3000

app.get('/', (req, res) => {
    var dataset = [];
    // spawn new child process to call the python script
    const python = spawn('python', ['script2.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataset.push(data);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataset.join(""))
});
})

app.listen(port, () => console.log(`app is listening to port ${port}`))