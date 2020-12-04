## Set up local dev environment

1. Install the prerequesites:

* Install [Jekyll](https://jekyllrb.com/docs/installation/)
* Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Install [Bundler](https://bundler.io/)

2. Clone the repository:

` $ git clone https://github.com/fioprotocol/fio-devhub --recursive `

3. Navigate to your local site and run the Jekyll site locally:

```
$ cd fio-devhub
$ bundle install
$ bundle exec jekyll serve

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

4. To preview your site, in your web browser, navigate to `http://localhost:4000`

Additional resources:

* [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)

## Edit content

Site layout:

```
FIO-DEVHUB
  |-- _data (The yaml data used by the site)
  |-- _includes (Reusable html code)
  |-- _layouts (Layouts for different content sections.)
  |-- assets (css, js, and images)
  |-- pages (The main markdown content pages)
  ```

To update a page, edit the markdown file in the `pages` directory.

If you want to add a new page to the `For Integrators` section:

1. Create the .md file in the `pages` directory.
2. Reference the correct `_layout` html file at the top of the new page.
3. Include the new page in `_data/sidebars.yml` 

If you are running the site preview, as described above, your changes will automatically appear in the preview.

## Deploy site

A push to the `master` branch will automatically update the website (it takes a few seconds to update).
