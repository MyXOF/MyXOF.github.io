var ghpages = require('gh-pages');

ghpages.publish('_site', {
    branch: 'master',
    repo: 'https://github.com/MyXOF/MyXOF.github.io.git'
});
