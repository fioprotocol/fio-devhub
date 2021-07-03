---
title: Top FIO Token Holders
description: Top FIO Token Holders
---

# Top FIO Token Holders


<br>
<div>
  <table>
      <tr>
        <td>
          Select an integrator:
          <select id="integrator-dropdown" name="integrators">
          </select>
        </td>
        <td> &nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td>
        </td>
      </tr>
  </table>
</div>

<br>

<script>
  let dropdown = $('#integrator-dropdown');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Integrator</option>');
  dropdown.prop('selectedIndex', 0);

  $.getJSON("https://fio-eosams.light.xeos.me/api/topholders/fio/fio.token/FIO/100", function (data) {
    $.each(data, function (key, entry) {
      console.log('key: ', key);
      console.log('account: ', entry[0]);
      console.log('Total FIO: ', entry[1]);
      dropdown.append($('<option></option>').attr('value', key).text(key));
    })
  });

  $("#integrator-dropdown").change(function() {
    var selected = $(this).find(':selected');
    $.getJSON("integrations.json", function(result) {
      $.each(result, function(i, idata) {
        if (i == selected.val()) {
          $.each(idata.features, function(feature, avail) {
            $("#" + feature).attr({"src": ""});
            if (avail) {
              $("#" + feature).attr({"src": "/assets/img/blue-check.png"});
            } else {
              $("#" + feature).attr({"src": "/assets/img/red-x.png"});
            };
          });
        }
      });
    });
    // chrome requires this or it does not update
    $('#inttable').hide().show(0);
  });
</script>


<table id="inttable">
  <thead>
    <tr>
      <th>Category</th>
      <th>Feature</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><i>FIO Token</i></td>
      <td>Create FIO Wallet</td>
      <td> <img id="token-createwallet" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Check FIO Balance</td>
      <td> <img id="token-checkbalance" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Transfer FIO</td>
      <td> <img id="token-transferfio" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Transaction history</td>
      <td> <img id="token-txnhistory" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Import FIO Private Key</td>
      <td> <img id="token-importkey" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Import mnemonic phrase</td>
      <td> <img id="token-importphrase" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Address</i></td>
      <td>Register FIO Address (api or link to reg site)</td>
      <td> <img id="address-register" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Renew FIO address</td>
      <td> <img id="address-renew" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Display registered FIO Addresses</td>
      <td> <img id="address-show" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Register FIO Address on custom domain</td>
      <td> <img id="address-customdomain" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Domains</i></td>
      <td>Register FIO Domain (api or link to reg site)</td>
      <td> <img id="domain-register" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Renew FIO Domain</td>
      <td> <img id="domain-renew" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Display registered FIO Domains</td>
      <td> <img id="domain-show" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Send</i></td>
      <td>Send crypto using FIO Address</td>
      <td> <img id="send-send" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Receive</i></td>
      <td>Receive crypto using FIO Address (via direct send)</td>
      <td> <img id="receive-receive" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Map FIO Address to other blockchain public addresses</td>
      <td> <img id="receive-map" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Requests</i></td>
      <td>Submit new FIO Request</td>
      <td> <img id="request-submit" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Add memo to the FIO Request</td>
      <td> <img id="request-requestmemo" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>List sent FIO Requests</td>
      <td> <img id="request-sent" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>List pending or received FIO Requests</td>
      <td> <img id="request-pending" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Reject a FIO Request</td>
      <td> <img id="request-reject" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Cancel a FIO Request</td>
      <td> <img id="request-cancel" src=""> </td>
    </tr>
    <tr>
      <td><i>FIO Data</i></td>
      <td>Record transaction memo/metadata on FIO Send</td>
      <td> <img id="data-recordobt" src=""> </td>
    </tr>
    <tr>
      <td> </td>
      <td>Retrieve and display FIO memo/metadata</td>
      <td> <img id="data-displayobt" src=""> </td>
    </tr>
  </tbody>
</table>
