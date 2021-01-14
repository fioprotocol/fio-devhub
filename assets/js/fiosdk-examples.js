let fioSdk
let privateKey = '5JpbpZ7SScKHXrLwvhzCbP4Cj3Beqo8QwWyazDoyXHZuTjb4ZyK',
  publicKey = 'FIO5ReMUvFM9X12eSuAR4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr';

const baseUrl = 'https://testnet.fioprotocol.io:443/v1/'

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}
const fiosdkInit = async () => {
  try {
    if (fioSdk) return fioSdk
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

fiosdkInit()

document.getElementById('try').onclick = async () => {
  const b = await fioSdk.getFioBalance()
  alert(`Your balance - ${b.balance} FIO`)
};
