function copy(data) {
    let proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data);
    proc.stdin.end();
    proc.stdin.end();
    console.log('text copied!');
}

module.exports = copy;
