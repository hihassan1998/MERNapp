const User =  require('../models/User')
const Note =  require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers= asyncHandler(async (req,res) =>{
    const users = await User.find().select('-password').lean() 
    if (!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc Create new user
// @route POST  /users
// @access Private

const createNewUser= asyncHandler(async (req,res) =>{
    const { username, password, roles } =req.body

    //Confirm data
    
    if (!username || !password || !Array.isArray(roles) || !roles.length ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for dublicates
    
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ messsage: 'Duplicate username' })
    }

    //Hash the password
    const hashedPwd = await bcrypt.hash(password,10) //salt round qty

    const userObject = {username, "password": hashedPwd, roles}

    //Create and store new user
    const user = await User.create(userObject)

    if(user) { //created
        res.status(201).json({ message: `New user ${username} created`}) //using template literal
    } else {
        res.status(400).json({ message: 'Invalid user data recived' })
    }
})

// @desc Update a user
// @route PATCH  /users
// @access Private

const updateUser= asyncHandler(async (req,res) =>{
    const { id,username, roles, active, password } = req.body

    //Confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required'})
    }
        
    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: 'User not found'})
    }
    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    //Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'})
    }
    user.username = username
    user.role = roles
    user.active = active

    if (password) {
        // HAsh password
        user.password = await bcrypt.hash(password, 10) //salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated`})
})

// @desc Delete a user
// @route DELETE  /users
// @access Private

const deleteUser= asyncHandler(async (req,res) =>{
    const { id } = req.body 

     // Confirm data
    if (!id) {
        return res.status(400).json({message:' User ID Required'})
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await User.findByIdAndDelete(id) // user.deleteOne

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)


})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}