var request = require('request');
var url = 'https://api.sendgrid.com/v3/alerts'

request(url, function(error, response, body){
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body);
});


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'ashkanmaherbus@gmail.com',
  from: 'shuss002@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

// Get Alerts
function getAlert( ){

  var options = { method: 'GET',
  url: 'https://api.sendgrid.com/v3/alerts',
  headers: { authorization: 'Bearer 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' },
  body: 'null' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}


// to create an alert
/*
var options = { method: 'POST',
  url: 'https://api.sendgrid.com/v3/alerts',
  headers:
   { 'content-type': 'application/json',
     authorization: 'Bearer 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' },
  body:
   { type: 'usage_limit',
     email_to: 'ashkanmaherbus@gmail.com',
     percentage: 80,
     frequency: 'daily' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/


getAlert();
