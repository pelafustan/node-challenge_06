require('dotenv').config();

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const SECRET = process.env.SECRET;

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    allowExitOnIdle: true,
});

// function that compare the user credentials
const checkCredentials = async (email, password) => {
    const query = 'SELECT password FROM users WHERE email = $1';

    const { rows: [{ pass }], rowCount } = await pool.query(query, [email]);

    if (!rowCount || !bcrypt.compareSync(password, pass)) {
        throw { code: 401, message: 'Password and email do not match' };
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: '10 minutes' });

    return token;
};

// if we have a valid token, we return the user's information
const getUserData = async (token) => {
    try {
        const { email } = jwt.verify(token, SECRET);

        const query = 'SELECT * FROM users WHERE email=$1';
        const { rows: [user], rowCount } = pool.query(query, [email]);

        if (!rowCount) throw { code: 401, message: 'Unauthorized' };

        return user;
    } catch (err) {
        throw { code: err.code, message: err.message };
    }
};

// add new entries to users table
const addUser = async (user) => {
    const { email, password, role, languages } = user;
    const pass = bcrypt.hashSync(password);
    const query = 'INSERT INTO users (email, password, role, languages) VALUES ($1, $2, $3, $4)';
    const { rowCount } = await pool.query(query, [email, pass, role, languages]);
    if (!rowCount) throw { code: 500, message: 'User cannot be created!' };
};

module.exports = { getUserData, addUser, checkCredentials };
