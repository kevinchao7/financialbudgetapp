const randomString = require('randomstring');
module.exports = {
  google : {
    clientID: '393852577124-du4hrae8odanu37sh8cgacmhk3hmolvg.apps.googleusercontent.com',
    clientSecret: 'n5jR3BfnGWOmsU4U0w-bno5S',
    callbackURL: "https://financialbudgetapp.herokuapp.com/auth/google/callback"
    // callbackURL: "http://localhost:8080/auth/google/callback"
  },
  SENDGRID_API_KEY : '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',
  session_key : randomString.generate()
}
