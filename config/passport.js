var GoogleStrategy = require('passport-google-oauth2').Strategy;
var keys = require('./keys.js');


module.exports = (passport, clients) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


  passport.use(new GoogleStrategy({
      clientID     : keys.google.clientID,
      clientSecret : keys.google.clientSecret,
      callbackURL  : keys.google.callbackURL
    },
    (request, accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        clients.findOne({
          where: {
            'google_id': profile.id
          }
        }).then((user)=>{
          if (user){
            return done(null, user);
          }
          else {
            // Creates new user
            var newUser = {
              google_id : profile.id,
              email : profile.email,
              client_name : capFL(profile.name.givenName) + ' ' + capFL(profile.name.familyName)
            };
    				clients.create(newUser).then((addedUser,created)=>{
              if (!addedUser) {
                  return done(null, false);
              }
              if (addedUser) {
                  return done(null, addedUser);
              }
            });
          }

        });
      });
    }
  ));
};

function capFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    // return done(JSON.stringify(profile._json,null,4));
