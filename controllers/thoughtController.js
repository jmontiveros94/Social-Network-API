// imports the models 
const { User, Thought } = require('../models');

module.exports = {
    // async await function to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        // otherwise you'll get an error
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to get a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
            // error thrown if theres no thought with an associated id
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // returns thought data
            res.json(thought);
        }
        // otherwise an error is thrown
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        }
        // otherwise error thrown
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to find a thought by it's _id and then update it
    // we also bring in the validators to run checks 
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            // otherwise if no thought error is thrown
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // responds with thought data
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to find a thought and delete it by it's _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            // otherwise error is thrown
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // finds deleted user and returns a 'new' one that is technically updated 
            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            // returns message that it worked 
            res.json('This thought has been deleted');
        }
        // otherwise error is thrown
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to create a reaction
    // be mindful that the reactions are dependent on the thoughts data being queried (see data.js in utils folder(ln 17))
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            // otherwise error is thrown
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // returns thought data 
            res.json(thought);
        }
        // otherwise error is thrown
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function that deletes a reaction
    // just like above, reactions are dependent on the thought data being queried
    async deleteReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { runValidators: true, new: true }
                );
                // otherwise error thrown for no thought 
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with that ID' });
                }
                // returns message that it worked 
                res.json('This reaction has been deleted');
            }
            // otherwise error is thrown
            catch (err) {
                res.status(500).json(err);
            }
        }
};