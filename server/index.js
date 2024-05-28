require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkCredentials, getUserData, addUser } = require('./queries');

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test endopoint to check everything is running smoothly
app.get('/', (req, res) => {
    try {
        res.status(200).send({ url: req.originalUrl, method: req.method });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ error: err.code || 500, error: err });
    }
});

// post endpoint that handles user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await checkCredentials(email, password);
        res.status(200).json({ token: token });
    } catch (err) {
        res.status(err.code).send(err.message);
    }
});

// get endpoint to retrieve user's information from the db
app.get('/user', async (req, res) => {
    try {
        const token = req.header('Authorization').split('Bearer ')[1];
        const user = await getUserData(token);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send(err.message || 'Something went wrong.');
    }
});

app.post('/new-user', async (req, res) => {
    try {
        const user = req.body;
        await addUser(user);
        res.status(200).send('user created!');
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send(err);
    }
});

app.put('/user', async (req, res) => {
    try {
        const token = req.header('Authorization').split('Bearer ')[1];
        const user = req.body;
        await updateUserData(token, user);
        res.status(200).send('user updated!');
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send(err);
    }
});

// send 404 for every route/method that isn't supported
app.use('*', (_, res) => {
    res.status(404).send('Endpoint does not exist or method is not allowed');
});

app.listen(PORT, () => console.log(`Server up and running! PORT: ${PORT}`));
