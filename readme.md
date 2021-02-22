---
title: Readme
tags: 
 - jekyll
 - github
description: Getting started with FIO Devhup using Docsy Jekyll
---

This site was forked from [vsoch docsy-jekyll](https://github.com/vsoch/docsy-jekyll). Documentation can be found at <https://vsoch.github.io/docsy-jekyll/>.

# Getting Started with FIO Developers Hub 

## Site layout:

```
FIO-DEVHUB
  |-- _data (The yaml data used by the site)
  |-- _docs (The documentation pages)
  |-- _includes (Reusable html code)
  |-- _layouts (Layouts for different content sections.)
  |-- _posts (Not used. Possible future dev blog.)
  |-- assets (css, js, and images)
  |-- pages (The API and other markdown content pages)
```


## Quickstart

The website is structured in a way to have the code (HTML/CSS) separated from the content ([Markdown](https://kramdown.gettalong.org/syntax.html)), so that contributors only need to edit easily readable markdown files and not touch any program code.

### Before you start

Before you can edit any code or content of this website, you need to create your copy of this git repository. This can be done by forking the repo into your Github account, via the **"Fork"** button at the top right of the Github Web-UI: <https://help.github.com/articles/fork-a-repo>

This fork/copy of the website is just for you. You can experiment with it, change files, submit git commits – all without the fear of breaking anything on the upstream (original) Devhub website repository. Once you're happy with your changes, you can submit a pull request from your fork (`origin`) to the original Devhub website git repository (`upstream`).

All changes should be made to the **master** branch.

### Quickly change a page online

If you want to quickly update a page, find the page and section of your content. The documentation is located in `/docs`. Assets, such as images, are located in `/assets`. You can also use the search functionality inside the GitHub header menu.

Once you found the relevant page, you can use the integrated Github Markdown online-editor to propose a change directly from within the Github Web-UI.

### Working on the website

If you want to do regular work on the website, like adding pages, changing pages, updating translations, ... you should not do this via the (limited Github Online-Editor), but rather use a real text or [Markdown editor](https://jbt.github.io/markdown-editor/), like [VS Code](https://code.visualstudio.com/) or [Atom](https://atom.io/), and add, remove or modify the files in there. Using a text editor like **VS Code** allows you to use it's full-text search across all website files, so that you can quickly find the content, which you would like to modify: <https://code.visualstudio.com/docs/editor/codebasics#_search-across-files>.

Refer to the "Setting up your local dev environment" section below for more information on setting up a local dev environment. 

## User Interaction

On the right side of any Documentation page, you'll notice links to edit the page, or open an issue. This ensures that any time you have a question or want to suggest or request a change, you can do so immediately and link directly to the section of interest. The sections on the page also have permalinks so you can link directly to them.

## Documentation

Documentation pages should be written in the `docs` folder of the repository,
and you are allowed to use whatever level of nesting (subfolders) that 
works for you! It's a Jekyll [collection](https://jekyllrb.com/docs/collections/), which means that you
can add other content (images, scripts) and it will be included for linking to.

### Organization

The url that will render is based on the path. For example, if we had the following structure:

```
docs/
  getting-started.md
  clusters/
     sherlock/
         getting-started.md
```

The first page (akin to the one you are reading) would render at it's path,
`/docs/getting-started/`.

## Editing Tips

### Linking

From that page, we could provide the
direct path in markdown to any subfolder to link to it, such as the second
getting started page for sherlock:

```
{% raw %}[example](clusters/sherlock/getting-started.md){% endraw %}
```

[Here](example-page) is an example link to a relative path of a file (`example-page.md`)
in the same directory, and from that page you can test linking to a subfoldr.
In the case of not having a subfolder, we could write the link out directly:

```
{% raw %}[example]({{ site.baseurl }}/docs/clusters/sherlock/getting-started.md){% endraw %}
```

or just put the relative path:

```
{% raw %}[Here](example-page){% endraw %}
```

or better, there is a shortand trick! We can use the provided "includes" 
template to do the same based on the path to create a link:

```
{% raw %}{% include doc.html name="Sherlock Cluster" path="clusters/sherlock/getting-started" %}{% endraw %}
```
The path should be relative to the docs folder.

## Pages

The `pages` folder uses the same page layout, but is not part of the docs collection.
The two are provided to create a distinction between website pages (e.g., about,
feed.xml) and documentation pages.  

## Navigation

Whether you place your page under "pages" or "docs," for those pages that you want added to the navigation, 
you should add them to `_data/toc.yml`. If you've defined a `permalink` in the
front end matter, you can use that (e.g., "About" below). If you haven't and
want to link to docs, the url is the path starting with the docs folder.
Here is an example (currently the active example):

```yaml
- title: Documentation
  url: docs
  links:
    - title: "Getting Started"
      url: "docs/getting-started"
      children:
        - title: Features
          url: "docs/getting-started#getting-started"
        - title: Development
          url: "docs/getting-started#development"
        - title: Customization
          url: "docs/getting-started#customization"
    - title: "Extras"
      url: "docs/extras"
      children:
        - title: Quizzes
          url: "docs/extras/example-quiz"
    - title: "About"
      url: "about"
    - title: "News"
      url: "news
```

If you want to add an external url for a parent or child, do this:

```yaml
  - title: GitHub Repository
    external_url: https://www.github.com/vsoch/mkdocs-jekyll
```

## Search

The entire site, including posts and documentation, is indexed and then available
for search at the top or side of the page. Give it a try! The content is rendered
into window data that is used by lunr.js to generate the search results.
If you want to exclude any file from search, add this to its front end matter:

```
---
layout: null
excluded_in_search: true
---
```

The example above is for a javascript file in the assets folder that is used as a template,
but should not be included in search.

## News Posts (Future)

It might be the case that your site or group has news items that would
warrent sharing with the community, and should be available as a feed.
For this reason, you can write traditional [posts](https://jekyllrb.com/docs/posts/) in the `_posts`
folder that will parse into the site [feed]({{ site.baseurl }}/feed.xml)
The bottom of the page links the user to a post archive, where posts are organized
according to the year.

## Buttons

Buttons come in a nice array of colors. Here is the code for a basic example,
and you'd want to vary the `.btn-<tag>` to get different classes.

```html
<button class="btn btn-success">.btn-success</button>
```

<button class="btn btn-success">.btn-success</button>
<button class="btn btn-info">.btn-info</button>
<button class="btn btn-secondary">.btn-secondary</button>
<button class="btn btn-primary">.btn-primary</button>
<button class="btn btn-danger">.btn-danger</button>
<button class="btn btn-warning">.btn-warning</button>

## Badges

For news post items, it's nice to be able to tag it with something that indicates
a status, such as "warning" or "alert." For this reason, you can add badges to
the front end matter of any post page, and they will render colored by a type,
with the tag of your choice. For example, here is an example header for
a post:

```yaml
---
title:  "Two Thousand Nineteen"
date:   2019-06-28 18:52:21
categories: jekyll update
badges:
 - type: warning
   tag: warning-badge
 - type: danger
   tag: danger-badge
---
```

And here is the post preview with the rendered badges that it produces:

<span class="badge badge-warning">warning-badge</span>
<span class="badge badge-danger">danger-badge</span>

And the other badges that you can define include success, info, secondary,
and primary.

<span class="badge badge-success">success-badge</span>
<span class="badge badge-info">info-badge</span>
<span class="badge badge-secondary">secondary-badge</span>
<span class="badge badge-primary">primary-badge</span>

## Alerts

{% include alert.html type="info" title="What is an alert?" content="An alert is a box that can stand out to indicate important information. You can choose from levels success, warning, danger, info, and primary. This example is an info box, and the code for another might look like this:" %}

```
{%raw%}{% include alert.html type="info" title="Here is another!" %}{%endraw%}
```

Here are all the types:

{% include alert.html type="warning" content="This is a warning" %}
{% include alert.html type="danger" content="This alerts danger!" %}
{% include alert.html type="success" content="This alerts success" %}
{% include alert.html type="info" content="This is useful information." %}
{% include alert.html type="primary" content="This is a primary alert" %}
{% include alert.html type="secondary" content="This is a secondary alert" %}

## Quotes

You can include block quotes to emphasize text. 

> Here is an example. Isn't this much more prominent to the user?

## Setting up your local dev environment

Initially (on OS X), you will need to setup [Brew](http://brew.sh/) which is a package manager for OS X and [Git](https://git-scm.com/). To install Brew and Git, run the following commands:

### Install Jekyll

You can install Jekyll with brew.

```bash
$ brew install ruby
$ gem install jekyll
$ gem install bundler
$ bundle install
```

On Ubuntu, a different method may work better:

```bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
rbenv install 2.3.1
rbenv global 2.3.1
gem install bundler
rbenv rehash
ruby -v

# Rails
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
gem install rails -v 4.2.6
rbenv rehash

# Jekyll
gem install jekyll
gem install github-pages
gem install jekyll-sass-converter

rbenv rehash
```

### Clone repository

Next, clone the fio-devhub repository:

` $ git clone https://github.com/fioprotocol/fio-devhub --recursive `

All development should occur off of the **master** branch.

### Serve

To review your fixes, navigate to your local github site and run the Jekyll site locally. Depending on how you installed jekyll:

```bash
$ jekyll serve
 or
$ bundle exec jekyll serve
```

This should serve the site and display the local site information.

```
> Configuration file: /Users/octocat/my-site/_config.yml
>            Source: /Users/octocat/my-site
>       Destination: /Users/octocat/my-site/_site
> Incremental build: disabled. Enable with --incremental
>      Generating...
>                    done in 0.309 seconds.
> Auto-regeneration: enabled for '/Users/octocat/my-site'
> Configuration file: /Users/octocat/my-site/_config.yml
>    Server address: http://127.0.0.1:4000/
>  Server running... press ctrl-c to stop.
```

To preview your site, in your web browser, navigate to `http://127.0.0.1:4000/`

Additional resources:

* [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)

