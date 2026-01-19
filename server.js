const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => res.send('PostureFit API Rodando!'));

// Cálculo de Pollock 7 Dobras
app.post('/calculate-pollock', (req, res) => {
    const { sum, age, gender } = req.body;
    let density;
    if (gender === 'M') {
        density = 1.112 - (0.00043499 * sum) + (0.00000055 * Math.pow(sum, 2)) - (0.00028826 * age);
    } else {
        density = 1.097 - (0.00046971 * sum) + (0.00000056 * Math.pow(sum, 2)) - (0.00012828 * age);
    }
    const fat = ((4.95 / density) - 4.5) * 100;
    res.json({ fatPercentage: fat.toFixed(2) });
});

app.listen(process.env.PORT || 8080);
