---
layout: page-int
title: Integrate NFT Signatures using the FIO Dashboard
description: Integrate NFT Signatures using the FIO Dashboard
---

# Integrate using the FIO Dashboard

The FIO Dashboard provides a quick and easy integration for platforms who want to provide FIO capabilities to their users. Integrating with the FIO dashboard allows platforms to present their branding and a contained flow, providing the user with a clear path to perform a specific action (as opposed to the normal dashboard user experience where all the dashboard functionality is available to the user). 

For example, platforms can provide the ability to sign NFTs using the FIO dashboard. Check out Blockchain Wayne's video showing the unique.one integration flow: [https://www.youtube.com/watch?v=gL5So0LJEKw](https://www.youtube.com/watch?v=gL5So0LJEKw){:target="_blank"}.  (Other features are also planned.)

## Step One: Set Up your Landing Page

Work with your FIO BizDev Account Representative to create your platform's branded landing page.

## Step Two: Create your User Experience in your Platform

This step looks different for every partner.  Basically, you need to  provide a user interface to allow your users to select the action they want to perform.  (For example, to allow a user to sign an NFT, the interface would allow the user to select the NFT to sign.) Then, your platform will capture the relevant parameters for the action and build a URL to pass those parameters to the FIO Dashboard.

### Parameters

Here are the parameters that need to be passed in when sending a user to the dashboard:

|Feature |Required Parameters |
|---|---|
|Sign NFTs |action - Action parameters (e.g., SIGNNFT for NFT Signatures)<br> chain_code - Chain code<br> contract_address - Contract address<br>token_id - Token id<br>url - Token url <br>hash - Token hash<br>metadata - Token metadata containing creator_url. Format is: {"creator_url": "https://..."}<br>r - redirect url (the URL to return the user to the originating site) |

## Dashboard User Experience

Your user can expect this experience while on your FIO Dashboard landing page:
- The user will be contained to a landing page
- The user will be required to log-in or create account
- The user will be required to pick existing FIO Crypto Handle to sign with or register a new one
- Domains to show will be linked to partner_id
- Upon picking/registering their FIO Crypto Handle, the user will be redirected to confirm the action with all relevant information pre-populated and not changeable.
- Upon performing the cation, and if redirect_url has been provided, the user will be redirected and (optionally) encrypted payload (e.g.their NFT) will be attached.


### Example Use Case

**Sample URL that an NFT site would use to send a user to the dashboard:** 

This is an example URL that you would build.  Note that your specifics will differ based on the  selected feature and the user's input.

---
 [https://dashboard.fioprotocol.io/ref/uniqueone?action=SIGNNFT&chain_code=ETH&contract_address=FIO5CniznG2z6yVPc4as69si711R1HJMAAnC3Rxjd4kGri4Kp8D8P&token_id=ETH&url=ifg://dfs.sdfs/sdfs&hash=f83klsjlgsldkfjsdlf&metadata={"creator_url":"https://www.google.com.ua/"}&r=https://www.google.com.ua/](https://dashboard.fioprotocol.io/ref/uniqueone?action=SIGNNFT&chain_code=ETH&contract_address=FIO5CniznG2z6yVPc4as69si711R1HJMAAnC3Rxjd4kGri4Kp8D8P&token_id=ETH&url=ifg://dfs.sdfs/sdfs&hash=f83klsjlgsldkfjsdlf&metadata={"creator_url":"https://www.google.com.ua/"}&r=https://www.google.com.ua/){:target="_blank"}

---

Your interface will build the URL, which then will take your user to your platform's landing page on the FIO Dashboard.  Your user can then create their FIO Crypto Handle and sign their NFT.  (See example screenshot below.)

![Image]({{ site.baseurl }}/assets/img/nft/nftlandingscreen.png)


## Example User Interface

You can check out a sample UX design here: [https://xd.adobe.com/view/4ed48848-8442-411d-bbd8-ac8c189b7183-1b87/?fullscreen](https://xd.adobe.com/view/4ed48848-8442-411d-bbd8-ac8c189b7183-1b87/?fullscreen){:target="_blank"}