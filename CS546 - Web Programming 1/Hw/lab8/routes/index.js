//Here you will import route files and export them as used in previous labs
import venueRoutes from './venues.js'

const constructorMethod = (app) => {
    app.use('/', venueRoutes)
    app.use('*', (req,res) => {
        res.status(404).json({error: 'Not found'})
    })
}

export default constructorMethod;