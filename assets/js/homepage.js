// this function is called getUserRepos
var getUserRepos = function() {
    // fetches information from this url
    fetch("https://api.github.com/users/octocat/repos");

};

getUserRepos();