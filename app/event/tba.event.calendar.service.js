(function(){
    
var _tbaEventCalendarControllerId = 'tba.event.calendar.service';
angular.module('tba')
    .factory(_tbaEventCalendarControllerId, ['$window', '$timeout',
        'tba.core.async', 'tba.core.log', 'tba.core.dom', 'settings',
        'tba.user.service', 'tba.event.service', calendar]);

function calendar($window, $timeout, async, log, dom, settings, userService, eventService) {
    var _$cal = null,
        _events = [],
        _options = {},

    _service = {
        // calendar
        activate: activate,
        startEvent: startEvent,
        completeEvent: completeEvent
    },
        _vm = null;


    return _service;

    /********************************************************************/
    /*     Event editing buttons                                        */
    /********************************************************************/
    function startEvent(event) {
        event.inProgress = true;
        updateEvent(event);
        _vm.alertMessage = null;
        log.log('Event started', event, _tbaEventCalendarControllerId, false);
    }

    function completeEvent(event) {
        if (event.action === null) event.action = '';
        event.inProgress = false;
        event.complete = true;
        event.editable = false;
        updateEvent(event);
        _vm.alertMessage = 'This appointment has been marked as complete, and locked.';
        log.log('Event completed', event, _tbaEventCalendarControllerId, false);
    }

    /********************************************************************/
    /*     Selecting a date                                             */
    /********************************************************************/
    function next() {
        _vm.alertMessage = null;
        _$cal.fullCalendar('next');
        _vm.selectedDate = _$cal.fullCalendar('getDate');
        _vm.title = eventService.selectDate(_vm.selectedDate);
        _vm.event = eventService.unselectEvent();
        log.log('Next selected', null, _tbaEventCalendarControllerId, false);
    }

    function prev() {
        _vm.alertMessage = null;
        _$cal.fullCalendar('prev');
        _vm.selectedDate = _$cal.fullCalendar('getDate');
        var _inPast = moment().hour(0).minute(0).diff(_vm.selectedDate) > 0;
        _$cal.fullCalendar('option', 'editable', !_inPast);
        _$cal.fullCalendar('render');
        _vm.title = eventService.selectDate(_vm.selectedDate);
        _vm.event = eventService.unselectEvent();
        log.log('Previous selected', null, _tbaEventCalendarControllerId, false);
    }

    /********************************************************************/
    /*     Calendar event   event handlers                              */
    /********************************************************************/

    function select(start, end) {
        var _u = userService.getLoggedInUser();
        var _e = {
            user: _u,
            userId: _u.id,
            project: null,
            projectId: 0,
            entitledProjects: _u.projects,
            start: start,
            end: end,
            title: '',
            description: '',
            complete: false,
            action: '',
            gps: null,
            inProgress: false
        };

        eventService.createEventAsync(_e)
            .then(loadEvent);

        function loadEvent(e) {
            _$cal.fullCalendar('unselect');
            _$cal.fullCalendar('refetchEvents');
            log.logSuccess('A new appointment has been added to your calendar.', null, _tbaEventCalendarControllerId, true);
        }
    }

    function dayClick(date, jsEvent, view) {
        _vm.alertMessage = null;
        if (view.name !== 'agendaDay') {
            eventService.selectDate(date);
            eventService.unselectEvent();
            $window.location.href = '/#/day';
            return;
        }
    }

    function eventClick(event, jsEvent, view) {
        _vm.alertMessage = null;
        if (view.name !== 'agendaDay') {
            eventService.selectDate(event.start);
            eventService.selectEvent(event.id);
            $window.location.href = '/#/day';
            return;
        }
        updateEventVm(event);
        log.log('Event clicked', event, _tbaEventCalendarControllerId, false);
    }

    function eventDrop(event) {
        log.logSuccess(event.title + ' starting time: ' + event.start.format('hh:mm a'), null, _tbaEventCalendarControllerId, true);
        eventService.updateEventAsync(event)
            .then(updateEventVm);
        log.log('Event dropped', event, _tbaEventCalendarControllerId, false);
    }

    function eventResize(event) {
        updateEventVm(event);
        eventService.updateEventAsync(event);
        log.log('Event resized', event, _tbaEventCalendarControllerId, false);
        log.logSuccess(event.title + ' duration: ' + eventService.getEventDuration(event), null, _tbaEventCalendarControllerId, true);
    }

    function updateEvent(event) {
        eventService.updateEventAsync(event);
        _vm.alertMessage = null;
        _$cal.fullCalendar('updateEvent', event);
        log.log('Event updated', event, _tbaEventCalendarControllerId, false);
    }

    function updateEventVm(event) {
        $timeout(function(){
        _vm.event = event;
        _vm.event.timeLabel = eventService.getEventTimeLabel(event, 'h:mm a');
        _vm.event.duration = eventService.getEventDuration(event);
        _vm.$apply();
        });
    }

    //  INCOMMING DOM
    //<div class="fc-event " >
    //    <div class="fc-event-inner">
    //        <div class="fc-event-time">7:00 - 8:30</div>
    //        <div class="fc-event-title">lighting programming</div>
    //    </div>
    //    <div class="fc-event-bg"></div>
    //    <div class="ui-resizable-handle ui-resizable-s">=</div>
    //</div>
    function eventRenderDay(event, element) {
        var _projTitle = event.project ? event.project.title : '',
            _css = event.complete ? ' label-success' : event.inProgress ? ' label-warning' : '',
            _status = event.complete ? '&nbsp;&mdash;&nbsp;COMPLETED' : event.inProgress ? '&nbsp;&mdash;&nbsp;IN PROGRESS' : '',
            _html =
                '<div class="fc-event-header">'
                    + '<span class="pull-right"><span class="fa fa-clock-o"></span> '
                    + eventService.getEventTimeLabel(event, 'h:mm a') + '</span>'
                    + event.title + ' (' + eventService.getEventDuration(event) + ')'
                    + _status
                    + '</div>'
                    + '<div class="fc-event-body">'
                    + '<span class="fc-event-project">' + _projTitle + '</span>&nbsp;&nbsp;'
                    + event.description
                    + (event.complete ? '<hr/><strong>' + event.action + '</strong>' : '')
                    + '</div> ';


        element.find('.fc-time').remove();
        element.find('.fc-title').remove();
        element.find('.fc-content').parent().addClass(_css);
        element.find('.fc-content').prepend(_html);
    }

    function eventRenderWeek(event, element) {
        var _projTitle = event.project ? event.project.title : '',
            _css = event.complete ? ' label-success' : event.inProgress ? ' label-warning' : '',
            _html =
                '<div class="fc-event-header">'
                    + eventService.getEventTimeLabel(event, 'h:mm a')
                    + '</div>'
                    + '<div class="fc-event-body">'
                    + '<span class="fc-event-project">' + _projTitle + '</span>&nbsp;&nbsp;'
                    + event.title
                    + '</div> ';


        element.find('.fc-time').remove();
        element.find('.fc-title').remove();
        element.find('.fc-content').parent().addClass(_css);
        element.find('.fc-content').prepend(_html);

    }

    /********************************************************************/
    /*     on service activation                                        */
    /********************************************************************/
    function activate(domId, scope) {
        _vm = scope;
        _vm.alertMessage = null;
        _vm.next = next;
        _vm.prev = prev;
        _vm.updateEvent = updateEvent;
        _vm.selectedUser = userService.getSelectedUser();
        _vm.selectedEvent = eventService.getSelectedEvent();
        _vm.view = {
            day: domId === 'day-calendar',
            week: domId === 'week-calendar',
            month: domId === 'month-calendar'
        };
        if (_vm.selectedEvent !== null) {
            updateEventVm(_vm.selectedEvent);
        }
        if (_vm.view.day) {
            _vm.title = eventService.getDayTitle();
        }
        if (_vm.view.week) {
            _vm.title = eventService.getWeekTitle();
        }
        if (_vm.view.month) {
            _vm.title = eventService.getMonthTitle();
        }

        _vm.showLateNotification = false;
        _vm.lateMessage = null;
        _vm.startEvent = startEvent;
        _vm.completeEvent = completeEvent;
        _vm.toggleLateNofitication = toggleLateNofitication;
        _vm.late = late;
        _vm.sendLateMessage = sendLateMessage;

        window.foo = _vm;
        _$cal = $('#' + domId);

        async.allAsync([], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaEventCalendarControllerId })
            .then(onload);
    }

    function buildOptions() {
        var _date = eventService.getSelectedDate(),
            _inPast = moment().hour(0).minute(0).diff(_date) > 0;

        _options = {
            allDaySlot: false,
            timeFormat: 'H:mm',
            header: false,
            minTime: '07:00:00',
            maxTime: '19:00:00',
            height: dom.getDocumentHeight(80, 0, 480),
            eventClick: eventClick,
            eventDrop: eventDrop,
            eventResize: eventResize,
            dayClick: dayClick,
            defaultDate: _date,
            events: getEventsAsync,
            slotEventOverlap: false
        };

        if (_vm.view.day) {
            _options.eventRender = eventRenderDay;
            _options.defaultView = 'agendaDay';
            _options.selectable = true;
            _options.selectHelper = true;
            _options.select = select;
        }
        if (_vm.view.month) {
            _options.defaultView = 'month';
        }
        if (_vm.view.week) {
            _options.eventRender = eventRenderWeek;
            _options.defaultView = 'agendaWeek';
        }
        _options.editable = !_inPast;

        return _options;
    }

    function onload() {
        _options = buildOptions();
        _vm.user = userService.getLoggedInUser();
        _$cal.fullCalendar(_options);
    }

    function getEventsAsync(start, end, timezone, callback) {
        eventService.getEventsAsync(start, end, timezone)
            .then(function (events) {
                _events = events;
                callback(events);
            });
    }

    function toggleLateNofitication() {
        _vm.showLateNotification = !_vm.showLateNotification;
    }

    function late(mins, event) {
        _vm.alertMessage = null;
        _vm.minutesLate = mins;
        _vm.lateMessage = 'Apologies, but I am going to be '
            + mins + ' minutes late.  ' + event.user.fullName;
        _vm.lateMessageTo = event.project.contact;
        _vm.lastMessagePhone = event.project.mobile;
    }

    function sendLateMessage() {
        log.logSuccess('Sent: ' + _vm.lateMessage, null, _tbaEventCalendarControllerId, true);
        _vm.minutesLate = null;
        _vm.lastMessagePhone = null;
        _vm.lateMessageTo = null;
        _vm.showLateNotification = false;
        _vm.lateMessage = null;
    }
}

})();