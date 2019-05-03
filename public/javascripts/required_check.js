$(function() {
  $('form input,select').on('change', function() {
    /** 入力値の取得 */
    const from = $('#from_list').val()
    const to = $('#to_list').val()
    const value = $('#value').val()

    /** required未入力、その他不正時の出力エラー配列 */
    let errors = []

    /** 送金元未選択時 */
    if (!from) {
      errors.push({ message: '送金元が選択されていません' })
    }

    /** 送金先未選択時 */
    if (!to) {
      errors.push({ message: '送金先が選択されていません' })
    }

    /** 送金元・送金先選択済み 同一アドレス間の送金チェック */
    if (from && to && from === to) {
      errors.push({ message: '同一アドレス間での送金には対応していません。' })
    }

    /** 送金額未入力 */
    if (!value) {
      errors.push({ message: '送金額を入力してください' })
    }
    console.log(errors)

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
