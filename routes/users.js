const express = require("express")
const signale = require("signale")
const { findOne } = require("../model/User")
const User = require("../model/User")
const router = express.Router()

// http://localhost:3000/api/user

// a) Show all the users
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        signale.error(error.name)
        const toSend = { "code": 400, "method": "get", "error": error.name }
        res.status(400).send(toSend)
    }

})

//b) Show a specific user 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            signale.error("user not found")
            const toSend = { "code": 404, "method": "get", "error": "Not found" }
            res.status(404).send(toSend)
        }
        else {
            res.status(200).send(user)
        }
    } catch (error) {
        signale.error(error.name)
        const toSend = { "code": 400, "method": "get", "error": error.name }
        res.status(400).send(toSend)
    }



})

//c) Create a new user 
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const savedUser = await user.save()
        const toSend = { "code": 201, "method": "POST", "error": "Created" }
        res.status(201).send(toSend)

    }


    catch (error) {
        signale.error(error.name)
        const toSend = { "code": 400, "method": "PUT", "error": error.name }
        res.status(400).send(toSend)

    }


})

//d) Update a user
router.put("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            signale.error("Not found")
            const toSend = { "code": 404, "method": "get", "error": "Not found" }
            res.status(404).send(toSend)
        }

        else {
            if (req.body.name) {
                user.name = req.body.name
            }
            if (req.body.age) {
                user.age = req.body.age
            }
            await user.save()
            const toSend = { "code": 200, "method": "PUT", "error": "Success" }
            res.status(200).send(toSend)
        }
    }
    catch (error) {
        const toSend = { "code": 400, "method": "PUT", "error": error.name }
        res.status(400).send(toSend)

    }

})




//e) Delete a user

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            const toSend = { "code": 404, "method": "DEL", "error": "Not found" }
            res.status(404).send(toSend)
        }
        else {
            user.delete()
            const toSend = { "code": 200, "method": "DEL", "error": "Success" }
            res.status(200).send(toSend)

        }
    }
    catch (error) {
        const toSend = { "code": 400, "method": "DEL", "error": error.name }
        res.status(400).send(toSend)
    }
})
module.exports = router