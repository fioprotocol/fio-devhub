let FIOSDK_LIB
const defaultPrivateKey = '5JpbpZ7SScKHXrLwvhzCbP4Cj3Beqo8QwWyazDoyXHZuTjb4ZyK';
const defaultPublicKey = 'FIO5ReMUvFM9X12eSuAR4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr';
const KEY_PAIR = {
  private: '',
  public: ''
}

const defaultBaseUrl = 'https://testnet.fioprotocol.io:443/v1/'
let baseUrl = defaultBaseUrl

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

const log = (title, message, isError = false) => {
  console.log(title, message);
  const logEl = document.createElement('div');
  logEl.innerHTML = `<div class="alert ${isError ? 'alert-error' : 'alert-primary'}" role="alert"><div><h4>${title}</h4><p>${message}</p></div></div>`
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
    const tokenPubAddressEl = document.getElementById('fio-request-token-pub-address')
    if (tokenPubAddressEl) tokenPubAddressEl.value = publicKey

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
      const payerFioAddress = document.getElementById('fio-request-payer').value;
      const requestAmount = document.getElementById('fio-request-amount').value;
      const memo = document.getElementById('fio-request-memo').value;
      const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")
      log('Get payer public address', `<code>${payerPublicKey}</code>`)

      const { fee: sendRequestFee } = await fioSdkPayee.getFeeForNewFundsRequest(payeeFioAddress)
      log('Send FIO Request fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(sendRequestFee)} FIO`)

      const requestFundsResult = await fioSdkPayee.genericAction('requestFunds', {
        payerFioAddress,
        payeeFioAddress,
        payeeTokenPublicAddress: fioSdkPayee.publicKey,
        payerFioPublicKey: payerPublicKey,
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
    } catch (e) {
      console.log(e);
      alert('Fio Request Example error')
    }

    showLoading(false)
  };
} catch (e) {
  //
}

// Approve/reject FIO Request example
try {
  document.getElementById('try-answer-fio-request').onclick = async () => {
    showLoading()
    resetLogs()
    let pendingRequests = []
    const fioSdk = await fiosdkClientInit(Keys.private, Keys.public)
    const fioRequestListEl = document.getElementById('fio-request-list-container')
    fioRequestListEl.classList.remove('d-none')
    const fioRequestTableEl = document.getElementById('fio-request-list-table-body')
    fioRequestTableEl.innerHTML = null

    const removeFioRequestEl = id => {
      document.getElementById(`fio-request-row-${id}`).remove()
    }

    // Approve FIO Request
    const approveRequest = async (fioRequest) => {
      if (!confirm(`Are you sure you want to approve this FIO Request ${fioRequest.fio_request_id}?`)) return
      showLoading()
      try {
        const { fee: transferFee } = await fioSdk.getFee('transfer_tokens_pub_key');
        log('Get transfer fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(transferFee)} FIO`)

        const updatedAmount = document.getElementById(`fio-request-amount-field-${fioRequest.fio_request_id}`).value
        const amount = updatedAmount ? updatedAmount : fioRequest.content.amount
        const memo = document.getElementById(`fio-request-memo-field-${fioRequest.fio_request_id}`).value
        fioSdk.returnPreparedTrx = true
        const preparedTrx = await fioSdk.pushTransaction(
          'fio.token',
          'trnsfiopubky',
          {
            payee_public_key: fioRequest.content.payee_public_address,
            amount: FIOSDK_LIB.FIOSDK.amountToSUF(amount),
            max_fee: transferFee,
            // tpid: "rewards@wallet"
          }
        )
        const transferResult = await fioSdk.executePreparedTrx(
          'transfer_tokens_pub_key',
          preparedTrx
        )
        fioSdk.returnPreparedTrx = false
        log('Transfer result', `<div><p>Your transaction - <a href="${getTrxLink(transferResult.transaction_id)}" target="_blank">${transferResult.transaction_id}</a></p></div>`)

        const { fee: recordObtFee } = await fioSdk.getFeeForRecordObtData(fioRequest.payer_fio_address);
        log('Record OBT data fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(recordObtFee)} FIO`)
        const recordObtDataResult = await fioSdk.genericAction('recordObtData', {
          fioRequestId: fioRequest.fio_request_id,
          payerFioAddress: fioRequest.payer_fio_address,
          payeeFioAddress: fioRequest.payee_fio_address,
          payerTokenPublicAddress: fioSdk.publicKey,
          payeeTokenPublicAddress: fioRequest.content.payee_public_address,
          amount,
          memo,
          chainCode: 'FIO',
          tokenCode: 'FIO',
          status: 'sent_to_blockchain',
          obtId: '',
          maxFee: recordObtFee,
        })
        log('Record OBT data result', `<div><p>Status - <code>${recordObtDataResult.status}</code>.</p><p>Fee collected - <code>${FIOSDK_LIB.FIOSDK.SUFToAmount(recordObtDataResult.fee_collected)}</code></p></div>`)
      } catch (e) {
        console.log(e);
        log('Error', e.message)
      }
      showLoading(false)
      removeFioRequestEl(fioRequest.fio_request_id)
    }

    // Reject FIO Request
    const rejectRequest = async (fioRequest) => {
      if (!confirm(`Are you sure you want to reject this FIO Request ${fioRequest.fio_request_id}?`)) return
      showLoading()
      try {
        const { fee: rejectFee } = await fioSdk.getFeeForRejectFundsRequest(fioRequest.payer_fio_address)
        log('Reject FIO Request fee', `${FIOSDK_LIB.FIOSDK.SUFToAmount(rejectFee)} FIO`)
        const rejectResult = await fioSdk.rejectFundsRequest(fioRequest.fio_request_id, rejectFee)
        log('Reject FIO Request result', `<div><p>Status - <code>${rejectResult.status}</code>.</p><p>Fee collected - <code>${FIOSDK_LIB.FIOSDK.SUFToAmount(rejectResult.fee_collected)}</code></p></div>`)
        removeFioRequestEl(fioRequest.fio_request_id)
      } catch (e) {
        console.log(e);
        log('Error', e.message)
      }

      showLoading(false)
    }

    // Fill table with fio requests
    const addFioRequestElToList = (fioRequest) => {
      const id = fioRequest.fio_request_id
      const trEl = document.createElement('tr')
      trEl.id = `fio-request-row-${id}`
      trEl.innerHTML = `<th scope="row">${id}</th><td>${fioRequest.payee_fio_address}</td><td>${fioRequest.payer_fio_address}</td><td>${fioRequest.content.memo}</td><td><input id="fio-request-amount-field-${id}" class="form-control" type="number" value="${fioRequest.content.amount}" /></td><td><input id="fio-request-memo-field-${id}" class="form-control" type="text" placeholder="Set your memo" /></td><td><button id="fio-request-approve-btn-${id}" class="btn btn-success btn-sm px-3">Send</button></td><td><button id="fio-request-reject-btn-${id}" class="btn btn-danger btn-sm px-3">Reject</button></td>`
      fioRequestTableEl.appendChild(trEl)
      document.getElementById(`fio-request-approve-btn-${id}`).onclick = () => approveRequest(fioRequest)
      document.getElementById(`fio-request-reject-btn-${id}`).onclick = () => rejectRequest(fioRequest)
    }

    // Get pending fio requests
    const limit = document.getElementById('fio-request-limit').value || null;
    const offset = document.getElementById('fio-request-offset').value || null;
    try {
      const { requests } = await fioSdk.getPendingFioRequests(limit, offset)
      pendingRequests = requests
    } catch (e) {
      let message = e.message
      if (e.json && e.json.message) message = e.json.message
      log('Error', message)
    }
    if (pendingRequests) {
      log('Pending requests amount', `<div class="language-javascript highlighter-rouge"><div class="highlight"><pre><code>${pendingRequests.length}</code></pre></div></div>`)
    }

    for (const fioRequest of pendingRequests) {
      addFioRequestElToList(fioRequest)
    }

    showLoading(false)
  }
} catch (e) {
  console.log(e);
}


// ETHDenver Pizza Planner
const pPlannerInit = async () => {
  try {
    if (!document.getElementById('p-fio-request-list-container')) return
    const privateKey = Keys.private
    const publicKey = Keys.public;

    if (!privateKey || !publicKey) return setTimeout(pPlannerInit, 500)

    let pendingRequests = []
    let obtData = []
    const fioSdk = await fiosdkClientInit(Keys.private, Keys.public)
    const fioRequestTableEl = document.getElementById('p-fio-request-list-table-body')
    const obtDataTableEl = document.getElementById('p-fio-obt-data-list-table-body')
    const fioRequestAmountEl = document.getElementById('p-fio-requests-amount')
    const obtDataAmountEl = document.getElementById('p-obt-data-amount')
    fioRequestTableEl.innerHTML = null
    obtDataTableEl.innerHTML = null

    const removeFioRequestEl = id => {
      document.getElementById(`fio-request-row-${id}`).remove()
    }

    const showRequestsLoading = (loading = true) => {
      const spinner = document.getElementById('p-requests-spinner');
      if (loading) {
        spinner.classList.remove("d-none");
      } else {
        spinner.classList.add("d-none");
      }
    }

    const showObtLoading = (loading = true) => {
      const spinner = document.getElementById('p-obt-spinner');
      if (loading) {
        spinner.classList.remove("d-none");
      } else {
        spinner.classList.add("d-none");
      }
    }

    // Approve FIO Request
    const approveRequest = async (fioRequest) => {
      if (!confirm(`Are you sure you want to approve this FIO Request ${fioRequest.fio_request_id}?`)) return
      showRequestsLoading()
      try {
        const { fee: transferFee } = await fioSdk.getFee('transfer_tokens_pub_key');
        console.log(transferFee);

        const updatedAmount = document.getElementById(`fio-request-amount-field-${fioRequest.fio_request_id}`).value
        const amount = updatedAmount ? updatedAmount : fioRequest.content.amount
        const memo = document.getElementById(`fio-request-memo-field-${fioRequest.fio_request_id}`).value
        fioSdk.returnPreparedTrx = true
        const preparedTrx = await fioSdk.pushTransaction(
          'fio.token',
          'trnsfiopubky',
          {
            payee_public_key: fioRequest.content.payee_public_address,
            amount: FIOSDK_LIB.FIOSDK.amountToSUF(amount),
            max_fee: transferFee,
            // tpid: "rewards@wallet"
          }
        )
        const transferResult = await fioSdk.executePreparedTrx(
          'transfer_tokens_pub_key',
          preparedTrx
        )
        fioSdk.returnPreparedTrx = false
        console.log(getTrxLink(transferResult.transaction_id));

        const { fee: recordObtFee } = await fioSdk.getFeeForRecordObtData(fioRequest.payer_fio_address);
        const recordObtDataResult = await fioSdk.genericAction('recordObtData', {
          fioRequestId: fioRequest.fio_request_id,
          payerFioAddress: fioRequest.payer_fio_address,
          payeeFioAddress: fioRequest.payee_fio_address,
          payerTokenPublicAddress: fioSdk.publicKey,
          payeeTokenPublicAddress: fioRequest.content.payee_public_address,
          amount,
          memo,
          chainCode: fioRequest.content.chain_code,
          tokenCode: fioRequest.content.token_code,
          status: 'sent_to_blockchain',
          obtId: '',
          maxFee: recordObtFee,
        })
        removeFioRequestEl(fioRequest.fio_request_id)
      } catch (e) {
        console.log(e);
        alert(`Record OBT data error. ${e.message}`)
      }
      showRequestsLoading(false)
    }

    // Reject FIO Request
    const rejectRequest = async (fioRequest) => {
      if (!confirm(`Are you sure you want to reject this FIO Request ${fioRequest.fio_request_id}?`)) return
      showRequestsLoading()
      try {
        const { fee: rejectFee } = await fioSdk.getFeeForRejectFundsRequest(fioRequest.payer_fio_address)
        const rejectResult = await fioSdk.rejectFundsRequest(fioRequest.fio_request_id, rejectFee)
        console.log(rejectResult);
        removeFioRequestEl(fioRequest.fio_request_id)
      } catch (e) {
        console.log(e);
        alert(`Reject error. ${e.message}`)
      }

      showRequestsLoading(false)
    }

    // Fill table with fio requests
    const addFioRequestElToList = (fioRequest) => {
      const id = fioRequest.fio_request_id
      const trEl = document.createElement('tr')
      trEl.id = `fio-request-row-${id}`
      trEl.innerHTML = `<th scope="row">${id}</th><td>${fioRequest.payee_fio_address}</td><td>${fioRequest.payer_fio_address}</td><td>${fioRequest.content.memo}</td><td><input id="fio-request-amount-field-${id}" class="form-control" type="number" value="${fioRequest.content.amount}" /></td><td><input id="fio-request-memo-field-${id}" class="form-control" type="text" placeholder="Set your memo" /></td><td><button id="fio-request-approve-btn-${id}" class="btn btn-success btn-sm px-3">Send</button></td><td><button id="fio-request-reject-btn-${id}" class="btn btn-danger btn-sm px-3">Reject</button></td>`
      fioRequestTableEl.appendChild(trEl)
      document.getElementById(`fio-request-approve-btn-${id}`).onclick = () => approveRequest(fioRequest)
      document.getElementById(`fio-request-reject-btn-${id}`).onclick = () => rejectRequest(fioRequest)
    }
    // Fill table with obt data
    const addObtDataElToList = (item) => {
      const trEl = document.createElement('tr')
      trEl.innerHTML = `<th scope="row" class="" style="overflow-wrap: break-word; width: 125px;"><code style="word-break: break-word;">${item.fio_request_id || item.content.obt_id}</code></th><td>${item.payee_fio_address}</td><td>${item.payer_fio_address}</td><td>${item.content.memo}</td><td>${item.content.amount}</td><td>${item.status}</td>`
      obtDataTableEl.appendChild(trEl)
    }

    // Get pending fio requests
    const getPendingRequests = async () => {
      pendingRequests = []
      showRequestsLoading()
      fioRequestTableEl.innerHTML = null
      fioRequestAmountEl.innerHTML = null
      const limit = document.getElementById('p-fio-request-limit').value || null;
      const offset = document.getElementById('p-fio-request-offset').value || null;
      try {
        const { requests } = await fioSdk.getPendingFioRequests(limit, offset)
        pendingRequests = requests.sort((item1, item2) => new Date(item1.time_stamp) < new Date(item2.time_stamp) ? 1 : -1)
      } catch (e) {
        let message = e.message
        if (e.json && e.json.message) message = e.json.message
        alert(message)
      }

      for (const fioRequest of pendingRequests) {
        addFioRequestElToList(fioRequest)
      }

      fioRequestAmountEl.innerHTML = `<span>${pendingRequests.length}</span>`
      showRequestsLoading(false)
    }

    const getObtData = async () => {
      obtData = []
      showObtLoading()
      obtDataTableEl.innerHTML = null
      obtDataAmountEl.innerHTML = null
      const limit = document.getElementById('p-obt-data-limit').value || null;
      const offset = document.getElementById('p-obt-data-offset').value || null;
      try {
        const { obt_data_records } = await fioSdk.getObtData(limit, offset)
        obtData = obt_data_records.sort((item1, item2) => new Date(item1.time_stamp) < new Date(item2.time_stamp) ? 1 : -1)
      } catch (e) {
        let message = e.message
        if (e.json && e.json.message) message = e.json.message
        alert(message)
      }

      for (const item of obtData) {
        addObtDataElToList(item)
      }

      obtDataAmountEl.innerHTML = `<span>${obtData.length}</span>`
      showObtLoading(false)
    }

    document.getElementById('p-fio-api-base-url').onchange = e => {
      baseUrl = e.target.value
      pPlannerInit()
    }
    document.getElementById('p-get-pending-requests').onclick = () => getPendingRequests()
    document.getElementById('p-get-obt-data').onclick = () => getObtData()

    await getPendingRequests()
    await getObtData()

  } catch (e) {
    console.log(e);
  }
}

const initExamples = async () => {
  if (!window.FIOSDK) return setTimeout(initExamples, 500)
  try {
    document.getElementById('fio-api-base-url').onchange = e => {
      baseUrl = e.target.value
    }
  } catch (e) {
    //
  }
  FIOSDK_LIB = window.FIOSDK
  await Keys.init()
  fioRequestExampleInit()
  pPlannerInit()
}


// main
initExamples()
