const axios = require('axios')

exports.icons = {
  garbage: '\ud83d\uddd1',
  warning: '\u26a0\ufe0f',
  black: '\u26ab\ufe0f',
  blue: '\ud83d\udd35',
  yellow: '\ud83d\udfe1'
}

exports.sendMessage = function (chat_id, message_text, onSuccess, onError) {
  const url = 'https://api.telegram.org/bot'+process.env.TELEGRAM_TOKEN+'/'
  axios.post(url+'sendMessage', {
    chat_id: chat_id,
    text: message_text
  })
  .then(res => {
    if (res.status == 200) {
      if (res.data.ok) {
        message = res.data.result
        if (onSuccess) onSuccess(message)
      } else {
        const message = res.data
        if (onError) onError(message)
      }
    } else {
      const message = `statusCode: ${res.status}, statusText: ${res.statusText}`
      if (onError) onError(message)
    }
  })
  .catch(error => {
    const message = error.response.data
    if (onError) onError(message)
  })
}