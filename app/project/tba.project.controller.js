(function(){
var _tbaProjectControllerId = 'tba.project.controller';
angular.module('tba')
    .controller(_tbaProjectControllerId, ['tba.core.async', 'tba.core.log', 'tba.project.service', projectCntrl]);

function projectCntrl(async, log, projectService) {
    var vm = this;

    vm.title = 'Projects';
    vm.projects = [];

    activate();

    function activate() {
        var promises = [getProjectsAsync()];
        async.activateController(promises, _tbaProjectControllerId)
            .then(function () {
                log.log('Activated ', null, _tbaProjectControllerId, false);
            });
    }

    function getProjectsAsync() {
        return projectService.getProjectsAsync()
            .then(updateViewModel);
    }

    function updateViewModel(data) {
        vm.projects = data;
        log.log('Updated view model ', data, _tbaProjectControllerId, false);
    }
}
})();