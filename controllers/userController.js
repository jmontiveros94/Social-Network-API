// This will import the ObjectId method from Mongoose
// We'll use this to target a specific user by their '_id'
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // async await function to get all users 
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to get a single user by their _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
            if (!user) {
                // otherwise error is thrown
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to create a new user 
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to find a user and update them by their _id
    // here we're also using the validator packages
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            // otherwise error is thrown
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // returns updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to delete a user by thir id 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            // otherwise error is thrown
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // deletes thoughts based on that user's _id 
            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json('User and their thoughts have been deleted');
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to add a friend by their _id 
    // also bringing in validator here 
    async addFriend(req, res) {
        try {
            console.log('Friend added!');
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            // otherwise error is thrown
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // returns updated user data 
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // async await function to remove a friend via the update(put) method
    // also bringing in a validator because we are still in user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            // otherwise error thrown
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // returns updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};