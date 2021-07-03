---
title: Top FIO Token Holders
description: Top FIO Token Holders
---

# Top FIO Token Holders


<div id="here_table"> </div>


<script>

  $('#here_table').append('<table class="table"></table>');
  var table = $('#here_table').children();
  table.append( '<thead><tr><th>Account</th><th>Total FIO Balance</th></tr></thead>' );
  
  $.getJSON("https://fio-eosams.light.xeos.me/api/topholders/fio/fio.token/FIO/100", function (data) {
    $.each(data, function (key, entry) {
      table.append( '<tr><td>' + entry[0] + '</td><td> ' + entry[1] + '</td></tr>' );
      $.post("http://fio.eosdetroit.io/v1/chain/get_table_rows",
      {
        "code": "eosio",
        "scope": "eosio",
        "table": "lockedtokens",
        "lower_bound": entry[0],
        "upper_bound": entry[0],
        "key_type": "i64",
        "index_position": "1",
        "json": true
      },
      function(data2, status) {
        console.log("Data: " + data2);
        $.each(data2, function (key2, entry2) {
          //console.log("Data: " + data2);       
        });
      });     
    })
  });

</script>





