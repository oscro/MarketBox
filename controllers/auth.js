const express = require("express")
const router = express.Router()
const User = require("../models")
const passport = require("../passport")

router.get("/user", (req, res, next) => {
	console.log("===== user!!======")
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	"/login",
	function(req, res, next) {
		console.log(req.body)
		console.log("================")
		next()
	},
	passport.authenticate("local"),
	(req, res) => {
		console.log("POST to /login")
		const user = JSON.parse(JSON.stringify(req.user))
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
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
	
	User.findOne({ "local.email": email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the Email: ${email}`
			})
		}
		const newUser = new User({
			"local.email": email,
            "local.password": password,
            "local.name" : name
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

module.exports = router
