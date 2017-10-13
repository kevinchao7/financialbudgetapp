var twilio = require('twilio');
var express = require('express');

var app = express();
var accountSid = 'AC420298e162f40cf5ecf6efacc17feda5'; // Your Account SID from www.twilio.com/console
var authToken = 'eb6becc51ba43ee427476dbe791fd54d';   // Your Auth Token from www.twilio.com/console

// var client = new twilio(accountSid, authToken);
app.get("/messages/", function(req, res){
  var twilio = require('twilio')(accountSid, authToken);
  twilio.messages.create({
    body: 'Exhausted 80% of your flexible spending. Bitch.',
    to: '+18185718482',  // Text this number
    from: '+13237460826' // From a valid Twilio number
  })
  .then((message) =>{
    console.log(message);
  })
});


app.listen(3000, function() {
  console.log("listening on 3000");
});
