const mongoose = require('mongoose')
const AutoIncrement = require('mongoos-sequence')(mongoose)

const noteSchemaSchema =new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    completed: {
        type: Boolean,
        default: false
    }
    
},
{
    timestamps: true
}
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500

})

module.exports = mongoose.model('Note', noteSchema)