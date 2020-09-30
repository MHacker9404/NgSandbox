describe('home component', function () {
    var $ctrl, ctrl;

    beforeEach(function () {
        angular.mock.module('app');

        angular.mock.inject(function (_$componentController_) {
            $ctrl = _$componentController_;
            ctrl = $ctrl('home', null, {});
        });
    });

    it('should have the correct title', function () {
        expect(ctrl.title).toEqual('Awesome, Inc. Internal Ordering System');
    });
});
