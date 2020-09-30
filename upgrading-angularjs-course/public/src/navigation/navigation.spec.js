describe('home component', function () {
    var $ctrl, ctrl;

    beforeEach(function () {
        angular.mock.module('app');

        angular.mock.inject(function (_$componentController_) {
            $ctrl = _$componentController_;
            ctrl = $ctrl('navigation', null, {});
        });
    });

    it('should have the correct company name', function () {
        expect(ctrl.companyName).toEqual('Awesome, Inc.');
    });
});
