$(function() {
  $('form input,select').on('change', function() {
    let flag = true
    let _from = $('#from_list').val()
    let _to = $('#to_list').val()
    let _value = $('#value').val()
    if (_from === '' || _to === '' || _value === '' || _from === _to) {
      flag = false
    }
    if (flag) {
      $('.send').prop('disabled', false)
      $('#has-error').hide('slow')
    } else {
      $('.send').prop('disabled', true)
      $('#error-message').text('送金元と送金先のアドレスが同一です。')
      $('#has-error').show('slow')
    }
  })
})
