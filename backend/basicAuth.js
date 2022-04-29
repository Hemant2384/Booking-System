function authUser(req, res, next) {
    if (req.body == null) {
        res.status(403).json({message:"You need to sign in"});
    }

    next()
}

function authRole(role) {
    return (req, res, next) => {
        if (req.body.role !== role) {
            res.status(401).json({message:"Not allowed"});
        }

        next()
    }
}

module.exports = {
    authUser,
    authRole
}