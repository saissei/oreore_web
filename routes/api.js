const express = require('express');
const router = express.Router();
const geth = require('../public/javascripts/nodejs/connect_geth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).header('Content-Type', 'application/json; charset=utf-8').json({status: "success"});
});

router.get('/accounts', function(req, res, next){
  geth.getAccounts().then(function(_account){
    res.status(200).header('Content-Type', 'application/json; charset=utf-8').json({accounts: _account});
  })
})

router.post('/send-coin', function(req, res, next){
  const body = req.body;
  console.log(body);
  geth.connector().methods.transfer(body.to, body.value).send({
    from: body.from
  }, (error, transactionHash) => {
    if(error){ console.log(error); process.exit() };

    geth.getTransaction(transactionHash)
    .then(blockNum => {
      geth.OreBalance(body.from)
      .then(from_oc => {
        geth.OreBalance(body.to)
        .then(to_oc => {


          const from_coin = parseInt((from_oc._hex).replace(/^0x/, ''), 16);
          const to_coin = parseInt((to_oc._hex).replace(/^0x/, ''), 16);
          const data = {
            transactionHash: transactionHash,
            from: body.from,
            to: body.to,
            from_coin: from_coin,
            send_coin: body.value,
            to_coin: to_coin
          }
          console.log(data);
          res.status(200).header('Content-Type', 'application/json; charset=utf-8').json(data);
        })
        .catch(err => {
          console.error(err)
          res.status(400).header('Content-Type', 'application/json; charset=utf-8').json({status: 'send error'});
        })
      })
      .catch(err => {
        console.error(err)
        res.status(400).header('Content-Type', 'application/json; charset=utf-8').json({status: 'send error'});
      })
    })
    .catch(err => {
      console.error(err)
      res.status(400).header('Content-Type', 'application/json; charset=utf-8').json({status: 'send error'});
    })
  })
});

router.get('/balance/:id', function(req, res, next){
  const from = req.params.id;
  geth.OreBalance(from)
  .then(resp => {
    const coin = parseInt((resp._hex).replace(/^0x/, ''), 16)
    res.status(200).header('Content-Type', 'application/json; charset=utf-8').json({coin: coin});
  })
})

module.exports = router;
