//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

import auth_routes from './auth_routes.js';

const constructorMethod = (app) => {
    app.use('/', auth_routes)
    app.use('*', (req, res) => {
        res.status(404)
    })
};

export default constructorMethod;
