const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts, reactions } = require('./data');
// imports connection.js, models and data from respective folders

// handles error in case connection fails
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to database');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    
    let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    if (reactionCheck.length) {
        await connection.dropCollection('reactions');
    }

    // inserts the users, thoughts, and reactions(via thoughts) into the database
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Thought.collection.insertMany(reactions);

    console.table(users);
    console.table(thoughts);
    console.table(reactions);

    // message to show successful seeding
    console.info('Seeding complete! 🌱');
    // ends connection with the 'exit' command
    process.exit(0);
});