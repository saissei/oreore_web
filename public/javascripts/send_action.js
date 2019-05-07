$(function() {
  $('.send').on('click', function() {
    $('.send').prop('disabled', true)
    const _from = $('#from_list').val()
    const _to = $('#to_list').val()
    const _value = $('#value').val()
    axios
      .post('/api/send-coin', { from: _from, to: _to, value: _value })
      .then(resp => {
        $('#report').empty()
        $('#report').append($('#report-tmpl').render(resp.data))
        $('#detail').show()
        $('.send').prop('disabled', false)
      })
      .catch(err => {
        $('#error-message').text('送金処理時にエラーが発生しました。')
        $('#has-error').show()
        $('.send').prop('disabled', false)
      })
  })

  $('.detail').on('click', function() {
    $('#summery').show()
  })
})
