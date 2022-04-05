const express = require("express")
const signale = require("signale")
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
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }

})

//b) Show a specific user 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            signale.error("user not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" }
            )
        }
        else {
            res.status(200).send(user)
        }
    } catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
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
        res.status(201).send({ "code": 201, "method": "POST", "message": "Created" })

    }


    catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "PUT", "message": error.name })

    }


})

//d) Update a user
router.put("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            signale.error("Not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" })
        }

        else {
            if (req.body.name) {
                user.name = req.body.name
            }
            if (req.body.age) {
                user.age = req.body.age
            }
            await user.save()
            res.status(200).send({ "code": 200, "method": "PUT", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "PUT", "message": error.name })

    }

})

//e) Delete a user

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send({ "code": 404, "method": "DEL", "message": "Not found" })
        }
        else {
            user.delete()
            res.status(200).send({ "code": 200, "method": "DEL", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "DEL", "message": error.name })
    }
})

module.exports = router