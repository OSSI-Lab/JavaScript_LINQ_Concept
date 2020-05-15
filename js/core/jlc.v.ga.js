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
 * This version doesn't feature "conditional code injection proposal", aka Query Debugger.
 * 
 * 
 * 
 * Status:
 *      ⚠️  - DPR #13 [ primitives - syntax checking, handling sorting the right way ]
 *      ⚠️  - DPR #14 [DPR #13 bug fixes + 1st && 2nd sorting and the relationship between them]
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

    // declare a private Linq context object
    var _LINQ_CONTEXT = {
        ___init___: function ( call_func )
        {
            /**
             * USER-DEFINED LINQ METHODS
             * 
             * ⚠️ This is the entry point to JavaScript LINQ Concept, where you define all methods that constitute JLC.
            */
            var def_arr = [
                {
                    // Linq method name
                    lmn: 'where',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.where,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'groupBy',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.group_by,
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

                                name: 'udfGroupProjector'
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 5,

                                name: 'udfGroupElementsProjector'
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
                            }//,

                            // {
                            //     // position of the parameter in the method
                            //     pos_idx: 8,

                            //     name: 'isDictionaryContext',

                            //     value : false
                            // }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'concat',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.add_t,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'inputCollection'
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'append',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.add_t,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'collectionItem'
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'prepend',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.add_t,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'collectionItem'
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'skip',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.skip_or_take,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'count'
                            }
                        ],
                        misc: [
                            {
                                // position of the parameter in the method
                                pos_idx: 2,

                                name: 'predicateArray',

                                value: undefined
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 3,

                                name: 'enumValue',

                                value: _ENUM.SKIP
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'skipWhile',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.skip_or_take,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 2,

                                name: 'predicateArray'
                            }
                        ],
                        misc: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'count',

                                value: undefined
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 3,

                                name: 'enumValue',

                                value: _ENUM.SKIP
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'take',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.skip_or_take,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'count'
                            }
                        ],
                        misc: [
                            {
                                // position of the parameter in the method
                                pos_idx: 2,

                                name: 'predicateArray',

                                value: undefined
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 3,

                                name: 'enumValue',

                                value: _ENUM.TAKE
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'takeWhile',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.skip_or_take,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [
                            {
                                // position of the parameter in the method
                                pos_idx: 2,

                                name: 'predicateArray'
                            }
                        ],
                        misc: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'count',

                                value: undefined
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 3,

                                name: 'enumValue',

                                value: _ENUM.TAKE
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'orderBy',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'keyPartSelectorArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context
                        cf: [
                            udf_constraints.handleFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            true
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.order_asc_or_desc,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: true,

                    // method runs in the sorting context
                    is_sort_ctx: true
                },

                {
                    // Linq method name
                    lmn: 'orderByDescending',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'keyPartSelectorArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context
                        cf: [
                            udf_constraints.handleFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            true
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.order_asc_or_desc,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: true,

                    // method runs in the sorting context
                    is_sort_ctx: true
                },

                {
                    // Linq method name
                    lmn: 'thenBy',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'keyPartSelectorArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 2st level sorting context
                        cf: [
                            udf_constraints.handleSecondLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: [
                            'orderBy',
                            'orderByDescending'
                        ]
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.order_asc_or_desc,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: true
                },

                {
                    // Linq method name
                    lmn: 'thenByDescending',

                    // method returns data
                    mrd: false,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'keyPartSelectorArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 2st level sorting context
                        cf: [
                            udf_constraints.handleSecondLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: [
                            'orderBy',
                            'orderByDescending'
                        ]
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.order_asc_or_desc,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: true
                },

                {
                    // Linq method name
                    lmn: 'toArray',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [],

                    // requires syntax checking
                    rsc: false,
                    // user-provided query filter syntax
                    rsc_syntax: undefined,

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.list_t,
                    // metadata of core JLC method parameters
                    jcm_this_excluded_params: {
                        params: [],
                        misc: [
                            {
                                // position of the parameter in the method
                                pos_idx: 1,

                                name: 'fallbackOnDefault',

                                value: true
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 2,

                                name: 'predicateArray',

                                value: undefined
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 3,

                                name: 'enumValue',

                                value: _ENUM.ALL
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'toDictionary',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.group_by,
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

                                name: 'udfGroupProjector',

                                value: null
                            },

                            {
                                // position of the parameter in the method
                                pos_idx: 5,

                                name: 'udfGroupElementsProjector',

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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'first',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.first_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'firstOrDefault',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.first_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'last',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.last_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'lastOrDefault',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.last_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'single',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.single_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'singleOrDefault',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.single_or_default,
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
                            }
                        ]
                    },

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'any',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // prevent undefined error
                            if ( params === undefined ) params = {};
                            return params;
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.all_or_any,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },

                {
                    // Linq method name
                    lmn: 'all',

                    // method returns data
                    mrd: true,

                    // pre-defined internal constraint checking
                    internal_rcc: [
                        function ( params )
                        {
                            // handle missing params object
                            if ( params === undefined ) throw ReferenceError( '\r\nMethod [ all ] has to have "params" object provided !\r\n\r\n' );
                            if ( params[ 'predicateArray' ] === undefined ) throw TypeError( '\r\nMethod [ all ] with "params" object provided is missing "predicateArray" array !\r\n\r\n' );
                        }
                    ],

                    // requires syntax checking
                    rsc: true,
                    // user-provided query filter syntax
                    rsc_syntax: 'predicateArray',

                    // requires constraint checking
                    rcc: {
                        // constraint function to handle 1st level sorting context reset
                        cf: [
                            udf_constraints.handleResetFirstLevelSorting,

                            /**
                             * By design syntax check is the last constraint to apply !
                             * Don't try be clever !
                            */
                            _SYNTAX.check
                        ],

                        // constraint function data
                        cfd: [
                            false
                        ],

                        // all invocation contexts that had to take place prior to this invocation context
                        required_ctxs: []
                    },

                    // core JLC method behind the API (jcm)
                    jcm: _CORE.all_or_any,
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

                    // action context object (aco)
                    aco: null,

                    // is writable - can you update state during query flow
                    writable: false,

                    // method runs in the sorting context
                    is_sort_ctx: false
                },
            ];

            // build LINQ context
            call_func( def_arr );
        },

        // implementation details
        _instance: undefined
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

    // declare a private constraints object
    var _CONSTRAINT = {
        add:
            // add constraint func or constraint func array for given context, f.e. 'where', 'groupBy', 'take', etc.
            // @ts-ignore
            /**
             * @param {any} context Query method context, f.e. 'where', 'groupBy' etc.
             * @param {any} actionConstr
             */
            function ( context, actionConstr )
            {
                return a_I_1L( context, actionConstr );



                /**
                 * Local helper functions
                 * @param {string | number} ctx
                 * @param {any} actionConstr
                 */
                function a_I_1L ( ctx, actionConstr )
                {
                    // store action constraint
                    _CONSTRAINT._baseConstraints[ ctx ] = actionConstr;
                }
            },

        createQueryFlowConstraints:
            // create instance of all constraints
            // @ts-ignore
            function ()
            {
                return create_QFC_I_1L();



                /**
                 * Local helper functions
                 */
                function create_QFC_I_1L ()
                {
                    /*
                    // create query flow base constraints object (qfbco)
                    var qfbco = Object.create( null );

                    // yield on demand query flow base constraints
                    var qfbc = _CONSTRAINT._baseConstraints;

                    // loop over all constraints
                    for ( var key in qfbc )
                        // copy constraint after constraint
                        qfbco[ key ] = qfbc[ key ];

                    // return query flow base constraints object (qfbco)
                    return qfbco;
                    */

                    // yield on demand query flow base constraints
                    return _CONSTRAINT._baseConstraints;
                }
            },

        createActionConstraint:
            // create action constraint, aka requirement for this query method to be eligible to run
            /**
             * @param {any} context Query method context, f.e. 'where', 'groupBy' etc.
             * @param {Array} required_contexts All invocation contexts that had to take place prior to this invocation context !
             * @param {any} upqf_syntax User-provided query filter syntax
             */
            function ( context, required_contexts, upqf_syntax )
            {
                return create_AC_I_1L( context, required_contexts, upqf_syntax );


                /**
                 *  Local helper functions 
                */

                /**
                 * @param {any} ctx
                 * @param {any} required_ctxs
                 * @param {any} upqf_syntax
                 */
                function create_AC_I_1L ( ctx, required_ctxs, upqf_syntax )
                {
                    // create action constraint object
                    var ac = Object.create( null );

                    // assign name to action constraint
                    ac.name = ctx;

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
                    ac.all_required.unshift( ctx );

                    // store user-provided query filter syntax
                    ac.predicate_array = upqf_syntax;

                    // return action constraint
                    return ac;
                }
            },

        updateContextConstraints:
            // update constraints - func or constraint func array - for given context, f.e. 'where', 'groupBy', 'take', etc.
            // @ts-ignore
            /**
                 * @param {any} context Query method context, f.e. 'where', 'groupBy' etc.
                 * @param {any} actionConstr
                 * @param {any} constr_func_arr
                 */
            function ( context, constr_func_arr )
            {
                return u_CC_I_1L( context, constr_func_arr );



                /**
                 * Local helper functions
                 * @param {string | number} ctx
                 * @param {any} c_func_arr
                 */
                function u_CC_I_1L ( ctx, c_func_arr )
                {
                    // reference the context in question
                    var ctx_ref = _CONSTRAINT._baseConstraints[ ctx ];

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
            }
    };

    // declare a private syntax object
    var _SYNTAX = {

        check: /**
         * @param {any} user_filter_array
         * @param {boolean} is_query_flow_cit_primitive
         * @param {any} sortingContext
         * @param {any} actionConstr
         * @param {any} thisAction
         */
            function ( user_filter_array, is_query_flow_cit_primitive, sortingContext, actionConstr, thisAction )
            {
                return c_I_1L( user_filter_array, is_query_flow_cit_primitive, sortingContext, actionConstr, thisAction );



                /**
                 * Local helper functions 
                */

                /**
                 * @param {any} user_filter_array
                 * @param {boolean} is_primitive
                 * @param {any} sortingContext
                 * @param {any} actionConstr
                 * @param {any} thisAction
                 */
                function c_I_1L ( user_filter_array, is_primitive, sortingContext, actionConstr, thisAction )
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
                     *  - otherwise if cit is not UNKNOWN run syntax checking for objects
                    */
                    if ( is_primitive )
                        return c_P_I_1L( user_filter_array, sortingContext );
                    else
                    {
                        if ( sortingContext )
                        {
                            /**
                             * Only in sorting context you can access shared first-level sorting context.
                             * 
                             * Metadata is returned only for type KVP.
                            */

                            var metadataKVP = c_O_I_2L( user_filter_array, sortingContext );

                            thisAction.sortingMetadataCtx.setMetadata.call( thisAction.sortingMetadataCtx, metadataKVP, actionConstr );
                        }
                        else
                            return c_O_I_2L( user_filter_array, sortingContext );
                    }



                    /**
                     * Local helper functions 
                    */

                    /**
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
                            var valid = _ACTION.hpid.columnSet.all_columns.length === 1 && _ACTION.hpid.columnSet.all_columns[ 0 ] === 'key';

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
                        var gbo = _COMMON.usingGroupingBy();

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

                // create first-level sorting context object
                createFirstLevelCtx: function ()
                {
                    // create first-level sorting context object
                    var fl_ctx = {
                        // did 1st level sorting take place, i.e. can you use 2nd level sorting
                        _present: false,

                        check:/**
                        */
                            function ()
                            {
                                /**
                                 * Here you can access 'this' object which points to action constraint object and all-required contextual metadata available during the flow !
                                 * 
                                 * Contextual 'this' object is available during action constraint checking only
                                */

                                if ( !this._present )
                                    throw Error( '\r\nYou can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !\r\nAdditionally 2nd level sorting must the very next operation taking place just after 1st level sorting was applied.\r\nOtherwise it "would be illogical", as I was told :-) !\r\nThank You :-)\r\n\r\n' );
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
                        // force second-level sorting
                        _force: false,
                        // columns used to perform second-level sorting only
                        ovc: [],

                        /**
                        */
                        check: function ()
                        {
                            return this._force;
                        },

                        force: /**
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
                * @param {any} sharedSecondLevelSortingContext
                */
                clear: function ( sharedSecondLevelSortingContext )
                {
                    // reset column set object (current data flow cached metadata)
                    _ACTION.hpid.columnSet.cit = undefined;
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
                _ACTION.hpid.isOn = false;

                // reset holder of physical intermediate data
                Array.isArray( _ACTION.hpid.data ) ? _ACTION.hpid.data.length = 0 : _ACTION.hpid.data = [];

                // mark that hpid was processed
                _ACTION.hpid.done = false;
            }
        },

        // create action that represents filtering logic for given Linq's method
        create:/**
         * @param {{
            coll_index: any;
            root_token: any;
            parent: any;
        }} jlc_instance_ctx
         * @param {() => any} core_method_bind
         * @param {string | number} context
         * @param {any} constraint_def
         * @param {any} to_execute
         */
            function ( jlc_instance_ctx, core_method_bind, context, constraint_def, to_execute )
            {
                // create an action
                var action = createAction_I_1L( context, jlc_instance_ctx, core_method_bind );

                // create an action context 
                var action_ctx = createActionContext_I_1L( jlc_instance_ctx, action );

                // create an action constraint
                var action_constraint = createActionConstraint_I_1L( jlc_instance_ctx, constraint_def, action_ctx );

                /**
                 * Before proceeding with action chain execution or action chaining, run constraint checking for action chain up the road !
                 * Run constraint checking from this action up the root action itself !
                 * 
                 * Constraint concept is designed to be independent of the above tandem, i.e. action && action-context and their relationship
                */
                runActionConstraintRecursively_I_1L( action_ctx, action_constraint );


                // invoke real data filtering and produce output
                if ( to_execute )
                    // execute all actions
                    return this.executeChain( action_ctx );
                // otherwise enable further flow of actions
                else
                    // return new instance api and pass context of current action to provide chain of actions to execute
                    return _COMMON.jlcNew( action_ctx );



                /**
                 * Local helper functions 
                */

                /**
                 * @param {string | number} m_q_c Method query context
                 * @param {any} jlc_ctx JLC API instance object's context
                 * @param {any} c_m_b Core method bind
                */
                function createAction_I_1L ( m_q_c, jlc_ctx, c_m_b )
                {
                    // create action object
                    var ao = Object.create( null );


                    // store information whether this action is executable one
                    // @ts-ignore
                    ao.returnsData = System.Linq.QueryResult[ m_q_c ];

                    // store collection index
                    ao.coll_ref = jlc_ctx.coll_index;

                    // store root of the chain filters
                    ao.chain_root_id = jlc_ctx.root_token;

                    // get second-level sorting context shared across query flow
                    ao.sharedSecondLevelSortingCtx = jlc_ctx.sharedSecondLevelSortingCtx
                        ?
                        jlc_ctx.sharedSecondLevelSortingCtx
                        :
                        _ACTION.hpid.sorting.createSecondLevelCtx();

                    // store this action sorting metadata (if action requires so)
                    ao.sortingMetadataCtx = [
                        System.Linq.Context.orderBy,
                        System.Linq.Context.orderByDescending,
                        System.Linq.Context.thenBy,
                        System.Linq.Context.thenByDescending
                    ].indexOf( m_q_c ) > -1 ?
                        _ACTION.hpid.sorting.createSortingMetadataCtx() : undefined;

                    // store parent of this action
                    ao.parent = jlc_ctx.parent;

                    // execute this action by invoking its API which is execute method in turn invoking its core method with binded parameters
                    ao.execute = function ()
                    {
                        return c_m_b.bind( null, this )();
                    };


                    // return action object
                    return ao;
                }

                /**
                 * 
                 * @param {any} jlc_ctx JLC API instance object's context
                 * @param {any} action Action
                 */
                function createActionContext_I_1L ( jlc_ctx, action )
                {
                    // create this action context object
                    var taco = Object.create( null );


                    // collection reference id
                    taco.coll_index = jlc_ctx.coll_index;
                    // collection token
                    taco.root_token = jlc_ctx.root_token;

                    // get first-level sorting context shared across query flow
                    taco.sharedFirstLevelSortingCtx = jlc_ctx.sharedFirstLevelSortingCtx
                        ?
                        jlc_ctx.sharedFirstLevelSortingCtx
                        :
                        _ACTION.hpid.sorting.createFirstLevelCtx();

                    // join this action with the previous (parent) action up the action chain
                    taco.parent = action;


                    // return this action context object
                    return taco;
                }

                /**
                 * @param {any} jlc_ctx JLC API instance object's context
                 * @param {any} constr_def Basic constraint info
                 * @param {any} a_ctx Action context
                */
                function createActionConstraint_I_1L ( jlc_ctx, constr_def, a_ctx )
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
                        a_constr.isEnabled = constr_def.all_required.indexOf( context ) > -1;

                        // store all invocation contexts for later checking of necessity of invoking some constraints
                        a_constr.all_required = constr_def.all_required;


                        // store whether this-query-flow collection input type is a primitive
                        a_constr.isPrimitive = jlc_ctx.is_prim;

                        // store user-provided query filtering predicates
                        a_constr.predicate_array = constr_def.predicate_array;


                        // store query flow shared constraints (qfsc) 
                        a_constr.qfsc = a_ctx.parentConstraint ?
                            a_ctx.parentConstraint.qfsc
                            :
                            _CONSTRAINT.createQueryFlowConstraints();
                        // determine whether stop further drilling down of the parent chain
                        a_constr.stopDrillingDown = a_constr.qfsc[ constr_def.name ].isEnabled;


                        // store shared first-level sorting context
                        a_constr.actionContext = a_ctx;

                        // store this-action-constraint bound action
                        a_constr.thisAction = a_ctx.parent;

                        // store parent of this action constraint
                        a_constr.parentConstraint = jlc_ctx.parentConstraint;


                        // define action constraint apply method
                        a_constr.apply = function ()
                        {
                            /**
                                * Fetch on demand action constraint
                                * 
                                * Future action constraint possible improvements
                                *  - you apply some logic to action constraint internal state, f.e. setting its 'isEnabled' flag to true/false given some conditions
                                *  - you have access to JLC instance, hence you can do various stuff
                                *  
                                *  - etc. 
                            */
                            // reference constraint from query flow shared constraints (qfsc)
                            var actionConstr = this.qfsc[ this.name ];

                            // update action constraint with shared this action context object (taco)
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
                                c_funcs[ c_funcs.length - 1 ].bind( actionConstr )( this.predicate_array, this.isPrimitive, actionConstr.isSortContext, actionConstr, this.thisAction );
                            else
                                // apply regular constraint function
                                c_funcs[ c_funcs.length - 1 ].bind( actionConstr )( actionConstr.data[ c_funcs.length - 1 ] );
                        };
                    }


                    // return action constraint object
                    return a_constr;
                }

                /**
                 * @param {any} actionCtx
                 * @param {any} actionConstr
                */
                function runActionConstraintRecursively_I_1L ( actionCtx, actionConstr )
                {
                    return prepare_ACRR_I_2L( actionCtx, actionConstr );



                    /**
                     * Local helper functions
                    */

                    function prepare_ACRR_I_2L ( a_ctx, a_constr )
                    {
                        /**
                         * Join the previous (parent - one level up the action constraint chain) action constraint with this action constraint.
                         * Set parent constraint of this current constraint ! 
                        */
                        a_ctx.parentConstraint = a_constr;

                        // execute constraint chain check
                        run_ACR_I_2L( a_ctx.parentConstraint );



                        /**
                         * Local helper functions
                        */
                        function run_ACR_I_2L ( actionConstr )
                        {
                            // navigate "down the road" to the first constraint 
                            if ( actionConstr.parentConstraint && !actionConstr.parentConstraint.stopDrillingDown )
                                run_ACR_I_2L( actionConstr.parentConstraint );

                            // from here run all constraints in the chain up to and/or including current action constraint
                            if ( actionConstr.isNotNull && actionConstr.isEnabled )
                                actionConstr.apply();
                        }
                    }
                }
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
                */

                /**
                 * @param {{ parent: any; }} jlc_ctx
                */
                function execute_C_I_1L ( jlc_ctx )
                {
                    // do necessary cleanup before producing pre-output result
                    _COMMON.clearCache( jlc_ctx.parent.sharedSecondLevelSortingCtx );

                    // execute all actions and produce pre-output result
                    var result = executeActionsRecursively_I_2L( jlc_ctx.parent );

                    // return final data based on pre-output result
                    return getOutput_I_2L( result );



                    /**
                     * Local helper functions
                    */

                    /**
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

                    /**
                     * @param {void} result
                     */
                    function getOutput_I_2L ( result )
                    {
                        // declare output data (a result of input collection being filtered off through all filters)
                        var output;

                        // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true
                        if ( _ACTION.hpid.done && Array.isArray( _ACTION.hpid.data ) )
                            output = _ACTION.hpid.data.slice( 0 );
                        // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true and current filtered off data is either a dictionary or an object...
                        else if ( _ACTION.hpid.done )
                            output = _ACTION.hpid.data;
                        else
                            // ... otherwise return result as the output
                            output = result;

                        // return output data
                        return output;
                    }
                }
            }
    };

    // declare a private common object
    var _COMMON = {
        createContextOfLINQ: /**
        * Get object providing grouping utilities for any collection of data. 
        * 
        * @param {Array} method_arr
        */
            function ( method_arr )
            {
                return create_CoL_I_1L( method_arr );



                /**
                 * Local helper methods
                */

                /**
                 * @param {string | any[]} method_arr
                */
                function create_CoL_I_1L ( method_arr )
                {
                    // initialize LINQ
                    init_LINQ_I_2L();

                    // add methods to Linq context object
                    add_LM2C_I_2L();

                    // add action constraints to Linq methods
                    add_AC_I_2L();

                    // add LINQ API
                    add_LA_I_2L();



                    /**
                     * Local helper functions
                    */

                    function init_LINQ_I_2L ()
                    {
                        // extend JavaScript Array type with JavaScript LINQ Concept, in short called JLC
                        // @ts-ignore
                        Array.prototype.usingLinq = _SETUP.Funcs.applyJLC;

                        // create Linq context objects
                        // @ts-ignore
                        window.System = window.System || Object.create( null );
                        // @ts-ignore
                        window.System.Linq = window.System.Linq || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Context = window.System.Linq.Context || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.QueryResult = window.System.Linq.QueryResult || Object.create( null );
                        // @ts-ignore
                        window.System.Linq.Resources = window.System.Linq.Resources || Object.create( null );
                        window.System.Linq.Resources.dispose = function ()
                        {
                            // remove all collections
                            _DATA.collection_array.length = 0;

                            // remove all collections' tokens
                            _DATA.root_token_array.length = 0;

                            // reset collections' index
                            _DATA.index = -1;
                        };
                    }

                    function add_LM2C_I_2L ()
                    {
                        // loop over method array
                        for ( var i = 0; i < method_arr.length; i++ )
                        {
                            // reference a method object
                            var mo = method_arr[ i ];

                            // add method to Linq context object
                            // @ts-ignore
                            System.Linq.Context[ mo.lmn ] = mo.lmn;

                            // store information whether this method produces physical result or a logical one
                            // @ts-ignore
                            System.Linq.QueryResult[ mo.lmn ] = mo.mrd;
                        }
                    }

                    function add_AC_I_2L ()
                    {
                        // create new instance of query flow base constraints (qfbc)
                        Object.defineProperty(
                            _CONSTRAINT,
                            '_baseConstraints',
                            {
                                // only override getter
                                get: function ()
                                {
                                    return declareBaseActionConstraints_I_3L();
                                }
                            }
                        );



                        /**
                         * Local helper methods
                        */

                        function declareBaseActionConstraints_I_3L ()
                        {
                            // declare base action constraints object
                            var baco = Object.create( null );

                            var mo;
                            // loop over method object array
                            for ( var i = 0; i < method_arr.length; i++ )
                            {
                                // reference a method object
                                mo = method_arr[ i ];

                                // deal with any action constraints
                                var co = createConstraintObject_I_4L(
                                    mo.aco,
                                    mo.rcc.cfd,
                                    mo.rcc.cf,
                                    mo.writable,
                                    mo.rsc,
                                    mo.is_sort_ctx
                                );

                                // add action constraint to base action constraints object (baco) 
                                baco[ mo.lmn ] = co;
                            }

                            // return base action constraints object
                            return baco;



                            /**
                             * Local helper functions
                             */

                            /**
                             * @param {any} [actionCtx]
                             * @param { any[]} [data_arr]
                             * @param { function[]} [funcs_arr]
                             * @param {boolean} [writable]
                             * @param {boolean} [check_syntax]
                             * @param {boolean} [is_sort_ctx]
                            */
                            function createConstraintObject_I_4L ( actionCtx, data_arr, funcs_arr, writable, check_syntax, is_sort_ctx )
                            {
                                // create constraint object
                                var co = Object.create( null );

                                /**
                                     * You can define here any logic you want your constraint object to do 
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
                    }

                    function add_LA_I_2L ()
                    {
                        // create new instance of JLC
                        Object.defineProperty(
                            _LINQ_CONTEXT,
                            '_instance',
                            {
                                // only override getter
                                get: function ()
                                {
                                    return create_I_I_3L();
                                }
                            }
                        );



                        /**
                         * Local helper methods
                        */
                        function create_I_I_3L ()
                        {
                            // create API object
                            var api = Object.create( null );


                            var mo;
                            // loop over method object array
                            for ( var i = 0; i < method_arr.length; i++ )
                            {
                                // reference a method object
                                mo = method_arr[ i ];

                                // create API method
                                api[ mo.lmn ] = create_M_I_4L( mo );
                            }

                            // create intermediate results enumerator method
                            Object.defineProperty(
                                api,
                                'resultsView',
                                {
                                    // only override getter
                                    get: function ()
                                    {
                                        /**
                                         * Get contextually current collection state from the collection history array.
                                         * _ctx will be injected further in the query flow ! 
                                        */
                                        return _DATA.fetch( api._ctx.coll_index ).collection;
                                    }
                                }
                            );

                            // return API;
                            return api;



                            /**
                             * Local helper functions
                            */
                            function create_M_I_4L ( method_def_obj )
                            {
                                // return API method function implementation
                                return function ( params )
                                {
                                    // pre-defined internal constraint checking - handle "default" parameter
                                    if ( method_def_obj.internal_rcc.length )
                                    {
                                        // declare possible output result
                                        var result;
                                        // loop over all pre-defined internal constraints
                                        for ( var i = 0, length = method_def_obj.internal_rcc.length; i < length; i++ )
                                        {
                                            // the last constraint by design can return some output value and it has to be non-empty
                                            result = method_def_obj.internal_rcc[ i ]( params );
                                        }

                                        // check for the non-empty return value
                                        if ( result && !params )
                                            params = result;
                                    }



                                    // define optional action constraint
                                    var constr;
                                    // check for optional method syntax checking
                                    if ( method_def_obj.rsc )
                                        constr = _CONSTRAINT.createActionConstraint(
                                            System.Linq.Context[ method_def_obj.lmn ],
                                            method_def_obj.rcc.required_ctxs,
                                            params[ method_def_obj.rsc_syntax ]
                                        );



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



                                    // create action and proceed with further flow
                                    // @ts-ignore
                                    return _ACTION.create(
                                        api._ctx,
                                        method_def_obj.jcm.bind(
                                            api,
                                            core_method_params
                                        ),
                                        // @ts-ignore
                                        System.Linq.Context[ method_def_obj.lmn ],
                                        constr,
                                        method_def_obj.mrd
                                    );
                                };
                            }
                        }
                    }
                }
            },

        jlcNew: /**
         * Create new instance of JLC.
         *
         * @param {any} ctx
         */
            function ( ctx )
            {
                return j_I_I_1L( ctx );



                /**
                 * Local helper functions
                 */
                function j_I_I_1L ( ctx )
                {
                    // declare JavaScript LINQ Concept API object
                    var _api_OLD = {
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
                        reverseSubset: /**
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
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.where,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.where.bind(
                                    this,
                                    params[ 'predicateArray' ]
                                ),
                                // @ts-ignore
                                System.Linq.Context.where,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as GroupBy method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfGroupKeySelector
                         *  - udfEqualityComparer
                         *  - udfGroupProjector
                         *  - udfGroupElementsProjector
                         *  - udfGroupResultValueSelector
                         *  - terminateFlowAndReturnData
                        */
                        groupBy: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.groupBy,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.group_by.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    params[ 'udfGroupKeySelector' ],
                                    params[ 'udfEqualityComparer' ],
                                    params[ 'udfGroupProjector' ],
                                    params[ 'udfGroupElementsProjector' ],
                                    params[ 'udfGroupResultValueSelector' ],
                                    true
                                ),
                                // @ts-ignore
                                System.Linq.Context.groupBy,
                                constr
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
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.orderBy,
                                [],
                                params[ 'keyPartSelectorArray' ]
                            );

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
                                System.Linq.Context.orderBy,
                                constr
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
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.orderByDescending,
                                [],
                                params[ 'keyPartSelectorArray' ]
                            );

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
                                System.Linq.Context.orderByDescending,
                                constr
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
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.thenBy,
                                [
                                    System.Linq.Context.orderBy,
                                    System.Linq.Context.orderByDescending
                                ],
                                params[ 'keyPartSelectorArray' ]
                            );

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
                                System.Linq.Context.orderBy,
                                constr
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
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.thenByDescending,
                                [
                                    System.Linq.Context.orderBy,
                                    System.Linq.Context.orderByDescending
                                ],
                                params[ 'keyPartSelectorArray' ]
                            );

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
                                System.Linq.Context.orderByDescending,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as Concat method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - inputCollection
                        */
                        concat: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.concat,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.add_t.bind(
                                    this,
                                    params[ 'inputCollection' ],
                                    _ENUM.CONCAT
                                ),
                                System.Linq.Context.concat,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as Append method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - collectionItem
                        */
                        append: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.append,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.add_t.bind(
                                    this,
                                    params[ 'collectionItem' ],
                                    _ENUM.APPEND
                                ),
                                System.Linq.Context.append,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as Prepend method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - collectionItem
                        */
                        prepend: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.prepend,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.add_t.bind(
                                    this,
                                    params[ 'collectionItem' ],
                                    _ENUM.PREPEND
                                ),
                                System.Linq.Context.prepend,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as Skip method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - count
                        */
                        skip: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.skip,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.skip_or_take.bind(
                                    this,
                                    params[ 'count' ],
                                    null,
                                    _ENUM.SKIP
                                ),
                                System.Linq.Context.skip,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as SkipWhile method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                        */
                        skipWhile: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.skipWhile,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.skip_or_take.bind(
                                    this,
                                    null,
                                    params[ 'predicateArray' ],
                                    _ENUM.SKIP
                                ),
                                System.Linq.Context.skipWhile,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as Take method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - count
                        */
                        take: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.take,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.skip_or_take.bind(
                                    this,
                                    params[ 'count' ],
                                    null,
                                    _ENUM.TAKE
                                ),
                                System.Linq.Context.take,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as TakeWhile method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                        */
                        takeWhile: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.takeWhile,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.skip_or_take.bind(
                                    this,
                                    null,
                                    params[ 'predicateArray' ],
                                    _ENUM.TAKE
                                ),
                                System.Linq.Context.takeWhile,
                                constr
                            );
                        },

                        /**
                         * Serves the same purpose as ToDictionary method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfGroupKeySelector
                         *  - udfEqualityComparer
                         *  - udfGroupResultValueSelector
                         *  - context
                        */
                        toDictionary: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.toDictionary,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            return _ACTION.create(
                                this._ctx,
                                _CORE.group_by.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    params[ 'udfGroupKeySelector' ],
                                    params[ 'udfEqualityComparer' ],
                                    null,
                                    null,
                                    params[ 'udfGroupResultValueSelector' ],
                                    true,
                                    true // is dictionary context
                                ),
                                // @ts-ignore
                                System.Linq.Context.toDictionary,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as ToArray method in LINQ from C#.
                        */
                        toArray: function ()
                        {
                            // pre-defined internal constraint checking

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.toArray,
                                [],
                                []
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.list_t.bind(
                                    this,
                                    true
                                ),
                                System.Linq.Context.toArray,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as First method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        first: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.first,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.first_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    false
                                ),
                                System.Linq.Context.first,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as FirstOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        firstOrDefault: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.firstOrDefault,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.first_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    true
                                ),
                                System.Linq.Context.firstOrDefault,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as Last method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        last: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.last,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.last_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    false
                                ),
                                System.Linq.Context.last,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as LastOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        lastOrDefault: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.lastOrDefault,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.last_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    true
                                ),
                                System.Linq.Context.lastOrDefault,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as Single method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        single: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.single,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.single_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    false
                                ),
                                System.Linq.Context.single,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as SingleOrDefault method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        singleOrDefault: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.singleOrDefault,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.single_or_default.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    true
                                ),
                                System.Linq.Context.singleOrDefault,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as Any method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        any: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) params = {};

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.any,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.all_or_any.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    _ENUM.ANY
                                ),
                                System.Linq.Context.any,
                                constr,
                                true
                            );
                        },

                        /**
                         * Serves the same purpose as All method in LINQ from C#.
                         * @param {object} params contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        all: function ( params )
                        {
                            // pre-defined internal constraint checking
                            if ( params === undefined ) throw ReferenceError( '\r\nMethod [ all ] has to have "params" object provided !\r\n\r\n' );
                            if ( params[ 'predicateArray' ] === undefined ) throw TypeError( '\r\nMethod [ all ] with "params" object provided is missing "predicateArray" array !\r\n\r\n' );

                            // define optional action constraint
                            var constr = _CONSTRAINT.createActionConstraint(
                                System.Linq.Context.all,
                                [],
                                params[ 'predicateArray' ]
                            );

                            // create action and proceed with further flow
                            // @ts-ignore
                            return _ACTION.create(
                                this._ctx,
                                _CORE.all_or_any.bind(
                                    this,
                                    params[ 'predicateArray' ],
                                    _ENUM.ALL
                                ),
                                System.Linq.Context.all,
                                constr,
                                true
                            );
                        }
                    };

                    // declare JLC LINQ API object
                    var api = _LINQ_CONTEXT._instance;

                    // bind context to this API instance
                    api._ctx = ctx;

                    // return JLC API instance
                    return api;
                }
            },

        isPrimitiveType: /**
         * Detect type of passed item.
         *
         *  @param {any} o
         *
         */
            function ( o )
            {
                return is_PT_I_1L( o );



                /**
                 * Local helper functions
                 * @param {any} o
                 */
                function is_PT_I_1L ( o )
                {
                    return [ 'string', 'number', 'boolean' ].indexOf( typeof o ) > -1;
                }
            },

        createType: /**
         * Create type based on passed template object.
         * 
         * @param {any} templateObject
         */
            function ( templateObject )
            {
                return create_T_I_1L( templateObject );



                /**
                 * Local helper functions
                 * @param {{ [x: string]: any; }} templateObject
                 */
                function create_T_I_1L ( templateObject )
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
         * Create default value of type.
         *
         * @param {any} historyIndex
         */
            function ( historyIndex )
            {
                return create_DoT_I_1L( historyIndex );



                /**
                 * Local helper functions
                 * @param {any} historyIndex
                 */
                function create_DoT_I_1L ( historyIndex )
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
                 * @param {any} obj
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
                 * @param {string | any[]} keySelectorArray
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
        * 
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
                                 *  - declare non-public component called '_privateList'
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

        detectCIT: /**
            Detect collection input type (cit).
          * @param {any} collectionItem
          * @param {any} doCurrentSort
          * @param {any} doNextSort
          */
            function ( collectionItem, doCurrentSort, doNextSort )
            {
                return d_CIT_I_1L( collectionItem, doCurrentSort, doNextSort );



                /**
                 * Local helper methods
                 * @param {{ [x: string]: any; }} collectionItem
                 * @param {any} doCurrentSort
                 * @param {any} doNextSort
                 */
                function d_CIT_I_1L ( collectionItem, doCurrentSort, doNextSort )
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
                            // if it's KVP (object || primitive type)
                            if ( propNames.indexOf( 'value' ) > -1 && ( typeof collectionItem[ 'value' ] === 'object' || _COMMON.isPrimitiveType( collectionItem[ 'value' ] ) ) )
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
                 * @param {{ byKey: any; byValue: any; byValuePLAIN: any; }} sortMetadata
                 * @param {any} by_force
                 * @param {string | number} forced_comparator_name,
                 * @param {any} sharedSecondLevelSortingContext
                 */
                function use_DC_I_1L ( sortMetadata, by_force, forced_comparator_name, sharedSecondLevelSortingContext )
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
                                // by 'value' object itself when 'value' is the primitive type
                                else if ( sortMetadata.byValue && sortMetadata.isValueDotPrimitive )
                                {
                                    // invoke basic boolean comparison
                                    return boolean_comparator_I_2L( itemCurrent.value, itemPrevious.value );
                                }
                                // by 'value' object itself when 'value' is the object not the primitive type 
                                else if ( sortMetadata.byValue && !sortMetadata.isValueDotPrimitive )
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

        useDefaultObjectContentComparer:
            /**
             * Compare two objects to determine whether they have the same content (property name - property value).
             * 
             * ⚠️ This method is not put in practice yet !
             * 
             * @param {any} obj1
             * @param {any} obj2
             */
            function ( obj1, obj2 )
            {
                return use_DOCC_C_I_1L( obj1, obj2 );



                /**
                 * Local helper functions
                 * @param {any} obj1
                 * @param {any} obj2
                 */
                function use_DOCC_C_I_1L ( obj1, obj2 )
                {
                    // get all props
                    var propNames_1 = Object.getOwnPropertyNames( obj1 );
                    var propNames_2 = Object.getOwnPropertyNames( obj2 );

                    // if the number of props are different
                    if ( propNames_1.length !== propNames_2.length ) return false;

                    // sort property names natively
                    propNames_1.sort();
                    propNames_2.sort();

                    // compare object's property name vs object's property name
                    for ( var i = 0; i < propNames_1.length; i++ )
                        if ( propNames_1[ i ] !== propNames_2[ i ] ) return false;

                    // compare current level values of these two object
                    for ( var i = 0; i < propNames_1.length; i++ )
                    {
                        // get two values to compare
                        var o1_v = obj1[ propNames_1[ i ] ];
                        var o2_v = obj1[ propNames_2[ i ] ];

                        // if both types are different
                        if ( typeof o1_v !== typeof o2_v ) return false;

                        // check if both values are primitive
                        var v_prim = _COMMON.isPrimitiveType( o1_v || o2_v );

                        // if are primitive and not equal
                        if ( v_prim && o1_v !== o2_v ) return false;
                        // if are objects
                        else if ( !v_prim )
                            // check these two nested objects recursively
                            use_DOCC_C_I_1L( o1_v, o2_v );
                    }

                    // otherwise all props are of the same type and have the same values, i.e. both objects are equal
                    return true;
                }
            },

        clearCache:
            /**
             * Clear the internal JLC cache.
             * 
             * @param {{any}} sharedSecondLevelSortingContext
            */
            function ( sharedSecondLevelSortingContext )
            {
                return clear_C_I_1L( sharedSecondLevelSortingContext );



                /**
                 * Local helper functions
                */

                /**
                 * @param {{any}} sharedSecondLevelSortingContext
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

        executeGroupByFilter:/**
         * @param {any} jlc
         * @param {any} predicateArray
         * @param {any} udfGroupKeySelector
         * @param {any} udfEqualityComparer
         * @param {any} udfGroupProjector
         * @param {any} udfGroupElementsProjector
         * @param {any} udfGroupResultValueSelector
         * @param {any} terminateFlowAndReturnData
         * @param {any} isDictionaryContext
         */
            function ( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
            {
                return execute_GF_I_1L( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext );



                // @ts-ignore
                /**
                 * Local helper functions
                 * @param {{
                    _ctx: {
                        coll_index: any;
                    };
                }} jlc
                 * @param {any} predicateArray
                 * @param {any} udfGroupKeySelector
                 * @param {any} udfEqualityComparer
                 * @param {{
                    bind: (arg0: any) => any;
                }} udfGroupProjector (aka elementSelector)
                 * @param {{
                    bind: (arg0: any) => any;
                }} udfGroupElementsProjector
                 * @param {any} udfGroupResultValueSelector
                 * @param {any} terminateFlowAndReturnData
                 * @param {any} isDictionaryContext
                 */
                function execute_GF_I_1L ( jlc, predicateArray, udfGroupKeySelector, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext )
                {
                    // check if grouping key is present
                    if ( predicateArray || udfGroupKeySelector )
                    {
                        // declare groups object being an array !
                        var groups = [];

                        // create the key if key selector array defined
                        var key_array;
                        if ( predicateArray )
                            key_array = _COMMON.createCompoundKey( predicateArray );

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
                        throw Error( '\r\n"groupBy" method requires a grouping key selector to be present.\r\nCurrent invocation is missing the grouping key selector (primitive one || UDF) !\r\n\r\n' );
                    }



                    /**
                     * Local helper functions
                     * @param {any} item
                     * @param {any} index
                     * @param {any} sourceColl
                     */
                    function groupPrimitives_I_2L ( item, index, sourceColl )
                    {
                        // group id
                        var id;
                        // get the group id by applying UDF to current primitive value
                        if ( udfGroupKeySelector )
                            id = ( udfGroupKeySelector.bind( null, item, index, sourceColl ) )();
                        // get the group id being the primitive value itself
                        else
                            id = item;


                        // project group id if required
                        if ( udfGroupProjector )
                            id = ( udfGroupProjector.bind( null, id ) )();

                        // project group elements if required
                        if ( udfGroupElementsProjector )
                            item = ( udfGroupElementsProjector.bind( null, item ) )();


                        // reference grouping-by util object
                        var gbo = _COMMON.usingGroupingBy();

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
                            id = ( udfGroupProjector.bind( null, id ) )();

                        // project group elements if required
                        if ( udfGroupElementsProjector )
                            item = ( udfGroupElementsProjector.bind( null, item ) )();


                        // reference grouping-by util object
                        var gbo = _COMMON.usingGroupingBy();

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
                        var gbo = _COMMON.usingGroupingBy();

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
                return execute_RF_I_1L( jlc, predicateArray, index, count, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {number} index
                 * @param {number} count
                 * @param {string} enumValue
                 */
                function execute_RF_I_1L ( jlc, predicateArray, index, count, enumValue )
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
                return execute_OIF_I_1L( jlc, predicateArray, fallbackOnDefault, enumValue );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} predicateArray
                 * @param {any} fallbackOnDefault
                 * @param {string} enumValue
                 */
                function execute_OIF_I_1L ( jlc, predicateArray, fallbackOnDefault, enumValue )
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
         * @param {any} sharedSecondLevelSortingContext
         */
            function ( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata, sharedSecondLevelSortingContext )
            {
                return execute_OF_I_1L( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata, sharedSecondLevelSortingContext );



                /**
                 * Local helper functions
                 * @param {{ _ctx: { coll_index: any; }; }} jlc
                 * @param {any} keyPartSelectorArray
                 * @param {(a: any, b: any) => number} udfComparer
                 * @param {string} enumValue
                 * @param {any} sorting_metadata
                 * @param {any} sharedSecondLevelSortingContext
                 */
                function execute_OF_I_1L ( jlc, keyPartSelectorArray, udfComparer, enumValue, sorting_metadata, sharedSecondLevelSortingContext )
                {
                    // when first-level sorting takes place, always reset all so-far used sorting
                    if ( enumValue === _ENUM.ORDER.By.ASC || enumValue === _ENUM.ORDER.By.DESC )
                    {
                        // clear all sorting metadata
                        _ACTION.hpid.sorting.clear( sharedSecondLevelSortingContext );

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
                            // detect and store current sort input type of collection - no sorting required, hence return UNKNOWN
                            _ACTION.hpid.columnSet.cit = _COMMON.detectCIT( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                            // discard subsequent sorting operations
                            _ACTION.hpid.sorting.stop = true;
                        }
                        // otherwise examine object type of sort input to evaluate sorting necessity during next sort operation 
                        else
                        {
                            // detect and store current sort input type of collection - sorting required, hence determine cit (collection input type)
                            _ACTION.hpid.columnSet.cit = _COMMON.detectCIT( cmo.first_obj, cmo.allow_current_sorting, cmo.allow_next_sorting );

                            // get only valid column names from user column set
                            var ovc = _ACTION.hpid.columnSet.extractOVC( keyPartSelectorArray );

                            /**
                             * Check for "special" case, i.e. cit being KVP and KVP's Value is a primitive type !
                             * In such a case there is no such thing like sorting Value object by its any property name !
                             * Hence, all columns starting with 'value.' provided by the user are in this particular context invalid !
                            */
                            if (
                                ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.KVP ) &&
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
                         * @param {string | any[]} user_cols
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
                                    throw Error( '\r\nSorting KVPs by Value.PLAIN is invalid !\r\nValue.PLAIN column is "' + col + '" !\r\n\r\n' );
                            }
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
                            _ACTION.hpid.data.sort( _COMMON.useDefaultComparer( sorting_metadata, undefined, undefined, sharedSecondLevelSortingContext ) );
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
                                // sort this array by 'ovc'
                                sls_item.sort( _COMMON.useDefaultComparer( undefined, true, 'PLAIN_Comparator', sharedSecondLevelSortingContext ) );

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
         * @param {Object} params
            - predicateArray
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                // @ts-ignore
                _PHYSICAL_FILTER.executeWhereFilter(
                    this,
                    params.predicateArray
                );
            },

        group_by: /**
         * @param {Object} params
         *  - predicateArray
         *  - udfGroupKeySelector
         *  - udfEqualityComparer
         *  - udfGroupProjector
         *  - udfGroupElementsProjector
         *  - udfGroupResultValueSelector
         *  - terminateFlowAndReturnData
         *  - isDictionaryContext
         * @param {boolean} sharedSecondLevelSortingCtx
         */
            function ( params, sharedSecondLevelSortingCtx )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray || udfGroupKeySelector );

                // invoke core logic
                _PHYSICAL_FILTER.executeGroupByFilter(
                    this,
                    params.predicateArray,
                    params.udfGroupKeySelector,
                    params.udfEqualityComparer,
                    params.udfGroupProjector,
                    params.udfGroupElementsProjector,
                    params.udfGroupResultValueSelector,
                    params.terminateFlowAndReturnData,
                    params.isDictionaryContext
                );
            },

        order_asc_or_desc: /**
         * @param {Object} params
         *  - keyPartSelectorArray
         *  - udfComparer
         *  - enumValue
         * @param {Object} actionContext
         */
            function ( params, actionContext )
            {
                // check query filter syntax
                /**
                 * Based on this sort input type do syntax check :
                 *      - pass additional parameter because it's sorting context
                 *      - return some metadata for comparator function
                 * In second-level sorting discard returned metadata from syntax check and proceed with custom second-level sorting mechanism.
                */

                // invoke core logic
                _PHYSICAL_FILTER.executeOrderFilter(
                    this,
                    params.keyPartSelectorArray,
                    params.udfComparer,
                    params.enumValue,
                    actionContext.sortingMetadataCtx.getMetadata(), // = _SYNTAX.check( this._ctx.coll_index, keyPartSelectorArray, true );
                    actionContext.sharedSecondLevelSortingCtx
                );
            },

        list_t: /**
         * @param {Object} params
         *  - fallbackOnDefault
         */
            function ( params )
            {
                // invoke core logic
                _PHYSICAL_FILTER.executeOneItemFilter(
                    this,
                    params.predicateArray, // null by design
                    params.fallbackOnDefault,
                    params.enumValue
                );
            },

        reverse_t: /**
         * @param {Object} params
         *  - startingIndex
         *  - count
         *  - enumValue
         */
            function ( params )
            {
                // invoke core logic
                _PHYSICAL_FILTER.executeRangeFilter(
                    this,
                    params.predicateArray, // null by design
                    params.startingIndex,
                    params.count,
                    params.enumValue
                );
            },

        add_t: /**
         * @param {Object} params
         *  - collectionOrItem
         *  - enumValue
         */
            function ( params )
            {
                // considering different scenarios there should not be syntax checking

                // invoke core logic
                _PHYSICAL_FILTER.executeMergeFilter(
                    this,
                    params.collectionOrItem,
                    params.enumValue
                );
            },

        skip_or_take: /**
         * @param {Object} params
         *  - count
         *  - predicateArray
         *  - enumValue
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                _PHYSICAL_FILTER.executeRangeFilter(
                    this,
                    params.predicateArray,
                    params.index, // null by design
                    params.count,
                    params.enumValue
                );
            },

        first_or_default: /**
         * @param {Object} params
         *  - predicateArray
         *  - fallbackOnDefault
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter(
                    this,
                    params.predicateArray,
                    params.fallbackOnDefault,
                    params.enumValue
                );
            },

        last_or_default: /**
         * @param {Object} params
         *  - predicateArray
         *  - fallbackOnDefault
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter(
                    this,
                    params.predicateArray,
                    params.fallbackOnDefault,
                    params.enumValue
                );
            },

        single_or_default: /**
         * @param {Object} params
         *  - predicateArray
         *  - fallbackOnDefault
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _PHYSICAL_FILTER.executeOneItemFilter(
                    this,
                    params.predicateArray,
                    params.fallbackOnDefault,
                    params.enumValue
                );
            },

        all_or_any: /**
         * @param {Object} params
         *  - predicateArray
         *  - enumValue
         */
            function ( params )
            {
                // check query filter syntax
                // @ts-ignore
                //_SYNTAX.check( this._ctx.coll_index, predicateArray );

                // invoke core logic
                return _LOGICAL_FILTER.applyAllAnyFilter(
                    this,
                    params.predicateArray,
                    params.enumValue
                );
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
        ___init___: /**
           The flag 'overrideToString' tells whether to override Object's built-in method toString in order to provide unique identification of such object.
           Unique identification of any object - preferably data object - is generated independently of the body of the object in question.
         * @param {boolean} overrideToString
         */
            function ()
            {
                return init_I_1L();



                /**
                 * Local helper methods
                 */
                function init_I_1L ()
                {
                    // enable usage of JLC 1.0
                    debugger;
                    _LINQ_CONTEXT.___init___( _COMMON.createContextOfLINQ );

                    //createLinqContext_I_2L();



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

                        // add methods to Linq context objects without constraints
                        addLinqMethodsToContext_I_3L(

                            [
                                [ 'where', false ], [ 'groupBy', false ],
                                [ 'concat', false ], [ 'append', false ], [ 'prepend', false ],
                                [ 'skip', false ], [ 'skipWhile', false ], [ 'take', false ], [ 'takeWhile', false ], [ 'reverse', false ], [ 'reverseSubset', false ],
                                [ 'orderBy', false ], [ 'orderByDescending', false ], [ 'thenBy', false ], [ 'thenByDescending', false ],
                                [ 'toArray', true ], [ 'toDictionary', true ],
                                [ 'first', true ], [ 'firstOrDefault', true ], [ 'last', true ], [ 'lastOrDefault', true ], [ 'single', true ], [ 'singleOrDefault', true ],
                                [ 'any', true ], [ 'all', true ]
                            ]
                        );



                        /**
                         * Local helper methods
                        */

                        /**
                         * @param {string | any[]} method_arr
                        */
                        function addLinqMethodsToContext_I_3L ( method_arr )
                        {
                            // add methods to Linq context object
                            add_LM2C_I_4L();

                            // add action constraints to Linq methods
                            add_AC_I_4L();



                            /**
                             * Local helper functions
                            */
                            function add_LM2C_I_4L ()
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

                            function add_AC_I_4L ()
                            {
                                // create new instance of query flow base constraints (qfbc)
                                Object.defineProperty(
                                    _CONSTRAINT,
                                    '_baseConstraints',
                                    {
                                        // only override getter
                                        get: function ()
                                        {
                                            return declareBaseActionConstraints_I_5L();
                                        }
                                    }
                                );



                                /**
                                 * Local helper methods
                                */

                                function declareBaseActionConstraints_I_5L ()
                                {
                                    // declare base action constraints object
                                    var baco = Object.create( null );

                                    // declare base action constraints array
                                    var arr =
                                        [
                                            [
                                                System.Linq.Context.where,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.groupBy,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.concat,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.append,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.prepend,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.skip,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.skipWhile,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.take,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.takeWhile,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.reverse,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.reverseSubset,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.orderBy,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: true }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ? (by design this action constraint is writable)
                                                    true,
                                                    // is syntax checking for this query method required
                                                    true,
                                                    // sorting context
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.orderByDescending,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: true }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ? (by design this action constraint is writable)
                                                    true,
                                                    // is syntax checking for this query method required
                                                    true,
                                                    // sorting context
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.thenBy,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [],
                                                    // action constraint functions
                                                    [
                                                        // handle 2nd level sorting context
                                                        udf_constraints.handleSecondLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true,
                                                    // sorting context
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.thenByDescending,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [],
                                                    // action constraint functions
                                                    [
                                                        // handle 2nd level sorting context
                                                        udf_constraints.handleSecondLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true,
                                                    // sorting context
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.toArray,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    false
                                                )
                                            ],
                                            [
                                                System.Linq.Context.toDictionary,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.first,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.firstOrDefault,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.last,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.lastOrDefault,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.single,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.singleOrDefault,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.any,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ],
                                            [
                                                System.Linq.Context.all,
                                                createConstraintObject_I_6L(
                                                    // this action context object
                                                    null,
                                                    // data to pass to respective action constraint function, i.e. action constraint functions [0], action constraint functions [1], etc. 
                                                    [
                                                        { flag: false }
                                                    ],
                                                    // action constraint functions
                                                    [
                                                        // handle 1st level sorting context
                                                        udf_constraints.handleResetFirstLevelSorting,

                                                        // do syntax checking
                                                        _SYNTAX.check
                                                    ],
                                                    // is writable - can you update state during query flow ?
                                                    false,
                                                    // is syntax checking for this query method required
                                                    true
                                                )
                                            ]
                                        ];


                                    var bac;
                                    // loop over base action constraints array
                                    for ( var i = 0; i < arr.length; i++ )
                                    {
                                        // reference current base action constraint
                                        bac = arr[ i ];

                                        // add current base action constraint (bac) to base action constraints object (baco) 
                                        baco[ bac[ 0 ] ] = bac[ 1 ];
                                    }

                                    // return base action constraints object
                                    return baco;



                                    /**
                                     * Local helper functions
                                     */

                                    /**
                                     * @param {any} [actionCtx]
                                     * @param { any[]} [data_arr]
                                     * @param { function[]} [funcs_arr]
                                     * @param {boolean} [writable]
                                     * @param {boolean} [check_syntax]
                                     * @param {boolean} [is_sort_ctx]
                                    */
                                    function createConstraintObject_I_6L ( actionCtx, data_arr, funcs_arr, writable, check_syntax, is_sort_ctx )
                                    {
                                        // create constraint object
                                        var co = Object.create( null );

                                        /**
                                             * You can define here any logic you want your constraint object to do 
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
                            }
                        }
                    }
                }
            },

        Funcs: {
            applyJLC: function ()
            {
                // do necessary cleanup before starting current query flow
                _COMMON.clearCache( undefined );


                // get token associated with current collection, aka root token
                var rootToken = new Date().getTime();

                // create copy of this collection
                var _this = this.slice( 0 );

                // assign token to collection
                _this._rootToken = rootToken;

                // pass data in to the mechanism - 'this' refers to the calling client data array !
                var coll_idx = over_I_1L( _this );


                // store updated metadata about collection and return whether collection input type is primitive
                var is_prim = update_CM_I_1L( _this.length > 1, _this[ 0 ] );


                // get JLC API instance
                return _COMMON.jlcNew( { coll_index: coll_idx, root_token: rootToken, is_prim: is_prim, parent: null } );



                /**
                 * Local helper functions
                */

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

                /**
                 * @param {boolean} length_gte_2 Tells whether collection has at least 2 items
                 * @param {string | number | boolean | any} firstItem First item in current collection
                 */
                function update_CM_I_1L ( length_gte_2, firstItem )
                {
                    /**
                     * To enable syntax check, fetch object structure (all keys at all levels).
                     * Fetch them provided that collection is not empty !
                    */

                    // detect collection input data type to provide type of source of syntax checking
                    _ACTION.hpid.columnSet.cit = _COMMON.detectCIT( firstItem, !firstItem ? false : true, length_gte_2 );

                    // if cit is UNKNOWN, skip further operations
                    if ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.UNKNOWN ) return;

                    // otherwise initialize column metadata set based on current collection
                    _ACTION.hpid.columnSet.init( firstItem );

                    // is primitive type of this item
                    var isPrimitive = _COMMON.isPrimitiveType( firstItem ) && ( _ACTION.hpid.columnSet.cit === _ENUM.CIT.PRIMITIVE );

                    // return cit
                    return isPrimitive;
                }
            }
        }
    };

    /* ~ private variables */



    /* Initialize JLC */
    _SETUP.___init___();
}
)();