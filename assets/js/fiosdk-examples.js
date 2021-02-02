let FIOSDK_LIB
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

const getTrxLink = trxId => `https://fio-test.bloks.io/transaction/${trxId}`

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
      if (Keys.privateField.value && Keys.publicField.value) {
        Keys.set(Keys.privateField.value, Keys.publicField.value)
        Keys.store()
      }
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
      if (!storageKeys) return {}
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
    fioSdk = new FIOSDK_LIB.FIOSDK(
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
const resetLogs = () => document.getElementById('logs').innerHTML = ''

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
      resetLogs()
      const payeeFioAddress = document.getElementById('transfer-payee').value;
      const transferAmount = document.getElementById('transfer-amount').value;
      const privateKey = Keys.private
      const publicKey = Keys.public;

      const fioSdk = await fiosdkClientInit(privateKey, publicKey)
      const { public_address: payeePublicKey } = await fioSdk.getPublicAddress(payeeFioAddress, "FIO", "FIO")
      log('Get payee public address', `<code>${payeePublicKey}</code>`)

      const { fee } = await fioSdk.getFee('transfer_tokens_pub_key');
      log('Get transfer fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(fee)} FIO`)

      fioSdk.returnPreparedTrx = true
      const preparedTrx = await fioSdk.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: payeePublicKey,
          amount: FIOSDK_LIB.FIOSDK.amountToSUF(transferAmount),
          max_fee: fee,
          tpid: "rewards@wallet"
        }
      )
      const result = await fioSdk.executePreparedTrx(
        'transfer_tokens_pub_key',
        preparedTrx
      )
      fioSdk.returnPreparedTrx = false
      log('Transfer result', `<div><p>Your transaction - <a href="${getTrxLink(result.transaction_id)}" target="_blank">${result.transaction_id}</a></p></div>`)
    } catch (e) {
      console.log(e);
      alert('Transfer error')
    }

    showLoading(false)
  };
} catch (e) {
  //
}

