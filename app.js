// Declare the AngularJS module
var app = angular.module('contactApp', []);

// Authentication Controller
app.controller('AuthController', function($scope, $window) {
    // Hardcoded credentials for login
    const USER_CREDENTIALS = {
        username: 'user123',
        password: 'password123'
    };

    const AUTH_TOKEN_KEY = 'auth_token';

    // Login state variables
    $scope.loginData = {};
    $scope.errorMessage = '';

    // Check if the user is logged in
    $scope.isLoggedIn = function() {
        return $window.localStorage.getItem(AUTH_TOKEN_KEY) !== null;
    };

    // Login function
    $scope.login = function() {
        if (
            $scope.loginData.username === USER_CREDENTIALS.username &&
            $scope.loginData.password === USER_CREDENTIALS.password
        ) {
            $window.localStorage.setItem(AUTH_TOKEN_KEY, 'valid_token');
            $scope.loginData = {}; // Reset the form
            $scope.errorMessage = '';
        } else {
            $scope.errorMessage = 'Invalid username or password.';
        }
    };

    // Logout function
    $scope.logout = function() {
        $window.localStorage.removeItem(AUTH_TOKEN_KEY);
    };
});

// Contact Management Controller
app.controller('ContactController', function($scope) {
    // Initialize the contacts list
    $scope.contacts = [];

    // Initialize the newContact object
    $scope.newContact = {};

    // Add a new contact
    $scope.addContact = function() {
        if ($scope.newContact.name && $scope.newContact.email && $scope.newContact.phone) {
            $scope.contacts.push({
                name: $scope.newContact.name,
                email: $scope.newContact.email,
                phone: $scope.newContact.phone
            });
            $scope.newContact = {}; // Reset the form
        } else {
            alert('Please fill in all fields to add a contact.');
        }
    };

    // Edit an existing contact
    $scope.editContact = function(index) {
        var contact = $scope.contacts[index];
        $scope.newContact.name = contact.name;
        $scope.newContact.email = contact.email;
        $scope.newContact.phone = contact.phone;
        $scope.contacts.splice(index, 1); // Remove the contact being edited
    };

    // Remove a contact
    $scope.removeContact = function(index) {
        $scope.contacts.splice(index, 1);
    };
});
