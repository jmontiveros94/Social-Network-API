// seeding the database 
const users = [
    // user data with their thoughts and friends to be queried
    {
        username: "jmontiveros",
        email: "jm.ontiveros94@gmail.com",
        thoughts: [],
        friends: []
    },
];

const thoughts = [
    // thoughts data that also references reactions
    {
        thoughtText: "Here's what I think",
        username: "jmontiveros",
        reactions: []
    },
];

const reactions = [
    // reaction data 
    {
        reactionBody: "Reaction:",
        username: "jmontiveros",
    },
];

module.exports = { users, thoughts, reactions };