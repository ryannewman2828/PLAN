
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '769532375994-99943hp735g406q5k2ndr5336kk4lidj.apps.googleusercontent.com',
        'clientSecret'  : '9wh1qaYguzH_ktN6NClLGCr7',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};