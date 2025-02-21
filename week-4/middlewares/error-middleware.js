const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
    throw new Error('Explicit error')
});

app.use((err, req, res, next) => {
    console.log('path', req.path);
    console.log(err.stack);
    res.status(404).send({msg: 'Error from error middleware'});
});

app.listen(3000);