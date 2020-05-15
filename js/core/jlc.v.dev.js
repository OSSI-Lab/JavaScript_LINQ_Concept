/*
 * JavaScript LINQ Concept
 * The idea of querying JavaScript object collections is entirely based on programming language from Microsoft called C# !
 *
 * 
 * What does it mean jlc.v.dev ?
 *      - jlc   ->  JavaScript LINQ Concept
 *      - v     ->  version
 *      - dev   ->  for development purposes, i.e. not publicly accessible, just for f.e. testing something during development 
 *
 * This version does feature "conditional code injection proposal", aka Query Debugger.
 * 
 * 
 * 
 * Status:
 *      🛑⚠️  - DPR #13 [ primitives - syntax checking, handling sorting the right way ]
 *      This version will be updated if I come up with "conditional code injection proposal" improvement (if at all)
 * 
 * 
 * 
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

( function ()
{


    /* private variables */

    // declare a private query debugger
    var _QUERY_DEBUGGER = {
        ___init___: function ()
        {
            // mark that Query Debugger was initialized
            this.Vars.initialized = true;

            // enable detection of open/closed browser's console
            Object.defineProperty( this.Vars._I, 'id', { get: this.Funcs.enable_query_debugger } );

            // invoke JLC 1.0 Query Debugger
            requestAnimationFrame( this.Funcs.run );
        },

        // internal state of the query debugger
        Vars: {
            initialized: false,
            debugStatus: '',

            menu: "\r\nJLC 1.0 Query Debugger (🐛) reports for duty ! 🖥️💻 \r\n\r\n====================================================================================================================================\r\n\r\nIt dynamically enables injection of ResultsView data projection !\r\nThe goal is to show dynamically - only WHILE DEBUGGING - current state of JLC query being processed - almost like in C# 😉\r\n\r\n====================================================================================================================================\r\n\r\nNot intended to use by the group of some 'false engineers' -> 🤡",
            isSwitchedOn: false,

            debugData: null,

            _I: new Image(),
            _c: 0,
        },

        // query debugger internal API
        Funcs: {
            is_initialized: function ()
            {
                return _QUERY_DEBUGGER.Vars.initialized;
            },

            run: function ()
            {
                // prepare query debugger UI state as off
                _QUERY_DEBUGGER.Vars.debugStatus = 'off';

                // mark query debugger as off
                _QUERY_DEBUGGER.Vars.isSwitchedOn = false;

                // switch query debugger off
                console.warn( _QUERY_DEBUGGER.Vars._I );

                // update query debugger UI
                document.querySelector( '#devtool-status' ).className = _QUERY_DEBUGGER.Vars.debugStatus;

                requestAnimationFrame( _QUERY_DEBUGGER.Funcs.run );
                // check periodically for state updates
            },

            enable_query_debugger: function ()
            {
                // prepare query debugger UI state as on
                _QUERY_DEBUGGER.Vars.debugStatus = 'on';

                // update query debugger UI
                document.querySelector( '#devtool-status' ).className = _QUERY_DEBUGGER.Vars.debugStatus;

                // display query debugger menu
                _QUERY_DEBUGGER.Vars._c++;
                if ( _QUERY_DEBUGGER.Vars._c == 1 )
                {
                    // mark query debugger as on
                    _QUERY_DEBUGGER.Vars.isSwitchedOn = true;

                    console.log( _QUERY_DEBUGGER.Vars.menu );
                }

                if ( _QUERY_DEBUGGER.Vars._c >= 1 )
                {
                    // inject dynamically some DEBUG data - THIS IS AN EXEMPLARY USAGE - to show the purpose, not the exact functionality !
                    _QUERY_DEBUGGER.Vars.debugData = _QUERY_DEBUGGER.Vars.debugData || _DATA;
                }
            },

            is_switched_on: function ()
            {
                if ( _QUERY_DEBUGGER.Vars.isSwitchedOn || _QUERY_DEBUGGER.Vars._c > 0 )
                {
                    // inject dynamically some DEBUG data - THIS IS AN EXEMPLARY USAGE - to show the purpose, not the exact functionality !
                    _QUERY_DEBUGGER.Vars.debugData = _QUERY_DEBUGGER.Vars.debugData || _DATA;
                }

                // return the state of the query debugger - on/off
                return _QUERY_DEBUGGER.Vars.isSwitchedOn || _QUERY_DEBUGGER.Vars._c > 0;
            },

            getDebugData: function ()
            {
                return _QUERY_DEBUGGER.Vars.debugData;
            }
        }
    };

    // declare a private enum object
    var _ENUM = {
        FIRST: "first",
        LAST: "last",
        SINGLE: "single",
        ALL: "all",
        ANY: "any",
        REVERSE: "reverse",
        REVERSE_EXT: "reverse_ext",
        SKIP: "skip",
        TAKE: "take",
        JOIN: "join",
        LEFT_JOIN: "left_join",
        SAVE: "save",
        UPDATE: "update",
        CONCAT: "concat",
        APPEND: "append",
        PREPEND: "prepend",

        ORDER: {
            Level: {
                FIRST: "first_level",
                SECOND: "second_level"
            },

            By: {
                ASC: "asc",
                DESC: "desc",
                THEN_ASC: "then_asc",
                THEN_DESC: "then_desc"
            }
        },
        // COLLECTION INPUT TYPE
        CIT: {
            PRIMITIVE: "primitive_type",
            PLAIN: "plain_object",
            GROUPING: "grouping_object",
            KVP: "key_value_pair_object",
            UNKNOWN: "unknown"
        }
    };

    // declare a private operators object
    var _OPERATOR = {
        get: {
            '>': {
                call: /**
                 * @param {number} v1
                 * @param {number} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 > v2;
                    }
            },

            '<': {
                call: /**
                 * @param {number} v1
                 * @param {number} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 < v2;
                    }
            },

            '>=': {
                call: /**
                 * @param {number} v1
                 * @param {number} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 >= v2;
                    }
            },

            '<=': {
                call: /**
                 * @param {number} v1
                 * @param {number} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 <= v2;
                    }
            },

            '==': {
                call: /**
                 * @param {any} v1
                 * @param {any} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 == v2;
                    }
            },

            '===': {
                call: /**
                 * @param {any} v1
                 * @param {any} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 === v2;
                    }
            },

            '<>': {
                call: /**
                 * @param {any} v1
                 * @param {any} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 !== v2;
                    }
            },

            '()': {
                call: /**
                 * @param {any} v1
                 */
                    function ( v1 )
                    {
                        return v1 ? true : false;
                    }
            },

            '(!)': {
                call: /**
                 * @param {any} v1
                 * @param {any} v2
                 */
                    function ( v1, v2 )
                    {
                        return v1 === v2 ? true : false;
                    }
            }
        },

        checkValue: /**
         * @param {number | boolean} propOrVal
         * @param {string} propOperator
         * @param {any} propValue
         */
            function ( propOrVal, propOperator, propValue )
            {
                /**
                 * Check the validity of a prop - object's prop or a primitive type - (logical "NOT NULL"), i.e. "", undefined, null
                 * Boolean values like false, 0 (that evaluates to false) in this case are considered correct values !
                */
                var valid = propOrVal || propOrVal === 0 || propOrVal === false;

                // execute the operator provided that the found prop "is not null"
                if ( valid )
                {
                    // get the proper bool operator
                    var b_op = _OPERATOR.get[ propOperator ];

                    // run operator
                    if ( b_op )
                        return b_op.call( propOrVal, propValue );
                    // in case you provided 'not-implemented' one, throw an error
                    else
                        throw Error( '\r\nUnsupported operator [ ' + propOperator + ' ] !\r\n\r\n' );
                }
                else
                    return false;
            }
    };

    // declare a private constraints object
    // @ts-ignore
    var _CONSTRAINT = {
        // object holding all constraint funcs of all required contexts grouped by context
        _context_constraints: {},

        // adds constraint func or constraint func array for given context, f.e. 'where', 'groupBy', 'take', etc.
        add: /**
         * @param {any} context
         * @param {any} constr_func_or_arr
         */
            // @ts-ignore
            function ( context, constr_func_or_arr )
            {

            },

        // 
        createActionConstraint: function ()
        {

        },

        // get all active constraint functions associated with passed context, o.f. 'where', 'groupBy', 'take', etc.
        getAllActive: /**
         * @param {any} context
         */
            // @ts-ignore
            function ( context )
            {

            },
    };

    // declare a private syntax object
    var _SYNTAX = {

        check: /**
         * @param {any} coll_index
         * @param {any} user_filter_array
         * @param {any} sortingContext
         */
            function ( coll_index, user_filter_array, sortingContext )
            {
                return c_I_1L( coll_index, user_filter_array, sortingContext );



                /**
                 * Local helper functions
                 * @param {any} coll_index
                 * @param {any} user_filter_array
                 * @param {any} sortingContext
                 */
                function c_I_1L ( coll_index, user_filter_array, sortingContext )
                {
                    /**
                     * If user omitted filters for some query methods, do not run the check.
                     * I consider providing more agile solution here, like f.e. checking whether one particular query method allows for empty filters or not, etc.
                     * Right now, it's a simple true/false check !
                    */
                    if ( !user_filter_array ) return;

                    /**
                     * To enable syntax check, fetch object structure (all keys at all levels).
                     * Fetch them provided that collection is not empty !
                     * Along the way cache the collection !
                    */

                    // if HPID is not ready
                    if ( !_ACTION.hpid.isOn )
                    {
                        _ACTION.hpid.data = _DATA.fetch( coll_index ).collection;
                        _ACTION.hpid.isOn = true;
                    }

                    // declare collection metadata object
                    var cmo = {
                        first_obj: _ACTION.hpid.data[ 0 ],
                        doCurrentSort: true,
                        doNextSort: _ACTION.hpid.data.length > 1
                    };
                    // perform defense check (~ checking check)
                    if ( !cmo.first_obj ) cmo.doCurrentSort = false;


                    // detect collection input data type to provide type of source of syntax checking
                    _ACTION.hpid.columnSet.cit = _COMMON.detectCollectionDataType( cmo.first_obj, cmo.doCurrentSort, cmo.doNextSort );

                    // if cit is not UNKNOWN, skip further operations
                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.UNKNOWN ) return;


                    /**
                     * Otherwise check for primitive type context or object context
                    */

                    // is primitive context
                    var isPrimitive = _COMMON.isPrimitiveType( cmo.first_obj ) && ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PRIMITIVE );

                    // in case it's primitive, run syntax checking for primitive types
                    if ( isPrimitive )
                        return c_P_I_1L( user_filter_array, sortingContext );
                    // otherwise if cit is not UNKNOWN run syntax checking for objects
                    else
                        return c_O_I_2L( user_filter_array, sortingContext );



                    /**
                     * Local helper functions
                     * @param {string | any[]} user_filter_array
                     * @param {any} sortingContext
                     */
                    // @ts-ignore
                    function c_P_I_1L ( user_filter_array, sortingContext )
                    {
                        var length, user_filter;

                        // loop over all filters
                        for ( var i = 0; i < user_filter_array.length; i++ )
                        {
                            // access current user filter
                            user_filter = user_filter_array[ i ];

                            // user filter being a UDF is considered as passing all checking
                            if ( typeof user_filter === 'function' ) continue;

                            // number of filter parameters can be 2, 3 or 4
                            length = user_filter.length;

                            // throw error about invalid number of predicate values
                            if ( length !== 2 && length !== 3 && length !== 4 )
                                throw SyntaxError( '\r\nDealing with primitive types requires providing only 2, 3, or 4 values all starting with empty string - "" !\r\n\r\n' );

                            /**
                             *  For the following operations
                             *       - groupBy
                             *       - toDictionary
                             *       - orderBy
                             *       - orderByDescending
                             *       - thenBy
                             *       - thenByDescending
                             * 
                             *  the filter syntax called 'predicateArray' is just an empty string with second parameter set to true -> ["", true] 
                            */
                            if ( length === 2 && ( user_filter[ 0 ].trim() !== "" || user_filter[ 1 ] !== true ) )
                                throw SyntaxError( '\r\nDealing with primitive types in the context of THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} \r\nrequires providing only empty string predicate with second parameter set to true ! \r\n\r\nExamplary usage -> ["", true]\r\n\r\n' );

                            /**
                             * Other operations require from 3 to 4 parameters to be present 
                            */

                            // handling 3 filter parameters with special case where 3rd parameter is equal to 0 (which logically in JavaScript evaluates to false)
                            else if ( length === 3 && ( user_filter[ 0 ].trim() !== "" || user_filter[ 1 ].trim() === "" || !user_filter[ 2 ] && user_filter[ 2 ] !== 0 ) )
                                // throw error about invalid parameters
                                throw SyntaxError(
                                    '\r\nDealing with primitive types in the context of NOT THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} \r\nrequires providing empty string predicate, second parameter set to non-empty string, and third parameter being some kind of valid stuff (number, UDF, user string) ! \r\n\r\nExamplary usage -> ["", "<", 7]\r\n\r\n'
                                );

                            // handling 4 filter parameters
                            else if ( length === 4 && (
                                user_filter[ 0 ].trim() !== "" || user_filter[ 1 ].trim() === "" || !user_filter[ 2 ] || typeof user_filter[ 3 ] !== "boolean"
                            )
                            )
                                // throw error about invalid parameters
                                throw SyntaxError(
                                    '\r\nDealing with primitive types in the context of NOT THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} with specifying 4th parameter, \r\nrequires providing empty string predicate, second parameter set to non-empty string, third parameter being some kind of valid stuff (number, UDF, user string) and forth parameter being boolean value (true/false) ! \r\n\r\nExamplary usage -> ["", "<", 7, true]\r\n\r\n'
                                );
                        }
                    }

                    /**
                     * @param {string | any[]} user_filter_array
                     * @param {any} sortingContext
                     */
                    function c_O_I_2L ( user_filter_array, sortingContext )
                    {
                        // create source of syntax checking, i.e. initialize the columnSet every time you invoke syntax checking by passing a reference to a first object in a collection to fetch the structure from
                        _ACTION.hpid.columnSet.init( cmo.first_obj || Object.create( null ) );

                        // get user syntax metadata (valid column name(s) or valid column path(s) for inner object(s))
                        var user_ovc = _ACTION.hpid.columnSet.extractOVC( user_filter_array );

                        /**
                         * Do the appropriate syntax checking 
                        */

                        if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PLAIN )
                        {
                            // we are dealing with PLAIN
                            check_PLAIN_I_2L( _ENUM.CIT.PLAIN, _ENUM.CIT.PLAIN );
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.GROUPING )
                        {
                            // the only valid column is key 
                            var valid = _ACTION.hpid.columnSet.all_columns[ 0 ] === 'key';

                            // if it's not valid
                            if ( !valid )
                                // throw error about invalid column name called 'key' when dealing with GROUPING objects
                                throw SyntaxError( '\r\nDealing with objects of type [' + _ENUM.CIT.GROUPING + '] requires providing only "key" property !\r\n\r\n' );
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.KVP )
                        {
                            // this metadata is required only in the sorting context and only when sorting KVP
                            var metadata;

                            // if this is sorting context
                            if ( sortingContext )
                            {
                                // create metadata object
                                metadata = Object.create( null );

                                // sort KVP by 'key'
                                metadata.byKey = ( user_filter_array.length === 1 && user_filter_array[ 0 ].length === 2 && user_filter_array[ 0 ][ 0 ].trim() === 'key' && user_filter_array[ 0 ][ 1 ] === true );

                                // sort KVP by 'value.'
                                metadata.byValue = ( user_filter_array.length === 1 && user_filter_array[ 0 ].length === 2 && user_filter_array[ 0 ][ 0 ].trim() === 'value.' && user_filter_array[ 0 ][ 1 ] === true );

                                // sort KVP by 'value.PLAIN' - first check
                                metadata.byValuePLAIN = ( user_filter_array.length === 1 && user_filter_array[ 0 ].length === 2 && user_filter_array[ 0 ][ 0 ].trim() !== 'value.' && user_filter_array[ 0 ][ 0 ].trim().substring( 0, 6 ) === 'value.' && user_filter_array[ 0 ][ 1 ] === true );
                            }

                            // user provide 'key' filter with 2+ more parameters
                            if ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && user_filter_array[ 0 ][ 0 ].trim() === 'key' )
                            {
                                // throw error about invalid syntax when dealing with KVP objects and using "key" predicate
                                throw SyntaxError( '\r\nDealing with objects of type [' + _ENUM.CIT.KVP + '] using "key" requires the following syntax ["key", true] !\r\n\r\n' );
                            }
                            // user provide 'value.' filter with 2+ more parameters
                            else if ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && user_filter_array[ 0 ][ 0 ].trim() === 'value.' )
                            {
                                // throw error about invalid syntax when dealing with KVP objects and using "value." predicate, which means comparing whole objects
                                throw SyntaxError( '\r\nDealing with objects of type [' + _ENUM.CIT.KVP + '] using "value." requires the following syntax ["value.", true] !\r\n\r\n' );
                            }
                            /**
                             * If neither 'key' nor 'value.', user must have provided many filters - in the context of KVP it basically means f.e. such valid filters :
                             *  -> [value.name, true]
                             *  -> [value.quality, true]
                             *  -> [value.description, true]
                             *              .
                             *              .
                             *              .
                             *              etc
                            */
                            else if ( user_filter_array.length > 1 )
                            {
                                // loop over all filters and check for 'key' or 'value.' filters, so it doesn't make sense
                                for ( var i = 0; i < user_filter_array.length; i++ )
                                {
                                    // access current filter
                                    var predicateArray = user_filter_array[ i ];
                                    // if it's key, throw error
                                    if ( predicateArray[ 0 ].trim() === 'key' || predicateArray[ 0 ].trim() === 'value.' )
                                        // throw error about 'key' filter presence among other filters
                                        throw SyntaxError(
                                            '\r\nDealing with objects of type [' + _ENUM.CIT.KVP + '] using "' +
                                            predicateArray[ 0 ] + '" among other filters does not make sense !\r\n\r\n'
                                        );
                                }

                                // if this is sorting context and we have arrived in this place
                                if ( sortingContext )
                                    /**
                                     * Store in metadata that we're basically dealing with PLAIN objects in the context of KVP. 
                                     *  => sort KVP by 'value.PLAIN' - second check
                                    */
                                    metadata.byValuePLAIN = true;

                                // if there is neither 'key' nor 'value.' filter, we are dealing with value's PLAIN
                                check_PLAIN_I_2L( _ENUM.CIT.KVP, _ENUM.CIT.PLAIN );
                            }

                            // if this is sorting context, return required KVP sorting metadata
                            if ( sortingContext )
                                return metadata;
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.UNKNOWN )
                            // @ts-ignore
                            ; // with collection input type set to UNKNOWN do nothing as the collection is empty
                        else
                            // throw error about unsupported collection input type !
                            throw Error( '\r\nThis sorting input type (sit) called "' + _ACTION.hpid.columnSet.cit + '" is not supported !\r\n\r\n' );



                        /**
                         * Local helper functions
                         * @param {string} cit
                         * @param {string} ctx
                         */
                        function check_PLAIN_I_2L ( cit, ctx )
                        {
                            // assume that all user columns are valid 
                            var valid = true;

                            if ( cit === ctx )
                            {
                                // loop over all user 'real' columns
                                for ( var i = 0; i < user_ovc.length; i++ )
                                {
                                    // assess the validity
                                    valid = _ACTION.hpid.columnSet.all_columns.indexOf( user_ovc[ i ] ) > -1;

                                    // if it's not valid
                                    if ( !valid )
                                        // throw error about invalid column name or invalid column path when dealing with PLAIN objects in the PLAIN context
                                        throw ReferenceError(
                                            '\r\nDealing with objects of type [' + cit + '] in the context of ' + ctx + ' ' +
                                            'requires providing valid column name or column path !' +
                                            '\r\nThis column called "' + user_ovc[ i ] + '" is not a valid column name or column path (property name or property path) !\r\n\r\n'
                                        );
                                }
                            }
                            else
                            {
                                // loop over all user 'real' columns
                                for ( var i = 0; i < user_ovc.length; i++ )
                                {
                                    // assess the validity of the value's PLAIN column name - from user column name remove prefix "value." to get the real property name or property path 
                                    valid = _ACTION.hpid.columnSet.all_columns.indexOf( user_ovc[ i ].substring( 6 ) ) > -1;

                                    // if it's not valid
                                    if ( !valid )
                                        // throw error about invalid column name or invalid column path when dealing with PLAIN objects in the KVP context
                                        throw ReferenceError(
                                            'Dealing with objects of type [' + cit + '] in the context of ' + ctx + ' ' +
                                            'requires providing valid column path !' +
                                            '\r\nThis column called "' + user_ovc[ i ] + '" is not a valid column path (property path) !' +
                                            '\r\nValid column paths should be constracted in this way: "value.obj_prop_name" or "value.nested_obj.nested_obj_prop_name"'
                                        );
                                }
                            }
                        }
                    }
                }
            },

        addCustom: /**
         * @param {any} type
         * @param {any} key
         * @param {any} value
         */
            function ( type, key, value )
            {
                return a_C_I_1L( type, key, value );



                /**
                 * Local helper functions
                 * @param {any} type
                 * @param {any} key
                 * @param {any} value
                 */
                // @ts-ignore
                function a_C_I_1L ( type, key, value )
                {
                    /**
                     * type : object || primitive
                     * key : 'predicateArray', 'collectionItem', 'count', etc.
                     * value : primitive value || UDF (user-defined function) 
                    */
                }
            }
    };

    // declare a private action object
    var _ACTION = {
        // create 'current' query-wide HPID, i.e. holder of physical intermediate data
        hpid: {
            // is data holder activated
            isOn: false,

            // determines the context of data flow that will be used during syntax checking of user predicates
            context: undefined,

            // array for storing physical intermediate data
            data: [],

            // this object allows for syntax checking during data flow operations
            columnSet: {
                // collection input type of data
                cit: undefined,
                // all columns of an data object
                all_columns: [],

                init: /**
                 * @param {{ value: any; }} obj
                 */
                    function ( obj )
                    {
                        // collection input column set
                        var propNames;

                        if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PLAIN )
                        {
                            // get all object property names at all levels
                            propNames = _COMMON.fetchObjectStructureKeys( obj );
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.GROUPING )
                        {
                            // prepend key
                            propNames = [ 'key' ];
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.KVP )
                        {
                            // get value all object property names at all levels
                            propNames = _COMMON.fetchObjectStructureKeys( obj.value );

                            // prepend value.
                            propNames.unshift( 'value.' );

                            // prepend key
                            propNames.unshift( 'key' );

                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PRIMITIVE )
                        {
                            propNames = [];
                        }
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.UNKNOWN )
                        {
                            propNames = [];
                        }

                        // store it for sorting purposes - all columns available for usage in sorting operations
                        _ACTION.hpid.columnSet.all_columns = propNames;
                    },

                extractOVC: /**
                 * @param {string | any[]} userColumnSet
                 */
                    function ( userColumnSet )
                    {
                        // define output object, i.e. array of only valid column names extracted from user column set
                        var ovc = [];

                        // loop over current user column set
                        for ( var i = 0; i < userColumnSet.length; i++ )
                        {
                            // access current column metadata
                            var ccm = userColumnSet[ i ];

                            // only extract real - i.e. physical - column names by examining the second value (true/false)
                            if ( ccm[ 1 ] )
                                // store real column name , aka object property name
                                ovc.push( ccm[ 0 ] );
                        }

                        // return output object
                        return ovc;
                    },

                updateOVC_and_CheckIfUnique: /**
                 * @param {any} ovc
                 * @param {any} safeFetch
                 * @param {any} coll_index
                 */
                    function ( ovc, safeFetch, coll_index )
                    {
                        // let's assume that phrase is unique
                        var unique = true;

                        /**
                         * Along the way try to prove that this current sort set input is not unique one 
                        */

                        // add current sorting columns to already-used sorting columns
                        Array.prototype.push.apply( _ACTION.hpid.sorting.sort_columns, ovc );


                        var hpid_cache;
                        // try to get data from HPID in the first place, otherwise fetch from internal storage
                        if ( safeFetch && !_ACTION.hpid.isOn )
                        {
                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = _DATA.fetch( coll_index ).collection;
                            _ACTION.hpid.isOn = true;
                        }
                        // cache current data to be sorted
                        hpid_cache = _ACTION.hpid.data;


                        var phrase_source_arr;
                        // only updated sort set input with current ovc if there are any data to sort
                        if ( hpid_cache.length )
                            // reference updated sort set input that allows for building the right phrase
                            phrase_source_arr = _ACTION.hpid.sorting.sort_columns;


                        // get grouping-by util object
                        var gbo = _COMMON.getGroupingBy();

                        // declare object holding all grouped phrases
                        var phrase_groupper = {};
                        // declare current object of the collection 
                        var c_o;

                        // check the sorting phrase uniqueness based on PLAIN
                        if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PLAIN )
                        {
                            // loop over current data to be sorted
                            for ( var i = 0; i < hpid_cache.length; i++ )
                            {
                                // access current object
                                c_o = hpid_cache[ i ];

                                // define a sorting phrase
                                var phrase = gbo.buildPhrase( c_o, phrase_source_arr );

                                // when current object phrase is built, check phrase's uniqness
                                var value_arr = phrase_groupper[ phrase ] || [];

                                // store some value as small as possible - ''.length * 2 => 0 * 2 = 0 !
                                value_arr.push( '' );

                                // break 'unique phrase' checking ASAP
                                if ( value_arr.length > 1 )
                                {
                                    // mark that phrase is not unique
                                    unique = false;

                                    // break further collection's checking
                                    break;
                                }
                                else
                                    // otherwise group current phrase
                                    phrase_groupper[ phrase ] = value_arr;
                            }
                        }
                        // check the sorting phrase uniqueness based on GROUPING - by default grouping objects have to have unique keys !
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.GROUPING )
                            // @ts-ignore
                            ;
                        // check the sorting phrase uniqueness based on KVP
                        else if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.KVP )
                        {
                            // if you use the key - "key", "value." - by default, kvp objects must return unique values !
                            if ( phrase_source_arr.length === 1 && ( phrase_source_arr[ 0 ].trim() === 'key' || phrase_source_arr[ 0 ].trim() === 'value.' ) )
                                // @ts-ignore
                                ;
                            // if you use the key - "key", "value." - among other, by default kvp objects must return unique values !                                    
                            else if (
                                phrase_source_arr.length !== 1 && phrase_source_arr.length > 1 &&
                                ( phrase_source_arr.indexOf( 'key' ) > -1 || phrase_source_arr.indexOf( 'value.' ) > -1 )
                            )
                                // @ts-ignore
                                ;

                            // otherwise check the sorting phrase uniqueness solely based on value object of type PLAIN
                            else
                            {
                                // fetch all value's PLAIN property names
                                var value_plain_columns = phrase_source_arr.map(
                                    function ( sort_col )
                                    {
                                        return sort_col.substring( sort_col.indexOf( '.' ) + 1 );
                                    }
                                );

                                // loop over current data to be sorted
                                for ( var i = 0; i < hpid_cache.length; i++ )
                                {
                                    // access current object
                                    c_o = hpid_cache[ i ];

                                    // define a sorting phrase
                                    var phrase = gbo.buildPhrase( c_o.value, value_plain_columns );

                                    // when current object phrase is built, check phrase's uniqness
                                    var value_arr = phrase_groupper[ phrase ] || [];

                                    // store some value as small as possible - ''.length * 2 => 0 * 2 = 0 !
                                    value_arr.push( '' );

                                    // break 'unique phrase' checking ASAP
                                    if ( value_arr.length > 1 )
                                    {
                                        // mark that phrase is not unique
                                        unique = false;

                                        // break further collection's checking
                                        break;
                                    }
                                    else
                                        // otherwise group current phrase
                                        phrase_groupper[ phrase ] = value_arr;
                                }
                            }
                        }

                        // return if it's unique
                        return unique;
                    }
            },

            sorting: {
                // store current sorting direction
                sort_order: undefined,

                // current columns used for sorting
                sort_columns: [],

                // whether to carry out further sorting operations or not
                stop: false,

                // determines the usage of second-level sorting
                firstLevelCtx: {
                    // is first-level sorting available
                    present: false,

                    check: function ()
                    {
                        if ( !_ACTION.hpid.sorting.firstLevelCtx.present )
                            throw Error( '\r\nYou can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !\r\n\r\n' );
                    },

                    set: /**
                     * @param {boolean} flag
                     */
                        function ( flag )
                        {
                            _ACTION.hpid.sorting.firstLevelCtx.present = flag;
                        }
                },

                // drives the usage of second-level sorting
                secondLevelCtx: {
                    // force second-level sorting
                    _force: false,

                    // columns used to perform second-level sorting only
                    ovc: [],

                    check: function ()
                    {
                        return _ACTION.hpid.sorting.secondLevelCtx._force;
                    },

                    force: /**
                     * @param {boolean} flag
                     */
                        function ( flag )
                        {
                            _ACTION.hpid.sorting.secondLevelCtx._force = flag;
                        }
                },

                // reset all so-far used sorting
                clear: function ()
                {
                    // reset column set object
                    _ACTION.hpid.columnSet.cit = undefined;

                    // reset sorting object
                    _ACTION.hpid.sorting.sort_order = undefined;
                    _ACTION.hpid.sorting.stop = false;
                    _ACTION.hpid.sorting.sort_columns.length = 0;

                    _ACTION.hpid.sorting.secondLevelCtx.force( false );
                    _ACTION.hpid.sorting.secondLevelCtx.ovc.length = 0;
                }
            },

            /**
             * Handle special case that returns the so-far filtered off array.
             * The following parameter called 'done' when set to 'true' tells to discard returned result and go for the so-far filtered off array as the final result 
            */
            done: false
        },

        // create action that represents filtering logic for given Linq's method
        create: /**
         * @param {{ coll_index: any; root_token: any; parent: any; }} jlc_instance_ctx
         * @param {() => any} core_method_bind
         * @param {string | number} context
         * @param {any} to_execute
         */
            function ( jlc_instance_ctx, core_method_bind, context, to_execute )
            {
                // create an action
                var action = {
                    // store information whether this action is executable one
                    // @ts-ignore
                    returnsData: System.Linq.QueryResult[ context ],

                    // store collection index
                    coll_ref: jlc_instance_ctx.coll_index,

                    // store root of the chain filters
                    chain_root_id: jlc_instance_ctx.root_token,

                    // store parent of this action
                    parent: jlc_instance_ctx.parent,

                    // execute this action by invoking its API which is execute method in turn invoking its core method with binded parameters
                    execute: function ()
                    {
                        return core_method_bind();
                    }
                };

                // create context of this action
                var ctx = {
                    // collection reference id
                    coll_index: jlc_instance_ctx.coll_index,

                    // collection token
                    root_token: jlc_instance_ctx.root_token,

                    // parent action chained to this action
                    parent: action
                };

                // invoke real data filtering and produce output 
                if ( to_execute )
                    // execute all actions
                    return this.executeChain( ctx );
                // otherwise enable further flow of actions
                else
                    // return new instance api and pass context of current action to provide chain of actions to execute
                    return _COMMON.jlcNew( ctx );
            },

        // execute all actions in the chain
        executeChain: /**
         * @param {any} jlc_ctx
         */
            function ( jlc_ctx )
            {
                return execute_C_I_1L( jlc_ctx );



                /**
                 * Local helper functions
                 * @param {{ parent: any; }} jlc_ctx
                 */
                function execute_C_I_1L ( jlc_ctx )
                {
                    // reset temp storage flags
                    _ACTION.hpid.isOn = _ACTION.hpid.done = false;
                    // reset holder of physical intermediate data
                    Array.isArray( _ACTION.hpid.data ) ? _ACTION.hpid.data.length = 0 : _ACTION.hpid.data = [];

                    // reset all so-far used sorting
                    _ACTION.hpid.sorting.clear();


                    // execute all actions and determine the final output...
                    var result = executeActionsRecursively_I_2L( jlc_ctx.parent );

                    // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true
                    if ( _ACTION.hpid.done && Array.isArray( _ACTION.hpid.data ) )
                        return _ACTION.hpid.data.slice( 0 );

                    // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true and current filtered off data is either a dictionary or an object...
                    if ( _ACTION.hpid.done )
                        return _ACTION.hpid.data;

                    // ... otherwise return result as the output
                    return result;



                    /**
                     * Local helper functions
                     * @param {{ parent: any; returnsData: any; execute: () => void; }} parentAction
                     */
                    function executeActionsRecursively_I_2L ( parentAction )
                    {
                        // go all the way down to the root action
                        if ( parentAction.parent )
                            executeActionsRecursively_I_2L( parentAction.parent );

                        // invoke this root action and go recursively all the way up to action that ends the action chain; returns data if it has to so
                        if ( parentAction.returnsData )
                            return parentAction.execute();
                        else
                            parentAction.execute();
                    }
                }
            }
    };

    // declare a private common object
    var _COMMON = {
        jlcNew: /**
         * @param {any} ctx
         */
            function ( ctx )
            {
                return get_Instance_I_1L( ctx );



                /**
                 * Local helper functions
                 * @param {any} ctx
                 */
                function get_Instance_I_1L ( ctx )
                {
                    // declare JavaScript LINQ Concept API object
                    var api = {
                        // ~ TO BE IMPLEMENTED AGAIN
                        reverse: /**
                     * @param {{ [x: string]: any; }} params
                     * @param {any} startingIndex
                     * @param {any} count
                     * @param {any} context
                     */
                            // @ts-ignore
                            function ( params, startingIndex, count, context )
                            {
                                // create action and proceed with further flow
                                // @ts-ignore
                                return _ACTION.create( this, _CORE.reverse_t.bind( this, params[ 'startingIndex' ], params[ 'count' ], _ENUM.REVERSE ), true, true, true, params[ 'context' ] );
                            },

                        // ~ TO BE IMPLEMENTED AGAIN
                        reverseExt: /**
                     * @param {{ [x: string]: any; }} params
                     * @param {any} startingIndex
                     * @param {any} count
                     * @param {any} context
                     */
                            // @ts-ignore
                            function ( params, startingIndex, count, context )
                            {
                                // create action and proceed with further flow
                                // @ts-ignore
                                return _ACTION.create( this, _CORE.reverse_t.bind( this, params[ 'startingIndex' ], params[ 'count' ], _ENUM.REVERSE_EXT ), false, false, true, params[ 'context' ] );
                            },

                        // ~ TO BE IMPLEMENTED
                        select: /**
                     * @param {any} arrayOfNewObjectProps
                     * @param {any} outputType
                     */
                            // @ts-ignore
                            function ( arrayOfNewObjectProps, outputType )
                            {
                                //

                                // return JavaScript LINQ Concept object
                                return this;
                            },

                        // ~ TO BE IMPLEMENTED
                        join: /**
                     * @param {any} anotherObjectCollection
                     * @param {any} thisCollectionItemKeyPropArray
                     * @param {any} anotherCollectionItemKeyPropArray
                     * @param {any} outputCollectionItemType
                     */
                            function ( anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType )
                            {


                                // join two sequences based on defined keys
                                // @ts-ignore
                                _CORE.apply_set_based_operations( this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.JOIN );

                                // return api to enable further flow
                                return this;
                            },

                        // ~ TO BE IMPLEMENTED
                        leftJoin: /**
                     * @param {any} anotherObjectCollection
                     * @param {any} thisCollectionItemKeyPropArray
                     * @param {any} anotherCollectionItemKeyPropArray
                     * @param {any} outputCollectionItemType
                     */
                            function ( anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType )
                            {


                                // left join two sequences based on defined keys
                                // @ts-ignore
                                _CORE.apply_set_based_operations( this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.LEFT_JOIN );

                                // return JavaScript LINQ Concept object
                                return this;
                            },

                        // ~ TO BE IMPLEMENTED
                        contains: /**
                     * @param {any} collectionItem
                     * @param {any} udfEqualityComparer
                     */
                            // @ts-ignore
                            function ( collectionItem, udfEqualityComparer )
                            {
                                //

                                // return true/false
                            },

                        // ~ TO BE IMPLEMENTED
                        distinct: /**
                     * @param {any} udfEqualityComparer
                     */
                            // @ts-ignore
                            function ( udfEqualityComparer )
                            {
                                //

                                // return JavaScript LINQ Concept object
                                return this;
                            },

                        // ~ TO BE IMPLEMENTED                            
                        except: function ()
                        {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED ?
                        intersect: function ()
                        {

                        },

                        // ~ TO BE IMPLEMENTED ?
                        union: function ()
                        {

                        },






                        /**
                         * ALREADY IMPLEMENTED 
                        */

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                        */
                        where: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.where.bind(
                                    this,
                                    params[ 'predicateArray' ]
                                ),
                                // @ts-ignore
                                System.Linq.Context.where
                            );
                        },

                        /**
                         * Serves the same purpose as GroupBy method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfEqualityComparer
                         *  - udfGroupProjector
                         *  - udfGroupElementsProjector
                         *  - udfGroupResultValueSelector
                         *  - terminateFlowAndReturnData
                        */
                        groupBy: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.group_by.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    params[ 'udfEqualityComparer' ],
                                    params[ 'udfGroupProjector' ],
                                    params[ 'udfGroupElementsProjector' ],
                                    params[ 'udfGroupResultValueSelector' ],
                                    true
                                ),
                                // @ts-ignore
                                System.Linq.Context.groupBy
                            );
                        },

                        /**
                         * Serves the same purpose as OrderBy method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - keyPartSelectorArray
                         *  - udfComparer
                        */
                        orderBy: function ( params )
                        {
                            // set the 1st level sorting context
                            _ACTION.hpid.sorting.firstLevelCtx.set( true );

                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.order_asc_or_desc.bind(
                                    this,
                                    params[ 'keyPartSelectorArray' ],
                                    params[ 'udfComparer' ],
                                    _ENUM.ORDER.By.ASC
                                ),
                                // @ts-ignore
                                System.Linq.Context.orderBy
                            );
                        },

                        /**
                         * Serves the same purpose as OrderByDescending method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - keyPartSelectorArray
                         *  - udfComparer
                        */
                        orderByDescending: function ( params )
                        {
                            // set the 1st level sorting context
                            _ACTION.hpid.sorting.firstLevelCtx.set( true );

                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.order_asc_or_desc.bind(
                                    this,
                                    params[ 'keyPartSelectorArray' ],
                                    params[ 'udfComparer' ],
                                    _ENUM.ORDER.By.DESC
                                ),
                                // @ts-ignore
                                System.Linq.Context.orderByDescending
                            );
                        },

                        /**
                         * Serves the same purpose as ThenBy method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - keyPartSelectorArray
                         *  - udfComparer
                        */
                        thenBy: function ( params )
                        {
                            // evaluate the 1st level sorting context
                            _ACTION.hpid.sorting.firstLevelCtx.check();

                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.order_asc_or_desc.bind(
                                    this,
                                    params[ 'keyPartSelectorArray' ],
                                    params[ 'udfComparer' ],
                                    _ENUM.ORDER.By.THEN_ASC
                                ),
                                // @ts-ignore
                                System.Linq.Context.orderBy
                            );
                        },

                        /**
                        * Serves the same purpose as ThenByDescending method in LINQ from C#.
                        * @param {object} params contains all possible params used by this method :
                        *  - keyPartSelectorArray
                        *  - udfComparer
                        */
                        thenByDescending: function ( params )
                        {
                            // evaluate the 1st level sorting context
                            _ACTION.hpid.sorting.firstLevelCtx.check();

                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.order_asc_or_desc.bind(
                                    this,
                                    params[ 'keyPartSelectorArray' ],
                                    params[ 'udfComparer' ],
                                    _ENUM.ORDER.By.THEN_DESC
                                ),
                                // @ts-ignore
                                System.Linq.Context.orderByDescending
                            );
                        },

                        /**
                         * Serves the same purpose as Concat method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - inputCollection
                        */
                        concat: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.add_t.bind( this, params[ 'inputCollection' ], _ENUM.CONCAT ), System.Linq.Context.concat );
                        },

                        /**
                         * Serves the same purpose as Append method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - collectionItem
                        */
                        append: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.add_t.bind( this, params[ 'collectionItem' ], _ENUM.APPEND ), System.Linq.Context.append );
                        },

                        /**
                         * Serves the same purpose as Prepend method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - collectionItem
                        */
                        prepend: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.add_t.bind( this, params[ 'collectionItem' ], _ENUM.PREPEND ), System.Linq.Context.prepend );
                        },

                        /**
                         * Serves the same purpose as Skip method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - count
                        */
                        skip: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.skip_or_take.bind( this, params[ 'count' ], null, _ENUM.SKIP ), System.Linq.Context.skip );
                        },

                        /**
                         * Serves the same purpose as SkipWhile method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                        */
                        skipWhile: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.skip_or_take.bind( this, null, params[ 'predicateArray' ], _ENUM.SKIP ), System.Linq.Context.skipWhile );
                        },

                        /**
                         * Serves the same purpose as Take method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - count
                        */
                        take: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.skip_or_take.bind( this, params[ 'count' ], null, _ENUM.TAKE ), System.Linq.Context.take );
                        },

                        /**
                         * Serves the same purpose as TakeWhile method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                        */
                        takeWhile: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.skip_or_take.bind( this, null, params[ 'predicateArray' ], _ENUM.TAKE ), System.Linq.Context.takeWhile );
                        },

                        /**
                         * Serves the same purpose as ToDictionary method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfEqualityComparer
                         *  - udfGroupElementsProjector
                         *  - context
                        */
                        toDictionary: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(
                                this._ctx,
                                _CORE.group_by.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    params[ 'udfEqualityComparer' ],
                                    null,
                                    null,
                                    params[ 'udfGroupResultValueSelector' ],
                                    true,
                                    true // is dictionary context
                                ),
                                // @ts-ignore
                                System.Linq.Context.toDictionary,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as ToArray method in LINQ from C#.
                        */
                        toArray: function ()
                        {
                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.list_t.bind( this, true ), System.Linq.Context.toArray, true );
                        },

                        /**
                         * Serves the same purpose as First method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        first: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.first_or_default.bind( this, params[ 'predicateArray' ], false ), System.Linq.Context.first, true );
                        },

                        /**
                         * Serves the same purpose as FirstOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        firstOrDefault: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.first_or_default.bind( this, params[ 'predicateArray' ], true ), System.Linq.Context.firstOrDefault, true );
                        },

                        /**
                         * Serves the same purpose as Last method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        last: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.last_or_default.bind( this, params[ 'predicateArray' ], false ), System.Linq.Context.last, true );
                        },

                        /**
                         * Serves the same purpose as LastOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        lastOrDefault: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.last_or_default.bind( this, params[ 'predicateArray' ], true ), System.Linq.Context.lastOrDefault, true );
                        },

                        /**
                         * Serves the same purpose as Single method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        single: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.single_or_default.bind( this, params[ 'predicateArray' ], false ), System.Linq.Context.single, true );
                        },

                        /**
                         * Serves the same purpose as SingleOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        singleOrDefault: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.single_or_default.bind( this, params[ 'predicateArray' ], true ), System.Linq.Context.singleOrDefault, true );
                        },

                        /**
                         * Serves the same purpose as Any method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        any: function ( params )
                        {
                            // handle "default" parameter
                            if ( params === undefined ) params = {};

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.all_or_any.bind( this, params[ 'predicateArray' ], _ENUM.ANY ), System.Linq.Context.any, true );
                        },

                        /**
                         * Serves the same purpose as All method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        all: function ( params )
                        {
                            // handle missing params object
                            if ( params === undefined ) throw ReferenceError( '\r\nMethod [ all ] has to have "params" object provided !\r\n\r\n' );
                            if ( params[ 'predicateArray' ] === undefined ) throw TypeError( '\r\nMethod [ all ] with "params" object provided is missing "predicateArray" array !\r\n\r\n' );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create( this._ctx, _CORE.all_or_any.bind( this, params[ 'predicateArray' ], _ENUM.ALL ), System.Linq.Context.all, true );
                        },

                        /**
                         * Special method that tells whether query debugger is available ! 😀😉
                         * Can be safely removed if library moved to production. 🙂
                         * 
                         * Go to _SETUP's ___init___ method to remove from initialization JLC 1.0 Query Debugger 
                        */
                        ifConsoleDebug: function ()
                        {
                            // is JLC 1.0 Query Debugger initialized ?
                            var is_initialized = _QUERY_DEBUGGER.Funcs.is_initialized();

                            if ( is_initialized )
                            {
                                // check the state of the query debugger - on/off
                                var is_on = _QUERY_DEBUGGER.Funcs.is_switched_on();

                                // if switched on, enable fetching some debug data
                                if ( is_on )
                                {
                                    this.debugResultsView = function ()
                                    {
                                        // fetch on demand some DEBUG data !!!!!!!
                                        return _QUERY_DEBUGGER.Funcs.getDebugData();
                                    };
                                }

                                // return the state of the query debugger - on/off
                                return is_on;
                            }
                            else
                            {
                                throw Error( '\r\nJLC 1.0 Query Conditional Debug Code not initialized !\r\n\r\n' );
                            }
                        }
                    };

                    // bind context to this API instance
                    api._ctx = ctx;

                    // return JLC API instance
                    return api;
                }
            },

        isPrimitiveType: /**
         * @param {any} o
         */
            function ( o )
            {
                return isPT_I_1L( o );



                /**
                 * Local helper functions
                 * @param {any} o
                 */
                function isPT_I_1L ( o )
                {
                    return [ 'string', 'number', 'boolean' ].indexOf( typeof o ) > -1;
                }
            },

        createType: /**
         * @param {any} templateObject
         */
            function ( templateObject )
            {
                return createType_I_1L( templateObject );



                /**
                 * Local helper functions
                 * @param {{ [x: string]: any; }} templateObject
                 */
                function createType_I_1L ( templateObject )
                {
                    // loop over all props and delete their values
                    for ( var eot_k in templateObject )
                    {
                        // access current property
                        var objProp = templateObject[ eot_k ];

                        // if it's nested another object, drill down to discover the props of such nested object
                        if ( typeof objProp === 'object' )
                        {
                            createType_I_1L( objProp );
                        }
                        // for primitive props just set the value to 'undefined'
                        else if ( typeof objProp !== 'function' )
                        {
                            templateObject[ eot_k ] = undefined;
                        }
                    }

                    // return the empty object
                    return templateObject;
                }
            },

        createDefaultOfT: /**
         * @param {any} historyIndex
         */
            function ( historyIndex )
            {
                return createDefaultOfT_I_1L( historyIndex );



                /**
                 * Local helper functions
                 * @param {any} historyIndex
                 */
                function createDefaultOfT_I_1L ( historyIndex )
                {
                    // get collection item type metadata of contextually current collection from history array
                    var itemTypeMetadata = _DATA.getT( historyIndex );

                    if ( itemTypeMetadata.isReady )
                        // return an empty proper object
                        return itemTypeMetadata.output;
                    else
                    {
                        if ( itemTypeMetadata.makeItEmpty )
                            itemTypeMetadata.output = _COMMON.createType( itemTypeMetadata.source );
                        else
                            itemTypeMetadata.output = itemTypeMetadata.source;

                        // return an empty proper object
                        return itemTypeMetadata.output;
                    }
                }
            },

        createCompoundKey: /**
         * @param {any} keySelectorArray
         */
            function ( keySelectorArray )
            {
                return create_GK_I_1L( keySelectorArray );



                /**
                 * Local helper functions
                 * @param {string | any[]} keySelectorArray
                 */
                function create_GK_I_1L ( keySelectorArray )
                {
                    // define array holding grouping or sorting logic key
                    var key = [];

                    // loop over all key selectors
                    for ( var i = 0; i < keySelectorArray.length; i++ )
                    {
                        // access the current key selector component
                        var ksc = keySelectorArray[ i ];

                        // get the component value
                        var c_v = ksc[ 0 ];

                        // is this a real property of the object
                        var is = ksc[ 1 ];

                        // store object representing part of the key
                        key.push( { value: c_v, isValidProperty: is, isComplex: c_v.indexOf( '.' ) > 0 } );
                    }

                    // return array holding grouping or sorting logic key
                    return key;
                }
            },

        getGroupingBy: function ()
        {
            return gBy_I_1L();



            /**
             * Local helper functions
            */
            function gBy_I_1L ()
            {
                // create grouping-by object helper
                var gbo = {
                    buildPhrase: /**
                     * @param {{ [x: string]: string; }} obj
                     * @param {string | any[]} sort_cols_arr
                     */
                        function ( obj, sort_cols_arr )
                        {
                            // declare a sorting phrase
                            var phrase = '';

                            var sort_col;
                            // loop over updated sort set input
                            for ( var i = 0; i < sort_cols_arr.length; i++ )
                            {
                                // reference sorting column 
                                sort_col = sort_cols_arr[ i ];

                                // determine whether it's nested object column or a current level column
                                if ( sort_col.indexOf( '.' ) > 0 )
                                {
                                    // get all property names leading to the nested object value
                                    var col_parts = sort_col.split( '.' );
                                    // declare nested object value
                                    var nev = obj;

                                    // go to nested object value
                                    for ( var j = 0; j < col_parts.length; j++ )
                                        // @ts-ignore
                                        nev = nev[ col_parts[ j ] ];

                                    // build the sorting phrase
                                    phrase += nev + '-';
                                }
                                else
                                    // build the sorting phrase
                                    phrase += obj[ sort_cols_arr[ i ] ] + '-';
                            }

                            // remove the last dash - phrase joining sign
                            phrase = phrase.substring( 0, phrase.length - 1 );

                            // return the sorting phrase
                            return phrase;
                        },

                    getGrouping: /**
                     * @param {any} key_id
                     * @param {string | any[]} groups_obj
                     */
                        function ( key_id, groups_obj )
                        {
                            // create pure empty object
                            var gso = Object.create( null );

                            // define grouping seeker object
                            gso.idx = -1;                       // index of grouping object in the group
                            gso.arr = undefined;                // list of grouped values

                            // loop over groups' object
                            for ( var i = 0; i < groups_obj.length; i++ )
                            {
                                // access grouping object
                                var item = groups_obj[ i ];

                                // find the right one with key id
                                if ( item.key === key_id )
                                {
                                    // store index of grouping object in the group
                                    gso.idx = i;

                                    // reference the list of grouped values and yield them on demand (right here right now)
                                    gso.arr = item.resultsView;

                                    // discard further search
                                    break;
                                }
                            }

                            // return grouping seeker object
                            return gso;
                        },

                    setGrouping: /**
                     * @param {any} key_id
                     * @param {{ arr: any; idx: number; }} gso
                     * @param {any[]} groups_obj
                     */
                        function ( key_id, gso, groups_obj )
                        {
                            // create pure empty object
                            var grouping_obj = Object.create( null );

                            // define grouping object
                            grouping_obj.key = key_id;

                            /**
                             * Declare resultsView function
                             *  - declare non-public components called '_privateList'
                            */
                            var _privateList = gso.arr;
                            Object.defineProperty(
                                grouping_obj,
                                "resultsView",
                                {
                                    // only override getter
                                    get: function () { return _privateList; }
                                }
                            );

                            // store grouping object at the right position
                            if ( gso.idx === -1 )
                                groups_obj.push( grouping_obj );
                            else
                                groups_obj[ gso.idx ] = grouping_obj;
                        }
                };

                // return grouping-by object helper
                return gbo;
            }
        },

        useDefaultComparer: /**
         * @param {any} sortMetadata
         * @param {any} by_force
         * @param {any} forced_comparator_name
         */
            function ( sortMetadata, by_force, forced_comparator_name )
            {
                return use_DC_I_1L( sortMetadata, by_force, forced_comparator_name );



                /**
                 * Local helper functions
                 * @param {{ byKey: any; byValue: any; byValuePLAIN: any; }} sortMetadata
                 * @param {any} by_force
                 * @param {string | number} forced_comparator_name
                 */
                function use_DC_I_1L ( sortMetadata, by_force, forced_comparator_name )
                {
                    // define comparators' object
                    var comparators = {
                        PLAIN_Comparator: /**
                     * @param {any} itemCurrent
                     * @param {any} itemPrevious
                     */
                            function ( itemCurrent, itemPrevious )
                            {
                                // invoke PLAIN comparator private function
                                return PLAIN_Comparator_I_2L( itemCurrent, itemPrevious, _ENUM.CIT.PLAIN );
                            },

                        GROUPING_Comparator: /**
                     * @param {{ key: any; }} itemCurrent
                     * @param {{ key: any; }} itemPrevious
                     */
                            function ( itemCurrent, itemPrevious )
                            {
                                // invoke basic boolean comparison 
                                return boolean_comparator_I_2L( itemCurrent.key, itemPrevious.key );
                            },

                        KVP_Comparator: /**
                     * @param {{ key: any; value: { toString: { (): any; (): string; }; }; }} itemCurrent
                     * @param {{ key: any; value: { toString: { (): any; (): string; }; }; }} itemPrevious
                     */
                            function ( itemCurrent, itemPrevious )
                            {
                                /**
                                 * Check what exactly we sort in KVP context by examining sortMetadata object
                                 * 
                                 *      - sortMetadata.byKey
                                 *      - sortMetadata.byValue
                                 *      - sortMetadata.byValuePLAIN
                                */

                                // by 'key'
                                if ( sortMetadata.byKey )
                                {
                                    // invoke basic boolean comparison 
                                    return boolean_comparator_I_2L( itemCurrent.key, itemPrevious.key );
                                }
                                // by 'value' object itself
                                else if ( sortMetadata.byValue )
                                {
                                    /**
                                     * User must provide implementation of toString method if sorting by the object itself is required ⚠️
                                     * Implementation of toString method by design and by nature must return the unique identification of such object across the whole collection ⚠️
                                    */
                                    if ( !itemCurrent.value.toString || ( itemCurrent.value.toString === Object.prototype.toString ) )
                                        throw ReferenceError(
                                            '\r\nSorting KVP Value by itself requires presence of custom method "toString()" !\r\n\r\nSource :'
                                        );

                                    if ( !itemPrevious.value.toString || ( itemPrevious.value.toString === Object.prototype.toString ) )
                                        throw ReferenceError(
                                            '\r\nSorting KVP Value by itself requires presence of custom method "toString()" !\r\n\r\nSource :'
                                        );


                                    // if both objects have custom methods toString(), just invoke basic boolean comparison
                                    return boolean_comparator_I_2L( itemCurrent.value.toString(), itemPrevious.value.toString() );
                                }
                                // by 'value' object itself
                                else if ( sortMetadata.byValuePLAIN )
                                {
                                    // invoke PLAIN comparator private function
                                    return PLAIN_Comparator_I_2L( itemCurrent, itemPrevious, _ENUM.CIT.KVP );
                                }
                            },

                        PRIMITIVE_Comparator: /**
                     * @param {any} itemCurrent
                     * @param {any} itemPrevious
                     */
                            function ( itemCurrent, itemPrevious )
                            {
                                // comparing primitive types involves just comparing their values
                                return boolean_comparator_I_2L( itemCurrent, itemPrevious );
                            }
                    };


                    /**
                     * Determine what type of comparator to get
                     *  - automatically based on cit (collection input type)
                     *  - by force using requested comparator name 
                    */

                    if ( by_force && forced_comparator_name )
                        // return the FORCED_COMPARATOR_NAME function itself
                        return comparators[ forced_comparator_name ];

                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PLAIN )
                        // return the PLAIN comparator function itself
                        return comparators.PLAIN_Comparator;

                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.GROUPING )
                        // return the GROUPING comparator function itself
                        return comparators.GROUPING_Comparator;

                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.KVP )
                        // return the KVP comparator function itself
                        return comparators.KVP_Comparator;

                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PRIMITIVE )
                        // return the PRIMITIVE comparator function itself
                        return comparators.PRIMITIVE_Comparator;



                    /**
                     * Local helper functions
                     * @param {{ value: any; }} itemCurrent
                     * @param {{ value: any; }} itemPrevious
                     * @param {string} cit
                     */
                    function PLAIN_Comparator_I_2L ( itemCurrent, itemPrevious, cit )
                    {
                        // current and previous values to compare
                        var itemCurrentValue = '', itemPreviousValue = '';

                        // create two sorting phrases to compare against each other, 'itemCurrentValue' vs 'itemPreviousValue' respectively
                        createSortPhrases_I_3L( cit );

                        // invoke basic boolean comparison 
                        return boolean_comparator_I_2L( itemCurrentValue, itemPreviousValue );



                        /**
                         * Local helper functions
                         * @param {string} citCtx
                         */
                        function createSortPhrases_I_3L ( citCtx )
                        {
                            // reference the right sorting columns
                            var sortCols;

                            // check if to use default sorting columns' source or a forced one
                            if ( _ACTION.hpid.sorting.secondLevelCtx.check() )
                                // reference so-far stored sorting columns
                                sortCols = _ACTION.hpid.sorting.secondLevelCtx.ovc;
                            else
                                // reference so-far stored sorting columns
                                sortCols = _ACTION.hpid.sorting.sort_columns;

                            /**
                             * Determine which of the two-expected contexts this sorting takes place in :
                             *      - PLAIN
                             *      - KVP
                             * 
                             * Temp objects directly referencing PLAIN objects (PLAIN or KVP Value's PLAIN) :
                             *      - oC means current object
                             *      - oP means previous object
                            */
                            var oC, oP;

                            // go for PLAIN
                            if ( citCtx === _ENUM.CIT.PLAIN )
                            {
                                oC = itemCurrent;
                                oP = itemPrevious;
                            }
                            // go for KVP Value's PLAIN
                            else if ( citCtx === _ENUM.CIT.KVP )
                            {
                                oC = itemCurrent.value;
                                oP = itemPrevious.value;
                            }
                            else
                                throw Error(
                                    '\r\nThis collection input type (cit) called "' + citCtx +
                                    '" is not supported by PLAIN comparator !\r\nValid contexts are [' +
                                    _ENUM.CIT.PLAIN + ', ' +
                                    _ENUM.CIT.KVP +
                                    '] !\r\n\r\n'
                                );

                            var sortCol;
                            // loop over all so-far stored sorting columns
                            for ( var i = 0; i < sortCols.length; i++ )
                            {
                                // reference a sorting column
                                sortCol = sortCols[ i ];

                                // is it complex ?
                                if ( sortCol.indexOf( '.' ) > 0 )
                                {
                                    // get the property value from both, the current and the previous object
                                    itemCurrentValue += _LOGICAL_FILTER.applyPropertyValueFilter( oC, sortCol, true );
                                    itemPreviousValue += _LOGICAL_FILTER.applyPropertyValueFilter( oP, sortCol, true );
                                }
                                // is it simple ?
                                else
                                {
                                    itemCurrentValue += oC[ sortCol ];
                                    itemPreviousValue += oP[ sortCol ];
                                }

                                // add simple "phrase joiner"
                                itemCurrentValue += '-';
                                itemPreviousValue += '-';
                            }

                            // remove the last dash
                            itemCurrentValue = itemCurrentValue.substring( 0, itemCurrentValue.length - 1 );
                            itemPreviousValue = itemPreviousValue.substring( 0, itemPreviousValue.length - 1 );
                        }
                    }

                    /**
                     * @param {string | number} vC
                     * @param {string | number} vP
                     */
                    function boolean_comparator_I_2L ( vC, vP )
                    {
                        /**
                         * vC means itemCurrentValue
                         * vP means itemPreviousValue 
                        */

                        // reference the current sorting mode
                        var sort_mode = _ACTION.hpid.sorting.sort_order;

                        // determine the sorting order of the comparator
                        switch ( sort_mode )
                        {
                            // go the ASC way
                            case _ENUM.ORDER.By.ASC:
                            case _ENUM.ORDER.By.THEN_ASC:
                                if ( vC > vP )
                                    return 1;
                                else
                                    return -1;

                            // go the DESC way
                            case _ENUM.ORDER.By.DESC:
                            case _ENUM.ORDER.By.THEN_DESC:
                                if ( vC > vP )
                                    return -1;
                                else
                                    return 1;

                            default:
                                throw Error( '\r\nUnsupported sorting order [ ' + sort_mode + ' ] !\r\n\r\n' );
                        }
                    }
                }
            },

        fetchObjectStructureKeys: /**
         * @param {any} obj
         */
            function ( obj )
            {
                return fetch_OSKs_I_1L( obj );



                /**
                 * Local helper functions
                 * @param {any} obj
                 */
                function fetch_OSKs_I_1L ( obj )
                {
                    // declare array of object's keys
                    var o_key_arr = [];

                    // retrieve current level keys
                    getKeys_I_2L( '', obj, o_key_arr );

                    // return array of object's keys
                    return o_key_arr;



                    /**
                     * Local helper functions
                     * @param {string} parent
                     * @param {{ [x: string]: any; }} d_obj
                     * @param {any[]} output_arr
                     */
                    function getKeys_I_2L ( parent, d_obj, output_arr )
                    {
                        // declare output array of object's keys
                        var primitives = [];

                        // declare internal array of object's keys pointing to nested objects
                        var objects = [];

                        // fetch current level prop names
                        var keys = Object.getOwnPropertyNames( d_obj );

                        var key;
                        // loop over all keys
                        for ( var i = 0; i < keys.length; i++ )
                        {
                            // get current key
                            key = keys[ i ];

                            // reference object's value stored under this key
                            var value = d_obj[ key ];

                            // if it's a primitive type
                            if ( typeof value !== 'object' && typeof value !== 'function' )
                                primitives.push( parent + key );
                            // if it's an object
                            else if ( typeof value === 'object' )
                                objects.push( key );
                        }

                        // if at current level are any nested objects, drill down to process their properties
                        if ( objects.length )
                        {
                            // loop over all keys pointing to nested objects
                            for ( var j = 0; j < objects.length; j++ )
                            {
                                // get current key
                                var c_k = objects[ j ];

                                // inspect nested object
                                getKeys_I_2L( c_k + '.', d_obj[ c_k ], output_arr );
                            }
                        }

                        // store current level properties - return properly constructed paths
                        Array.prototype.push.apply( output_arr, primitives );
                    }
                }
            },

        detectCollectionDataType: /**
         * @param {any} collectionItem
         * @param {any} doCurrentSort
         * @param {any} doNextSort
         */
            function ( collectionItem, doCurrentSort, doNextSort )
            {
                return check_CDT_I_1L( collectionItem, doCurrentSort, doNextSort );



                /**
                 * Local helper methods
                 * @param {{ [x: string]: any; }} collectionItem
                 * @param {any} doCurrentSort
                 * @param {any} doNextSort
                 */
                function check_CDT_I_1L ( collectionItem, doCurrentSort, doNextSort )
                {
                    // if collection does not require sorting
                    if ( !doCurrentSort && !doNextSort )
                        return _ENUM.CIT.UNKNOWN;
                    // if it's primitive type
                    else if ( _COMMON.isPrimitiveType( collectionItem ) )
                        return _ENUM.CIT.PRIMITIVE;
                    // otherwise let's deal with objects
                    else
                    {
                        // get all prop names
                        var propNames = Object.getOwnPropertyNames( collectionItem );

                        // if it's KVP or GROUPING
                        if ( propNames.length === 2 && propNames.indexOf( 'key' ) > -1 && ( propNames.indexOf( 'value' ) > -1 || propNames.indexOf( 'resultsView' ) > -1 ) )
                        {
                            // if it's KVP
                            if ( propNames.indexOf( 'value' ) > -1 && typeof collectionItem[ 'value' ] === 'object' )
                                return _ENUM.CIT.KVP;
                            // if it's GROUPING
                            else if ( propNames.indexOf( 'resultsView' ) > -1 && Array.isArray( collectionItem[ 'resultsView' ] ) )
                                // check for GROUPING
                                return _ENUM.CIT.GROUPING;
                        }
                        // otherwise it must be PLAIN
                        else
                            return _ENUM.CIT.PLAIN;
                    }
                }
            }
    };

    // declare a private physical filters object
    var _PHYSICAL_FILTER = {
        executeWhereFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} skipOrTakeEnum
         */
            function ( jlc, predicateArray, skipOrTakeEnum )
            {
                return execute_WF_I_1L( jlc, predicateArray, skipOrTakeEnum );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {string} skipOrTakeEnum
                 */
                function execute_WF_I_1L ( jlc, predicateArray, skipOrTakeEnum )
                {
                    // declare current intermediate collection
                    var c_i_c = [];

                    // create input collection cache
                    var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch( jlc._ctx.coll_index ).collection;

                    // if we're dealing with skipWhile...
                    if ( skipOrTakeEnum === _ENUM.SKIP )
                    {
                        // loop over current collection and apply filters
                        for ( var i = 0; i < currentColl.length; i++ )
                        {
                            // access current object
                            var c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            var passed = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i );

                            // if object didn't pass the filter
                            if ( !passed )
                            {
                                // take the rest of the collection
                                c_i_c = currentColl.slice( i );

                                // and break further skipping 
                                break;
                            }
                        }
                    }
                    // if we're dealing with takeWhile...                            
                    else if ( skipOrTakeEnum === _ENUM.TAKE )
                    {
                        // loop over current collection and apply filters
                        for ( var i = 0; i < currentColl.length; i++ )
                        {
                            // access current object
                            var c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            var passed = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i );

                            // if object passed the filter
                            if ( passed )
                                c_i_c.push( c_o );
                            // if object didn't pass the filter
                            else
                                // and break further taking 
                                break;
                        }
                    }
                    // otherwise we're dealing with 'normal where' case
                    else
                    {
                        // loop over current collection and apply filters
                        for ( var i = 0; i < currentColl.length; i++ )
                        {
                            // access current object
                            var c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            passed = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i );

                            // based on filtering result (true/false) pass object further down the flow
                            if ( passed )
                                c_i_c.push( c_o );
                        }
                    }

                    // update HPID object to enable further data flow
                    _ACTION.hpid.data = c_i_c;
                    if ( !_ACTION.hpid.isOn ) _ACTION.hpid.isOn = true;
                }
            },

        executeGroupByFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} udfEqualityComparer
         * @param {any} udfGroupProjector
         * @param {any} udfGroupElementsProjector
         * @param {any} udfGroupResultValueSelector
         * @param {any} terminateFlowAndReturnData
         * @param {any} isDictionaryContext
         */
            function ( jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
            {
                return execute_GBF_I_1L( jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {any} udfEqualityComparer
                 * @param {{ bind: (arg0: any) => any; }} udfGroupProjector
                 * @param {{ bind: (arg0: any) => any; }} udfGroupElementsProjector
                 * @param {any} udfGroupResultValueSelector
                 * @param {any} terminateFlowAndReturnData
                 * @param {any} isDictionaryContext
                 */
                // @ts-ignore
                function execute_GBF_I_1L ( jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
                {
                    // check if grouping key is present
                    if ( predicateArray )
                    {
                        // create the key
                        var key_array = _COMMON.createCompoundKey( predicateArray );

                        // declare groups object being an array !
                        var groups = [];

                        // get contextually current collection within history array
                        var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch( jlc._ctx.coll_index ).collection;

                        // reference first object in the collection and determine the type ASAP
                        var o = currentColl[ 0 ];

                        // do grouping of primitives
                        if ( _COMMON.isPrimitiveType( o ) )
                            currentColl.forEach( groupPrimitives_I_2L );
                        // do grouping of objects
                        else
                            currentColl.forEach( groupObjects_I_2L );


                        // sort the groups by using user-defined or a default comparator
                        if ( udfEqualityComparer )
                            groups = sortGroups_I_2L( udfEqualityComparer );

                        // update HPID object to enable further data flow
                        _ACTION.hpid.data = groups;
                        if ( !_ACTION.hpid.isOn ) _ACTION.hpid.isOn = true;

                        // check if terminate data flow
                        if ( terminateFlowAndReturnData )
                            _ACTION.hpid.done = true;
                    }
                    // otherwise throw error
                    else
                    {
                        throw Error( '\r\n"groupBy" method requires a grouping key to be present. Current invocation is missing the key !\r\n\r\n' );
                    }



                    /**
                     * Local helper functions
                     * @param {any} item
                     */
                    function groupPrimitives_I_2L ( item )
                    {
                        // get the group id
                        var id = item;

                        // project group id if required
                        if ( udfGroupProjector )
                            id = ( udfGroupProjector.bind( id ) )();

                        // project group elements if required
                        if ( udfGroupElementsProjector )
                            item = ( udfGroupElementsProjector.bind( item ) )();


                        // reference grouping-by util object
                        var gbo = _COMMON.getGroupingBy();

                        /**
                         * Distinguish between dictionary and grouped objects
                         *  - dictionary keys has to be unique
                         *  - values are primitives values or objects, not single elements of array 
                        */
                        if ( isDictionaryContext && gbo.getGrouping( id, groups ).arr )
                            throw Error( '\r\nItem with the same key was already added to this dictionary object !\r\n\r\n' );

                        // create pure empty object
                        var eo = Object.create( null );

                        // distinguish between dictionary and grouped objects while preparing Key <-> Value pairs
                        if ( isDictionaryContext )
                        {
                            // define object as a KVP object (KeyValuePair)
                            eo.key = id;
                            eo.value = item;

                            // store KVP object
                            groups.push( eo );
                        }
                        else
                        {
                            // get grouping seeker object from the group
                            var gso = gbo.getGrouping( id, groups );

                            // reference the list of elements if any
                            if ( gso.arr )
                            {
                                // add object to this grouping object
                                gso.arr.push( item );

                                // update grouping object
                                gbo.setGrouping( id, gso, groups );
                            }
                            // otherwise create a new grouping object
                            else
                            {
                                // define a dictionary-like object
                                eo.idx = -1;
                                eo.arr = [ item ];

                                // add object to this grouping object
                                gbo.setGrouping( id, eo, groups );
                            }
                        }
                    }

                    /**
                     * @param {any} item
                     */
                    function groupObjects_I_2L ( item )
                    {
                        // get the group id
                        var id = getTheKeyValue_I_2L( item );

                        // project group id if required
                        if ( udfGroupProjector )
                            id = ( udfGroupProjector.bind( id ) )();

                        // project group elements if required
                        if ( udfGroupElementsProjector )
                            item = ( udfGroupElementsProjector.bind( item ) )();


                        // reference grouping-by util object
                        var gbo = _COMMON.getGroupingBy();

                        /**
                         * Distinguish between dictionary and grouped objects
                         *  - dictionary keys has to be unique
                         *  - values are primitives values or objects, not single elements of array 
                        */
                        if ( isDictionaryContext && gbo.getGrouping( id, groups ).arr )
                            throw Error( '\r\nItem with the same key was already added to this dictionary object !\r\n\r\n' );

                        // create pure empty object
                        var eo = Object.create( null );

                        // distinguish between dictionary and grouped objects while preparing Key <-> Value pairs
                        if ( isDictionaryContext )
                        {
                            // define object as a KVP object (KeyValuePair)
                            eo.key = id;
                            eo.value = item;

                            // store KVP object
                            groups.push( eo );
                        }
                        else
                        {
                            // get grouping seeker object from the group
                            var gso = gbo.getGrouping( id, groups );

                            // reference the list of elements if any
                            if ( gso.arr )
                            {
                                // add object to this grouping object
                                gso.arr.push( item );

                                // update grouping object
                                gbo.setGrouping( id, gso, groups );
                            }
                            // otherwise create a new grouping object
                            else
                            {
                                // define a dictionary-like object
                                eo.idx = -1;
                                eo.arr = [ item ];

                                // add object to this grouping object
                                gbo.setGrouping( id, eo, groups );
                            }
                        }
                    }

                    /**
                     * @param {{ [x: string]: any; }} itemCurrent
                     */
                    function getTheKeyValue_I_2L ( itemCurrent )
                    {
                        // declare a real key
                        var key;

                        // loop over key parts and apply the comparison logic
                        for ( var i = 0; i < key_array.length; i++ )
                        {
                            // reference the key part
                            // @ts-ignore
                            keyPart = key_array[ i ];

                            // is it complex ?
                            // @ts-ignore
                            if ( keyPart.isValidProperty && keyPart.isComplex )
                            {
                                // if key is already initialized
                                if ( key )
                                    // get the property value from both, the current and the previous object
                                    // @ts-ignore
                                    key += _LOGICAL_FILTER.applyPropertyValueFilter( itemCurrent, keyPart.value );
                                else
                                {
                                    // get the key value - get the property value from both, the current and the previous object
                                    // @ts-ignore
                                    var rkv = _LOGICAL_FILTER.applyPropertyValueFilter( itemCurrent, keyPart.value );

                                    // initialize a key with a default value
                                    key = getDefaultOf_I_3L( rkv );
                                    key += rkv;
                                }
                            }
                            // is it simple ?
                            // @ts-ignore
                            else if ( keyPart.isValidProperty )
                            {
                                // if key is already initialized
                                if ( key )
                                    // @ts-ignore
                                    key += itemCurrent[ keyPart.value ];
                                else
                                {
                                    // get the key value
                                    // @ts-ignore
                                    var rkv = itemCurrent[ keyPart.value ];

                                    // initialize a key with a default value
                                    key = getDefaultOf_I_3L( rkv );
                                    key += rkv;
                                }
                            }
                            // otherwise apply some part that is not a property of an object
                            else
                            {
                                // @ts-ignore
                                key += keyPart.value;
                            }
                        }

                        // return the key from object
                        return key;



                        /**
                         * Local helper functions
                         * @param {any} value
                         */
                        function getDefaultOf_I_3L ( value )
                        {
                            // determine the type of value
                            var type = getType_I_4L( value );

                            // type must be a string
                            if ( typeof type !== 'string' ) throw TypeError( '\r\nType must be a string.\r\n\r\n' );

                            // handle simple types (primitives and plain function/object)
                            switch ( type )
                            {
                                case 'boolean': return false;
                                case 'function': return function () { };
                                case 'null': return null;
                                case 'number': return 0;
                                case 'object': return {};
                                case 'string': return "";
                                case 'symbol': return Symbol();
                                case 'undefined': return void 0;
                            }

                            try
                            {
                                // look for constructor in this or current scope
                                var ctor = typeof this[ type ] === 'function'
                                    ? this[ type ]
                                    : eval( type );
                                return new ctor;
                            }
                            // constructor not found, return new object
                            catch ( e )
                            {
                                return {};
                            }




                            /**
                             * Local helper functions
                             * @param {{ constructor: any; }} value
                             */
                            function getType_I_4L ( value )
                            {
                                // determine the type of value
                                var type = typeof value;

                                // primitive or function
                                if ( type !== 'object' ) return type;

                                // null
                                if ( value === null ) return 'null';

                                // everything else, check for a constructor
                                var ctor = value.constructor;
                                var name = typeof ctor === 'function' && ctor.name;

                                return typeof name === 'string' && name.length > 0 ? name : 'object';
                            }
                        }
                    }

                    /**
                     * @param {(a: any, b: any) => number} equalityComparer
                     */
                    function sortGroups_I_2L ( equalityComparer )
                    {
                        // declare array of group keys
                        var keys = [];

                        // loop over all grouping objects
                        for ( var i = 0; i < groups.length; i++ )
                            // store current group key
                            keys.push( groups[ i ].key );

                        // sort the keys
                        keys.sort( equalityComparer );

                        // declare object holding sorted groups
                        var sorted_groups = [];

                        // reference grouping-by util object
                        var gbo = _COMMON.getGroupingBy();

                        // store grouped objects sorted in a proper way
                        keys.forEach( function ( key )
                        {
                            // get grouping seeker object from the group
                            var gso = gbo.getGrouping( key, groups );

                            // update grouping object
                            gbo.setGrouping( key, gso, sorted_groups );
                        } );

                        // return sorted groups
                        return sorted_groups;
                    }
                }
            },

        executeRangeFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} index
         * @param {any} count
         * @param {any} enumValue
         */
            function ( jlc, predicateArray, index, count, enumValue )
            {
                return extR_I_1L( jlc, predicateArray, index, count, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {number} index
                 * @param {number} count
                 * @param {string} enumValue
                 */
                function extR_I_1L ( jlc, predicateArray, index, count, enumValue )
                {
                    if ( predicateArray )
                    {
                        // execute the "WHERE" filter
                        _PHYSICAL_FILTER.executeWhereFilter( jlc, predicateArray, enumValue );

                        // check the result
                        return getResult_I_2L( true );
                    }
                    // for no given predicates
                    else
                    {
                        // check the result
                        return getResult_I_2L( false );
                    }



                    /**
                     * Local helper functions
                     * @param {boolean} withPredicates
                     */
                    function getResult_I_2L ( withPredicates )
                    {
                        // get contextually current collection within history array
                        var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch( jlc._ctx.coll_index ).collection;

                        // if the sequence contains elements
                        if ( currentColl.length )
                        {
                            // declare array of reversed sequence
                            var r_seq = [];

                            // loop indexes
                            var i, j;

                            switch ( enumValue )
                            {
                                case _ENUM.REVERSE:
                                case _ENUM.REVERSE_EXT:
                                    // determine the valid range of sequence to reverse
                                    if ( ( index || index === 0 ) && count )
                                    {
                                        if ( index + count - 1 > currentColl.length - 1 )
                                            throw Error( '\r\nOffset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection !\r\n\r\n' );
                                        else if ( index + count - 1 === currentColl.length - 1 )
                                            i = currentColl.length - 1;
                                        else if ( index + count - 1 < currentColl.length - 1 )
                                            i = index + count - 1;

                                        // reverse the sequence
                                        for ( i; i >= index; i-- )
                                            r_seq.push( currentColl[ i ] );

                                        // replace original sequence with the reversed sequence
                                        for ( j = 0; j < r_seq.length; j++ )
                                            currentColl[ j + index ] = r_seq[ j ];
                                    }
                                    else if ( ( index || index === 0 ) && enumValue === _ENUM.REVERSE_EXT )
                                    {
                                        // reverse the sequence
                                        for ( i = currentColl.length - 1; i >= index; i-- )
                                            r_seq.push( currentColl[ i ] );

                                        // replace original sequence with the reversed sequence
                                        for ( j = 0; j < r_seq.length; j++ )
                                            currentColl[ j + index ] = r_seq[ j ];
                                    }
                                    else if ( count && enumValue === _ENUM.REVERSE_EXT )
                                    {
                                        // determine the start index
                                        index = currentColl.length - 1 - count;

                                        // reverse the sequence
                                        for ( i = currentColl.length - 1; i > index; i-- )
                                            r_seq.push( currentColl[ i ] );

                                        // increment the starting index by 1 because of condition i > index
                                        index++;
                                        // replace original sequence with the reversed sequence
                                        for ( j = 0; j < r_seq.length; j++ )
                                            currentColl[ j + index ] = r_seq[ j ];
                                    }
                                    else
                                    {
                                        if ( enumValue === _ENUM.REVERSE && ( index || count ) )
                                        {
                                            console.warn( "Invoking Reverse with only one of the parameters defaults to parameterless Reverse !" );
                                            console.warn( "If you wanna use only one of the parameters resort to ReverseExt instead !" );
                                        }
                                        // reverse the whole sequence
                                        for ( i = currentColl.length - 1; i >= 0; i-- )
                                            r_seq.push( currentColl[ i ] );

                                        // replace original sequence with the reversed sequence
                                        currentColl = r_seq;
                                    }

                                    break;

                                case _ENUM.SKIP:
                                    // process skip only (no predicates, just count), because skipWhile was handled by executing the "WHERE" filter in the parent method
                                    if ( !withPredicates )
                                    {
                                        // for null or undefined count just throw an error
                                        if ( !count && count !== 0 )
                                            throw Error( '\r\nSupply required parameter called "count" !\r\n\r\n' );

                                        // determine the valid range of sequence to extract
                                        if ( count > 0 && count < currentColl.length )
                                        {
                                            for ( i = count; i < currentColl.length; i++ )
                                                r_seq.push( currentColl[ i ] );
                                        }
                                        // skip the whole sequence
                                        else if ( count >= currentColl.length )
                                            // @ts-ignore
                                            ;
                                        // skip nothing, which means taking whole sequence
                                        else if ( count < 0 )
                                            r_seq = currentColl;

                                        // skip the first element with index equal to 0
                                        else if ( count === 0 )
                                        {
                                            for ( i = 1; i < currentColl.length; i++ )
                                                r_seq.push( currentColl[ i ] );
                                        }

                                        // replace original sequence with the new sequence
                                        currentColl = r_seq;
                                    }

                                    break;

                                case _ENUM.TAKE:
                                    // process take only (no predicates, just count), because takeWhile was handled by executing the "WHERE" filter in the parent method
                                    if ( !withPredicates )
                                    {
                                        // for null or undefined count just throw an error
                                        if ( !count )
                                            throw Error( '\r\nSupply required parameter called "count" !\r\n\r\n' );

                                        // determine the valid range of sequence to extract
                                        if ( count >= currentColl.length )
                                            r_seq = currentColl;

                                        else if ( count > 0 && count < currentColl.length )
                                        {
                                            for ( i = 0; i < count; i++ )
                                                r_seq.push( currentColl[ i ] );
                                        }
                                        // take nothing which means no any processing required
                                        else if ( count <= 0 )
                                            // @ts-ignore
                                            ;

                                        // replace original sequence with the new sequence
                                        currentColl = r_seq;
                                    }

                                    break;

                                default:
                                    throw Error( '\r\nUnrecognized logical type of collection item [ ' + enumValue + ' ] !\r\n\r\n' );
                            }

                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = currentColl;
                            if ( !_ACTION.hpid.isOn ) _ACTION.hpid.isOn = true;
                        }
                    }
                }
            },

        executeOneItemFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} fallbackOnDefault
         * @param {any} enumValue
         */
            function ( jlc, predicateArray, fallbackOnDefault, enumValue )
            {
                return get_FLSA_I_1L( jlc, predicateArray, fallbackOnDefault, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {any} fallbackOnDefault
                 * @param {string} enumValue
                 */
                function get_FLSA_I_1L ( jlc, predicateArray, fallbackOnDefault, enumValue )
                {
                    // for given predicates
                    if ( predicateArray )
                    {
                        // execute the "WHERE" filter
                        // @ts-ignore
                        _PHYSICAL_FILTER.executeWhereFilter( jlc, predicateArray );

                        // check the result
                        return getResult_I_2L( true );
                    }
                    // for no given predicates
                    else
                    {
                        // check the result
                        return getResult_I_2L( false );
                    }



                    /**
                     * Local helper functions
                     * @param {boolean} withPredicates
                     */
                    function getResult_I_2L ( withPredicates )
                    {
                        // get contextually current collection from history array
                        var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch( jlc._ctx.coll_index ).collection;

                        // if the sequence contains elements
                        if ( currentColl.length )
                        {
                            switch ( enumValue )
                            {
                                case _ENUM.FIRST:
                                    // return the first item from the sequence
                                    return currentColl[ 0 ];

                                case _ENUM.LAST:
                                    // return the last item from the sequence
                                    return currentColl[ currentColl.length - 1 ];

                                case _ENUM.SINGLE:
                                    if ( currentColl.length === 1 )
                                        // return the single item from the sequence
                                        return currentColl[ 0 ];
                                    else
                                        throw Error( '\r\nSequence contains more than one element !\r\n\r\n' );

                                case _ENUM.ALL:
                                    // this flag tells to discard returned result
                                    _ACTION.hpid.done = true;
                                    break;

                                default:
                                    throw Error( '\r\nUnrecognized logical type of collection item [ ' + enumValue + ' ] !\r\n\r\n' );
                            }
                        }
                        // if the sequence contains no elements
                        else
                        {
                            // return an empty array
                            if ( fallbackOnDefault && ( enumValue === _ENUM.ALL ) )
                            {
                                // this flag tells to discard returned result and go for hpid's data
                                _ACTION.hpid.done = true;
                                return;
                            }
                            // return default of 'JavaScript's var variable', which is simply value of undefined
                            else if ( fallbackOnDefault )
                                return undefined;
                            // throw valid error
                            else
                            {
                                if ( withPredicates && ( enumValue === _ENUM.SINGLE ) )
                                    throw Error( '\r\nSequence contains no elements !\r\n\r\n' );
                                else if ( withPredicates )
                                    throw Error( '\r\nSequence contains no matching element !\r\n\r\n' );
                                else if ( enumValue === _ENUM.REVERSE )
                                    throw Error( '\r\nSource is null !\r\n\r\n' );
                                else
                                    throw Error( '\r\nSequence contains no elements !\r\n\r\n' );
                            }
                        }

                        // NO NEED TO SWITCH hpid's isOn flag ON, BECAUSE WE IMMEDIATELY RETURN 'SINGLE' ITEM FROM COLLECTION, BE IT hpid OR ORIGINAL ONE !
                    }
                }
            },

        executeOrderFilter: /**
         * @param {any} jlc
         * @param {any} keyPartSelectorArray
         * @param {any} udfComparer
         * @param {any} enumValue
         * @param {any} sorting_metadata
         */
            function ( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata )
            {
                return apply_O_I_1L( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} keyPartSelectorArray
                 * @param {(a: any, b: any) => number} udfComparer
                 * @param {string} enumValue
                 * @param {any} sorting_metadata
                 */
                function apply_O_I_1L ( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata )
                {
                    // when first-level sorting takes place, always reset all so-far used sorting
                    if ( enumValue === _ENUM.ORDER.By.ASC || enumValue === _ENUM.ORDER.By.DESC )
                    {
                        // clear all sorting metadata
                        _ACTION.hpid.sorting.clear();

                        // update and evaluate sorting context for the next invocation
                        evaluateSortingContext_I_2L( _ENUM.ORDER.Level.FIRST );

                        // invoke real sorting over current data collection
                        execute_1st_Level_Sorting_I_2L( sorting_metadata );
                    }
                    // when second-level sorting takes place, first-level one had to occur, hence take into account the previous sorting operations
                    else if ( enumValue === _ENUM.ORDER.By.THEN_ASC || enumValue === _ENUM.ORDER.By.THEN_DESC )
                    {
                        //if second-level sorting is required
                        if ( !_ACTION.hpid.sorting.stop )
                        {
                            // update and evaluate sorting context for the next invocation
                            evaluateSortingContext_I_2L( _ENUM.ORDER.Level.SECOND );
                        }
                    }



                    /**
                     * Local helper functions
                     * @param {string} sorting_level
                     */
                    function evaluateSortingContext_I_2L ( sorting_level )
                    {
                        // if HPID is not ready
                        if ( !_ACTION.hpid.isOn )
                        {
                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = _DATA.fetch( jlc._ctx.coll_index ).collection;
                            _ACTION.hpid.isOn = true;
                        }

                        // get first object from the collection
                        var o = _ACTION.hpid.data[ 0 ];

                        // declare collection metadata object
                        var cmo = {
                            first_obj: o,
                            allow_current_sorting: _ACTION.hpid.data.length > 1,
                            allow_next_sorting: !_COMMON.isPrimitiveType( o ) && _ACTION.hpid.data.length > 1
                        };


                        // store current sorting metadata
                        _ACTION.hpid.sorting.sort_order = enumValue;


                        // if it's primitive type, collection is empty or has only one item, discard further sorting during further data flow.
                        if ( !cmo.allow_next_sorting || !cmo.first_obj )
                        {
                            // discard subsequent sorting operations
                            _ACTION.hpid.sorting.stop = true;

                            // detect and store current sort input type of collection - no sorting required, hence return UNKNOWN
                            _ACTION.hpid.columnSet.cit = _COMMON.detectCollectionDataType( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                        }
                        // otherwise examine object type of sort input to evaluate sorting necessity during next sort operation 
                        else
                        {
                            // detect and store current sort input type of collection - sorting required, hence determine cit (collection input type)
                            _ACTION.hpid.columnSet.cit = _COMMON.detectCollectionDataType( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                            // get only valid column names from user column set
                            var ovc = _ACTION.hpid.columnSet.extractOVC( keyPartSelectorArray );

                            /**
                             * Run mechanism to deliver second-level sorting if method is invoked in the 'thenBy' or 'thenByDescending' mode.
                             * Take into account previous sorting operations.
                            */
                            if ( sorting_level === _ENUM.ORDER.Level.SECOND )
                                // run custom second-level sorting mechanism
                                execute_2nd_Level_Sorting_I_2L( ovc );


                            /**
                             * Run common stuff for first-level and second-level sorting.
                            */
                            // check if current sort set defines 'unique value', aka 'the key' that will discard subsequent sorting operations
                            // @ts-ignore
                            var is_unique = _ACTION.hpid.columnSet.updateOVC_and_CheckIfUnique( ovc );

                            // if unique value 
                            if ( is_unique )
                                // discard subsequent sorting operations
                                _ACTION.hpid.sorting.stop = true;
                        }
                    }

                    /**
                     * @param {any} sorting_metadata
                     */
                    function execute_1st_Level_Sorting_I_2L ( sorting_metadata )
                    {
                        // if user defined his own comparator
                        if ( udfComparer )
                        {
                            // just invoke it
                            _ACTION.hpid.data.sort( udfComparer );
                        }
                        // otherwise do the sorting using default comparator
                        else
                        {
                            /**
                             * Based on sort input type - PRIMITIVE, PLAIN, GROUPING, KVP, UNKNOWN - adjust logic of the default comparator 
                             *      1. determine whether we deal with primitive types
                             *          - number - with or without decimals,
                             *          - string,
                             *          - boolean
                             * 
                             *      2. determine whether we deal with objects
                             * 
                             *      3. invoke actual sorting by invoking the default comparator
                            */
                            // @ts-ignore
                            _ACTION.hpid.data.sort( _COMMON.useDefaultComparer( sorting_metadata ) );
                        }
                    }

                    /**
                     * @param {any[]} ovc
                     */
                    function execute_2nd_Level_Sorting_I_2L ( ovc )
                    {
                        // create data cache for second-level sorting purposes
                        var data_cache = _ACTION.hpid.data.slice( 0 );

                        // reference so-far used sorting columns as the grouping columns
                        var grouping_cols = _ACTION.hpid.sorting.sort_columns;

                        // reference grouping-by util object
                        var gbo = _COMMON.getGroupingBy();

                        // declare groups object being an array !
                        var groups = [];
                        // grouping id, aka 'key'
                        var id;
                        // loop over data and do the grouping
                        for ( var i = 0; i < data_cache.length; i++ )
                        {
                            // reference current object in the collection
                            var item = data_cache[ i ];

                            // create the key
                            id = gbo.buildPhrase( item, grouping_cols );

                            // get grouping seeker object from the group
                            var gso = gbo.getGrouping( id, groups );

                            // reference the list of elements if any
                            if ( gso.arr )
                            {
                                // add object to this grouping object
                                gso.arr.push( item );

                                // update grouping object
                                gbo.setGrouping( id, gso, groups );
                            }
                            // otherwise create a new grouping object
                            else
                            {
                                // create pure empty object
                                var eo = Object.create( null );

                                // define a dictionary-like object
                                eo.idx = -1;
                                eo.arr = [ item ];

                                // add object to this grouping object
                                gbo.setGrouping( id, eo, groups );
                            }
                        }

                        /**
                         * Store current 'ovc' sorting columns to perform second-level sorting only of the subset of data.
                         * Force to use different source of sorting columns. 
                        */
                        Array.prototype.push.apply( _ACTION.hpid.sorting.secondLevelCtx.ovc, ovc );
                        _ACTION.hpid.sorting.secondLevelCtx.force( true );

                        // declare second-level sorted array !
                        var sls_arr = [];
                        var sls_item;
                        // sort grouped data according to the current-invocation sorting columns (ovc)
                        for ( var j = 0; j < groups.length; j++ )
                        {
                            // get current group
                            sls_item = groups[ j ].resultsView;

                            // if this array has at least 2 items
                            if ( sls_item.length > 1 )
                                // sort this array by 'ovc'
                                sls_item.sort( _COMMON.useDefaultComparer( undefined, true, 'PLAIN_Comparator' ) );

                            // add sorted data using second-level sorting method to the output array
                            Array.prototype.push.apply( sls_arr, sls_item );
                        }

                        // when all data is sorted, clear the hpid's current data
                        _ACTION.hpid.data.length = 0;

                        // eventually update hpid, which concludes current second-level sorting
                        Array.prototype.push.apply( _ACTION.hpid.data, sls_arr );
                    }
                }
            },

        executeMergeFilter: /**
         * @param {any} jlc
         * @param {any} collectionOrItem
         * @param {any} enumValue
         */
            function ( jlc, collectionOrItem, enumValue )
            {
                return execute_MF_I_1L( jlc, collectionOrItem, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} collectionOrItem
                 * @param {string} enumValue
                 */
                function execute_MF_I_1L ( jlc, collectionOrItem, enumValue )
                {
                    // get contextually current collection within history array
                    var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch( jlc._ctx.coll_index ).collection;

                    if ( enumValue === _ENUM.APPEND )
                    {
                        // append item to the end of current data flow collection
                        currentColl.push( collectionOrItem );
                    }
                    else if ( enumValue === _ENUM.PREPEND )
                    {
                        // declare new current flow data collection
                        var new_dirty_data = [ collectionOrItem ];

                        // merge new current flow data collection with old current flow data collection
                        Array.prototype.push.apply( new_dirty_data, currentColl );

                        // replace the existing current data flow collection with new current data flow collection
                        currentColl = new_dirty_data;
                    }
                    else if ( enumValue === _ENUM.CONCAT )
                    {
                        // merge new data collection with current flow data collection
                        Array.prototype.push.apply( currentColl, collectionOrItem );
                    }

                    // update HPID object to enable further data flow
                    _ACTION.hpid.data = currentColl;
                    if ( !_ACTION.hpid.isOn ) _ACTION.hpid.isOn = true;
                }
            }
    };

    // declare a private logical filters object
    var _LOGICAL_FILTER = {
        applyLogicalBoolFilter: /**
         * @param {any} currentObject
         * @param {any} predicateArray
         * @param {any} elementIndex
         */
            function ( currentObject, predicateArray, elementIndex )
            {
                return apply_LBF_I_1L( currentObject, predicateArray, elementIndex );



                /**
                 * Local helper functions
                 * @param {any} currentObject
                 * @param {string | any[]} predicateArray
                 * @param {any} elementIndex
                 */
                function apply_LBF_I_1L ( currentObject, predicateArray, elementIndex )
                {
                    // flag that tells whether object passes or fails the filter
                    var passed = true;

                    // loop over predicates
                    for ( var i = 0; i < predicateArray.length; i++ )
                    {
                        // access current filter
                        var predicate = predicateArray[ i ];

                        // determine the type of filter, i.e. user-defined function or a primitive one (string, int, float)
                        if ( typeof predicate === 'object' )
                        {
                            // apply pre-defined basic comparison operators
                            passed = applyPrimitivePredicate_I_2L( predicate, currentObject );
                        }
                        else if ( typeof predicate === 'function' )
                        {
                            // apply pre-defined user-defined comparison function
                            passed = applyUdfPredicate_I_2L( predicate, currentObject, elementIndex );
                        }

                        // check ASAP if object failed the filter for other query method
                        if ( !passed )
                            break;
                    }

                    // return filtering result (true/false)
                    return passed;



                    /**
                     * Local helper functions
                     * @param {string | any[]} predicate
                     * @param {any} currentObject
                     */
                    function applyPrimitivePredicate_I_2L ( predicate, currentObject )
                    {
                        // filtering property name
                        var propName = predicate[ 0 ];

                        // is filtering property value with decimals
                        var withDecimals = ( predicate.length === 4 ) && predicate[ 3 ];

                        // filtering property value
                        var propValue;

                        // process number with decimals
                        if ( withDecimals )
                            propValue = parseFloat( predicate[ 2 ] );
                        // process boolean
                        else if ( predicate[ 2 ] === true || predicate[ 2 ] === false )
                            propValue = predicate[ 2 ];
                        // process string
                        else if ( typeof predicate[ 2 ] === 'string' )
                            propValue = predicate[ 2 ];
                        // by default try parsing as number without decimals
                        else
                            propValue = parseInt( predicate[ 2 ] );

                        // filtering operator
                        var propOperator = predicate[ 1 ];

                        // navigate to the destination property of the current object, execute the filter and return the filter bool result
                        return executePrimitivePredicate_I_3L();



                        /**
                         * Local helper functions
                        */
                        function executePrimitivePredicate_I_3L ()
                        {
                            // input value to compare
                            var propOrVal;

                            // determine if the current object is primitive one, i.e. int, string, number, etc.
                            var isPrimitive = _COMMON.isPrimitiveType( currentObject );

                            // if is primitive...
                            if ( isPrimitive )
                                propOrVal = currentObject;
                            else
                                // otherwise seek the destination property
                                propOrVal = _LOGICAL_FILTER.applyPropertyValueFilter( currentObject, propName, true );

                            // run native comparison
                            return _OPERATOR.checkValue( propOrVal, propOperator, propValue );
                        }
                    }

                    /**
                     * @param {{ bind: (arg0: any, arg1: any, arg2: any) => { (): any; new (): any; }; }} predicate
                     * @param {any} currentObject
                     * @param {any} elementIndex
                     */
                    function applyUdfPredicate_I_2L ( predicate, currentObject, elementIndex )
                    {
                        /**
                         * 1. Bind current collection object to user-defined function - having some pre-defined values - with 'bind' keyword
                         *
                         * 2. Invoke a filter with '()' invocation syntax
                         *
                         * 3. return the filter result with 'return' keyword
                         *
                         *
                         *  All that is accomplished with the following line of code
                        */

                        return predicate.bind( null, currentObject, elementIndex )();
                    }
                }
            },

        applyLogicalWhereFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( jlc, predicateArray, enumValue )
            {
                return apply_LWF_I_1L( jlc, predicateArray, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {string} enumValue
                 */
                function apply_LWF_I_1L ( jlc, predicateArray, enumValue )
                {
                    // declare the bool filter result
                    var passed = false;

                    // create input collection cache
                    var currentColl = _DATA.fetch( jlc._ctx.coll_index ).collection;

                    // loop over current collection and apply filters
                    for ( var i = 0; i < currentColl.length; i++ )
                    {
                        // access current object
                        var c_o = currentColl[ i ];

                        // apply where filter(s) and get the result
                        passed = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i );

                        // based on filtering result (true/false) trigger further action
                        if ( enumValue === _ENUM.ALL && !passed )
                            break;
                        else if ( enumValue === _ENUM.ANY && passed )
                            break;
                    }

                    // return the bool filter result
                    return passed;
                }
            },

        applyAllAnyFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( jlc, predicateArray, enumValue )
            {
                return apply_AAF_I_1L( jlc, predicateArray, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {any} enumValue
                 */
                function apply_AAF_I_1L ( jlc, predicateArray, enumValue )
                {
                    // for given predicates
                    if ( predicateArray )
                    {
                        // execute the "IF" filter and return the result
                        return _LOGICAL_FILTER.applyLogicalWhereFilter( jlc, predicateArray, enumValue );
                    }
                    // for no given predicates
                    else
                    {
                        // check if there are any items in the sequence (contextually current collection within history array)
                        return _DATA.fetch( jlc._ctx.coll_index ).collection.length > 0;
                    }
                }
            },

        applyPropertyValueFilter: /**
         * @param {any} currentObject
         * @param {any} propertyName
         * @param {any} returnValue
         */
            function ( currentObject, propertyName, returnValue )
            {
                return apply_PVF_I_1L( currentObject, propertyName, returnValue );



                /**
                 * Local helper functions
                 * @param {{ [x: string]: any; }} currentObject
                 * @param {string} propertyName
                 * @param {any} returnValue
                 */
                function apply_PVF_I_1L ( currentObject, propertyName, returnValue )
                {
                    // create array of prop's path
                    var pathArray = propertyName.split( '.' );

                    // define property value holder
                    var propertyOrValue = null;

                    // loop over array of prop's path to seek the destination property and/or return its value
                    for ( var i = 0, length = returnValue ? pathArray.length : pathArray.length - 1; i < length; i++ )
                    {
                        propertyOrValue = propertyOrValue ? propertyOrValue[ pathArray[ i ] ] : currentObject[ pathArray[ i ] ];
                    }

                    // return value of the property or property
                    return propertyOrValue;
                }
            }
    };

    // declare a private core object
    var _CORE = {
        // ~ TO BE IMPLEMENTED
        apply_set_based_operations: /**
         * @param {any} inputObjectCollection
         * @param {any} thisCollectionKeyArray
         * @param {any} inputObjectCollectionKeyArray
         * @param {any} outputType
         * @param {any} enumValue
         */
            // @ts-ignore
            function ( inputObjectCollection, thisCollectionKeyArray, inputObjectCollectionKeyArray, outputType, enumValue )
            {
                // invoke core logic
                //_LOGICAL_FILTER.
            },






        /**
         * ALREADY IMPLEMENTED 
        */

        where: /**
         * @param {any} predicateArray
         */
            function ( predicateArray )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                // @ts-ignore
                _PHYSICAL_FILTER.executeWhereFilter( this, predicateArray );
            },

        group_by: /**
         * @param {any} predicateArray
         * @param {any} udfEqualityComparer
         * @param {any} udfGroupProjector
         * @param {any} udfGroupElementsProjector
         * @param {any} udfGroupResultValueSelector
         * @param {any} terminateFlowAndReturnData
         * @param {any} isDictionaryContext
         */
            function ( predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                _PHYSICAL_FILTER.executeGroupByFilter( this, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext );
            },

        order_asc_or_desc: /**
         * @param {any} keyPartSelectorArray
         * @param {any} udfComparer
         * @param {any} enumValue
         */
            function ( keyPartSelectorArray, udfComparer, enumValue )
            {
                // check query filter syntax
                /**
                 * Based on this sort input type do syntax check :
                 *      - pass additional parameter because it's sorting context
                 *      - return some metadata for comparator function
                 * In second-level sorting discard returned metadata from syntax check and proceed with custom second-level sorting mechanism.
                */
                var metadata = _SYNTAX.check( this._ctx.coll_index, keyPartSelectorArray, true );

                // invoke core logic
                _PHYSICAL_FILTER.executeOrderFilter( this, keyPartSelectorArray, udfComparer, enumValue, metadata );
            },

        list_t: /**
         * @param {any} fallbackOnDefault
         */
            function ( fallbackOnDefault )
            {
                // invoke core logic
                _PHYSICAL_FILTER.executeOneItemFilter( this, null, fallbackOnDefault, _ENUM.ALL );
            },

        reverse_t: /**
         * @param {any} startingIndex
         * @param {any} count
         * @param {any} enumValue
         */
            function ( startingIndex, count, enumValue )
            {
                // invoke core logic
                _PHYSICAL_FILTER.executeRangeFilter( this, null, startingIndex, count, enumValue );
            },

        add_t: /**
         * @param {any} collectionOrItem
         * @param {any} enumValue
         */
            function ( collectionOrItem, enumValue )
            {
                // considering different scenarios there should not be syntax checking

                // invoke core logic
                _PHYSICAL_FILTER.executeMergeFilter( this, collectionOrItem, enumValue );
            },

        skip_or_take: /**
         * @param {any} count
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( count, predicateArray, enumValue )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                _PHYSICAL_FILTER.executeRangeFilter( this, predicateArray, null, count, enumValue );
            },

        first_or_default: /**
         * @param {any} predicateArray
         * @param {any} fallbackOnDefault
         */
            function ( predicateArray, fallbackOnDefault )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter( this, predicateArray, fallbackOnDefault, _ENUM.FIRST );
            },

        last_or_default: /**
         * @param {any} predicateArray
         * @param {any} fallbackOnDefault
         */
            function ( predicateArray, fallbackOnDefault )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter( this, predicateArray, fallbackOnDefault, _ENUM.LAST );
            },

        single_or_default: /**
         * @param {any} predicateArray
         * @param {any} fallbackOnDefault
         */
            function ( predicateArray, fallbackOnDefault )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter( this, predicateArray, fallbackOnDefault, _ENUM.SINGLE );
            },

        all_or_any: /**
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( predicateArray, enumValue )
            {
                // check query filter syntax
                // @ts-ignore
                _SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _LOGICAL_FILTER.applyAllAnyFilter( this, predicateArray, enumValue );
            }
    };

    // declare a private data object holding all data flows of all collections passed to JLC
    var _DATA = {
        // index that tracks contextually current collection within history array 
        index: -1,

        // root token array holding root tokens of each collection
        root_token_array: [],

        // collection history array
        collection_array: [],

        // check if contextually current collection is stored internally for data flows
        exists: /**
         * @param {any} rootToken
         */
            function ( rootToken )
            {
                // index of this collection if already stored
                var index = -1;

                // check for collection presence
                for ( var i = 0; i < this.root_token_array.length; i++ )
                {
                    var rto = this.root_token_array[ i ];

                    if ( rto.root_token === rootToken )
                    {
                        index = rto.collection_index;
                        break;
                    }
                }

                // return index
                return index;
            },

        // store collection
        store: /**
         * @param {{ dirty_data: { _rootToken: any; }; }} collection
         */
            function ( collection )
            {
                // increase collection index
                this.index++;

                // store contextually unique token of this collection
                this.root_token_array.push(
                    {
                        root_token: collection.dirty_data._rootToken,

                        collection_index: this.index
                    }
                );

                // store collection
                this.collection_array.push( collection );

                // get index of this contextually current collection
                return this.index;
            },

        // fetch metadata object of contextually current collection from history array
        fetch: /**
         * @param {string | number} index
         */
            function ( index )
            {
                return {
                    // collection index within history array
                    index: index,

                    // collection itself
                    collection: this.collection_array[ index ].dirty_data
                };
            },

        // fetch type metadata of collection item of contextually current collection from history array
        getT: /**
         * @param {string | number} index
         */
            function ( index )
            {
                return this.collection_array[ index ].type;
            }
    };

    // declare a private setup object that does required initialization
    var _SETUP = {
        ___init___: function ()
        {
            return init_I_1L();



            /**
             * Local helper methods
            */
            function init_I_1L ()
            {
                // enable usage of JLC 1.0
                createLinqContext_I_2L();

                /**
                 * JLC 1.0 Query Debugger - very experimental version ! 😀😉
                 *  
                 * Can be safely removed if library moved to production. 🙂
                 * 
                 * Go to JLC API instance creation to remove from api public method called 'ifConsoleDebug'
                */
                // switch JLC 1.0 Query Debugger on
                //_QUERY_DEBUGGER.___init___();



                /**
                 * Local helper functions 
                */
                function createLinqContext_I_2L ()
                {
                    // extend JavaScript Array type with JavaScript LINQ Concept, in short called JLC
                    // @ts-ignore
                    Array.prototype.usingLinq = _SETUP.Funcs.applyJLC;

                    // create Linq context objects
                    // @ts-ignore
                    window.System = window.System || {};
                    // @ts-ignore
                    window.System.Linq = window.System.Linq || {};
                    // @ts-ignore
                    window.System.Linq.Context = window.System.Linq.Context || {};
                    // @ts-ignore
                    window.System.Linq.QueryResult = window.System.Linq.QueryResult || {};
                    // @ts-ignore
                    window.System.Linq.Resources = window.System.Linq.Resources || {
                        dispose: function ()
                        {
                            // remove all collections
                            _DATA.collection_array.length = 0;

                            // remove all collections' tokens
                            _DATA.root_token_array.length = 0;

                            // reset collections' index
                            _DATA.index = -1;
                        }
                    };

                    // add methods to Linq context objects
                    addLinqMethodsToContext_I_3L(
                        [
                            [ 'where', false ], [ 'groupBy', false ], [ 'orderBy', false ], [ 'orderByDescending', false ], [ 'thenBy', false ], [ 'thenByDescending', false ],
                            [ 'concat', false ], [ 'append', false ], [ 'prepend', false ],
                            [ 'skip', false ], [ 'skipWhile', false ], [ 'take', false ], [ 'takeWhile', false ], [ 'reverse', false ], [ 'reverseExt', false ],
                            [ 'toArray', true ], [ 'toDictionary', true ],
                            [ 'first', true ], [ 'firstOrDefault', true ], [ 'last', true ], [ 'lastOrDefault', true ], [ 'single', true ], [ 'singleOrDefault', true ],
                            [ 'any', true ], [ 'all', true ]
                        ]
                    );



                    /**
                     * Local helper methods
                     * @param {string | any[]} method_arr
                     */
                    function addLinqMethodsToContext_I_3L ( method_arr )
                    {
                        // loop over method array
                        for ( var i = 0; i < method_arr.length; i++ )
                        {
                            // reference a method
                            var m = method_arr[ i ];

                            // add method to Linq context object
                            // @ts-ignore
                            System.Linq.Context[ m[ 0 ] ] = m[ 0 ];

                            // store information whether this method produces physical result or a logical one
                            // @ts-ignore
                            System.Linq.QueryResult[ m[ 0 ] ] = m[ 1 ];
                        }
                    }
                }
            }
        },

        Funcs: {
            applyJLC: function ()
            {
                // do required initial 'configuration cleanup'
                doSetupCleanup_I_3L();

                // get token associated with current collection, aka root token
                var rootToken = new Date().getTime();

                // create copy of this collection
                var _this = this.slice( 0 );

                // assign token to collection
                _this._rootToken = rootToken;

                // pass data in to the mechanism - 'this' refers to the calling client data array !
                var coll_idx = over_I_1L( _this );

                // get JLC API instance
                return _COMMON.jlcNew( { coll_index: coll_idx, root_token: rootToken, parent: null } );



                /**
                 * Local helper functions
                */
                function doSetupCleanup_I_3L ()
                {
                    _ACTION.hpid.sorting.firstLevelCtx.set( false );
                }

                /**
                 * @param {{ _rootToken: any; }} inputCollection
                 */
                function over_I_1L ( inputCollection )
                {
                    // check if current collection is stored internally
                    var index = _DATA.exists( inputCollection._rootToken );

                    // store this collection if a new one
                    if ( index === -1 )
                    {
                        // declare a private data object holding data collection of current JLC instance, aka static or shared instance
                        var coll_data = {
                            dirty_data: null,   // current flow data
                            dirty_data_temp: [],
                            data: null,         // data - the copy of current flow data - requested on demand via resultsView dynamic property of JLC api instance
                            type: {
                                source: null,
                                makeItEmpty: false,
                                isReady: false,
                                output: null
                            }
                        };


                        // store the collection to iterate over
                        coll_data.dirty_data = inputCollection || coll_data.dirty_data || [];

                        // otherwise create an empty object based on inputCollection's first item
                        if ( coll_data.dirty_data.length )
                        {
                            coll_data.type.source = coll_data.dirty_data[ 0 ];
                            coll_data.type.makeItEmpty = true;
                        }
                        // or default to an empty JavaScript object
                        else
                        {
                            coll_data.type.output = {};
                            coll_data.type.isReady = true;
                        }

                        /**
                         * Store current collection into collection history array.
                         * Return index of this collection from collection history array.
                        */
                        return _DATA.store( coll_data );
                    }

                    // return index of this collection from collection history array
                    return index;
                }
            }
        }
    };

    /* ~ private variables */



    /* Initialize JLC */
    _SETUP.___init___();
}
)();