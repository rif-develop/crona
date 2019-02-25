const {MONGO_URI} = require('../config')
const mongooseConnector = require('../connectors/mongoose-connector')
// const newsSeeds = require('./news-seeds')
const userSeeds = require('./user-seeds')

initSeeds()

async function initSeeds() {
    const mongoConnection = await mongooseConnector(MONGO_URI)

    await mongoConnection.connection.collections['users'].drop()



    try {
         const users = await userSeeds()

        // const news = await newsSeeds(users)


    } catch (e) {
        console.log(e)
    }
    finally {
        mongoConnection.close()
    }

}
