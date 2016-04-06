# Cristin view package

## About

A package with the required files for cristin views.

## Copyright

This project is distributed under a GNU General Public License v3 - Take a look at the COPYING file for details.

## Required knowledge

This package require knowledge of the following technologies, technics and modules:

- [Javascript](https://en.wikipedia.org/wiki/JavaScript)
    - [ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition)
    - [Babel](https://babeljs.io)
    - [jQuery](https://jquery.com)
    - [JSON](http://jsonapi.org)
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    - [Sass](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
- [HTML](https://en.wikipedia.org/wiki/HTML)
    - [Handlebars](https://en.wikipedia.org/wiki/Handlebars_(template_system))
- [Bootstrap](http://getbootstrap.com)
- [Node.js](https://nodejs.org)
    - [NPM](https://www.npmjs.com)
- [Grunt](http://gruntjs.com) and Grunt tasks (see `Gruntfile.js` for details)
- [Bower](http://bower.io)
- [SSH](https://en.wikipedia.org/wiki/Secure_Shell)
- [Git](https://git-scm.com)
    - [Github](https://github.com)

## Install

Install [Git](http://git-scm.com) if it's not already installed on your computer. Then run (this will download this project to the folder the shell has open):

```
$ git clone https://github.com/hiof/cristin-view.git
$ git submodule init
```

Install [Node.js](http://nodejs.org) if it's not already installed on your computer. Then run the following inside the project folder(this will install the project dependencies):

```
$ sudo npm install -g grunt-cli
$ npm install
```

## Build

`$ grunt build`: Compiles and builds the cristin-view package
`$ grunt dist`: Compiles and builds the cristin-view package for distribution. Updates the files in the /dist folder.

## Deploy

### Use plugin on your site

- Get the functionality and interaction from the JavaScript file in the /dist folder.
- If you want to use the provided styling, include the CSS file in the /dist folder in your project.



### Deploy plugin to hiof.no

1. Rename secret-template.json to secret.json and add your credentials.
2. Deploy and test your code
    - The staging server for www `$ grunt deploy-staging`
3. Deploy to production
    - Deploy to www `$ grunt deploy-prod`



## Releases

[Github releases](https://github.com/hiof/cristin-view/releases)

### Roadmap

v1.0.0 - Initial cristin view
