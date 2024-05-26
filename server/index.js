require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    try {
        res.status(200).send({ url: req.originalUrl, method: req.method });
    } catch (err) {
        console.log(err);
        res.status(err.code || 400).send({ error: err.code || 400, error: err });
    }
});

app.listen(PORT, () => console.log(`Server up and running! PORT: ${PORT}`));
