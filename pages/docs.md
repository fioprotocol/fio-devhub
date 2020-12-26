---
layout: page
title: Documentation
permalink: /docs/
---

# Documentation

Welcome to the {{ site.title }} Documentation pages!

## Table of Contents

 <div class="section-index">
    {% for section in site.data.toc %}
        {% if section.links %}
            {% for entry in section.links %}
                <div class="entry">
                    <li class="td-sidebar-nav__section-title">
                        <h5><a href="{% if entry.url %}{{ site.baseurl }}/{{ entry.url }}{% else %}{{ entry.external_url }}{% endif %}" class="align-left pl-0 pr-2 td-sidebar-link td-sidebar-link__section">{{ entry.title }}</a></h5>
                    </li>
                </div>
            {% endfor %}
        {% endif %}
    {% endfor %}
 </div>
