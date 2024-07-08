const PrivilegePearsonSpecter = {
    /** 
     * @const {string} tableTitle - Title of table which will be used at the frontend
    */
    tableTitle: 'Pearson Specter',
    
    /** 
     * @const {string} tableName - Key name of or privilege column name
    */
    tableName: 'privilege_pearson_specter',

    /** 
     * @const {string} funcName - The value of funcName is used for accessing functionalities. eg. func_admin opens administration sidebar link
    */
    funcName: 'func_pearson_specter',

    /** 
     * @const {string} allCheckBoxName - The value of allCheckBoxName is used to turn on and off of the "all" checkbox
    */
    allCheckBoxName: 'pearson_specter',

    /** 
     * @const {string} icon - Icon for the fieldset
    */
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',

    /** 
     * @const {Array} columnList - List of columns names for this table
    */
    columnList: [
        'add_user', 'update_user', 'deactivate_user', 
        'add_role', 'update_role', 'deactivate_role',
        'add_department', 'update_department', 'deactivate_department', 
        'add_document', 'update_document', 'deactivate_document', 
        'func_pearson_spector', 
        'pearson_spector'
    ],

    /** 
     * @const {Array} createTableStatement - Create table sql statement as string
    */
    createTableStatement: (`
        privilegeID BIGINT(100) PRIMARY KEY,
        accountID BIGINT(100),
        add_user varchar(1),
        update_user varchar(1),
        deactivate_user varchar(1),
        add_role varchar(1),
        update_role varchar(1),
        deactivate_role varchar(1),
        add_department varchar(1),
        update_department varchar(1),
        deactivate_department varchar(1),
        add_document varchar(1),
        update_document varchar(1),
        deactivate_document varchar(1),
        func_pearson_spector varchar(1), 
        pearson_spector varchar(1)
    `),

    /** 
     * @const {string} alterTableStatement - Alter table sql statement as an array. EXAMPLE: ['name-varchar(5)', 'gender-varchar(5)']
    */
    alterTableStatement: [],
}

module.exports = PrivilegePearsonSpecter;