$(function() {
  $('form input,select').on('change', function() {
    let require_flag = true
    let msg
    const from = $('#from_list').val()
    const to = $('#to_list').val()
    const value = $('#value').val()
    if (!from) {
      require_flag = false
    }
    if (!to) {
      require_flag = false
    }
    if (!value) {
      require_flag = false
    }
    if (from === to) {
      require_flag = false
      msg = '送金元と送金先のアドレスが同一です。'
    }

    if (require_flag) {
      $('#has-error').hide()
      $('.send').prop('disabled', false)
    } else {
      $('#has-error').hide()
      $('.send').prop('disabled', true)
      if (msg) {
        $('#error-message').text(msg)
        $('#has-error').show('slow')
      }
    }
  })
})
