import Web3 from "web3";

// huiwanUsdtLoopABI
import huiwanUsdtLoopABI from "@/apis/abi/huiwanUsdtLoop.abi";
// 智能合约ABI
import hackerFederationABI from "@/apis/abi/hackerFedera.abi";
// he1 ABI
import heOneABI from "@/apis/abi/he1.abi";
// he3ABI
import heThreeABI from "@/apis/abi/he3.abi";

const huiwanUsdtLoopAddr = "0x99E55a7b443F1D09e1Eb672cAA3cB605B1b7bda7";
//智能合约地址
const hackerFederation = "0x78B5F11Be89100c494505e8a88bbF732918D050e";
//HE1代币智能合约地址
const heOneToken = "0xf66D46aC86648aD8c874639A4889f6b42ebb2D20";
//HE3代币智能合约地址
const heThreeToken = "0x83Bf38C2F8AC0B71DAf82ce5581895784bB02458";

//合约管理员地址
const rootAddress = "0x1F06A0E4aCEB2378b7F8c97c0a90048407671Cc8";
//合约顶点地址
const peakAddress = "0x1F06A0E4aCEB2378b7F8c97c0a90048407671Cc8";
//代币销毁地址
const destroyAddress = "0x1F06A0E4aCEB2378b7F8c97c0a90048407671Cc8";

// //智能合约地址
// const hackerFederation = "0x1f68EFcd31234fB962afaca077877FfD365A14c9";
// //HE1代币智能合约地址
// const heOneToken = "0x2c701cC2644A3CC2C8a4AB70A19c5046e040aD6F";
// //HE3代币智能合约地址
// const heThreeToken = "0x552426a7986E24c4a91DcDc10578580c58a9b1fa";
//
// //合约管理员地址
// const rootAddress = "0x34a954e7540858cdf6b4980e259fd24d3e21a5b4";
// //合约顶点地址
// const peakAddress = "0x3585762fbff4b2b7d92af16b2bcfa90fe3562087";
// //代币销毁地址
// const destroyAddress = "0xc206f4cc6ef3c7bd1c3aade977f0a28ac42f3e37";

var hackerContract;
var heOneContract;
var heThreeContract;
var huiwanUsdtLoopContract;

function init(callback) {
    setTimeout(function() {
        if (typeof window.ethereum === "undefined") {
            alert("Looks like you need a Dapp browser to get started.");
            alert("Consider installing MetaMask!");
        } else {
            //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
            ethereum
                .enable()
                //如果用户拒绝了登录请求
                .catch(function(reason) {
                    if (reason === "User rejected provider access") {
                        // 用户不想登录，你看该怎么办？
                    } else {
                        // 本不该执行到这里，但是真到这里了，说明发生了意外
                        alert("There was an issue signing you in.");
                    }
                })
                //如果用户同意了登录请求，你就可以拿到用户的账号
                .then(function(accounts) {
                    //创建web3对象;
                    window.web3 = new Web3(ethereum);
                    // 创建合约
                    hackerContract = new web3.eth.Contract(
                        hackerFederationABI,
                        hackerFederation
                    );

                    heOneContract = new web3.eth.Contract(heOneABI, heOneToken);
                    heThreeContract = new web3.eth.Contract(heThreeABI, heThreeToken);
                    huiwanUsdtLoopContract = new web3.eth.Contract(huiwanUsdtLoopABI, huiwanUsdtLoopAddr);

                    window.accountAddress = accounts[0];
                    callback(accounts[0]);
                });
        }
    }, 500);
}

function getInitreward() {
    console.log(1111);
    // huiwanUsdtLoopContract.methods
    //     .initreward()
    //     .call(function(error, res) {
    //         if (error) {
    //             errorCallBack(handleError(error));
    //         } else {
    //             console.log("chunqizhi");
    //             callback(res);
    //         }
    //     });
}

// 购买HE3算力
function buyHeThreeHashrate(token, account, callback, errorCallBack) {
    let num = web3.utils.toWei(token.toString(), "ether").toString();
    let data = hackerContract.methods
        .buyHashRateWithHE3(num, account)
        .encodeABI();
    sendTransfer(accountAddress, hackerFederation, data, callback, errorCallBack);
}

// 授权HE1
function HeOneRoot(callback, errorCallBack) {
    let data = heOneContract.methods
        .approve(hackerFederation, web3.utils.toWei("210000000"))
        .encodeABI();
    sendTransfer(accountAddress, heOneToken, data, callback, errorCallBack);
}

// 授权HE3
function HeThreeRoot(callback, errorCallBack) {
    let data = heThreeContract.methods
        .approve(hackerFederation, web3.utils.toWei("210000000"))
        .encodeABI();
    sendTransfer(accountAddress, heThreeToken, data, callback, errorCallBack);
}

// 购买HE1算力
function buyHeOneHashrate(token, account, callback, errorCallBack) {
    console.log(account);
    console.log(token);
    let num = web3.utils.toWei(token.toString(), "ether").toString();
    let data = hackerContract.methods
        .buyHashRateWithHE1(num, account)
        .encodeABI();
    sendTransfer(accountAddress, hackerFederation, data, callback, errorCallBack);
}

// 查HE3授权数量
function getRootNumT(callback, errorCallBack) {
    heThreeContract.methods
        .allowance(accountAddress, hackerFederation)
        .call(function(error, res) {
            if (error) {
                errorCallBack(handleError(error));
            } else {
                callback(res);
            }
        });
}

// 查HE1授权数量
function getRootNum(callback, errorCallBack) {
    heOneContract.methods
        .allowance(accountAddress, hackerFederation)
        .call(function(error, res) {
            if (error) {
                errorCallBack(handleError(error));
            } else {
                callback(res);
            }
        });
}

// 获取账户HE3余额
function getHeOneNum(account, callback, errorCallBack) {
    heOneContract.methods.balanceOf(account).call(function(error, res) {
        if (error) {
            errorCallBack(handleError(error));
        } else {
            callback(res);
        }
    });
}

// 获取账户HE1余额
function getHeThreeNum(account, callback, errorCallBack) {
    heThreeContract.methods.balanceOf(account).call(function(error, res) {
        if (error) {
            errorCallBack(handleError(error));
        } else {
            callback(res);
        }
    });
}

// 获取HE3销毁总量
function getHeThreeBurnCoin(callback, errorCallBack) {
    heThreeContract.methods.balanceOf(destroyAddress).call(function(error, res) {
        if (error) {
            errorCallBack(handleError(error));
        } else {
            callback(res);
        }
    });
}

// 获取当前市场流通总量
function getMarketCoin(callback, errorCallBack) {
    heThreeContract.methods._currentSupply().call(function(error, res) {
        if (error) {
            errorCallBack(handleError(error));
        } else {
            callback(res);
        }
    });
}

// 获取发行总量
function getMarketAllCoin(callback, errorCallBack) {
    heThreeContract.methods.totalSupply().call(function(error, res) {
        if (error) {
            errorCallBack(handleError(error));
        } else {
            callback(res);
        }
    });
}

// 获取市场流通总量
function getTotalBalance(callback, errorCallBack) {
    heThreeContract.methods._totalMintBalance().call(
        {
            to: heThreeToken,
        },
        function(error, res) {
            if (error) {
                errorCallBack(handleError(error));
            } else {
                callback(res);
            }
        }
    );
}

function getMintData(account) {
    // 加密data 用法
    let data = heThreeContract.methods
        .mint(account, 10000000000, 1000000000)
        .encodeABI();
    return data;
}

// 获取每个 he3 兑换多少个 usdt
function getUsdtToHEThree(callback, errorCallBack) {
    hackerContract.methods.getDaiPerHe3().call(
        {
            to: hackerFederation, // contract address
        },
        function(error, res) {
            if (error) {
                errorCallBack(handleError(error));
            } else {
                //TODO Dai 为 18 位
                res = parseFloat(web3.utils.fromWei(res, "ether")).toFixed(6);
                callback(res);
            }
        }
    );
}

// 判断是否为平台用户
function isUser(account, callback, errorCallBack) {
    hackerContract.methods.isUser(account).call(
        {
            to: hackerFederation, // contract address
        },
        function(error, res) {
            if (error) {
                console.log(error)
                errorCallBack(handleError(error));
            } else {
                callback(res);
            }
        }
    );
}

// 获取手续费
function getMinGasFree(address, data, callback, errorCallBack) {
    web3.eth.estimateGas(
        {
            from: rootAddress,
            to: address,
            data: data,
        },
        function(error1, gaslimit) {
            if (error1) {
                // alert(error1);
                errorCallBack(handleError(error1));
            } else {
                //获取gasprice
                web3.eth.getGasPrice(function(error2, gasPrice) {
                    if (error2) {
                        alert(error2);
                        errorCallBack(handleError(error2));
                    } else {
                        let res = gasPrice * gaslimit;
                        callback(res);
                    }
                });
            }
        }
    );
}

/**
 * 发送交易
 * @param {Object} account 用户地址
 * @param {Object} to 合约地址
 * @param {Object} data 数据
 * @param {Object} callback 返回hash
 * @param {Object} errorCallBack 返回的错误
 */
function sendTransfer(account, to, data, callback, errorCallBack) {
    let value = 0x0;
    //获取gaslimit
    web3.eth.estimateGas(
        {
            from: account,
            to: to,
            data: data,
            value: value,
        },
        function(error1, gaslimit) {
            if (error1) {
                // alert(error1);
                errorCallBack(handleError(error1));
            } else {
                //获取gasprice
                web3.eth.getGasPrice(function(error2, gasPrice) {
                    if (error2) {
                        errorCallBack(handleError(error2));
                    } else {
                        gaslimit -= -10000;
                        let params = [
                            {
                                gasPrice: gasPrice,
                                gasLimit: gaslimit,
                                to: to,
                                from: account,
                                data: data,
                                value: value,
                            },
                        ];
                        //提交交易
                        ethereum.sendAsync(
                            {
                                method: "eth_sendTransaction",
                                params: params,
                                from: account,
                            },
                            function(error, hash) {
                                if (error) {
                                    console.log("发起交易失败：");
                                    errorCallBack(handleError(error));
                                } else {
                                    console.log("交易参数params:");
                                    console.log(params);
                                    console.log("交易HASH:" + hash);
                                    callback(hash);
                                }
                            }
                        );
                    }
                });
            }
        }
    );
}

function handleError(errorMsg) {
    if ("message" in errorMsg) {
        return errorMsg.message;
    }
    errorMsg = errorMsg.toString();
    errorMsg = errorMsg.replace(/\s+/g, " ");
    errorMsg = errorMsg.replace(/.+\"message\"\:\s*\"(.+)\".+/, "$1");
    return errorMsg;
}

export default {
    init,
    getMinGasFree,
    getMintData,
    heThreeToken,
    getUsdtToHEThree,
    getTotalBalance,
    getMarketCoin,
    getHeThreeBurnCoin,
    getHeThreeNum,
    getHeOneNum,
    buyHeThreeHashrate,
    buyHeOneHashrate,
    HeOneRoot,
    getRootNum,
    getRootNumT,
    HeThreeRoot,
    isUser,
    peakAddress,
    getMarketAllCoin,
    getInitreward,
};
