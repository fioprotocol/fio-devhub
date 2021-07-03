---
title: Top FIO Token Holders
description: Top FIO Token Holders
---

# Top FIO Token Holders


<div id="here_table"> </div>


<script>
  var lockAmount, type, unlockFraction, votableTokensFraction;

  function datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second-first)/(1000*60*60*24));
  }

var date = new Date();
console.log('date: ', date)
var dt = date.getTime();  // Current date in milliseconds since 1970
console.log('dt: ', dt)

var dateGenesis = new Date( "March 30, 2020 12:09:00" );
console.log('dateGenesis: ', dateGenesis)
var dt2 = dateGenesis.getTime();  // Date of Genesis block in milliseconds since 1970
console.log('dt2: ', dt2)

var daysSinceGenesis = datediff(dt2, dt)
console.log("daysSinceGenesis: ", daysSinceGenesis);


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
  } else {unlockFraction = 1}



  $.getJSON("token-locked.txt", function (data) {
    //console.log('lockAmount: ', data["lxrxjuf3su1c"])
    lockAmount = data;
  });

  $.getJSON("token-type.txt", function (data) {
    //console.log('lockAmount: ', data["lxrxjuf3su1c"])
    type = data;
  });

  $('#here_table').append('<table class="table"></table>');
  var table = $('#here_table').children();
  table.append( '<thead><tr><th>Account</th><th>Total FIO Balance</th><th>Initial Locked Amount</th><th>Remaining Locked</th><th>Total Unlocked Balance</th><th>Votable</th><th>Type</th></tr></thead>' );
  
  $.getJSON("https://fio-eosams.light.xeos.me/api/topholders/fio/fio.token/FIO/100", function (data) {
    $.each(data, function (key, entry) {
      totalBalance = entry[1];
      initialLock = lockAmount[entry[0]] || "";      
      acctType = type[entry[0]] || "";

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

      table.append( '<tr><td>' + entry[0] + '</td><td> ' + totalBalance + '</td><td> ' + initialLock + '</td><td> ' + remainingLocked + '</td><td> ' + unlockedBalance  + '</td><td> ' + votableTokens  + '</td><td> ' + acctType + '</td></tr>' );  
    })
    //console.log('lockAmount: ', lockAmount["qwonj3f2bfzh"])
   // console.log('type: ', type["qwonj3f2bfzh"])
  });



</script>





