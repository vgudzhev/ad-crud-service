const ldap = require('ldapjs');

/**
 * For more info and examples check http://ldapjs.org/client.html
 */
class LDAPClient{
    constructor(options){
        this.config = options;            
        this.ldapClient = this.initClient(options);
    }
    
    /**
     * Performs an add operation against the LDAP server.
     * Allows you to add an entry (which is just a plain JS object), and as always, controls are optional.
     */
    create(dn, entry, callback) {
        this.ldapClient.add(dn, entry, callback);
    };
    
    /**
     * Performs a search operation against the LDAP server.
     * Options can be a string representing a valid LDAP filter.
     */
    read(dn, options, callback) {
        this.ldapClient.search(dn, options, function (err, res) {
            var object = null;
            res.on('searchEntry', function (entry) {
                object = entry.object;
            });
            res.on('error', function (error) {
                callback(error);
            });
            res.on('end', function (result) {
                callback(result.status != 0 ? result : null, object);
            });
        });
    };

    /**
     * Performs an LDAP modify operation against the LDAP server. This API requires you to pass in a Change object, which is described below. Note that you can pass in a single Change or an array of Change objects.
     */
    update(dn, changes, callback) {
        this.modify(dn, changes, callback);
    };

    /**
     * Deletes an entry from the LDAP server.
     */
    delete(dn, callback) {
        this.client.del(dn, callback);
    };


    initClient(config){
        if (!this.ldapClient) {
            var options = {
                url: config.config.ldapServerUrl,
                bindDN: config.config.ldapUser,
                bindCredentials: config.config.ldapPassword,
                tlsOptions: {
                    secureOptions: config.config.secureOptions,
                    ciphers: config.config.sslCiphers
                },
                reconnect: true
            }
    
            return ldap.createClient(options);
        }
        return ldapClient;
    }
}

module.exports = LDAPClient;
