const express = require('express')
const authRoutes = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')


authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({message: "Something went wrong authenticating user"})
            return
        }
        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({message: "Session save went bad."})
                return
            }
            res.status(200).json(theUser)
        })
    })(req, res, next)
})

authRoutes.post('/signup', (req, res, next) => {
    const { username, password, campus, course } = req.body

    if (!username || !password) {
        res.status(400).json({message: "Provide username and password"})
        return
    }
    if (password.length < 6) {
        res.status(400).json({message: "Password must have at least 7 characters"})
        return
    }
    User.findOne({username}, (err, foundUser) => {
        if (err) {
            res.status(500).json({message: "Username check went bad."})
            return
        }
        if (foundUser) {
            res.status(400).json({message: "Username taken. Choose another one."})
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        User.create({
            username,
            password: hashPass,
            campus,
            course
        }, (err, newUser) => {
            if (err) {
                res.status(500).json({message: "Saving user to database went wrong"})
            }

            req.login(newUser, (err) => {
                if (err) {
                    res.status(500).json({message: "Login after signup went bad."})
                    return
                }
                res.status(200).json(newUser)
            })
        })
    })
})


authRoutes.post('/edit', (req, res, next) => {
    const { id, username, campus, course } = req.body

    if (!id) {
        res.status(500).json({message: "id is required"})
        return
    }

    User.findByIdAndUpdate(id, {
        username,
        campus,
        course
    } ,{new: true}, (err, userUpdated) => {
        if (err) {
            res.status(500).json({message: "Something went wrong when update user."})
        }
        res.status(200).json(userUpdated)
    })
})

authRoutes.post('/logout', (req, res, next) => {
    req.logout()
    res.status(200).json({message: "Log out success!"})
})

authRoutes.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return
    }
    res.status(403).json({message: "Unauthorized"})
})

authRoutes.post('/upload', (req, res, next) => {
    const { imageURL, id } = req.body

    if (!id) {
        res.status(500).json({message: "id is required"})
        return
    }

    User.findByIdAndUpdate(id, {
        imageURL
    } ,{new: true}, (err, userUpdated) => {
        if (err) {
            res.status(500).json({message: "Something went wrong when update user."})
        }
        res.status(200).json(userUpdated)
    })
})
module.exports = authRoutes