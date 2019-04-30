const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user)
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('DEserialize ... called')
	User.findOne(
		{ _id: id },
		'email',
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport