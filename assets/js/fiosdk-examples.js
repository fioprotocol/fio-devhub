const defaultPrivateKey = '5JpbpZ7SScKHXrLwvhzCbP4Cj3Beqo8QwWyazDoyXHZuTjb4ZyK';
const defaultPublicKey = 'FIO5ReMUvFM9X12eSuAR4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr';

const baseUrl = 'https://testnet.fioprotocol.io:443/v1/'

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}
const fiosdkInit = async (privateKey = defaultPrivateKey, publicKey = defaultPublicKey) => {
  let fioSdk

  try {
    fioSdk = new window.FIOSDK.FIOSDK(
      privateKey,
      publicKey,
      baseUrl,
      fetchJson
    )
  } catch (e) {
    alert('Error')
    console.log(e);
  }
  return fioSdk
}

const log = (title, message) => {
  console.log(title, message);
  const logEl = document.createElement('div');
  logEl.innerHTML = `<div class="alert alert-primary" role="alert"><div><h4>${title}</h4><p>${message}</p></div></div>`
  document.getElementById('logs').appendChild(logEl)
}

const showLoading = (loading = true) => {
  const spinner = document.getElementById('spinner');
  if (loading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}

try {
  document.getElementById('try').onclick = async () => {
    const fioSdk = fiosdkInit()
    const b = await fioSdk.getFioBalance()
    alert(`Your balance - ${b.balance}`)
  };
} catch (e) {
  //
}

try {
  document.getElementById('try-transfer').onclick = async () => {
    try {
      showLoading()
      document.getElementById('logs').innerHTML = ''
      const payeeFioAddress = document.getElementById('transfer-payee').value;
      const privateKey = document.getElementById('transfer-pk').value
      const publicKey = document.getElementById('transfer-pubkey').value;

      const fioSdk = await fiosdkInit(privateKey, publicKey)
      const { public_address: payeePublicKey } = await fioSdk.getPublicAddress(payeeFioAddress, "FIO", "FIO")
      log('Get payee public address', payeePublicKey)

      const { fee } = await fioSdk.getFee('transfer_tokens_pub_key');
      log('Get transfer fee', fee)

      const transferAmount = 1000000000 // 1 FIO
      const result = await fioSdk.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: payeePublicKey,
          amount: transferAmount,
          max_fee: fee,
          tpid: "rewards@wallet"
        }
      )
      log('Transfer result', JSON.stringify(result))
    } catch (e) {
      console.log(e);
      alert('Transfer error')
    }

    showLoading(false)
  };
} catch (e) {
  //
}
