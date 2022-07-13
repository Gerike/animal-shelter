const insertTestType = async (db, type) => {
    await db.query({ text: 'INSERT INTO types (name) VALUES ($1)', values: [type]});
};

const insertTestAnimal = async (db, { name, type, color, age, treated }) => {
    await db.query({ text: 'INSERT INTO animal (name, type, color, age, treated) VALUES ($1, $2, $3, $4, $5)', values: [name, type, color, age, treated] });
}

const clearDatabase = async(db) => {
    await db.query('TRUNCATE animals');
    await db.query('TRUNCATE types');
}