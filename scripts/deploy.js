var ghpages = require('gh-pages');

ghpages.publish('_site', {
    branch: 'master',
    repo: 'git@github.com:MyXOF/MyXOF.github.io.git'
});
