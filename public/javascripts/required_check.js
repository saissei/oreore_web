$(function() {
  $('form input,select').on('change', function() {
    const from = $('#from_list').val()
    const to = $('#to_list').val()
    const value = $('#value').val()

    const errors = []

    if (!from) {
      errors.push({ message: '送金元が選択されていません' })
    }

    if (!to) {
      errors.push({ message: '送金先が選択されていません' })
    }

    if (from && to && from === to) {
      errors.push({ message: '同一アドレス間での送金には対応していません。' })
    }

    if (!value) {
      errors.push({ message: '送金額を入力してください' })
    }

    /**
     * - 全て選択済み、入力済み時, sendボタン有効化
     * - エラーがあった場合の出力
     */
    if (errors.length === 0) {
      $('#has-error').hide()
      $('#error-message').empty()
      $('.send').prop('disabled', false)
    } else {
      $('#has-error').hide()
      $('#error-message').empty()
      $('.send').prop('disabled', true)

      $('#error-message').append($('#error-tmpl').render(errors))
      $('#has-error').show('slow')
    }
  })
})
