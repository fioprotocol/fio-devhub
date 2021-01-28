const defaultPrivateKey = '5JpbpZ7SScKHXrLwvhzCbP4Cj3Beqo8QwWyazDoyXHZuTjb4ZyK';
const defaultPublicKey = 'FIO5ReMUvFM9X12eSuAR4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr';
const KEY_PAIR = {
  private: '',
  public: ''
}

const baseUrl = 'https://testnet.fioprotocol.io:443/v1/'

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

// Keys
const Keys = {
  private: '',
  public: '',
  showReset: false,
  privateField: {},
  publicField: {},
  setBtn: {},
  resetBtn: {},
  storageKeyName: 'test_fio_keys',
  storageEncryptionPhrase: 'ksdhgayrglcjbklv',
  init: async () => {
    Keys.privateField = document.getElementById('testing-pk')
    Keys.publicField = document.getElementById('testing-pubkey')
    Keys.setBtn = document.getElementById('set-keys')
    Keys.resetBtn = document.getElementById('reset-keys')
    Keys.setBtn.onclick = async () => {
      Keys.set(Keys.privateField.value, Keys.publicField.value)
      Keys.store()
    }
    Keys.resetBtn.onclick = async () => {
      Keys.clear()
    }
    try {
      const keys = Keys.get()
      if (keys && keys.privateKey) {
        Keys.set(keys.privateKey, keys.publicKey)
        Keys.privateField.value = keys.privateKey
        Keys.publicField.value = keys.publicKey;
      }
    } catch (e) {
      console.log(e);
    }
  },
  set: (privateKey, publicKey) => {
    try {
      Keys.private = privateKey;
      Keys.public = publicKey;
      Keys.privateField['disabled'] = true
      Keys.publicField['disabled'] = true
      Keys.setBtn.classList.add('d-none')
      Keys.resetBtn.classList.remove('d-none')
    } catch (e) {
      console.log(e);
    }
  },
  get: () => {
    try {
      const storageKeys = window.localStorage.getItem(Keys.storageKeyName)
      const decryptedStorageKeys = decipher(Keys.storageEncryptionPhrase)(storageKeys)
      const { privateKey, publicKey } = JSON.parse(decryptedStorageKeys)
      return { privateKey, publicKey }
    } catch (e) {
      console.log(e);
    }
  },
  store: () => {
    window.localStorage.setItem(Keys.storageKeyName, cipher(Keys.storageEncryptionPhrase)(JSON.stringify({
      privateKey: Keys.private,
      publicKey: Keys.public
    })))
  },
  clear: () => {
    window.localStorage.removeItem(Keys.storageKeyName);
    Keys.privateField['disabled'] = false
    Keys.publicField['disabled'] = false
    Keys.setBtn.classList.remove('d-none')
    Keys.resetBtn.classList.add('d-none')
  }
}

// FIOSDK init
const fiosdkClientInit = async (privateKey, publicKey) => {
  if (!privateKey || !publicKey) {
    alert('Please set keys.')
    throw new Error('Please set keys.')
  }

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

// balance example
try {
  document.getElementById('try').onclick = async () => {
    const fioSdk = fiosdkClientInit()
    const b = await fioSdk.getFioBalance()
    alert(`Your balance - ${b.balance}`)
  };
} catch (e) {
  //
}

// transfer example
try {
  document.getElementById('try-transfer').onclick = async () => {
    try {
      showLoading()
      document.getElementById('logs').innerHTML = ''
      const payeeFioAddress = document.getElementById('transfer-payee').value;
      const transferAmount = document.getElementById('transfer-amount').value;
      const privateKey = Keys.private
      const publicKey = Keys.public;

      const fioSdk = await fiosdkClientInit(privateKey, publicKey)
      const { public_address: payeePublicKey } = await fioSdk.getPublicAddress(payeeFioAddress, "FIO", "FIO")
      log('Get payee public address', payeePublicKey)

      const { fee } = await fioSdk.getFee('transfer_tokens_pub_key');
      log('Get transfer fee', `${window.FIOSDK.FIOSDK.SUFToAmount(fee)} FIO`)

      fioSdk.returnPreparedTrx = true
      const preparedTrx = await fioSdk.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: payeePublicKey,
          amount: window.FIOSDK.FIOSDK.amountToSUF(transferAmount),
          max_fee: fee,
          tpid: "rewards@wallet"
        }
      )
      const result = await fioSdk.executePreparedTrx(
        'transfer_tokens_pub_key',
        preparedTrx
      )
      fioSdk.returnPreparedTrx = false
      log('Transfer result', `<div><p>Your transaction - <a href="https://fio-test.bloks.io/transaction/${result.transaction_id}" target="_blank">${result.transaction_id}</a></p></div>`)
    } catch (e) {
      console.log(e);
      alert('Transfer error')
    }

    showLoading(false)
  };
} catch (e) {
  //
}


// main
Keys.init()
