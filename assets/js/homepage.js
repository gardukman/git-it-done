// this function is called getUserRepos
var getUserRepos = function (user) {
    // this is the format the github api url will take
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
    fetch(apiUrl).then(function (response) {
        // when the response data is converted to JSON it will be sent from getUserRepos to displayRepos
        response.json().then(function (data) {
            displayRepos(data, user);
        });
    });
};

// calls to the repos-container id in the html and sends it down to the displayRepos function
var repoContainerEl = document.querySelector("#repos-container");
// calls to the repo-search-term id in the html and sends it to the displayRepos function
var repoSearchTerm = document.querySelector("#repo-search-term");


// this variable is the element taken from the "user-form" container in html
var userFormEl = document.querySelector("#user-form");
// this variable is the element taken from the "username" input in the html
var nameInputEl = document.querySelector("#username");

// prevents the page from refreshing when the button is clicked
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    
};

// the event listener takes the "user-form" when submitted 
userFormEl.addEventListener("submit", formSubmitHandler);

// this function is called displayRepos
var displayRepos = function(repos, searchTerm) {
    // takes the data from the repoContainerEl var and puts it into a string
    repoContainerEl.textContent = "";
    // takes the data from the repoSearchTerm var
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name - format the appearance of the name and repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        // create a <div> container for each repo
        var repoEl = document.createElement("div");
        // sets the repos class 
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // creat a span element to hold repository name
        var titleEl = document.createElement("span");
        // puts the repoName into the span element
        titleEl.textContent = repoName;

        // create a status element
        var statusEl = document.createElement("span");
        // sets the class for statusEl
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            // if the number of issues is > 0 this writes the html for statusEl to set an icon and strings out the number of issues
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            // if the number os issues is !> 0 this writes the html to set an icon accordingly
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container - formats the info from statusEl to the div
        repoEl.appendChild(statusEl);

        // append to container - formats the span to fit in the div
        repoEl.appendChild(titleEl);

        // append container to the dom - formats to the container in html
        repoContainerEl.appendChild(repoEl);
    }
};