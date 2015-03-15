
var _tbaUserServiceId = 'tba.user.service';
angular.module('tba')
    .factory(_tbaUserServiceId, ['tba.core.async', 'tba.core.array', 'tba.core.fakes', 'tba.core.log',
        'tba.project.service', userService]);

function userService(async, array, fakes, log, projectService) {
    var _loggedInUser = null,
        _selectedUser = null,
        _users = [],

        _service = {
            // Asncy methods
            createUserAsync: createUserAsync,
            getUsersAsync: getUsersAsync,
            getUserAsync: getUserAsync,
            updateUserAsync: updateUserAsync,
            deleteUserAsync: deleteUserAsync,

            getLoggedInUser: getLoggedInUser,
            selectUser: selectUser,
            getSelectedUser: getSelectedUser
        };

    activate();

    return _service;

    function activate() {
        var _i;
        _users = fakes.randomUsers(212, 4).map(parseUser);
        _i = fakes.randomNumber(0, _users.length);
        _loggedInUser = _users[_i];
        _loggedInUser.users = _users;
        _loggedInUser.projects = projectService.getProjects();
        _users.splice(_i, 1);
        _selectedUser = _loggedInUser;
        log.log('Activated ', _loggedInUser, _tbaUserServiceId, true);
    }

    /**********************************************************
    /* Users CRUD
     **********************************************************/
    function createUserAsync(u) {
        u.id = fakes.randomNumber(100000, 999999);
        _users.push(u);
        return async.asPromise(u);
    }

    function getUsersAsync() {
        return async.asPromise(_users);
    }

    function getUserAsync(id) {
        var _u = array.getById(_users, id);
        return async.asPromise(_u);
    }

    function getLoggedInUser() {
        return _loggedInUser;
    }

    function getSelectedUser() {
        return _selectedUser;
    }

    function updateUserAsync(u) {
        var _user = array.getById(_users, u.id);
        updateUserModel(_user, u);
        return async.asPromise(_user);
    }

    function deleteUserAsync(userId) {
        //var q = $q.defer();
        //return $q.when(dataStubs.deleteUserAsync(userId));
        //return q.promise;
    }

    function selectUser(userId) {
        _selectedUser = array.getById(_users, userId);
        return _selectedUser;
    }


    /**********************************************************
    /* Users MODELS
     **********************************************************/

    function user() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.fullName = '';
        this.mobile = '';
        this.email = '';
        this.includeWeekends = false;
        this.hours = null;
        this.imageSource = '';
        return this;
    }

    function parseUser(data) {
        var _u = new user();
        _u.id = data.id;
        _u.firstName = data.firstName;
        _u.lastName = data.lastName;
        _u.fullName = _u.firstName + " " + _u.lastName;
        _u.imageSource = data.imageSource;
        _u.mobile = data.mobile;
        _u.email = data.email;
        _u.includeWeekends = data.includeWeekends;
        _u.hours = data.hours.map(parseWorkingHours);
        _u.active = false;
        return _u;
    };

    function updateUserModel(userModel, updates) {
        userModel.firstName = updates.firstName;
        userModel.lastName = updates.lastName;
        userModel.fullName = userModel.firstName + " " + userModel.lastName;
        userModel.imageSource = updates.imageSource;
        userModel.mobile = updates.mobile;
        userModel.email = updates.email;
        userModel.includeWeekends = updates.includeWeekends;
        userModel.hours = updates.hours.map(parseWorkingHours);
        userModel.active = updates.active;
        return userModel;
    };

    function workingHours() {
        this.start = new workingHoursStartEnd();
        this.end = new workingHoursStartEnd();
        function workingHoursStartEnd() {
            this.hour = 0;
            this.minute = 0;
            return this;
        };
        return this;
    };

    function parseWorkingHours(data) {
        var _wh = new workingHours();
        _wh.start.hour = data.start.hour;
        _wh.start.minute = data.start.minute;
        _wh.end.hour = data.end.hour;
        _wh.end.minute = data.end.minute;
        return _wh;
    };

}