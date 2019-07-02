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
	.sort({ dateAdded: -1 })
	.then(dbModel => res.json(dbModel))
	.catch(err => res.status(422).json(err));
})

router.get("/companies", (req, res) => {
	User.find({group: "company" })
	.select("name")
	.select("picture")
	.select("description")
	.select("_id")
	.then(dbModel => res.json(dbModel))
	.catch(err => res.status(422).json(err));
})

router.get("/userinfo", ensureAuthenticated,  (req, res) => {
	console.log(req.user);
	User.findOne({ _id: req.user._id })
		.select("-password")
		.populate("active")
		.populate("inactive")
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

router.get("/otheruser/:username", ensureAuthenticated,  (req, res) => {
	User.findOne({ username: req.params.username })
		.select("username")
		.select("dateAdded")
		.select("ratings")
		.select("picture")
		.select("description")
		.select("active")
		.select("inactive")
		.populate("active")
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

router.post('/login', function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        var userInfo = {
			username: req.user.username
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
	const { email, username, password, name, group } = req.body;
	User.findOne({ username: username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the User Name: ${username}`
			})
		}
		const newUser = new User({
			email: email,
			username: username,
			password: password,
			name: name,
			group: group
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

router.post("/adspaceupdate/:id", ensureAuthenticated, (req, res) => {
	AdSpace.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
})

router.post("/inactive/:id", ensureAuthenticated, (req, res) => {
	console.log(req.params.id)
	console.log(req.user._id)
	User.findOneAndUpdate({ _id: req.user._id },{$push: {inactive: req.params.id},$pull: {active: req.params.id}})
		.then(function() {
			return AdSpace.findOneAndUpdate({_id: req.params.id},{active: false});
		})
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
	if (req.files) {
		var file = dataUri(req).content;
		let { location, description, title } = req.body;
	  	cloudinary.uploader.upload(file, (result) => {
			AdSpace
				.create({
					picture: result.secure_url,
					description: description,
					title: title,
					location: location,
					user: req.user.username
				})
				.then(function(newAd){
							return User.findOneAndUpdate({_id: req.user._id},{ $push: {active: newAd._id}});
						})
				.then(dbModel => res.json(dbModel))
				.catch(err => res.status(422).json(err));
		});
	}else{
		res.status(404).json({msg: "No File"})
	}
});

router.post("/adPictureAdd", multerUpload, (req, res) => {
	if (req.files) {
		var file = dataUri(req).content;
		let { _id } = req.body;
	  	cloudinary.uploader.upload(file, (result) => {
			AdSpace
				.findOneAndUpdate({ _id: _id },{$push: {picture: result.secure_url}})
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
					picture: result.secure_url 
				})
				.then(dbModel => res.json(dbModel))
				.catch(err => res.status(422).json(err));
			});
	}else{
		res.status(404).json({msg: "No File"})
	}
});

	router.post("/savereview", ensureAuthenticated, (req, res) => {
		User.findOneAndUpdate({ _id: req.user._id },{ $push: {ratings: req.body}})
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	})

module.exports = router
