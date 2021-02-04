( function ()
{
    /**
     * ⚠️ 
     * 📢 
     *      When dealing with array of primitive values, 'predicateArray' array filters use a bit of new logic in comparison to array of objects :
     * 		    f.e. ["", ">=", 2, true] || ["", ">=", 2]
     * 		Given such a filter, the first field which is 0-length string, tells that you deal with primitive value and not an object !
     * 		Actually, the filter's first field can be provided in any of the following forms :
     *          ''	         (0-length string)
     * 			'    '       (any number of empty spaces 😀, which are converted to 0-length string)
     * 
     * 
     * ⚠️
     * 📢 
     *      For these operations : groupBy, toDictionary, orderBy, orderByDescending, thenBy, thenByDescending the filter syntax ('predicateArray') is the following one :
     *          ["", true]
     * 
     *      For other operations the filter syntax ('predicateArray') is the following one :
                ["", ">=", 2, true]
                        
                      ||
            
                ["", ">=", 2]

                      ||

                UDF (user-defined function)
    */

    window.testPrimitives = window.testPrimitives || function ()
    {
        console.log( 'Primitives' );

        var collection_of_integers = [ 1, 3, 2, 4, 7, 6, 5, 8, 9, 3, 2 ];

        var collection_of_decimals = [ 2.1, 4.4, 5.3, 2.1, 7.8, 4.6, 10.0 ];

        var collection_of_strings = [ "one", "two", "four", "five", "five", "three" ];

        var collection_of_booleans = [ true, false, false, true ];

        // ⚠️ for primitives such special field called ofss (object full structure string) is not taken into account !



        // final query - produces output
        var where_f1 = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        ).toArray();
        /**
         * Mutate only where_f1 data regardless of other queries and the source collection on which this where_f1 query is based !
         * 
         * where_f1 data array is copied 100% "by value" !
        */
        where_f1[ 0 ] = Number.MAX_VALUE;


        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'where_f1' uses the same filters, hence this query 'where_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var where_f1_cache = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state - THIS QUERY USES CACHE ->
        /*
            Query called 'where_f1' uses the same filters, hence this query 'where_p1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var where_p1_cache = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        );




        /**
         * At any point you can interact with cache
         *
         * - enable/disable it      ->  System.Linq.Context.Cache.enable(true/false)
         * - clear it               ->  System.Linq.Context.Cache.clear()
         *
        */
        // f.e. turn off the cache
        System.Linq.Context.Cache.enable( false );




        // final query - produces output - THIS QUERY DOESN'T USE CACHE (cache was turned off a step above, and this is new query !)
        var where_f1_cache2 = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        ).toArray();

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'where_p1_cache' fetches data from cache because it was created when JLC cache was enabled !
            At this point JLC cache is disabled for new queries, but all queries based on 'where_p1_cache' can use the cache if enabled in the runtime context of such queries !
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var where_f1_cache3 = where_p1_cache.toArray();

        // final query - produces output
        var groupBy_f1 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).toArray();
        /**
         * Mutate only groupBy_f1 data regardless of other queries and the source collection on which this groupBy_f1 query is based !
         * 
         * groupBy_f1 data array is copied 100% "by value" !
        */
        groupBy_f1[ 0 ].resultsView[ 0 ] = Number.EPSILON;


        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f2 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f3 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f4 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f5 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f6 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).toArray();


        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f7 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f8 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f9 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).toArray();

        // final query - produces output
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_f10 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).toArray();

        // partial query - produces intermediate query state
        var where_p1 = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var groupBy_p1 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null,

            }
        );

        // partial query - produces intermediate query state
        // https://entityframework.net/knowledge-base/14112230/groupby-with-elementselector-and-resultselector
        var groupBy_p10 = collection_of_booleans.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        );

        // partial query - produces intermediate query state
        var where_p2 = collection_of_strings.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var where_p1_takeWhile_p1 = where_p1.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var where_p2_skipWhile_p1 = where_p2.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 4 ]
                ]
            }
        );

        // final query - produces output
        var where_f2 = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ]
                ]
            }
        ).toArray();


        // when you're done with all querying regarding some collections, you can tidy them up by removing some internally generated stuff
        System.Linq.Context.Collection.tidyUp( collection_of_integers, collection_of_strings );



        // final query - produces output
        var concat_f1 = collection_of_integers.concatenate(
            {
                'collectionOrItem': // array approach
                    [ 11, 12 ]
            }
        ).toArray();

        // final query - produces output
        var concat_f2 = collection_of_integers.concatenate(
            {
                'collectionOrItem': // array approach
                    [ 13 ]
            }
        ).toArray();

        // final query - produces output
        var concat_f3 = collection_of_integers.concatenate(
            {
                'collectionOrItem': // object approach
                    14
            }
        ).toArray();

        // partial query - produces intermediate query state
        var concat_p1 = collection_of_integers.concatenate(
            {
                'collectionOrItem': // array approach
                    [ 11, 12 ]
            }
        );


        // final query - produces output
        var concat_p2 = collection_of_integers.concatenate(
            {
                'collectionOrItem': // object approach
                14
            }
        );

        // final query - produces output
        var append_f1 = collection_of_integers.append(
            {
                'collectionOrItem': // object approach
                11
            }
        ).toArray();


        // final query - produces output -> example of invalid usage ! ('append' should only use object approach)
        var append_f2 = collection_of_integers.append(
            {
                'collectionOrItem': // array approach -> logically invalid usage !
                    [11]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var append_p1 = collection_of_integers.append(
            {
                'collectionOrItem': // object approach
                11
            }
        );

        // partial query - produces intermediate query state -> example of invalid usage ! ('append' should only use object approach)
        var append_p2 = collection_of_integers.append(
            {
                'collectionOrItem': // array approach -> logically invalid usage !
                    [11]
            }
        );

        // final query - produces output
        var prepend_f1 = collection_of_integers.prepend(
            {
                'collectionOrItem': // object approach
                -1
            }
        ).toArray();

        // final query - produces output -> example of invalid usage ! ('prepend' should only use object approach)
        var prepend_f2 = collection_of_integers.prepend(
            {
                'collectionOrItem': // array approach -> logically invalid usage !
                    [-1]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var prepend_p1 = collection_of_integers.prepend(
            {
                'collectionOrItem': // object approach
                -1
            }
        );

        // partial query - produces intermediate query state -> example of invalid usage ! ('prepend' should only use object approach)
        var prepend_p2 = collection_of_integers.prepend(
            {
                'collectionOrItem': // array approach -> logically invalid usage !
                    [-1]
            }
        );

        // final query - produces output
        var contains_f1 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                -1,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        // 'contains' query method stores udf object content comparer under the param name of 'udfEqualityComparer'
        var contains_f2 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                -1,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        );

        // final query - produces output
        var contains_f3 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                7,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var contains_f4 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                7,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        );


        // final query - produces output
        var contains_f5 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                [-1],
                'udfEqualityComparer': null
            }
        );

        // partial query - produces intermediate query state
        var distinct_p1 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': null
            }
        );

        // partial query - produces intermediate query state
        var distinct_p2 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        );

        // final query - produces output
        var distinct_f1 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output
        var distinct_f2 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();

        // final query - produces output
        var except_f1 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f2 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f3 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f4 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': true
            }
        ).toArray();

        // partial query - produces intermediate query state
        var except_p1 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        );

        // partial query - produces intermediate query state
        var except_p2 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': false
            }
        );

        // partial query - produces intermediate query state
        var except_p3 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        );

        // partial query - produces intermediate query state
        var except_p4 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                5,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': true
            }
        );

        // final query - produces output
        var except_f5 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                10,
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f6 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                10,
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f7 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                10,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f8 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                10,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f9 = collection_of_integers.except(
            {
                'collectionOrItem': // array approach
                    [5,7],
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f10 = collection_of_integers.except(
            {
                'collectionOrItem': // array approach
                    [5,7],
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var skip_f1 = collection_of_integers.skip(
            {
                'count': 2
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skip_p1 = collection_of_integers.skip(
            {
                'count': 2
            }
        );

        // final query - produces output
        var skip_f2 = collection_of_integers.skip(
            {
                'count': -1
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skip_p2 = collection_of_integers.skip(
            {
                'count': -1
            }
        );

        // final query - produces output
        var skip_f3 = collection_of_integers.skip(
            {
                'count': 0
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skip_p3 = collection_of_integers.skip(
            {
                'count': 0
            }
        );

        // final query - produces output
        var skipWhile_f1 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skipWhile_p1 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        );

        // final query - produces output
        var skipWhile_f2 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skipWhile_p2 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        );

        // final query - produces output
        var skipWhile_f3 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfWherePredicate
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skipWhile_p3 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfWherePredicate
                ]
            }
        );


        // final query - produces output
        var skipWhile_f4 = collection_of_decimals.skipWhile(
            {
                'predicateArray': [
                    [ "", "<", 10 ]
                ]
            }
        ).toArray();

        // final query - produces output
        var take_f1 = collection_of_integers.take(
            {
                'count': 2
            }
        ).toArray();

        // partial query - produces intermediate query state
        var take_p1 = collection_of_integers.take(
            {
                'count': 2
            }
        );

        // final query - produces output
        var take_f2 = collection_of_integers.take(
            {
                'count': -1
            }
        ).toArray();

        // partial query - produces intermediate query state
        var take_p2 = collection_of_integers.take(
            {
                'count': -1
            }
        );

        // final query - produces output
        var take_f3 = collection_of_integers.take(
            {
                'count': 0
            }
        ).toArray();

        // partial query - produces intermediate query state
        var take_p3 = collection_of_integers.take(
            {
                'count': 0
            }
        );

        // final query - produces output
        var takeWhile_f1 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var takeWhile_p1 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        );

        // final query - produces output
        var takeWhile_f2 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var takeWhile_p2 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 7 ]
                ]
            }
        );

        // final query - produces output
        var takeWhile_f3 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfWherePredicate
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var takeWhile_p3 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfWherePredicate
                ]
            }
        );

        // final query - produces output
        var takeWhile_f4 = collection_of_decimals.takeWhile(
            {
                'predicateArray': [
                    [ "", "<", 10 ]
                ]
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1a = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1b = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1c = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f2 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var orderByDescending_f1 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderByDescending_f2 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var thenBy_f1 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var thenBy_f2 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var thenByDescending_f1 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var thenByDescending_f2 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // partial query - produces intermediate query state
        var orderBy_p1 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var orderByDescending_p1 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var thenBy_p1 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var thenByDescending_p1 = collection_of_integers.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var orderBy_p2 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );
        // partial query - produces intermediate query state
        var thenBy_p2 = orderBy_p2.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );
        // partial query - produces intermediate query state
        var thenByDescending_p2 = orderBy_p2.thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // final query - produces output 
        var orderBy_f3 = collection_of_strings.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output 
        var orderBy_f4 = collection_of_booleans.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output 
        var orderBy_f5 = collection_of_booleans.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f6 = collection_of_booleans.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f7 = collection_of_booleans.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f7 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();


        // final query - produces output
        var orderBy_f8 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var orderBy_p8 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );

        // final query - produces output
        var thenBy_f8 = orderBy_p8.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();


        // final query - produces output
        var toArray_f1 = collection_of_integers.toArray();


        // final query - produces output
        var toDictionary_f1 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null,

            }
        );

        // final query - produces output
        var toDictionary_f2 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        );

        // final query - produces output
        var toDictionary_f1_orderBy_thenBy_f1 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null,

            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var toDictionary_f1_orderBy_thenBy_f2 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var toDictionary_f1_orderBy_thenBy_f3 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var toDictionary_f1_orderBy_p1 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        );

        // final query - produces output
        var toDictionary_f1_orderBy_p1_thenBy_f1 = toDictionary_f1_orderBy_p1.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).toArray();


        // CODE WAS TESTED UNTIL HERE !
        debugger;

        // final query - produces output
        var defaultIfEmpty_f1 = collection_of_integers.defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: true, // return default value provided by the user if collection is empty

                    udv: Number.MIN_VALUE // user default value (udv)
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f2 = [].defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: true, // return default value provided by the user if collection is empty

                    // user default value (udv) must be anything valid in JavaScript that conforms to JavaScript rules !
                    udv: 223232132321321312
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f3 = [].defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: false // return default value deducted on this query flow (cdv) if collection is empty
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f4 = collection_of_integers.defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: false // return default value deducted on this query flow (cdv) if collection is empty
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f5 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 10000, true ]
                ]
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: false // return default value deducted on this query flow (cdv) if collection is empty
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f6 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfObjectGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfObjectGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 10000, true ]
                ]
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: false // return default value deducted on this query flow (cdv) if collection is empty
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f7 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfObjectGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfObjectGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 10000, true ]
                ]
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: false // return default value deducted on this query flow (cdv) if collection is empty
                }
            }
        );

        // final query - produces output
        var reverse_f1 = collection_of_integers.reverseAllOrSubset().toArray();

        // final query - produces output
        var reverse_f2 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 4
            }
        ).toArray();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The offset and length values are either outside the range of the array, or the number exceeds the number of items between the index and the end of the source collection_of_integers.
        
        var reverse_f3 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 300
            }
        ).toArray();
        

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        
        var reverse_f4 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 3
            }
        ).toArray();
        

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        
        var reverse_f5 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 0
            }
        ).toArray();
        

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        
        var reverse_f6 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 300
            }
        ).toArray();
        

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: count
        
        var reverse_f7 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': -1
            }
        ).toArray();
        

        // final query - produces output
        var reverse_f8 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 0
            }
        ).toArray();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        
        var reverse_f9 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': -1
            }
        ).toArray();
        

        // final query - produces output
        var select_f1 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "order", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f1 = collection_of_integers.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    [ "order", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var select_f2 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "order.item.size", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> 'Selected property [ order.item.size ] is not iterable in the context of "selectMany" !'
        var selectMany_f2 = collection_of_integers.selectMany(
            {
                //
                // Selecting multiple properties requires providing custom UDF selector.
                // 
                // Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                //

                'selectorArray': [
                    ["order.item.size", true]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();
        */

        // final query - produces output
        var select_f3 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define inline UDF selector
                'udfSelector': function ( item, selectors, index )
                {
                    /**
                     * Provide the logic valid for your cases !
                     * 
                     * This is only exemplary implementation logic.
                    */

                    // declare select result object
                    var result = Object.create( null );

                    /**
                     * Select all required props
                    */
                    result.id = item[ 'id' ];
                    result.name = item[ 'name' ];
                    result.img = item[ 'img' ];
                    result.order = item[ 'order' ];

                    // if original positional index in the collection is required, add it
                    if ( index !== undefined )
                        result.collectionPositionalIndex = index;

                    // return select result object
                    return result;
                },
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f3 = collection_of_integers.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define library UDF selector
                'udfSelector': udf_commons.udfSelector,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // partial query - produces intermediate query state
        var select_p1 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define inline UDF selector
                'udfSelector': function ( item, selectors, index )
                {
                    /**
                     * Provide the logic valid for your cases !
                     * 
                     * This is only exemplary implementation logic.
                    */

                    // declare select result object
                    var result = Object.create( null );

                    /**
                     * Select all required props
                    */
                    result.id = item[ 'id' ];
                    result.name = item[ 'name' ];
                    result.img = item[ 'img' ];
                    result.order = item[ 'order' ];

                    // if original positional index in the collection is required, add it
                    if ( index !== undefined )
                        result.collectionPositionalIndex = index;

                    // return select result object
                    return result;
                },
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        );

        // partial query - produces intermediate query state
        var selectMany_p1 = collection_of_integers.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define library UDF selector
                'udfSelector': udf_commons.udfSelector,
                'udfResultSelector': udf_commons.udfResultSelector, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        );

        // final query - produces output
        var select_f4 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define inline UDF selector
                'udfSelector': function ( item, selectors, index )
                {
                    /**
                     * Provide the logic valid for your cases !
                     * 
                     * This is only exemplary implementation logic.
                    */

                    // declare select result object
                    var result = Object.create( null );

                    /**
                     * Select all required props
                    */
                    result.id = item[ 'id' ];
                    result.name = item[ 'name' ];
                    result.img = item[ 'img' ];
                    result.order = item[ 'order' ];

                    // if original positional index in the collection is required, add it
                    if ( index !== undefined )
                        result.collectionPositionalIndex = index;

                    // return select result object
                    return result;
                },
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': false
            }
        ).toArray();

        // final query - produces output
        var selectMany_f4 = collection_of_integers.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    [ "id", true ], [ "name", true ], [ "img", true ], [ "order", true ]
                ],
                // define library UDF selector
                'udfSelector': udf_commons.udfSelector,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': false
            }
        ).toArray();

        /**
         * JOINS
        */
        var innerColl = [
            {
                id: 2,
                name: "Customer 2",
                age: 37,
                address: { id: 1, street: "Street 1" }
            },
            {
                id: 10,
                name: "Customer 10",
                age: 56,
                address: { id: 2, street: "Street 2" }
            }
        ];

        // final query - produces output
        var join_f1 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'join_f1' uses the same filters, hence this query 'join_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var join_f1_cache = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var join_p1 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var join_f2 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of outerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;

                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of innerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the right-side item to check the key
                    var outputItem = Object.create( null );

                    // create the right-side item
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem[ prop ];


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // create array of keys and array of their values of the passed left-side key
                    var allKeyPropNames, allKeyPropValues = [];
                    allKeyPropNames = Object.getOwnPropertyNames( outerCollectionItemKeyValue );
                    for ( let keyProp of allKeyPropNames )
                        allKeyPropValues.push( outerCollectionItemKeyValue[ keyProp ] );


                    // create array of keys and array of their values of the passed inner collection item
                    var allInnerPropNames, allInnerPropValues = [];
                    allInnerPropNames = Object.getOwnPropertyNames( outputItem );
                    for ( let keyProp of allInnerPropNames )
                        allInnerPropValues.push( outputItem[ keyProp ] );

                    // check the join
                    isJoin = allKeyPropNames.equals( allInnerPropNames ) && allKeyPropValues.equals( allInnerPropValues );


                    // return the key lookup bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem )
                {
                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    outputItem.left = outerCollectionMatchingItem;
                    outputItem.right = innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var join_f3 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    // valid props array
                    var props = [ 'id' ];

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem )
                {
                    // valid props array
                    var props = [ 'id' ];

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem ? innerCollectionItem[ prop ] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();



        // final query - produces output
        var leftJoin_f1 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var leftJoin_p1 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var leftJoin_f2 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of outerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;

                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of innerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the right-side item to check the key
                    var outputItem = Object.create( null );

                    // create the right-side item
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem[ prop ];


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // create array of keys and array of their values of the passed left-side key
                    var allKeyPropNames, allKeyPropValues = [];
                    allKeyPropNames = Object.getOwnPropertyNames( outerCollectionItemKeyValue );
                    for ( let keyProp of allKeyPropNames )
                        allKeyPropValues.push( outerCollectionItemKeyValue[ keyProp ] );


                    // create array of keys and array of their values of the passed inner collection item
                    var allInnerPropNames, allInnerPropValues = [];
                    allInnerPropNames = Object.getOwnPropertyNames( outputItem );
                    for ( let keyProp of allInnerPropNames )
                        allInnerPropValues.push( outputItem[ keyProp ] );

                    // check the join
                    isJoin = allKeyPropNames.equals( allInnerPropNames ) && allKeyPropValues.equals( allInnerPropValues );


                    // return the key lookup bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem )
                {
                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    outputItem.left = outerCollectionMatchingItem;
                    outputItem.right = innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var leftJoin_f3 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    // valid props array
                    var props = [ 'id' ];

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem )
                {
                    // valid props array
                    var props = [ 'id' ];

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem ? innerCollectionItem[ prop ] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();



        // final query - produces output
        var groupJoin_f1 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupJoin_p1 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupJoin_f2 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of outerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;

                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of innerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the right-side item to check the key
                    var outputItem = Object.create( null );

                    // create the right-side item
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem[ prop ];


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // create array of keys and array of their values of the passed left-side key
                    var allKeyPropNames, allKeyPropValues = [];
                    allKeyPropNames = Object.getOwnPropertyNames( outerCollectionItemKeyValue );
                    for ( let keyProp of allKeyPropNames )
                        allKeyPropValues.push( outerCollectionItemKeyValue[ keyProp ] );


                    // create array of keys and array of their values of the passed inner collection item
                    var allInnerPropNames, allInnerPropValues = [];
                    allInnerPropNames = Object.getOwnPropertyNames( outputItem );
                    for ( let keyProp of allInnerPropNames )
                        allInnerPropValues.push( outputItem[ keyProp ] );

                    // check the join
                    isJoin = allKeyPropNames.equals( allInnerPropNames ) && allKeyPropValues.equals( allInnerPropValues );


                    // return the key lookup bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem )
                {
                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    outputItem.left = outerCollectionMatchingItem;
                    outputItem.right = innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The context of GROUP_JOIN requires providing valid "outerSelectorArray" and "innerSelectorArray" array key extractors !
        /*
        var groupJoin_f3 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = outerCollectionItem[prop];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = innerCollectionItem ? innerCollectionItem[prop] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        /*
        var groupJoin_f4 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = outerCollectionItem[prop];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = innerCollectionItem ? innerCollectionItem[prop] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        /*
        var groupJoin_f5 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = outerCollectionItem[prop];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = innerCollectionItem ? innerCollectionItem[prop] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();
        */



        // final query - produces output
        var groupLeftJoin_f1 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupLeftJoin_p1 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupLeftJoin_f2 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of outerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    for ( let prop of props )
                        outputItem[ prop ] = outerCollectionItem[ prop ];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;

                    // valid props array
                    var props = [];

                    // fetch all valid props from the input collection item
                    for ( let selector of innerSelectorArray )
                    {
                        if ( selector[ 1 ] === true )
                            props.push( selector[ 0 ] );
                    }

                    // define the right-side item to check the key
                    var outputItem = Object.create( null );

                    // create the right-side item
                    for ( let prop of props )
                        outputItem[ prop ] = innerCollectionItem[ prop ];


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // create array of keys and array of their values of the passed left-side key
                    var allKeyPropNames, allKeyPropValues = [];
                    allKeyPropNames = Object.getOwnPropertyNames( outerCollectionItemKeyValue );
                    for ( let keyProp of allKeyPropNames )
                        allKeyPropValues.push( outerCollectionItemKeyValue[ keyProp ] );


                    // create array of keys and array of their values of the passed inner collection item
                    var allInnerPropNames, allInnerPropValues = [];
                    allInnerPropNames = Object.getOwnPropertyNames( outputItem );
                    for ( let keyProp of allInnerPropNames )
                        allInnerPropValues.push( outputItem[ keyProp ] );

                    // check the join
                    isJoin = allKeyPropNames.equals( allInnerPropNames ) && allKeyPropValues.equals( allInnerPropValues );


                    // return the key lookup bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem )
                {
                    // define the output item
                    var outputItem = Object.create( null );

                    // create "the shape"
                    outputItem.left = outerCollectionMatchingItem;
                    outputItem.right = innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The context of GROUP_LEFT_JOIN requires providing valid "outerSelectorArray" and "innerSelectorArray" array key extractors !
        /*
        var groupLeftJoin_f3 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = outerCollectionItem[prop];

                    // return the output item
                    return outputItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem) {
                    // valid props array
                    var props = ['id'];

                    // define the output item
                    var outputItem = Object.create(null);

                    // create "the shape"
                    for(let prop of props)
                        outputItem[prop] = innerCollectionItem ? innerCollectionItem[prop] : undefined;

                    // return the output item
                    return outputItem;
                },
                'udfResultSelector': null,
                'udfEqualityComparer': udf_commons.udfDefaultObjectContentComparer
            }
        ).toArray();
        */


        // final query - produces output
        var elementAt_f1 = collection_of_integers.elementAt(
            {
                'index': 2
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The index was out of range. Must be non-negative and less than the size of the collection_of_integers. Parameter name: index
        /*
        var elementAt_f2 = collection_of_integers.elementAt(
            {
                'index': 100
            }
        );
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The index was out of range. Must be non-negative and less than the size of the collection_of_integers. Parameter name: index
        /*
        var elementAt_f3 = collection_of_integers.elementAt(
            {
                'index': -2
            }
        );
        */

        // final query - produces output
        var elementAtOrDefault_f1 = collection_of_integers.elementAtOrDefault(
            {
                'index': 2
            }
        );

        // final query - produces output
        var elementAtOrDefault_f2 = collection_of_integers.elementAtOrDefault(
            {
                'index': 100
            }
        );

        // final query - produces output
        var elementAtOrDefault_f3 = collection_of_integers.elementAtOrDefault(
            {
                'index': -2
            }
        );


        // final query - produces output
        var first_f1 = collection_of_integers.first(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        // final query - produces output
        var firstOrDefault_f1 = collection_of_integers.firstOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var first_f2 = collection_of_integers.first(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.item.size", ">", 10 ]
                ]
            }
        );
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var firstOrDefault_f2 = collection_of_integers.firstOrDefault(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.item.size", ">", 10 ]
                ]
            }
        );
        */

        // final query - produces output
        var last_f1 = collection_of_integers.last(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        // final query - produces output
        var lastOrDefault_f1 = collection_of_integers.lastOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var last_f2 = collection_of_integers.last(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.item.size", ">", 10 ]
                ]
            }
        );
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var lastOrDefault_f2 = collection_of_integers.lastOrDefault(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.item.size", ">", 10 ]
                ]
            }
        );
        */


        // final query - produces output
        var single_f1 = collection_of_integers.single(
            {
                'predicateArray': [
                    [ "id", "==", 5 ]
                ]
            }
        );

        // final query - produces output
        var singleOrDefault_f1 = collection_of_integers.singleOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 13 ]
                ]
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var single_f2 = collection_of_integers.single(
            {
                'predicateArray': [
                    [ "order.item.size", ">", 6 ]
                ]
            }
        );
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.item.size ] !
        /*
        var singleOrDefault_f2 = collection_of_integers.singleOrDefault(
            {
                'predicateArray': [
                    [ "order.item.size", ">", 6 ]
                ]
            }
        );
        */

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        //var single_f3 = collection_of_integers.single();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        //var singleOrDefault_f3 = collection_of_integers.singleOrDefault();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains no elements !
        //var single_f4 = [].single();

        // final query - produces output
        var singleOrDefault_f4 = [].singleOrDefault();




        /**
         * At any point you can interact with cache
         *
         * - enable/disable it      ->  System.Linq.Context.Cache.enable(true/false)
         * - clear it               ->  System.Linq.Context.Cache.clear()
         *
        */
        // f.e. turn on the cache
        System.Linq.Context.Cache.enable( true );




        // final query - produces output
        var any_f1 = collection_of_integers.any(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "id", "<", 10, true ]
                ]
            }
        );

        // final query - produces output
        var all_f1 = collection_of_integers.all(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "id", "<", 10, true ]
                ]
            }
        );

        // final query - produces output
        var any_f2 = collection_of_decimals.any(
            {
                'predicateArray': [
                    [ "order.xyz.abc", ">", 10 ]
                ]
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.xyz.abc ] !
        var all_f2 = collection_of_decimals.all(
            {
                'predicateArray': [
                    [ "order.xyz.abc", "<", 10 ]
                ]
            }
        );
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Object reference not set to an instance of an object [ order.xyz.abc ] !
        var all_f3 = collection_nullProps_where_take_skip_all_any_2.all(
            {
                'predicateArray': [
                    [ "order.xyz.abc", "<", 10 ]
                ]
            }
        );
        */

        // final query - produces output
        var any_f3 = collection_of_integers.any();

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'any_f3' uses the same filters, hence this query 'any_f3_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var any_f3_cache = collection_of_integers.any();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Method [ all ] has to have "params" object provided !
        //var all_f3 = collection_of_integers.all();


        // final query - produces output [ find the minimum value in a generic sequence ]
        var min_empty = [].min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var max_empty = [].max();

        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Query method called 'average' has to have "params" object provided !
        //var average_empty = [].average();

        // final query - produces output [ find the minimum value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Non-empty collection requires each item to implement custom toString method !
        //var min_full = collection_of_integers.min();

        // final query - produces output [ find the maximum value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Non-empty collection requires each item to implement custom toString method !
        //var max_full = collection_of_integers.max();

        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Query method called 'average' has to have "params" object provided !
        //var average_full = collection_of_integers.average();

        // final query - produces output [ find item with the smallest value of property called 'id' ]
        var min_f1 = collection_of_integers.min(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value of property called 'id' ]
        var min_f1_fi = collection_of_integers.min(
            // query method interface for this query !
            {
                'property': [ 'id', true ],
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the miniumum value !
                     * Parameter of the function called 'collectionItemPropertyInQuestion' contains property value mentioned in the parameter called 'property': [ 'id', true ] of the query method interface !
                    */

                    // apply your own logic here !


                    // ...


                    // this is mandatory logic ! ⚠️
                    collectionInQuestion[ collectionItemIndex ] = collectionItemPropertyInQuestion;
                }
            },
            // cache configuration for this query ! ⚠️ (OPTIONAL)
            {
                // use this cache config or not
                use: true,

                // array of cache objects for any query method interface's UDFs available for this query
                udfCacheConfig: [
                    // cache config for UDF called 'udfValueSelector'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfValueSelector',

                        // use this cache config or not
                        useCache: true,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: 'udfValueSelector_qwerty'
                    },

                    // .. other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'min_f1' uses the same filters, hence this query 'min_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var min_f1_cache = collection_of_integers.min(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value of the object itself ]
        var min_f1a = collection_of_strings.min(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );

        // // final query - produces output [ find item with the smallest value of the object itself ] - THIS QUERY USES CACHE ->
        /*
            Query called 'min_f1a' uses the same filters, hence this query 'min_f1a_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var min_f1a_cache = collection_of_strings.min(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value of the object itself ] - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting PLAIN or KVP's VALUE by itself requires presence of custom method "toString()" !
        /*
        var min_f1b = collection_of_integers.min(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );
        */

        // final query - produces output [ find item with the biggest value of property called 'id' ]
        var max_f1 = collection_of_integers.max(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'max_f1' uses the same filters, hence this query 'max_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var max_f1_cache = collection_of_integers.max(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the biggest value of the object itself ] - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting PLAIN or KVP's VALUE by itself requires presence of custom method "toString()" !
        /*
        var max_f1a = collection_of_integers.max(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );
        */

        // final query - produces output [ find item with the value of property called 'id' that lives in the middle between smallest one and biggest one ]
        var average_f1 = collection_of_integers.average(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'average_f1' uses the same filters, hence this query 'average_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var average_f1_cache = collection_of_integers.average(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        /*
        // final query - produces output [ find item that lives in the middle between smallest one and biggest one ] - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting PLAIN or KVP's VALUE by itself requires presence of custom method "toString()" !
        var average_f1a = collection_of_integers.average(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );
        */

        /*
        // final query - produces output [ find item with the smallest value of property called 'id' ] - THIS METHOD THROWS EXPECTED ERROR ! -> The sequence has no elements.
        var min_f2 = [].min(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );
        */
        // final query - produces output [ find item with the smallest value of the object itself ]
        var min_f2a = [].min(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'min_f2a' uses the same filters, hence this query 'min_f2a_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var min_f2a_f1_cache = [].min(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );

        /*
        // final query - produces output [ find item with the biggest value of property called 'id' ] - THIS METHOD THROWS EXPECTED ERROR ! -> The sequence has no elements.
        var max_f2 = [].max(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );
        */

        // final query - produces output [ find item with the biggest value of the object itself ]
        var max_f2a = [].max(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the value of property called 'id' that lives in the middle between smallest one and biggest one ]
        var average_f2 = [].average(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        /*
        // final query - produces output [ find item with the average value of the object itself ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object Object] to type [object Number]
        var average_f2a = [].average(
            {
                'property': [ 'object!', true ],
                'udfValueSelector': null
            }
        );
        */

        // final query - produces output [ find item with the smallest value of property called 'id' ]
        var min_f3 = [ { id: 1, name: 'Name 1' } ].min(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the biggest value of property called 'id' ]
        var max_f3 = [ { id: 1, name: 'Name 1' } ].max(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the value of property called 'id' that lives in the middle between smallest one and biggest one ]
        var average_f3 = [ { id: 1, name: 'Name 1' } ].average(
            {
                'property': [ 'id', true ],
                'udfValueSelector': null
            }
        );

        /**
         * Misc cases:
         * 
         *  where_f3 -> example of query method definition caching
         * 
         * orderBy_p3_take_p1 -> break the sorting context (orderBy_p3 <-> orderBy_p3_take_p1) by supplying non-sorting method
         * 
         * orderBy_p3_thenBy_p1 -> showing the sorting context encapsulation (orderBy_p3 <-> orderBy_p3_thenBy_p1) by supplying two consecutive sorting methods in a row
         * 
         * orderBy_take_thenBy_toArray_f1 -> break the sorting context by supplying non-sorting method (whole query in one statement)
         * 
         * thenBy_p3 -> break the sorting context (thenBy_p3) by supplying 2nd level sorting method without providing 1st level sorting method in the first place
         * 
        */

        // final query - produces output [example of query method definition caching]
        var where_f3 = collection_of_strings.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ]
                ]
            }
        ).where(
            {
                'predicateArray': [
                    [ "id", ">=", 4, true ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state [example of query method definition caching - part 1]
        var where_p3_2 = collection_of_strings.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ]
                ]
            }
        );
        // partial query - produces intermediate query state [example of query method definition caching - part 2]
        var where_p3_2A = where_p3_2.where(
            {
                'predicateArray': [
                    [ "id", ">=", 4, true ]
                ]
            }
        );

        // final query - produces output
        var where_p3_2A_f = where_p3_2A.toArray();


        // partial query - produces intermediate query state
        var orderBy_p3 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "price", true ]
                ],
                'udfComparer': null
            }
        );
        // break the sorting context (orderBy_p3 <-> orderBy_p3_take_p1) by supplying non-sorting method
        var orderBy_p3_take_p1 = orderBy_p3.take(
            {
                'count': 2
            }
        );
        // partial query - produces intermediate query state - THIS METHOD THROWS EXPECTED ERROR !
        /**
         * Error message states this:
         * You can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !
         * Additionally 2nd level sorting must the very next operation taking place just after 1st level sorting was applied.
        */
        // var orderBy_p3_take_p1_thenBy_p1 = orderBy_p3_take_p1.thenBy(
        //     {
        //         'keyPartSelectorArray': [
        //             [ "id", true ]
        //         ],
        //         'udfComparer': null
        //     }
        // );

        // final query - produces output
        //var orderBy_p3_take_p1_thenBy_p1_toArray_f1 = orderBy_p3_take_p1_thenBy_p1.toArray();


        // partial query - produces intermediate query state
        var orderBy_p3_thenBy_p1 = orderBy_p3.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        );
        // final query - produces output
        var orderBy_p3_thenBy_p1_toArray_f1 = orderBy_p3_thenBy_p1.toArray();


        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR !
        /**
         * Error message states this:
         * You can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !
         * Additionally 2nd level sorting must the very next operation taking place just after 1st level sorting was applied.
        */
        // var orderBy_take_thenBy_toArray_f1 = collection_of_integers.orderBy(
        //     {
        //         'keyPartSelectorArray': [
        //             [ "id", true ]
        //         ],
        //         'udfComparer': null
        //     }
        // ).take(
        //     {
        //         'count': 2
        //     }
        // ).thenBy(
        //     {
        //         'keyPartSelectorArray': [
        //             [ "name", true ]
        //         ],
        //         'udfComparer': null
        //     }
        // ).toArray();


        // partial query - produces intermediate query state - THIS METHOD THROWS EXPECTED ERROR ! ->
        /*
         * You can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !
         * Additionally 2nd level sorting must the very next operation taking place just after 1st level sorting was applied.
        */
        /*
        var thenBy_p3 = collection_of_integers.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "price", true ]
                ],
                'udfComparer': null
            }
        );
        */


        // partial query - produces intermediate query state
        var groupBy_withCache_p1 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            },
            // cache configuration for this query ! ⚠️ (OPTIONAL)
            {
                // use this cache config or not
                use: true,

                // array of cache objects for any query method interface's UDFs available for this query
                udfCacheConfig: [
                    // cache config for UDF called 'udfGroupKeySelector'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfGroupKeySelector',

                        // use this cache config or not
                        useCache: false,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: null
                    },
                    // cache config for UDF called 'udfEqualityComparer'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfEqualityComparer',

                        // use this cache config or not
                        useCache: true,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: 'udfEqualityComparer_groupBy_withCache_p1'
                    },
                    // cache config for UDF called 'udfGroupKeyProjector'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfGroupKeyProjector',

                        // use this cache config or not
                        useCache: false

                        // there is no token provided, because this cache config is not enabled !
                    }
                ]
            }
        );

        // partial query - produces intermediate query state
        var groupBy_orderBy_withCache_p2 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            },
            // cache configuration for this query ! ⚠️ (OPTIONAL)
            {
                // use this cache config or not
                use: true,

                // array of cache objects for any query method interface's UDFs available for this query
                udfCacheConfig: [
                    // cache config for UDF called 'udfGroupKeySelector'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfGroupKeySelector',

                        // use this cache config or not
                        useCache: false,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: null
                    },
                    // cache config for UDF called 'udfEqualityComparer'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfEqualityComparer',

                        // use this cache config or not
                        useCache: true,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: 'udfEqualityComparer_groupBy_withCache_p1'
                    },
                    // cache config for UDF called 'udfGroupKeyProjector'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfGroupKeyProjector',

                        // use this cache config or not
                        useCache: false

                        // there is no token provided, because this cache config is not enabled !
                    }
                ]
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            },
            // cache configuration for this query ! ⚠️ (OPTIONAL)
            {
                // use this cache config or not
                use: true,

                // array of cache objects for any query method interface's UDFs available for this query
                udfCacheConfig: [
                    // cache config for UDF called 'udfComparer'
                    {
                        // name of the UDF (the same as in the aforementioned query method interface)
                        name: 'udfComparer',

                        /**
                         * Use this cache config or not, even if the udf-in-question is not provided !
                         * 
                         * This will create a bit more longer cache key, nothing else (just redundant cache part computation)
                        */
                        useCache: true,

                        // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
                        token: 'groupBy_orderBy_withCache_p2'
                    }
                ]
            }
        );

        // final query - produces output
        var groupBy_withCache_f1 = groupBy_withCache_p1.toArray();

        // final query - produces output
        var groupBy_orderBy_withCache_f1 = groupBy_orderBy_withCache_p2.toArray();



        /**
         * Testing the structure changes of collection item
        */

        // partial query - produces intermediate query state
        var where_s1_p = collection_of_integers.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var groupBy_s1_p = where_s1_p.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        );

        // partial query - produces intermediate query state
        var orderBy_s1_p = where_s1_p.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupKeyProjector': null,
                'udfGroupElementSelector': null,
                'udfGroupResultValueSelector': null
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        );

        // final query - produces output
        var orderBy_s1_f = orderBy_s1_p.toArray();

        // final query - produces output
        var groupBy_s1_f = groupBy_s1_p.toArray();

        // final query - produces output
        var toDictionary_s1_f = groupBy_s1_p.toDictionary(
            {
                'predicateArray': [
                    [ "key", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null,

            }
        );


        console.log( '~ Primitives' );
    };
} )();