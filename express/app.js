const Nexmo = require('nexmo');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/request', (req, res) => {
    if (!req.body.number) {
        res.status(400).send({message: "You must supply a `number` prop to send the request to"})
        return;
    }
    Nexmo.verify.request({
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
    Nexmo.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (err, result) => {
        if (err) {
            res.status(500, err.error_text);
        }
        res.send(result);
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
