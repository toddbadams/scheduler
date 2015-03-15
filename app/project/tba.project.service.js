var _tbaProjectServiceId = 'tba.project.service';
angular.module('tba')
    .factory(_tbaProjectServiceId, ['tba.core.async', 'tba.core.fakes', 'tba.core.array', projectService]);

function projectService(async, fakes, array) {
    var _projects = null,

        _service = {
            createProjectAsync: createProjectAsync,
            getProjectsAsync: getProjectsAsync,
            getProjectAsync: getProjectAsync,
            updateProjectAsync: updateProjectAsync,
            deleteProjectAsync: deleteProjectAsync,


            getProjects: getProjects,
        };

    activate();

    return _service;

    function activate() {
        var _data = fakes.randomProjects('212', 10);
        _projects = _data.map(parseProject);
    }

    function getProjects() {
        return _projects;
    }

    /**********************************************************
    /* Projects CRUD
     **********************************************************/
    function createProjectAsync(p) {
        p.id = fakes.randomNumber(100000, 999999);
        _projects.push(p);
        return async.asPromise(p);
    }

    function getProjectsAsync() {
        return async.asPromise(_projects);
    }

    function getProjectAsync(projectId) {
        var _p = array.getById(_projects, projectId);
        return async.asPromise(_p);
    }

    function updateProjectAsync(p) {
        var _project = getById(_projects, p.id);
        updateProjectModel(_project, p);
        return async.asPromise(_project);
    }

    function deleteProjectAsync(projectId) {
        //var q = $q.defer();
        //return $q.when(dataStubs.deleteProjectAsync(projectId));
        //return q.promise;
    }

    /**********************************************************
    /* Projects Models
     **********************************************************/
    function project() {
        this.id = 0;
        this.cid = 0;
        this.title = '';
        this.contact = '';
        this.mobile = '';
        this.enableTextMessages = true;
    }

    function parseProject(data) {
        var _p = new project();
        _p.id = data.id;
        _p.cid = data.cid;
        _p.title = data.title;
        _p.contact = data.contact;
        _p.mobile = data.moibile;
        _p.enableTextMessages = data.enableTextMessages;
        return _p;
    }

    function updateProjectModel(p, updates) {
        p.id = updates.id;
        p.cid = updates.cid;
        p.title = updates.title;
        p.contact = updates.contact;
        p.mobile = updates.moibile;
        p.enableTextMessages = updates.enableTextMessages;
    }
}
