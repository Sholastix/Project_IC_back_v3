const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        measureType: {
            type: String,
            required: true,
        },

        owner: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports = ExerciseModel;