# Travel Maker back end

This is the back-end portion of the Travel Maker application.

It is a REST API built using [Express.js](https://expressjs.com/).

[Mongoose](https://mongoosejs.com/) is used as an ODM library of choice. It makes working with [MongoDB](https://www.mongodb.com/) much easier.

## How to install

- Install [Node.js](https://nodejs.org/)
- Install packages using `npm install`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.

### `npm run build`

Builds the app for production into the `dist` folder.<br>
The build is transpiled via [Babel](https://babeljs.io/) and you can later run the app using the `npm start` command.

## Features

- User authentication utilizing [jwt](https://jwt.io/).
- User authorization
- Trip management via CRUD operations
- Uses [Nodemon](https://nodemon.io/) to monitor any changes and restart the process accordingly
- It has been deployed to [Heroku](https://dashboard.heroku.com/login) and is accessible at [https://travelmaker-be.herokuapp.com/](https://travelmaker-be.herokuapp.com/)

## Env variables

This project requires some environmental variables to run properly. Make sure to rename the `.env.example` file to `.env` and fill in your dev variables.

## License

[MIT](https://choosealicense.com/licenses/mit/)
