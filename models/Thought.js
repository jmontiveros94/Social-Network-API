// imports the schema, model, and types 
const { Schema, model, Types } = require('mongoose');

// imports/requires moment package
const dateFormat = require('moment');

// new schema called reaction
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please provide a reaction!',
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'Please provide a username!',
        },
        createdAt: {
            // here's where we add the date as a string
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            getters: true,
        }, 
    }
);

// created new thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please provide a thought!',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            // creating another timestamp for the date of the thought
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: 'Please provide a username!',
        },
        // uses reaction schema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

// gets a virtual of the reactions and returns how many reactions the thought has via the virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// uses the thought schema to create a thought
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;