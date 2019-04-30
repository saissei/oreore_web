# OreOreCoin UI

## How to install

- ライブラリのインストール

```
$ npm i
```

- 環境設定

```
$ touch .env
```

.envには以下を設定してください。

- url（OreOreContractをデプロイした先を http:// から記載してください）
- contract_address（デプロイ先から引っ張ってきてください）

---

## OreOreCoin

- テストではgethのバージョンは `v1.8.14` を使用しています。
- Node.jsは `v10` を使用しています。

コントラクトは以下をコンパイルしたものを使用する想定です。

```
pragma solidity >=0.4.24;

contract OreOreCoin {
    //トークンの名前
    string public name;
    //トークンの単位
    string public symbol;
    //小数点以下の桁数
    uint8 public decimals;
    //トークンの総量
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    //イベント通知
    event Transfer(address indexed from, address indexed to, uint256 value);

    //コンストラクタ
    constructor (uint256 _supply, string memory _name, string memory _symbol, uint8 _decimals) public {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
    }
    //送金
    function transfer(address _to, uint256 _value) public {
        //require(balanceOf[msg.sender] > _value);
        //require(balanceOf[_to] + _value < balanceOf[_to]);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
    }
}
```

## その他

ここまでの参考やgethのインストール方法などについてはあとで追記予定