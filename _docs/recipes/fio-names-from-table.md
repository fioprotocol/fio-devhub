---
title: Get FIO Names from Address Table
description: Get FIO Names from Address Table
---

# Get FIO Names from the Address Table

---
### Overview

The hash is a truncated sha1 hash, in big-endian order, as a hex-string.

1. calculate the sha1 sum of the address
1. take the first 16 bytes
1. reverse the byte order
1. convert to a hexadecimal string, and prepend "0x"

Example for "test@fiotestnet"

- sha1 hash: 58df646ca7a4c9be1e1436b9ae1608eb62e653a0
- first 16 bytes: 58df646ca7a4c9be1e1436b9ae1608eb
- reverse byte order (big endian): eb0816aeb936141ebec9a4a76c64df58
- prepend 0x

---
### Examples of generating the hash

#### nodejs

```javascript
function nameHash(name) {
    const hash = require('crypto').createHash('sha1')
    return '0x' + hash.update(name).digest().slice(0,16).reverse().toString("hex")
}

// outputs: 0xeb0816aeb936141ebec9a4a76c64df58
console.log( nameHash('test@fiotestnet') )

```

#### browser-friendly javascript

```javascript
const encoded = new TextEncoder().encode("test@fiotestnet")
  
// get a sha-1 hash of the value
crypto.subtle.digest("SHA-1", encoded).then( hash => {

  // take the first 16 bytes of the hash, and convert to big-endian
  const hashArray = Array.from(new Uint8Array(hash)).slice(0,16).reverse()

  // convert to a string with '0x' prefix
  const hashHex = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  // outputs: 0xeb0816aeb936141ebec9a4a76c64df58
  console.log(hashHex) 
})

```

#### shell-script

An example that could work from a shell script. _Note:_ this requires `xxd` which may not be installed
on some systems, it is usually part of the `vim` package.

```sh
DOMAIN=test@fiotestnet
HASH="0x$(echo -n ${DOMAIN}| openssl sha1 -binary | LC_ALL=C rev |xxd -p | cut -c 9-40)"

# prints: 0xeb0816aeb936141ebec9a4a76c64df58
echo "${HASH}"
```

#### Go

```go
package main

import (
	"fmt"
	"encoding/hex"
	"crypto/sha1" // #nosec
)

// I128Hash hashes a string to an i128 database value, often used as an index for a string in a table.
// It is the most-significant 16 bytes in big-endian of a sha1 hash of the provided string, returned as a hex-string
func I128Hash(s string) string {
	sha := sha1.New() // #nosec
	_, err := sha.Write([]byte(s))
	if err != nil {
		return ""
	}

	// reverse byte order
	b := sha.Sum(nil)
	for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
		b[i], b[j] = b[j], b[i]
	}

	// last 16 bytes of sha1-sum, as big-endian
	return "0x" + hex.EncodeToString(b)[8:]
}

func main() {
	// outputs: 0xeb0816aeb936141ebec9a4a76c64df58
	fmt.Println(I128Hash("test@fiotestnet"))
}

```

### Sending the query

#### Address

To query the address table specify index 5 with a type of i128 using the hash as the upper and lower bounds:

```
curl -s https://fiotestnet.blockpane.com/v1/chain/get_table_rows -d '{
  "code": "fio.address",
  "scope": "fio.address",
  "table": "fionames",
  "lower_bound": "0xeb0816aeb936141ebec9a4a76c64df58",
  "upper_bound": "0xeb0816aeb936141ebec9a4a76c64df58",
  "key_type": "i128",
  "index_position": "5",
  "json": true
}' | jq .
```

Output:

```json
{
  "rows": [
    {
      "id": 7523,
      "name": "test@fiotestnet",
      "namehash": "0xeb0816aeb936141ebec9a4a76c64df58",
      "domain": "fiotestnet",
      "domainhash": "0x010fc709075388aae56c74a0dfaea9e5",
      "expiration": 1615398509,
      "owner_account": "ykspncqykk2w",
      "addresses": [
        {
          "token_code": "FIO",
          "chain_code": "FIO",
          "public_address": "FIO584WnfHaMNjvQ1UnqtNokx7S8zT4Pr4XgejF3yKcYpWfXcEHKa"
        }
      ],
      "bundleeligiblecountdown": 100
    }
  ],
  "more": false
}
```

#### Domain

The domain table is similar except the domain hash is in index 4:

```
curl -s https://fiotestnet.blockpane.com/v1/chain/get_table_rows -d '{
  "code": "fio.address",
  "scope": "fio.address",
  "table": "domains",
  "lower_bound": "0x010fc709075388aae56c74a0dfaea9e5",
  "upper_bound": "0x010fc709075388aae56c74a0dfaea9e5",
  "key_type": "i128",
  "index_position": "4",
  "json": true
}' | jq .
```

Output:

```json
{
  "rows": [
    {
      "id": 8651,
      "name": "fiotestnet",
      "domainhash": "0x010fc709075388aae56c74a0dfaea9e5",
      "account": "tw4tjkmo4eyd",
      "is_public": 1,
      "expiration": 1646934285
    }
  ],
  "more": false
}
```

### Example UX

To see a minimal vue.js example that queries the FIO Address table to determine if a FIO Domain or FIO Address has been registered, refer to [Blockpane's fio-search application](https://github.com/blockpane/fio-search){:rel="nofollow noopener noreferrer" target="_blank"}.

### References

*Blockpane gist: <https://gist.github.com/blockpane/d1c076f560d074ca7136e902f2dae1ae>{:rel="nofollow noopener noreferrer" target="_blank"}*