const axios = require('axios')
const ical = require('ical')

exports.getCalendar = function (onSuccess, onError) {
  calender_url = process.env.GOOGLE_CALENDAR_URL
  axios.get(calender_url)
  .then(res => {
    if (res.status == 200) {
      const data = ical.parseICS(res.data)
      const events = []
      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          var event = data[k];
          if (data[k].type == 'VEVENT') {
            events.push(event)
          }
        }
      }
      if (onSuccess) onSuccess(events)
    } else {
      const message = `statusCode: ${res.status}, statusText: ${res.statusText}`
      if (onError) onError(message)
    }
  })
  .catch(error => {
    const message = error
    if (onError) onError(message)
  })
}
