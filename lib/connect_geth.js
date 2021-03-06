require('dotenv').config()
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || process.env.url)
const contract_addr = process.env.contract_addr
const abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_supply',
        type: 'uint256'
      },
      {
        name: '_name',
        type: 'string'
      },
      {
        name: '_symbol',
        type: 'string'
      },
      {
        name: '_decimals',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]
const OreCoin = new web3.eth.Contract(abi, contract_addr)

/** 送金・残高確認時に使用するアカウントリストの取得 */
exports.getAccounts = async () => {
  return await web3.eth.getAccounts()
}

/** 引数アドレスの残高チェック */
exports.OreBalance = async _address => {
  return await OreCoin.methods.balanceOf(_address).call()
}

/** 送金の実行 */
exports.oreTransfer = async (_from, _to, _value) => {
  web3.eth.defaultAccount = _from
  return await new Promise((resolve, reject) => {
    OreCoin.methods
      .transfer(_to, _value)
      .send({ from: _from }, (error, transactionHash) => {
        if (error) {
          reject(error)
        } else {
          resolve(transactionHash)
        }
      })
  })
}

exports.getTransaction = async _hash => {
  return await Scroll(_hash)
}

/** blockNumberが発行されるまで再帰実行 */
const Scroll = async _hash => {
  const result = await web3.eth.getTransaction(_hash)

  if (
    !result.blockNumber ||
    result.blockNumber === null ||
    result.blockNumber === undefined
  ) {
    return await Scroll(_hash)
  }
  return result.blockNumber
}
