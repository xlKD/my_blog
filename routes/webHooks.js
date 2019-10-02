const express = require('express');
const router = express.Router();
const cors = require('cors');
const crypto = require('crypto');
const childProcess = require('child_process');
const secret = process.env.WEBHOOK_SECRET;

router.post('/pushed_master', function(req, res, next) {
    let isSuccess = false;
    const sig = "sha1=" + crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');

    if ( req.headers['x-hub-signature'] === sig ) {
        isSuccess = childProcess.exec('cd /home/ec2-user/Code && ./pull_and_restart_server.sh', function(err, stdout, stderr) {
            if ( err ) {
                return false;
            }
            return true;
        });
    }

    isSuccess ? res.sendStatus(200) : res.sendStatus(500);
});


router.post('/pushed_master_client', cors(), function(req, res, next) {
    let isSuccess = false;
    const sig = "sha1=" + crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');

    if ( req.headers['x-hub-signature'] === sig ) {
        isSuccess = childProcess.exec('cd /home/ec2-user/Code && ./pull_and_restart_client.sh', function(err, stdout, stderr) {
            if ( err ) {
                return false;
            }
            return true;
        });
    }

    isSuccess ? res.sendStatus(200) : res.sendStatus(500);
});

module.exports = router;
