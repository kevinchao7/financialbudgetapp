var twilio = require('twilio');

var accountSid = 'AC420298e162f40cf5ecf6efacc17feda5'; // Your Account SID from www.twilio.com/console
var authToken = 'eb6becc51ba43ee427476dbe791fd54d';   // Your Auth Token from www.twilio.com/con
const client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+18185718482',
    from: '+13237460826'
})
.then((message) => console.log('msgid: ', message.sid));
