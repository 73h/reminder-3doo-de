var express = require('express');
const { response } = require('../app.js');
var router = express.Router();
const google = require('../core/google.js')

/* GET termine listing. */
router.get('/', function(req, res, next) {
  google.getCalendar(
    onSuccess = events => {
      let five_events = []
      const now = new Date()
      events.reverse().forEach(event => {
        if (now < event.start) {
          if (five_events.length < 5) {
            let start = event.start.toLocaleString('de-DE', {
              day: "2-digit",
              month: '2-digit',
              year: 'numeric'
            }).replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/,'$3.$2.$1')
            five_events.push(`${event.summary} am ${start}`)
          }
        }
      });
      responseObject = {'five_dates': "Die nächsten fünf Abholtermine sind:\r\n\r\n"+five_events.join("\r\n")}
      res.send(responseObject);
    },
    onError = message => console.log(message)
  )
});

module.exports = router;
