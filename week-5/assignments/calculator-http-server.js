const express = require('express');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    if (!req?.query?.a || !req?.query?.b) {
        res.status(400).send({
            msg: 'Query params missing'
        });
    }
    next();
})

app.get('/add', (req, res) => {
    const num1 = req?.query?.a || 0;
    const num2 = req?.query?.b || 0;
    res.status(200).json({
        addition: parseFloat(num1) + parseFloat(num2)
    });
})

app.get('/subtract', (req, res) => {
    const num1 = req?.query?.a || 0;
    const num2 = req?.query?.b || 0;
    res.status(200).json({
        subtraction: parseFloat(num1) - parseFloat(num2)
    });
})

app.get('/multiply', (req, res) => {
    const num1 = req?.query?.a || 0;
    const num2 = req?.query?.b || 0;
    res.status(200).json({
        multiplication: parseFloat(num1) * parseFloat(num2)
    });
})

app.get('/divide', (req, res) => {
    const num1 = req?.query?.a || 0;
    const num2 = req?.query?.b || 0;
    if (parseFloat(num2) == 0) {
        res.status(400).send({
            msg: `Divisor can't be zero / undefined / null`
        });
    }
    res.status(200).json({
        division: parseFloat(num1) / parseFloat(num2)
    });
})

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});