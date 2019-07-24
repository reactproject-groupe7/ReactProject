const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require('express-validator');
const User = require('../../models/User');


// @route POST api/users
// @desc Register user
// @access Public

router.post(
    "/",

    [
        check('name', 'Le nom est obligatoire ')
        .not()
        .isEmpty(),
        check('email', 'Veuillez insérer un email valide').isEmail(),
        check(
            'password',
            'Veuillez entrer un mot de passe de plus de 5 characters '
        ).isLength({
            min: 5
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            email,
            password
        } = req.body;
        try {
            // verifie si l'user exist
            let user = await User.findOne({
                email
            });
            if (user) {
                res.status(400).json({
                    errors: [{
                        msg: 'Utilisateur déja existant'
                    }]
                });
            }
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })


            // eencrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 360000

                },
                (err, token) => {
                    if (err) throw err;

                    res.json({
                        token
                    });
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');

        }


    }
);

module.exports = router;
