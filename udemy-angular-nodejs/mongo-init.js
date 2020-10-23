db.createUser({
    user: 'root-user',
    pwd: 'P@ssw0rd1',
    roles: [
        {
            role: 'readWrite',
            db: 'udemy-ng-node',
        },
    ],
});
