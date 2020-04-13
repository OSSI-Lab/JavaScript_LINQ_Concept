/*
 * JavaScript LINQ Concept
 * The idea of querying JavaScript object collections is entirely based on programming language from Microsoft called C# !
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function () {


    /* private variables */

        // declare a private query debugger
        var _QUERY_DEBUGGER = {
            ___init___ : function() {
                // mark that Query Debugger was initialized
                this.Vars.initialized = true;

                // enable detection of open/closed browser's console
                Object.defineProperty(this.Vars._I, 'id', { get : this.Funcs.enable_query_debugger });

                // invoke JLC 1.0 Query Debugger
                requestAnimationFrame(this.Funcs.run);
            },

            // internal state of the query debugger
            Vars : {
                initialized : false,
                debugStatus : '',

                menu : "\r\nJLC 1.0 Query Debugger (🐛) reports for duty ! 🖥️💻 \r\n\r\n====================================================================================================================================\r\n\r\nIt dynamically enables injection of ResultsView data projection !\r\nThe goal is to show dynamically - only WHILE DEBUGGING - current state of JLC query being processed - almost like in C# 😉\r\n\r\n====================================================================================================================================\r\n\r\nNot intended to use by the group of some 'false engineers' -> 🤡",
                isSwitchedOn : false,

                debugData : null,

                _I : new Image(),
                _c : 0,
            },

            // query debugger internal API
            Funcs : {
                is_initialized : function() {
                    return _QUERY_DEBUGGER.Vars.initialized;
                },

                run : function () {
                    // prepare query debugger UI state as off
                    _QUERY_DEBUGGER.Vars.debugStatus = 'off';
                    
                    // mark query debugger as off
                    _QUERY_DEBUGGER.Vars.isSwitchedOn = false;

                    // switch query debugger off
                    console.warn(_QUERY_DEBUGGER.Vars._I);
                    
                    // update query debugger UI
                    document.querySelector('#devtool-status').className  = _QUERY_DEBUGGER.Vars.debugStatus;

                    requestAnimationFrame(_QUERY_DEBUGGER.Funcs.run);
                    // check periodically for state updates
                },
                
                enable_query_debugger : function () {
                    // prepare query debugger UI state as on
                    _QUERY_DEBUGGER.Vars.debugStatus = 'on';

                    // update query debugger UI
                    document.querySelector('#devtool-status').className  = _QUERY_DEBUGGER.Vars.debugStatus;
                    
                    // display query debugger menu
                    _QUERY_DEBUGGER.Vars._c++;
                    if(_QUERY_DEBUGGER.Vars._c == 1) {
                        // mark query debugger as on
                        _QUERY_DEBUGGER.Vars.isSwitchedOn = true;

                        console.log(_QUERY_DEBUGGER.Vars.menu);                        
                    }

                    if(_QUERY_DEBUGGER.Vars._c >= 1) {
                        // inject dynamically some DEBUG data - THIS IS AN EXEMPLARY USAGE - to show the purpose, not the exact functionality !
                        _QUERY_DEBUGGER.Vars.debugData = _QUERY_DEBUGGER.Vars.debugData || _DATA;                        
                    }
                },

                is_switched_on : function() {
                    if(_QUERY_DEBUGGER.Vars.isSwitchedOn || _QUERY_DEBUGGER.Vars._c > 0) {
                        // inject dynamically some DEBUG data - THIS IS AN EXEMPLARY USAGE - to show the purpose, not the exact functionality !
                        _QUERY_DEBUGGER.Vars.debugData = _QUERY_DEBUGGER.Vars.debugData || _DATA;
                    }

                    // return the state of the query debugger - on/off
                    return _QUERY_DEBUGGER.Vars.isSwitchedOn || _QUERY_DEBUGGER.Vars._c > 0;
                },

                getDebugData : function() {
                    return _QUERY_DEBUGGER.Vars.debugData;
                }
            }
        }

        // declare a private enum object
        var _ENUM = {
                FIRST : "first",
                LAST : "last",
                SINGLE : "single",
                ALL : "all",
                ANY : "any",
                REVERSE : "reverse",
                REVERSE_EXT : "reverse_ext",
                SKIP : "skip",
                TAKE : "take",
                JOIN : "join",
                LEFT_JOIN : "left_join",
                SAVE : "save",
                UPDATE : "update",
                CONCAT : "concat",
                APPEND : "append",
                PREPEND : "prepend",

                ORDER : {
                    By : {
                        ASC : "asc",
                        DESC : "desc",
                        THEN_ASC : "then_asc",
                        THEN_DESC : "then_desc"
                    },
                    InputType : {
                        PLAIN : "plain_object",
                        GROUPING : "grouping_object",
                        DICTIONARY : "dictionary_object",
                        KVP : "key_value_pair_object"
                    }
                    
                }
        };

        // declare a private action object
        var _ACTION = {
            // create 'current' query-wide HPID, i.e. holder of physical intermediate data
            hpid : {
                // is data holder activated
                isOn : false,
                
                // array for storing physical intermediate data
                data : [],

                /**
                 * Handle special case that returns the so-far filtered off array.
                 * The following parameter called 'done' when set to 'true' tells to discard returned result and go for the so-far filtered off array as the final result 
                */
                done : false
            },

            // create action that represents filtering logic for given Linq's method
            create : function(jlc_instance_ctx, core_method_bind, context, to_execute) {
                // create an action
                var action = {
                    // store information whether this action is executable one
                    returnsData : System.Linq.QueryResult[context],

                    // store collection index
                    coll_ref : jlc_instance_ctx.coll_index,

                    // store root of the chain filters
                    chain_root_id : jlc_instance_ctx.root_token,

                    // store parent of this action
                    parent : jlc_instance_ctx.parent,

                    // execute this action by invoking its API which is execute method in turn invoking its core method with binded parameters
                    execute : function() {
                        return core_method_bind();
                    }
                };

                // create context of this action
                var ctx = {
                    // collection reference id
                    coll_index : jlc_instance_ctx.coll_index,
                        
                    // collection token
                    root_token : jlc_instance_ctx.root_token,

                    // parent action chained to this action
                    parent : action
                };

                // invoke real data filtering and produce output 
                if(to_execute)
                    // execute all actions
                    return this.executeChain(ctx);
                // otherwise enable further flow of actions
                else
                    // return new instance api and pass context of current action to provide chain of actions to execute
                    return _COMMON.jlcNew(ctx);
            },

            // execute all actions in the chain
            executeChain : function(jlc_ctx) {
                return execute_C_I_1L(jlc_ctx);



                /**
                 * Local helper functions 
                */
                function execute_C_I_1L(jlc_ctx) {
                    // reset temp storage flags
                    _ACTION.hpid.isOn = _ACTION.hpid.done = false;
                    // reset holder of physical intermediate data
                    Array.isArray(_ACTION.hpid.data) ? _ACTION.hpid.data.length = 0 : _ACTION.hpid.data = [];


                    // execute all actions and determine the final output...
                    var result = executeActionsRecursively_I_2L(jlc_ctx.parent);

                    // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true
                    if(_ACTION.hpid.done && Array.isArray(_ACTION.hpid.data))
                        return _ACTION.hpid.data.slice(0);
                    
                    // check if 'special case' occurred determined by the hpid's flag called 'done' being set to true and current filtered off data is either a dictionary or an object...
                    if(_ACTION.hpid.done)
                        return _ACTION.hpid.data;

                    // ... otherwise return result as the output
                    return result;



                    /**
                     * Local helper functions 
                    */
                    function executeActionsRecursively_I_2L(parentAction) {
                        // go all the way down to the root action
                        if(parentAction.parent)
                            executeActionsRecursively_I_2L(parentAction.parent);
                            
                        // invoke this root action and go recursively all the way up to action that ends the action chain; returns data if it has to so
                        if(parentAction.returnsData)
                            return parentAction.execute();
                        else
                            parentAction.execute();
                    }
                }
            }
        };

        // declare a private common object
        var _COMMON = {
            jlcNew : function(ctx) {
                return get_Instance_I_1L(ctx);



                /**
                 * Local helper functions
                */
                function get_Instance_I_1L(ctx) {
                    // declare JavaScript LINQ Concept API object
                    var api = {
                        // ~ TO BE IMPLEMENTED AGAIN
                        orderBy : function(keyPartSelectorArray, udfComparer) {


                            // sorts the collection in ascending order according to a key or using given comparer
                            _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_ASC);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED AGAIN
                        orderByDescending : function(keyPartSelectorArray, udfComparer) {


                            // sorts the collection in descending order according to a key or using given comparer
                            _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_DESC);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED AGAIN
                        reverse : function(params, startingIndex, count, context) {
                            // create action and proceed with further flow
                            return _ACTION.create(this, _CORE.reverse_t.bind(this, params['startingIndex'], params['count'], _ENUM.REVERSE), true, true, true, params['context']);
                        },

                        // ~ TO BE IMPLEMENTED AGAIN
                        reverseExt : function(params, startingIndex, count, context) {
                            // create action and proceed with further flow
                            return _ACTION.create(this, _CORE.reverse_t.bind(this, params['startingIndex'], params['count'], _ENUM.REVERSE_EXT), false, false, true, params['context']);
                        },
                        
                        // ~ TO BE IMPLEMENTED
                        select : function(arrayOfNewObjectProps, outputType) {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED
                        join : function(anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType) {


                            // join two sequences based on defined keys
                            _CORE.apply_set_based_operations(this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.JOIN);

                            // return api to enable further flow
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED
                        leftJoin : function(anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType) {


                            // left join two sequences based on defined keys
                            _CORE.apply_set_based_operations(this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.LEFT_JOIN);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED
                        contains : function(collectionItem, udfEqualityComparer) {
                            //

                            // return true/false
                        },

                        // ~ TO BE IMPLEMENTED
                        distinct : function(udfEqualityComparer) {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED                            
                        except : function() {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ~ TO BE IMPLEMENTED ?
                        intersect : function() {

                        },

                        // ~ TO BE IMPLEMENTED ?
                        union : function() {

                        },






                        /**
                         * ALREADY IMPLEMENTED 
                        */

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                        */
                        where : function (params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.where.bind(this, params['predicateArray']), System.Linq.Context.where);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfEqualityComparer
                         *  - udfGroupProjector
                         *  - udfGroupElementsProjector
                         *  - udfGroupResultValueSelector
                         *  - terminateFlowAndReturnData
                        */
                        groupBy : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(
                                                    this._ctx,
                                                    _CORE.group_by.bind(
                                                                        this,
                                                                        params['predicateArray'],
                                                                        params['udfEqualityComparer'],
                                                                        params['udfGroupProjector'],
                                                                        params['udfGroupElementsProjector'],
                                                                        params['udfGroupResultValueSelector'],
                                                                        true
                                                                       ),
                                                    System.Linq.Context.groupBy
                                                 );
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - inputCollection
                        */
                        concat : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.add_t.bind(this, params['inputCollection'], _ENUM.CONCAT), System.Linq.Context.concat);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - collectionItem
                        */
                        append : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.add_t.bind(this, params['collectionItem'], _ENUM.APPEND), System.Linq.Context.append);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - collectionItem
                        */
                        prepend : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.add_t.bind(this, params['collectionItem'], _ENUM.PREPEND), System.Linq.Context.prepend);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - count
                        */
                        skip : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.skip_or_take.bind(this, params['count'], null, _ENUM.SKIP), System.Linq.Context.skip);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                        */
                        skipWhile : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.skip_or_take.bind(this, null, params['predicateArray'], _ENUM.SKIP), System.Linq.Context.skipWhile);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - count
                        */
                        take : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.skip_or_take.bind(this, params['count'], null, _ENUM.TAKE), System.Linq.Context.take);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                        */
                        takeWhile : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.skip_or_take.bind(this, null, params['predicateArray'], _ENUM.TAKE), System.Linq.Context.takeWhile);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - udfEqualityComparer
                         *  - udfGroupElementsProjector
                         *  - context
                        */
                        toDictionary : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(
                                                    this._ctx,
                                                    _CORE.group_by.bind(
                                                                        this,
                                                                        params['predicateArray'],
                                                                        params['udfEqualityComparer'],
                                                                        null,
                                                                        null,
                                                                        params['udfGroupResultValueSelector'],
                                                                        true,
                                                                        true // is dictionary context
                                                                       ),
                                                    System.Linq.Context.toDictionary,
                                                    true
                                                );
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                        */
                        toArray : function() {
                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.list_t.bind(this, true), System.Linq.Context.toArray, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        first : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.first_or_default.bind(this, params['predicateArray'], false), System.Linq.Context.first, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        firstOrDefault : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};
                            
                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.first_or_default.bind(this, params['predicateArray'], true), System.Linq.Context.firstOrDefault, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        last : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.last_or_default.bind(this, params['predicateArray'], false), System.Linq.Context.last, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        lastOrDefault : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.last_or_default.bind(this, params['predicateArray'], true), System.Linq.Context.lastOrDefault, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        single : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.single_or_default.bind(this, params['predicateArray'], false), System.Linq.Context.single, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        singleOrDefault : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.single_or_default.bind(this, params['predicateArray'], true), System.Linq.Context.singleOrDefault, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        any : function(params) {
                            // handle "default" parameter
                            if (params === undefined) params = {};

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.all_or_any.bind(this, params['predicateArray'], _ENUM.ANY), System.Linq.Context.any, true);
                        },

                        /**
                         * Serves the same purpose as Where method in LINQ from C#.
                         * @param {object} params Contains all possible params used by this method :
                         *  - predicateArray
                         *  - context
                        */
                        all : function(params) {
                            // handle missing params object
                            if (params === undefined) throw ReferenceError("Method [ all ] has to have 'params' object provided !");
                            if(params['predicateArray'] === undefined) throw TypeError("Method [ all ] with 'params' object provided is missing 'predicateArray' array !");

                            // create action and proceed with further flow
                            return _ACTION.create(this._ctx, _CORE.all_or_any.bind(this, params['predicateArray'], _ENUM.ALL), System.Linq.Context.all, true);
                        },

                        /**
                         * Special method that tells whether query debugger is available ! 😀😉
                         * Can be safely removed if library moved to production. 🙂
                         * 
                         * Go to line 1591 to remove from initialization JLC 1.0 Query Debugger 
                        */
                        ifConsoleDebug : function() {
                            // is JLC 1.0 Query Debugger initialized ?
                            var is_initialized = _QUERY_DEBUGGER.Funcs.is_initialized();
                            
                            if(is_initialized) {
                                // check the state of the query debugger - on/off
                                var is_on = _QUERY_DEBUGGER.Funcs.is_switched_on();

                                // if switched on, enable fetching some debug data
                                if(is_on) {
                                    this.debugResultsView = function() {
                                        // fetch on demand some DEBUG data !!!!!!!
                                        return _QUERY_DEBUGGER.Funcs.getDebugData(); 
                                    };
                                }

                                // return the state of the query debugger - on/off
                                return is_on;
                            }
                            else {
                                throw Error('JLC 1.0 Query Debugger not initialized !');
                            }
                        }
                    };

                    // bind context to this API instance
                    api._ctx = ctx;

                    // return JLC API instance
                    return api;
                }
            },

            getContext : function(f) {
                return getContext_I_1L(f);



                /**
                 * Local helper functions
                */
                function getContext_I_1L(f) {
                    // get the invocation method context, i.e. get the information, which method you invoke
                    var f_n_arr = f.name.split(" ");
                            
                    // in case it's a bound method, get the root method
                    var ctx = f_n_arr[f_n_arr.length - 1];

                    // return context for current usage
                    return ctx;
                }
            },

            createType : function(templateObject) {
                return createType_I_1L(templateObject);



                /**
                 * Local helper functions
                */
                function createType_I_1L(templateObject) {
                        // loop over all props and delete their values
                        for(var eot_k in templateObject) {
                            // access current property
                            var objProp = templateObject[eot_k];

                            // if it's nested another object, drill down to discover the props of such nested object
                            if(typeof objProp === 'object') {
                                createType_I_1L(objProp);
                            }
                            // for primitive props just set the value to 'undefined'
                            else if(typeof objProp !== 'function') {
                                templateObject[eot_k] = undefined;
                            }
                        }

                        // return the empty object
                        return templateObject;
                }
            },

            createDefaultOfT : function(historyIndex) {
                return createDefaultOfT_I_1L(historyIndex);



                /**
                 * Local helper functions
                */
                function createDefaultOfT_I_1L(historyIndex) {
                        // get collection item type metadata of contextually current collection from history array
                        var itemTypeMetadata = _DATA.getT(historyIndex);

                        if(itemTypeMetadata.isReady)
                            // return an empty proper object
                            return itemTypeMetadata.output;
                        else {
                            if(itemTypeMetadata.makeItEmpty)
                                itemTypeMetadata.output = _COMMON.createType(itemTypeMetadata.source);
                            else
                                itemTypeMetadata.output = itemTypeMetadata.source;

                            // return an empty proper object
                            return itemTypeMetadata.output;
                        }
                }
            },

            createGroupingOrSortingKey : function(keyPartSelectorArray) {
                return createGroupingOrSortingKey_I_1L(keyPartSelectorArray);



                /**
                 * Local helper functions
                */
                function createGroupingOrSortingKey_I_1L(keyPartSelectorArray) {
                    // define array holding grouping or sorting logic key
                    var key = [];

                    // loop over all key selectors
                    for(var i = 0; i < keyPartSelectorArray.length; i++) {
                        // access current key part selector
                        var keyPartSelector = keyPartSelectorArray[i];

                        // get the value
                        var value = keyPartSelector[0];

                        // is this a property of the object
                        var isValidProperty = keyPartSelector[1];

                        // store object representing part of the key
                        key.push({value : value, isValidProperty : isValidProperty, isComplex : value.indexOf('.') > -1});
                    }

                    // return array holding grouping or sorting logic key
                    return key;
                }
            },

            useDefaultComparer : function(keyPartSelectorArray) {
                return useDefaultComparer_I_1L(keyPartSelectorArray);



                /**
                 * Local helper functions
                */
                function useDefaultComparer_I_1L(keyPartSelectorArray) {
                    // define comparer object
                    var comparer = {
                        input : keyPartSelectorArray,

                        defaultComparer : function(itemCurrent, itemPrevious) {
                            var keyPart, itemCurrentValue, itemPreviousValue;

                            // get the array of sorting key parts
                            var key_array = _COMMON.createGroupingOrSortingKey(this.input);

                            // loop over key parts and apply the comparison logic
                            for(var j = 0; j < key_array.length; j++) {
                                // reference the key part
                                keyPart = key_array[j];

                                // is it complex ?
                                if(keyPart.isValidProperty && keyPart.isComplex) {
                                    // get the property value from both, the current and the previous object
                                    itemCurrentValue += _LOGICAL_FILTER.applyPropertyValueFilter(itemCurrent, keyPart.value, true);
                                    itemPreviousValue += _LOGICAL_FILTER.applyPropertyValueFilter(itemPrevious, keyPart.value, true);
                                }
                                // is it simple ?
                                else if(keyPart.isValidProperty) {
                                    itemCurrentValue += itemCurrent[keyPart.value];
                                    itemPreviousValue += itemPrevious[keyPart.value];
                                }
                                // otherwise apply some part that is not a property of an object
                                else {
                                    itemCurrentValue += keyPart.value;
                                    itemPreviousValue += keyPart.value;
                                }
                            }

                            // determine the sorting order of the comparer
                            switch (enumValue) {
                                case _ENUM.ORDER_ASC:
                                case _ENUM.ORDER_THEN_ASC:
                                    // go the ASC way
                                    if(itemCurrentValue > itemPreviousValue)
                                        return 1;
                                    else
                                        return -1;

                                case _ENUM.ORDER_DESC:
                                case _ENUM.ORDER_THEN_DESC:
                                    // go the DESC way
                                    if(itemCurrentValue > itemPreviousValue)
                                        return -1;
                                    else
                                        return 1;

                                 default:
                                    throw Error("Unsupported sorting order [ " + enumValue + " ] !");
                            }
                        }
                    };

                    // bind the comparer to comparer object
                    comparer.defaultComparer.bind(comparer);

                    // return the comparer itself
                    return comparer.defaultComparer;
                }
            },

            // CURRENTLY NOT IN USAGE 
            resultsView : function(token) {
                return resultsView_I_1L(token);



                /**
                 * Local helper functions
                */
                function resultsView_I_1L(token) {
                        // get metadata of contextually current collection from the collection history array
                        var metadata = _DATA.fetch(token); 

                        // create result view object that holds current query metadata
                        return {
                            // current index of contextually current query collection in collection history array
                            dataToken : metadata.index,
                                    
                            // contextually current query collection
                            dataYield : metadata.collection
                        };
                }
            }            
        };

        // declare a private physical filters object
        var _PHYSICAL_FILTER = {
                executeWhereFilter : function(jlc, predicateArray, skipOrTakeEnum) {
                    return execute_WF_I_1L(jlc, predicateArray, skipOrTakeEnum);



                    /**
                     * Local helper functions
                    */
                    function execute_WF_I_1L(jlc, predicateArray, skipOrTakeEnum) {
                            // declare current intermediate collection
                            var c_i_c = [];

                            // create input collection cache
                            var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch(jlc._ctx.coll_index).collection;

                            // if we're dealing with skipWhile...
                            if(skipOrTakeEnum === _ENUM.SKIP) {
                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    var passed = _LOGICAL_FILTER.applyLogicalBoolFilter(c_o, predicateArray, i);

                                    // if object didn't pass the filter
                                    if(!passed) {
                                        // take the rest of the collection
                                        c_i_c = currentColl.slice(i);

                                        // and break further skipping 
                                        break;
                                    }
                                }
                            }
                            // if we're dealing with takeWhile...                            
                            else if(skipOrTakeEnum === _ENUM.TAKE) {
                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    var passed = _LOGICAL_FILTER.applyLogicalBoolFilter(c_o, predicateArray, i);

                                    // if object passed the filter
                                    if(passed)
                                        c_i_c.push(c_o);
                                    // if object didn't pass the filter
                                    else
                                        // and break further taking 
                                        break;
                                }
                            }
                            // otherwise we're dealing with 'normal where' case
                            else {
                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    passed = _LOGICAL_FILTER.applyLogicalBoolFilter(c_o, predicateArray, i);

                                    // based on filtering result (true/false) pass object further down the flow
                                    if(passed)
                                        c_i_c.push(c_o);
                                }
                            }

                            // update HPID object to enable further data flow
                            _ACTION.hpid.data = c_i_c;
                            if(!_ACTION.hpid.isOn) _ACTION.hpid.isOn = true;
                    }
                },

                executeGroupByFilter : function(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext) {
                    return execute_GBF_I_1L(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext);



                    /**
                     * Local helper functions
                    */
                    function execute_GBF_I_1L(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext) {
                            // check if grouping key is present
                            if(predicateArray) {
                                // create the key
                                var key_array = _COMMON.createGroupingOrSortingKey(predicateArray);

                                // declare groups object
                                var groups = {};

                                // get contextually current collection within history array
                                var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch(jlc._ctx.coll_index).collection;

                                // do grouping
                                currentColl.forEach(function (item) {
                                    // get the group id
                                    var id = getTheKeyValue_I_2L(item);

                                    // project group id if required
                                    if(udfGroupProjector)
                                        id = (udfGroupProjector.bind(id))();

                                    // project group elements if required
                                    if(udfGroupElementsProjector)
                                        item = (udfGroupElementsProjector.bind(item))();

                                    
                                    /**
                                     * Distinguish between dictionary and grouped objects
                                     *  - dictionary keys has to be unique
                                     *  - values are primitives values or objects, not single elements of array 
                                    */
                                    if(isDictionaryContext && groups[id])
                                        throw Error('Item with the same key was already added to this dictionary object !');

                                    // distinguish between dictionary and grouped objects while preparing Key <-> Value pairs
                                    if(isDictionaryContext) {
                                        // store object under this key
                                        groups[id] = item;
                                    }
                                    else {
                                        // reference the list of elements
                                        var list = groups[id];

                                        // if such group exists
                                        if (list) {
                                            // add object to this group
                                            list.push(item);
                                        // otherwise create a new group
                                        }
                                        else {
                                            // add object to this group
                                            groups[id] = [item];
                                        }
                                    }
                                });

                                // sort the groups by using user-defined or a default comparer
                                if(udfEqualityComparer)
                                groups = sortGroups_I_2L(udfEqualityComparer);

                                // update HPID object to enable further data flow
                                _ACTION.hpid.data = groups;
                                if(!_ACTION.hpid.isOn) _ACTION.hpid.isOn = true;                                

                                // check if terminate data flow
                                if(terminateFlowAndReturnData)
                                    _ACTION.hpid.done = true;
                            }
                            // otherwise throw error
                            else {
                                throw Error("groupBy requires a grouping key to be present. Current invocation is missing the key !");
                            }



                            /**
                             * Local helper functions
                            */
                            function getTheKeyValue_I_2L(itemCurrent) {
                                // declare a real key
                                var key;

                                // loop over key parts and apply the comparison logic
                                for(var i = 0; i < key_array.length; i++) {
                                    // reference the key part
                                    keyPart = key_array[i];

                                    // is it complex ?
                                    if(keyPart.isValidProperty && keyPart.isComplex) {
                                        // if key is already initialized
                                        if(key)
                                            // get the property value from both, the current and the previous object
                                            key += _LOGICAL_FILTER.applyPropertyValueFilter(itemCurrent, keyPart.value);
                                        else {
                                            // get the key value - get the property value from both, the current and the previous object
                                            var rkv = _LOGICAL_FILTER.applyPropertyValueFilter(itemCurrent, keyPart.value);

                                            // initialize a key with a default value
                                            key = getDefaultOf_I_3L(rkv);
                                            key += rkv;
                                        }
                                    }
                                    // is it simple ?
                                    else if(keyPart.isValidProperty) {
                                        // if key is already initialized
                                        if(key)
                                            key += itemCurrent[keyPart.value];
                                        else {
                                            // get the key value
                                            var rkv = itemCurrent[keyPart.value];

                                            // initialize a key with a default value
                                            key = getDefaultOf_I_3L(rkv);
                                            key += rkv;
                                        }
                                    }
                                    // otherwise apply some part that is not a property of an object
                                    else {
                                        key += keyPart.value;
                                    }
                                }

                                // return the key from object
                                return key;
                                


                                /**
                                 * Local helper functions 
                                */
                                function getDefaultOf_I_3L(value) {
                                    // determine the type of value
                                    var type = getType_I_4L(value);

                                    // type must be a string
                                    if (typeof type !== 'string') throw new TypeError('Type must be a string.');
                                
                                    // handle simple types (primitives and plain function/object)
                                    switch (type) {
                                        case 'boolean'   : return false;
                                        case 'function'  : return function () {};
                                        case 'null'      : return null;
                                        case 'number'    : return 0;
                                        case 'object'    : return {};
                                        case 'string'    : return "";
                                        case 'symbol'    : return Symbol();
                                        case 'undefined' : return void 0;
                                    }
                                
                                    try
                                    {
                                        // look for constructor in this or current scope
                                        var ctor = typeof this[type] === 'function'
                                                                                    ? this[type]
                                                                                    : eval(type);
                                        return new ctor;
                                    }
                                    // constructor not found, return new object
                                    catch (e)
                                    {
                                        return {};
                                    }



                                    /**
                                     * Local helper functions 
                                    */
                                    
                                    function getType_I_4L(value) {
                                        // determine the type of value
                                        var type = typeof value;
                                    
                                        // primitive or function
                                        if (type !== 'object') return type;

                                        // null
                                        if (value === null) return 'null';
                                    
                                        // everything else, check for a constructor
                                        var ctor = value.constructor;
                                        var name = typeof ctor === 'function' && ctor.name;
                                    
                                        return typeof name === 'string' && name.length > 0 ? name : 'object';
                                    }
                                }
                            }

                            function sortGroups_I_2L(equalityComparer) {
                                // declare array of group keys
                                var keys = [];

                                // loop over all groups
                                for(var gk in groups)
                                    // store current group key
                                    keys.push(gk);

                                // sort the keys
                                keys.sort(equalityComparer);

                                // declare object holding sorted groups
                                var sorted_groups = {};

                                // store grouped objects sorted in a proper way into new object
                                keys.forEach(function(key) {
                                    sorted_groups[key] = groups[key];
                                });

                                // return sorted groups
                                return sorted_groups;
                            }
                    }
                },

                executeRangeFilter : function(jlc, predicateArray, index, count, enumValue) {
                    return extR_I_1L(jlc, predicateArray, index, count, enumValue);



                    /**
                     * Local helper functions
                    */
                    function extR_I_1L(jlc, predicateArray, index, count, enumValue) {
                            if(predicateArray) {
                                // execute the "WHERE" filter
                                _PHYSICAL_FILTER.executeWhereFilter(jlc, predicateArray, enumValue);

                                // check the result
                                return getResult_I_2L(true);
                            }
                            // for no given predicates
                            else {
                                // check the result
                                return getResult_I_2L(false);
                            }



                            /**
                             * Local helper functions
                            */
                            function getResult_I_2L(withPredicates) {
                                // get contextually current collection within history array
                                var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch(jlc._ctx.coll_index).collection;

                                // if the sequence contains elements
                                if(currentColl.length) {
                                    // declare array of reversed sequence
                                    var r_seq = [];

                                    // loop indexes
                                    var i, j;

                                    switch (enumValue) {
                                        case _ENUM.REVERSE:
                                        case _ENUM.REVERSE_EXT:
                                            // determine the valid range of sequence to reverse
                                            if((index || index === 0) && count) {
                                                if(index + count - 1 > currentColl.length - 1)
                                                    throw Error("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection !");
                                                else if(index + count - 1 === currentColl.length - 1)
                                                    i = currentColl.length - 1;
                                                else if(index + count - 1 < currentColl.length - 1)
                                                    i = index + count - 1;

                                                // reverse the sequence
                                                for(i; i >= index; i--)
                                                    r_seq.push(currentColl[i]);

                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                currentColl[j + index] = r_seq[j];
                                            }
                                            else if((index || index === 0) && enumValue === _ENUM.REVERSE_EXT) {
                                                // reverse the sequence
                                                for(i = currentColl.length - 1; i >= index; i--)
                                                    r_seq.push(currentColl[i]);

                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                currentColl[j + index] = r_seq[j];
                                            }
                                            else if(count && enumValue === _ENUM.REVERSE_EXT) {
                                                // determine the start index
                                                index = currentColl.length - 1 - count;

                                                // reverse the sequence
                                                for(i = currentColl.length - 1; i > index; i--)
                                                    r_seq.push(currentColl[i]);

                                                // increment the starting index by 1 because of condition i > index
                                                index++;
                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                currentColl[j + index] = r_seq[j];
                                            }
                                            else {
                                                if(enumValue === _ENUM.REVERSE && (index || count)) {
                                                    console.warn("Invoking Reverse with only one of the parameters defaults to parameterless Reverse !");
                                                    console.warn("If you wanna use only one of the parameters resort to ReverseExt instead !");
                                                }
                                                // reverse the whole sequence
                                                for(i = currentColl.length - 1; i >= 0; i--)
                                                    r_seq.push(currentColl[i]);

                                                // replace original sequence with the reversed sequence
                                                currentColl = r_seq;
                                            }

                                            break;

                                        case _ENUM.SKIP:
                                                // process skip only (no predicates, just count), because skipWhile was handled by executing the "WHERE" filter in the parent method
                                                if(!withPredicates) {
                                                    // for null or undefined count just throw an error
                                                    if(!count && count !== 0)
                                                        throw Error("Supply required parameter called count !");

                                                    // determine the valid range of sequence to extract
                                                    if(count > 0 && count < currentColl.length) {
                                                        for(i = count; i < currentColl.length; i++)
                                                            r_seq.push(currentColl[i]);
                                                    }
                                                    // skip the whole sequence
                                                    else if(count >= currentColl.length)
                                                        ;
                                                    // skip nothing, which means taking whole sequence
                                                    else if(count < 0)
                                                        r_seq = currentColl;

                                                    // skip the first element with index equal to 0
                                                    else if(count === 0) {
                                                        for(i = 1; i < currentColl.length; i++)
                                                            r_seq.push(currentColl[i]);
                                                    }


                                                    // replace original sequence with the new sequence
                                                    currentColl = r_seq;
                                                }

                                                break;

                                        case _ENUM.TAKE:
                                                // process take only (no predicates, just count), because takeWhile was handled by executing the "WHERE" filter in the parent method
                                                if(!withPredicates) {
                                                    // for null or undefined count just throw an error
                                                    if(!count)
                                                        throw Error("Supply required parameter called count !");

                                                    // determine the valid range of sequence to extract
                                                    if(count >= currentColl.length)
                                                        r_seq = currentColl;

                                                    else if(count > 0 && count < currentColl.length) {
                                                        for(i = 0; i < count; i++)
                                                            r_seq.push(currentColl[i]);
                                                    }
                                                    // take nothing which means no any processing required
                                                    else if(count <= 0)
                                                        ;

                                                    // replace original sequence with the new sequence
                                                    currentColl = r_seq;
                                                }

                                                break;

                                        default:
                                            throw Error("Unrecognized logical type of collection item [ " + enumValue +  " ] !");
                                    }

                                    // update HPID object to enable further data flow
                                    _ACTION.hpid.data = currentColl;
                                    if(!_ACTION.hpid.isOn) _ACTION.hpid.isOn = true;
                                }
                            }
                    }
                },

                executeOneItemFilter : function(jlc, predicateArray, fallbackOnDefault, enumValue) {
                    return get_FLSA_I_1L(jlc, predicateArray, fallbackOnDefault, enumValue);



                    /**
                     * Local helper functions
                    */
                    function get_FLSA_I_1L(jlc, predicateArray, fallbackOnDefault, enumValue) {
                            // for given predicates
                            if(predicateArray) {
                                // execute the "WHERE" filter
                                _PHYSICAL_FILTER.executeWhereFilter(jlc, predicateArray);

                                // check the result
                                return getResult_I_2L(true);
                            }
                            // for no given predicates
                            else {
                                // check the result
                                return getResult_I_2L(false);
                            }



                            /**
                             * Local helper functions
                            */
                            function getResult_I_2L(withPredicates) {
                                // get contextually current collection from history array
                                var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch(jlc._ctx.coll_index).collection;

                                // if the sequence contains elements
                                if(currentColl.length) {
                                    switch (enumValue) {
                                        case _ENUM.FIRST:
                                            // return the first item from the sequence
                                            return currentColl[0];

                                        case _ENUM.LAST:
                                            // return the last item from the sequence
                                            return currentColl[currentColl.length - 1];

                                        case _ENUM.SINGLE:
                                            if(currentColl.length === 1)
                                                // return the single item from the sequence
                                                return currentColl[0];
                                            else
                                                throw Error("Sequence contains more than one element !");

                                        case _ENUM.ALL:
                                            // this flag tells to discard returned result
                                            _ACTION.hpid.done = true;
                                            break;

                                        default:
                                            throw Error("Unrecognized logical type of collection item [ " + enumValue +  " ] !");
                                    }
                                }
                                // if the sequence contains no elements
                                else {
                                    // return an empty array
                                    if(fallbackOnDefault && (enumValue === _ENUM.ALL)) {
                                        // this flag tells to discard returned result and go for hpid's data
                                        _ACTION.hpid.done = true;
                                        return;
                                    }
                                    // return default of 'JavaScript's var variable', which is simply value of undefined
                                    else if(fallbackOnDefault)
                                        return undefined; 
                                    // throw valid error
                                    else {
                                        if(withPredicates && (enumValue === _ENUM.SINGLE))
                                            throw Error("Sequence contains no elements !");
                                        else if(withPredicates)
                                            throw Error("Sequence contains no matching element !");
                                        else if(enumValue === _ENUM.REVERSE)
                                            throw Error("Source is null !");
                                        else
                                            throw Error("Sequence contains no elements !");
                                    }
                                }
                                // NO NEED TO SWITCH hpid's isOn flag ON, BECAUSE WE IMMEDIATELY RETURN 'SINGLE' ITEM FROM COLLECTION, BE IT hpid OR ORIGINAL ONE !
                            }
                    }
                },

                executeOrderFilter : function(keyPartSelectorArray, udfComparer, enumValue) {
                    return apply_O_I_1L(keyPartSelectorArray, udfComparer, enumValue);



                    /**
                     * Local helper functions
                    */
                    function apply_O_I_1L(keyPartSelectorArray, udfComparer, enumValue) {
                            // if first-level sorting required
                            if(enumValue === _ENUM.ORDER_ASC || enumValue === _ENUM.ORDER_DESC) {
                                // clear the previous sorting selectors
                                _DATA.sortOrderSelectors.clear();
                            }

                            // if user defined his own comparer
                            if(udfComparer) {
                                // just invoke it
                                _DATA.dirty_data.sort(udfComparer);
                            }
                            // otherwise do the subsequent sorting by applying result from the very last sorting using default comparer
                            else if(enumValue === _ENUM.ORDER_THEN_ASC || enumValue === _ENUM.ORDER_THEN_DESC) {
                                // prepare sequence for this-context type of sorting
                                prepareContextualSorting_I_2L();

                                // invoke actual sorting
                                doContextualSorting_I_2L();

                                // store intermediate sorted collection as the input for next sort order
                                storeContextualSorting_I_2L();

                                // perform kind of T-SQL-like property lookup, and return array of arrays of current flow data objects' stripped down props looked up from respective lookup objects
                                var propNameValuePair_array_array = includeOmittedProps_I_2L();

                                // update contextual sorting object
                                updateContextualSorting_I_2L(propNameValuePair_array_array);
                            }
                            // otherwise do the sorting using default comparer
                            else {
                                // invoke actual sorting
                                doContextualSorting_I_2L();
                            }



                            /**
                             * Local helper functions
                            */
                            function prepareContextualSorting_I_2L() {
                                // exclude properties that were used as keys in the very previous sorting
                                _DATA.sortOrderSelectors.excludeCurrentSelectors();
                            }

                            function doContextualSorting_I_2L() {
                                // just invoke the default comparer
                                _DATA.dirty_data.sort(_COMMON.useDefaultComparer(keyPartSelectorArray));
                            }

                            function storeContextualSorting_I_2L() {
                                // cache data for next sort order
                                _DATA.sortOrderSelectors.serializeIntermediateSortedCollection(_ENUM.SAVE);
                            }

                            function includeOmittedProps_I_2L() {
                                // reference backup object of current flow data - serving as a lookup object - by invoking real shallow cloning
                                _DATA.createShallowCloneOrPrepare(true);

                                // declare array of arrays of current object's stripped down props looked up from lookup object
                                var propNameValuePair_array_array = [];

                                // include properties that were used as keys in the very previous sorting
                                for(var i = 0; i < _DATA.dirty_data.length; i++) {
                                    // reference current object
                                    var c_o = _DATA.dirty_data[i];

                                    // reference backup object of current flow data serving as a lookup object
                                    var l_o = _DATA.dirty_data_temp[c_o._priv_id];

                                    // add required props from lookup object to current flow sequence object, and then return array of stripped down looked up properties of current flow sequence object
                                    var propNameValuePair_array = addRequiredPropsFromLookup_I_3L(c_o, l_o);

                                    // store array of current object's stripped down props looked up from lookup object
                                    propNameValuePair_array_array.push(propNameValuePair_array);

                                    // remove internal id from next flow sequence
                                    delete c_o._priv_id;
                                }

                                // return array of arrays of current object's stripped down props looked up from lookup object
                                return propNameValuePair_array_array;



                                /**
                                 * Local helper functions
                                */
                                function addRequiredPropsFromLookup_I_3L(currentObject, lookupObject) {
                                    // get the very last selectors
                                    var lastSelectors = _DATA.sortOrderSelectors.getLastUsedSelectors();

                                    // declare array of stripped down looked up properties of current object
                                    var propNameValuePair_array = [];

                                    // if there are any
                                    if(lastSelectors) {
                                        // loop over lastly used selectors
                                        for(var i = 0; i < lastSelectors.length; i++) {
                                            // reference the current selector
                                            var selector = lastSelectors[i];

                                            // from lookup object add current selector (property) value to current object
                                            var propNameValuePair = _DATA.sortOrderSelectors.includeOrExcludePropOnDemand(selector, currentObject, lookupObject, false);

                                            // add to array
                                            propNameValuePair_array.push(propNameValuePair);
                                        }
                                    }

                                    // return array of stripped down looked up properties of current object
                                    return propNameValuePair_array;
                                }
                            }

                            function updateContextualSorting_I_2L(propNameValuePair_array_array) {
                                // update cache data for next sort order
                                _DATA.sortOrderSelectors.serializeIntermediateSortedCollection(_ENUM.UPDATE, propNameValuePair_array_array);
                            }
                    }
                }
        };

        // declare a private logical filters object
        var _LOGICAL_FILTER = {
                applyLogicalBoolFilter : function(currentObject, predicateArray, elementIndex) {
                        return apply_LBF_I_1L(currentObject, predicateArray, elementIndex);



                        /**
                         * Local helper functions
                        */
                        function apply_LBF_I_1L(currentObject, predicateArray, elementIndex) {
                                // flag that tells whether object passes or fails the filter
                                var passed = true;

                                // loop over predicates
                                for(var i = 0; i < predicateArray.length; i++) {
                                    // access current filter
                                    var predicate = predicateArray[i];

                                    // determine the type of filter, i.e. user-defined function or a primitive one (string, int, float)
                                    if(typeof predicate === 'object') {
                                        // apply pre-defined basic comparison operators
                                        passed = applyPrimitivePredicate_I_2L(predicate, currentObject);
                                    }
                                    else if(typeof predicate === 'function') {
                                        // apply pre-defined user-defined comparison function
                                        passed = applyUdfPredicate_I_2L(predicate, currentObject, elementIndex);
                                    }

                                    // check ASAP if object failed the filter
                                    if(!passed)
                                        break;
                                }

                                // return filtering result (true/false)
                                return passed;



                                /**
                                 * Local helper functions
                                */
                                function applyPrimitivePredicate_I_2L(predicate, currentObject) {
                                    // filtering property name
                                    var propName = predicate[0];

                                    // is filtering property value type set to float ?
                                    var propValueFloat = (predicate.length === 4) && predicate[3];

                                    // filtering property value
                                    var propValue;

                                    // process float
                                    if(propValueFloat)
                                        propValue = parseFloat(predicate[2]);
                                    // process Boolean
                                    else if(predicate[2] === true || predicate[2] === false)
                                        propValue = predicate[2];
                                    // process string
                                    else if(typeof predicate[2] === 'string')
                                        propValue = predicate[2];
                                    // by default try parsing as Int32
                                    else
                                        propValue = parseInt(predicate[2]);

                                    // filtering operator
                                    var propOperator = predicate[1];

                                    // navigate to the destination property of the current object and execute the filter
                                    var fr = executePrimitivePredicate_I_3L();

                                    // return the filter result
                                    return fr;



                                    /**
                                     * Local helper functions
                                    */
                                    function executePrimitivePredicate_I_3L() {
                                        // input value to compare
                                        var propOrVal;

                                        // determine if the current object is primitive one, i.e. int, string, number, etc.
                                        if((propName.trim().length === 0 || propName.trim().length === 1) && propName === '_')
                                            propOrVal = currentObject;
                                        else
                                            // seek the destination property
                                            propOrVal = _LOGICAL_FILTER.applyPropertyValueFilter(currentObject, propName, true);

                                        /**
                                         * Check the validity of an object prop (logical "NOT NULL"), i.e. "", undefined, null
                                         * Boolean values like false, 0 (that evaluates to false) in this case are considered correct values !
                                        */
                                        var valid = propOrVal || propOrVal === 0 || propOrVal === false;

                                        // execute the filter provided that the found prop "is not null"
                                        if(valid) {
                                            switch (propOperator) {
                                                case ">":
                                                    return propOrVal > propValue;
                                                case "<":
                                                    return propOrVal < propValue;
                                                case ">=":
                                                    return propOrVal >= propValue;
                                                case "<=":
                                                    return propOrVal <= propValue;
                                                case "==":
                                                    return propOrVal == propValue;
                                                case "===":
                                                    return propOrVal === propValue;
                                                case "<>":
                                                    return propOrVal !== propValue;
                                                case "()":
                                                    return propOrVal ? true : false;
                                                case "(!)":
                                                    return propOrVal === propValue ? true : false;
                                                default:
                                                    throw new Error("Unsupported operator [ " + propOperator + " ] !");
                                            }
                                        }
                                        else
                                            return false;
                                    }
                                }

                                function applyUdfPredicate_I_2L(predicate, currentObject, elementIndex) {
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

                                    return predicate.bind(null, currentObject, elementIndex)();
                                }
                        }
                },                

                applyLogicalWhereFilter : function(jlc, predicateArray, enumValue) {
                        return apply_LWF_I_1L(jlc, predicateArray, enumValue);



                        /**
                         * Local helper functions
                        */
                        function apply_LWF_I_1L(jlc, predicateArray, enumValue) {
                                // declare the bool filter result
                                var passed = false;

                                // create input collection cache
                                var currentColl = _DATA.fetch(jlc._ctx.coll_index).collection;

                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    passed = _LOGICAL_FILTER.applyLogicalBoolFilter(c_o, predicateArray, i);

                                    // based on filtering result (true/false) trigger further action
                                    if(enumValue === _ENUM.ALL && !passed)
                                        break;
                                    else if(enumValue === _ENUM.ANY && passed)
                                        break;
                                }

                                // return the bool filter result
                                return passed;
                        }
                },

                applyAllAnyFilter : function(jlc, predicateArray, enumValue) {
                        return apply_AAF_I_1L(jlc, predicateArray, enumValue);



                        /**
                         * Local helper functions
                        */
                        function apply_AAF_I_1L(jlc, predicateArray, enumValue) {
                                // for given predicates
                                if(predicateArray) {
                                    // execute the "IF" filter
                                    var passed = _LOGICAL_FILTER.applyLogicalWhereFilter(jlc, predicateArray, enumValue);

                                    // return the result
                                    return passed;
                                }
                                // for no given predicates
                                else {
                                    // check if there are any items in the sequence (contextually current collection within history array)
                                    return _DATA.fetch(jlc._ctx.coll_index).collection.length > 0;
                                }
                        }
                },

                applyPropertyValueFilter : function(currentObject, propertyName, returnValue) {
                        return apply_PVF_I_1L(currentObject, propertyName, returnValue);



                        /**
                         * Local helper functions
                        */
                        function apply_PVF_I_1L(currentObject, propertyName, returnValue) {
                                // create array of prop's path
                                var pathArray = propertyName.split('.');

                                // define property value holder
                                var propertyOrValue = null;

                                // loop over array of prop's path to seek the destination property and/or return its value
                                for(var i = 0, length = returnValue ? pathArray.length : pathArray.length - 1; i < length; i++) {
                                    propertyOrValue = propertyOrValue ? propertyOrValue[pathArray[i]] : currentObject[pathArray[i]];
                                }

                                // return value of the property or property
                                return propertyOrValue;
                        }
                }
        };

        // declare a private core object
        var _CORE = {
                // ~ TO BE IMPLEMENTED
                apply_set_based_operations : function(inputObjectCollection, thisCollectionKeyArray, inputObjectCollectionKeyArray, outputType, enumValue) {
                    // invoke core logic
                    //_LOGICAL_FILTER.
                },

                // ~ TO BE IMPLEMENTED
                order_asc_or_desc : function (keyPartSelectorArray, udfComparer, enumValue) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeOrderFilter(keyPartSelectorArray, udfComparer, enumValue);

                    // store dynamically the current array of selectors
                    _DATA.sortOrderSelectors.add(keyPartSelectorArray, udfComparer);

                    // inject dynamically contextual ordering method called thenBy
                    _API.thenBy = _API.thenBy || function(keyPartSelectorArray, udfComparer) {
                        // sort the collection in ascending order according to a key or using given comparer
                        _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_THEN_ASC);

                        // return JavaScript LINQ Concept object
                        return _API;
                    };

                    // inject dynamically contextual ordering method called thenByDescending
                    _API.thenByDescending = _API.thenByDescending || function(keyPartSelectorArray, udfComparer) {
                        // sort the collection in descending order according to a key or using given comparer
                        _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_THEN_DESC);

                        // return JavaScript LINQ Concept object
                        return _API;
                    };
                },






                /**
                 * ALREADY IMPLEMENTED 
                */

                where : function(predicateArray) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeWhereFilter(this, predicateArray);
                },

                group_by : function(predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeGroupByFilter(this, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData, isDictionaryContext);

                    /**
                     * Inject dynamically contextual parameterless list method called toArrayList() if invocation context is set to creating dictionary.
                     * This is very contextual method that can be invoke from only this context and serves the same purpose as in this C# use case:
                     *           var dict_2_array = list.ToDictionary(...).ToArray();
                     *           var dict_2_list = list.ToDictionary(...).ToList();
                    */
                    if(isDictionaryContext)
                        Object.prototype.toArrayList = Object.prototype.toArrayList || toArrayList_I_1L;
                    
                    
                    
                    /**
                     * Local helper functions 
                    */
                    function toArrayList_I_1L() {
                        /**
                         * 'this' refers to future data object being either a dictionary or other object.
                         * The valid invocation context of this method is when future object is a dictionary one ! 
                        */

                        // declare an output 'array list'
                        var al = [];

                        // loop over all entries (KeyValuePair objects)
                        for(var i = 0, keys = Object.getOwnPropertyNames(this); i < keys.length; i++) {
                            // access current KVP's key
                            var key = keys[i];

                            // access current KVP's value
                            var value = this[key];

                            // push it to 'array list'
                            al.push({key : key, value : value});
                        }

                        // unbind toArrayList from further usage
                        Object.prototype.toArrayList = undefined;

                        // return 'array list'
                        return al;
                    }
                },

                list_t : function(fallbackOnDefault) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeOneItemFilter(this, null, fallbackOnDefault, _ENUM.ALL);
                },

                reverse_t : function(startingIndex, count, enumValue) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeRangeFilter(this, null, startingIndex, count, enumValue);
                },                    

                add_t : function(collectionOrItem, enumValue) {
                    // invoke core logic
                    return add_CI_I_1L(this, collectionOrItem, enumValue);



                    /**
                     * Local helper functions 
                    */
                    function add_CI_I_1L(jlc, collectionOrItem, enumValue) {
                        // get contextually current collection within history array
                        var currentColl = _ACTION.hpid.isOn ? _ACTION.hpid.data : _DATA.fetch(jlc._ctx.coll_index).collection;

                        if(enumValue === _ENUM.APPEND) {
                            // append item to the end of current data flow collection
                            currentColl.push(collectionOrItem);
                        }
                        else if(enumValue === _ENUM.PREPEND) {
                            // declare new current flow data collection
                            var new_dirty_data = [collectionOrItem];

                            // merge new current flow data collection with old current flow data collection
                            Array.prototype.push.apply(new_dirty_data, currentColl);

                            // replace the existing current data flow collection with new current data flow collection
                            currentColl = new_dirty_data;
                        }
                        else if(enumValue === _ENUM.CONCAT) {
                            // merge new data collection with current flow data collection
                            Array.prototype.push.apply(currentColl, collectionOrItem);
                        }

                        // update HPID object to enable further data flow
                        _ACTION.hpid.data = currentColl;
                        if(!_ACTION.hpid.isOn) _ACTION.hpid.isOn = true;
                    }
                },

                skip_or_take : function(count, predicateArray, enumValue) {
                    // invoke core logic
                    _PHYSICAL_FILTER.executeRangeFilter(this, predicateArray, null, count, enumValue);
                },

                first_or_default : function(predicateArray, fallbackOnDefault) {
                    // invoke core logic
                    return _PHYSICAL_FILTER.executeOneItemFilter(this, predicateArray, fallbackOnDefault, _ENUM.FIRST);
                },

                last_or_default : function(predicateArray, fallbackOnDefault) {
                    // invoke core logic
                    return _PHYSICAL_FILTER.executeOneItemFilter(this, predicateArray, fallbackOnDefault, _ENUM.LAST);
                },

                single_or_default : function(predicateArray, fallbackOnDefault) {
                    // invoke core logic
                    return _PHYSICAL_FILTER.executeOneItemFilter(this, predicateArray, fallbackOnDefault, _ENUM.SINGLE);
                },

                all_or_any : function(predicateArray, enumValue) {
                    // invoke core logic
                    return _LOGICAL_FILTER.applyAllAnyFilter(this, predicateArray, enumValue);
                }                    
        };

        // declare a private data object holding all data flows of all collections passed to JLC
        var _DATA = {
                // index that tracks contextually current collection within history array 
                index : -1,

                // root token array holding root tokens of each collection
                root_token_array : [],

                // collection history array
                collection_array : [],

                // check if contextually current collection is stored internally for data flows
                exists : function(rootToken) {
                    // index of this collection if already stored
                    var index = -1;

                    // check for collection presence
                    for (var i = 0; i < this.root_token_array.length; i++) {
                        var rto = this.root_token_array[i];
                        
                        if(rto.root_token === rootToken) {
                            index = rto.collection_index;
                            break;
                        }
                    }

                    // return index
                    return index;
                },

                // store collection
                store : function (collection) {
                    // increase collection index
                    this.index++;

                    // store contextually unique token of this collection
                    this.root_token_array.push(
                                                {
                                                    root_token : collection.dirty_data._rootToken,

                                                    collection_index : this.index
                                                }
                                            );

                    // store collection
                    this.collection_array.push(collection);

                    // get index of this contextually current collection
                    return this.index;
                },

                // fetch metadata object of contextually current collection from history array
                fetch : function(index) {
                    return {
                        // collection index within history array
                        index : index,
            
                        // collection itself
                        collection : this.collection_array[index].dirty_data
                    }
                },
                
                // fetch type metadata of collection item of contextually current collection from history array
                getT : function(index) {
                    return this.collection_array[index].type;
                }
        };

        // declare a private setup object that does required initialization
        var _SETUP = {
                ___init___ : function() {
                    return init_I_1L();



                    /**
                     * Local helper methods
                    */
                    function init_I_1L() {
                        // enable usage of JLC 1.0
                        createLinqContext_I_2L();

                        /**
                         * JLC 1.0 Query Debugger - very experimental version ! 😀😉
                         *  
                         * Can be safely removed if library moved to production. 🙂
                         * 
                         * Go to line 1995 to remove from api public method called 'ifConsoleDebug'
                        */
                        // switch JLC 1.0 Query Debugger on
                        //_QUERY_DEBUGGER.___init___();
                        
                        

                        /**
                         * Local helper functions 
                        */
                        function createLinqContext_I_2L() {
                            // bind JLC to Array type
                            Array.prototype.usingLinq = _SETUP.Funcs.useJLC;

                            // create Linq context objects
                            window.System = window.System || {};
                            window.System.Linq = window.System.Linq || {};
                            window.System.Linq.Context = window.System.Linq.Context || {};
                            window.System.Linq.QueryResult = window.System.Linq.QueryResult || {};
                            window.System.Linq.Resources = window.System.Linq.Resources || {
                                                                                                dispose : function() {
                                                                                                            // remove all collections
                                                                                                            _DATA.collection_array.length = 0;

                                                                                                            // remove all collections' tokens
                                                                                                            _DATA.root_token_array.length = 0;

                                                                                                            // reset collections' index
                                                                                                            _DATA.index = -1;
                                                                                                          }
                                                                                           }

                            // add methods to Linq context objects
                            addLinqMethodsToContext_I_3L(
                                                            [
                                                                ['where', false], ['groupBy', false],
                                                                ['concat', false], ['append', false], ['prepend', false],
                                                                ['skip', false], ['skipWhile', false], ['take', false], ['takeWhile', false], ['reverse', false], ['reverseExt', false],
                                                                ['toArray', true], ['toDictionary', true],
                                                                ['first', true], ['firstOrDefault', true], ['last', true], ['lastOrDefault', true], ['single', true], ['singleOrDefault', true],
                                                                ['any', true], ['all', true]
                                                            ]
                                                        )



                            /**
                             * Local helper methods 
                            */
                            function addLinqMethodsToContext_I_3L(method_arr) {
                                // loop over method array
                                for(var i = 0; i < method_arr.length; i++) {
                                    // reference a method
                                    var m = method_arr[i];
                                    
                                    // add method to Linq context object
                                    System.Linq.Context[m[0]] = m[0];

                                    // store information whether this method produces physical result or a logical one
                                    System.Linq.QueryResult[m[0]] = m[1];
                                }
                            }
                        }
                    }
                },
                
                Funcs : {
                    useJLC : function() {
                        // get token associated with current collection, aka root token
                        var rootToken = new Date().getTime();
                        
                        // create copy of this collection
                        var _this = this.slice(0);

                        // assign token to collection
                        _this._rootToken = rootToken;

                        // pass data in to the mechanism - 'this' refers to the calling client data array !
                        var coll_idx = over_I_1L(_this);
                        
                        // get JLC API instance
                        return _COMMON.jlcNew({coll_index : coll_idx, root_token : rootToken, parent : null});



                        /**
                         * Local helper functions 
                        */
                        function over_I_1L(inputCollection) {
                            // check if current collection is stored internally
                            var index = _DATA.exists(inputCollection._rootToken);

                            // store this collection if a new one
                            if(index === -1) {
                                // declare a private data object holding data collection of current JLC instance, aka static or shared instance
                                var coll_data = {
                                    dirty_data : null,   // current flow data
                                    dirty_data_temp : [],
                                    data : null,         // data - the copy of current flow data - requested on demand via resultsView dynamic property of JLC api instance
                                    type : {
                                        source : null,
                                        makeItEmpty : false,
                                        isReady : false,
                                        output : null
                                    }
                                };


                                // store the collection to iterate over
                                coll_data.dirty_data = inputCollection || coll_data.dirty_data || [];

                                // otherwise create an empty object based on inputCollection's first item
                                if(coll_data.dirty_data.length) {
                                    coll_data.type.source = coll_data.dirty_data[0];
                                    coll_data.type.makeItEmpty = true;
                                }
                                // or default to an empty JavaScript object
                                else {
                                    coll_data.type.output = {};
                                    coll_data.type.isReady = true;
                                }

                                /**
                                 * Store current collection into collection history array.
                                 * Return index of this collection from collection history array.
                                */
                                return _DATA.store(coll_data);
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