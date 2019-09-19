const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const childProcess = require('child_process');

router.post('/pushed_master', function(req, res, next) {
    const secret = process.env.WEBHOOK_SECRET;
    const sig = "sha1=" + crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');

    if ( req.headers['x-hub-signature'] === sig ) {
        console.log('IN');
        childProcess.exec('cd /home/hung/Code && ./pull_and_restart_server.sh', function(err, stdout, stderr) {
            console.log('INSIDE');
            console.log(stdout);
            console.log(stderr);
            if ( err ) {
                console.log('ERR!');
                return res.sendStatus(500);
            }
            console.log('OK');
            return res.sendStatus(200);
        });
    }
});

router.post('/pushed_master_client', function(req, res, next) {
    const secret = process.env.WEBHOOK_SECRET;
    const sig = "sha1=" + crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');

    if ( req.headers['x-hub-signature'] === sig ) {
        childProcess.exec('../pull_and_restart_client.sh', function(err, stdout, stderr) {
            if ( err ) {
                res.send({error: stderr})
            }
            res.send({success: stdout})
        });
    }
});

module.exports = router;
