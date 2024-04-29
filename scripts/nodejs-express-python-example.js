# https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js

// Sync example

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./../pypy.py']);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
});

app.listen(4000, () => console.log('Application listening on port 4000!'));


// Async example with Promise

const express = require('express');
const app = express();

let runPy = new Promise(function(success, nosuccess) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['./../pypy.py']);

    pyprog.stdout.on('data', function(data) {
        success(data);
    });

    pyprog.stderr.on('data', (data) => {
        nosuccess(data);
    });
});

app.get('/', (req, res) => {
    res.write('welcome\n');

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });
});

app.listen(4000, () => console.log('Application listening on port 4000!'));
