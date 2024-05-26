# NodeJS and Express.js

## Challenge 5

### Context

There are some fellas that want to develop the backend for their product. They provided a front, but I didn't find it pleasing to my eyes, so I built a new one. The API should cover the following requirements:

#### Requirements

* Allow user registration.
* An endpoint able of checking user credentials and returning a `jwt` token.
* An endpoint able of returning info about the logged user.

#### Prerequisites

You need to have installed `nodemon` globally.

### How can I see this?

Well, first of all you need to have installed `node` before running anything. Also, you need to clone this repo.

Once you have cloned this repo, `cd` into it. Here, you'll find two folders: one for the frontend (`client`) and one for the backend (`server`). First, you need to start the server, then the front. To start the backend, you need to:

```
cd server && npm install && nodemon index.js localhost 8089
```

Once the backend is running, open a new terminal and `cd` into the `client` directory and then run
```
npm install && npm run dev
```

Now, you're ready to play with the app. Have fun!

### Author

* [Patricio Parada](https://github.com/pelafustan)

### Acknowledgement

* Black coffee.
* Green tea (when tummy hurt).
* [Desafío Latam](https://desafiolatam.com/)
