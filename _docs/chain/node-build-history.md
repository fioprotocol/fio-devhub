---
title: V1 History configuration
description: V1 History configuration
---

# V1 History configuration

If the light-history (v1 history) feature is needed, make sure the following parameters are set in your `config.ini`:

```
plugin = eosio::history_plugin
plugin = eosio::history_api_plugin
filter-on = *
filter-out = eosio:onblock:
history-per-account = 9223372036854775807
history-index-state-db-size-mb = 1000000
history-state-db-size-mb = 4000000
```

{% include alert.html type="warning" content="Without the history-index-state-db-size-mb and history-state-db-size-mb settings nodes may stop with the warning: Database has reached an unsafe level of usage, shutting down to avoid corrupting the database. Please increase the value set for *chain-state-db-size-mb* and restart the process!" %}

{% include alert.html type="info" content="The `history-per-account` setting will truncate the number of actions stored for an account. Given the number of potential internal-actions called in each trace, it may be desirable to decrease this number if the history indexes become too large. Otherwise, keeping it at the max is recommended." %}
