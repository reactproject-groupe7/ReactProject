const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');
// @route POST api/users
// @desc Test route 
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

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        
        res.send('User route');
    }
);


module.exports = router;