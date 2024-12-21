const user = require('../db/models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Controller for user signup
const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;

     
        if (!firstName || !lastName || !email || !password || !userType) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate userType (0-admin, 1-buyer,2-seller)
        if (!['0', '1', '2'].includes(userType)) {
            return res.status(400).json({ message: "Invalid user type." });
        }

        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

 
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType,
            createdAt: new Date(),
            updatedAt: new Date(),
        });


        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, userType: newUser.userType },
            process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: '9D' } // Token expiration time
        );
       
        // Send success response with the token
        res.status(201).json({
            message: "User successfully registered.",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                userType: newUser.userType,
            },
            token, // Send the JWT token to the client
        });
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the next middleware
    }
};

const login = async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const existingUser=await user.findOne({where:{email:email}});
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const passwordMatch=await bcrypt.compare(password,existingUser.password);
        if(!passwordMatch){
            return res.status(400).json({message:"Password Not matched"});
        }
     const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET, // Make sure this is set in your .env file
      { expiresIn: '9D' } // Token expiry time
    );

    // Send the response
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        userType: existingUser.userType
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

const authentication = async (req, res, next) => {
    try {
        let idToken = '';
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            idToken = req.headers.authorization.split(' ')[1];
        }
        if (!idToken) {
            return res.status(401).json({message:"Please login to get access"});
        }

        const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET);

        const freshUser = await user.findByPk(tokenDetail.id);

        if (!freshUser) {
            return res.status(400).json({message:"User no longer exists"});
        }

        req.user = freshUser;
        return next();
    } catch (err) {
        next(err);
    }
};

const restrictTo = (...userType) => {
    const checkPermission = async (req, res, next) => {
        try {
            // Check if the user's type is allowed
            if (!userType.includes(req.user.userType)) {
                // Return a 403 status code with a message if permission is denied
                return res.status(403).json({
                    status: 'fail',
                    message: "You don't have permission to perform this action",
                });
            }
            // If userType matches, allow the request to proceed
            return next();
        } catch (error) {
            // Catch any errors and return a 500 status code
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'An unexpected error occurred',
            });
        }
    };

    return checkPermission;
};

module.exports = { signup, login, authentication, restrictTo };

