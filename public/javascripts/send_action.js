$(function() {
  $('.send').on('click', function() {
    const _from = $('#from_list').val()
    const _to = $('#to_list').val()
    const _value = $('#value').val()
    axios
      .post('/api/send-coin', { from: _from, to: _to, value: _value })
      .then(resp => {
        $('#report').empty()
        $('#report').append($('#report_tmpl').render(resp.data))
        $('#detail').show('slow')
      })
      .catch(err => {
        $('#error-message').text(
          '送金処理時にエラーが発生しました。ログを確認して下さい。'
        )
        $('#has-error').show('slow')
      })
  })

  $('.detail').on('click', function() {
    $('#summery').show()
  })
})
