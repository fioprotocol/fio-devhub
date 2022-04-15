---
layout: page-int
title: Integrate NFT Signatures using the FIO Dashboard
description: Integrate NFT Signatures using the FIO Dashboard
---

# Integrate NFT Signatures using the FIO Dashboard

The FIO Dashboard provides a quick and easy integration for platforms who want to provide the ability for their users to sign their NFTs.  Check out Blockchain Wayne's video showing the unique.one integration flow: [https://www.youtube.com/watch?v=gL5So0LJEKw](https://www.youtube.com/watch?v=gL5So0LJEKw)

## Step One: Set Up your Landing Page

Work with your FIO BizDev Account Representative to create your platform's branded landing page.

## Step Two: Create your User Experience in your Platform

This step looks different for every partner.  Basically, you need to  provide a user interface to allow your users to select the NFT they want to sign.  Then, your platform will capture the relevant parameters for that NFT and build a URL to pass those parameters to the FIO Dashboard.

### Parameters

Here are the parameters that need to be passed in when sending a user to the dashboard:

```
  action - Action parameters (e.g., SIGNNFT for NFT Signatures)
  chain_code - Chain code
  contract_address - Contract address
  token_id - Token id
  url - Token url
  hash - Token hash
  metadata - Token metadata containing creator_url. Format is: {"creator_url": "https://..."}
  r - redirect url (the URL to return the user to the originating site)
```

### Example URL that an NFT site would use to send a user to the dashboard:

https://dashboard.fioprotocol.io/ref/uniqueone?action=SIGNNFT&chain_code=ETH&contract_address=FIO5CniznG2z6yVPc4as69si711R1HJMAAnC3Rxjd4kGri4Kp8D8P&token_id=ETH&url=ifg://dfs.sdfs/sdfs&hash=f83klsjlgsldkfjsdlf&metadata={"creator_url":"https://www.google.com.ua/"}&r=https://www.google.com.ua/

Your interface will build the URL, which then will take your user to your platform's landing page on the FIO Dashboard.  Your user can then create their FIO Crypto Handle and sign their NFT.  (See example screenshot below.)

![Image]({{ site.baseurl }}/assets/img/nft/NFTLandingScreen.png)

Your user can expect this experience while on your FIO Dashboard landing page:
- Their NFT will be stored server-side by FIO Dashboard
- The user will be contained to a landing page
- The user will be required to log-in or create account
- The user will be required to pick existing FIO Crypto Handle to sign with or register a new one
- Domains to show will be linked to partner_id
- Upon picking/registering their FIO Crypto Handle, the user will be redirected to confirm NFT addition with all relevant information pre-populated and not changeable.
- Upon adding the NFT, and if redirect_url has been provided, the user will be redirected and encrypted payload (their NFT) will be attached.

### Example User Interface

You can check out a sample UX design here: [https://xd.adobe.com/view/4ed48848-8442-411d-bbd8-ac8c189b7183-1b87/?fullscreen](https://xd.adobe.com/view/4ed48848-8442-411d-bbd8-ac8c189b7183-1b87/?fullscreen)


