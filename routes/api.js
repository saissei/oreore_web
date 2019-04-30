const express = require('express')
const router = express.Router()
const geth = require('../lib/connect_geth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .json({ status: 'success' })
})

router.get('/accounts', function(req, res, next) {
  geth.getAccounts().then(function(_account) {
    res
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .json({ accounts: _account })
  })
})

router.post('/send-coin', async (req, res, next) => {
  const body = req.body
  geth
    .oreTransfer(body.from, body.to, body.value)
    .then(async transactionHash => {
      geth
        .getTransaction(transactionHash)
        .then(async blockNum => {
          let from_coin = await geth.OreBalance(body.from)
          let to_coin = await geth.OreBalance(body.from)

          from_coin = parseInt(from_coin._hex.replace(/^0x/, ''), 16)
          to_coin = parseInt(to_coin._hex.replace(/^0x/, ''), 16)
          const data = {
            transactionHash: transactionHash,
            from: body.from,
            to: body.to,
            from_coin: from_coin,
            send_coin: body.value,
            to_coin: to_coin
          }
          console.log(data)
          res
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .json(data)
        })
        .catch(err => {
          console.error(err)
          res
            .status(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .json({ status: 'send error' })
        })
    })
    .catch(err => {
      console.error(err)
      res
        .status(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json({ status: 'send error' })
    })
})

router.get('/balance/:id', function(req, res, next) {
  const from = req.params.id
  geth.OreBalance(from).then(resp => {
    const coin = parseInt(resp._hex.replace(/^0x/, ''), 16)
    res
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .json({ coin: coin })
  })
})

module.exports = router
