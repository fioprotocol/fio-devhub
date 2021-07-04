---
title: Top FIO Token Holders
description: Top FIO Token Holders
---

# Top FIO Token Holders


<div id="here_table"> 
</div>



<script>
  var totalBalance, unlockedBalance, lockAmount, type, unlockFraction, votableTokensFraction;

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
        return (parseInt($('td', a).eq(1).text()) >= parseInt($('td', b).eq(1).text()) ? 1 : -1);
      } else {
        return (parseInt($('td', a).eq(1).text()) >= parseInt($('td', b).eq(1).text()) ? -1 : 1);
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
        return (parseInt($('td', a).eq(2).text()) >= parseInt($('td', b).eq(2).text()) ? 1 : -1)
      } else {
        return (parseInt($('td', a).eq(2).text()) >= parseInt($('td', b).eq(2).text()) ? -1 : 1);
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
        return (parseInt($('td', a).eq(3).text()) >= parseInt($('td', b).eq(3).text()) ? 1 : -1)
      } else {
        return (parseInt($('td', a).eq(3).text()) >= parseInt($('td', b).eq(3).text()) ? -1 : 1);
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

  $('#here_table').append('<table class="table" id="mytable" align="center"></table>');
  var table = $('#here_table').children();
  table.append( '<tr><th onclick="sort_acct();">Account</th><th onclick="sort_total();">Total FIO Balance</th><th onclick="sort_unlocked();">Unlocked</th><th onclick="sort_votable();">Votable</th><th>(Initial Locked)</th><th>(Locked)</th><th>(Type)</th></tr>' );

  table.append('<tbody id="table1">');
  
  $.getJSON("https://fio-eosams.light.xeos.me/api/topholders/fio/fio.token/FIO/100", function (data) {
    $.each(data, function (key, entry) {
      totalBalance = parseFloat(Math.trunc(entry[1]));
      initialLock = parseFloat(Math.trunc(lockAmount[entry[0]])) || 0;      
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

      table.append( '<tr><td>' + entry[0] + '</td><td> ' + Math.trunc(totalBalance) + '</td><td> ' + Math.trunc(unlockedBalance) + '</td><td> ' + Math.trunc(votableTokens)  + '</td><td> ' + Math.trunc(initialLock) + '</td><td> ' + Math.trunc(remainingLocked) + '</td><td> ' + acctType + '</td></tr>' );  
    })
    //console.log('lockAmount: ', lockAmount["qwonj3f2bfzh"])
   // console.log('type: ', type["qwonj3f2bfzh"])
  });

  table.append('</tbody>');
  $('#here_table').append('<input type="hidden" id="acct_order" value="desc">');
  $('#here_table').append('<input type="hidden" id="total_order" value="desc">');
  $('#here_table').append('<input type="hidden" id="unlocked_order" value="desc">');
  $('#here_table').append('<input type="hidden" id="votable_order" value="desc">');

</script>





