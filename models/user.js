const SALTY_BITS = 10;

var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),

    UserSchema = new mongoose.Schema({

        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String,
        created: {
         type: Number,
            required: true,
            default: () => Date.now()
        }
    });

    UserSchema.pre('save', function(next) {
        var user = this;

        if( !user.isModified('password') ) {
        return next();
    }

    bcrypt.genSalt(SALTY_BITS, (saltErr, salt) => {
        if(saltErr) {
            return next(saltErr);
        }

        console.info('SALT generated!', salt)

        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                return next("Sorry, user generation error!", hashErr);
            }
                      user.password = hashedPassword;
            next();
        });
    });
});
module.exports = mongoose.model('User', UserSchema);