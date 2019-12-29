const router = require('express').Router();
let User = require('../database/users');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/count').get((req, res) => {
    User.count()
        .then(count => res.json(count))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/count/username/:username').get((req, res) => {
    User.count({ username: RegExp(".*" + req.params.username + ".*") })
        .then(count => res.json(count))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:page/:size/username/:username').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const offset = page > 0 ? (page - 1) * size : 0;
User.find({ username: RegExp(".*" + req.params.username + ".*")})
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:page/:size/username/:username/dob/:dob').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const dob = Number.parseInt(req.params.dob);
    const offset = page > 0 ? (page - 1) * size : 0;
User.find({ username: RegExp(".*" + req.params.username + ".*")})
        .sort({ dob: dob })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:page/:size/username/:username/gender/:gender').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const gender = Number.parseInt(req.params.gender);
    const offset = page > 0 ? (page - 1) * size : 0;
User.find({ username: RegExp(".*" + req.params.username + ".*")})
        .sort({ gender: gender })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:page/:size/username/:username/dob/:dob/gender/:gender').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const gender = Number.parseInt(req.params.gender);
    const dob = Number.parseInt(req.params.dob);
    const offset = page > 0 ? (page - 1) * size : 0;
User.find({ username: RegExp(".*" + req.params.username + ".*")})
    .sort({ gender: gender, dob: dob })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:page/:size').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const offset = page > 0 ? (page - 1) * size: 0;
    User.find()
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:page/:size/dob/:dob').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const dob = Number.parseInt(req.params.dob);
    const offset = page > 0 ? (page - 1) * size: 0;
    User.find()
        .sort({ dob: dob })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:page/:size/gender/:gender').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const gender = Number.parseInt(req.params.gender);
    const offset = page > 0 ? (page - 1) * size: 0;
    User.find()
        .sort({ gender: gender })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:page/:size/dob/:dob/gender/:gender').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const gender = Number.parseInt(req.params.gender);
    const dob = Number.parseInt(req.params.dob);
    const offset = page > 0 ? (page - 1) * size: 0;
    User.find()
        .sort({ gender: gender, dob: dob })
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:page/:size').get((req, res) => {
    const page = Number.parseInt(req.params.page);
    const size = Number.parseInt(req.params.size);
    const offset = page > 0 ? (page - 1) * size: 0;
    User.find()
        .skip(offset)
        .limit(size)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
    const username = req.body.username;
    const gender = req.body.gender;
    const dob = Date.parse(req.body.dob);
    const news = req.body.news;
    const email = req.body.email;
    const photo = req.body.photo;
    const newUser = new User({
        username,
        gender,
        dob,
        news,
        email,
        photo
     });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
             user.username = req.body.username;
             user.gender = req.body.gender;
             user.dob = Date.parse(req.body.dob);
             user.news = req.body.news;
             user.email = req.body.email;
             user.photo = req.body.photo;
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;