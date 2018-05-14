const options = require('./configuration');
const LDAPClient = require('./client.js');

var client = new LDAPClient(options);

//CREATE
var entry = {
    cn: 'foo',
    sn: 'bar',
    email: ['foo@bar.com', 'foo1@bar.com'],
objectclass: 'fooPerson'
};

client.add('cn=foo, o=example', entry, function(err) {
});

// READ
var options = {
    filter: `(${options.config.adSearchAttributeName}=Administrator)`,
    scope: 'sub',
    attributes: [options.config.adSearchAttributeName]
};

client.read(
    options.config.usersContainerDn,
    function(err, result){
        console.log(result);
    }
);

//UPDATE
var updateOptions = {
    filter: `(${options.config.adSearchAttributeName}=Administrator)`,
    scope: 'sub',
    attributes: [options.config.adSearchAttributeName]
}
client.update(options.config.usersContainerDn,options);

//DELETE
client.delete(options.config.usersContainerDn, done);
