const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





//get all user

const getAllUser = async (req, res) => {

    const users = await User.find().lean()
    if (!users?.length)
        return res.status(400).json({ message: 'No users found' })
    res.json(users)
}



//update

const updateUser = async (req, res) => {
    const { _id, name, phone, email } = req.body
    const user = await User.findById(_id)
    if (!user)
        return res.status(400).json({ message: 'No user found' })
    user.name = name
    // user.username = username
    user.email = email
    user.phone = phone
    const updateUser = await user.save()
    if(!updateUser)
        {return res.status(201).send("The update failed")}
    res.json(updateUser)
}



//register

const register = async (req, res) => {
    console.log("jjj");
    const {  password, name, email, phone } = req.body
    if (!name || !password||!email) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ email: email }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email" })
    }
    const hashedpwd = await bcrypt.hash(password, 10)
    const userobject = { name, email, phone, password: hashedpwd }

    const user = await User.create(userobject)
    if (user) {
        return res.status(201).json({
            message: `New user ${user.email} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}






//login
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: 'All fields are required' })
    const foundUser = await User.findOne({ email }).lean()
    console.log(foundUser)
    if (!foundUser) {

        return res.status(401).json({ message: 'Cant connect' })
    }

    const Match = await bcrypt.compare(password, foundUser.password)
    if (!Match) return res.status(401).json({ message: 'Cant connect' })
        
    const NewUser = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        roles:foundUser.roles

    }
        
        const accessToken = jwt.sign(NewUser, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })

     
}
const confirmUser = async (req, res) => {
   const {id} = req.params
   const user = await User.findById(id).exec()
   if (!user)
       return res.status(400).json({ message: 'No user found' })
   user.confirm = !user.confirm
   const updateUser = await user.save()
   const users = await User.find().lean()
   res.json(users)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user)
        return res.status(400).json({ message: 'No user found' })
    const result = await user.deleteOne()
    const users = await User.find().lean()
    if (!users?.length)
        return res.status(400).json({ message: 'No users found' })
    res.json(users)
   
}



module.exports = {register,login,getAllUser,updateUser,deleteUser,confirmUser}