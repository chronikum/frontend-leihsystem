/**
 * LDAP Configuration to be used
 */
export interface LDAPConfiguration {
    host: string,
    bindDN: string, // bind dn
    bindCredentials: boolean, // Password
    searchBase: string,
    searchFilter: string,
}
