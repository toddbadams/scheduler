(function(){
/********************************************************************/
/*     Fake Data                                                    */
/********************************************************************/
angular.module('tba')
    .factory('tba.core.fakes', [fakeDataFactory]);

function fakeDataFactory($q) {
    var _service = {
            randomNumber: randomNumber,
            randomBoolean: randomBoolean,
            randomFullNames: randomFullNames,
            randomFullName: randomFullName,
            randomFileSize: randomFileSize,
            randomMaleFirstName: randomMaleFirstName,
            randomFemaleFirstName: randomFemaleFirstName,
            randomCompanyName: randomCompanyName,
            randomProject: randomProject,
            randomProjects: randomProjects,
            randomUser: randomUser,
            randomUsers: randomUsers,
            randomUserDayEvents: randomUserDayEvents,
            randomUserEvents: randomUserEvents,
            randomUsersEvents: randomUsersEvents
        },

        _lastNames = [
            'Abraham', 'Allan', 'Alsop', 'Anderson', 'Arnold', 'Avery', 'Bailey',
            'Baker', 'Ball', 'Bell', 'Berry', 'Black', 'Blake', 'Bond', 'Bower',
            'Brown', 'Buckland', 'Burgess', 'Butler', 'Cameron', 'Campbell', 'Carr',
            'Chapman', 'Churchill', 'Clark', 'Clarkson', 'Coleman', 'Cornish', 'Davidson',
            'Davies', 'Dickens', 'Dowd', 'Duncan', 'Dyer', 'Edmunds', 'Ellison', 'Ferguson',
            'Fisher', 'Forsyth', 'Fraser', 'Gibson', 'Gill', 'Glover', 'Graham', 'Grant',
            'Gray', 'Greene', 'Hamilton', 'Hardacre', 'Harris', 'Hart', 'Hemmings', 'Henderson',
            'Hill', 'Hodges', 'Howard', 'Hudson', 'Hughes', 'Hunter', 'Ince', 'Jackson',
            'James', 'Johnston', 'Jones', 'Kelly', 'Kerr', 'King', 'Knox', 'Lambert', 'Langdon',
            'Lawrence', 'Lee', 'Lewis', 'Lyman', 'MacDonald', 'Mackay', 'Mackenzie', 'MacLeod',
            'Manning', 'Marshall', 'Martin', 'Mathis', 'May', 'McDonald', 'McLean', 'McGrath',
            'Metcalfe', 'Miller', 'Mills', 'Mitchell', 'Morgan', 'Morrison', 'Murray', 'Nash',
            'Newman', 'Nolan', 'North', 'Ogden', 'Oliver', 'Paige', 'Parr', 'Parsons', 'Paterson',
            'Payne', 'Peake', 'Peters', 'Piper', 'Poole', 'Powell', 'Pullman', 'Quinn', 'Rampling',
            'Randall', 'Rees', 'Reid', 'Roberts', 'Robertson', 'Ross', 'Russell', 'Rutherford',
            'Sanderson', 'Scott', 'Sharp', 'Short', 'Simpson', 'Skinner', 'Slater', 'Smith',
            'Springer', 'Stewart', 'Sutherland', 'Taylor', 'Terry', 'Thomson', 'Tucker', 'Turner',
            'Underwood', 'Vance', 'Vaughan', 'Walker', 'Wallace', 'Walsh', 'Watson', 'Welch',
            'White', 'Wilkins', 'Wilson', 'Wright', 'Young'
        ],
        _maleFirstNames = [
            'Adam', 'Adrian', 'Alan', 'Alexander', 'Andrew', 'Anthony', 'Austin', 'Benjamin',
            'Blake', 'Boris', 'Brandon', 'Brian', 'Cameron', 'Carl', 'Charles', 'Christian',
            'Christopher', 'Colin', 'Connor', 'Dan', 'David', 'Dominic', 'Dylan', 'Edward',
            'Eric', 'Evan', 'Frank', 'Gavin', 'Gordon', 'Harry', 'Ian', 'Isaac', 'Jack',
            'Jacob', 'Jake', 'James', 'Jason', 'Joe', 'John', 'Jonathan', 'Joseph', 'Joshua',
            'Julian', 'Justin', 'Keith', 'Kevin', 'Leonard', 'Liam', 'Lucas', 'Luke', 'Matt',
            'Max', 'Michael', 'Nathan', 'Neil', 'Nicholas', 'Oliver', 'Owen', 'Paul', 'Peter',
            'Phil', 'Piers', 'Richard', 'Robert', 'Ryan', 'Sam', 'Sean', 'Sebastian', 'Simon',
            'Stephen', 'Steven', 'Stewart', 'Thomas', 'Tim', 'Trevor', 'Victor', 'Warren',
            'William'
        ],
        _femaleFirstNames = [
            'Abigail', 'Alexandra', 'Alison', 'Amanda', 'Amelia', 'Amy', 'Andrea', 'Angela',
            'Anna', 'Anne', 'Audrey', 'Ava', 'Bella', 'Bernadette', 'Carol', 'Caroline',
            'Carolyn', 'Chloe', 'Claire', 'Deirdre', 'Diana', 'Diane', 'Donna', 'Dorothy',
            'Elizabeth', 'Ella', 'Emily', 'Emma', 'Faith', 'Felicity', 'Fiona', 'Gabrielle',
            'Grace', 'Hannah', 'Heather', 'Irene', 'Jan', 'Jane', 'Jasmine', 'Jennifer',
            'Jessica', 'Joan', 'Joanne', 'Julia', 'Karen', 'Katherine', 'Kimberly', 'Kylie',
            'Lauren', 'Leah', 'Lillian', 'Lily', 'Lisa', 'Madeleine', 'Maria', 'Mary',
            'Megan', 'Melanie', 'Michelle', 'Molly', 'Natalie', 'Nicola', 'Olivia',
            'Penelope', 'Pippa', 'Rachel', 'Rebecca', 'Rose', 'Ruth', 'Sally', 'Samantha',
            'Sarah', 'Sonia', 'Sophie', 'Stephanie', 'Sue', 'Theresa', 'Tracey', 'Una',
            'Vanessa', 'Victoria', 'Virginia', 'Wanda', 'Wendy', 'Yvonne', 'Zoe'
        ],
        _companyNames = [
            'Acme, inc.', 'Widget Corp', '123 Warehousing', 'Demo Company', 'Smith and Co.',
            'Foo Bars', 'ABC Telecom', 'Fake Brothers', 'QWERTY Logistics', 'Demo, inc.',
            'Sample Company', 'Sample, inc', 'Acme Corp', 'Allied Biscuit', 'AnkhSto Associates',
            'Extensive Enterprise', 'Galaxy Corp', 'GloboChem', 'Mr. Sparkle', 'Globex Corporation',
            'LexCorp', 'LuthorCorp', 'North Central Positronics', 'Omni Consimer Products',
            'Praxis Corporation', 'Sombra Corporation', 'Sto Plains Holdings', 'TessierAshpool',
            'Wayne Enterprises', 'Wentworth Industries', 'ZiffCorp', 'Bluth Company', 'Strickland Propane',
            'Thatherton Fuels', 'Three Waters', 'Water and Power', 'Western Gas & Electric', 'Mammoth Pictures',
            'Mooby Corp', 'Gringotts', 'Thrift Bank', 'Flowers By Irene', 'The Legitimate Businessmens Club',
            'Osato Chemicals', 'Transworld Consortium', 'Universal Export', 'United Fried Chicken', 'Virtucon',
            'Kumatsu Motors', 'Keedsler Motors', 'Powell Motors', 'Industrial Automation', 'Sirius Cybernetics Corporation',
            'U.S. Robotics and Mechanical Men', 'Colonial Movers', 'Corellian Engineering Corporation', 'Incom Corporation',
            'General Products', 'Leeding Engines Ltd.', 'Blammo', 'Input, Inc.', 'Mainway Toys', 'Videlectrix',
            'Zevo Toys', 'Ajax', 'Axis Chemical Co.', 'Barrytron', 'Carrys Candles', 'Cogswell Cogs',
            'Spacely Sprockets', 'General Forge and Foundry', 'Duff Brewing Company', 'Dunder Mifflin', 'General Services Corporation',
            'Monarch Playing Card Co.', 'Krustyco', 'Initech', 'Roboto Industries', 'Primatech',
            'Sonky Rubber Goods', 'St. Anky Beer', 'Stay Puft Corporation', 'Vandelay Industries', 'Wernham Hogg',
            'Gadgetron', 'Burleigh and Stronginthearm', 'BLAND Corporation', 'Nordyne Defense Dynamics', 'Petrox Oil Company',
            'Roxxon', 'McMahon and Tate', 'Sixty Second Avenue', 'Charles Townsend Agency', 'Spade and Archer',
            'Megadodo Publications', 'Rouster and Sideways', 'C.H. Lavatory and Sons', 'Globo Gym American Corp',
            'The New Firm', 'SpringShield', 'Compuglobalhypermeganet', 'Data Systems', 'Gizmonic Institute',
            'Initrode', 'Taggart Transcontinental', 'Atlantic Northern', 'Niagular', 'Plow King',
            'Big Kahuna Burger', 'Big T Burgers and Fries', 'Chez Quis', 'Chotchkies', 'The Frying Dutchman',
            'Klimpys', 'The Krusty Krab', 'Monks Diner', 'Milliways', 'Minuteman Cafe', 'Taco Grande',
            'Tip Top Cafe', 'Moes Tavern', 'Central Perk', 'Chasers'
        ],
        _weeklyWorkingHours = [
            [
                { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 10, minute: 0 }, end: { hour: 19, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } }
            ]
        ],
        _eventSamples = [
            {
                title: 'Weather on AMX',
                description: 'Weather on AMX has stopped refreshing, this happend while Fred F. was there last, it is the kitchen panel, id 23.',
                actions: 'restarted weather station, neof',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Install door station',
                description: 'Install and ensure the brick has been chissled flush by stone mason.  Ensure silcon is applied to make weather resistant.',
                actions: 'Work could not be carred out, as the brick has not been correctly chisled. Spoke with GC who will have it reworked.',
                gps: [40.818980, -74.147436]
            },
            {
                title: 'Driveway snow melt',
                description: 'The Lutron CC0 #4 has become stuck. Fred F. cycled power last time, bring a replacement.',
                actions: 'Replaced ',
                gps: [40.845476, -74.133874]
            },
            {
                title: 'Pool Camera',
                description: 'Camera was removed on last visit, failed due to water intrustion. Install Silent Witness SWX45-1043.',
                actions: 'Replaced ',
                gps: [40.701242, -74.088155]
            },
            {
                title: 'Water Fountain',
                description: 'Cannot turn on water fountian via touchpanel in the kitchen.',
                actions: 'Found fault in Lutron CCO #23, requires replacement',
                gps: [40.802069, -74.324539]
            },
            {
                title: 'Activate Satellite',
                description: 'activate satellite account for John Smith, account 200-9897-788, phone 978 555 1212',
                actions: 'done. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Keypad down',
                description: 'The keypad in the guest room is not working.  No LEDs are on.',
                actions: 'replaced. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Home Theater Remote',
                description: 'Program the home theater romote',
                actions: 'done. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Terminate wallplate',
                description: 'The wallplate in the study was removed for paiting, please reterminate and test',
                actions: 'done. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Line 2 Not working',
                description: 'The second phone 978 555 1212 is not avialable through the phone system.',
                actions: 'Reterminated at head-end. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Drapes in living room',
                description: 'The motorized drapes in the living room no longer closing all the way',
                actions: 'Adjusted tracking. ',
                gps: [40.790389, -73.946824]
            },
            {
                title: 'Add radio stations',
                description: 'Add client supplied list of internet radio stations to the touchpanels',
                actions: 'done. ',
                gps: [40.790389, -73.946824]
            }
        ],
        _eventTemplates = [
            [
                { start: { hour: 8, min: 0 }, end: { hour: 14, min: 0 } }
            ],
            [
                { start: { hour: 8, min: 0 }, end: { hour: 12, min: 0 } },
                { start: { hour: 13, min: 0 }, end: { hour: 17, min: 0 } }
            ],
            [
                { start: { hour: 8, min: 0 }, end: { hour: 11, min: 30 } },
                { start: { hour: 12, min: 0 }, end: { hour: 17, min: 0 } }
            ],
            [
                { start: { hour: 8, min: 0 }, end: { hour: 10, min: 30 } },
                { start: { hour: 12, min: 30 }, end: { hour: 2, min: 30 } },
                { start: { hour: 15, min: 0 }, end: { hour: 17, min: 0 } }
            ],
            [
                { start: { hour: 8, min: 0 }, end: { hour: 9, min: 0 } },
                { start: { hour: 9, min: 30 }, end: { hour: 10, min: 30 } },
                { start: { hour: 11, min: 0 }, end: { hour: 12, min: 0 } },
                { start: { hour: 13, min: 0 }, end: { hour: 3, min: 0 } },
                { start: { hour: 15, min: 30 }, end: { hour: 17, min: 0 } }
            ]
        ];

    return _service;

    function randomNumber(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }

    function randomBoolean() {
        return randomNumber(1, 100) > 50;
    }

    function randomFullNames(quantity) {
        var _i, _list = [];
        for (_i = 0; _i < quantity; _i++) {
            _list.push((randomNumber(0, 1) == 0 ? randomFemaleFirstName() : randomMaleFirstName()) + " " + randomLastName());
        }
        return _list;
    }

    function randomFullName() {
        return (randomNumber(0, 1) == 0 ? randomFemaleFirstName() : randomMaleFirstName()) + " " + randomLastName();
    }

    function randomFileSize() {
        return randomNumber(1, 99) + " MB";
    }

    function randomMaleFirstName() {
        return _maleFirstNames[randomNumber(0, _maleFirstNames.length - 1)];
    }

    function randomFemaleFirstName() {
        return _femaleFirstNames[randomNumber(0, _femaleFirstNames.length - 1)];
    }

    function randomMaleFemaleFirstName() {
        return randomNumber(1, 100) > 50
            ? randomFemaleFirstName()
            : randomMaleFirstName();
    }

    function randomLastName() {
        return _lastNames[randomNumber(0, _lastNames.length - 1)];
    }

    function randomCompanyName() {
        return _companyNames[randomNumber(0, _companyNames.length - 1)];
    }

    function randomProject(areaCode) {
        return {
            id: randomNumber(100000, 999999),
            title: randomLastName() + '(' + randomNumber(100, 500) + ')',
            contact: randomFullName(),
            mobile: randomPhoneNumber(areaCode),
            enableTextMessages: true
        };
    }

    function randomProjects(areaCode, quantity) {
        var _i, _list = [];
        for (_i = 0; _i < quantity; _i++) {
            _list.push(randomProject(areaCode));
        }
        return _list;
    }

    function randomUser(areaCode) {
        return {
            id: randomNumber(100000, 999999),
            firstName: randomMaleFemaleFirstName(),
            lastName: randomLastName(),
            mobile: randomPhoneNumber(areaCode),
            includeWeekends: false,
            imageSource: randomNumber(1, 8) + ".jpg",
            hours: [
                { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 10, minute: 0 }, end: { hour: 19, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
                { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } }
            ]
        };
    }

    function randomUsers(areaCode, quantity) {
        var _i, _list = [];
        for (_i = 0; _i < quantity; _i++) {
            _list.push(randomUser(areaCode));
        }
        return _list;
    }

    function randomPhoneNumber(areaCode) {
        return '(' + areaCode + ')' + randomNumber(253, 788).toString() + '-' + randomNumber(1230, 9980).toString();
    }

    function randomUserDayEvents(user, date, projects) {
        var _i,
            _dayOfWeek = date.day(),
            _et = _eventTemplates[Math.floor(Math.random() * _eventTemplates.length)],
            _net = _et.length,
            _events = [];

        if (_dayOfWeek === 0 || _dayOfWeek === 6) return;

        for (_i = 0; _i < _net; _i += 1) {
            var _project = projects[Math.floor(Math.random() * projects.length)],
                _start = moment(date)
                    .hour(_et[_i].start.hour)
                    .minute(_et[_i].start.min)
                    .second(0),
                _end = moment(date)
                    .hour(_et[_i].end.hour)
                    .minute(_et[_i].end.min)
                    .second(0),
                _e = _eventSamples[Math.floor(Math.random() * _eventSamples.length)],
                _inPast = moment().hour(0).minute(0).diff(_start) > 0;

                _events.push({
                    id: randomNumber(100000, 999999),
                    user: user,
                    project: _project,
                    title: _e.title,
                    description: _e.description,
                    gps: _inPast ? _e.gps : null,
                    action: _inPast ? _e.actions : null,
                    start: _start,
                    startMoment: _start,
                    end: _end,
                    endMoment: _end,
                    complete: _inPast,
                    inProgress: false,
                    entitledProjects: projects
                });

        }
        return _events;
    }

    function randomUserEvents(user, from, days, projects) {
        var _i, _d, _l,
            _events = [],
            _results = [];

        for (_i = 0; _i < 60; _i += 1) {
            _d = moment(from).add(_i, 'days');
            var _es = randomUserDayEvents(user, _d, projects);
            _events = _events.concat(_es);
        }
        _l = _events.length;
        for (_i = 0; _i < _l; _i += 1) {
            if (_events[_i] !== undefined) {
                _results.push(_events[_i]);
            }
        }
        return _results;
    }

    function randomUsersEvents(users, from, days, projects) {
        var _i, _l = users.length,
            _events = [];
        for (_i = 0; _i < _l; _i += 1) {
            _events.concat(randomUserEvents(users[_i], from, days, projects));
        }
        return _events;
    }
}

})();