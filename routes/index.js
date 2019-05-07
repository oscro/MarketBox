const express = require("express");
const router = express.Router();
const User = require("../models/user");
const AdSpace = require("../models/adSpace");
const passport = require("../passport");
const { ensureAuthenticated } = require('../passport/auth');
const cloudinary = require('cloudinary');
const multer = require("multer");
const Datauri = require('datauri');
const path = require('path');

//Image upload middleware and buffer converter
const storage = multer.memoryStorage();
const multerUpload = multer(storage).array("file");
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.files[0].originalname).toString(), req.files[0].buffer);

router.get("/user", (req, res) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.get("/user/adspaces", (req, res) => {
	AdSpace.find({ })
	.then(dbModel => res.json(dbModel))
	.catch(err => res.status(422).json(err));
})

router.get("/userinfo", ensureAuthenticated,  (req, res) => {
	User.findOne({ _id: req.user._id })
		// .select("-password")
		.populate("adSpace")
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

router.post('/login', function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
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
	const { email, password, name, group } = req.body;
	User.findOne({ email: email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the Email: ${email}`
			})
		}
		const newUser = new User({
			email: email,
			password: password,
			name: name,
			group, group
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			res.json(savedUser)
		})
	})
})

router.post("/user", ensureAuthenticated, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, req.body)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

router.post("/adspace", ensureAuthenticated, (req, res) => {
	AdSpace.create(req.body)
		.then(function(newAdSpace){
			return User.findOneAndUpdate({_id: req.user._id},{$push: {adSpace: newAdSpace._id}});
		})
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

// POST route for saving a new picture
router.post("/upload", multerUpload, (req, res) => {
	console.log(req.body)
	if (req.files) {
		var file = dataUri(req).content;
		let { location, description, title } = req.body;
		console.log(location)
	  cloudinary.uploader.upload(file, (result) => {
			AdSpace
				.create({
				picture: result.secure_url,
				description: description,
				title: title,
				location: location,
				})
				.then(function(newAd){
							return User.findOneAndUpdate({_id: req.user._id},{ $push: {adSpace: newAd._id}});
						})
				.then(dbModel => res.json(dbModel))
				.catch(err => res.status(422).json(err));
			});
	}else{
		res.status(404).json({msg: "No File"})
	}
	});
	
	router.post("/profilePic", multerUpload, (req, res) => {
		if (req.files) {
			var file = dataUri(req).content;
			cloudinary.uploader.upload(file, (result) => {
				User.findOneAndUpdate({
					 _id: req.user._id 
					},{
					picture: result.secure_url,
					})
					.then(dbModel => res.json(dbModel))
					.catch(err => res.status(422).json(err));
				});
		}else{
			res.status(404).json({msg: "No File"})
		}
		});

module.exports = router