// fio request example
const fioRequestExampleInit = async () => {
  try {
    if (!document.getElementById('fio-request-example-container')) return
    const privateKey = Keys.private
    const publicKey = Keys.public;

    if (!privateKey || !publicKey) return setTimeout(fioRequestExampleInit, 500)

    const fioSdkPayee = await fiosdkClientInit(privateKey, publicKey)
    const { fio_addresses } = await fioSdkPayee.genericAction('getFioNames', { fioPublicKey: publicKey })
    if (fio_addresses && fio_addresses.length) {
      const fioAddressSelect = document.getElementById('fio-request-payee')
      for (const { fio_address } of fio_addresses) {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(fio_address));
        option.value = fio_address;
        fioAddressSelect.appendChild(option);
      }
    }
  } catch (e) {
    console.log(e);
  }
}
try {
  document.getElementById('try-fio-request').onclick = async () => {
    try {
      showLoading()
      resetLogs()
      const fioSdkPayee = await fiosdkClientInit(Keys.private, Keys.public)

      const payeeFioAddress = document.getElementById('fio-request-payee').value;
      const payerFioAddress = document.getElementById('fio-request-payer').value; // testing55t@fiotestnet
      const payerPrivateKey = document.getElementById('fio-request-private').value; // 5KV1N8rcqHV4yRHGyEqWts12Xv876Re1X8wYdfJS77tnJtVrG72
      const requestAmount = document.getElementById('fio-request-amount').value;
      const memo = document.getElementById('fio-request-memo').value;
      const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")
      log('Get payer public address', `<code>${payerPublicKey}</code>`)

      const fioSdkPayer = await fiosdkClientInit(payerPrivateKey, payerPublicKey)
      const { fee: sendRequestFee } = await fioSdkPayee.getFeeForNewFundsRequest(payeeFioAddress)
      log('Send FIO Request fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(sendRequestFee)} FIO`)

      const requestFundsResult = await fioSdkPayee.genericAction('requestFunds', {
        payerFioAddress,
        payeeFioAddress,
        payeeTokenPublicAddress: fioSdkPayee.publicKey,
        payerFioPublicKey: fioSdkPayer.publicKey,
        amount: requestAmount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        memo,
        maxFee: sendRequestFee,
      })
      const requestId = requestFundsResult.fio_request_id
      log('New Funds Request result', `<div><p>Fio Request Id - <code>${requestId}</code></p></div>`)

      let sentRequest
      while (!sentRequest) {
        try {
          const { requests } = await fioSdkPayee.getSentFioRequests()
          sentRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
          if (sentRequest && sentRequest.fio_request_id) {
            log('Sent request', `<div class="language-javascript highlighter-rouge"><div class="highlight"><pre><code>${JSON.stringify(sentRequest)}</code></pre></div></div>`)
          }
        } catch (e) {
          console.log(e);
        }
      }

      let pendingRequest
      try {
        const { requests } = await fioSdkPayer.getPendingFioRequests()
        pendingRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
        if (pendingRequest && pendingRequest.fio_request_id) {
          log('Pending request', `<div class="language-javascript highlighter-rouge"><div class="highlight"><pre><code>${JSON.stringify(pendingRequest)}</code></pre></div></div>`)
        }
      } catch (e) {
        console.log(e);
      }

      if (confirm(`Click "OK" to approve or "Cancel" to reject FIO Request (${requestId})`)) {
        const { fee: transferFee } = await fioSdkPayer.getFee('transfer_tokens_pub_key');
        log('Get transfer fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(transferFee)} FIO`)
        fioSdkPayer.returnPreparedTrx = true
        const preparedTrx = await fioSdkPayer.pushTransaction(
          'fio.token',
          'trnsfiopubky',
          {
            payee_public_key: pendingRequest.content.payee_public_address,
            amount: FIOSDK_LIB.FIOSDK.amountToSUF(pendingRequest.content.amount),
            max_fee: transferFee,
            // tpid: "rewards@wallet"
          }
        )
        const transferResult = await fioSdkPayer.executePreparedTrx(
          'transfer_tokens_pub_key',
          preparedTrx
        )
        fioSdkPayer.returnPreparedTrx = false
        log('Transfer result', `<div><p>Your transaction - <a href="${getTrxLink(transferResult.transaction_id)}" target="_blank">${transferResult.transaction_id}</a></p></div>`)

        const { fee: recordObtFee } = await fioSdkPayer.getFeeForRecordObtData(pendingRequest.payer_fio_address);
        log('Record OBT data fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(recordObtFee)} FIO`)
        const recordObtDataResult = await fioSdkPayer.genericAction('recordObtData', {
          fioRequestId: requestId,
          payerFioAddress: pendingRequest.payer_fio_address,
          payeeFioAddress: pendingRequest.payee_fio_address,
          payerTokenPublicAddress: fioSdkPayer.publicKey,
          payeeTokenPublicAddress: pendingRequest.content.payee_public_address,
          amount: pendingRequest.content.amount,
          chainCode: 'FIO',
          tokenCode: 'FIO',
          status: 'sent_to_blockchain',
          obtId: '',
          maxFee: recordObtFee,
        })
        log('Record OBT data result', `<div><p>Status - <code>${recordObtDataResult.status}</code>.</p><p>Fee collected - <code>${FIOSDK_LIB.FIOSDK.SUFToAmount(recordObtDataResult.fee_collected)}</code></p></div>`)
      } else {
        const { fee: rejectFee } = await fioSdkPayer.getFeeForRejectFundsRequest(payerFioAddress)
        log('Reject FIO Request fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(rejectFee)} FIO`)
        const rejectResult = await fioSdkPayer.rejectFundsRequest(requestId, rejectFee)
        log('Reject FIO Request result', `<div><p>Status - <code>${rejectResult.status}</code>.</p><p>Fee collected - <code>${FIOSDK_LIB.FIOSDK.SUFToAmount(rejectResult.fee_collected)}</code></p></div>`)
      }

      // check sent request has changed status
      try {
        const { requests } = await fioSdkPayee.getSentFioRequests()
        const sentRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
        if (sentRequest && sentRequest.fio_request_id) {
          log('Updated sent request', `<div><p>Sent request status - <code>${sentRequest.status}</code></p><div class="language-javascript highlighter-rouge"><div class="highlight"><pre><code>${JSON.stringify(sentRequest)}</code></pre></div></div></div>`)
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
      alert('Fio Request Example error')
    }

    showLoading(false)
  };
} catch (e) {
  //
}

const initExamples = async () => {
  if (!window.FIOSDK) return setTimeout(initExamples, 500)
  FIOSDK_LIB = window.FIOSDK
  await Keys.init()
  fioRequestExampleInit()
}


// main
initExamples()
