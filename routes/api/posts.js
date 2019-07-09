const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Texte est requis')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                msg: 'Article non trouvé'
            });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Article non trouvé'
            });
        }
        res.status(500).send('Server Error');
    }
});
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                msg: 'Article non trouvé'
            });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User n&#130 a pas les droits'
            });
        }

        await post.remove();

        res.json({
            msg: 'Messaage supprimé'
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Article non trouvé'
            });
        }
        res.status(500).send('Server Error');
    }
});
// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({
                msg: 'Vous aimez déjà article'
            });
        }

        post.likes.unshift({
            user: req.user.id
        });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    // @route    PUT api/posts/unlike/:id
    // @desc     Like a post
    // @access   Private
    router.put('/unlike/:id', auth, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            // Verifie si le post est déjaa aimé 
            if (
                post.likes.filter(like => like.user.toString() === req.user.id).length ===
                0
            ) {
                return res.status(400).json({
                    msg: 'Article n&#130est pas encore aimé'
                });
            }

            // Get remove index
            const removeIndex = post.likes
                .map(like => like.user.toString())
                .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);

            await post.save();

            res.json(post.likes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Le texte est obligatoire')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // extraire le commentaire 
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );

        // s'assure que le commentaire est existant 
        if (!comment) {
            return res.status(404).json({
                msg: 'Le commentaire nexiste pas '
            });
        }

        // verifie l'user 
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Utilisateur non autorisé'
            });
        }

        // Efface l'index
        const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;