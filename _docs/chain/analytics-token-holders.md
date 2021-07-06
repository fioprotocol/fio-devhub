---
title: Top FIO Token Holders
description: Top FIO Token Holders
---

# FIO Token Supply and Distribution

## FIO Token Supply

<div id="supply_table"> </div>

## Top FIO Token Holders

*(Sort by clicking on the header.)*

<div id="holders_table"> 
</div>

*Unlocked values do not account for FIO fees paid from locked accounts.

<script>

  var totalSupply, totalCirc, totalLocked, totalBalance, unlockedBalance, lockAmount, type, type2inhibit, unlockFraction, votableTokensFraction;


  // Get some initial date and unlock fraction data:

  function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
  }

  var date = new Date();
  //console.log('date: ', date)
  var dt = date.getTime();  // Current date in milliseconds since 1970
  //console.log('dt: ', dt)

  var dateGenesis = new Date( "March 30, 2020 12:09:00" );
  //console.log('dateGenesis: ', dateGenesis)
  var dt2 = dateGenesis.getTime();  // Date of Genesis block in milliseconds since 1970
  //console.log('dt2: ', dt2)

  var daysSinceGenesis = datediff(dt2, dt)
  //console.log("daysSinceGenesis: ", daysSinceGenesis);

  if (daysSinceGenesis<90) {
    unlockFraction = 0
  } else if (daysSinceGenesis<270) {
    unlockFraction = .06
  } else if (daysSinceGenesis<450) {
    unlockFraction = .248
  } else if (daysSinceGenesis<630) {
    unlockFraction = .436
  } else if (daysSinceGenesis<810) {
    unlockFraction = .624
  } else if (daysSinceGenesis<990) {
    unlockFraction = .812
  } else {unlockFraction = 1};


  // Create the supply table:

  $('#supply_table').append('<table class="table"></table>');
  var supplyTable = $('#supply_table').children();
  supplyTable.append('<tr><th>Statistic</th><th>Description</th><th>Value</th></th></tr>' );

  $.get("https://fioprotocol.io/supply", function(data, status){
    totalSupply = Math.trunc(parseFloat(data));
    supplyTable.append('<tr><td>Total supply</td><td>All tokens that were ever minted. Maximum token supply is capped at 1,000,000,000 FIO.</td><td> ' + totalSupply.toLocaleString() + '</td></tr>');  
  })
  .then(function() {
    return $.get("https://fioprotocol.io/circulating", function(data, status){
      totalCirc = Math.trunc(parseFloat(data));
      supplyTable.append('<tr><td>Circulating supply</td><td>Total supply less locked tokens.</td><td> ' + totalCirc.toLocaleString() + '</td></tr>');
    });
  })
  .then(function() {
    return $.get("https://fioprotocol.io/locked", function(data, status){
      totalLocked = Math.trunc(parseFloat(data));
      supplyTable.append('<tr><td>Locked tokens</td><td>Tokens which are locked and cannot be transferred.</td><td> ' + totalLocked.toLocaleString() + '</td></tr>');
    });
  })
  .then(function() {
    var totalType3 = 50000000;
    lockedAndVotable = totalType3 * (1-unlockFraction); // Locked Type 3 tokens are votable
    totalVotable = lockedAndVotable + totalCirc;
    supplyTable.append('<tr><td>Votable tokens</td><td>Total votable locked and unlocked tokens.</td><td> ' + totalVotable.toLocaleString() + '</td></tr>');
  })


  // Create the locked tokens table:

  $.getJSON("token-locked.txt", function (data) {
    lockAmount = data;
  });

  $.getJSON("token-type.txt", function (data) {
    type = data;
  });

  // Lock type 2 inhibit flag
  $.getJSON("token-lock2.txt", function (data) {
    type2inhibit = data;
  });

  function sort_acct() {
    var table=$('#table');
    var tbody =$('#table1');

    tbody.find('tr').sort(function(a, b) {

      if($('#total_order').val()=='asc') {
        return ($('td', a).eq(0).text() >= $('td', b).eq(0).text() ? 1 : -1);
      } else {
        return ($('td', a).eq(0).text() >= $('td', b).eq(0).text() ? -1 : 1);
      }
    }).appendTo(tbody);
      
    var sort_order=$('#total_order').val();
    if(sort_order=="asc") {
      document.getElementById("total_order").value="desc";
    }
    if(sort_order=="desc") {
      document.getElementById("total_order").value="asc";
    }
  }

  function sort_total() {
    var table=$('#table');
    var tbody =$('#table1');

    tbody.find('tr').sort(function(a, b) {

      if($('#acct_order').val()=='asc') {
        return (parseInt($('td', a).eq(1).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(1).text().replace(/"|\,|\./g, '')) ? 1 : -1);
      } else {
        return (parseInt($('td', a).eq(1).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(1).text().replace(/"|\,|\./g, '')) ? -1 : 1);
      }
    }).appendTo(tbody);
      
    var sort_order=$('#acct_order').val();
    if(sort_order=="asc") {
      document.getElementById("acct_order").value="desc";
    }
    if(sort_order=="desc") {
      document.getElementById("acct_order").value="asc";
    }
  }

  function sort_unlocked() {
    var table = $('#table');
    var tbody = $('#table1');

    tbody.find('tr').sort(function(a, b) {
      if($('#unlocked_order').val()=='asc') {
        return (parseInt($('td', a).eq(2).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(2).text().replace(/"|\,|\./g, '')) ? 1 : -1)
      } else {
        return (parseInt($('td', a).eq(2).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(2).text().replace(/"|\,|\./g, '')) ? -1 : 1);
      }
    }).appendTo(tbody);
    
    var sort_order=$('#unlocked_order').val();
    if(sort_order=="asc") {
      document.getElementById("unlocked_order").value="desc";
    }
    if(sort_order=="desc") {
      document.getElementById("unlocked_order").value="asc";
    }
  }

  function sort_votable() {
    var table = $('#table');
    var tbody = $('#table1');

    tbody.find('tr').sort(function(a, b) {
      if($('#votable_order').val()=='asc') {
        return (parseInt($('td', a).eq(3).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(3).text().replace(/"|\,|\./g, '')) ? 1 : -1)
      } else {
        return (parseInt($('td', a).eq(3).text().replace(/"|\,|\./g, '')) >= parseInt($('td', b).eq(3).text().replace(/"|\,|\./g, '')) ? -1 : 1);
      }
    }).appendTo(tbody);
    
    var sort_order=$('#votable_order').val();
    if(sort_order=="asc") {
      document.getElementById("votable_order").value="desc";
    }
    if(sort_order=="desc") {
      document.getElementById("votable_order").value="asc";
    }
  }

  $('#holders_table').append('<table class="table" id="mytable" align="center"></table>');
  var table = $('#holders_table').children();
  table.append( '<tr><th onclick="sort_acct();">Account</th><th onclick="sort_total();">Total FIO Balance</th><th onclick="sort_unlocked();">Unlocked*</th><th onclick="sort_votable();">Votable</th></tr>' );

  table.append('<tbody id="table1">');
  
  $.getJSON("https://fio-eosams.light.xeos.me/api/topholders/fio/fio.token/FIO/100", function (data) {
    $.each(data, function (key, entry) {
      totalBalance = parseFloat(Math.trunc(entry[1]));
      initialLock = parseFloat(Math.trunc(lockAmount[entry[0]])) || 0;      
      acctType = type[entry[0]] || "";
      inhibit = type2inhibit[entry[0]] || "";

      if (acctType == 1) {
        remainingLocked = (1-unlockFraction) * initialLock;
        unlockedBalance = totalBalance - remainingLocked;
        votableTokensFraction = unlockFraction < .3 ? .3 : unlockFraction;
        if (votableTokensFraction * initialLock > unlockedBalance) {
          votableTokens = votableTokensFraction * initialLock;
        } else {
          votableTokens = unlockedBalance
        }
      } else if (acctType == 2) {
        // partner locks
        if (inhibit == 1) { // Account is permanently locked
          remainingLocked = initialLock;
          unlockedBalance = 0;
          votableTokens = 0;
        } else {
          remainingLocked = (1-unlockFraction) * initialLock;
          unlockedBalance = totalBalance - remainingLocked;
          votableTokens = totalBalance;
        }
      } else if (acctType == 3) {
        remainingLocked = (1-unlockFraction) * initialLock;
        unlockedBalance = totalBalance - remainingLocked;
        votableTokens = totalBalance;
      } else if (acctType == 4) {
        if (totalBalance <= initialLock) {
          remainingLocked = totalBalance;
          unlockedBalance = 0;
          votableTokens = 0;
        } else {
          remainingLocked = initialLock;
          unlockedBalance = totalBalance - initialLock;
          votableTokens = totalBalance - initialLock;
        }
      } else {
        remainingLocked = 0;
        unlockedBalance = totalBalance;
        votableTokens = totalBalance;
      }

      // Because locked tokens can be used to pay fees, the remainingLocked can become less than totalBalance in some cases. 
      // This adjusts for negative unlockedBalance. But, it means Unlocked is not totally accurate...
      unlockedBalance = unlockedBalance < 0 ? 0 : unlockedBalance;

      table.append( '<tr><td><a href="https://fio.bloks.io/account/' + entry[0].toLocaleString()  + '" target="_blank">' + entry[0].toLocaleString() + '</a></td><td> ' + Math.trunc(totalBalance).toLocaleString() + '</td><td> ' + Math.trunc(unlockedBalance).toLocaleString() + '</td><td> ' + Math.trunc(votableTokens).toLocaleString()  + '</td></tr>' );  
    })
  });

  table.append('</tbody>');
  $('#holders_table').append('<input type="hidden" id="acct_order" value="desc">');
  $('#holders_table').append('<input type="hidden" id="total_order" value="desc">');
  $('#holders_table').append('<input type="hidden" id="unlocked_order" value="desc">');
  $('#holders_table').append('<input type="hidden" id="votable_order" value="desc">');

</script>





