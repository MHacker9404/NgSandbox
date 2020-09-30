hashPrefixConfig.$inject = ['$locationProvider'];
function hashPrefixConfig($locationProvider: any) {
    $locationProvider.hashPrefix('');
}

export default hashPrefixConfig;
