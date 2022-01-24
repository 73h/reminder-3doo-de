const telegram = require('../core/telegram.js')
const google = require('../core/google.js')

function sendMessage(message_text) {
  const ids = process.env.TELEGRAM_CHAT_IDS.split('|')
  ids.forEach(id => {
    telegram.sendMessage(
      chat_id = id,
      message_text = message_text,
      onSuccess = null,
      onError = message => console.log(message)
    )
  })
}


Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

console.log('h73')
google.getCalendar(
  onSuccess = events => {
    const now = new Date().addDays(1)
    events.forEach(event => {
      if (now >= event.start && now <= event.end) {
        console.log(event.summary)
        let color = telegram.icons.warning
        color = (event.summary == 'Papiertonne' ? telegram.icons.blue : color)
        color = (event.summary == 'Pappe/Papier' ? telegram.icons.blue : color)
        color = (event.summary == 'Leichtverpackung' ? telegram.icons.yellow : color)
        color = (event.summary == 'Leichtstoffverpackungen' ? telegram.icons.yellow : color)
        color = (event.summary == 'Hausmüll' ? telegram.icons.black : color)
        sendMessage(`${telegram.icons.garbage} ${color} Morgen wird ${event.summary} abgeholt.`)
      }
    })
  },
  onError = message => console.log(message)
)
