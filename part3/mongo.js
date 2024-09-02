const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
console.log(password)

const url = `mongodb+srv://johlinco:${password}@fullstackopen.ntw6g.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'looking forward to my bike ride',
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({ important: false }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})