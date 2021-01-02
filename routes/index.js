var express = require('express');
var router = express.Router();
const google = require('../core/google.js')

router.get('/', function(req, res, next) {
  google.getCalendar(
    onSuccess = events => {
      res.render('index', { title: 'Abfalltermine Kuckswinkel', events: events.reverse() });
    },
    onError = message => console.log(message)
  )
});

module.exports = router;
