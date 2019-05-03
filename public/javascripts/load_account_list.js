$(function() {
  axios.get('/api/accounts').then(item => {
    const accounts = item.data.accounts.map(_ac => ({ id: _ac }))
    $('#from_list').append($('#opt-tmpl').render(accounts))
    $('#to_list').append($('#opt-tmpl').render(accounts))
  })
})
