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