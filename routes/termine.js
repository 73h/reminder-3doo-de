var express = require('express');
const { response } = require('../app.js');
var router = express.Router();
const google = require('../core/google.js')

/* GET termine listing. */
router.get('/', function(req, res, next) {
  google.getCalendar(
    onSuccess = events => {
      let responseObject = []
      const now = new Date()
      events.reverse().forEach(event => {
        if (now < event.start) {
          if (responseObject.length < 5) {
            let start = event.start.toLocaleString('en-US', {
              day: "2-digit",
              month: '2-digit',
              year: 'numeric'
            }).replace(/\//g,'.')
            responseObject.push(`${event.summary} am ${start}`)
          }
        }
      });
      res.send("Die nächsten fünf Abholtermine sind:\r\n\r\n"+responseObject.join("\r\n"));
    },
    onError = message => console.log(message)
  )
});

module.exports = router;
