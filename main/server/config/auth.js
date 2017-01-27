
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1205881466126614',
        'clientSecret'  : '5a14e10a1fd5c3a63e0b64cfaeb76855',
        'callbackURL'   : 'http://localhost:3000/api/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '769532375994-99943hp735g406q5k2ndr5336kk4lidj.apps.googleusercontent.com',
        'clientSecret'  : '9wh1qaYguzH_ktN6NClLGCr7',
        'callbackURL'   : 'http://localhost:3000/api/auth/google/callback'
    }

};