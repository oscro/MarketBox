const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("../passport")

router.get("/user", (req, res, next) => {
	console.log("===== user!!======")
	console.log(req)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
    '/login',
    function (req, res, next) {
        
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
			username: req.user.email
        };
        res.send(userInfo);
    }
)

router.post("/logout", (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie("connect.sid")
		return res.json({ msg: "logging you out" })
	} else {
		return res.json({ msg: "no user to log out!" })
	}
})

router.post("/signup", (req, res) => {
	const { email, password } = req.body
	
	User.findOne({ email: email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the Email: ${email}`
			})
		}
		const newUser = new User({
			email: email,
            password: password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			res.json(savedUser)
		})
	})
})

module.exports = router
