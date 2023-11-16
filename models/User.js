// imports schema and model from mongoose
const { Schema, model } = require('mongoose');

// importing the validator package
const validator = require('validator');

// validates the email from the validator package
function validateEmail(email) {
    return validator.isEmail(email);
}

// created the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please provide a username!',
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: 'Please provide an email!',
            validate: {
                // validates single user's email
                validator: validateEmail,
                message: 'Please provide a valid email address!',
            },
        },
        thoughts: [
            // properties for thoughts where we reference the thoughts model
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            // properties for friends referencing the user model
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    // sends data in json 
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// creates virtual called friendCount that returns a list of friends (which references the user model)
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// creats users model from the userSchema
const User = model('Users', userSchema);

module.exports = User;