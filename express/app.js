const Nexmo = require('nexmo');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const nexmoNumber = process.env.NEXMO_NUMBER;

const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
});

app.post('/request', (req, res) => {
    if (!req.body.number) {
        res.status(400).send({message: "You must supply a `number` prop to send the request to"})
        return;
    }
    nexmo.verify.request({
        number: req.body.number,
        brand: 'Vonage Demo App',
        code_length: '4'
    }, (err, result) => {
        if (err) {
            res.status(500, err.error_text);
        }
        const requestId = result.request_id;
        res.send({requestId});
    });
})

app.post('/verify', (req, res) => {
    if (!req.body.requestId || !req.body.code) {
        res.status(400).send({message: "You must supply a `code` and `request_id` prop to send the request to"})
        return;
    }
    nexmo.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (err, result) => {
        if (err) {
            res.status(500, err.error_text);
        }
        res.send(result);
    });
})

app.post('/invite', (req, res) => {
    if (!req.body.number) {
        res.status(400).send({message: "You must supply a `number` prop to send the request to"})
        return;
    }
    const message = {
        content: {
            type: 'text',
            text: 'You\'re invited to use the hot new app! Details here:',
        },
    };
    nexmo.channel.send(
        {type: 'sms', number: req.body.number},
        {type: 'sms', number: nexmoNumber},
        message,
        (err, data) => {
            if (err) {
                res.status(500, err.detail);
            }
            res.send(data);
        },
    );
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
