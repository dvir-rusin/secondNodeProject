const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let userAvailabilities = [];

app.post('/availability', (req, res) => {
    const { username, date, isAvailable } = req.body;
    const index = userAvailabilities.findIndex(u => u.username === username && u.date === date);

    if (index > -1) {
        userAvailabilities[index].isAvailable = isAvailable;
    } else {
        userAvailabilities.push({ username, date, isAvailable });
    }

    res.send({ success: true, message: 'Availability updated', data: userAvailabilities });
});

app.get('/availability', (req, res) => {
    res.send(userAvailabilities);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
