/*
 * JavaScript LINQ Concept
 * The idea of querying JavaScript object collections is entirely based on programming language from Microsoft called C# !
 * 
 * 
 * 
 * What does it mean jlc.v.ga ?
 *      - jlc   ->  JavaScript LINQ Concept
 *      - v     ->  version
 *      - ga    ->  generally available, i.e. publicly accessible f.e. on GitHub
 *
 * 
 * 
 * 
 * Status:
 *      ⚠️ DPR #64 -> 3-Tier Architecture [GA/TEST] -> DEV / DEV|TEST|RELEASE
 *                                                                              -> Objects      ->      RC Version      ->      TEST COMPLETED      ->      100%
 *                                                                              -> Primitives   ->      Set for TEST    ->      TEST IN PROGRESS    ->      
 *          What does it mean ?
 *              It does mean, that this library is GA candidate in the version called TEST PHASE !
 *              TEST PHASE refers to finished development and started testing of the whole library.
 *              The last phase is the RELEASE PHASE marked by RELEASE keyword.
 *
 *              In plain English, I have just finished development of this library and have started testing it !
 *              When all will be working as expected, I will release the so-called GA version !
 *              Any errors found during testing will be depicted by moving from [GA/TEST] -> TEST phase to [GA/TEST] -> DEV phase !
 *              
 *              Easy to grasp ?
 * 
 * 
 * 
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 * 
 * (c) C4B Solutions Open Source
 * 
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

( function ()
{
    // private enum object
    var _ENUM = {
        FIRST: Symbol( 'first' ),
        LAST: Symbol( 'last' ),

        SINGLE: Symbol( 'single' ),
        ELEMENT_AT: Symbol( 'element_at' ),

        MIN: Symbol( 'min' ),
        MAX: Symbol( 'max' ),
        AVG: Symbol( 'average' ),
        AVG_MIN: Symbol( 'average_min' ),
        AVG_MAX: Symbol( 'average_max' ),

        ALL: Symbol( 'all' ),
        ANY: Symbol( 'any' ),

        DEFAULT: Symbol( 'default' ),

        REVERSE: Symbol( 'reverse' ),

        SKIP: Symbol( 'skip' ),
        TAKE: Symbol( 'take' ),

        SELECT: Symbol( 'select' ),
        SELECT_MANY: Symbol( 'select_many' ),

        JOIN: Symbol( 'join' ),
        LEFT_JOIN: Symbol( 'left_join' ),
        GROUP_JOIN: Symbol( 'group_join' ),
        GROUP_LEFT_JOIN: Symbol( 'group_left_join' ),

        CONCAT: Symbol( 'concatenate' ),
        APPEND: Symbol( 'append' ),
        PREPEND: Symbol( 'prepend' ),
        CONTAINS: Symbol( 'contains' ),
        DISTINCT: Symbol( 'distinct' ),
        EXCEPT: Symbol( 'except' ),

        ORDER: {
            Level: {
                FIRST: Symbol( 'first_level' ),
                SECOND: Symbol( 'second_level' )
            },

            By: {
                ASC: Symbol( 'asc' ),
                DESC: Symbol( 'desc' ),
                THEN_ASC: Symbol( 'then_asc' ),
                THEN_DESC: Symbol( 'then_desc' )
            }
        },
        // collection element structure type (cest)
        CEST: {
            PRIMITIVE: Symbol( 'primitive_type' ),
            PLAIN: Symbol( 'plain_object' ),
            GROUPING: Symbol( 'grouping_object' ),
            KVP: Symbol( 'key_value_pair_object' ),
            UNKNOWN: Symbol( 'unknown' )
        },

        FLOW_CONTEXT: {
            RAW_SOURCE_CONTEXT: Symbol( 'raw_source_ctx' ),
            INDEX_SOURCE_CONTEXT: Symbol( 'apply_jlc_ctx' ),
            PROXY_SOURCE_CONTEXT: Symbol( 'proxy_source_ctx' ),
            ACTION_SOURCE_CONTEXT: Symbol( 'action_source_ctx' )
        },

        RESULTS_VIEW: {
            ENUMERATOR: 'resultsView'
        },

        // type to string representation
        T2SR: {
            OBJECT: '[object Object]',
            ARRAY: '[object Array]',
            UNDEFINED: '[object Undefined]',
            NULL: '[object Null]',
            STRING: '[object String]',
            NUMBER: '[object Number]',
            BOOLEAN: '[object Boolean]',
            DATE: '[object Date]',
            SET: '[object Set]',
            MAP: '[object Map]'
        },

        SPECIAL_PROPS: {
            OBJECT_EXCLAMATION_MARK: 'object!',
            VALUE_DOT: 'value.'
        },

        RUNTIME: {
            CI: Symbol( 'collectionIndex' ), // collection index that marks that collection was internally indexed
            CT: Symbol( 'collectionToken' ), // token associated with current collection, aka root token
            RTC: 'runtimeContext', // context of all actions defined for this proxied JLC instance
            QCMICO: 'currentQueryChainMethodImplCacheObject' // query chain method implementation cache object
        },

        PLACEHOLDERS: {
            PRIMITIVE: null,
            PLAIN: Object.create( null ),
            GROUPING: { key: "", resultsView: [] },
            KVP: { key: "", value: Object.create( null ) },
            UNKNOWN: null
        },

        DATA_TYPES_PROPS_and_METHODS: {
            KVP: {
                PROPS: {
                    KEYS: 'keys',
                    VALUES: 'values'
                },

                METHODS: {
                    CONTAINS_KEY: 'containsKey',
                    CONTAINS_VALUE: 'containsValue'
                }
            }
        },

        MISC: {
            UNDERSCORE: '_',
            EMPTY: ''fdgfdfdfdsfdsfdsfds
        }sadsadasdsadasdsadas
    };

    // private operators object
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
                        return v1 === v2;
                    }
            }
        },

        checkValue: /**
         * @param {any} propOrVal
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

                // execute the operator provided that the found prop "IS NOT NULL"
                if ( valid )
                {
                    // get the proper bool operator
                    var b_op = _OPERATOR.get[ propOperator ];

                    // run operator
                    if ( b_op )
                        return b_op.call( propOrVal, propValue );
                    // in case you provided 'not-implemented' one, throw an error
                    else
                        throw new Error( '\r\nUnsupported operator [ ' + propOperator + ' ] !\r\n\r\n' );
                }
                else
                    return false;
            }
    };

    // private extension object
    var _EXTENSION = {
        array_equals: /**
         * To compare arrays of primitive values, loop through them and compare every value.
         *
         * Source: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
         */
            function ()
            {
                // warn if overriding existing method
                if ( Array.prototype.equals )
                    console.warn( "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code." );

                // attach the .equals method to Array's prototype to call it on any array
                Array.prototype.equals = function ( array )
                {
                    // if the other array is a falsy value, return
                    if ( !array )
                        return false;

                    // compare lengths - can save a lot of time 
                    if ( this.length != array.length )
                        return false;

                    for ( var i = 0, l = this.length; i < l; i++ )
                    {
                        // check if we have nested arrays
                        if ( this[ i ] instanceof Array && array[ i ] instanceof Array )
                        {
                            // recurse into the nested arrays
                            if ( !this[ i ].equals( array[ i ] ) )
                                return false;
                        }
                        else if ( this[ i ] != array[ i ] )
                        {
                            // warning - two different object instances will never be equal: {x:20} != {x:20}
                            return false;
                        }
                    }

                    return true;
                };
                // hide method from for-in loops
                Object.defineProperty( Array.prototype, "equals", { enumerable: false } );
            }
    };



    // private constraints object
    var _CONSTRAINT = {
        add:/**
             * Add constraint func or constraint func array for given context, f.e. 'where', 'groupBy', 'take', etc.
             *
             * @param {any} jlc_query_name Query method context, f.e. 'where', 'groupBy' etc.
             * @param {any} actionConstr
            */
            // @ts-ignore
            function ( jlc_query_name, actionConstr )
            {
                return a_I_1L( jlc_query_name, actionConstr );



                /**
                 * Local helper functions
                */
                function a_I_1L ( jqn, actionConstr )
                {
                    // store action constraint
                    _CONSTRAINT._baseConstraints[ jqn ] = actionConstr;
                }
            },

        createQueryFlowConstraints:/**
            * Create instance object of all constraints.
            *
            * @param {string} lmn Query method name, f.e. 'where', 'groupBy' etc.
            */
            // @ts-ignore
            function ( lmn )
            {
                return create_QFC_I_1L( lmn );



                /**
                 * Local helper functions
                */
                function create_QFC_I_1L ( lmn )
                {
                    // declare query constraint property name
                    var queryPropertyName = _CONSTRAINT._placeholder + lmn;

                    // yield on demand query flow base constraints
                    return _CONSTRAINT[ queryPropertyName ];
                }
            },

        createActionConstraint:/**
             * Create action constraint, aka requirement for this query method to be eligible to run.
             *
             * @param {any} jlc_query_name Query method context, f.e. 'where', 'groupBy' etc.
             * @param {Array} required_contexts All invocation contexts that had to take place prior to this invocation context !
             * @param {any} upqf_syntax User-provided query filter syntax
             */
            function ( jlc_query_name, required_contexts, upqf_syntax )
            {
                return create_AC_I_1L( jlc_query_name, required_contexts, upqf_syntax );


                /**
                 *  Local helper functions 
                */
                function create_AC_I_1L ( jqn, required_ctxs, upqf_syntax )
                {
                    // create action constraint object
                    var ac = Object.create( null );

                    // assign name to action constraint
                    ac.name = jqn;

                    /**
                     * Store all required invocation contexts that had to take place prior to this invocation context !
                     * Why ?
                     * In order for this invocation context to be valid one during this query flow !
                     * 
                     * Hence, this invocation context must also be "required" if it is defined, i.e. every constraint being created is by default enabled !
                    */

                    // store all required invocation contexts
                    ac.all_required = required_ctxs;
                    // store current being-created invocation context
                    ac.all_required.unshift( jqn );

                    // store user-provided query filter syntax
                    ac.predicate_array = upqf_syntax;

                    // return action constraint
                    return ac;
                }
            },

        updateContextConstraints:/**
             * Update constraints - func or constraint func array - for given context, f.e. 'where', 'groupBy', 'take', etc.
             *
             * @param {any} jlc_query_name Query method context, f.e. 'where', 'groupBy' etc.
             * @param {any} actionConstr
             * @param {any} constr_func_arr
            */
            // @ts-ignore
            function ( jlc_query_name, constr_func_arr )
            {
                return u_CC_I_1L( jlc_query_name, constr_func_arr );



                /**
                 * Local helper functions
                */
                function u_CC_I_1L ( jqn, c_func_arr )
                {
                    // reference the context in question
                    var ctx_ref = _CONSTRAINT._baseConstraints[ jqn ];

                    // store action constraint functions
                    if ( typeof c_func_arr === 'function' )
                    {
                        ctx_ref.acf.push( c_func_arr );
                    }
                    // store action constraint function array
                    else if ( Array.isArray( c_func_arr ) )
                    {
                        Array.prototype.push.apply( ctx_ref.acf, c_func_arr );
                    }
                }
            },


        // query flow constraint placeholder
        _placeholder: '_bc_',

        // query flow constraint cache
        _qfcc: Object.create( null )
    };

    // private syntax object
    var _SYNTAX = {
        check: /**
         * @param {any} user_filter_array
         * @param {boolean} is_query_flow_cit_primitive
         * @param {any} sortingContext
         * @param {any} actionConstr
         * @param {any} thisAction
         * @param {string} context
         */
            function ( user_filter_array, is_query_flow_cit_primitive, sortingContext, actionConstr, thisAction, context )
            {
                return c_I_1L( user_filter_array, is_query_flow_cit_primitive, sortingContext, actionConstr, thisAction, context );



                /**
                 * Local helper functions 
                */
                function c_I_1L ( user_filter_array, is_primitive, sortingContext, actionConstr, thisAction, context )
                {
                    /**
                     * If user omitted filters for some query methods, do not run the check.
                     * I consider providing more agile solution here, like f.e. checking whether one particular query method allows for empty filters or not, etc.
                     * Right now, it's a simple true/false check !
                    */
                    if ( !user_filter_array || typeof user_filter_array === 'function' ) return;

                    /**
                     * Otherwise check for primitive type context or object context
                     * 
                     * Get this information from JLC instance context
                     *  - in case it's primitive, run syntax checking for primitive types
                     *  - otherwise if cest is not UNKNOWN run syntax checking for objects
                    */
                    if ( is_primitive && _COMMON.convertTypeToString( user_filter_array ) === _ENUM.T2SR.ARRAY )
                        return user_filter_array.forEach(
                            function ( user_syntax_arr )
                            {
                                if ( _COMMON.convertTypeToString( user_syntax_arr ) === _ENUM.T2SR.ARRAY || typeof user_syntax_arr !== 'function' )
                                    c_P_I_1L( user_syntax_arr, sortingContext );
                            }
                        );
                    else
                    {
                        if ( sortingContext )
                        {
                            /**
                             * Only in sorting context you can access shared first-level sorting context.
                             * 
                             * Metadata is returned only for type KVP.
                             * 
                             * While in sorting context, 'user_filter_array' is a single array, not array of arrays !
                             * This is due to design of JavaScript LINQ query methods in the context of sorting !
                            */

                            var metadataKVP = c_O_I_2L( user_filter_array, sortingContext );

                            // set sorting metadata in the running context
                            thisAction.sortingMetadataContext.setMetadata.call( thisAction.sortingMetadataContext, metadataKVP, actionConstr );
                        }
                        else
                            return user_filter_array.forEach(
                                function ( user_syntax_arr )
                                {
                                    if ( user_syntax_arr && typeof user_syntax_arr !== 'function' )
                                        c_O_I_2L( user_syntax_arr, sortingContext );
                                }
                            );
                    }



                    /**
                     * Local helper functions 
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

                            // user filter being a UDF or any primitive type different than string is considered as passing all checking
                            if ( typeof user_filter === 'function' || _COMMON.convertTypeToString( user_filter ) !== _ENUM.T2SR.STRING ) continue;

                            // number of filter parameters can be 2, 3 or 4
                            length = user_filter.length;

                            // throw error about invalid number of predicate values
                            if ( length !== 2 && length !== 3 && length !== 4 )
                                throw new SyntaxError( '\r\nDealing with primitive types requires providing only 2, 3, or 4 values all starting with empty string - "" !\r\n\r\n' );

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
                                throw new SyntaxError( '\r\nDealing with primitive types in the context of THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} \r\nrequires providing only empty string predicate with second parameter set to true ! \r\n\r\nExamplary usage -> ["", true]\r\n\r\n' );

                            /**
                             * Other operations require from 3 to 4 parameters to be present 
                            */

                            // handling 3 filter parameters with special case where 3rd parameter is equal to 0 (which logically in JavaScript evaluates to false)
                            else if ( length === 3 && ( user_filter[ 0 ].trim() !== "" || user_filter[ 1 ].trim() === "" || !user_filter[ 2 ] && user_filter[ 2 ] !== 0 ) )
                                // throw error about invalid parameters
                                throw new SyntaxError(
                                    '\r\nDealing with primitive types in the context of NOT THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} \r\nrequires providing empty string predicate, second parameter set to non-empty string, and third parameter being some kind of valid stuff (number, UDF, user string) ! \r\n\r\nExamplary usage -> ["", "<", 7]\r\n\r\n'
                                );

                            // handling 4 filter parameters
                            else if ( length === 4 && (
                                user_filter[ 0 ].trim() !== "" || user_filter[ 1 ].trim() === "" || !user_filter[ 2 ] || typeof user_filter[ 3 ] !== "boolean"
                            )
                            )
                                // throw error about invalid parameters
                                throw new SyntaxError(
                                    '\r\nDealing with primitive types in the context of NOT THESE OPERATIONS {groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending} with specifying 4th parameter, \r\nrequires providing empty string predicate, second parameter set to non-empty string, third parameter being some kind of valid stuff (number, UDF, user string) and forth parameter being boolean value (true/false) ! \r\n\r\nExamplary usage -> ["", "<", 7, true]\r\n\r\n'
                                );
                        }
                    }

                    function c_O_I_2L ( user_filter_array, sortingContext )
                    {
                        var user_ovc;

                        if ( sortingContext )
                        {
                            // get user syntax metadata (valid column name(s) or valid column path(s) for inner object(s))
                            const [ u_ovc, u_filter_array ] = _ACTION.hpid.columnSet.extractOVC( user_filter_array, true );

                            user_ovc = u_ovc;

                            user_filter_array = u_filter_array;
                        }
                        else
                            // get user syntax metadata (valid column name(s) or valid column path(s) for inner object(s))
                            user_ovc = _ACTION.hpid.columnSet.extractOVC( user_filter_array, false );



                        /**
                         * To do the appropriate syntax checking in the right way, follow these two steps:
                         * 
                         *      1.  analyze the very next query flow at the "action creation" layer !
                         *          a. update type of collection element structure (cest) of the very next query in the flow
                        */

                        // 1.a
                        _ACTION.hpidCommons.simulateNextQueryIcest( actionConstr.actionContext );



                        /**
                         * Do the appropriate syntax checking !
                        */

                        if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PLAIN )
                        {
                            // this metadata is required only in the sorting context and only when sorting PLAIN collection by its objects themselves
                            var metadata;

                            // if this is sorting context
                            if ( sortingContext )
                            {
                                // create metadata object
                                metadata = Object.create( null );

                                // user provided many filters
                                if ( user_filter_array.length > 1 && [ System.Linq.Context.min, System.Linq.Context.max, System.Linq.Context.average ].includes( context ) )
                                    // throw error about too many filters
                                    throw new SyntaxError(
                                        '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.PLAIN ) + '] in the context of ['
                                        + _COMMON.getCustomValueOfSymbol( _ENUM.MIN ) + ', ' + _COMMON.getCustomValueOfSymbol( _ENUM.MAX ) + ', ' + _COMMON.getCustomValueOfSymbol( _ENUM.AVG )
                                        + '] requires presence of only one filter !\r\n\r\n'
                                    );
                                // user provided single filter
                                else
                                {
                                    // sort PLAIN by 'object!'
                                    metadata.byObjectString =
                                        ( user_filter_array.length === 1 && user_filter_array[ 0 ].length === 2 && user_filter_array[ 0 ][ 0 ].trim() === 'object!' && user_filter_array[ 0 ][ 1 ] === true ) ||
                                        actionConstr.actionContext.minMaxAverageValueTypeObject.t2sr.type === _ENUM.T2SR.OBJECT;

                                    // user provide 'object!' filter with 2+ more parameters
                                    if (
                                        ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && user_filter_array[ 0 ][ 0 ].trim() === 'object!' ) ||
                                        ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && actionConstr.actionContext.minMaxAverageValueTypeObject.t2sr.type === _ENUM.T2SR.OBJECT )
                                    )
                                    {
                                        // throw error about invalid syntax when dealing with PLAIN objects and using "object!" predicate, which means comparing whole objects
                                        throw new SyntaxError( '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.PLAIN ) + '] using "object!" requires the following syntax ["object!", true] or ["currentLevelObject.NestedObject.AnotherNestedObject (...etc)", true] !\r\n\r\n' );
                                    }
                                }
                            }

                            // if there is no 'object!' filter, we are dealing with PLAIN
                            check_PLAIN_I_2L( _ENUM.CEST.PLAIN, _ENUM.CEST.PLAIN );

                            // if this is sorting context, return required PLAIN sorting metadata
                            if ( sortingContext )
                                return metadata;
                        }
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                        {
                            // the only valid column is key 
                            var valid = _ACTION.hpid.columnSet.all_columns.length === 1 && _ACTION.hpid.columnSet.all_columns[ 0 ] === 'key';

                            // if it's not valid
                            if ( !valid )
                                // throw error about invalid column name called 'key' when dealing with GROUPING objects
                                throw new SyntaxError( '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.GROUPING ) + '] requires providing only "key" property !\r\n\r\n' );
                        }
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
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

                            // user provide 'key' filter with 2+ more parameters in the context of sorting
                            if ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && user_filter_array[ 0 ][ 0 ].trim() === 'key' && [ System.Linq.Context.orderBy, System.Linq.Context.orderByDescending, System.Linq.Context.thenBy, System.Linq.Context.thenByDescending ].includes( context ) )
                            {
                                // throw error about invalid syntax when dealing with KVP objects and using "key" predicate
                                throw new SyntaxError( '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.KVP ) + '] using "key" requires the following syntax ["key", true] !\r\n\r\n' );
                            }
                            // user provide 'value.' filter with 2+ more parameters
                            else if ( user_filter_array.length === 1 && user_filter_array[ 0 ].length !== 2 && user_filter_array[ 0 ].length > 2 && user_filter_array[ 0 ][ 0 ].trim() === 'value.' )
                            {
                                // throw error about invalid syntax when dealing with KVP objects and using "value." predicate, which means comparing whole objects
                                throw new SyntaxError( '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.KVP ) + '] using "value." requires the following syntax ["value.", true] !\r\n\r\n' );
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
                                var predicateArray;
                                // loop over all filters and check for 'key' or 'value.' filters, so it doesn't make sense
                                for ( var i = 0; i < user_filter_array.length; i++ )
                                {
                                    // access current filter
                                    predicateArray = user_filter_array[ i ];
                                    // if it's key, throw error
                                    if ( predicateArray[ 0 ].trim() === 'key' || predicateArray[ 0 ].trim() === 'value.' )
                                        // throw error about 'key' filter presence among other filters
                                        throw new SyntaxError(
                                            '\r\nDealing with objects of type [' + _COMMON.getCustomValueOfSymbol( _ENUM.CEST.KVP ) + '] using "' +
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
                                check_PLAIN_I_2L( _ENUM.CEST.KVP, _ENUM.CEST.PLAIN );
                            }

                            // if this is sorting context, return required KVP sorting metadata
                            if ( sortingContext )
                            {
                                // sort KVP by 'value.PLAIN' - check for primitive type of value object itself (value.)
                                if ( is_primitive )
                                {
                                    // if so, mark that sorting by 'value.PLAIN' for primitive types simply doesn't exist
                                    metadata.byValuePLAIN = false;


                                    // add extra property to tell that 'value.' object is a primitive type
                                    metadata.isValueDotPrimitive = true;
                                }

                                // return updated KVP sorting metadata
                                return metadata;
                            }
                        }
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.UNKNOWN )
                            // @ts-ignore
                            ; // with collection input type set to UNKNOWN do nothing as the collection is empty
                        else
                            // throw error about unsupported collection input type !
                            throw new Error( '\r\nThis sorting input type (sit) called "' + _COMMON.getCustomValueOfSymbol( _ACTION.hpid.columnSet.currentQueryIcest ) + '" is not supported !\r\n\r\n' );



                        /**
                         * Local helper functions
                        */
                        function check_PLAIN_I_2L ( cest1, cest2 )
                        {
                            // assume that all user columns are valid 
                            var valid = true;

                            if ( cest1 === cest2 )
                            {
                                // loop over all user 'real' columns
                                for ( var i = 0; i < user_ovc.length; i++ )
                                {
                                    // assess the validity
                                    valid = _ACTION.hpid.columnSet.all_columns.indexOf( user_ovc[ i ] ) > -1;

                                    // if it's not valid
                                    if ( !valid )
                                    {
                                        // convert cest1 and cest2 to string
                                        var cest1_cest2_toString = _COMMON.getCustomValueOfSymbol( cest1 );

                                        // throw error about invalid column name or invalid column path when dealing with PLAIN objects in the PLAIN context
                                        throw new ReferenceError(
                                            '\r\nDealing with objects of type [' + cest1_cest2_toString + '] in the context of [' + cest1_cest2_toString + '] ' +
                                            'requires providing valid column name or column path !' +
                                            '\r\nThis column called "' + user_ovc[ i ] + '" is not a valid column name or column path (property name or property path) !\r\n\r\n'
                                        );
                                    }
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
                                    {
                                        // convert cest1 to string
                                        var cest1_toString = _COMMON.getCustomValueOfSymbol( cest1 );

                                        // convert cest2 to string
                                        var cest2_toString = _COMMON.getCustomValueOfSymbol( cest2 );

                                        // throw error about invalid column name or invalid column path when dealing with PLAIN objects in the KVP context
                                        throw new ReferenceError(
                                            'Dealing with objects of type [' + cest1_toString + '] in the context of [' + cest2_toString + '] ' +
                                            'requires providing valid column path !' +
                                            '\r\nThis column called "' + user_ovc[ i ] + '" is not a valid column path (property path) !' +
                                            '\r\nValid column paths should be constracted in this way: "value.obj_prop_name" or "value.nested_obj.nested_obj_prop_name"'
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            },

        addCustom: /**
         * @param {any} name
         * @param {any} key
         * @param {any} value
         * @param {any} param_args
         */
            function ( name, key, value, param_args )
            {
                return a_C_I_1L( name, key, value, param_args );



                /**
                 * Local helper functions
                */
                // @ts-ignore
                function a_C_I_1L ( name, key, value, param_args )
                {
                    /**
                     * name : name of the function to access
                     * key : 'predicateArray', 'collectionItem', 'count', etc.
                     * value : primitive value || UDF (user-defined function)
                     * param_args : additional parameters to pass to UDF
                    */

                    defineCustomCheckMethod_I_1L( name, key, value, param_args );



                    /**
                     * Local helper functions
                    */
                    function defineCustomCheckMethod_I_1L ( property_name, user_filter_key, value, param_args )
                    {
                        Object.defineProperty(
                            _SYNTAX,
                            property_name,
                            {
                                // only override getter
                                get: function ()
                                {
                                    if ( typeof value !== 'function' )
                                        throw new Error( '\r\nYou have to provide a function that will deliver custom syntax checking !\r\n\r\n' );

                                    // return a UDF to check custom syntax
                                    return value.bind( null, user_filter_key, ...param_args )();
                                }
                            }
                        );
                    }
                }
            },

        checkCustom: /**
         * @param {any} method_name Name of the function to access
         */
            function ( method_name )
            {
                return a_C_I_1L( method_name );



                /**
                 * Local helper functions
                */
                // @ts-ignore
                function a_C_I_1L ( method_name )
                {
                    // invoke UDF
                    return _SYNTAX[ method_name ];
                }
            }
    };



    // private action object
    var _ACTION = {
        // create 'current' query-wide HPID, i.e. holder of physical intermediate data
        hpid: {
            // is data holder activated
            isSwitchedOn: false,

            // array for storing physical intermediate data
            data: [],

            // this object allows for syntax checking during data flow operations
            columnSet: {
                // current query input collection element structure type (currentQueryIcest)
                currentQueryIcest: undefined,

                // all columns of an data object
                all_columns: [],

                init: /**
                 * @param {{ value: any; }} obj
                 */
                    function ( obj )
                    {
                        // collection input column set
                        var propNames;

                        if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PLAIN )
                        {
                            // get all object property names at all levels
                            propNames = _COMMON.fetchObjectStructureKeys( obj );

                            // prepend object!
                            propNames.unshift( 'object!' );
                        }
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                            // prepend key
                            propNames = [ 'key' ];
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
                        {
                            // get value all object property names at all levels
                            propNames = _COMMON.fetchObjectStructureKeys( obj.value );

                            // prepend value.
                            propNames.unshift( 'value.' );

                            // prepend key
                            propNames.unshift( 'key' );
                        }
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PRIMITIVE )
                            propNames = [];
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.UNKNOWN )
                            propNames = [];

                        // store it for sorting purposes - all columns available for usage in sorting operations
                        _ACTION.hpid.columnSet.all_columns = propNames;
                    },

                extractOVC: /**
                 * @param {any[]} userColumnSet User column set
                 * @param {boolean} ensure_1D_array Force user column set (an array) to be in the shape of one dimensional array ?
                 */
                    function ( userColumnSet, ensure_1D_array )
                    {
                        // define output object, i.e. array of only valid column names extracted from user column set
                        var ovc = [];

                        // in sorting context we require single array, hence make it such one
                        if ( ensure_1D_array )
                            userColumnSet = ensureOneDimensionalArray_I_1L( userColumnSet, [] );

                        // loop over current user column set
                        for ( var i = 0; i < userColumnSet.length; i++ )
                        {
                            // access current column metadata
                            var ccm = userColumnSet[ i ];

                            // only extract real - i.e. physical - column names by examining the last value (true/false)
                            if ( ccm[ ccm.length - 1 ] )
                                // store real column name, aka object property name
                                ovc.push( ccm[ 0 ] );
                        }

                        // return output object in the context of sorting
                        if ( ensure_1D_array )
                            return [ ovc, userColumnSet ];
                        // return output object
                        return ovc;



                        /**
                         * Local helper functions
                        */
                        function ensureOneDimensionalArray_I_1L ( input_arr, output_arr )
                        {
                            var item;
                            // iterate over input array
                            for ( var i = 0; i < input_arr.length; i++ )
                            {
                                // access current item
                                item = input_arr[ i ];

                                // if item type is an array
                                if ( _COMMON.convertTypeToString( item ) === _ENUM.T2SR.ARRAY )
                                {
                                    ensureOneDimensionalArray_I_1L( item, output_arr );
                                }
                                // otherwise add this whole input array
                                else
                                {
                                    output_arr.push( input_arr );
                                    break;
                                }
                            }

                            // return 1D array
                            return output_arr;
                        }
                    },

                updateOVC_and_CheckIfUnique: /**
                 * @param {any} ovc
                 */
                    function ( ovc )
                    {
                        // let's assume that phrase is unique
                        var unique = true;

                        /**
                         * Along the way try to prove that this current sort set input is not unique one 
                        */

                        // add current sorting columns to already-used sorting columns
                        Array.prototype.push.apply( _ACTION.hpid.sorting.sort_columns, ovc );


                        // cache current data to be sorted
                        var hpid_cache = _ACTION.hpid.data;


                        var phrase_source_arr;
                        // only updated sort set input with current ovc if there are any data to sort
                        if ( hpid_cache.length )
                            // reference updated sort set input, that allows for building the right phrase
                            phrase_source_arr = _ACTION.hpid.sorting.sort_columns;


                        // get grouping-by util object
                        var gbo = _COMMON.usingGroupingBy();

                        // declare object holding all grouped phrases
                        var phrase_groupper = {};
                        // declare current object of the collection 
                        var c_o;

                        // check the sorting phrase uniqueness based on PLAIN
                        if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PLAIN )
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
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                            // @ts-ignore
                            ;
                        // check the sorting phrase uniqueness based on KVP
                        else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
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

                // create first-level sorting context object
                createFirstLevelCtx: function ()
                {
                    // create first-level sorting context object
                    var fl_ctx = {
                        // did 1st level sorting take place, i.e. can you use 2nd level sorting
                        _present: false,

                        check:/**
                         * Determine whether 1st level sorting took place
                        */
                            function ()
                            {
                                /**
                                 * Here you can access 'this' object which points to action constraint object and all-required contextual metadata available during the flow !
                                 * 
                                 * Contextual 'this' object is available during action constraint checking only
                                */

                                if ( !this._present )
                                    throw new Error( '\r\nYou can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !\r\nAdditionally 2nd level sorting must the very next operation taking place just after 1st level sorting was applied.\r\n\r\n' );
                            },

                        set:/**
                         * @param {boolean} flag
                         * @param {any} caco
                         */
                            function ( flag, caco )
                            {
                                this._present = flag;

                                /**
                                 * Here you can access 'caco' object which points to current action constraint object and all-required contextual metadata available during the flow !
                                 * 
                                 * Contextual 'this' object is available during action constraint execution only !
                                */
                                if ( caco.isWritable )
                                    // when executing writable action constraint, mark that this action constraint is applied by disabling it
                                    caco.isEnabled = false;
                            }
                    };

                    // return first-level sorting context object
                    return fl_ctx;
                },

                // create sorting metadata context object
                createSortingMetadataCtx: function ()
                {
                    // create sorting metadata context object
                    var sm_ctx = {
                        // sorting metadata for type KVP
                        _metadataKVP: undefined,

                        getMetadata:/**
                             * Get sorting metadata object for the current executing action
                             * and all available contextual data from the query flow.
                             * Applies for type KVP only !
                            */
                            function ()
                            {
                                /**
                                 * Here you can access 'this' object which points to action constraint object and all-required contextual metadata available during the flow !
                                 * 
                                 * Contextual 'this' object is available during action constraint checking only
                                */

                                return this._metadataKVP;
                            },

                        setMetadata:/**
                             * @param {any} metadata
                             * @param {any} caco
                             */
                            function ( metadata, caco )
                            {
                                this._metadataKVP = metadata;

                                /**
                                 * Here you can access 'caco' object which points to current action constraint object and all-required contextual metadata available during the flow !
                                 * 
                                 * Contextual 'this' object is available during action constraint execution only !
                                */
                                if ( caco.isWritable )
                                    // when executing writable action constraint, mark that this action constraint is applied by disabling it
                                    caco.isEnabled = false;
                            }
                    };

                    // return sorting metadata context object
                    return sm_ctx;
                },

                // create second-level sorting context object that drives the usage of second-level sorting
                createSecondLevelCtx: function ()
                {
                    // create second-level sorting context object
                    var sl_ctx = {
                        // is second-level sorting forced
                        _force: false,
                        // columns used to perform second-level sorting only
                        ovc: [],

                        check: /**
                         * Force second-level sorting to take place
                        */
                            function ()
                            {
                                return this._force;
                            },

                        force: /**
                         * Force second-level sorting to take place
                         *
                         * @param {boolean} flag
                         * @param {any} caco
                        */
                            function ( flag, caco )
                            {
                                this._force = flag;
                            }
                    };

                    // return second-level sorting context object
                    return sl_ctx;
                },

                // reset all so-far used sorting
                /**
                * @param {any} sharedSecondLevelSortingContext Shared sorting context of the 2nd level
                */
                clear: function ( sharedSecondLevelSortingContext )
                {
                    // reset column set object (current data flow cached metadata)
                    _ACTION.hpid.columnSet.currentQueryIcest = undefined;
                    _ACTION.hpid.columnSet.all_columns.length = 0;

                    // reset sorting object
                    _ACTION.hpid.sorting.sort_order = undefined;
                    _ACTION.hpid.sorting.sort_columns.length = 0;
                    _ACTION.hpid.sorting.stop = false;

                    // reset shared second-level sorting context object 
                    sharedSecondLevelSortingContext.force( false );
                    sharedSecondLevelSortingContext.ovc.length = 0;
                }
            },

            /**
             * Handle special case that returns the so-far filtered off array.
             * The following parameter called 'done' when set to 'true' tells to discard returned result and go for the so-far filtered off array as the final result 
            */
            done: false,

            // reset hpid internal state
            reset: function ()
            {
                // turn hpid off
                _ACTION.hpid.isSwitchedOn = false;

                // reset holder of physical intermediate data
                Array.isArray( _ACTION.hpid.data ) ? _ACTION.hpid.data.length = 0 : _ACTION.hpid.data = [];

                // mark that hpid was processed
                _ACTION.hpid.done = false;
            }
        },

        hpidCommons: {
            updateColumnSetCestAndCols: /**
            * Updates collection metadata required by the current query flow.
            * It detects current collection element structure type (cest) and updates column set of the contextually current collection.
            */
                function ( length_gte_2, firstItem, ofss )
                {
                    /**
                     * To enable syntax check, fetch object structure (all keys at all levels).
                     * Fetch them provided that collection is not empty !
                    */

                    // detect collection element structure type to provide type of source of syntax checking
                    _ACTION.hpid.columnSet.currentQueryIcest = _ACTION.hpidCommons.detectCest( firstItem, !firstItem ? false : true, length_gte_2 );

                    // if cest is UNKNOWN, skip further operations
                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.UNKNOWN ) return;

                    // check if object full structure string (ofss) is provided to deliver metadata for syntax checking
                    if ( ofss && _COMMON.convertTypeToString( ofss ) === _ENUM.T2SR.STRING )
                        // update column set with ofss
                        _ACTION.hpidCommons.updateColumnSetColsOnlyWithInternalOfss( ofss );
                    else
                        // otherwise initialize column metadata set based on current collection
                        _ACTION.hpid.columnSet.init( firstItem );
                },


            updateColumnSetColsOnlyWithInternalOfss: /**
            * Updates collection metadata required by the current query flow by updating column set of the contextually current collection.
            */
                function ( ofss )
                {
                    // separator of props
                    let sep = ',';

                    // cater for undefined case
                    if ( !ofss )
                        ofss = '';

                    // add coma if missing
                    if ( !ofss.includes( sep ) )
                        ofss = ofss + ',';

                    // collection input column set
                    var propNames = ofss.split( sep );

                    // remove empty spaces
                    _COMMON.trimSpaces( propNames );

                    /**
                     * Handle appropriate cest
                    */

                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PLAIN )
                        // prepend object!
                        propNames.unshift( 'object!' );
                    else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                        // prepend key
                        propNames = [ 'key' ];
                    else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
                    {
                        // prepend value.
                        propNames.unshift( 'value.' );

                        // prepend key
                        propNames.unshift( 'key' );
                    }
                    else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PRIMITIVE )
                        propNames = [];
                    else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.UNKNOWN )
                        propNames = [];

                    // store it for sorting purposes - all columns available for usage in sorting operations
                    _ACTION.hpid.columnSet.all_columns = propNames;
                },

            detectCest: /**
             * Detect collection element structure type (cest).
             *
             * @param {any} collectionItem
             * @param {any} doCurrentSort
             * @param {any} doNextSort
             */
                function ( collectionItem, doCurrentSort, doNextSort )
                {
                    return d_CEST_I_1L( collectionItem, doCurrentSort, doNextSort );



                    /**
                     * Local helper functions
                    */
                    function d_CEST_I_1L ( collectionItem, doCurrentSort, doNextSort )
                    {
                        // if collection does not require sorting
                        if ( !doCurrentSort && !doNextSort )
                            return _ENUM.CEST.UNKNOWN;
                        // if it's primitive type
                        else if ( _COMMON.isPrimitiveType( collectionItem ) )
                            return _ENUM.CEST.PRIMITIVE;
                        // otherwise let's deal with objects
                        else
                        {
                            // get all prop names
                            var propNames = Object.getOwnPropertyNames( collectionItem );

                            // if it's KVP or GROUPING
                            if ( propNames.length === 2 && propNames.indexOf( 'key' ) > -1 && ( propNames.indexOf( 'value' ) > -1 || propNames.indexOf( 'resultsView' ) > -1 ) )
                            {
                                // if it's KVP (object || primitive type)
                                if ( propNames.indexOf( 'value' ) > -1 && ( typeof collectionItem[ 'value' ] === 'object' || _COMMON.isPrimitiveType( collectionItem[ 'value' ] ) ) )
                                    return _ENUM.CEST.KVP;
                                // if it's GROUPING
                                else if ( propNames.indexOf( 'resultsView' ) > -1 && Array.isArray( collectionItem[ 'resultsView' ] ) )
                                    // check for GROUPING
                                    return _ENUM.CEST.GROUPING;
                            }
                            // otherwise it must be PLAIN
                            else
                                return _ENUM.CEST.PLAIN;
                        }
                    }
                },

            simulateNextQueryIcest:/**
            * Detect type of collection element structure (cest) of the very next query in the flow.
            *
            * @param {any} runtimeContext Action context, aka runtime context of JLC current instance
            */
                function ( runtimeContext )
                {
                    return s_NQI_I_1L( runtimeContext );



                    /**
                     * Local helper functions
                    */
                    function s_NQI_I_1L ( runtime_ctx )
                    {
                        // the very next query's icest (input collection element structure type)
                        var nqIcest;

                        // all query names from bottom top
                        var query_name_arr = [];

                        // get all query names from bottom top
                        getQueryChainNames_I_2L( runtime_ctx.parentActionObject, query_name_arr );

                        var query_name;
                        // loop all query names from bottom top and detect valid icest
                        for ( var i = 0; i < query_name_arr.length; i++ )
                        {
                            // access current query name
                            query_name = query_name_arr[ i ];

                            // dictionary
                            if ( query_name === System.Linq.Context.toDictionary )
                                nqIcest = _ENUM.CEST.KVP;
                            // grouping object
                            else if ( query_name === System.Linq.Context.groupBy )
                                nqIcest = _ENUM.CEST.GROUPING;
                            // plain if allowed
                            else if ( System.Linq.Context[ query_name ] )
                            {
                                // because cannot downgrade to plain if already grouping object or dictionary, continue with plain
                                if ( ![ _ENUM.CEST.GROUPING, _ENUM.CEST.KVP ].includes( _ACTION.hpid.columnSet.currentQueryIcest ) )
                                    nqIcest = _ENUM.CEST.PLAIN;
                                // otherwise continue with grouping object or dictionary
                                else
                                    nqIcest = _ACTION.hpid.columnSet.currentQueryIcest;
                            }
                            // unknown
                            else
                                nqIcest = _ENUM.CEST.UNKNOWN;


                            // store the very next query's icest if allowed
                            storeIcestIfAllowed_I_2L();
                        }



                        /**
                         * Local helper functions
                        */
                        function getQueryChainNames_I_2L ( actionObject, qnp_arr )
                        {
                            // go to bottom of the action object chain
                            if ( actionObject.parentActionObject )
                                getQueryChainNames_I_2L( actionObject.parentActionObject, qnp_arr );

                            // add action object name (query name)
                            qnp_arr.push( actionObject.name );
                        }

                        function storeIcestIfAllowed_I_2L ()
                        {
                            // cannot downgrade to plain if already grouping object or dictionary
                            if (
                                [ _ENUM.CEST.GROUPING, _ENUM.CEST.KVP ].includes( runtime_ctx.currentQueryIceMetaObject.realFlowComputedIcestForNextQuery ) &&
                                ![ _ENUM.CEST.GROUPING, _ENUM.CEST.KVP ].includes( nqIcest )
                            )
                                // hence update current query's icest to grouping object or dictionary
                                _ACTION.hpid.columnSet.currentQueryIcest = runtime_ctx.currentQueryIceMetaObject.realFlowComputedIcestForNextQuery;
                            // switch between grouping object and dictionary
                            else if (
                                [ _ENUM.CEST.GROUPING, _ENUM.CEST.KVP ].includes( runtime_ctx.currentQueryIceMetaObject.realFlowComputedIcestForNextQuery ) &&
                                [ _ENUM.CEST.GROUPING, _ENUM.CEST.KVP ].includes( nqIcest )
                            )
                                updateNextQuerySetPreviousQueryIcest_I_3L();
                            // otherwise continue with plain or switch to grouping object or dictionary
                            else
                                updateNextQuerySetPreviousQueryIcest_I_3L();

                            // update hpid column set (hcs)
                            updateHCS_I_3L();



                            /**
                             * Local helper functions
                            */
                            function updateNextQuerySetPreviousQueryIcest_I_3L ()
                            {
                                // copy current query ice metadata object 100% "by value"
                                runtime_ctx.currentQueryIceMetaObject = _COMMON.deepCopyYCR( runtime_ctx.currentQueryIceMetaObject );

                                // update next query's icest for current query to properly carry out syntax checking
                                runtime_ctx.currentQueryIceMetaObject.realFlowComputedIcestForNextQuery = nqIcest;
                            }

                            function updateHCS_I_3L ()
                            {
                                // update current hpid column set for grouping object
                                if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                                    updateHCSForGrouping_I_4L();
                                // update current hpid column set for dictionary
                                else if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
                                    updateHCSForKvp_I_4L();



                                /**
                                 * Local helper functions
                                */
                                function updateHCSForGrouping_I_4L ()
                                {
                                    // update current hpid column set
                                    _ACTION.hpidCommons.updateColumnSetColsOnlyWithInternalOfss();
                                }

                                function updateHCSForKvp_I_4L ()
                                {
                                    // get all props to learn the type of the object that is the raw input collection
                                    var typeProps = Object.getOwnPropertyNames( runtime_ctx.currentQueryIceMetaObject.item );

                                    // all contextually valid property names
                                    var propNames;

                                    // if dictionary
                                    if ( typeProps.length === 2 && ( typeProps[ 0 ] === 'key' && typeProps[ 1 ] === 'value' || typeProps[ 0 ] === 'value' && typeProps[ 1 ] === 'key' ) )
                                        // get value all object property names at all levels
                                        propNames = _COMMON.fetchObjectStructureKeys( runtime_ctx.currentQueryIceMetaObject.item.value );
                                    // if grouping object
                                    else if ( typeProps.length === 2 && ( typeProps[ 0 ] === 'key' && typeProps[ 1 ] === 'resultsView' || typeProps[ 0 ] === 'resultsView' && typeProps[ 1 ] === 'key' ) )
                                        // only property called 'key' is valid
                                        propNames = [ 'key' ];
                                    // otherwise plain object
                                    else
                                        // get all object property names at all levels
                                        propNames = _COMMON.fetchObjectStructureKeys( runtime_ctx.currentQueryIceMetaObject.item );

                                    // update current hpid column set
                                    _ACTION.hpidCommons.updateColumnSetColsOnlyWithInternalOfss( propNames.join( ',' ) );
                                }
                            }
                        }
                    }
                },

            clearCache: /**
            * Clear the internal JLC cache.
            * 
            * @param {{any: any}} sharedSecondLevelSortingContext
            */
                function ( sharedSecondLevelSortingContext )
                {
                    return clear_C_I_1L( sharedSecondLevelSortingContext );



                    /**
                     * Local helper functions
                    */
                    function clear_C_I_1L ( sharedSecondLevelSortingContext )
                    {
                        // reset hpid temp storage
                        _ACTION.hpid.reset();

                        /**
                         * Reset all so-far used sorting:
                         *   - handle undefined shared second-level sorting context object by creating default shared second-level sorting context object if necessary
                        */
                        _ACTION.hpid.sorting.clear( sharedSecondLevelSortingContext || _ACTION.hpid.sorting.createSecondLevelCtx() );
                    }
                }
        },

        funcCommons: {
            create: /**
            * Create action that represents filtering logic for given JLC method.
            */
                function ( jlc_instance_ctx, jlc_instance_qmi, jlc_query_cache_config, core_method_bound, jlc_query_name, jlc_query_filters, jlc_query_constraint_def, to_execute )
                {
                    // create an action
                    var action = createAction_I_1L( jlc_query_name, jlc_instance_ctx, core_method_bound );

                    // create an action context 
                    var action_context = createActionContext_I_1L( jlc_query_name, jlc_instance_ctx, jlc_query_filters, action, jlc_query_cache_config );

                    // create an action constraint
                    var action_constraint = createActionConstraint_I_1L( jlc_instance_ctx, jlc_query_constraint_def, action_context );

                    /**
                     * Before proceeding with action chain execution or action chaining, run constraint checking for action chain up the road !
                     * Run constraint checking from this action up the root action itself !
                     * 
                     * Constraint concept is designed to be independent of the above tandem, i.e. action & action-context and their relationship !
                    */
                    runActionConstraintRecursively_I_1L( action_context, action_constraint );


                    // invoke real data filtering and produce output (when the last method in the chain is a final result method)
                    if ( to_execute )
                        // execute all actions
                        return this.executeChain( action_context );
                    // otherwise enable further flow of actions (when the last method in the chain is NOT a final result method)
                    else
                        // return JLC instance api and pass context of current action to provide chain of actions to execute
                        return _LINQ_CONTEXT._proxyTrapsCommon.queryCreateContinuumFlowContext(
                            _ENUM.FLOW_CONTEXT.ACTION_SOURCE_CONTEXT,
                                                                                               /* in this context we have no access to physical collection, so pass null */ null,
                            action_context,
                            jlc_instance_qmi,
                            !to_execute
                        );



                    /**
                     * Local helper functions 
                    */
                    function createAction_I_1L ( jqn, runtime_ctx, c_m_b )
                    {
                        // create action object
                        var ao = Object.create( null );


                        // store action name, aka current query name
                        ao.name = jqn;

                        // store information whether this action is executable one
                        ao.returnsData = System.Linq.QueryResult[ jqn ];

                        // get second-level sorting context shared across query flow
                        ao.sharedSecondLevelSortingContext = runtime_ctx.sharedSecondLevelSortingContext
                            ?
                            runtime_ctx.sharedSecondLevelSortingContext
                            :
                            _ACTION.hpid.sorting.createSecondLevelCtx();

                        // store this action sorting metadata (if action requires so)
                        ao.sortingMetadataContext = [
                            System.Linq.Context.orderBy,
                            System.Linq.Context.orderByDescending,
                            System.Linq.Context.thenBy,
                            System.Linq.Context.thenByDescending,
                            System.Linq.Context.min,
                            System.Linq.Context.max,
                            System.Linq.Context.average
                        ].includes( jqn ) ?
                            _ACTION.hpid.sorting.createSortingMetadataCtx() : undefined;

                        // store parent of this action (join parent of this action with this action to create action chain)
                        ao.parentActionObject = runtime_ctx.parentActionObject;


                        // execute this action by invoking its core method with binded parameters
                        ao.execute = function ( queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, itemStructureChangeObject )
                        {
                            // add dynamic property to tell whether current query expressed via action object has to update its ice metadata object
                            this.itemStructureChangeObject = itemStructureChangeObject;

                            // invoke bound core method
                            return c_m_b.bind( null, this, this.name, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )();
                        };


                        // return action object
                        return ao;
                    }

                    function createActionContext_I_1L ( jqn, runtime_ctx, jqf_arr, action, j_q_c_c )
                    {
                        // create action context object
                        var aco = Object.create( null );


                        // collection reference id
                        aco.collectionIndex = runtime_ctx.collectionIndex;
                        // collection token
                        aco.collectionToken = runtime_ctx.collectionToken;

                        // collection ice (input collection element) meta object
                        aco.currentQueryIceMetaObject = runtime_ctx.currentQueryIceMetaObject;


                        // copy action chain cache object internal 100% "by value"
                        aco.currentQueryChainCacheInternalObject = _COMMON.deepCopyYCR( runtime_ctx.currentQueryChainCacheInternalObject );
                        // create cache object internal for current query chain
                        aco.currentQueryChainCacheInternalObject.push( createQueryCacheObjectForCurrentQueryChain_I_1L( jqn, jqf_arr ) );

                        // copy action chain cache object user-defined 100% "by value"
                        aco.currentQueryChainCacheUserDefinedObject = _COMMON.deepCopyYCR( runtime_ctx.currentQueryChainCacheUserDefinedObject );
                        // create cache object user-defined for current query chain
                        aco.currentQueryChainCacheUserDefinedObject.push( j_q_c_c );


                        // collection mmavt (order-min-max-average meta object of the type of the value)
                        aco.minMaxAverageValueTypeObject = runtime_ctx.minMaxAverageValueTypeObject;

                        // get first-level sorting context shared across query flow
                        aco.sharedFirstLevelSortingContext = runtime_ctx.sharedFirstLevelSortingContext
                            ?
                            _COMMON.deepCopyYCR( runtime_ctx.sharedFirstLevelSortingContext )
                            :
                            _ACTION.hpid.sorting.createFirstLevelCtx();

                        // join this action with the previous (parent) action up the action chain
                        aco.parentActionObject = action;


                        // return action context object
                        return aco;
                    }

                    function createActionConstraint_I_1L ( runtime_ctx, constr_def, action_ctx )
                    {
                        // create action constraint object
                        var a_constr = Object.create( null );


                        // determine nullability of a constraint
                        a_constr.isNotNull = constr_def !== undefined;

                        // when constriant is defined
                        if ( a_constr.isNotNull )
                        {
                            // assign name to this constraint
                            a_constr.name = constr_def.name;

                            // determine whether this constraint should be enabled
                            a_constr.isEnabled = constr_def.all_required.indexOf( jlc_query_name ) > -1;

                            // store all invocation contexts for later checking of necessity of invoking some constraints
                            a_constr.all_required = constr_def.all_required;


                            // store whether this-query-flow collection input type is a primitive
                            a_constr.isPrimitive = runtime_ctx.currentQueryIceMetaObject.is_prim;

                            // store user-provided query filtering predicates
                            a_constr.predicate_array = constr_def.predicate_array;


                            // store query flow shared constraints (qfsc)
                            if ( action_ctx.parentActionConstraintObject )
                            {
                                // get so-far created query flow shared constraints from parent
                                a_constr.qfsc = action_ctx.parentActionConstraintObject.qfsc;

                                // fetch query flow shared constraints for this action
                                var ta_qfsc = _CONSTRAINT.createQueryFlowConstraints( constr_def.name );

                                // merge qfsc with ta_qfsc
                                Object.assign( a_constr.qfsc, ta_qfsc[ constr_def.name ] );
                            }
                            // create query flow shared constraints (qfsc) during the very first access
                            else
                            {
                                // fetch default action constraints for this action
                                a_constr.qfsc = _CONSTRAINT.createQueryFlowConstraints( constr_def.name );

                                // update action context of this action's default action constraints object
                                a_constr.qfsc[ constr_def.name ].actionContext = action_ctx;

                            }

                            // determine whether stop further drilling down of the parent chain
                            a_constr.stopDrillingDown = a_constr.qfsc[ constr_def.name ].isEnabled;


                            // store shared first-level sorting context
                            a_constr.actionContext = action_ctx;

                            // store this-action-constraint bound action
                            a_constr.currentQueryActionObject = action_ctx.parentActionObject;

                            // store parent of this action constraint
                            a_constr.parentActionConstraintObject = runtime_ctx.parentActionConstraintObject;


                            // define action constraint apply method
                            a_constr.apply = function ()
                            {
                                /**
                                    * Fetch on demand action constraint
                                    * 
                                    * Future action constraint possible improvements
                                    *  - you apply some logic to action constraint internal state, f.e. setting its 'isEnabled' flag to true/false given some conditions
                                    *  - you have access to this-action-constraint, hence you can do various stuff starting from here
                                    *  
                                    *  - etc.
                                */
                                // reference constraint from query flow shared constraints (qfsc)
                                var actionConstr = this.qfsc[ this.name ];

                                // update action constraint with shared action context object (aco)
                                actionConstr.actionContext = this.actionContext;

                                // get all constraint functions, aka constraint actions
                                var c_funcs = actionConstr.acf;

                                // loop over all - 1 regular constraint functions
                                for ( var i = 0; i < c_funcs.length - 1; i++ )
                                    /**
                                        * Execute each constraint function
                                        *  - bind context of 'this' being action constraint itself to action constraint source function
                                        *  - pass as an argument the valid data bound to this action constraint source function
                                        *        -> actionConstr.acf[data_1_check_func, data_2_check_func, data_3_check_func]
                                        *        -> actionConstr.data[data_1,           data_2,            data_3]
                                    */
                                    c_funcs[ i ].bind( actionConstr )( actionConstr.data[ i ] );

                                // if this action constraint contains syntax check constraint
                                if ( actionConstr.requireSyntaxCheck )
                                    // apply syntax check constraint
                                    c_funcs[ c_funcs.length - 1 ].bind( actionConstr )( this.predicate_array, this.isPrimitive, actionConstr.isSortContext, actionConstr, this.currentQueryActionObject, this.name );
                                else
                                    // apply regular constraint function
                                    c_funcs[ c_funcs.length - 1 ].bind( actionConstr )( actionConstr.data[ c_funcs.length - 1 ] );
                            };
                        }


                        // return action constraint object
                        return a_constr;
                    }

                    function createQueryCacheObjectForCurrentQueryChain_I_1L ( jqn, jqf_arr )
                    {
                        // create query meta object
                        var currentQuery = Object.create( null );
                        // store current query name
                        currentQuery.name = jqn;
                        // store current query filters
                        currentQuery.filters = jqf_arr;
                        // store whether current query can use the cache
                        currentQuery.useCache = _CACHE._useCache;

                        // return query meta object
                        return currentQuery;
                    }

                    function runActionConstraintRecursively_I_1L ( actionCtx, actionConstr )
                    {
                        return prepare_ACRR_I_2L( actionCtx, actionConstr );



                        /**
                         * Local helper functions
                        */
                        function prepare_ACRR_I_2L ( action_ctx, action_constr )
                        {
                            /**
                             * Join the previous (parent - one level up the action constraint chain) action constraint with this action constraint.
                             * Set parent constraint of this current constraint ! 
                            */
                            action_ctx.parentActionConstraintObject = action_constr;

                            // execute constraint chain check
                            run_ACR_I_2L( action_ctx.parentActionConstraintObject );



                            /**
                             * Local helper functions
                            */
                            function run_ACR_I_2L ( actionConstr )
                            {
                                // navigate "down the road" to the first constraint
                                if ( actionConstr.parentActionConstraintObject && !actionConstr.parentActionConstraintObject.stopDrillingDown )
                                    run_ACR_I_2L( actionConstr.parentActionConstraintObject );

                                // from here run all constraints in the chain up to and/or including current action constraint
                                if ( actionConstr.isNotNull && actionConstr.isEnabled )
                                    actionConstr.apply();
                            }
                        }
                    }
                },

            executeChain: /**
            * Execute all actions in the chain.
            */
                function ( actionContext )
                {
                    return execute_C_I_1L( actionContext );



                    /**
                     * Local helper functions
                    */
                    function execute_C_I_1L ( action_ctx )
                    {
                        // do necessary cleanup before producing pre-output result
                        _ACTION.hpidCommons.clearCache( action_ctx.parentActionObject.sharedSecondLevelSortingContext );

                        // execute all actions and produce pre-output result
                        var result = executeActionsRecursively_I_2L( action_ctx.parentActionObject, action_ctx.currentQueryChainCacheInternalObject, action_ctx.currentQueryChainCacheUserDefinedObject );

                        // return final data based on pre-output result
                        return getOutput_I_2L( result );



                        /**
                         * Local helper functions
                        */
                        function executeActionsRecursively_I_2L ( parentAction, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
                        {
                            // go all the way down to the root action
                            if ( parentAction.parentActionObject )
                                executeActionsRecursively_I_2L( parentAction.parentActionObject, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined );


                            // restore the initial icest of the current query flow
                            _ACTION.hpid.columnSet.currentQueryIcest = action_ctx.currentQueryIceMetaObject.realFlowInitialIcest;


                            // invoke this root action and go recursively all the way up to action that ends the action chain; returns data if it has to so
                            if ( parentAction.returnsData )
                                return parentAction.execute( queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, action_ctx.currentQueryIceMetaObject.itemStructureChangeObject );
                            else
                                parentAction.execute( queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, action_ctx.currentQueryIceMetaObject.itemStructureChangeObject );
                        }

                        function getOutput_I_2L ( result )
                        {
                            // declare output data (a result of input collection being filtered off through all filters)
                            var output;


                            // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true
                            if ( _ACTION.hpid.done )
                                output = _ACTION.hpid.data;
                            else
                                // otherwise return result as the output
                                output = result;


                            // return output data
                            return output;
                        }
                    }
                }
        }
    };



    // private common object
    var _COMMON = {
        isNumeric: /**
         * Detect if a variable (including a string) is a number.
         *
         * Source: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
         *
         * @param {any} o
         */
            function ( o )
            {
                return is_N_I_1L( o );



                /**
                 * Local helper functions
                */
                function is_N_I_1L ( o )
                {
                    return !isNaN( o ) && _COMMON.convertTypeToString(o) !== _ENUM.T2SR.BOOLEAN;
                }
            },

        toNumeric: /**
         * Convert a variable (including a string) to a number with or without decimal point.
         *
         * Source: https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
         *
         * @param {any} o
         */
            function ( o, withDecimals )
            {
                return to_N_I_1L( o, withDecimals );



                /**
                 * Local helper functions
                */
                function to_N_I_1L ( o, isFloatingPoint )
                {
                    // is floating point
                    var isfp = false;

                    // check if user wants to check for floating point number
                    if ( isFloatingPoint )
                        isfp = o % 1 !== 0;


                    // return "float"
                    if ( isfp )
                        return parseFloat( o );

                    // return "integer"
                    return parseInt( o );
                }
            },

        isPrimitiveType: /**
         * Detect type of passed item.
         *
         * @param {any} o
         */
            function ( o )
            {
                return is_PT_I_1L( o );



                /**
                 * Local helper functions
                */
                function is_PT_I_1L ( o )
                {
                    return [ _ENUM.T2SR.STRING, _ENUM.T2SR.NUMBER, _ENUM.T2SR.BOOLEAN ].includes( _COMMON.convertTypeToString( o ) );
                }
            },

        isPrimitiveType_T2SR: /**
         * Detect type of passed item.
         *
         * @param {any} o
         */
            function ( o )
            {
                return is_PTT2SR_I_1L( o );



                /**
                 * Local helper functions
                */
                function is_PTT2SR_I_1L ( o )
                {
                    return [ _ENUM.T2SR.STRING, _ENUM.T2SR.NUMBER, _ENUM.T2SR.BOOLEAN ].includes( o );
                }
            },

        convertTypeToString: /**
         * Get string representation of the type of given object.
         *
         * @param {any} o Object to get the string representation from.
         */
            function ( o )
            {
                return convert_T2S_I_1L( o );



                /**
                 * Local helper functions
                */
                function convert_T2S_I_1L ( o )
                {
                    return Object.prototype.toString.call( o );
                }
            },

        decorateDataType : /**
         * Enhance given data type with additional "native" functionalities for of this type
         *
         * @param {any} inputCollection Input collection to enhance with additional "native" functionalities.
         * @param {any} queryName Name of the query that produces certain data type.
         */
            function ( inputCollection, queryName )
            {
                return decorate_DT_I_1L( inputCollection, queryName );



                /**
                 * Local helper functions
                */
                function decorate_DT_I_1L ( ic, qn )
                {
                    // enhance dictionary
                    if(qn === System.Linq.Context.toDictionary) {
                        /**
                         * Add some methods
                         *  1. containsKey
                         *  2. containsValue
                        */

                        // 1.
                        ic[_ENUM.DATA_TYPES_PROPS_and_METHODS.KVP.METHODS.CONTAINS_KEY] = function(key) {
                            // determine primitivity of the key
                            var isPrimitive = _COMMON.isPrimitiveType(key);

                            // is primitive
                            if(isPrimitive) {
                                for(var i = 0 ; i < this.length; i++) {
                                    if(this[i].key === key)
                                        return true;
                                }
                            }
                            // is an object
                            else {
                                for(var i = 0 ; i < this.length; i++) {
                                    if(_COMMON.useDefaultObjectContentComparer(this[i].key, key))
                                        return true;
                                }
                            }

                            // as a last resort return no match
                            return false;
                        }

                        // 2.
                        ic[_ENUM.DATA_TYPES_PROPS_and_METHODS.KVP.METHODS.CONTAINS_VALUE] = function(value) {
                            // determine primitivity of the value
                            var isPrimitive = _COMMON.isPrimitiveType(value);

                            // is primitive
                            if(isPrimitive) {
                                for(var i = 0 ; i < this.length; i++) {
                                    if(this[i].value === value)
                                        return true;
                                }
                            }
                            // is an object
                            else {
                                for(var i = 0 ; i < this.length; i++) {
                                    if(_COMMON.useDefaultObjectContentComparer(this[i].value, value))
                                        return true;
                                }
                            }

                            // as a last resort return no match
                            return false;
                        }

                        /**
                         * Add some properties
                         *  1. keys
                         *  2. values
                        */
                        
                        // 1.
                        Object.defineProperty(
                            ic,
                            _ENUM.DATA_TYPES_PROPS_and_METHODS.KVP.PROPS.KEYS,
                            {
                                // only override getter
                                get: function ()
                                {
                                    // define array of keys
                                    var keys = [];

                                    // extract all keys
                                    for(let kvp of this)
                                        keys.push(kvp.key);

                                    // return all keys
                                    return keys;
                                }
                            }
                        );

                        // 2.
                        Object.defineProperty(
                            ic,
                            _ENUM.DATA_TYPES_PROPS_and_METHODS.KVP.PROPS.VALUES,
                            {
                                // only override getter
                                get: function ()
                                {
                                    // define array of values
                                    var values = [];

                                    // extract all values
                                    for(let kvp of this)
                                        values.push(kvp.value);

                                    // return all values
                                    return values;
                                }
                            }
                        );
                    }
                }
            },

        isObjectEmpty: /**
         * Test for an empty JavaScript object.
         *
         * Source: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
         * 
         * @param {any} o Object to test for emptiness.
         */
            function ( obj )
            {
                return is_OE_I_1L( obj );



                /**
                 * Local helper functions
                */
                function is_OE_I_1L ( o )
                {
                    /**
                     * Handles these cases:
                     *  a. var o = {};
                     *  b. var o = Object.create(Object.prototype);
                     *  c. var o = Object.create(null);
                     */
                    return Object.keys( o ).length === 0 && ( o.constructor && o.constructor === Object ||/** this handles case c. */ true );
                }
            },

        validateParamsObjectOfQueryInterface: /**
         * Parse query interface's params object while creating the query method.
         *
         * @param {any} params Main object used to create query method definition.
         * @param {any} queryName Name of the query method to create.
         * @param {any} paramsObjRequiredParamName Name of the object required by the "params" object or boolean false value if this param is not required.
         */
            function ( params, queryName, paramsObjRequiredParamName )
            {
                return validate_POoQI_I_1L( params, queryName, paramsObjRequiredParamName );



                /**
                 * Local helper functions
                */
                function validate_POoQI_I_1L ( params, queryName, paramsObjRequiredParamName )
                {
                    // name of the params object itself
                    var paramsObjName = '\'params\'', error_prefix = '\r\nQuery method called ' + queryName;

                    // string representation of the required param of the params object
                    var t2sr = _COMMON.convertTypeToString( paramsObjRequiredParamName );


                    // handle missing params object
                    if ( t2sr === _ENUM.T2SR.STRING && params === undefined ) throw new ReferenceError( error_prefix + ' has to have ' + paramsObjName + ' object provided !\r\n\r\n' );

                    // check if this param is required (non-empty string)
                    else if ( t2sr === _ENUM.T2SR.STRING && params !== undefined )
                    {
                        // is required param of the params object defined
                        var isNotUndefined = false;

                        // convert to array
                        var req_params = paramsObjRequiredParamName.split( ',' );

                        // check all "required" params
                        for ( var i = 0; i < req_params.length; i++ )
                        {
                            // is defined
                            isNotUndefined = params[ req_params[ i ] ] !== undefined;

                            // if so, then break the loop
                            if ( isNotUndefined ) break;
                        }

                        // if required param or params of the params object is or are undefined
                        if ( !isNotUndefined )
                            // throw error
                            throw new TypeError( error_prefix + ' with ' + paramsObjName + ' object provided is missing ' + ( req_params.length > 1 ? 'any of the following filters -> ' : '' ) + '\'' + paramsObjRequiredParamName + '\' !\r\n\r\n' );

                    }
                    // don't check the params object
                    else if ( t2sr === _ENUM.T2SR.BOOLEAN && paramsObjRequiredParamName === false )
                        ;
                    // ensure that query method interface is empty
                    else if ( t2sr === _ENUM.T2SR.BOOLEAN && paramsObjRequiredParamName === true && params !== undefined ) throw new TypeError( '\r\nQuery method called ' + queryName + ' has to be parameterless !\r\n\r\n' );

                    // return params object that is not undefined
                    return params ? params : Object.create( null );
                }
            },

        getDefaultValueOf: /**
         * Determine default value of inputItem.
         *
         * @param {any} inputItem
         */
            function ( inputItem )
            {
                return get_DV_I_1L( inputItem );



                /**
                 * Local helper functions
                */
                function get_DV_I_1L ( value )
                {
                    // determine the type of value
                    var type = getType_I_2L( value );

                    // type must be a string
                    if ( typeof type !== 'string' ) throw new TypeError( '\r\nType must be a string.\r\n\r\n' );

                    // handle simple types (primitives and plain function/object)
                    switch ( type )
                    {
                        case 'boolean': return false;
                        case 'function': return function () { };
                        case 'null': return null;
                        case 'number': return 0;
                        case 'object': return Object.create( null );
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
                    */
                    function getType_I_2L ( value )
                    {
                        // determine the type of value
                        var type = typeof value;

                        // primitive or function
                        if ( type !== 'object' ) return type;

                        // null
                        if ( value === null ) return 'null';

                        // everything else, check for a constructor
                        var ctor = value.constructor;
                        // detect constructor name
                        var name = typeof ctor === 'function' && ctor.name;

                        // return string representation of the type of this value 
                        return typeof name === 'string' && name.length > 0 ? name.toLowerCase() : 'object';
                    }
                }
            },

        guessCollectionDefaultValue: /**
         * Predict default value of a collection in the certain point in time during query flow.
         *
         * @param {any} param_arr
         */
            function ( param_arr )
            {
                return guess_CDV_I_1L( param_arr );



                /**
                 * Local helper functions
                */
                function guess_CDV_I_1L ( param_arr )
                {
                    // cache current query interceptor
                    var current_GET_interceptor = _LINQ_CONTEXT._arrayProxyHandler.get;

                    // enable transparent object property access
                    _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;



                    /**
                     * Check the chain of invoked so-far methods, and based on that examine what type of item in the source collection you would deal with,
                     * if any data would have been available, when query flow had arrived in 'defaultIfEmpty' method.
                    */
                    // reference api object
                    var api = param_arr[ 0 ];

                    // get source collection input item
                    var inputItem = param_arr[ 2 ];


                    // determine current query flow (all invoked methods up to this method)
                    var method_names = getQueryMethodNames_I_2L();

                    var possible_type, method_name;
                    // iterate all query method names from the top of the chain
                    for ( var i = method_names.length - 1; i >= 0; i-- )
                    {
                        // reference method name
                        method_name = method_names[ i ];

                        // if it's dictionary then break it
                        if ( method_name === System.Linq.Context.toDictionary )
                        {
                            possible_type = _ENUM.CEST.KVP;
                            break;
                        }
                        // if it's grouping object then check it further down the chain
                        else if ( method_name === System.Linq.Context.groupBy )
                        {
                            possible_type = _ENUM.CEST.GROUPING;

                            var method_name_2;
                            // iterate all query method names from the current position in the chain towards the bottom
                            for ( var j = i - 1; j >= 0; j-- )
                            {
                                // reference method name
                                method_name_2 = method_names[ i ];

                                // if it's dictionary then break it
                                if ( method_name_2 === System.Linq.Context.toDictionary )
                                {
                                    possible_type = _ENUM.CEST.KVP;
                                    break;
                                }
                            }
                        }
                    }

                    // for 'KVP' or 'GROUPING' default value is undefined
                    if ( possible_type === _ENUM.CEST.KVP || possible_type === _ENUM.CEST.GROUPING )
                        // define collection default value
                        api.runtimeContext.cdv = undefined;
                    // it must be 'PLAIN' or 'PRIMITIVE'
                    else
                    {
                        // get the type string representation
                        var t2sr = _COMMON.convertTypeToString( inputItem );

                        // if null or undefined
                        if ( t2sr === _ENUM.T2SR.UNDEFINED || t2sr === _ENUM.T2SR.NULL )
                            // just return it
                            return inputItem;
                        else
                            // define collection default value
                            api.runtimeContext.cdv = _COMMON.getDefaultValueOf( inputItem );
                    }



                    // restore query flow context-default interceptor
                    _LINQ_CONTEXT._arrayProxyHandler.get = current_GET_interceptor;



                    /**
                     * Local helper methods
                    */
                    function getQueryMethodNames_I_2L ()
                    {
                        // get all valid query names from the current flow
                        var queryNames = [];

                        // fetch all query methods of current flow (qmcf)
                        var qmcf = api[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ];

                        // loop over api and store only query method names
                        for ( let key in qmcf )
                            if ( typeof qmcf[ key ] === 'function' && _LINQ_CONTEXT._all.includes( key ) )
                                queryNames.push( key );

                        // return all valid query method names
                        return queryNames;
                    }
                }
            },

        determinePropertyType: /**
         * Determine the type of the property used to filter a collection during maths-based query methods.
         *
         * @param {any} param_arr
         */
            function ( param_arr )
            {
                return determine_PT_I_1L( param_arr );



                /**
                 * Local helper functions
                */
                function determine_PT_I_1L ( param_arr )
                {
                    // cache current query interceptor
                    var current_GET_interceptor = _LINQ_CONTEXT._arrayProxyHandler.get;

                    // enable transparent object property access
                    _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;



                    /**
                     * cmpo stands for core method params object, which for some query methods' acp is optional.
                     * It gives access to all params and their values of the jcm method !
                    */
                    // reference JLC proxied instance
                    var api = param_arr[ 0 ];

                    // is t2sr required
                    var is_t2sr_r = param_arr[ 1 ];

                    // get filtering property name
                    var selectorName = param_arr[ param_arr.length - 2 ];

                    // get the selector
                    var selectorObj = param_arr[ param_arr.length - 1 ][ selectorName ];


                    // reference core method args and get filtering property; value of filtering property; is special property
                    var property, propertyValue, isp = false;

                    /**
                     * Loop this-query-flow collection and find the first existing property, based on which we can determine its type !
                     * It is assumed that some object may miss such property.
                    */
                    var currentColl = _DATA.fetchFlowData( api[ _ENUM.RUNTIME.RTC ].collectionIndex, false );


                    // if selector is defined
                    if ( selectorObj )
                    {
                        // reference core method args and get filtering property
                        property = selectorObj[ 0 ];

                        // if it's an array, get the first item
                        if ( _COMMON.convertTypeToString( property ) === _ENUM.T2SR.ARRAY )
                            property = property[ 0 ];

                        // is special property
                        isp = _COMMON.isSpecialProperty( property );

                        // loop over the collection to find the first "right" value of the property-in-question
                        for ( var i = 0; i < currentColl.length; i++ )
                        {
                            /**
                             * Get property value and carry out validation phase if it's ordinary property.
                             * Only carry out validation phase if it's special property.
                            */
                            propertyValue = _COMMON.getPropertyValueFromObject( property, currentColl[ i ], isp, is_t2sr_r );

                            // if property doesn't exist or has non-defined value
                            if ( propertyValue === undefined || propertyValue === null ) continue;

                            // if exists property (if we arrive here) and has value, break further search
                            break;
                        }
                    }

                    /**
                     * Define order-min-max-average meta object of the type of the value
                    */
                    api.runtimeContext.minMaxAverageValueTypeObject = Object.create( null );
                    api.runtimeContext.minMaxAverageValueTypeObject.selector = property;
                    api.runtimeContext.minMaxAverageValueTypeObject.t2sr = Object.create( null );
                    api.runtimeContext.minMaxAverageValueTypeObject.t2sr.isp = isp;
                    api.runtimeContext.minMaxAverageValueTypeObject.t2sr.type = isp ? _COMMON.determineSpecialPropertyType( property ) : _COMMON.convertTypeToString( propertyValue );
                    api.runtimeContext.minMaxAverageValueTypeObject.hadCollectionAtLeastTwoItems = currentColl.length > 1;
                    api.runtimeContext.minMaxAverageValueTypeObject.throwByObjectStringError = !api.runtimeContext.minMaxAverageValueTypeObject.selector && currentColl.length > 1;



                    // restore query flow context-default interceptor
                    _LINQ_CONTEXT._arrayProxyHandler.get = current_GET_interceptor;
                }
            },

        isSpecialProperty: /**
         * Check for special property that is used primarily during sorting collection by objects themselves.
         *
         * @param {any} propName
         */
            function ( propName )
            {
                return is_SP_I_1L( propName );



                /**
                 * Local helper functions
                */
                function is_SP_I_1L ( propName )
                {
                    return [ _ENUM.SPECIAL_PROPS.OBJECT_EXCLAMATION_MARK, _ENUM.SPECIAL_PROPS.VALUE_DOT ].includes( propName );
                }
            },

        determineSpecialPropertyType: /**
         * Determine the type of the special property used to filter a collection during maths-based query methods.
         *
         * @param {any} propName
         */
            function ( specialPropName )
            {
                return determine_SPT_I_1L( specialPropName );



                /**
                 * Local helper functions
                */
                function determine_SPT_I_1L ( specialPropName )
                {
                    if ( specialPropName === _ENUM.SPECIAL_PROPS.OBJECT_EXCLAMATION_MARK )
                        return _ENUM.T2SR.OBJECT;
                    else if ( specialPropName === _ENUM.SPECIAL_PROPS.VALUE_DOT )
                        return _ENUM.T2SR.OBJECT;
                    else
                        return _ENUM.T2SR.UNDEFINED;
                }
            },

        getCustomValueOfSymbol: /**
         * Convert Symbol value to string representation.
         *
         * @param {any} inputItem
         */
            function ( inputItem )
            {
                return get_CVoS_I_1L( inputItem );



                /**
                 * Local helper functions
                */
                function get_CVoS_I_1L ( value )
                {
                    return value.toString().replaceAll( 'Symbol', '' ).replaceAll( '(', '' ).replaceAll( ')', '' ).toUpperCase();
                }
            },

        getPropertyValueFromObject: /**
         * Fetch value from object.
         *
         * @param {any} propName Property of object or property path from object.
         * @param {any} obj Object to fetch property or property path from.
         * @param {any} isValidationContext Fetch property from object in the validation context mode or not.
         * @param {any} is_T2SR_Required Is T2SR required (custom toString presence).
         */
            function ( propName, obj, isValidationContext, is_T2SR_Required )
            {
                return get_PVfO_I_1L( propName, obj, isValidationContext, is_T2SR_Required );



                /**
                 * Local helper functions
                */
                function get_PVfO_I_1L ( propName, obj, validate, checkT2SR )
                {
                    /**
                     * Is it a complex property ?
                     * 
                     *  - string ('some string')
                     *  - number (1, 3.14)
                     *  - boolean (true, false)
                     *  - object ( {} )
                     *  - "something undefined" (undefined, null)
                    */
                    if ( propName.includes( '.' ) )
                    {
                        // define property value holder (pvh)
                        var pvh = _COMMON.seekPropertyOrThrowErrorIfRequired( obj, propName, propName.split( '.' ).length, false );

                        // validate against sorting context and return custom string representation of the object in question, or just return property value.
                        return validateAgainstSortingContext_I_2L( pvh, validate, checkT2SR );
                    }
                    /**
                     * Or is it a current-level property or a special property ?
                     * 
                     *  - string ('some string')
                     *  - number (1, 3.14)
                     *  - boolean (true, false)
                     *  - object ( {} )
                     *  - "something undefined" (undefined, null)
                     *  
                     *  - "special property" (object!)
                    */
                    else
                    {
                        var isp = _COMMON.isSpecialProperty( propName );
                        /**
                         * Check for special property that is used primarily during sorting collection by objects themselves.
                         * Validate against sorting context and return custom string representation of the object in question.
                        */
                        return isp ? validateAgainstSortingContext_I_2L( obj, isp, checkT2SR ) : validateAgainstSortingContext_I_2L( obj[ propName ], validate, checkT2SR );
                    }



                    /**
                     * Local helper functions
                    */
                    function validateAgainstSortingContext_I_2L ( o, validate, checkToString )
                    {
                        // if it's an object
                        if ( ( _COMMON.convertTypeToString( o ) === _ENUM.T2SR.OBJECT ) && validate && checkToString )
                        {
                            /**
                             * User must provide implementation of toString method if sorting by the object itself is required ⚠️
                             * Implementation of toString method by design and by nature must return the unique identification of such object across the whole collection ⚠️
                            */
                            if ( !o.toString || ( o.toString === Object.prototype.toString ) )
                                throw new ReferenceError(
                                    '\r\nSorting PLAIN or KVP\'s VALUE by itself requires presence of custom method "toString()" !\r\n\r\nSource :'
                                );

                            // return custom string representation of the object
                            return o.toString();
                        }
                        // otherwise, return this property value
                        else
                            return o;
                    }
                }
            },

        seekPropertyOrThrowErrorIfRequired: /**
         * @param {object} currentObject
         * @param {string} propertyName
         * @param {number} arrayLength
         * @param {bool} throwErrorWhenNullOrUndefined
         */
            function ( currentObject, propertyName, arrayLength, throwErrorWhenNullOrUndefined )
            {
                return seek_PoTEIR_I_1L( currentObject, propertyName, arrayLength, throwErrorWhenNullOrUndefined );



                /**
                 * Local helper functions
                */
                function seek_PoTEIR_I_1L ( obj, pn, length, letThrowError )
                {
                    // create array of prop's path
                    var path_arr = pn.split( '.' );

                    // define property value holder (pvh); was pvh initialized (pvh_init)
                    var pvh, pvh_init;

                    // loop over array of prop's path to seek the destination property and/or return its value
                    for ( var i = 0; i < length; i++ )
                    {
                        // pvh was initialized, but some property in the path evaluated to null or undefined
                        if ( pvh_init && !validatePvh_I_2L( pvh ) )
                        {
                            if ( letThrowError )
                                throw new Error( '\r\nObject reference not set to an instance of an object [ ' + pn + ' ] !\r\n\r\n' );
                        }
                        // pvh was initialized
                        else if ( pvh_init )
                            pvh = pvh[ path_arr[ i ] ];
                        // initialize pvh
                        else
                        {
                            pvh = obj[ path_arr[ i ] ];

                            // pvh was initialized
                            pvh_init = true;
                        }

                        // if along the way you come across non-existing property in the object, break the drilling down and return undefined
                        if ( !validatePvh_I_2L( pvh ) && !letThrowError ) break;
                    }

                    // pvh was initialized, but last property in the path evaluated to null or undefined
                    if ( !validatePvh_I_2L( pvh ) && letThrowError )
                        throw new Error( '\r\nObject reference not set to an instance of an object [ ' + pn + ' ] !\r\n\r\n' );

                    // return value of the property or property
                    return pvh;



                    /**
                     * Local helper functions
                    */
                    function validatePvh_I_2L ( v )
                    {
                        // convert value to its string type representation
                        var t2sr = _COMMON.convertTypeToString( v );

                        // assert the validity
                        return t2sr !== _ENUM.T2SR.UNDEFINED && t2sr !== _ENUM.T2SR.NULL;
                    }
                }
            },

        deepCopyYCR: /**
         * Clone object without reference with circular references.
         *
         * Source: https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references
         * 
         * @param {any} obj Object to clone content from.
         */
            function ( obj, hash = new WeakMap() )
            {
                // do not try to clone primitives or functions
                if ( Object( obj ) !== obj || obj instanceof Function ) return obj;
                if ( hash.has( obj ) ) return hash.get( obj ); // cyclic reference
                try
                { // try to run constructor (without arguments, as we don't know them)
                    var result = new obj.constructor();
                } catch ( e )
                { // constructor failed, create object without running the constructor
                    result = Object.create( Object.getPrototypeOf( obj ) );
                }
                // optional: support for some standard constructors (extend as desired)
                if ( obj instanceof Map )
                    Array.from( obj, ( [ key, val ] ) => result.set( _COMMON.deepCopyYCR( key, hash ), _COMMON.deepCopyYCR( val, hash ) ) );
                else if ( obj instanceof Set )
                    Array.from( obj, ( key ) => result.add( _COMMON.deepCopyYCR( key, hash ) ) );
                // register in hash
                hash.set( obj, result );
                // clone and assign enumerable own properties recursively
                return Object.assign( result, ...Object.keys( obj ).map(
                    key => ( { [ key ]: _COMMON.deepCopyYCR( obj[ key ], hash ) } ) ) );
            },

        deepCopyNCR: /**
         * Clone object without reference without circular references.
         *
         * Source: https://github.com/zellwk/javascript/blob/master/mix/mix.js
         * 
         * @param {any} obj Object to clone content from.
         */
            function ( obj )
            {
                var result;

                if ( objectTypeToString_I_1L( obj ) === _ENUM.T2SR.ARRAY )
                    result = [];
                else if ( objectTypeToString_I_1L( obj ) === _ENUM.T2SR.OBJECT )
                    result = {};
                else
                    return obj;

                deepCNCR_I_1L( result, obj );

                return result;



                /**
                 * Local helper functions
                */
                function deepCNCR_I_1L ( output, input )
                {
                    // get all input props
                    const props = Object.keys( input );

                    for ( const prop of props )
                    {
                        // prevents prototype pollution
                        if ( prop === '__proto__' ) continue;

                        const descriptor = Object.getOwnPropertyDescriptor( input, prop );
                        const value = descriptor.value;
                        if ( value ) descriptor.value = cloneDescriptorValue_I_2L( value );

                        // if don't have prop => define property
                        if ( !output[ prop ] )
                        {
                            Object.defineProperty( output, prop, descriptor );
                            continue;
                        }

                        // if have prop, but type is not object => overwrite by redefining property
                        if ( typeof output[ prop ] !== 'object' )
                        {
                            Object.defineProperty( output, prop, descriptor );
                            continue;
                        }

                        // if have prop, but type is object => concat the arrays together
                        if ( objectTypeToString_I_1L( descriptor.value ) === _ENUM.T2SR.ARRAY )
                        {
                            output[ prop ] = output[ prop ].concat( descriptor.value );
                            continue;
                        }

                        // if have prop, but type is object => merge
                        deepCNCR_I_1L( output[ prop ], descriptor.value );



                        /**
                         * Local helper functions
                        */
                        // Creates a deep clone for each value
                        function cloneDescriptorValue_I_2L ( value )
                        {
                            // arrays
                            if ( objectTypeToString_I_1L( value ) === _ENUM.T2SR.ARRAY )
                            {
                                const array = [];
                                for ( let v of value )
                                {
                                    v = cloneDescriptorValue_I_2L( v );
                                    array.push( v );
                                }
                                return array;
                            }

                            // objects
                            if ( objectTypeToString_I_1L( value ) === _ENUM.T2SR.OBJECT )
                            {
                                const obj = {};
                                const props = Object.keys( value );
                                for ( const prop of props )
                                {
                                    const descriptor = Object.getOwnPropertyDescriptor( value, prop );
                                    if ( descriptor.value ) descriptor.value = cloneDescriptorValue_I_2L( descriptor.value );
                                    Object.defineProperty( obj, prop, descriptor );
                                }
                                return obj;
                            }

                            // other types of objects
                            if ( objectTypeToString_I_1L( value ) === _ENUM.T2SR.DATE )
                            {
                                return new Date( value.getTime() );
                            }

                            if ( objectTypeToString_I_1L( value ) === _ENUM.T2SR.MAP )
                            {
                                const map = new Map();
                                for ( const entry of value )
                                {
                                    map.set( entry[ 0 ], cloneDescriptorValue_I_2L( entry[ 1 ] ) );
                                }
                                return map;
                            }

                            if ( objectTypeToString_I_1L( value ) === _ENUM.T2SR.SET )
                            {
                                const set = new Set();
                                for ( const entry of value.entries() )
                                {
                                    set.add( cloneDescriptorValue_I_2L( entry[ 0 ] ) );
                                }
                                return set;
                            }

                            /**
                             * Types we don't need to clone or cannot clone.
                             * Examples:
                             * - primitives don't need to clone
                             * - functions cannot clone
                            */
                            return value;
                        }
                    }
                }

                function objectTypeToString_I_1L ( value )
                {
                    return _COMMON.convertTypeToString( value );
                }
            },

        fetchObjectStructureKeys: /**
         * Fetch all keys at all levels of passed object.
         *
         * @param {any} obj
         */
            function ( obj )
            {
                return fetch_OSK_I_1L( obj );



                /**
                 * Local helper functions
                */
                function fetch_OSK_I_1L ( obj )
                {
                    // declare array of object's keys
                    var o_key_arr = [];

                    // retrieve current level keys
                    getKeys_I_2L( '', obj, o_key_arr );

                    // return array of object's keys
                    return o_key_arr;



                    /**
                     * Local helper functions
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
                                // add primitive property name or primitive property path
                                primitives.push( parent + key );
                            // if it's an object
                            else if ( typeof value === 'object' )
                            {
                                // add primitive property name or primitive property path
                                primitives.push( parent + key );


                                // convert value to type string representation
                                var t2sr = _COMMON.convertTypeToString( value );

                                // if value !== null || value !== undefined
                                if ( t2sr !== _ENUM.T2SR.NULL && t2sr !== _ENUM.T2SR.UNDEFINED )
                                    // add object identified by the key to process
                                    objects.push( key );
                            }
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
                                getKeys_I_2L( parent ? parent + c_k + '.' : c_k + '.', d_obj[ c_k ], output_arr );
                            }
                        }

                        // store current level properties - return properly constructed paths
                        Array.prototype.unshift.apply( output_arr, primitives );
                    }
                }
            },

        fetchObjectKeyValue: /**
         * Get the so-called key of the object passed as the input.
         * The key can be a single value or an array of values.
         * 
         * @param {any} item Input object from which to get key value.
         * @param {any} key_prop_arr Array of object properties, whose values form the key.
         */
            function ( item, key_prop_arr )
            {
                return fetch_OKV_I_1L( item, key_prop_arr );



                /**
                 * Local helper functions
                */
                function fetch_OKV_I_1L ( item, key_prop_arr )
                {
                    // declare a real key; some key temp object
                    var key, keyPart;

                    // loop over key parts and apply the comparison logic
                    for ( var i = 0; i < key_prop_arr.length; i++ )
                    {
                        // reference the key part
                        // @ts-ignore
                        keyPart = key_prop_arr[ i ];

                        // is it main object itself ?
                        if ( _COMMON.isSpecialProperty( keyPart.value ) && _COMMON.determineSpecialPropertyType( keyPart.value ) === _ENUM.T2SR.OBJECT )
                            //  key is a object itself !
                            key = item;

                        // is it complex (nested-level primitive one or a nested-level object) ?
                        // @ts-ignore
                        else if ( keyPart.isValidProperty && keyPart.isComplex )
                        {
                            // if key is already initialized
                            if ( key )
                                // get the property value from passed-in object
                                // @ts-ignore
                                key += _LOGICAL_FILTER.applyPropertyValueFilter( item, keyPart.value, true, true );
                            else
                            {
                                // get the property value from passed-in object
                                // @ts-ignore
                                var rkv = _LOGICAL_FILTER.applyPropertyValueFilter( item, keyPart.value, true, true );

                                // convert object to type string representation
                                var t2sr = _COMMON.convertTypeToString( rkv );

                                // if a key part is an object, not object string representation
                                if ( t2sr === _ENUM.T2SR.OBJECT )
                                    // assign a key with an object
                                    key = rkv;
                                // is null or undefined => non-existing grouping key
                                else if ( t2sr === _ENUM.T2SR.UNDEFINED || t2sr === _ENUM.T2SR.NULL )
                                    throw new Error( '\r\nObject reference not set to an instance of an object [' + keyPart.value + '] !\r\n\r\n' );
                                // deal with primitives
                                else
                                {
                                    // initialize a key with a default value
                                    key = _COMMON.getDefaultValueOf( rkv );

                                    // add proper value to the key
                                    key += rkv;
                                }
                            }
                        }
                        // is it simple (current-level primitive one or a current-level object) ?
                        // @ts-ignore
                        else if ( keyPart.isValidProperty )
                        {
                            // if key is already initialized
                            if ( key )
                                // @ts-ignore
                                key += item[ keyPart.value ];
                            else
                            {
                                // get the key value
                                // @ts-ignore
                                var rkv = item[ keyPart.value ];

                                // if a key part is an object, not object string representation
                                if ( _COMMON.convertTypeToString( rkv ) === _ENUM.T2SR.OBJECT )
                                    // assign a key with an object
                                    key = rkv;
                                else
                                {
                                    // initialize a key with a default value
                                    key = _COMMON.getDefaultValueOf( rkv );

                                    // add proper value to the key
                                    key += rkv;
                                }
                            }
                        }
                        // otherwise apply some part that is not a property of an object
                        else
                            // @ts-ignore
                            key += keyPart.value;
                    }

                    // return the key from object
                    return key;
                }
            },

        createCompoundKey: /**
         * Create object being a key based on passed key-building-parts.
         *
         * @param {any} keySelectorArray
         */
            function ( keySelectorArray )
            {
                return create_CK_I_1L( keySelectorArray );



                /**
                 * Local helper functions
                */
                function create_CK_I_1L ( keySelectorArray )
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

        usingGroupingBy: /**
         * Get object providing grouping utilities for any collection of data. 
         */
            function ()
            {
                return using_GB_I_1L();



                /**
                 * Local helper functions
                */
                function using_GB_I_1L ()
                {
                    // create grouping-by object helper
                    var gbo = {
                        buildPhrase:
                            function ( obj, sort_cols_arr )
                            {
                                // declare a sorting phrase
                                var phrase = '';

                                // loop over updated sort set input
                                for ( var i = 0; i < sort_cols_arr.length; i++ )
                                    // build the sorting phrase
                                    phrase += _COMMON.getPropertyValueFromObject( sort_cols_arr[ i ], obj, true, false ) + '-';

                                // remove the last dash - phrase joining sign
                                phrase = phrase.substring( 0, phrase.length - 1 );

                                // return the sorting phrase
                                return phrase;
                            },

                        getGrouping:
                            function ( key_id, groups_obj )
                            {
                                // create pure empty object
                                var gso = Object.create( null );

                                // define grouping seeker object
                                gso.idx = -1;                       // index of grouping object in the group
                                gso.arr = undefined;                // list of grouped values

                                var item;
                                // loop over groups' object
                                for ( var i = 0; i < groups_obj.length; i++ )
                                {
                                    // access grouping object
                                    item = groups_obj[ i ];

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

                        setGrouping:
                            function ( key_id, gso, groups_obj )
                            {
                                // create pure empty object
                                var grouping_obj = Object.create( null );

                                // define grouping object
                                grouping_obj.key = key_id;

                                /**
                                 * Declare resultsView function
                                 *  - declare non-public component called '_privateList'
                                */
                                var _privateList = _COMMON.deepCopyNCR( gso.arr );
                                Object.defineProperty(
                                    grouping_obj,
                                    _ENUM.RESULTS_VIEW.ENUMERATOR,
                                    {
                                        // only override getter
                                        get: function ()
                                        {
                                            return _privateList;
                                        },

                                        // make it visible for loop operations
                                        enumerable: true
                                    }
                                );

                                // store grouping object at the right position
                                if ( gso.idx === -1 )
                                    groups_obj.push( grouping_obj );
                                else
                                    groups_obj[ gso.idx ] = grouping_obj;
                            },

                        getKVP:
                            function ( key_id, kvps_obj )
                            {
                                // create pure empty object
                                var kvp = Object.create( null );

                                // define KVP object
                                kvp.key = undefined;                  // key of KVP object in the dictionary
                                kvp.value = undefined;                // KVP's value object

                                var item;
                                // loop over dictionary object
                                for ( var i = 0; i < kvps_obj.length; i++ )
                                {
                                    // access KVP object
                                    item = kvps_obj[ i ];

                                    // find the right one with key id
                                    if ( item.key === key_id )
                                    {
                                        // store key of KVP object
                                        kvp.key = key_id;

                                        // store KVP's value object
                                        kvp.value = item.value;

                                        // discard further search
                                        break;
                                    }
                                }

                                // return KVP object
                                return kvp;
                            }
                    };

                    // return grouping-by object helper
                    return gbo;
                }
            },

        useDefaultComparer: /**
         * Get the proper comparator based on some internal-calculated JLC metadata to properly sort hpid.
         *
         * @param {any} sortMetadata
         * @param {any} by_force
         * @param {any} forced_comparator_name
         * @param {any} sharedSecondLevelSortingContext
         */
            function ( sortMetadata, by_force, forced_comparator_name, sharedSecondLevelSortingContext )
            {
                return use_DC_I_1L( sortMetadata, by_force, forced_comparator_name, sharedSecondLevelSortingContext );



                /**
                 * Local helper functions
                */
                function use_DC_I_1L ( sortMetadata, by_force, forced_comparator_name, sharedSecondLevelSortingContext )
                {
                    // define comparators' object
                    var comparators = {
                        PLAIN_Comparator:
                            function ( itemCurrent, itemPrevious )
                            {
                                /**
                                 * Check whether we sort using object itself or using object's property, by examining sortMetadata object
                                 * 
                                 *      - sortMetadata.byObjectString
                                 *      - object's any prop
                                */

                                // by 'object' itself
                                if ( sortMetadata && sortMetadata.byObjectString )
                                    // if both objects have custom methods toString(), just invoke basic boolean comparison
                                    return Boolean_Comparator_I_2L( itemCurrent.toString(), itemPrevious.toString() );

                                // invoke PLAIN comparator private function
                                return PLAIN_Comparator_I_2L( itemCurrent, itemPrevious, _ENUM.CEST.PLAIN );
                            },

                        GROUPING_Comparator:
                            function ( itemCurrent, itemPrevious )
                            {
                                // invoke basic boolean comparison 
                                return Boolean_Comparator_I_2L( itemCurrent.key, itemPrevious.key );
                            },

                        KVP_Comparator:
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
                                    return Boolean_Comparator_I_2L( itemCurrent.key, itemPrevious.key );
                                }
                                // by 'value' object itself when 'value' is the primitive type
                                else if ( sortMetadata.byValue && sortMetadata.isValueDotPrimitive )
                                {
                                    // invoke basic boolean comparison
                                    return Boolean_Comparator_I_2L( itemCurrent.value, itemPrevious.value );
                                }
                                // by 'value' object itself when 'value' is the object not the primitive type
                                else if ( sortMetadata.byValue && !sortMetadata.isValueDotPrimitive )
                                {
                                    /**
                                     * User must provide implementation of toString method if sorting by the object itself is required ⚠️
                                     * Implementation of toString method by design and by nature must return the unique identification of such object across the whole collection ⚠️
                                    */
                                    if ( !itemCurrent.value.toString || ( itemCurrent.value.toString === Object.prototype.toString ) )
                                        throw new ReferenceError(
                                            '\r\nSorting KVP Value by itself requires presence of custom method "toString()" !\r\n\r\nSource :'
                                        );

                                    if ( !itemPrevious.value.toString || ( itemPrevious.value.toString === Object.prototype.toString ) )
                                        throw new ReferenceError(
                                            '\r\nSorting KVP Value by itself requires presence of custom method "toString()" !\r\n\r\nSource :'
                                        );


                                    // if both objects have custom methods toString(), just invoke basic boolean comparison
                                    return Boolean_Comparator_I_2L( itemCurrent.value.toString(), itemPrevious.value.toString() );
                                }
                                // by 'value' object itself
                                else if ( sortMetadata.byValuePLAIN )
                                {
                                    // invoke PLAIN comparator private function
                                    return PLAIN_Comparator_I_2L( itemCurrent, itemPrevious, _ENUM.CEST.KVP );
                                }
                            },

                        PRIMITIVE_Comparator:
                            function ( itemCurrent, itemPrevious )
                            {
                                // comparing primitive types involves just comparing their values
                                return Boolean_Comparator_I_2L( itemCurrent, itemPrevious );
                            }
                    };


                    /**
                     * Determine what type of comparator to get
                     *  - automatically based on cest (collection element structure type)
                     *  - by force using requested comparator name 
                    */

                    if ( by_force && forced_comparator_name )
                        // return the FORCED_COMPARATOR_NAME function itself
                        return comparators[ forced_comparator_name ];

                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PLAIN )
                        // return the PLAIN comparator function itself
                        return comparators.PLAIN_Comparator;

                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.GROUPING )
                        // return the GROUPING comparator function itself
                        return comparators.GROUPING_Comparator;

                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP )
                        // return the KVP comparator function itself
                        return comparators.KVP_Comparator;

                    if ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PRIMITIVE )
                        // return the PRIMITIVE comparator function itself
                        return comparators.PRIMITIVE_Comparator;



                    /**
                     * Local helper functions
                    */
                    function PLAIN_Comparator_I_2L ( itemCurrent, itemPrevious, cest )
                    {
                        // current and previous values to compare
                        var itemCurrentValue = '', itemPreviousValue = '';

                        // create two sorting phrases to compare against each other, 'itemCurrentValue' vs 'itemPreviousValue' respectively
                        createSortPhrases_I_3L( cest );

                        // invoke basic boolean comparison 
                        return Boolean_Comparator_I_2L( itemCurrentValue, itemPreviousValue );



                        /**
                         * Local helper functions
                        */
                        function createSortPhrases_I_3L ( cestCtx )
                        {
                            // reference to the right sorting columns
                            var sortCols;

                            // check if to use default sorting columns' source or a forced-ones
                            if ( sharedSecondLevelSortingContext.check() )
                                // reference a forced-ones stored sorting columns
                                sortCols = sharedSecondLevelSortingContext.ovc;
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
                            if ( cestCtx === _ENUM.CEST.PLAIN )
                            {
                                oC = itemCurrent;
                                oP = itemPrevious;
                            }
                            // go for KVP Value's PLAIN
                            else if ( cestCtx === _ENUM.CEST.KVP )
                            {
                                oC = itemCurrent.value;
                                oP = itemPrevious.value;
                            }
                            // throw error
                            else
                                throw new Error(
                                    '\r\nThis collection element structure type (cest) called "' + _COMMON.getCustomValueOfSymbol( cestCtx ) +
                                    '" is not supported by PLAIN comparator !\r\nValid contexts are [' +
                                    _COMMON.getCustomValueOfSymbol( _ENUM.CEST.PLAIN ) + ', ' +
                                    _COMMON.getCustomValueOfSymbol( _ENUM.CEST.KVP ) +
                                    '] !\r\n\r\n'
                                );


                            var sortCol;
                            // loop over all so-far stored sorting columns
                            for ( var i = 0; i < sortCols.length; i++ )
                            {
                                // reference a sorting column
                                sortCol = sortCols[ i ];

                                // is it complex KVP
                                if ( cestCtx === _ENUM.CEST.KVP && sortCol.indexOf( '.' ) > 0 )
                                {
                                    // subtract the type marker
                                    if ( sortCol.startsWith( 'value.' ) ) sortCol = sortCol.substring( sortCol.indexOf( '.' ) + 1 );

                                    // get the property value from both, the current and the previous object
                                    itemCurrentValue += _LOGICAL_FILTER.applyPropertyValueFilter( oC, sortCol, true, false );
                                    itemPreviousValue += _LOGICAL_FILTER.applyPropertyValueFilter( oP, sortCol, true, false );
                                }
                                // is it complex PLAIN
                                else if ( sortCol.indexOf( '.' ) > 0 )
                                {
                                    // get the property value from both, the current and the previous object
                                    itemCurrentValue += _LOGICAL_FILTER.applyPropertyValueFilter( oC, sortCol, true, false );
                                    itemPreviousValue += _LOGICAL_FILTER.applyPropertyValueFilter( oP, sortCol, true, false );
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

                    function Boolean_Comparator_I_2L ( vC, vP )
                    {
                        /**
                         * vC means itemCurrentValue
                         * vP means itemPreviousValue 
                        */

                        /**
                         * Check if both values are digits or any of them is null or undefined.
                         * Comparing two values of "strongly" different types is simply illogical !
                         * If at least one value is a digit, compare them as digits by making the second one - being null or undefined - holding default value of the type of the first value.
                        */
                        const [ nVC, nVP, isBoolean ] = nativeOrDefaultIfNullOrUndefined_I_1L( vC, vP );

                        // reference the current sorting mode
                        var sort_mode = _ACTION.hpid.sorting.sort_order;

                        // determine the sorting order of the comparator
                        switch ( sort_mode )
                        {
                            // go the ASC way
                            case _ENUM.ORDER.By.ASC:
                            case _ENUM.ORDER.By.THEN_ASC:
                                return isBoolean ? doBooleanComparisonOfBooleans_I_3L( true ) : doBooleanComparisonOfOtherTypes_I_3L( true );

                            // go the DESC way
                            case _ENUM.ORDER.By.DESC:
                            case _ENUM.ORDER.By.THEN_DESC:
                                return isBoolean ? doBooleanComparisonOfBooleans_I_3L( false ) : doBooleanComparisonOfOtherTypes_I_3L( false );

                            default:
                                throw new Error( '\r\nUnsupported sorting order [ ' + _COMMON.getCustomValueOfSymbol( sort_mode ) + ' ] !\r\n\r\n' );
                        }



                        /**
                         * Local helper functions
                        */
                        function nativeOrDefaultIfNullOrUndefined_I_1L ( v1, v2 )
                        {
                            /**
                             * Check which of the two values are defined
                            */
                            var is_V1 = v1 !== 'undefined' && v1 !== 'null';
                            var is_V2 = v2 !== 'undefined' && v2 !== 'null';

                            // if both
                            if ( is_V1 && is_V2 )
                            {
                                if ( _COMMON.isNumeric( v1 ) )
                                    v1 = _COMMON.toNumeric( v1, true );

                                if ( _COMMON.isNumeric( v2 ) )
                                    v2 = _COMMON.toNumeric( v2, true );
                            }
                            // otherwise having one of them defined, get default value for the second one
                            else
                            {
                                if ( !is_V1 && is_V2 )
                                {
                                    v2 = _COMMON.isNumeric( v2 ) ? _COMMON.toNumeric( v2, true ) : v2;
                                    v1 = _COMMON.getDefaultValueOf( v2 );
                                }
                                if ( !is_V2 && is_V1 )
                                {
                                    v1 = _COMMON.isNumeric( v1 ) ? _COMMON.toNumeric( v1, true ) : v1;
                                    v2 = _COMMON.getDefaultValueOf( v1 );
                                }
                            }

                            return [ v1, v2, _COMMON.convertTypeToString( v1 ) === _ENUM.T2SR.BOOLEAN ];
                        }

                        function doBooleanComparisonOfBooleans_I_3L ( isAsc )
                        {
                            // perform ASC comparison
                            if ( isAsc )
                            {
                                if ( nVC === true && nVP === false ) return 1;
                                else if ( nVC === false && nVP === true ) return -1;
                                else return 0;
                            }
                            // perform DESC comparison
                            else
                            {
                                if ( nVC === true && nVP === false ) return -1;
                                else if ( nVC === false && nVP === true ) return 1;
                                else return 0;
                            }
                        }

                        function doBooleanComparisonOfOtherTypes_I_3L ( isAsc )
                        {
                            // perform ASC comparison
                            if ( isAsc )
                            {
                                if ( nVC > nVP )
                                    return 1;
                                else
                                    return -1;
                            }
                            // perform DESC comparison
                            else
                            {
                                if ( nVC > nVP )
                                    return -1;
                                else
                                    return 1;
                            }
                        }
                    }
                }
            },

        useDefaultObjectContentComparer: /**
         * Compare two objects to determine whether they have the same content (property name - property value).
         * 
         * @param {any} obj1
         * @param {any} obj2
         */
            function ( obj1, obj2 )
            {
                return use_DOCC_C_I_1L( obj1, obj2 );



                /**
                 * Local helper functions
                */
                function use_DOCC_C_I_1L ( obj1, obj2 )
                {
                    // are two objects equal
                    var match_found = false;


                    // both objects are null or undefined, hence considered to be equal
                    if ( !obj1 && !obj2 )
                    {
                        // match found
                        match_found = true;

                        // return match result
                        return match_found;
                    }


                    // get all props if object non-empty
                    var propNames_1 = Object.getOwnPropertyNames( obj1 || Object.create( null ) );
                    var propNames_2 = Object.getOwnPropertyNames( obj2 || Object.create( null ) );

                    // if the number of props are different
                    if ( propNames_1.length !== propNames_2.length ) return match_found;

                    // sort property names natively
                    propNames_1.sort();
                    propNames_2.sort();

                    // compare object's property name vs object's property name
                    for ( var i = 0; i < propNames_1.length; i++ )
                        if ( propNames_1[ i ] !== propNames_2[ i ] ) return match_found;

                    // compare current level values of these two object
                    for ( var i = 0; i < propNames_1.length; i++ )
                    {
                        // get two values to compare
                        var o1_v = obj1[ propNames_1[ i ] ];
                        var o2_v = obj2[ propNames_2[ i ] ];

                        // if both types are different
                        if ( typeof o1_v !== typeof o2_v ) return match_found;

                        // check if both values are primitive
                        var v_prim = _COMMON.isPrimitiveType( o1_v || o2_v );

                        // if are primitive and not equal
                        if ( v_prim && o1_v !== o2_v ) return match_found;
                        // if are objects
                        else if ( !v_prim )
                        {
                            // check these two nested objects recursively
                            match_found = use_DOCC_C_I_1L( o1_v, o2_v );

                            // if inequality found, break the comparison
                            if ( !match_found ) return match_found;
                        }
                    }


                    /**
                     *
                     * Otherwise all props are of the same type and have the same values, i.e. both objects are equal
                    */
                    // match found
                    match_found = true;

                    // return match result
                    return match_found;
                }
            },

        trimSpaces: /**
         * Removes unnecessary spaces around array items.
         *
         * @param {any} input_array An input array
         */
            function ( input_array )
            {
                return tS_I_1L( input_array );



                /**
                 * Local helper functions
                */
                function tS_I_1L ( arr )
                {
                    arr.forEach( function ( item, index, source_arr )
                    {
                        source_arr[ index ] = item.trim();
                    } );
                }
            },

        updateIceMetaObjectOfRuntimeContext: /**
         * Update metadata object of an input collection element of the current query or future queries down the query chain.
         *
         * @param {any} inputCollection
         * @param {any} runtimeContext
         */
            function ( runtimeContext, inputCollection )
            {
                return update_IMOoRC_I_1L( runtimeContext, inputCollection );



                /**
                 * Local helper functions
                */
                function update_IMOoRC_I_1L ( runtime_ctx, ic )
                {
                    // first item of the collection
                    var fi = ic[ 0 ];

                    // get object full structure string (ofss)
                    var ofss = ic.ofss;

                    // has collection at least two items
                    var gte_2 = ic.length > 1;


                    // store updated metadata about collection
                    _ACTION.hpidCommons.updateColumnSetCestAndCols( gte_2, fi, ofss );


                    // create input collection element metadata object (ice meta object -> IceMetaObject)
                    runtime_ctx.currentQueryIceMetaObject.is_prim = _COMMON.isPrimitiveType( fi ) && ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.PRIMITIVE );
                    runtime_ctx.currentQueryIceMetaObject.item = fi;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = false;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = '';
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = '';
                    runtime_ctx.currentQueryIceMetaObject.ofss = ofss;
                    runtime_ctx.currentQueryIceMetaObject.length_gte_2 = gte_2;
                    runtime_ctx.currentQueryIceMetaObject.realFlowInitialIcest = _ACTION.hpid.columnSet.currentQueryIcest;
                    runtime_ctx.currentQueryIceMetaObject.realFlowComputedIcestForNextQuery = _ACTION.hpid.columnSet.currentQueryIcest;
                }
            }
    };

    // private core object
    var _CORE = {
        join_mtds: /**
         * @param {Object} params
         *  - innerColl
         *  - outerSelectorArray
         *  - outerUdfSelector
         *  - innerSelectorArray
         *  - innerUdfSelector
         *  - enumValue
         *  - udfResultSelector
         *  - udfEqualityComparer
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeJoinFilter(
                        this,
                        params.innerColl,
                        params.outerSelectorArray,
                        params.outerUdfSelector,
                        params.innerSelectorArray,
                        params.innerUdfSelector,
                        params.enumValue,
                        params.udfResultSelector,
                        params.udfEqualityComparer
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        restriction_mtds: /**
         * @param {Object} params
         *  - predicateArray
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeWhereFilter(
                        this,
                        params.predicateArray
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        group_mtds: /**
         * @param {Object} params
         *  - predicateArray
         *  - udfGroupKeySelector
         *  - udfEqualityComparer
         *  - udfGroupKeyProjector
         *  - udfGroupElementSelector
         *  - udfGroupResultValueSelector
         *  - terminateFlowAndReturnData
         *  - isDictionaryContext
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {boolean} sharedSecondLevelSortingContext
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, sharedSecondLevelSortingContext )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeGroupByFilter(
                        this,
                        params.predicateArray,
                        params.udfGroupKeySelector,
                        params.udfEqualityComparer,
                        params.udfGroupKeyProjector,
                        params.udfGroupElementSelector,
                        params.udfGroupResultValueSelector,
                        params.terminateFlowAndReturnData,
                        params.isDictionaryContext
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        order_mtds: /**
         * @param {Object} params
         *  - keyPartSelectorArray
         *  - udfComparer
         *  - enumValue
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeOrderFilter(
                        this,
                        params.keyPartSelectorArray,
                        params.udfComparer,
                        params.enumValue,
                        actionContext.sortingMetadataContext.getMetadata(), // <- _SYNTAX.check
                        actionContext.sharedSecondLevelSortingContext
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        projection_mtds: /**
         * @param {Object} params
         *  - selectorArray
         *  - enumValue
         *  - udfSelector
         *  - udfResultSelector
         *  - incorporateIndex
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeSelectFilter(
                        this,
                        params.selectorArray,
                        params.enumValue,
                        params.udfSelector,
                        params.udfResultSelector,
                        params.incorporateIndex
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        paging_mtds: /**
         * @param {Object} params
         *  - predicateArray
         *  - fallbackOnDefault
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeOneItemFilter(
                        this,
                        params.predicateArray,
                        params.fallbackOnDefault,
                        params.enumValue
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        range_mtds: /**
         * @param {Object} params
         *  - predicateArray
         *  - index
         *  - count
         *  - enumValue
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeRangeFilter(
                        this,
                        params.predicateArray,
                        params.index,
                        params.count,
                        params.enumValue
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        merge_mtds: /**
         * @param {Object} params
         *  - collectionOrItem
         *  - enumValue
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;

                    // considering different scenarios there should not be syntax checking

                    // invoke core logic
                    _PHYSICAL_FILTER.executeMergeFilter(
                        this,
                        params.collectionOrItem,
                        params.enumValue
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        set_mtds: /**
         * @param {Object} params
         *  - collectionOrItem
         *  - udfEqualityComparer
         *  - strongSearch
         *  - enumValue
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    _PHYSICAL_FILTER.executeSetFilter(
                        this,
                        params.collectionOrItem,
                        params.udfEqualityComparer,
                        params.strongSearch,
                        params.enumValue
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store();
                }
            },

        aggregate_mtds: /**
         * @param {Object} params
         *  - property
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    var pfr = _PHYSICAL_FILTER.executeMathFilter(
                        this,
                        params.property, // can be primitive or UDF
                        params.udfValueSelector,
                        params.enumValue,
                        actionContext.sortingMetadataContext.getMetadata(), // <- _SYNTAX.check
                        actionContext.sharedSecondLevelSortingContext,
                        params.roundEnumValue // can be null for min & max
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store( true, pfr );

                    // return physical filter result (pfr)
                    return pfr;
                }
            },

        quantifying_mtds: /**
         * @param {Object} params
         *  - predicateArray
         *  - enumValue
         * @param {Object} actionContext
         * @param {String} queryName
         * @param {Object} queryChainCacheObjectInternal
         * @param {Object} userQueryCacheConfig
         */
            function ( params, actionContext, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined )
            {
                // reference runtime context
                var runtime_ctx = this[ _ENUM.RUNTIME.RTC ];

                // check cache for this query
                var isCacheHit = _CACHE.cacheCommons.tryToLoad( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, runtime_ctx.collectionIndex );

                // not found cached result for this query
                if ( !isCacheHit )
                {
                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = actionContext.itemStructureChangeObject.requiresChange;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName = queryName;
                    runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = actionContext.itemStructureChangeObject.triggeringQueryName;


                    // invoke core logic
                    var pfr = _PHYSICAL_FILTER.executeAllAnyFilter(
                        this,
                        params.predicateArray,
                        params.enumValue
                    );

                    // cache the query result
                    _CACHE.cacheCommons.store( true, pfr );

                    // return physical filter result (pfr)
                    return pfr;
                }
            }
    };



    // private logical filters object
    var _LOGICAL_FILTER = {
        applyLogicalBoolFilter: /**
         * @param {any} currentObject
         * @param {any} predicateArray
         * @param {any} elementIndex
         * @param {bool} throwErrorWhenNullOrUndefined
         */
            function ( currentObject, predicateArray, elementIndex, throwErrorWhenNullOrUndefined )
            {
                return apply_LBF_I_1L( currentObject, predicateArray, elementIndex, throwErrorWhenNullOrUndefined );



                /**
                 * Local helper functions
                */
                function apply_LBF_I_1L ( currentObject, predicateArray, elementIndex, letThrowError )
                {
                    // flag that tells whether object passes or fails the filter => bool operation result
                    var bor = true;

                    // current filter (cf)
                    var cf;
                    // loop over predicates
                    for ( var i = 0; i < predicateArray.length; i++ )
                    {
                        // access current filter
                        cf = predicateArray[ i ];

                        // determine the type of filter, i.e. user-defined function or a primitive one (string, int, float)
                        if ( typeof cf === 'object' )
                            // apply predefined basic comparison operators
                            bor = applyPrimitivePredicate_I_2L( cf, currentObject );
                        else if ( typeof cf === 'function' )
                            // apply predefined user-defined comparison function
                            bor = applyUdfPredicate_I_2L( cf, currentObject, elementIndex );

                        // check ASAP if object failed the filter
                        if ( !bor )
                            break;
                    }

                    // return filtering result, aka bool operation result (true/false)
                    return bor;



                    /**
                     * Local helper functions
                    */
                    function applyPrimitivePredicate_I_2L ( predicate, obj )
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

                        // navigate to the destination property of the current object, execute the filter and return the bool operation result
                        return executePrimitivePredicate_I_3L();



                        /**
                         * Local helper functions
                        */
                        function executePrimitivePredicate_I_3L ()
                        {
                            // property value holder (pvh)
                            var pvh;

                            // determine if the current object is primitive one, i.e. int, string, number, boolean, etc.
                            var is_prim = _COMMON.isPrimitiveType( obj );

                            // if is primitive...
                            if ( is_prim )
                                pvh = obj;
                            else
                                // otherwise seek the destination property
                                pvh = _LOGICAL_FILTER.applyPropertyValueFilter( obj, propName, true, letThrowError );

                            // run native comparison
                            return _OPERATOR.checkValue( pvh, propOperator, propValue );
                        }
                    }

                    function applyUdfPredicate_I_2L ( predicate, currentObject, elementIndex )
                    {
                        /**
                         * 1. Bind current collection object to user-defined function - having some predefined values - with 'bind' keyword
                         *
                         * 2. Invoke a filter with '()'
                         *
                         * 3. return the filter result, aka bool operation result
                         *
                        */

                        return predicate.bind( null, currentObject, elementIndex )();
                    }
                }
            },

        applyLogicalWhereFilter: /**
         * @param {any} currentColl
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( currentColl, predicateArray, enumValue )
            {
                return apply_LWF_I_1L( currentColl, predicateArray, enumValue );



                /**
                 * Local helper functions
                */
                function apply_LWF_I_1L ( currentColl, predicateArray, enumValue )
                {
                    // declare bool operation result (bor)
                    var bor = false;


                    // current object
                    var c_o;
                    // loop over current collection and apply filters
                    for ( var i = 0; i < currentColl.length; i++ )
                    {
                        // access current object
                        c_o = currentColl[ i ];

                        // apply where filter(s) and get the result
                        bor = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i, enumValue === _ENUM.ALL );

                        // based on filtering result (true/false) trigger further action
                        if ( enumValue === _ENUM.ALL && !bor )
                            break;
                        else if ( enumValue === _ENUM.ANY && bor )
                            break;
                    }

                    // return the bool operation result
                    return bor;
                }
            },

        applyPropertyValueFilter: /**
         * @param {any} currentObject
         * @param {any} propertyName
         * @param {any} returnValue
         * @param {bool} throwErrorWhenNullOrUndefined
         */
            function ( currentObject, propertyName, returnValue, throwErrorWhenNullOrUndefined )
            {
                return apply_PVF_I_1L( currentObject, propertyName, returnValue, throwErrorWhenNullOrUndefined );



                /**
                 * Local helper functions
                */
                function apply_PVF_I_1L ( obj, pn, rv, letThrowError )
                {
                    // create array of prop's path
                    var path_arr = pn.split( '.' );

                    // loop iteration count
                    var length = rv ? path_arr.length : path_arr.length - 1;

                    // return value of the property or property
                    return _COMMON.seekPropertyOrThrowErrorIfRequired( obj, pn, length, letThrowError );
                }
            }
    };

    // private physical filters object
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
                */
                function execute_WF_I_1L ( jlc, predicateArray, skipOrTakeEnum )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    if (
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                        ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                    )
                        _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                    // declare current intermediate collection
                    var c_i_c = [];

                    // bool operation result (bor) ; current object (c_o)
                    var bor, c_o;
                    // if we're dealing with skipWhile...
                    if ( skipOrTakeEnum === _ENUM.SKIP )
                    {
                        // loop over current collection and apply filters
                        for ( var i = 0; i < currentColl.length; i++ )
                        {
                            // access current object
                            c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            bor = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i, true );

                            // if object didn't pass the filter
                            if ( !bor )
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
                            c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            bor = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i, true );

                            // if object passed the filter
                            if ( bor )
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
                            c_o = currentColl[ i ];

                            // apply where filter(s) and get the result
                            bor = _LOGICAL_FILTER.applyLogicalBoolFilter( c_o, predicateArray, i, true );

                            // based on filtering result (true/false) pass object further down the flow
                            if ( bor )
                                c_i_c.push( c_o );
                        }
                    }

                    // update HPID object to enable further data flow
                    _ACTION.hpid.data = c_i_c;
                    if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                }
            },

        executeGroupByFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} udfGroupKeySelector
         * @param {any} udfEqualityComparer
         * @param {any} udfGroupKeyProjector
         * @param {any} udfGroupElementSelector
         * @param {any} udfGroupResultValueSelector
         * @param {any} terminateFlowAndReturnData
         * @param {any} isDictionaryContext
         */
            function ( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupKeyProjector, udfGroupElementSelector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
            {
                return execute_GF_I_1L( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupKeyProjector, udfGroupElementSelector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext );



                /**
                 * Local helper functions
                */
                function execute_GF_I_1L ( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupKeyProjector, udfGroupElementSelector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // check if grouping key is present
                    if ( predicateArray || udfGroupKeySelector )
                    {
                        // get contextually current collection within history array
                        var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                        /**
                         * Update collection item structure metadata object of ice metadata object of the current runtime context
                        */
                        if (
                            r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                            ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                        )
                            _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                        // declare groups object being an array !
                        var groups = [];


                        // create the key if key selector array defined
                        var key_array;
                        if ( predicateArray )
                            key_array = _COMMON.createCompoundKey( predicateArray );
                        else
                            // otherwise define an empty array
                            key_array = [];


                        // reference first object in the collection and determine the type ASAP
                        var o = currentColl[ 0 ];

                        // reference grouping-by util object
                        var gbo = _COMMON.usingGroupingBy();


                        // do grouping of primitives
                        if ( _COMMON.isPrimitiveType( o ) )
                            currentColl.forEach( groupPrimitives_I_2L );
                        // do grouping of objects
                        else
                            currentColl.forEach( groupObjects_I_2L );


                        // sort the groups by using user-defined equality comparer (if defined) or a default comparator (Array.sort)
                        //groups = sortGroups_I_2L( udfEqualityComparer );


                        // if user defined result value selector
                        if ( udfGroupResultValueSelector )
                        {
                            // result value array
                            var rva = [];

                            // iterate over all groups and transform each group into result value defined by the user
                            for ( let group of groups )
                            {
                                // handle dictionary context
                                if ( isDictionaryContext )
                                    rva.push( udfGroupResultValueSelector( group.key, group.value, isDictionaryContext ) );
                                // handle grouping object context
                                else
                                    rva.push( udfGroupResultValueSelector( group.key, group.resultsView, isDictionaryContext ) );
                            }

                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = rva;
                        }
                        // otherwise keep sorted groups
                        else
                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = groups;


                        // ensure that HPID is turned on
                        if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                        // check if terminate data flow
                        if ( terminateFlowAndReturnData )
                            _ACTION.hpid.done = true;
                    }
                    // otherwise throw error
                    else
                        throw new Error( '\r\n\'groupBy\' query method requires a grouping key selector to be present.\r\nCurrent invocation is missing the grouping key selector (primitive one || UDF) !\r\n\r\n' );



                    /**
                     * Local helper functions
                    */
                    function groupPrimitives_I_2L ( item, index, sourceColl )
                    {
                        // group id
                        var id;
                        // get the group id by applying UDF to current primitive value
                        if ( udfGroupKeySelector )
                            id = ( udfGroupKeySelector.bind( r_ctx, item, index, sourceColl ) )();
                        // get the group id being the primitive value itself
                        else
                            id = item;


                        // project group id if required
                        if ( udfGroupKeyProjector )
                            id = ( udfGroupKeyProjector.bind( r_ctx, id ) )();

                        // project group element if required
                        if ( udfGroupElementSelector )
                            item = ( udfGroupElementSelector.bind( r_ctx, item ) )();


                        /**
                         * Distinguish between dictionary and grouped objects
                         *  - dictionary keys has to be unique
                         *  - values are primitives values or objects, not single elements of array 
                        */
                        if ( isDictionaryContext && gbo.getKVP( id, groups ).value )
                            throw new Error( '\r\nItem with the same key was already added to this dictionary object !\r\n\r\n' );

                        // create pure empty object
                        var eo = Object.create( null );

                        // handle dictionary
                        if ( isDictionaryContext )
                        {
                            // define object as a KVP object (KeyValuePair)
                            eo.key = id;
                            eo.value = item;

                            // store KVP object
                            groups.push( eo );
                        }
                        // handle grouping object
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

                    function groupObjects_I_2L ( item )
                    {
                        // if grouping key is not defined & UDF key selector is required
                        if ( !key_array.length && !predicateArray )
                            key_array = udfGroupKeySelector.bind( r_ctx, item )();

                        // get the group id
                        var id = _COMMON.fetchObjectKeyValue( item, key_array );

                        // project group id if required
                        if ( udfGroupKeyProjector )
                            id = ( udfGroupKeyProjector.bind( r_ctx, id ) )();

                        // project group element if required
                        if ( udfGroupElementSelector )
                            item = ( udfGroupElementSelector.bind( r_ctx, item ) )();


                        /**
                         * Distinguish between dictionary and grouped objects
                         *  - dictionary keys have to be unique
                         *  - values are primitives values or objects, not single elements of array
                        */
                        if ( isDictionaryContext && gbo.getKVP( id, groups ).value )
                            throw new Error( '\r\nItem with the same key was already added to this dictionary object !\r\n\r\n' );

                        // create pure empty object
                        var eo = Object.create( null );

                        // handle dictionary
                        if ( isDictionaryContext )
                        {
                            // define object as a KVP object (KeyValuePair)
                            eo.key = id;
                            eo.value = item;

                            // store KVP object
                            groups.push( eo );
                        }
                        // handle grouping object
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

                    function sortGroups_I_2L ( equalityComparer )
                    {
                        // declare array of group keys
                        var keys = [];

                        // loop over all grouping objects
                        for ( var i = 0; i < groups.length; i++ )
                            // store current group key
                            keys.push( groups[ i ].key );

                        // sort the keys using UDF comparator
                        if ( udfEqualityComparer )
                            keys.sort( equalityComparer );
                        // sort the keys in ascending ASCII character order
                        else
                            keys.sort();

                        // declare object holding sorted groups
                        var sorted_groups = [];

                        // handle dictionary
                        if ( isDictionaryContext )
                        {

                            // store grouped objects sorted in a proper way
                            keys.forEach( function ( key )
                            {
                                // get KVP object from the dictionary
                                var kvp = gbo.getKVP( key, groups );

                                // push kvp to sorted dictionary
                                sorted_groups.push( kvp );
                            } );
                        }
                        // handle grouping object
                        else
                        {
                            // store grouped objects sorted in a proper way
                            keys.forEach( function ( key )
                            {
                                // get grouping seeker object from the group
                                var gso = gbo.getGrouping( key, groups );

                                // reset gso's index
                                gso.idx = -1;

                                // update grouping object
                                gbo.setGrouping( key, gso, sorted_groups );
                            } );
                        }

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
                return execute_RF_I_1L( jlc, predicateArray, index, count, enumValue );



                /**
                 * Local helper functions
                */
                function execute_RF_I_1L ( jlc, predicateArray, index, count, enumValue )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


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
                    */
                    function getResult_I_2L ( withPredicates )
                    {
                        // get contextually current collection within history array
                        var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


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
                                    if ( index < 0 || count < 0 )
                                    {
                                        if ( index < 0 ) throw new Error( '\r\nA non-negative number is required.\r\nParameter name: index.\r\n\r\n' );

                                        if ( count < 0 ) throw new Error( '\r\nA non-negative number is required.\r\nParameter name: count.\r\n\r\n' );
                                    }
                                    // determine the valid range of sequence to reverse
                                    else if ( ( index || index === 0 ) && count )
                                    {
                                        if ( index + count - 1 > currentColl.length - 1 )
                                            throw new Error( '\r\nThe offset and length values are either outside the range of the array, or the number exceeds the number of items between the index and the end of the source collection.\r\n\r\n' );
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
                                    else if ( ( index || index === 0 ) && count === 0 )
                                        ;
                                    else if ( count )
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
                                    // reverse whole collection
                                    else
                                    {
                                        // reverse the whole sequence
                                        for ( i = currentColl.length - 1; i >= 0; i-- )
                                            r_seq.push( currentColl[ i ] );

                                        // replace original sequence with the reversed sequence
                                        currentColl = r_seq;
                                    }

                                    // this flag tells to discard returned result and go for hpid's data
                                    _ACTION.hpid.done = true;

                                    break;

                                case _ENUM.SKIP:
                                    // process skip only (no predicates, just count), because skipWhile was handled by executing the "WHERE" filter in the parent method
                                    if ( !withPredicates )
                                    {
                                        // for null or undefined count just throw an error
                                        if ( !count && count !== 0 )
                                            throw new Error( '\r\nSupply required parameter called \'count\' !\r\n\r\n' );

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
                                        else if ( count <= 0 )
                                            r_seq = currentColl;

                                        // replace original sequence with the new sequence
                                        currentColl = r_seq;
                                    }

                                    break;

                                case _ENUM.TAKE:
                                    // process take only (no predicates, just count), because takeWhile was handled by executing the "WHERE" filter in the parent method
                                    if ( !withPredicates )
                                    {
                                        // for null or undefined count just throw an error
                                        if ( !count && count !== 0 )
                                            throw new Error( '\r\nSupply required parameter called \'count\' !\r\n\r\n' );

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

                                case _ENUM.ELEMENT_AT:
                                    /**
                                     * In case of 'elementAt' & 'elementAtOrDefault' methods:
                                     *  - there is no 'predicateArray' param
                                     *  - param called 'count' actually contains value of param called 'fallbackOnDefault'
                                     * 
                                    */

                                    // handle out of range exception in the method called 'elementAt'
                                    if ( ( index < 0 || index >= currentColl.length ) && !count )
                                        throw new Error( '\r\nThe index was out of range.\r\nMust be non-negative and less than the size of the collection.\r\nParameter name: \'index\' !\r\n\r\n' );
                                    // handle out of range exception in the method called 'elementAtOrDefault'
                                    else if ( ( index < 0 || index >= currentColl.length ) && count )
                                    {
                                        // fetch the default value of the collection input type
                                        var default_value = r_ctx.cdv;

                                        // if default value is an object go in line with C# and return the default of C#'s object, which is null that translates to undefined in JavaScript
                                        if ( _COMMON.convertTypeToString( default_value ) === _ENUM.T2SR.OBJECT )
                                            currentColl = undefined;
                                        // otherwise return the computed default value
                                        else
                                            currentColl = default_value;

                                        // this flag tells to discard returned result and go for hpid's data
                                        _ACTION.hpid.done = true;

                                        break;
                                    }
                                    // otherwise return element at the specified position
                                    else
                                    {
                                        // fetch the item at given index
                                        currentColl = currentColl[ index ];

                                        // this flag tells to discard returned result and go for hpid's data
                                        _ACTION.hpid.done = true;

                                        break;
                                    }

                                default:
                                    throw new Error( '\r\nUnrecognized query name called \'' + _COMMON.getCustomValueOfSymbol( enumValue ) + '\' !\r\n\r\n' );
                            }

                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = currentColl;
                            if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                        }
                    }
                }
            },

        executeSetFilter: /**
         * @param {any} jlc
         * @param {any} collectionOrItem
         * @param {any} udfEqualityComparer
         * @param {any} strongSearch
         * @param {any} enumValue
         */
            function ( jlc, collectionOrItem, udfEqualityComparer, strongSearch, enumValue )
            {
                return execute_SF_I_1L( jlc, collectionOrItem, udfEqualityComparer, strongSearch, enumValue );



                /**
                 * Local helper functions
                */
                function execute_SF_I_1L ( jlc, collectionOrItem, udfEqualityComparer, strongSearch, enumValue )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    if (
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                        ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                    )
                        _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                    // if the sequence contains elements
                    if ( currentColl.length )
                    {
                        switch ( enumValue )
                        {
                            case _ENUM.CONTAINS:
                                // if the parameter called 'collectionOrItem' is not a single object, throw the error
                                if ( _COMMON.convertTypeToString( collectionOrItem ) === _ENUM.T2SR.ARRAY )
                                    throw new Error( '\r\nInput type of parameter called \'collectionOrItem\' in the context of "' + _COMMON.getCustomValueOfSymbol( _ENUM.CONTAINS ).toLowerCase() + '" query method has to be ' + ( r_ctx.currentQueryIceMetaObject.is_prim ? 'a primitive' : 'an object' ) + ' !\r\n\r\n' );

                                // determine whether source collection contains particular item, i.e get match object array (match_arr)
                                var match_arr = doesContain_I_2L( currentColl, collectionOrItem, udfEqualityComparer, strongSearch );

                                // update temporary data state
                                currentColl = match_arr.length > 0;

                                // this flag tells to discard returned result and go for hpid's data
                                _ACTION.hpid.done = true;

                                break;

                            case _ENUM.DISTINCT:
                                // compute distinct collection
                                currentColl = makeDistinct_I_2L( currentColl, udfEqualityComparer, strongSearch );

                                break;

                            case _ENUM.EXCEPT:
                                // compare two sequences (collections) and find those elements which are not present in second sequence
                                currentColl = applyExcept_I_2L( currentColl, collectionOrItem, udfEqualityComparer, strongSearch );

                                break;

                            default:
                                throw new Error( '\r\nUnrecognized logical type of set-based operation [ ' + _COMMOn.getCustomValueOfSymbol( enumValue ) + ' ] !\r\n\r\n' );
                        }

                        // update HPID object to enable further data flow
                        _ACTION.hpid.data = currentColl;
                        if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                    }



                    /**
                     * Local helper functions
                    */
                    function doesContain_I_2L ( coll, item, udfComparer, isFullScan )
                    {
                        // array of match objects
                        var match_arr = [];


                        // declare whether match was found (match)
                        var match;
                        // determine whether to use UDF content comparer...
                        if ( udfComparer )
                        {
                            // iterate over whole collection
                            for ( var i = 0; i < coll.length; i++ )
                            {
                                // declare whether match was found (match)
                                match = Object.create( null );

                                // determine the match success
                                match.is = udfComparer( item, coll[ i ] );

                                // if match was found and not full scan, break the checking
                                if ( match.is )
                                {
                                    // store the index of the match
                                    match.index = i;

                                    // store match object
                                    match_arr.push( match );

                                    /**
                                     * Check the search mode
                                     *  - true -> scan the whole collection rather than stop at first match
                                     *  - false -> scan the collection until first match
                                    */
                                    if ( !isFullScan ) break;
                                }
                            }
                        }
                        // otherwise use internal content comparer...
                        else
                        {
                            // handle primitive types
                            if ( r_ctx.currentQueryIceMetaObject.is_prim )
                            {
                                // iterate over whole collection
                                for ( var i = 0; i < coll.length; i++ )
                                {
                                    // declare whether match was found (match)
                                    match = Object.create( null );

                                    // determine the match success
                                    match.is = coll[ i ] === item;

                                    // if match was found and not full scan, break the checking
                                    if ( match.is )
                                    {
                                        // store the index of the match
                                        match.index = i;

                                        // store match object
                                        match_arr.push( match );

                                        /**
                                         * Check the search mode
                                         *  - true -> scan the whole collection rather than stop at first match
                                         *  - false -> scan the collection until first match
                                        */
                                        if ( !isFullScan ) break;
                                    }
                                }
                            }
                            // handle objects
                            else
                            {
                                // iterate over whole collection
                                for ( var i = 0; i < coll.length; i++ )
                                {
                                    // declare whether match was found (match)
                                    match = Object.create( null );

                                    // determine the match success
                                    match.is = _COMMON.useDefaultObjectContentComparer( item, coll[ i ] );

                                    // if match was found and not full scan, break the checking
                                    if ( match.is )
                                    {
                                        // store the index of the match
                                        match.index = i;

                                        // store match object
                                        match_arr.push( match );

                                        /**
                                         * Check the search mode
                                         *  - true -> scan the whole collection rather than stop at first match
                                         *  - false -> scan the collection until first match
                                        */
                                        if ( !isFullScan ) break;
                                    }
                                }
                            }
                        }

                        // return match array
                        return match_arr;
                    }

                    function makeDistinct_I_2L ( coll, comparer, strongSearch )
                    {
                        // filter the collection if there are any items
                        if ( coll.length )
                        {
                            // declare distinct collection holder
                            var distinct_coll = [];

                            // push the first item from a source collection 
                            distinct_coll.push( coll[ 0 ] );

                            // declare current item (ci) and match object array (match_arr)
                            var ci, match_arr;

                            // iterate over whole collection starting from the second item in the collection
                            for ( var i = 1; i < coll.length; i++ )
                            {
                                // access current item in the collection
                                ci = coll[ i ];

                                // get the match object array (match_arr)
                                match_arr = doesContain_I_2L( distinct_coll, ci, comparer, strongSearch );

                                // if match wasn't found, add such item to the distinct collection
                                if ( !match_arr.length )
                                    distinct_coll.push( ci );
                            }

                            // return distinct collection
                            return distinct_coll;
                        }
                        // otherwise return execution to the caller
                        else return coll;
                    }

                    function applyExcept_I_2L ( coll, collection, comparer, strongSearch )
                    {
                        /**
                         * Filter the collection called 'coll' if there are any items in the collection called 'collection'.
                         * If the parameter called 'collection' is a single object, make it a one-item collection.
                        */

                        // make parameter called 'collection' a one-item collection, if necessary
                        if ( !Array.isArray( collection ) )
                            collection = [ collection ];

                        // assert that both collection are non-empty
                        if ( collection.length && coll.length )
                        {
                            // apply defensive copy
                            coll = [ ...coll ];

                            // store indices of items to be removed from the query flow collection
                            var indexes = [];

                            // declare current item (ci) and match object array (match_arr)
                            var ci, match_arr;
                            // iterate over whole collection
                            for ( var i = 0; i < collection.length; i++ )
                            {
                                // access current item in the collection
                                ci = collection[ i ];

                                // get the match object array (match_arr)
                                match_arr = doesContain_I_2L( coll, ci, comparer, strongSearch );

                                // if match was found
                                if ( match_arr.length > 0 )
                                {
                                    match_arr.forEach( function ( match )
                                    {
                                        // add such item index to the indexes array
                                        indexes.push( match.index );
                                    } );
                                }
                            }

                            /**
                             * Remove all required items
                            */
                            var exceptColl = [];

                            for ( var i = 0; i < coll.length; i++ )
                            {
                                // skip items that should not be included !
                                if ( indexes.includes( i ) ) continue;

                                // add items to the output collection
                                exceptColl.push( coll[ i ] );
                            }

                            // return query flow collection without collection in question
                            return exceptColl;
                        }
                        // otherwise return execution to the caller
                        else return coll;
                    }
                }
            },

        executeSelectFilter: /**
         * @param {any} jlc
         * @param {any} selectorArray
         * @param {any} enumValue
         * @param {any} udfSelector
         * @param {any} incorporateIndex
         */
            function ( jlc, selectorArray, enumValue, udfSelector, udfResultSelector, incorporateIndex )
            {
                return execute_SF_I_1L( jlc, selectorArray, enumValue, udfSelector, udfResultSelector, incorporateIndex );



                /**
                 * Local helper functions
                */
                function execute_SF_I_1L ( jlc, selectorArray, enumValue, udfSelector, udfResultSelector, incorporateIndex )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    if (
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                        ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                    )
                        _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                    // if the sequence contains elements
                    if ( currentColl.length )
                    {
                        switch ( enumValue )
                        {
                            case _ENUM.SELECT:
                                // determine whether source collection contains particular item
                                currentColl = processSelect_I_2L( currentColl, selectorArray, udfSelector, incorporateIndex );

                                break;

                            case _ENUM.SELECT_MANY:
                                // compute distinct collection
                                currentColl = processSelectMany_I_2L( currentColl, selectorArray, udfSelector, udfResultSelector, incorporateIndex );

                                break;

                            default:
                                throw new Error( '\r\nUnrecognized logical type of set-based operation [ ' + _COMMON.getCustomValueOfSymbol( enumValue ) + ' ] !\r\n\r\n' );
                        }

                        // update HPID object to enable further data flow
                        _ACTION.hpid.data = currentColl;
                        if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                    }



                    /**
                     * Local helper functions
                    */
                    function processSelect_I_2L ( currentColl, selectorArray, udfSelector, incorporateIndex )
                    {
                        // declare output array
                        var result = [];

                        /**
                         * Determine the type of select operations
                         *  - selectorArray.length > 1    ->  go for UDF (user-defined function)
                         *  - selectorArray.length === 1  ->  go for LDF (library-defined function)
                        */

                        // object props to be extracted
                        var selectors = _ACTION.hpid.columnSet.extractOVC( selectorArray, false );

                        // apply UDF
                        if ( selectorArray.length > 1 )
                        {
                            // if user failed to provide UDF selector
                            if ( !udfSelector )
                                throw new Error( '\r\nSelecting multiple properties from an object requires providing custom result selector called \'udfSelector\' !\r\n\r\n' );

                            // current array item processed by UDF selector
                            var item;
                            // iterate over whole collection
                            for ( var i = 0; i < currentColl.length; i++ )
                            {
                                // process current array item
                                item = udfSelector( currentColl[ i ], selectors, incorporateIndex ? i : undefined );

                                // store item in the array
                                result.push( item );
                            }
                        }
                        // apply LDF
                        else if ( selectorArray.length === 1 )
                        {
                            // current array item processed by LDF selector
                            var item;
                            // iterate over whole collection
                            for ( var i = 0; i < currentColl.length; i++ )
                            {
                                // process current array item
                                item = ldfSelector_I_2L( currentColl[ i ], selectors, incorporateIndex ? i : undefined, true );

                                // store item in the array
                                result.push( item );
                            }
                        }

                        // return result
                        return result;
                    }

                    function processSelectMany_I_2L ( currentColl, selectorArray, udfSelector, udfResultSelector, incorporateIndex )
                    {
                        // declare output array
                        var result = [];

                        /**
                         * Determine the type of select operations
                         *  - selectorArray.length > 1    ->  go for UDF (user-defined function)
                         *  - selectorArray.length === 1  ->  go for LDF (library-defined function)
                        */

                        // object props to be extracted
                        var selectors = _ACTION.hpid.columnSet.extractOVC( selectorArray, false );

                        // apply UDF
                        if ( selectorArray.length > 1 )
                        {
                            // if user failed to provide UDF selector
                            if ( !udfSelector )
                                throw new Error( '\r\nSelecting multiple properties from an object requires providing custom result selector called \'udfSelector\' !\r\n\r\n' );

                            // current array item processed by UDF selector; input item from a input collection; array holding processed input items
                            var item, ci, interimArr;

                            // iterate over whole collection
                            for ( var i = 0; i < currentColl.length; i++ )
                            {
                                // declare array for this loop iteration
                                interimArr = [];

                                // access current item
                                ci = currentColl[ i ];

                                // process current array item
                                item = udfSelector( ci, selectors, incorporateIndex ? i : undefined );
                                interimArr.push( item );

                                /**
                                 * If udfResultSelector is NOT NULL :
                                 *  a) then just iterate over all array and apply UDF Result Selector to each item
                                 *  b) otherwise just iterate over all array and flatten it
                                */

                                // a)
                                if ( udfResultSelector )
                                {
                                    // iterate over all array
                                    for ( var j = 0; j < interimArr.length; j++ )
                                    {
                                        // apply UDF Result Selector to each item
                                        item = udfResultSelector( ci, interimArr[ j ] );

                                        // store transformed item in the array
                                        result.push( item );
                                    }
                                }
                                // b)
                                else
                                {
                                    // just concat this interim array to the output array
                                    result.push( ...interimArr );
                                }
                            }
                        }
                        // apply LDF
                        else if ( selectorArray.length === 1 )
                        {
                            // current array item processed by LDF selector
                            var item;
                            // iterate over whole collection
                            for ( var i = 0; i < currentColl.length; i++ )
                            {
                                // process current array item
                                item = ldfSelector_I_2L( currentColl[ i ], selectors, incorporateIndex ? i : undefined );

                                // just concat this subitem array to the output array
                                result.push( ...item );
                            }
                        }

                        // return result
                        return result;
                    }

                    function ldfSelector_I_2L ( item, selectors, idx, keepTheShape )
                    {
                        // get the property value from the object in question
                        var value = _COMMON.getPropertyValueFromObject( selectors[ 0 ], item, false, false );

                        // preserve the shape of the value fetched from the source (select)
                        if ( keepTheShape )
                            // return an array of value whatever the value holds
                            return createArrayItem_I_3L( value );
                        // flatten the value fetched from the source whatever the value holds (selectMany)
                        else
                        {
                            // check the type
                            var is_prim = _COMMON.isPrimitiveType( value );

                            // flatten if is primitive type and the value is iterable
                            if ( is_prim && value[ "length" ] )
                            {
                                // flatten the value
                                return flattenValue_I_3L( value );
                            }
                            // just throw TypeError if is primitive type the value is not iterable
                            else if ( is_prim && !value[ "length" ] )
                            {
                                throw new TypeError( '\r\n Selected property [ ' + selectors[ 0 ] + ' ] is not iterable in the context of "selectMany" !\r\n\r\n' );
                            }
                            // is Array
                            else if ( !is_prim && Array.isArray( value ) )
                            {
                                // flatten the value
                                return flattenValue_I_3L( value );
                            }
                            // is object
                            else if ( !is_prim && typeof value === 'object' )
                                // return an array of one object or one something else
                                return createArrayItem_I_3L( value );
                            // is object or something else
                            else if ( !is_prim && typeof value !== 'object' )
                                // return an array of one something else
                                return createArrayItem_I_3L( value );
                        }



                        /**
                         * Local helper functions
                        */
                        function flattenValue_I_3L ( value )
                        {
                            // declare an array
                            var output = [];

                            // flatten the value
                            for ( let v of value ) output.push( v );

                            // return the array
                            return output;
                        }

                        function createArrayItem_I_3L ( value )
                        {
                            // return one-item array consisting of this value
                            return [ value ];
                        }
                    }
                }
            },

        executeJoinFilter: /**
         * @param {any} jlc
         * @param {any} innerColl
         * @param {any} outerSelectorArray
         * @param {any} outerUdfSelector
         * @param {any} innerSelectorArray
         * @param {any} innerUdfSelector
         * @param {any} enumValue
         * @param {any} udfResultSelector
         * @param {any} udfEqualityComparer
         */
            function ( jlc, innerColl, outerSelectorArray, outerUdfSelector, innerSelectorArray, innerUdfSelector, enumValue, udfResultSelector, udfEqualityComparer )
            {
                return execute_JF_I_1L( jlc, innerColl, outerSelectorArray, outerUdfSelector, innerSelectorArray, innerUdfSelector, enumValue, udfResultSelector, udfEqualityComparer );



                /**
                 * Local helper functions
                */
                function execute_JF_I_1L (
                    jlc,
                    innerColl,
                    outerSelectorArray, outerUdfSelector, innerSelectorArray, innerUdfSelector,
                    enumValue, udfResultSelector, udfEqualityComparer
                )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );

                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    if (
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                        ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                    )
                        _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                    // if the sequence contains elements
                    if ( currentColl.length )
                    {
                        switch ( enumValue )
                        {
                            case _ENUM.JOIN:
                                // join two sequences (collections) based on keys present in both sequences
                                currentColl = handleJoinOrLeftJoinOrGroupJoinOperation_I_2L( false );
                                break;

                            case _ENUM.LEFT_JOIN:
                                // left join two sequences (collections) based on key present in an outer (preserved) sequence and/or key present in an inner sequence
                                currentColl = handleJoinOrLeftJoinOrGroupJoinOperation_I_2L( true );
                                break;

                            case _ENUM.GROUP_JOIN:
                                // join two sequences (collections) based on keys present in both sequences, and subsequently group result by the key
                                currentColl = handleJoinOrLeftJoinOrGroupJoinOperation_I_2L( false, true );
                                break;

                            case _ENUM.GROUP_LEFT_JOIN:
                                // left join two sequences (collections) based on key present in an outer (preserved) sequence and/or key present in an inner sequence, and subsequently group result by the key
                                currentColl = handleJoinOrLeftJoinOrGroupJoinOperation_I_2L( true, true );
                                break;

                            default:
                                throw new Error( '\r\nUnrecognized logical type of set-based operation [ ' + _COMMON.getCustomValueOfSymbol( enumValue ) + ' ] !\r\n\r\n' );
                        }

                        // update HPID object to enable further data flow
                        _ACTION.hpid.data = currentColl;
                        if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                    }



                    /**
                     * Local helper functions
                    */
                    function handleJoinOrLeftJoinOrGroupJoinOperation_I_2L ( isCollectionFixed, doGrouping )
                    {
                        // if 'right-side' operand is not null
                        if ( innerColl.length )
                        {
                            // declare output array
                            var result = [];

                            // declare variable eventually to be an array of metadata, from which you create the joining key
                            var predicateArray;

                            // user provided 'left-side' && 'right-side' metadata (keys && UDF key extractor) to perform JOIN operation
                            if ( outerSelectorArray && outerUdfSelector && innerSelectorArray && innerUdfSelector )
                            {
                                executeOperation_UDF_I_3L( outerUdfSelector, outerSelectorArray, innerUdfSelector, innerSelectorArray );

                                // create right format for creating compound key if in the context of GROUP JOIN or GROUP LEFT JOIN
                                if ( doGrouping )
                                    predicateArray = outerSelectorArray;
                            }
                            // user provided only 'left-side' metadata (keys && UDF key extractor) to perform JOIN operation
                            else if ( outerSelectorArray && outerUdfSelector && !innerSelectorArray && !innerUdfSelector )
                            {
                                executeOperation_UDF_I_3L( outerUdfSelector, outerSelectorArray, outerUdfSelector, outerSelectorArray );

                                // create right format for creating compound key if in the context of GROUP JOIN or GROUP LEFT JOIN
                                if ( doGrouping )
                                    predicateArray = outerSelectorArray;
                            }
                            // user provided only 'right-side' metadata (keys && UDF key extractor) to perform JOIN operation
                            else if ( !outerSelectorArray && !outerUdfSelector && innerSelectorArray && innerUdfSelector )
                            {
                                executeOperation_UDF_I_3L( innerUdfSelector, innerSelectorArray, innerUdfSelector, innerSelectorArray );

                                // create right format for creating compound key if in the context of GROUP JOIN or GROUP LEFT JOIN
                                if ( doGrouping )
                                    predicateArray = innerSelectorArray;
                            }
                            // user provided only 'left-side' && 'right-side' keys to perform JOIN operation
                            else if ( outerSelectorArray && !outerUdfSelector && innerSelectorArray && !innerUdfSelector )
                            {
                                executeOperation_LDF_I_3L( outerSelectorArray, innerSelectorArray );

                                // create right format for creating compound key if in the context of GROUP JOIN or GROUP LEFT JOIN
                                if ( doGrouping )
                                    predicateArray = outerSelectorArray;
                            }
                            // user provided only 'left-side' && 'right-side' key extractors to perform JOIN operation
                            else if ( !outerSelectorArray && outerUdfSelector && !innerSelectorArray && innerUdfSelector )
                            {
                                executeOperation_LDF_I_3L( outerUdfSelector, innerUdfSelector );

                                // create right format for creating compound key if in the context of GROUP JOIN or GROUP LEFT JOIN
                                if ( doGrouping )
                                    throw new Error( '\r\nThe context of ' + _COMMON.getCustomValueOfSymbol( enumValue ) + ' requires providing valid \'outerSelectorArray\' and \'innerSelectorArray\' array key extractors !\r\n\r\n' );
                            }
                            else
                                throw new Error( '\r\nInvalid logical configuration (query method interface definition) for ' + _COMMON.getCustomValueOfSymbol( enumValue ) + '.\r\nDefine both types of selectors for both collections or any-but-the-same type of selectors for both collections !\r\n\r\n' );

                            /**
                             * Here we arrive with created JOIN result !
                             * Hence right here we can apply grouping type of operation in the context of aforementioned created result set. 
                            */

                            // if grouping required (GROUP JOIN || GROUP LEFT JOIN)
                            if ( doGrouping )
                            {
                                // declare groups object being an array !
                                var groups = [];

                                // reference grouping-by util object
                                var gbo = _COMMON.usingGroupingBy();

                                // loop over whole result set and apply grouping
                                result.forEach( groupResultSet_I_3L );

                                // return grouped joined object
                                return groups;
                            }

                            // return result
                            return result;
                        }
                        // in case 'right-side' operand being null just return the 'left-side' operand
                        else
                            return currentColl;



                        /**
                         * Local helper functions
                        */
                        function executeOperation_UDF_I_3L ( leftSideUdfSelector, leftSideSelectorArray, rightSideUdfSelector, rightSideSelectorArray )
                        {
                            var l_item, lskv;
                            // loop over 'left-side' collection to join it to the 'right-side' one
                            for ( var i = 0; i < currentColl.length; i++ )
                            {
                                // get current item from 'left-side' collection
                                l_item = currentColl[ i ];

                                // determine 'left-side' key value (lskv) being primitive value, array, object, etc.
                                lskv = leftSideUdfSelector( l_item, leftSideSelectorArray );

                                var r_item, isJoin;
                                // find the matching object in the 'right-side' collection - loop over 'right-side' collection to perform lookup
                                for ( var j = 0; j < innerColl.length; j++ )
                                {
                                    // get current item from 'right-side' collection
                                    r_item = innerColl[ j ];

                                    // perform 'right-side' key lookup
                                    isJoin = rightSideUdfSelector( r_item, rightSideSelectorArray, lskv );

                                    // if 'right-side' key lookup found, go to create result object
                                    if ( isJoin ) break;
                                    // otherwise mark that 'left-side' item has no match in the 'right-side' collection
                                    else r_item = undefined;
                                }

                                // check for 'LEFT JOIN' case
                                if ( isCollectionFixed && !r_item )
                                {
                                    // get object keys
                                    var keys = Object.getOwnPropertyNames( l_item );

                                    // discover default values for the 'right-side' collection object given current 'left-side' collection object
                                    r_item = assignDefaultValues_I_3L( l_item, keys, keys );
                                }

                                // create joined object if UDF Result Selector provided for 'LEFT JOIN' case
                                if ( udfResultSelector && isCollectionFixed )
                                    // store joined object in the output array
                                    result.push( udfResultSelector( l_item, r_item ) );
                                // create joined object if UDF Result Selector provided for 'INNER JOIN' case
                                else if ( udfResultSelector && r_item )
                                    // store joined object in the output array
                                    result.push( udfResultSelector( l_item, r_item ) );
                                // otherwise perfom default object merge operation
                                else if ( !udfResultSelector )
                                    // store merged object in the output array
                                    result.push( { ...l_item, ...r_item } );
                            }
                        }

                        function executeOperation_LDF_I_3L ( leftSideSelectorArrayOrUdf, rightSideSelectorArrayOrUdf )
                        {
                            // outer collection key object, inner collection key object, are both key objects value-equal
                            var l_key_obj, r_key_obj, isJoin;

                            // deal with function key extractors
                            if ( typeof leftSideSelectorArrayOrUdf === 'function' && typeof rightSideSelectorArrayOrUdf === 'function' )
                            {
                                // if user failed to provide equality UDF
                                if ( !udfEqualityComparer )
                                    throw new Error( '\r\nWhen performing JOIN operation using left-side && right-side array extractors only, you need to provide equality UDF !\r\n\r\n' );

                                // outer collection current item, inner collection current item
                                var l_obj_full, r_obj_full;

                                // loop over 'left-side' collection
                                for ( var i = 0; i < currentColl.length; i++ )
                                {
                                    // access current outer collection item
                                    l_obj_full = currentColl[ i ];

                                    // get the 'left-side' key object
                                    l_key_obj = leftSideSelectorArrayOrUdf( l_obj_full );

                                    // unmark joined object
                                    isJoin = false;

                                    // loop over 'right-side' collection
                                    for ( var j = 0; j < innerColl.length; j++ )
                                    {
                                        // access current outer collection item
                                        r_obj_full = innerColl[ j ];

                                        // get the 'right-side' key object
                                        r_key_obj = rightSideSelectorArrayOrUdf( r_obj_full );

                                        // if objects match the key
                                        if ( udfEqualityComparer( l_key_obj, r_key_obj ) )
                                        {
                                            // execute JOIN
                                            performJoinOperation_I_4L( l_obj_full, r_obj_full );

                                            // mark joined object
                                            isJoin = true;

                                            // break the 'right-side' collection loop
                                            break;
                                        }
                                    }

                                    // check for 'LEFT JOIN' case
                                    if ( isCollectionFixed && !isJoin )
                                        // execute LEFT JOIN
                                        performLeftJoinOperation_I_4L( l_obj_full );
                                }
                            }
                            // deal with array key extractors
                            else if ( Array.isArray( leftSideSelectorArrayOrUdf ) && Array.isArray( rightSideSelectorArrayOrUdf ) )
                            {
                                // loop over 'left-side' collection
                                for ( var i = 0; i < currentColl.length; i++ )
                                {
                                    // access current outer collection item
                                    l_obj_full = currentColl[ i ];

                                    // unmark joined object
                                    isJoin = false;

                                    // loop over 'right-side' collection
                                    for ( var j = 0; j < innerColl.length; j++ )
                                    {
                                        // access current outer collection item
                                        r_obj_full = innerColl[ j ];

                                        // if objects match the key
                                        if ( ldfEqualityComparer_I_4L( l_obj_full, r_obj_full, leftSideSelectorArrayOrUdf, rightSideSelectorArrayOrUdf ) )
                                        {
                                            // execute JOIN
                                            performJoinOperation_I_4L( l_obj_full, r_obj_full );

                                            // mark joined object
                                            isJoin = true;

                                            // break the 'right-side' collection loop
                                            break;
                                        }
                                    }

                                    // check for 'LEFT JOIN' case
                                    if ( isCollectionFixed && !isJoin )
                                        // execute LEFT JOIN
                                        performLeftJoinOperation_I_4L( l_obj_full );
                                }
                            }
                            else
                                throw new Error( '\r\nWhen performing JOIN operation using either left-side && right-side array extractors only or left-side && right-side function extractors only, you need to provide both of them being of the same type !\r\n\r\n' );



                            /**
                             * Local helper functions
                            */
                            function ldfEqualityComparer_I_4L ( left_obj, right_obj, left_key_arr, right_key_arr )
                            {
                                // is match
                                var isMatch;

                                // both arrays have to have matching keys
                                if ( left_key_arr.length !== right_key_arr.length )
                                    throw new Error( '\r\nWhen performing JOIN operation using left-side && right-side keys only, both arrays has to have matching keys !\r\n\r\n' );

                                // arrays of key values from both objects
                                var left_key_value_arr = [], right_key_value_arr = [];

                                // loop over 'left-side' and 'right-side' keys
                                for ( var k = 0; k < left_key_arr.length; k++ )
                                {
                                    // get key value from 'left-side' object
                                    left_key_value_arr.push( _COMMON.getPropertyValueFromObject( left_key_arr[ k ][ 0 ], left_obj, false, false ) );

                                    // get key value from 'right-side' object
                                    right_key_value_arr.push( _COMMON.getPropertyValueFromObject( right_key_arr[ k ][ 0 ], right_obj, false, false ) );
                                }

                                /**
                                 * Compare two arrays - use custom extension method called Array.equals.
                                 * See object called _EXTENSION in this library.
                                 *
                                */
                                // check if there is a 'JOIN' condition met by comparing two arrays
                                isMatch = left_key_value_arr.equals( right_key_value_arr ) === true;

                                // just return bool result, aka is there a 'JOIN' condition met
                                return isMatch;
                            }

                            function performJoinOperation_I_4L ( l_o, r_o )
                            {
                                // create join object
                                var joinedObj = Object.create( null );
                                joinedObj.left = Object.create( null );
                                joinedObj.right = Object.create( null );

                                // concat left object and right object, aka join them together
                                Object.assign( joinedObj.left, l_o );
                                Object.assign( joinedObj.right, r_o );

                                // store joined object in the final output array
                                result.push( joinedObj );
                            }

                            function performLeftJoinOperation_I_4L ( l_o )
                            {
                                // create join object
                                var leftJoinObj = Object.create( null );
                                leftJoinObj.left = Object.create( null );
                                leftJoinObj.right = Object.create( null );

                                // get the object keys
                                var keys = Object.getOwnPropertyNames( l_o );

                                // assign default values
                                r_key_obj = assignDefaultValues_I_3L( l_o, keys, keys );

                                // concat left object and right object, aka join them together
                                Object.assign( leftJoinObj.left, l_o );
                                Object.assign( leftJoinObj.right, r_key_obj );

                                // store joined object in the final output array
                                result.push( leftJoinObj );
                            }
                        }

                        function assignDefaultValues_I_3L ( sourceItem, sourceItemPropArray, outputItemPropArray )
                        {
                            // check if props match in corresponding objects
                            if ( sourceItemPropArray.length !== outputItemPropArray.length )
                                throw new Error( '\r\nInvalid number of keys in either left-side or right-side array !\r\n\r\n' );

                            // create output object
                            var outputItem = Object.create( null );

                            var default_value;
                            // loop over object props to discover defaults
                            for ( var i = 0; i < sourceItemPropArray.length; i++ )
                            {
                                // determine default value for current object prop
                                default_value = _COMMON.getDefaultValueOf( sourceItem[ sourceItemPropArray[ i ] ] );

                                // store this value in output object under "the proper" prop taken from the output object array of props
                                outputItem[ outputItemPropArray[ i ] ] = default_value;
                            }

                            // return output object
                            return outputItem;
                        }

                        function groupResultSet_I_3L ( item )
                        {
                            // create the key if key selector array defined
                            var key_array;
                            if ( predicateArray )
                                key_array = _COMMON.createCompoundKey( predicateArray );
                            else
                                // otherwise define an empty array
                                key_array = [];

                            // get the group id, aka the key used in JOIN or LEFT JOIN
                            var id = _COMMON.fetchObjectKeyValue( item.left || item.right, key_array );

                            // create pure empty object
                            var eo = Object.create( null );

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
                }
            },

        executeMathFilter: /**
         * @param {any} jlc
         * @param {any} propertyNameOrPath
         * @param {any} enumValue
         * @param {any} sortMetaObject
         * @param {any} sharedSecondLevelSortingContext
         * @param {any} roundEnumValue
         */
            function ( jlc, propertyNameOrPath, udfValueSelector, enumValue, sortMetaObject, sharedSecondLevelSortingContext, roundEnumValue )
            {
                return execute_MF_I_1L( jlc, propertyNameOrPath, udfValueSelector, enumValue, sortMetaObject, sharedSecondLevelSortingContext, roundEnumValue );



                /**
                 * Local helper functions
                */
                function execute_MF_I_1L ( jlc, propertyNameOrPath, udfValueSelector, enumValue, sortMetaObject, sharedSecondLevelSortingContext, roundEnumValue = _ENUM.AVG_MIN )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];



                    // cache mmavt meta object
                    var mmavt = r_ctx.minMaxAverageValueTypeObject;

                    // determine whether to use a UDF value selector...
                    if ( udfValueSelector && mmavt.selector )
                    {
                        // apply UDF value selector
                        filterCollectionByUdfValueSelector_I_2L();

                        // invoke internally 1st level sorting to optimize computing min, max, or average item in the collection
                        _PHYSICAL_FILTER.executeOrderFilter( jlc, null, null, _ENUM.ORDER.By.ASC, sortMetaObject, sharedSecondLevelSortingContext );
                    }
                    // ... or a internal comparator
                    else if ( mmavt.selector && mmavt.hadCollectionAtLeastTwoItems )
                        // invoke internally 1st level sorting to optimize computing min, max, or average item in the collection
                        _PHYSICAL_FILTER.executeOrderFilter( jlc, [ propertyNameOrPath, true ], null, _ENUM.ORDER.By.ASC, sortMetaObject, sharedSecondLevelSortingContext );
                    // ... or just init HPID storage
                    else if ( mmavt.selector && !mmavt.hadCollectionAtLeastTwoItems )
                        justInitHpid_I_2L();
                    // non-empty collection with empty params requires custom toString method implementation
                    else if ( !mmavt.selector && mmavt.throwByObjectStringError )
                        throw new Error( '\r\nNon-empty collection requires each item to implement custom toString method !\r\n\r\n' );


                    // get the right item from the collection based on 'enumValue' and/or 'roundEnumValue' flags
                    return getResult_I_2L();



                    /**
                     * Local helper functions
                    */
                    function filterCollectionByUdfValueSelector_I_2L ()
                    {
                        // get contextually current collection within history array
                        _DATA.fetchFlowData( r_ctx.collectionIndex, true );


                        // cache HPID data
                        var hpid_cache = [ ..._ACTION.hpid.data ];

                        // for each item extract value defined by the selector
                        hpid_cache.forEach( function ( item, index, arr )
                        {
                            arr[ index ] = _COMMON.getPropertyValueFromObject( mmavt.selector, item, false, false );
                        } );

                        // for each item apply UDF value selector
                        hpid_cache.forEach( udfValueSelector );


                        // update HPID
                        _ACTION.hpid.data = hpid_cache;
                    }

                    function justInitHpid_I_2L ()
                    {
                        // get contextually current collection within history array
                        _DATA.fetchFlowData( r_ctx.collectionIndex, true );
                    }

                    function getResult_I_2L ()
                    {
                        // check the edge case (empty collection)
                        if ( _ACTION.hpid.data.length === 0 )
                        {
                            // validate item
                            if ( ( enumValue === _ENUM.MIN || enumValue === _ENUM.MAX ) && ( mmavt.t2sr.type === _ENUM.T2SR.STRING || mmavt.t2sr.type === _ENUM.T2SR.OBJECT || mmavt.t2sr.type === _ENUM.T2SR.UNDEFINED ) )
                                return undefined;
                            else if ( enumValue === _ENUM.MIN || enumValue === _ENUM.MAX )
                                throw new Error( '\r\nThe sequence has no elements.\r\n\r\n' );
                            else if ( ( enumValue === _ENUM.AVG ) && ( mmavt.t2sr.type === _ENUM.T2SR.STRING || mmavt.t2sr.type === _ENUM.T2SR.BOOLEAN || mmavt.t2sr.type === _ENUM.T2SR.OBJECT ) )
                                throw new Error( '\r\nThere is no implicit conversion from type ' + mmavt.t2sr.type + ' to type ' + _ENUM.T2SR.NUMBER + '\r\n\r\n' );
                            else if ( ( enumValue === _ENUM.AVG ) && ( mmavt.t2sr.type === _ENUM.T2SR.NUMBER ) )
                                throw new Error( '\r\nThe sequence has no elements.\r\n\r\n' );
                        }
                        // check the edge case (one item in collection)
                        else if ( _ACTION.hpid.data.length === 1 )
                            // fetch item or item's property
                            return fetchItemOrItemProp_I_3L( 0 );
                        // handle min, max, average
                        else
                        {
                            // compute 'min' value
                            if ( enumValue === _ENUM.MIN )
                                // fetch item or item's property
                                return fetchItemOrItemProp_I_3L( 0 );
                            // compute 'max' value
                            else if ( enumValue === _ENUM.MAX )
                                // fetch item or item's property
                                return fetchItemOrItemProp_I_3L( _ACTION.hpid.data.length - 1 );
                            // compute 'avg' value
                            else if ( enumValue === _ENUM.AVG )
                            {
                                if ( mmavt.t2sr.type === _ENUM.T2SR.NUMBER )
                                {
                                    // precisely 'min avg'
                                    if ( roundEnumValue === _ENUM.AVG_MIN )
                                        // fetch item or item's property
                                        return fetchItemOrItemProp_I_3L( Math.floor( _ACTION.hpid.data.length / 2 ) - 1 );
                                    // precisely 'max avg'
                                    else if ( roundEnumValue === _ENUM.AVG_MAX )
                                        // fetch item or item's property
                                        return fetchItemOrItemProp_I_3L( Math.ceil( _ACTION.hpid.data.length / 2 ) - 1 );
                                }
                                else
                                    throw new Error( '\r\nThere is no implicit conversion from type ' + mmavt.t2sr.type + ' to type ' + _ENUM.T2SR.NUMBER + '\r\n\r\n' );
                            }
                        }



                        /**
                         * Local helper functions
                        */
                        function fetchItemOrItemProp_I_3L ( index )
                        {
                            // primitive value or object (pvoo) to be returned
                            var pvoo = _ACTION.hpid.data[ index ];

                            // return this item (object)
                            if ( mmavt.t2sr.isp && ( mmavt.t2sr.type === _ENUM.T2SR.OBJECT ) )
                                return pvoo;
                            // return this value (primitive value)
                            else if ( _COMMON.isPrimitiveType( pvoo ) && _COMMON.isPrimitiveType_T2SR( mmavt.t2sr.type ) )
                                return pvoo;
                            // return this value (item's property value)
                            else if ( !_COMMON.isPrimitiveType( pvoo ) && _COMMON.isPrimitiveType_T2SR( mmavt.t2sr.type ) )
                                return _COMMON.getPropertyValueFromObject( mmavt.selector, pvoo, false, false );
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
                return execute_OIF_I_1L( jlc, predicateArray, fallbackOnDefault, enumValue );



                /**
                 * Local helper functions
                */
                function execute_OIF_I_1L ( jlc, predicateArray, fallbackOnDefault, enumValue )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];



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
                    */
                    function getResult_I_2L ( withPredicates )
                    {
                        // get contextually current collection within history array
                        var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                        // check for '_ENUM.DEFAULT' if collection != null
                        if ( ( enumValue === _ENUM.DEFAULT ) && !_ACTION.hpid.data )
                            throw new Error( '\r\nSource collection is null !\r\n\r\n' );

                        // if the sequence contains elements
                        if ( currentColl.length )
                        {
                            switch ( enumValue )
                            {
                                case _ENUM.FIRST:
                                    // get the first item from the sequence
                                    _ACTION.hpid.data = currentColl[ 0 ];

                                    // this flag tells to discard returned result and go for hpid's data
                                    _ACTION.hpid.done = true;

                                    break;

                                case _ENUM.LAST:
                                    // get the last item from the sequence
                                    _ACTION.hpid.data = currentColl[ currentColl.length - 1 ];

                                    // this flag tells to discard returned result and go for hpid's data
                                    _ACTION.hpid.done = true;

                                    break;

                                case _ENUM.SINGLE:
                                    if ( currentColl.length === 1 )
                                    {
                                        // get the single item from the sequence
                                        _ACTION.hpid.data = currentColl[ 0 ];

                                        // this flag tells to discard returned result and go for hpid's data
                                        _ACTION.hpid.done = true;

                                        break;
                                    }
                                    else
                                        throw new Error( '\r\nSequence contains more than one element !\r\n\r\n' );

                                case _ENUM.ALL:
                                case _ENUM.DEFAULT:
                                    // assert that hpid contains data of the current flow
                                    // if HPID is not ready
                                    if ( !_ACTION.hpid.isSwitchedOn )
                                    {
                                        // update HPID object to enable further data flow
                                        _ACTION.hpid.data = currentColl;

                                        // mark that HPID is ready
                                        _ACTION.hpid.isSwitchedOn = true;
                                    }

                                    // this flag tells to discard returned result and go for hpid's data
                                    _ACTION.hpid.done = true;
                                    break;

                                default:
                                    throw new Error( '\r\nUnrecognized logical type of collection item [ ' + _COMMON.getCustomValueOfSymbol( enumValue ) + ' ] !\r\n\r\n' );
                            }
                        }
                        // if the sequence contains no elements
                        else
                        {
                            // return an empty array
                            if ( ( enumValue === _ENUM.ALL ) && fallbackOnDefault )
                            {
                                // this flag tells to discard returned result and go for hpid's data
                                _ACTION.hpid.done = true;
                                return;
                            }
                            // return a singleton array containing default value passed by the user
                            else if ( ( enumValue === _ENUM.DEFAULT ) && fallbackOnDefault.yes )
                            {
                                // return default value passed by the user
                                _ACTION.hpid.data.push( fallbackOnDefault.udv );

                                // this flag tells to discard returned result and go for hpid's data
                                _ACTION.hpid.done = true;
                                return;
                            }
                            // get default value of collection input type
                            else if ( enumValue === _ENUM.DEFAULT )
                            {
                                // return default value passed by the user
                                _ACTION.hpid.data.push( r_ctx.cdv );

                                // this flag tells to discard returned result and go for hpid's data
                                _ACTION.hpid.done = true;
                                return;
                            }
                            // just return the default of var
                            else if ( fallbackOnDefault )
                                return undefined;
                            // throw valid error
                            else
                            {
                                if ( ( enumValue === _ENUM.SINGLE ) && withPredicates )
                                    throw new Error( '\r\nSequence contains no elements !\r\n\r\n' );
                                else if ( withPredicates )
                                    throw new Error( '\r\nSequence contains no matching element !\r\n\r\n' );
                                else if ( enumValue === _ENUM.REVERSE )
                                    throw new Error( '\r\nSource is null !\r\n\r\n' );
                                else
                                    throw new Error( '\r\nSequence contains no elements !\r\n\r\n' );
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
         * @param {any} sortMetaObject
         * @param {any} sharedSecondLevelSortingContext
         */
            function ( jlc, keyPartSelectorArray, udfComparer, enumValue, sortMetaObject, sharedSecondLevelSortingContext )
            {
                return execute_OF_I_1L( jlc, keyPartSelectorArray, udfComparer, enumValue, sortMetaObject, sharedSecondLevelSortingContext );



                /**
                 * Local helper functions
                */
                function execute_OF_I_1L ( jlc, keyPartSelectorArray, udfComparer, enumValue, sortMetaObject, sharedSecondLevelSortingContext )
                {
                    // when first-level sorting takes place, always reset all so-far used sorting
                    if ( enumValue === _ENUM.ORDER.By.ASC || enumValue === _ENUM.ORDER.By.DESC )
                    {
                        // clear all sorting metadata
                        _ACTION.hpid.sorting.clear( sharedSecondLevelSortingContext );

                        // update and evaluate sorting context for the next invocation
                        evaluateSortingContext_I_2L( _ENUM.ORDER.Level.FIRST );

                        // invoke real sorting over current data collection
                        execute_1st_Level_Sorting_I_2L( sortMetaObject );
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
                    */
                    function evaluateSortingContext_I_2L ( sorting_level )
                    {
                        // reference runtime context
                        var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];



                        // get contextually current collection within history array
                        _DATA.fetchFlowData( r_ctx.collectionIndex, true );


                        /**
                         * Update collection item structure metadata object of ice metadata object of the current runtime context
                        */
                        if (
                            r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                            ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                        )
                            _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, _ACTION.hpid.data );



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
                            // detect and store current sort input type of collection - no sorting required, hence return UNKNOWN
                            _ACTION.hpid.columnSet.currentQueryIcest = _ACTION.hpidCommons.detectCest( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                            // discard subsequent sorting operations
                            _ACTION.hpid.sorting.stop = true;
                        }
                        // otherwise examine object type of sort input to evaluate sorting necessity during next sort operation 
                        else
                        {
                            // detect and store current sort input type of collection - sorting required, hence determine cest (collection element structure type)
                            _ACTION.hpid.columnSet.currentQueryIcest = _ACTION.hpidCommons.detectCest( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                            // get only valid column names from user column set
                            var ovc = _ACTION.hpid.columnSet.extractOVC( keyPartSelectorArray || [], false );

                            /**
                             * Check for "special" case, i.e. cest being KVP and KVP's Value is a primitive type !
                             * In such a case there is no such thing like sorting Value object by its any property name !
                             * Hence, all columns starting with 'value.' provided by the user are in this particular context invalid !
                            */
                            if (
                                ( _ACTION.hpid.columnSet.currentQueryIcest === _ENUM.CEST.KVP ) &&
                                cmo.first_obj && _COMMON.isPrimitiveType( cmo.first_obj.value )
                            )
                                checkForValuePLAINBreach_I_3L( ovc );

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



                        /**
                         * Local helper functions
                        */
                        function checkForValuePLAINBreach_I_3L ( user_cols )
                        {
                            // single ovc
                            var col;

                            // loop over all ovc
                            for ( var i = 0; i < user_cols.length; i++ )
                            {
                                // access current one
                                col = user_cols[ i ];

                                // check if attempted sorting using Value.PLAIN
                                if ( col.substring( 0, 6 ) === 'value.' && col.length > 6 )
                                    throw new Error( '\r\nSorting KVPs by Value.PLAIN is invalid !\r\nValue.PLAIN column is "' + col + '" !\r\n\r\n' );
                            }
                        }
                    }

                    function execute_1st_Level_Sorting_I_2L ( sortMetaObject )
                    {
                        // apply defensive copy
                        _ACTION.hpid.data = [ ..._ACTION.hpid.data ];

                        // if user defined his own comparator
                        if ( udfComparer )
                        {
                            // create sort metadata object
                            var sortMetadataObj = Object.create( null );
                            // sort meta object describing type of sorting
                            sortMetadataObj.sortMetaObject = sortMetaObject;
                            // selectors to be used to sort collection
                            sortMetadataObj.selectors = keyPartSelectorArray;
                            // pass direction of sorting
                            sortMetadataObj.isAscOtherwiseDesc = enumValue === _ENUM.ORDER.By.ASC || enumValue === _ENUM.ORDER.By.THEN_ASC;

                            // just invoke it
                            _ACTION.hpid.data.sort( udfComparer.bind( sortMetadataObj ) );
                        }
                        // otherwise do the sorting using default comparator
                        else
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
                            _ACTION.hpid.data.sort( _COMMON.useDefaultComparer( sortMetaObject, undefined, undefined, sharedSecondLevelSortingContext ) );
                    }

                    function execute_2nd_Level_Sorting_I_2L ( ovc )
                    {
                        // create data cache for second-level sorting purposes by applying defensive copy
                        var data_cache = [ ..._ACTION.hpid.data ];

                        // reference so-far used sorting columns as the grouping columns
                        var grouping_cols = _ACTION.hpid.sorting.sort_columns;

                        // reference grouping-by util object
                        var gbo = _COMMON.usingGroupingBy();

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
                         * Store current 'ovc' sorting columns to perform second-level sorting only over the subset of data.
                         * Force to use different source of sorting columns. 
                        */
                        Array.prototype.push.apply( sharedSecondLevelSortingContext.ovc, ovc );
                        sharedSecondLevelSortingContext.force( true );

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
                            {
                                // if user defined his own comparator
                                if ( udfComparer )
                                {
                                    // create sort metadata object
                                    var sortMetadataObj = Object.create( null );
                                    // sort meta object describing type of sorting
                                    sortMetadataObj.sortMetaObject = sortMetaObject;
                                    // selectors to be used to sort collection
                                    sortMetadataObj.selectors = keyPartSelectorArray;
                                    // pass direction of sorting
                                    sortMetadataObj.isAscOtherwiseDesc = enumValue === _ENUM.ORDER.By.ASC || enumValue === _ENUM.ORDER.By.THEN_ASC;

                                    // just invoke it
                                    sls_item.sort( udfComparer.bind( sortMetadataObj ) );
                                }
                                // otherwise do the sorting using default comparator
                                else
                                    // sort this array by 'ovc'
                                    sls_item.sort( _COMMON.useDefaultComparer( undefined, true, 'PLAIN_Comparator', sharedSecondLevelSortingContext ) );
                            }

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
                */
                function execute_MF_I_1L ( jlc, collectionOrItem, enumValue )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );


                    /**
                     * Update collection item structure metadata object of ice metadata object of the current runtime context
                    */
                    if (
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                        ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                    )
                        _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                    var new_dirty_data;

                    if ( enumValue === _ENUM.APPEND )
                    {
                        // append item to the end of current data flow collection
                        new_dirty_data = [ collectionOrItem ];

                        // merge new current flow data collection with old current flow data collection
                        currentColl = currentColl.concat( new_dirty_data );
                    }
                    else if ( enumValue === _ENUM.PREPEND )
                    {
                        // declare new current flow data collection
                        new_dirty_data = [ collectionOrItem ];

                        // merge new current flow data collection with old current flow data collection
                        currentColl = new_dirty_data.concat( currentColl );
                    }
                    else if ( enumValue === _ENUM.CONCAT )
                    {
                        // merge new data collection with current flow data collection
                        currentColl = currentColl.concat( collectionOrItem );
                    }

                    // update HPID object to enable further data flow
                    _ACTION.hpid.data = currentColl;
                    if ( !_ACTION.hpid.isSwitchedOn ) _ACTION.hpid.isSwitchedOn = true;
                }
            },

        executeAllAnyFilter: /**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} enumValue
         */
            function ( jlc, predicateArray, enumValue )
            {
                return execute_AAF_I_1L( jlc, predicateArray, enumValue );



                /**
                 * Local helper functions
                */
                function execute_AAF_I_1L ( jlc, predicateArray, enumValue )
                {
                    // reference runtime context
                    var r_ctx = jlc[ _ENUM.RUNTIME.RTC ];


                    // get contextually current collection within history array
                    var currentColl = _DATA.fetchFlowData( r_ctx.collectionIndex, false );



                    // for given predicates
                    if ( predicateArray )
                    {
                        /**
                         * Update collection item structure metadata object of ice metadata object of the current runtime context
                        */
                        if (
                            r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange &&
                            ( r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName !== r_ctx.currentQueryIceMetaObject.itemStructureChangeObject.currentQueryName )
                        )
                            _COMMON.updateIceMetaObjectOfRuntimeContext( r_ctx, currentColl );



                        // execute the "IF" filter and return the result
                        return _LOGICAL_FILTER.applyLogicalWhereFilter( currentColl, predicateArray, enumValue );
                    }
                    // for no given predicates
                    else
                        // check if there are any items in the sequence (contextually current collection within history array)
                        return currentColl.length > 0;
                }
            }
    };



    // private data object holding all data flows of all collections passed to JLC
    var _DATA = {
        // index that tracks contextually current collection within history array 
        index: -1,

        // root token array holding root tokens of each collection
        root_token_array: [],

        // collection history array
        collection_array: [],

        exists: /**
         * Check if contextually current collection is stored internally for data flows.
         * 
         * @param {any} collectionToken
         */
            function ( collectionToken )
            {
                // index of this collection if already stored
                var index = -1;

                // check for collection presence
                for ( var i = 0; i < this.root_token_array.length; i++ )
                {
                    // get existing root token
                    var rto = this.root_token_array[ i ];

                    // compare it to the root token in question
                    if ( rto.collectionToken === collectionToken )
                    {
                        // if matched, then fetch the associated index
                        index = rto.collection_index;

                        // and break the loop
                        break;
                    }
                }

                // return index
                return index;
            },

        yieldIndex: /**
         * Yield the very next value of index that will refer to the new collection in question.
         */
            function ()
            {
                // yield the index of about-to-store new collection
                this.index++;

                // return index of the about-to-store new collection
                return this.index;
            },

        store: /**
         * Store collection.
         *
         * @param {any} collection
         */
            function ( collection )
            {
                // store contextually unique token of this collection
                this.root_token_array.push(
                    {
                        collectionToken: collection.dirty_data[ _ENUM.RUNTIME.CT ],

                        collection_index: this.index
                    }
                );

                // store collection
                this.collection_array.push( collection );
            },

        fetchFlowData: /**
         * Fetch data array of contextually current collection from history array.
         *
         * @param {number} index
         */
            function ( index, justInitHpid )
            {
                // just initialize HPID if required and if necessary (if HPID is not initialized)
                if ( justInitHpid && !_ACTION.hpid.isSwitchedOn )
                {
                    // update HPID object to enable further data flow
                    _ACTION.hpid.data = fetchFlowData_I_1L( index ).collection;

                    // mark that HPID is initialized
                    _ACTION.hpid.isSwitchedOn = true;
                }
                // when initialized HPID, do nothing
                else if ( justInitHpid && _ACTION.hpid.isSwitchedOn )
                    ;
                else
                {
                    // if HPID is initialized
                    if ( _ACTION.hpid.isSwitchedOn )
                        // return flow's collection cache
                        return _ACTION.hpid.data;
                    else
                    {
                        // create input collection cache by applying defensive copy
                        return [ ...fetchFlowData_I_1L( index ).collection ];
                    }
                }



                /**
                 * Local helper functions
                */
                function fetchFlowData_I_1L ( index )
                {
                    return {
                        // collection index within history array
                        index: index,

                        // collection itself
                        collection: _DATA.collection_array[ index ].dirty_data
                    };
                }
            }
    };

    // private data object holding all queries' filtered data
    var _CACHE = {
        // enable or disable using cache
        _useCache: false,

        // cache current query result or not
        _useCurrentQueryCache: false,

        // computed key of current query in question used to search the cache
        _key: undefined,

        // internal query result cache
        _qrc: Object.create( null ),

        cacheCommons: {
            tryToLoad: /**
            * Computes query key required by the current query flow to search the cache for cached query result.
            */
                function ( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, collectionIndex )
                {
                    // compute cache key for current query in the flow
                    computeKey_I_1L( params, queryName, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, collectionIndex );

                    // is current query cache enabled
                    if ( _CACHE._useCurrentQueryCache )
                        // try to load cached result
                        return load_I_1L();
                    // otherwise apply full operation workflow
                    else
                        return false;



                    /**
                     * Local helper functions
                    */
                    // Computes query key required by the current query flow to search the cache for cached query result.
                    function computeKey_I_1L ( params, jqn, queryChainCacheObjectInternal, queryChainCacheObjectUserDefined, coll_idx )
                    {
                        // initialize the current query cache key
                        _CACHE._key = '';


                        /**
                         * Handle internal cache key computation
                        */

                        // query cache object internal
                        var qcoi;
                        // loop over query chain cache internal objects
                        for ( var i = 0; i < queryChainCacheObjectInternal.length; i++ )
                        {
                            // get query cache object internal
                            qcoi = queryChainCacheObjectInternal[ i ];

                            // create cache key until it's allowed
                            if ( !qcoi.useCache )
                            {
                                // mark that current query cannot use the cache
                                _CACHE._useCurrentQueryCache = false;

                                // hence break computing the key
                                break;
                            }
                            // mark that current query can use the cache
                            else _CACHE._useCurrentQueryCache = true;

                            // compute key - part 1
                            _CACHE._key += qcoi.name + _ENUM.MISC.UNDERSCORE + coll_idx + _ENUM.MISC.UNDERSCORE;

                            // compute key - part 2
                            for ( let filter_arr of qcoi.filters )
                                _CACHE._key += convertFilterArrToKeyString_I_2L( filter_arr );

                            // run whole query chain cache internal objects until current query
                            if ( ( qcoi.name === jqn ) && stopProcessingInternalCacheObject_I_2L( params, qcoi.filters ) ) break;
                        }


                        /**
                         * Handle user-defined cache key computation
                        */

                        // query cache object user-defined, all query method udf functions or some objects
                        var qcoud, udfos = [];
                        // loop over query chain cache user-defined objects
                        for ( var j = 0, userDefinedCacheObjects = queryChainCacheObjectUserDefined || []; j < userDefinedCacheObjects.length; j++ )
                        {
                            // get query cache object internal
                            qcoud = userDefinedCacheObjects[ j ];

                            // create cache key until it's allowed
                            if ( qcoud && qcoud.use )
                            {
                                // for all allowable params create cache objects
                                qcoud.udfCacheConfig.forEach( function ( paramCacheConfig )
                                {
                                    // if this param is cacheable
                                    if ( paramCacheConfig.useCache )
                                        // store udf cache into array
                                        udfos.push( paramCacheConfig.name + _ENUM.MISC.UNDERSCORE + paramCacheConfig.token + _ENUM.MISC.UNDERSCORE );
                                } );
                            }
                        }

                        // loop over query chain cache user-defined objects
                        for ( var k = 0; k < udfos.length; k++ )
                            // compute key - part 3
                            _CACHE._key += udfos[ k ];



                        /**
                         * Local helper functions
                        */
                        function stopProcessingInternalCacheObject_I_2L ( params, f_arr )
                        {
                            // is current query the boundary one
                            var stop = false;

                            // create array of boundary filter candidates (bfc)
                            var bfc_arr = [];

                            // all filter candidates
                            var afc_arr = Object.getOwnPropertyNames( params );
                            var afc_arr_item;
                            // filter out only array filters
                            afc_arr.forEach( function ( filterName )
                            {
                                afc_arr_item = params[ filterName ];
                                if ( Array.isArray( afc_arr_item ) )
                                    bfc_arr.push( afc_arr_item );
                            } );

                            // if query method doesn't contain filters, exit the function
                            if ( bfc_arr.length === 0 && f_arr.length === 0 ) return stop;

                            // if filter array is defined
                            if ( f_arr )
                            {
                                var f_arr_item;
                                for ( var i = 0; i < f_arr.length; i++ )
                                {
                                    // access current item from the filter array
                                    f_arr_item = f_arr[ i ];

                                    // if current filter is an array
                                    if ( Array.isArray( f_arr_item ) )
                                    {
                                        // loop over all array filters of internal cache object
                                        for ( var j = 0; j < bfc_arr.length; j++ )
                                        {
                                            // if there is a match
                                            if ( f_arr_item.equals( bfc_arr[ j ] ) === true )
                                            {

                                                // found boundary filter
                                                stop = true;

                                                break;
                                            }
                                        }

                                        // if found boundary filter, break the further searching
                                        if ( stop ) break;
                                    }
                                }
                            }
                            // return whether current query is the boundary one
                            return stop;
                        }

                        function convertFilterArrToKeyString_I_2L ( f_arr )
                        {
                            // key string based on filter array
                            var f_arr_key = '';

                            // if filter array is defined
                            if ( f_arr )
                            {
                                // for each item
                                for ( let v of f_arr )
                                {
                                    // convert array to string if it's an array
                                    if ( Array.isArray( v ) )
                                        f_arr_key += v.join( _ENUM.MISC.UNDERSCORE ) + _ENUM.MISC.UNDERSCORE;
                                    // concatenate item
                                    else
                                        f_arr_key += v + _ENUM.MISC.UNDERSCORE;
                                }
                            }

                            // return filter array key string
                            return f_arr_key;
                        }
                    }

                    // Loads up cached query result into HPID.
                    function load_I_1L ()
                    {
                        // try to get data from cache for given key
                        var cachedResult = getCachedData_I_2L();

                        // is cache hit
                        if ( cachedResult.isHit )
                        {
                            // update HPID
                            _ACTION.hpid.data = cachedResult.data;

                            // mark that HPID is on
                            _ACTION.hpid.isSwitchedOn = true;

                            // mark that HPID is ready to return data
                            _ACTION.hpid.done = true;

                            // return cache hit positive bool result
                            return true;
                        }

                        // return cache hit negative bool result
                        return false;



                        /**
                         * Local helper functions
                        */
                        function getCachedData_I_2L ()
                        {
                            // query cached result object
                            var qcro = Object.create( null );

                            // check if there is cached data
                            if ( _CACHE._key in _CACHE._qrc )
                            {
                                // there is cached data
                                qcro.isHit = true;

                                // cached data
                                qcro.data = _COMMON.deepCopyYCR( _CACHE._qrc[ _CACHE._key ] );
                            }

                            // return cached result object
                            return qcro;
                        }
                    }
                },

            store: /**
            * Stores query result into cache.
            * You can provide optional explicit value, being it returned value from the physical filter, or even your own custom value !
            */
                function ( storeUserValue, explicitValue )
                {
                    // is JLC cache enabled && is current query cache enabled
                    if ( _CACHE._useCurrentQueryCache )
                    {
                        // cache the current query result
                        _CACHE._qrc[ _CACHE._key ] = storeUserValue ? _COMMON.deepCopyYCR( explicitValue ) : _COMMON.deepCopyYCR( _ACTION.hpid.data );

                        // reset the key used for current query
                        _CACHE._key = undefined;

                        // reset current query result availability of cache usage
                        _CACHE._useCurrentQueryCache = false;
                    }
                }
        }
    };



    // private proxy trap dispatcher
    var _PROXY_TRAP_DISPATCHER = {
        get: {
            /**
             * @param {object} api JLC instance.
             * @param {any} property Name of the query method in question.
             * @param {any} receiver The object that should be used as this.
            */
            DISPATCH: function ( api, property, receiver )
            {
                // is it an array of data (is it an input collection)
                if ( _COMMON.isObjectEmpty( api ) && Array.isArray( receiver ) )
                    // mark that next query has to store its source into internal storage
                    return _PROXY_TRAP.traps.get.RAW_SOURCE( api, property, receiver );
                // is it a new api instance object (is it a non-final result, i.e. is this query method the very first or just another query method in the whole chain ?)
                else if ( api && _LINQ_CONTEXT._isProxy( receiver ) )
                    // mark that next query has to invoke api-based method
                    return _PROXY_TRAP.traps.get.PROXY_SOURCE( api, property, receiver );
                // is it an object of data or a primitive value (is it a final result, i.e. does this query method ends the whole chain ?)
                else if ( !( receiver instanceof Array ) )
                    // mark that next query has to store its source into internal storage
                    return _PROXY_TRAP.traps.get.PROXY_SOURCE( api, property, receiver );
            }
        }
    };

    // private proxy trap object
    var _PROXY_TRAP = {
        // common internal types of traps to provide seamless query flow
        traps: {
            get: {
                EMPTY: function () { },

                /**
                 * @param {object} api JLC instance.
                 * @param {any} property Name of the query method in question.
                 * @param {any} receiver The object that should be used as this.
                */
                DEFAULT: function ( api, property, receiver )
                {
                    // just get property value from api object
                    return api[ property ];
                },

                /**
                 * @param {object} api JLC instance.
                 * @param {any} property Name of the query method in question.
                 * @param {any} receiver The object that should be used as this.
                */
                RAW_SOURCE: function ( api, property, receiver )
                {
                    // enable transparent object property access
                    _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;

                    // store data internally for this new proxy instance of new query flow
                    api = _LINQ_CONTEXT._proxyTrapsCommon.queryCreateContinuumFlowContext( _ENUM.FLOW_CONTEXT.RAW_SOURCE_CONTEXT, receiver, Object.create( null ), Object.create( null ), !System.Linq.QueryResult[ property ] );

                    // check for cached dynamically generated query method
                    if ( ( _ENUM.RUNTIME.QCMICO in api[ _ENUM.RUNTIME.RTC ] ) && ( property in api[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ] ) )
                    {
                        // restore current trap
                        _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.RAW_SOURCE;

                        // you just have to return a proxy function
                        return function ()
                        {
                            return _LINQ_CONTEXT._proxyTrapsCommon.queryGetProxyFuncThenInvoke( api, property, receiver, arguments );
                        };
                    }



                    // get query method definition object
                    var m_def_obj = _LINQ_CONTEXT.udlm[ property ];

                    // if there is such method, proceed with further logic
                    if ( m_def_obj )
                    {
                        // add current query method name to query method names' cache
                        _LINQ_CONTEXT._proxyTrapsCommon.queryStoreName( property );

                        // add action constraints to this LINQ method
                        _LINQ_CONTEXT._proxyTrapsCommon.queryAddActionConstraints( m_def_obj );

                        // store in api instance LINQ query method that is generated from query method definition
                        _LINQ_CONTEXT._proxyTrapsCommon.queryGenerateImplementation( m_def_obj, api );

                        // restore current trap
                        _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.RAW_SOURCE;

                        // you just have to return a proxy function
                        return function ()
                        {
                            return _LINQ_CONTEXT._proxyTrapsCommon.queryGetProxyFuncThenInvoke( api, property, receiver, arguments );
                        };
                    }
                },

                /**
                 * @param {object} api JLC instance.
                 * @param {any} property Name of the query method in question.
                 * @param {any} receiver The object that should be used as this.
                */
                PROXY_SOURCE: function ( api, property, receiver )
                {
                    // enable transparent object property access
                    _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;

                    // empty object stands for new proxy instance of new query flow
                    if ( _COMMON.isObjectEmpty( api ) )
                        // hence get conceptually latest (current) collection cached metadata
                        api = _LINQ_CONTEXT._proxyTrapsCommon.queryCreateContinuumFlowContext( _ENUM.FLOW_CONTEXT.PROXY_SOURCE_CONTEXT, receiver, Object.create( null ), Object.create( null ), !System.Linq.QueryResult[ property ] );


                    // check for cached dynamically generated query method
                    if ( ( _ENUM.RUNTIME.QCMICO in api[ _ENUM.RUNTIME.RTC ] ) && ( property in api[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ] ) )
                    {
                        // restore current trap
                        _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.PROXY_SOURCE;

                        // you just have to return a proxy function
                        return function ()
                        {
                            return _LINQ_CONTEXT._proxyTrapsCommon.queryGetProxyFuncThenInvoke( api, property, receiver, arguments );
                        };
                    }



                    // get query method definition object
                    var m_def_obj = _LINQ_CONTEXT.udlm[ property ];

                    // if there is such method, proceed with further logic
                    if ( m_def_obj )
                    {
                        // add current query method name to query method names' cache
                        _LINQ_CONTEXT._proxyTrapsCommon.queryStoreName( property );

                        // add action constraints to this LINQ method
                        _LINQ_CONTEXT._proxyTrapsCommon.queryAddActionConstraints( m_def_obj );

                        // store in api instance LINQ query method that is generated from query method definition
                        _LINQ_CONTEXT._proxyTrapsCommon.queryGenerateImplementation( m_def_obj, api );

                        // restore current trap
                        _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.PROXY_SOURCE;

                        // you just have to return a proxy function
                        return function ()
                        {
                            return _LINQ_CONTEXT._proxyTrapsCommon.queryGetProxyFuncThenInvoke( api, property, receiver, arguments );
                        };
                    }
                },

                PROTOTYPE: function ( key )
                {
                    // return the type of the proxy object
                    return _LINQ_CONTEXT._proxiedType.prototype;
                }
            }
        },

        // common internal query method check constraints
        udlm: {
            _handleFirstLevelSorting: /**
            * Invokes 1st level sorting set operations when a 1nd level sorting query method. i.e. orderBy or orderByDescending runs.
            *
            * @param {any} constr_params
            */
                function ( constr_params )
                {
                    // 'this' refers to the current action constraint object
                    var self = this;

                    // reference first-level sorting context object (flsco)
                    var flsco = self.actionContext.sharedFirstLevelSortingContext;

                    // apply required constraint logic
                    flsco.set( constr_params, self );


                    // you need to somehow get access to all constraint chain in order to do some updates up the chain
                },

            _handleSecondLevelSorting: /**
            * Invokes 2st level sorting check operations when a 2nd level sorting query method. i.e. thenBy or thenByDescending runs.
            *
            * @param {any} constr_params
            */
                function ( constr_params )
                {
                    // 'this' refers to the current action constraint object
                    var self = this;

                    // reference first-level sorting context object (flsco)
                    var flsco = self.actionContext.sharedFirstLevelSortingContext;

                    // apply required constraint logic
                    flsco.check();

                    // you need to somehow get access to all constraint chain in order to do some updates up the chain
                },

            _handleResetFirstLevelSorting: /**
            * Reset 1st level sorting when the very next query method running after orderBy or orderByDescending
            * is not a 2nd level sorting query method. i.e. thenBy or thenByDescending
            * 
            * @param {any} constr_params
            */
                function ( constr_params )
                {
                    // 'this' refers to the current action constraint object
                    var self = this;

                    // reference first-level sorting context object (flsco)
                    var flsco = self.actionContext.sharedFirstLevelSortingContext;

                    // apply required constraint logic
                    flsco.set( constr_params, self );

                    // you need to somehow get access to all constraint chain in order to do some updates up the chain
                }
        }
    };

    // private Linq context object
    var _LINQ_CONTEXT = {
        /**
         * ⚠️
         * USER-DEFINED LINQ METHODS
         *
         * This is THE ONLY PLACE where YOU DEFINE all methods that constitute JLC.
         * Property called 'udlm' contains query methods' definitions.
         * 
         * For new query methods that require new _CORE methods you need to:
         *  - go to _CORE object and define appropriate core method
         *  - follow the logic from there when defining all core methods' requirements
        */
        udlm: {
            where: {
                // Linq method name
                lmn: 'where',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'where\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.restriction_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],

                    misc: []
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            groupBy: {
                // Linq method name
                lmn: 'groupBy',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'groupBy\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.group_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfGroupKeySelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'udfEqualityComparer'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'udfGroupKeyProjector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'udfGroupElementSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'udfGroupResultValueSelector'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'terminateFlowAndReturnData',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'isDictionaryContext',

                            value: false
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return false;
                            },

                            function ()
                            {
                                return 'predicateArray'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            concatenate: {
                // Linq method name
                lmn: 'concatenate',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'concatenate\'', paramsObjRequiredParamName = 'collectionOrItem';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.merge_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.CONCAT
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            append: {
                // Linq method name
                lmn: 'append',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'append\'', paramsObjRequiredParamName = 'collectionOrItem';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.merge_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.APPEND
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            prepend: {
                // Linq method name
                lmn: 'prepend',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'prepend\'', paramsObjRequiredParamName = 'collectionOrItem';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.merge_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.PREPEND
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            contains: {
                // Linq method name
                lmn: 'contains',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'contains\'', paramsObjRequiredParamName = 'collectionOrItem';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'collectionOrItem',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.set_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfEqualityComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'strongSearch', // this method doesn't use this parameter

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.CONTAINS
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            distinct: {
                // Linq method name
                lmn: 'distinct',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'distinct\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.set_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfEqualityComparer'
                        },
                    ],

                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem', // this method doesn't use this parameter

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'strongSearch', // this method doesn't use this parameter

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.DISTINCT
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            except: {
                // Linq method name
                lmn: 'except',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'except\'', paramsObjRequiredParamName = 'collectionOrItem';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'collectionOrItem',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.set_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'collectionOrItem'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfEqualityComparer'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'strongSearch'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.EXCEPT
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            skip: {
                // Linq method name
                lmn: 'skip',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'skip\'', paramsObjRequiredParamName = 'count';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.SKIP
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            skipWhile: {
                // Linq method name
                lmn: 'skipWhile',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'skipWhile\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.SKIP
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            take: {
                // Linq method name
                lmn: 'take',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'take\'', paramsObjRequiredParamName = 'count';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.TAKE
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            takeWhile: {
                // Linq method name
                lmn: 'takeWhile',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'takeWhile\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.TAKE
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            orderBy: {
                // Linq method name
                lmn: 'orderBy',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'orderBy\'', paramsObjRequiredParamName = 'keyPartSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'keyPartSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context
                        _PROXY_TRAP.udlm._handleFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        true
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.order_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'keyPartSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.ORDER.By.ASC
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return true;
                            },

                            function ()
                            {
                                return 'keyPartSelectorArray'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: true,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            orderByDescending: {
                // Linq method name
                lmn: 'orderByDescending',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'orderByDescending\'', paramsObjRequiredParamName = 'keyPartSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'keyPartSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context
                        _PROXY_TRAP.udlm._handleFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        true
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.order_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'keyPartSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.ORDER.By.DESC
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return true;
                            },

                            function ()
                            {
                                return 'keyPartSelectorArray'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: true,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            thenBy: {
                // Linq method name
                lmn: 'thenBy',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'thenBy\'', paramsObjRequiredParamName = 'keyPartSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'keyPartSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 2st level sorting context
                        _PROXY_TRAP.udlm._handleSecondLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: [
                        'orderBy',
                        'orderByDescending'
                    ]
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.order_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'keyPartSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.ORDER.By.THEN_ASC
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            thenByDescending: {
                // Linq method name
                lmn: 'thenByDescending',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'thenByDescending\'', paramsObjRequiredParamName = 'keyPartSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'keyPartSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 2st level sorting context
                        _PROXY_TRAP.udlm._handleSecondLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: [
                        'orderBy',
                        'orderByDescending'
                    ]
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.order_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'keyPartSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.ORDER.By.THEN_DESC
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            toArray: {
                // Linq method name
                lmn: 'toArray',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'toArray\'', paramsObjRequiredParamName = true;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.ALL
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            toDictionary: {
                // Linq method name
                lmn: 'toDictionary',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'toDictionary\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.group_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfGroupKeySelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'udfEqualityComparer'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'udfGroupResultValueSelector'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'udfGroupKeyProjector',

                            value: null
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'udfGroupElementSelector',

                            value: null
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'terminateFlowAndReturnData',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'isDictionaryContext',

                            value: true // is dictionary context
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            defaultIfEmpty: {
                // Linq method name
                lmn: 'defaultIfEmpty',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'defaultIfEmpty\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.DEFAULT
                        }
                    ]
                },

                // action custom prerequisites (acp)
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the default value in the source collection if query flow will arrive in this method
                        _COMMON.guessCollectionDefaultValue
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return false;
                            },

                            function ()
                            {
                                return this.runtimeContext.currentQueryIceMetaObject.item;
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            reverseAllOrSubset: {
                // Linq method name
                lmn: 'reverseAllOrSubset',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'reverseAllOrSubset\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.REVERSE
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            select: {
                // Linq method name
                lmn: 'select',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'select\'', paramsObjRequiredParamName = 'selectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'selectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.projection_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'selectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'udfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'incorporateIndex'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.SELECT
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            selectMany: {
                // Linq method name
                lmn: 'selectMany',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'selectMany\'', paramsObjRequiredParamName = 'selectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'selectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.projection_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'selectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'udfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'incorporateIndex'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.SELECT_MANY
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            innerJoin: {
                // Linq method name
                lmn: 'innerJoin',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'innerJoin\'', paramsObjRequiredParamName = 'outerSelectorArray, innerSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'outerSelectorArray, innerSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.join_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'innerColl'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'outerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'outerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'innerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'innerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'udfEqualityComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'enumValue',

                            value: _ENUM.JOIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            leftJoin: {
                // Linq method name
                lmn: 'leftJoin',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'leftJoin\'', paramsObjRequiredParamName = 'outerSelectorArray, innerSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'outerSelectorArray, innerSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.join_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'innerColl'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'outerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'outerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'innerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'innerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'udfEqualityComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'enumValue',

                            value: _ENUM.LEFT_JOIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            groupJoin: {
                // Linq method name
                lmn: 'groupJoin',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'groupJoin\'', paramsObjRequiredParamName = 'outerSelectorArray, innerSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'outerSelectorArray, innerSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.join_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'innerColl'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'outerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'outerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'innerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'innerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'udfEqualityComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'enumValue',

                            value: _ENUM.GROUP_JOIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            groupLeftJoin: {
                // Linq method name
                lmn: 'groupLeftJoin',

                // method returns data
                mrd: {
                    // does return data
                    yes: false,

                    // does produce final result which is a collection
                    returns_collection: true,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'groupLeftJoin\'', paramsObjRequiredParamName = 'outerSelectorArray, innerSelectorArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'outerSelectorArray, innerSelectorArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.join_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'innerColl'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'outerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'outerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'innerSelectorArray'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 5,

                            name: 'innerUdfSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 7,

                            name: 'udfResultSelector'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 8,

                            name: 'udfEqualityComparer'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 6,

                            name: 'enumValue',

                            value: _ENUM.GROUP_LEFT_JOIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            elementAt: {
                // Linq method name
                lmn: 'elementAt',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'elementAt\'', paramsObjRequiredParamName = 'index';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.ELEMENT_AT
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            elementAtOrDefault: {
                // Linq method name
                lmn: 'elementAtOrDefault',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'elementAtOrDefault\'', paramsObjRequiredParamName = 'index';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: false,
                // user-provided query filter syntax
                rsc_syntax: undefined,

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.range_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'index'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray',

                            value: undefined
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'count',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'enumValue',

                            value: _ENUM.ELEMENT_AT
                        }
                    ]
                },

                // action custom prerequisites (acp)
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the default value in the source collection if query flow will arrive in this method
                        _COMMON.guessCollectionDefaultValue
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return false;
                            },

                            function ()
                            {
                                return this.runtimeContext.currentQueryIceMetaObject.item;
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            first: {
                // Linq method name
                lmn: 'first',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'first\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: false
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.FIRST
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            firstOrDefault: {
                // Linq method name
                lmn: 'firstOrDefault',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'firstOrDefault\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.FIRST
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            last: {
                // Linq method name
                lmn: 'last',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'last\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: false
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.LAST
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            lastOrDefault: {
                // Linq method name
                lmn: 'lastOrDefault',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'lastOrDefault\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.LAST
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            single: {
                // Linq method name
                lmn: 'single',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'single\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: false
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.SINGLE
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            singleOrDefault: {
                // Linq method name
                lmn: 'singleOrDefault',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'singleOrDefault\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.paging_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'fallbackOnDefault',

                            value: true
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.SINGLE
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            min: {
                // Linq method name
                lmn: 'min',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'min\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'property',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.aggregate_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'property'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfValueSelector'
                        },
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.MIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return true;
                            },

                            function ()
                            {
                                return 'property'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            max: {
                // Linq method name
                lmn: 'max',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'max\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'property',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.aggregate_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'property'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfValueSelector'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.MAX
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return true;
                            },

                            function ()
                            {
                                return 'property'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            average: {
                // Linq method name
                lmn: 'average',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'average\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'property',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.aggregate_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'property'
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'udfValueSelector'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 3,

                            name: 'enumValue',

                            value: _ENUM.AVG
                        },

                        {
                            // position of the parameter in the method
                            pos_idx: 4,

                            name: 'roundEnumValue',

                            value: _ENUM.AVG_MIN
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: {
                    // functions to execute
                    cpf: [
                        // to determine the type of value of property of the source collection if query flow will arrive in this method
                        _COMMON.determinePropertyType
                    ],
                    // metadata describing fetching the right params
                    cpfdm: [
                        [
                            function ()
                            {
                                return this;
                            },

                            function ()
                            {
                                return false;
                            },

                            function ()
                            {
                                return 'property'; // rsc_syntax
                            }
                        ]
                    ]
                },

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: true
            },

            any: {
                // Linq method name
                lmn: 'any',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'any\'', paramsObjRequiredParamName = false;

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.quantifying_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.ANY
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            },

            all: {
                // Linq method name
                lmn: 'all',

                // method returns data
                mrd: {
                    // does return data
                    yes: true,

                    // does produce final result which is a collection
                    returns_collection: false,
                },

                // predefined internal constraint checking
                internal_rcc: [
                    function ( params )
                    {
                        // declare missing params object entries
                        var queryName = '\'all\'', paramsObjRequiredParamName = 'predicateArray';

                        // handle missing params object
                        return _COMMON.validateParamsObjectOfQueryInterface( params, queryName, paramsObjRequiredParamName );
                    }
                ],

                // requires syntax checking
                rsc: true,
                // user-provided query filter syntax
                rsc_syntax: 'predicateArray',

                // requires constraint checking
                rcc: {
                    // constraint functions
                    cf: [
                        // to handle 1st level sorting context reset
                        _PROXY_TRAP.udlm._handleResetFirstLevelSorting,

                        /**
                         * By design syntax check is the last constraint to apply !
                         * Don't try be clever !
                        */
                        _SYNTAX.check
                    ],

                    // constraint functions data
                    cfd: [
                        false
                    ],

                    // all invocation contexts that had to take place prior to this invocation context
                    required_ctxs: []
                },

                // core JLC method behind the API (jcm)
                jcm: _CORE.quantifying_mtds,
                // metadata of core JLC method parameters
                jcm_this_excluded_params: {
                    params: [
                        {
                            // position of the parameter in the method
                            pos_idx: 1,

                            name: 'predicateArray'
                        }
                    ],
                    misc: [
                        {
                            // position of the parameter in the method
                            pos_idx: 2,

                            name: 'enumValue',

                            value: _ENUM.ALL
                        }
                    ]
                },

                // action custom prerequisites (acp) - predefined if required, otherwise null
                acp: null,

                // action context object (aco)
                aco: null,

                // is writable - can you update state during query flow
                writable: false,

                // method runs in the sorting context
                is_sort_ctx: false
            }
        },



        /**
         * 🛑
         * PRIVATE LINQ INTERNALS
         *
         * This is the only place where you define all internals that constitute JLC.
         *  - property called '_all' stores all names of so-far used methods in the query flow.
         *  - property called '_proxyTrapsCommon' stores common methods used for traps.
         *  - property called '_arrayProto' stores the original prototype of an Array object.
         *  - property called '_arrayBaseProxy' triggers generation of query method on demand from method definition.
         *  - property called '_arrayProxyHandler' contains query methods' interceptor.
        */

        // all available query method names that are already present in the query flow
        _all: [],

        // private implementation - generating query method on demand from method definition !
        _arrayBaseProxy: null,

        // backups the original prototype of an Array object
        _arrayProto: null,

        // common methods shared across all traps
        _proxyTrapsCommon: {
            queryCreateContinuumFlowContext: function ( flowContext, collectionInQuestion, actionContext, queryChainMethodImplCacheObject, isNonFinalQueryMethod )
            {
                // create new proxied JLC instance with proper action context and required query methods
                return query_CCFC_I_1L( flowContext, collectionInQuestion, actionContext, queryChainMethodImplCacheObject, isNonFinalQueryMethod );



                /**
                 * Local helper functions
                */
                function query_CCFC_I_1L ( flow_ctx, input_coll, action_ctx, qmi_ctr, is_proxy_qm )
                {
                    switch ( flow_ctx )
                    {
                        case _ENUM.FLOW_CONTEXT.RAW_SOURCE_CONTEXT:
                            // index it and get back to this method arriving in the case [INDEX_SOURCE_CONTEXT]
                            return indexCollection_I_2L();

                        case _ENUM.FLOW_CONTEXT.INDEX_SOURCE_CONTEXT:
                        case _ENUM.FLOW_CONTEXT.ACTION_SOURCE_CONTEXT:
                            // return JLC proxied instance
                            return createProxiedInstance_I_2L( action_ctx, qmi_ctr, is_proxy_qm );

                        case _ENUM.FLOW_CONTEXT.PROXY_SOURCE_CONTEXT:
                            // check for collection index that tells whether collection-in-question already internally-stored one or a new one that needs to be indexed
                            var ticgui = input_coll[ _ENUM.RUNTIME.CI ];

                            // if internally-stored one (handle PROXY_SOURCE)
                            if ( ticgui > -1 )
                            {
                                var cached_action_ctx = _SETUP._ccm[ ticgui ];
                                // then get the cached context associated with this collection and return JLC proxied instance
                                return createProxiedInstance_I_2L( cached_action_ctx, qmi_ctr, is_proxy_qm );
                            }
                            // if a new one (handle RAW_SOURCE)
                            else
                                // index it and get back to this method arriving in the case [INDEX_SOURCE_CONTEXT]
                                return indexCollection_I_2L();

                        default:
                            throw new Error( '\r\nInvalid query flow context -> [' + flow_ctx + '] !\r\n\r\n' );
                    }



                    /**
                     * Local helper functions
                    */
                    function indexCollection_I_2L ()
                    {
                        // index new collection
                        return _SETUP.Funcs.applyJLC( input_coll );
                    }

                    function createProxiedInstance_I_2L ( action_ctx, qmi_ctr, is_proxy_qm )
                    {
                        // restore metadata of the contextually current collection state
                        _ACTION.hpidCommons.updateColumnSetCestAndCols( action_ctx.currentQueryIceMetaObject.length_gte_2, action_ctx.currentQueryIceMetaObject.item, action_ctx.currentQueryIceMetaObject.ofss );

                        // create partial query new JLC proxied instance
                        return createNewJLC_I_3L( action_ctx, qmi_ctr, is_proxy_qm );



                        /**
                         * Local helper functions
                        */

                        /**
                         * Create new instance of JLC.
                         *
                         * @param {Object} action_ctx Container of actions for this newly being created JLC instance.
                         * @param {Object} qmi_ctr Container of query method implementations for this newly being created JLC instance.
                        */
                        function createNewJLC_I_3L ( action_ctx, qmi_ctr, is_proxy_qm )
                        {
                            // create template object to clone current action context object
                            var ctxClone = Object.create( null );

                            // do cloning of runtime context
                            ctxClone[ _ENUM.RUNTIME.RTC ] = _COMMON.deepCopyYCR( action_ctx );

                            // cache already created query methods
                            ctxClone[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ] = qmi_ctr;

                            // create intermediate query result enumerator, if required
                            if ( is_proxy_qm )
                                _LINQ_CONTEXT._proxyTrapsCommon.queryGenerateInDebuggingModeResultsView( ctxClone );

                            // create and return proxied JLC instance
                            return new Proxy( ctxClone, _LINQ_CONTEXT._arrayProxyHandler );
                        }
                    }
                }
            },

            queryStoreName: function ( method_name )
            {
                // cache query method name if it's not present in the cache
                if ( !_LINQ_CONTEXT._all.includes( method_name ) )
                    _LINQ_CONTEXT._all.push( method_name );
            },

            queryAddActionConstraints: function ( method )
            {
                // query constraint property name
                var qcpn = _CONSTRAINT._placeholder + method.lmn;

                // define '_baseConstraints' on '_CONSTRAINT' object once... 
                if ( !( qcpn in _CONSTRAINT ) )
                {
                    // but create new instance of query flow base constraints (qfbc) for each query method that requires it, but only once
                    Object.defineProperty(
                        _CONSTRAINT,
                        qcpn,
                        {
                            // only override getter
                            get: function ()
                            {
                                // fetch query constraint from a cache during subsequent attempts to get the same query constraint
                                var qc = _CONSTRAINT._qfcc[ qcpn ];

                                // if present in cache
                                if ( qc )
                                    return qc;

                                // if not present in cache, generate query constraint
                                qc = declareActionDefaultConstraints_I_2L();

                                // cache it
                                _CONSTRAINT._qfcc[ qcpn ] = qc;

                                // return query constraint
                                return qc;
                            }
                        }
                    );
                }



                /**
                 * Local helper methods
                */
                function declareActionDefaultConstraints_I_2L ()
                {
                    // declare action default constraints object (adco)
                    var adco = Object.create( null );


                    // deal with any action constraints
                    var co = createConstraintObject_I_3L(
                        method.aco,
                        method.rcc.cfd,
                        method.rcc.cf,
                        method.writable,
                        method.rsc,
                        method.is_sort_ctx
                    );

                    // add action constraint to action default constraints object
                    adco[ method.lmn ] = co;


                    // return action default constraints object
                    return adco;



                    /**
                     * Local helper functions
                    */
                    function createConstraintObject_I_3L ( actionCtx, data_arr, funcs_arr, writable, check_syntax, is_sort_ctx )
                    {
                        // create constraint object
                        var co = Object.create( null );


                        /**
                         * You can define here any logic you want your constraint object to do.
                        */

                        // action context
                        co.actionContext = actionCtx;

                        // by default this constraint object is enabled
                        co.isEnabled = true;

                        // data to pass to action constraint source function respectively
                        co.data = data_arr;

                        // action constraint functions (all checks to perform)
                        co.acf = funcs_arr;

                        // is this action constraint writable (if not, implicitly make it read only)
                        co.isWritable = writable;

                        // is syntax checking for this query method required
                        co.requireSyntaxCheck = check_syntax;

                        // is this action constraint invoked in the one of the order-* methods (By, ByDescending, ThenBy, ThenByDescending)
                        co.isSortContext = is_sort_ctx || false;


                        // return constraint object
                        return co;
                    }
                }
            },

            queryGenerateImplementation: function ( method, api )
            {
                // add method to Linq context object
                // @ts-ignore
                System.Linq.Context[ method.lmn ] = method.lmn;

                // store information whether this method produces physical result or a logical one
                // @ts-ignore
                System.Linq.QueryResult[ method.lmn ] = method.mrd.yes;

                // create API method
                api[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ][ method.lmn ] = create_MI_I_2L( method );



                /**
                 * Local helper functions
                */
                function create_MI_I_2L ( method_def_obj )
                {
                    // return JLC method function implementation
                    return function ( params, queryChainCacheObjectUserDefined )
                    {
                        /**
                         * Predefined internal defensive checking.
                         * These are some defensive checkings that ensure no errors of type 'JavaScript cannot access value of undefined'.
                         * 
                         * Currently available checkings:
                         *  - handle 'params' parameter to be always defined ! (params !== undefined)
                        */
                        if ( method_def_obj.internal_rcc.length )
                        {
                            // declare possible output result
                            var result;
                            // loop over all predefined internal constraints
                            for ( var i = 0, length = method_def_obj.internal_rcc.length; i < length; i++ )
                                // the last constraint by design can return some output value and it has to be non-empty
                                result = method_def_obj.internal_rcc[ i ]( params );

                            // check for the non-empty return value
                            if ( result && !params )
                                params = result;
                        }



                        /**
                         * Define action constraint that can contain:
                         *  - any number of query internal predefined constraints running in the order defined in query method definition
                         *  - query's internal predefined constraint called 'syntax checking' running as the last one
                        */
                        // constraint object
                        var constr;
                        //define an array of arrays of user-provided query filters
                        var upqf_arr = [];
                        // check for optional method syntax checking constraint
                        if ( method_def_obj.rsc )
                        {
                            // define an array of arrays of user-provided query filters
                            var upqf_arr = [];

                            // create array of parameters that store user-provided query filters
                            var rsc_syntax_arr = method_def_obj.rsc_syntax.split( ',' );
                            // trim spaces around array items
                            _COMMON.trimSpaces( rsc_syntax_arr );

                            // loop over array, fetch predicates and store them in the array
                            for ( let rsc_syntax of rsc_syntax_arr )
                                upqf_arr.push( params[ rsc_syntax ] );
                        }
                        // create real action constraint
                        constr = _CONSTRAINT.createActionConstraint(
                            // @ts-ignore
                            System.Linq.Context[ method_def_obj.lmn ],
                            method_def_obj.rcc.required_ctxs,
                            upqf_arr // array of arrays
                        );



                        /**
                         * Assign values to parameters of the core method in the right order.
                        */
                        // an object of arguments to be passed to the function
                        var core_method_params = Object.create( null ), param_obj;
                        // loop over all params array and extract all values
                        for ( var i = 0, params_obj = method_def_obj.jcm_this_excluded_params.params, length = params_obj.length; i < length; i++ )
                        {
                            // access current param
                            param_obj = params_obj[ i ];

                            // store current param value in the core method param object
                            core_method_params[ param_obj.name ] = params[ param_obj.name ];
                        }
                        // loop over all misc array and extract all values
                        for ( var i = 0, miscs_obj = method_def_obj.jcm_this_excluded_params.misc, length = miscs_obj.length; i < length; i++ )
                        {
                            // access current param
                            param_obj = miscs_obj[ i ];

                            // store current param value in the core method param object
                            core_method_params[ param_obj.name ] = param_obj.value;
                        }



                        /**
                         * Reference two contexts:
                         *  - context of JLC instance
                         *      - for brand new query in the current query chain this refers to the input collection (first query based on input collection in the current query chain)
                         *      - for another query in the current query chain this refers to the previous proxy object (first query based on input collection in the current query chain boxed into proxy -> aka intermediate query state)
                         *  - context of query flow methods
                        */
                        var runtimeContext, queryMethodImplContainer, ctx_discovery;

                        // detect the "right" context of runtime
                        ctx_discovery = Array.isArray( this ) ? api : this;

                        // reference the "right" action context, aka runtime context of JLC current instance
                        runtimeContext = ctx_discovery[ _ENUM.RUNTIME.RTC ];

                        // reference query flow methods
                        queryMethodImplContainer = ctx_discovery[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ];



                        /**
                         * Run action custom prerequisites (aka validation constraints) if there are any.
                         * The implicit requirement for these custom prerequisites is that all params of functions can be fetched via 'Closures' feature !
                         * How they are different from action constraints ?
                         *  - the goal is to provide kind of the same logical functionality as during compilation phase, if regarding statically typed languages.
                         * 
                        */
                        if ( method_def_obj.acp )
                        {
                            var func, func_args;
                            // iterate over all functions to execute
                            for ( var i = 0, length = method_def_obj.acp.cpf.length; i < length; i++ )
                            {
                                // reference function to execute
                                func = method_def_obj.acp.cpf[ i ];

                                // function arguments
                                func_args = [];

                                // iterate over all function params accessors
                                for ( var j = 0, fpa_length = method_def_obj.acp.cpfdm[ i ].length; j < fpa_length; j++ )
                                {
                                    // fetch function arguments
                                    func_args.push( method_def_obj.acp.cpfdm[ i ][ j ].bind( api )() );
                                }

                                // store core method args as the last param
                                func_args.push( core_method_params );

                                // invoke function with given arguments
                                func.call( null, func_args );
                            }
                        }



                        // create action object
                        var atn = _ACTION.funcCommons.create(
                            runtimeContext,
                            queryMethodImplContainer,
                            queryChainCacheObjectUserDefined,
                            method_def_obj.jcm.bind(
                                api,
                                core_method_params
                            ),
                            System.Linq.Context[ method_def_obj.lmn ],
                            upqf_arr,
                            constr,
                            method_def_obj.mrd.yes
                        );

                        // return action object
                        return atn;
                    };
                }
            },

            queryGenerateInDebuggingModeResultsView: function ( api )
            {
                /**
                 * This method is created only for query methods that DON'T produce final result.
                 * Hence, this intermediate results enumerator method is created during the very last operation before returning proxy of no producing-final-result method.
                */

                Object.defineProperty(
                    api,
                    _ENUM.RESULTS_VIEW.ENUMERATOR,
                    {
                        // only override getter
                        get: function ()
                        {
                            /**
                             * Get contextually current collection state from the collection history array.
                             * api's runtimeContext will be injected further in the query flow ! 
                            */

                            // current proxy GET trap
                            var currentGetTrapType, actionCtxBackup;

                            try
                            {
                                // backup current proxy GET trap
                                currentGetTrapType = _LINQ_CONTEXT._arrayProxyHandler.get;

                                // enable transparent access
                                _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;



                                api.runtimeContext;
                                // create backup of action context, update action context before running the chain and return the backup
                                actionCtxBackup = _COMMON.deepCopyYCR( api.runtimeContext );
                                // invoke real data filtering and produce output, i.e. execute all actions
                                _ACTION.funcCommons.executeChain( api.runtimeContext );



                                // restore action context to the previous state
                                api.runtimeContext = actionCtxBackup;

                                // restore metadata of the contextually current collection state
                                _ACTION.hpidCommons.updateColumnSetCestAndCols( api.runtimeContext.currentQueryIceMetaObject.length_gte_2, api.runtimeContext.currentQueryIceMetaObject.item, api.runtimeContext.currentQueryIceMetaObject.ofss );



                                // return contextually current collection state
                                return _ACTION.hpid.data;
                            }
                            catch ( err )
                            {
                                // restore action context to the previous state
                                api.runtimeContext = actionCtxBackup;

                                // restore metadata of the contextually current collection state
                                _ACTION.hpidCommons.updateColumnSetCestAndCols( api.runtimeContext.currentQueryIceMetaObject.length_gte_2, api.runtimeContext.currentQueryIceMetaObject.item, api.runtimeContext.currentQueryIceMetaObject.ofss );

                                /**
                                 * Display the error
                                 * 
                                 * This line of code is useful only during development phase !
                                 * Should be removed while moved to production !
                                */
                                console.error( err );

                                /**
                                 * Update contextually current collection state with error message !
                                */
                                var c_err = Object.create( null );
                                c_err.message = err.message;
                                c_err.stack = err.stack;

                                // update HPID
                                _ACTION.hpid.data = c_err;

                                // return contextually current collection state
                                return _ACTION.hpid.data;
                            }
                            finally
                            {
                                // current proxy GET trap is defined
                                if ( currentGetTrapType )
                                    // restore backup proxy GET trap as the current one
                                    _LINQ_CONTEXT._arrayProxyHandler.get = currentGetTrapType;
                            }
                        }
                    }
                );
            },

            queryGetProxyFuncThenInvoke: function ( api, property, receiver, arguments )
            {
                // enable transparent object property access
                _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.DEFAULT;


                // invoke on demand the original query method with dynamically applied arguments that produces the final output send to the calling client
                var result = api[ _ENUM.RUNTIME.RTC ][ _ENUM.RUNTIME.QCMICO ][ property ].apply( receiver, arguments );


                /**
                 * 1. is it an array of data (is it a final result, i.e. does this query method ends the whole chain ?)
                 * 
                 * 2.
                 *    a.  is it a new api instance object (is it a non-final result, i.e. is this query method the very first or just another query method in the whole chain ?)
                 *          ||
                 *    b.  is it an object of data or a primitive value (is it a final result, i.e. does this query method ends the whole chain ?) 
                */

                // 1.
                if ( Array.isArray( result ) ) {
                    // copy result 100% "by value"
                    result = _COMMON.deepCopyNCR( result );

                    // decorate with certain additional "native" functionalities for certain data types
                    _COMMON.decorateDataType(result, property);
                }
                // 2.a
                else if ( _LINQ_CONTEXT._isProxy( result ) )
                {
                    // update ice metadata object if this query changes the collection structure
                    if ( _LINQ_CONTEXT._proxyTrapsCommon.queryIsChangingCollectionStructure( property ) )
                    {
                        // reference runtime context
                        var runtime_ctx = result[ _ENUM.RUNTIME.RTC ];

                        /**
                         * Update metadata object of ice metadata object
                        */
                        // mark in the invocation context that the very next query will have to update ice metadata object
                        runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.requiresChange = true;
                        // the name of the query that forces the very next query to update its ice metadata object
                        runtime_ctx.currentQueryIceMetaObject.itemStructureChangeObject.triggeringQueryName = property;
                    }
                }
                // 2.b
                else if ( !( result instanceof Array ) )
                    ;


                // mark that next query has to store its source into internal storage
                _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP_DISPATCHER.get.DISPATCH;


                // return output from original query method
                return result;
            },

            queryIsChangingCollectionStructure: function ( queryName )
            {
                // check if current query changes collection structure that will impact further queries down the query chain
                return [ System.Linq.Context.groupBy ].includes( queryName );
            }
        },

        // this proxy handler is being invoked when accessing any query method (intercepts every query method invocation) !
        _arrayProxyHandler: {
            get: _PROXY_TRAP.traps.get.EMPTY,

            getPrototypeOf: _PROXY_TRAP.traps.get.PROTOTYPE
        },

        // define type of Proxy
        _proxiedType: class { },

        // detect if an object in question is a proxy
        _isProxy: function ( obj )
        {
            return obj instanceof _LINQ_CONTEXT._proxiedType;
        }
    };



    // private setup object that does required initialization
    var _SETUP = {
        ___init___:
            function ( useCache )
            {
                return init_I_1L( useCache );



                /**
                 * Local helper methods
                */
                function init_I_1L ( useCache )
                {
                    // initialize LINQ
                    init_LINQ_I_2L();

                    // enable custom polyfills, aka extensions
                    enableExtensions_I_2L();

                    // store metadata about cache
                    enableOrDisableCache_I_2L( useCache );

                    // update query method interceptor
                    updateProxyHandler_I_2L();



                    /**
                     * Local helper methods
                    */
                    function init_LINQ_I_2L ()
                    {
                        // create proxied prototype of an Array object
                        _LINQ_CONTEXT._arrayBaseProxy = new Proxy( Object.create( null ), _LINQ_CONTEXT._arrayProxyHandler );

                        // update prototype of an Array object
                        Object.setPrototypeOf( Array.prototype, _LINQ_CONTEXT._arrayBaseProxy );


                        // create LINQ namespaces
                        // @ts-ignore
                        window.System = window.System || Object.create( null );
                        // @ts-ignore
                        window.System.Linq = window.System.Linq || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Context = window.System.Linq.Context || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Context.Cache = window.System.Linq.Context.Cache || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Context.Collection = window.System.Linq.Context.Collection || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.QueryResult = window.System.Linq.QueryResult || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Resources = window.System.Linq.Resources || Object.create( null );


                        window.System.Linq.Context.Cache.enable = function ( isEnabled )
                        {
                            // enable or disable JLC cache
                            _CACHE._useCache = isEnabled;
                        };

                        window.System.Linq.Context.Cache.clear = function ()
                        {
                            // clear JLC cache
                            _CACHE._qrc = Object.create( null );
                        };

                        window.System.Linq.Context.Collection.tidyUp = function ( ...user_coll_arr )
                        {
                            // cleanup user collections if any
                            _SETUP.Funcs.cleanupJLC( user_coll_arr );
                        };

                        // enable disposing of LINQ resources
                        // @ts-ignore
                        window.System.Linq.Resources.dispose = function ( ...user_coll_arr )
                        {
                            // remove all collections
                            _DATA.collection_array.length = 0;

                            // remove all collections' tokens
                            _DATA.root_token_array.length = 0;

                            // reset collections' index
                            _DATA.index = -1;

                            // when you're done with LINQ, make any further array operations transparent ones !
                            _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP.traps.get.EMPTY;

                            // restore native prototype of Array.prototype
                            restore_APP_I_1L();

                            // cleanup user collections if any
                            cleanupUserCollections_I_1L();



                            /**
                             * Local helper methods
                            */
                            function restore_APP_I_1L ()
                            {
                                // create proto object
                                var proto = Object.create( null );

                                // copy all available properties
                                Object.getOwnPropertyNames( Object.prototype ).forEach(
                                    function ( prop )
                                    {
                                        proto[ prop ] = Object.prototype[ prop ];
                                    }
                                );
                                // remove null property called '__proto__'
                                delete proto[ "__proto__" ];

                                // restore Array.prototype to its original value
                                Object.setPrototypeOf( Array.prototype, proto );
                            }

                            function cleanupUserCollections_I_1L ()
                            {
                                _SETUP.Funcs.cleanupJLC( user_coll_arr );
                            }
                        };
                    }

                    function enableExtensions_I_2L ()
                    {
                        // get all extensions' keys
                        var ext_key_arr = Object.getOwnPropertyNames( _EXTENSION );

                        // loop over all extensions one by one
                        for ( var i = 0; i < ext_key_arr.length; i++ )
                            // enable this extension
                            _EXTENSION[ ext_key_arr[ i ] ]();
                    }

                    function enableOrDisableCache_I_2L ( isEnabled )
                    {
                        // turn the cache on or off
                        _CACHE._useCache = isEnabled;
                    }

                    function updateProxyHandler_I_2L ()
                    {
                        // enable intercepting query method call
                        _LINQ_CONTEXT._arrayProxyHandler.get = _PROXY_TRAP_DISPATCHER.get.DISPATCH;
                    }
                }
            },

        Funcs: {
            /**
             * @param {Array} source_collection Query flow input collection.
            */
            applyJLC: function ( source_collection )
            {
                // do necessary cleanup before starting current query flow
                _ACTION.hpidCommons.clearCache( undefined );

                /**
                 * collectionIndex      ->  internal positional index of this collection
                 * collectionToken      ->  token associated with current collection, aka root token
                 * runtime_ctx          ->  JLC instance context
                */

                var collectionIndex, collectionToken, runtime_ctx;
                //if collection wasn't indexed internally, prepare for indexation
                if ( !( _ENUM.RUNTIME.CI in source_collection ) && !( _ENUM.RUNTIME.CT in source_collection ) )
                {
                    // get token associated with current collection, aka root token
                    collectionToken = new Date().getTime();

                    // check if current collection is stored internally by finding index of this collection within collection history array
                    collectionIndex = _DATA.exists( collectionToken );

                    if ( collectionIndex === -1 )
                    {
                        // yield the very next value of index that will refer to this new collection within collection history array
                        collectionIndex = _DATA.yieldIndex();

                        // assign internal collection token
                        source_collection[ _ENUM.RUNTIME.CT ] = collectionToken;

                        // assign internal collection index
                        source_collection[ _ENUM.RUNTIME.CI ] = collectionIndex;

                        // pass data in to the mechanism
                        over_I_1L( source_collection );
                    }

                    // apply JLC common operations
                    applyJlcCommon_I_1L();

                    // cache collection context
                    _SETUP._ccm[ collectionIndex ] = runtime_ctx;
                }
                else
                {
                    // get cached collection index
                    collectionIndex = source_collection[ _ENUM.RUNTIME.CI ];

                    // get cached root token
                    collectionToken = source_collection[ _ENUM.RUNTIME.CT ];

                    // apply JLC common operations
                    applyJlcCommon_I_1L();
                }

                // return JLC proxied instance
                return _LINQ_CONTEXT._proxyTrapsCommon.queryCreateContinuumFlowContext(
                    _ENUM.FLOW_CONTEXT.INDEX_SOURCE_CONTEXT,
                    source_collection, // this collection has just been stored, so pass it once again to fetch cached context
                    runtime_ctx,
                    Object.create( null ),
                    true // indexing collection by nature is about to create a proxy regardless of the very next query method, hence by default it's a non-final method !
                );



                /**
                 * Local helper functions
                */
                function over_I_1L ( inputCollection )
                {
                    // declare a private data object holding data collection of current JLC instance
                    var coll_data = Object.create( null );
                    coll_data.dirty_data = null;    // current flow data
                    coll_data.data = null;          // data - the copy of current flow data - requested on demand via resultsView dynamic property of JLC api instance


                    // store the collection to iterate over
                    coll_data.dirty_data = inputCollection || coll_data.dirty_data || [];


                    // store current collection into collection history array
                    _DATA.store( coll_data );
                }

                function applyJlcCommon_I_1L ()
                {
                    // create JLC context
                    runtime_ctx = create_JC_I_2L();

                    // update metadata about ice (input collection element)
                    _COMMON.updateIceMetaObjectOfRuntimeContext( runtime_ctx, source_collection );



                    /**
                     * Local helper functions
                    */

                    function create_JC_I_2L ()
                    {
                        // create JLC instance context object
                        var r_ctx = Object.create( null );

                        // define all necessary properties
                        r_ctx.collectionIndex = collectionIndex;
                        r_ctx.collectionToken = collectionToken;

                        // create input collection element metadata object (ice meta object -> IceMetaObject)
                        r_ctx.currentQueryIceMetaObject = Object.create( null );
                        // create metadata object about changing collection item structure
                        r_ctx.currentQueryIceMetaObject.itemStructureChangeObject = Object.create( null );

                        // create query chain cache object internal
                        r_ctx.currentQueryChainCacheInternalObject = [];

                        // create query chain cache object defined by the user
                        r_ctx.currentQueryChainCacheUserDefinedObject = [];

                        // initially parent set to null
                        r_ctx.parentActionObject = null;

                        // return JLC instance context object
                        return r_ctx;
                    }
                }
            },

            /**
             * @param {Array} user_coll_arr Query flow input collection and/or collections.
            */
            cleanupJLC: function ( user_coll_arr )
            {
                // if user provided valid array of collections
                if ( user_coll_arr && Array.isArray( user_coll_arr ) )
                    // cleanup any each and every collection
                    user_coll_arr.forEach( cleanup_I_1L );



                /**
                 * Local helper functions
                */
                function cleanup_I_1L ( coll, index, arr )
                {
                    // fetch all symbols from the array
                    var symbols = Object.getOwnPropertySymbols( coll );

                    // loop over the array and remove each and every symbol
                    for ( const s of symbols )
                        delete coll[ s ];
                }
            }
        },

        // stores conceptually current (at some point of invocation) collection metadata for new query flow
        _ccm: Object.create( null )
    };



    /* THIS IS ENTRY POINT TO THE JLC 1.0 */
    _SETUP.___init___( true /** set whether enable using caching all queries' results */ );
}
)();