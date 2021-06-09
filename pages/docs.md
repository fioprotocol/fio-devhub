---
layout: page
title: Documentation
permalink: /docs/
redirect_from:
  - /fio-protocol/code
  - /fio-protocol/accounts
  - /fio-protocol/accounts/linkauth
  - /fio-protocol/multisig
  - /fio-protocol/resource-management
  - /fio-protocol/tpid
  - /sdks/ios-swift
  - /sdks/kotlin
  - /sdks/javascript-typescript
  - /tools/clio
  - /wallet-integration-guide/options
  - /wallet-integration-guide/sample-wallet-ux
  - /wallet-integration-guide/demo
  - /wallet-integration-guide/mapping-pub-addresses
  - /wallet-integration-guide/encrypting-fio-data
  - /wallet-integration-guide/registration-site
  - /exchange-integration-guide/options
  - /exchange-integration-guide/fio-integration
  - /fio-chain/node
  - /fio-chain/history
  - /fio-chain/testnet
  - /fio-chain/mainnet
  - /fio-chain/voting
  - /fio-chain/bp
  - /fio-chain/vulnerability-disclosure-policy
  - /help/contact-us
---

# Documentation

Welcome to the {{ site.title }} Documentation pages!

## Table of Contents

 <div class="section-index">
    {% for section in site.data.toc %}
        <li class="td-sidebar-nav__section-title">
            <h4><b><a href="{% if section.url %}{{ site.baseurl }}/{{ section.url }}{% else %}{{ section.external_url }}{% endif %}" class="align-left pl-0 pr-2 td-sidebar-link td-sidebar-link__section">{{ section.title }}</a></b></h4>
        </li>
        {% if section.links %}
            {% for entry in section.links %}
                <div class="entry">
                    <li class="td-sidebar-nav__section-title">
                        <h6><a href="{% if entry.url %}{{ site.baseurl }}/{{ entry.url }}{% else %}{{ entry.external_url }}{% endif %}" class="align-left pl-0 pr-2">{{ entry.title }}</a></h6>
                    </li>
                </div>
            {% endfor %}
        {% endif %}
    {% endfor %}
 </div>
