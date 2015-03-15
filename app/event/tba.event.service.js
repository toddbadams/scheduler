var _tbaEventServiceId = 'tba.event.service';
angular.module('tba')
    .factory(_tbaEventServiceId, ['tba.core.async', 'tba.core.fakes', 'tba.core.array', 'tba.core.log',
        'tba.user.service', 'tba.project.service', eventService]);

function eventService(async, fakes, array, log, userService, projectService) {
    var _selectedEvent = null,      // currently selected (editing) event
        _selectedDate = moment(),   // currently selected date
        _today = moment(),          // today
        _events = [],               // all events for the logged in user

        _service = {
            // async methods
            createEventAsync: createEventAsync,
            getEventsAsync: getEventsAsync,
            updateEventAsync: updateEventAsync,
            deleteEventAsync: deleteEventAsync,
            searchEventsAsync: searchEventsAsync,

            // selected event (only one)
            selectEvent: selectEvent,
            unselectEvent: unselectEvent,
            getSelectedEvent: getSelectedEvent,

            // title
            getDayTitle: getDayTitle,
            getWeekTitle: getWeekTitle,
            getMonthTitle: getMonthTitle,

            // selected date (only one)
            selectDate: selectDate,
            getSelectedDate: getSelectedDate,

            // init 
            activateAsync: activateAsync,

            // event helpers
            getEventDuration: getEventDuration,
            getEventTimeLabel: getEventTimeLabel
        };

    return _service;

    function activateAsync() {
        // load the database full of fake events
        var _fromDate = _today.subtract(30, 'days');
        var _user = userService.getLoggedInUser();

        _events = fakes.randomUserEvents(_user, _fromDate, 60, _user.projects);
        _events = _events.map(parseEvent);
        log.log('Activated ', _events, _tbaEventServiceId, true);
        return async.asPromise(_events);

    }

    /********************************************************************/
    /*     Selected Date                                                */
    /********************************************************************/
    function selectDate(d) {
        _selectedDate = moment(d);
        return getDayTitle();
    }

    function getSelectedDate() {
        return _selectedDate;
    }

    /********************************************************************/
    /*    Title                                                         */
    /********************************************************************/
    function getDayTitle() {
        return _selectedDate.format("MMMM Do YYYY");
    }

    function getWeekTitle() {
        var _dow = _selectedDate.day(),
            _m = moment(_selectedDate).subtract((_dow - 1), 'day').format("dddd Do"),
            _f = moment(_selectedDate).add((5 - _dow), 'day').format("dddd Do, MMMM  YYYY");
        return _m + ' to ' + _f;
    }

    function getMonthTitle() {
        return _selectedDate.format("MMMM  YYYY");
    }

    /**********************************************************
    /* Events CRUD
     **********************************************************/
    function createEventAsync(e) {
        e.id = fakes.randomNumber(100000, 999999);
        e.title = 'new appointment';
        e = parseEvent(e);
        _events.push(e);
        _selectedEvent = e;
        return async.asPromise(e);
    }

    function getEventsAsync(fromDate, toDate, timezone) {
        var _userId = userService.getLoggedInUser().id;
        if (_events.length > 0) {
            return getEventsFromCache(_userId, fromDate, toDate, timezone);
        }
        return activateAsync().then(function () {
            return getEventsFromCache(_userId, fromDate, toDate, timezone);
        });
    }

    function getEventsFromCache(userId, fromDate, toDate) {
        var _userEvents = _events
            .filter(function (e) {
                return e.user.id === userId;
            })
        .filter(function (e1) {
            return e1.start.diff(fromDate) > 0;
        }).filter(function (e2) {
            return e2.start.diff(toDate) < 0;
        });
        return async.asPromise(_userEvents);
    }

    function updateEventAsync(u) {
        var _event = array.getById(_events, u.id);
        updateEventAsyncModel(_event, u);
        return async.asPromise(_event);
    }

    function deleteEventAsync(eventId) {
    }

    function selectEvent(eventId) {
        _selectedEvent = array.getById(_events, eventId);
        return _selectedEvent;
    }

    function unselectEvent() {
        _selectedEvent = null;
        return _selectedEvent;
    }

    function getSelectedEvent() {
        return _selectedEvent;
    }

    function searchEventsAsync(search, projectId) {
        var l = search.length,
            results;
        if (_events.length > 0) {
            results = _events.filter(searchFilter);
            return async.asPromise(results);
        }
        return activateAsync().then(function () {
            results = _events.filter(searchFilter);
            return async.asPromise(results);
        });

        function searchFilter(e) {
            var f = e.title.substr(0, l),
                d = e.description.substr(0, l);

            return (f === search) || (d === search);
        }
    }

    /**********************************************************
    /* Events MODELS
     **********************************************************/
    function event() {
        this.id = 0;
        this.userId = 0;
        this.userId = null;
        this.project = null;
        this.projectId = 0;
        this.entitledProjects = [];
        this.start = null;
        this.end = null;
        this.title = '';
        this.description = '';
        this.editable = true;
        return this;
    }

    function parseEvent(data) {
        var _e = new event();
        _e.id = data.id;
        _e.userId = data.user.id;
        _e.user = data.user;
        _e.projectId = data.project ? data.project.id : 0;
        _e.project = data.project;
        _e.entitledProjects = data.entitledProjects;
        _e.start = moment(data.start);
        _e.end = moment(data.end);
        _e.title = data.title;
        _e.description = data.description;
        _e.complete = data.complete;
        _e.editable = !data.complete;
        _e.action = data.action;
        _e.gps = data.gps;
        _e.inProgress = data.inProgress;
        return _e;
    }

    function updateEventAsyncModel(e, data) {
        e.userId = data.userId;
        e.user = data.user;
        e.project = data.project;
        e.projectId = data.projectId;
        e.entitledProjects = data.entitledProjects;
        e.start = data.start;
        e.end = data.end;
        e.title = data.title;
        e.description = data.description;
        e.complete = data.complete;
        e.editable = !data.complete;
        e.action = data.action;
        e.gps = data.gps;
        e.inProgress = data.inProgress;
        return e;
    }

    function getEventTimeLabel(e, timeFormat) {
        return moment(e.start).format(timeFormat) + ' to ' + moment(e.end).format(timeFormat);
    }

    function getEventDuration(e) {
        return moment.duration(e.end.diff(e.start)).humanize();
    }
}
