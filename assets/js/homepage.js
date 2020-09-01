// this function is called getUserRepos
var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
    fetch(apiUrl).then(function (response) {
        // formats the response as JSON "then" captures the actual data
        response.json().then(function (data) {
            console.log(data);
        });
    });
};


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