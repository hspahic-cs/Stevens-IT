//Here you will require route files and export them as used in previous labs.
import textRoutes from './textanalyzer.js';

const constructorMethod = (app) => {
    app.use('/', textRoutes)

    app.use('*', (req, res) => {
        res.redirect('/')
    })
};

export default constructorMethod;
