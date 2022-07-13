const Database = require('../lib/database/Database.js');
const logger = require('../lib/logger/Logger.js')('web');

class AnimalRepository {

    #db;

    constructor(db) {
        this.#db = db;
    }

    static create() {
        return new AnimalRepository(Database.getInstance());
    }

    async getAnimals() {
        try {
            const queryResult = await this.#db.query({
                text: `SELECT 
                        animal.*, 
                        type.name
                    FROM animals 
                    LEFT JOIN types ON animal.type = types.id`
            });
    
            return queryResult.rows;
        } catch(error) {
            logger.fromError('fetch-animals', error);
            throw error;
        }
    }
}