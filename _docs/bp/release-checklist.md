---
layout: page-bp
title: BP Release Tasks
description: Block Producer release tasks
---
## Mainnet

|Release Date |Target Date |Status |Description |Notes |
|---|---|---|
|18-Oct-2021 |5-Nov-2021 |In Progress |Upgrade Mainnet nodes to fio chain release 3.1.0 |See: [Mainnet Health](https://health.fioprotocol.io){:target="_blank"}  |

## Testnet

|Release Date |Target Date |Status |Description |Notes |
|---|---|---|
|15-Nov-2021 |22-Nov-2021 |In Progress |v2.6.0-rc1 |Various msigs |

## Approval Status

<div id="voters_table"> 
</div>

*Unlocked values do not account for FIO fees paid from locked accounts.

<script>

  var bpList, votesTable, tableID;
  var bpApprovals = [];

  // Create the votes table:

  $.getJSON("bp-testnet.txt", function (data) {
    bpList = data;
  });

  const testnetUrl = "https://fiotestnet.blockpane.com/v1/chain/get_table_rows";
  const data = "{ \"json\": true, \"code\": \"eosio.msig\", \"scope\": \"5du5xkgkki5x\", \"table\": \"approvals2\", \"limit\": 100, \"lower_bound\": 0, \"reverse\": true, \"show_payer\": false }"

  $.post({
    url: testnetUrl, 
    data: data,
    contentType: 'application/json; charset=utf-8'
  }).done(function(data, status) {
    $.each(data.rows, function (key, entry) {
      //let div = document.createElement("div")
      //let p = document.createElement("p")
      //div.append("Some text", p)

      console.log("key: " + key + ", entry: " + entry.proposal_name);

      $('#voters_table').append('<br><h4>' + entry.proposal_name + '</h4>\n<br>');

      tableID = "table_" + key;
      tableRef = "#" + tableID;
      $('#voters_table').append('<table class="table" id="' + tableID + '"></table>');
      votesTable = $(tableRef);
      votesTable.append('<tr><th>Actor</th><th>Address</th><th>Status</th></tr>' );

      $.each(entry.provided_approvals, function (key, entry) {
        //console.log("key: " + key + ", entry: " + entry.level.actor);
        votesTable.append('<tr><td>' + entry.level.actor + '</td><td>' + bpList[entry.level.actor] + 'Address</td><td>Approved</td></tr>'); 
      });

      $.each(entry.requested_approvals, function (key, entry) {
        //console.log("key: " + key + ", entry: " + entry.level.actor);
        votesTable.append('<tr><td>' + entry.level.actor + '</td><td>' + bpList[entry.level.actor] + '</td><td>Pending</td></tr>'); 
      });
    });


  });

</script>