const Database = require('../lib/database/Database.js');
const Logger = require('../lib/logger/Logger.js');
const { insertTestAnimal, insertTestType } = require('./testUtils.js');

describe('AnimalRepository', () => {
    let db;
    let animalRepository;
  
    beforeEach(() => {
      db = Database.getInstance();
      animalRepository = new AnimalRepository(db);
    });
  
    describe('#getAnimals', () => {
      context('when querying successfully', () => {
        context('when db is empty', () => {
            it('returns empty array', async () => {
                const result = await animalRepository.getAnimals();
                expect(result).to.deep.equals([]);
            });
        });

        context('when the db contains records', () => {
            const TYPE_1 = 'dog';
            const TYPE_2 = 'cat';

            const ANIMAL_1 = {
                name: 'Bruno',
                type: ANIMAL_TYPE_2,
                color: 'brown',
                age: 3,
                treated: true
            };

            const ANIMAL_2 = {
                name: 'Meow',
                color: 'white',
                age: 1,
                treated: false
            };

            

            let result;

            beforeEach(async() => {
                await insertTestType(TYPE_1);
                await insertTestType(TYPE_2);

                await insertTestAnimals({...ANIMAL_1, type: TYPE_1 });
                await insertTestAnimals({...ANIMAL_2, type: TYPE_2 });

                result = await animalRepository.getAnimals();
            });

            it('returns the animals', () => {
               expect(result).to.containSubset([ANIMAL_1]);
               expect(result).to.containSubset([ANIMAL_2]);
            });

            it('returns the type of the animals', () => {
                expect(result).to.containSubset([{ name: ANIMAL_1.name, type: TYPE_1}]);
                expect(result).to.containSubset([{ name: ANIMAL_2.name, type: TYPE_2 }]);
            });
        });
      });

      context('when the query fails', () => {
        let error;

        beforeEach(() => {
            error = new Error('network error')
            sinon.stub(db, 'query').throws(error);
        });

        it('logs the error', async () => {
            try {
                await animalRepository.getAnimals();
            } catch(thrownError) {}
            expect(Logger.fromError).to.haveBeenCalledWithExactly('fetch-animals', error);
        });

        it('throws the error', async () => {
            try {
                await animalRepository.getAnimals();
                throw new Error('should have thrown an error')
            } catch(thrownError) {
                expect(thrownError.message).to.equals(error.message);
            }
        });
      });
    });
});