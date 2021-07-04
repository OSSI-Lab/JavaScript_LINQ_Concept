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

        var unique_collection = [ 1, 3, 7, 2, 9, 8, 10 ];

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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
                    [ 11 ]
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
                    [ 11 ]
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
                    [ -1 ]
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
                    [ -1 ]
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        );


        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Input type of parameter called 'collectionOrItem' in the context of "contains" query method has to be a primitive !
        /*
        var contains_f5 = collection_of_integers.contains(
            {
                'collectionOrItem': // only object approach available
                [-1],
                'udfEqualityComparer': null
            }
        );
        */

        // partial query - produces intermediate query state
        var distinct_p1 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': null
            }
        );

        // partial query - produces intermediate query state
        var distinct_p2 = collection_of_integers.distinct(
            {
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
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
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f8 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                    10,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f9 = collection_of_integers.except(
            {
                'collectionOrItem': // array approach
                    [ 5, 7 ],
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        ).toArray();

        // final query - produces output
        var except_f10 = collection_of_integers.except(
            {
                'collectionOrItem': // array approach
                    [ 5, 7 ],
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f11 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                    [ 2, 3 ],
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        ).toArray();

        // final query - produces output
        var except_f12 = collection_of_integers.except(
            {
                'collectionOrItem': // object approach
                    [ 2, 3 ],
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer,
                'strongSearch': false
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
                    jlc_predicates.udfPrimitiveWherePredicate
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skipWhile_p3 = collection_of_integers.skipWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfPrimitiveWherePredicate
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
                    jlc_predicates.udfPrimitiveWherePredicate
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var takeWhile_p3 = collection_of_integers.takeWhile(
            {
                'predicateArray': [
                    jlc_predicates.udfPrimitiveWherePredicate
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
        var orderBy_f1a = collection_of_decimals.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1b = collection_of_strings.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1c = collection_of_booleans.orderBy(
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
                'udfComparer': udf_commons.udfEqualityComparer
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1cd = collection_of_booleans.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output 
        var orderBy_f5d = collection_of_booleans.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': udf_commons.udfEqualityComparer
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
        var orderBy_f1d = collection_of_decimals.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1e = collection_of_strings.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderBy_f1f = collection_of_booleans.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
                ],
                'udfComparer': null
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
        var toDictionary_f0 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null
            }
        );

        var all_keys = toDictionary_f0.keys;
        var all_values = toDictionary_f0.values;

        var hasKeyEq_3 = toDictionary_f0.containsKey( 3 );
        var hasValueEq_3 = toDictionary_f0.containsValue( 3 );

        var hasKeyEq_101 = toDictionary_f0.containsKey( 101 );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Item with the same key was already added to this dictionary object !
        var toDictionary_f1 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null
            }
        );
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Item with the same key was already added to this dictionary object !
        var toDictionary_f2 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        );
        */

        // final query - produces output - EXAMPLE of a SORTED_DICTIONARY
        var toDictionary_f2_sort = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': function ( value1, value2, isPrimitive )
                {
                    // one can use the third optional parameter to check whether we're dealing with primitive types or objects

                    /**
                     * Check the context of key equality comparison or sorting the keys
                     *  1. this === true -> sorting
                     *  2. otherwise key equality comparison
                    */

                    // 1.
                    if ( this.valueOf() === true )
                        return udf_commons.udfEqualityComparer( value1, value2 );

                    // 2.
                    // primitives
                    if ( isPrimitive )
                        return value1 === value2;
                    // objects
                    else
                        return udf_commons.udfDefaultPrimitiveContentComparer( value1, value2 );
                },
                'udfGroupResultValueSelector': function ( groupKey, groupItems, isDictionary )
                {
                    var newShape = Object.create( null );

                    newShape.key = groupKey;

                    // create value object
                    var value = Object.create( null );
                    value.key = "#" + groupKey;
                    value.value = groupItems;

                    // assign value object to value property of KVP
                    newShape.value = value;


                    // return new value
                    return newShape;
                },
                'doSortGroupKey': true // triggers sorting a dictionary
            }
        );

        var all_keys_sort = toDictionary_f2_sort.keys;
        var all_values_sort = toDictionary_f2_sort.values;

        var hasKeyEq_3_sort = toDictionary_f2_sort.containsKey( 3 );
        var hasValueEq_3_sort = toDictionary_f2_sort.containsValue( 3 );
        var hasValueEq_ForKeyEq3_sort = toDictionary_f2_sort.containsValue( { key: "#3", value: 3 } );

        var hasKeyEq_101_sort = toDictionary_f2_sort.containsKey( 101 );



        // final query - produces output
        var toDictionary_f2 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': function ( value1, value2, isPrimitive )
                {
                    // one can use the third optional parameter to check whether we're dealing with primitive types or objects

                    /**
                     * This example only contains key equality comparison
                    */

                    // primitives
                    if ( isPrimitive )
                        return value1 === value2;
                    // objects
                    else
                        return udf_commons.udfDefaultPrimitiveContentComparer( value1, value2 );
                },
                'udfGroupResultValueSelector': function ( groupKey, groupItems, isDictionary )
                {
                    var newShape = Object.create( null );

                    newShape.key = groupKey;

                    // create value object
                    var value = Object.create( null );
                    value.key = "#" + groupKey;
                    value.value = groupItems;

                    // assign value object to value property of KVP
                    newShape.value = value;


                    // return new value
                    return newShape;
                },
                'doSortGroupKey': false // doesn't trigger sorting a dictionary, just preserves the order of the input collection
            }
        );

        var all_keys = toDictionary_f2.keys;
        var all_values = toDictionary_f2.values;

        var hasKeyEq_3 = toDictionary_f2.containsKey( 3 );
        var hasValueEq_3 = toDictionary_f2.containsValue( 3 );
        var hasValueEq_ForKeyEq3 = toDictionary_f2.containsValue( { key: "#3", value: 3 } );

        var hasKeyEq_10 = toDictionary_f2.containsKey( 101 );


        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Item with the same key was already added to this dictionary object !
        var toDictionary_f1_orderBy_thenBy_f1 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null
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
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Item with the same key was already added to this dictionary object !
        var toDictionary_f1_orderBy_thenBy_f2 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting KVP Value by itself requires presence of custom method "toString()" !
        var toDictionary_f1_orderBy_thenBy_f3 = collection_of_integers.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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
        */

        // final query - produces output
        var toDictionary_interges_f1 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        );

        /**
         * When after converting primitives to dictionary requires sorting by 'value.' itself, supply custom method "toString()" !
        */
        toDictionary_interges_f1.forEach( function ( item, index, source_array )
        {
            // supply custom "toString" method that will allow sorting KVP by the 'value.' property itself !
            item.value.toString = function ()
            {
                return "# " + item.key;
            };

            // update item in the array
            source_array[ index ] = item;
        } );

        // final query - produces output
        var toDictionary_interges_order_f1 = toDictionary_interges_f1.orderBy(
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
        var toDictionary_f1_orderBy_p1 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        ).orderBy(
            {
                'keyPartSelectorArray': [
                    [ "value.", true ]
                ],
                'udfComparer': null
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting KVP Value by itself requires presence of custom method "toString()" !
        var toDictionary_f1_orderBy_p1_thenBy_f1 = toDictionary_f1_orderBy_p1.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "key", true ]
                ],
                'udfComparer': null
            }
        ).toArray();
        */

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
        var defaultIfEmpty_f5 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
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

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting KVP Value by itself requires presence of custom method "toString()" !
        var defaultIfEmpty_f5a = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 5, true ]
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
        */

        // final query - produces output
        var defaultIfEmpty_f6 = unique_collection.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupKeyProjector': udf_commons.udfPrimitiveGroupKeyProjector,
                'udfGroupElementSelector': udf_commons.udfPrimitiveGroupElementSelector,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 5, true ]
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

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sorting KVP Value by itself requires presence of custom method "toString()" !
        var defaultIfEmpty_f7 = unique_collection.toDictionary(
            {
                'predicateArray': [
                    [ "", true ]
                ],
                'udfGroupKeySelector': udf_commons.udfPrimitiveGroupKeySelector,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupResultValueSelector': udf_commons.udfPrimitiveGroupResultValueSelector
            }
        ).where(
            {
                'predicateArray': [
                    [ "key", ">=", 5, true ]
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
        */


        // final query - produces output
        var reverse_f1 = collection_of_integers.reverseAllOrSubset().toArray();

        // final query - produces output
        var reverse_f2 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 4
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The offset and length values are either outside the range of the array, or the number exceeds the number of items between the index and the end of the source collection.
        var reverse_f3 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 300
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        var reverse_f4 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 3
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        var reverse_f5 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 0
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        var reverse_f6 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': 300
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: count
        var reverse_f7 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': -1
            }
        ).toArray();
        */

        // final query - produces output
        var reverse_f8 = collection_of_integers.reverseAllOrSubset(
            {
                'index': 4,
                'count': 0
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> A non-negative number is required. Parameter name: index
        var reverse_f9 = collection_of_integers.reverseAllOrSubset(
            {
                'index': -4,
                'count': -1
            }
        ).toArray();
        */

        // final query - produces output
        var select_f1 = collection_of_integers.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */
                'selectorArray': [
                    [ "", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> "For 'selectMany' and any primitive type other than string you have to provide custom udf result selector called 'udfResultSelector' !"
        var selectMany_f1 = collection_of_integers.selectMany(
            {
                // Selecting multiple properties requires providing custom UDF selector.
                // Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();
        */

        // final query - produces output
        var selectMany_f1a = collection_of_integers.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveResultSelector, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var select_f2 = collection_of_decimals.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> "For 'selectMany' and any primitive type other than string you have to provide custom udf result selector called 'udfResultSelector' !"
        var selectMany_f2 = collection_of_decimals.selectMany(
            {
                 // Selecting multiple properties requires providing custom UDF selector.
                 // Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();
        */

        // final query - produces output
        var selectMany_f2a = collection_of_decimals.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveResultSelector, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var select_f3 = collection_of_booleans.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> "For 'selectMany' and any primitive type other than string you have to provide custom udf result selector called 'udfResultSelector' !"
        var selectMany_f3 = collection_of_booleans.selectMany(
            {
                // Selecting multiple properties requires providing custom UDF selector.
                // Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();
        */

        // final query - produces output
        var selectMany_f3a = collection_of_booleans.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveResultSelector, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var select_f4 = collection_of_strings.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    [ "", true ]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f4 = collection_of_strings.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f4a = collection_of_strings.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null !
                */

                'selectorArray': [
                    [ "", true ]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveResultSelector, // 'selectMany' allows for optional UDF result selector !
                'incorporateIndex': true
            }
        ).toArray();


        /**
         * At any point you can interact with cache
         *
         * - enable/disable it      ->  System.Linq.Context.Cache.enable(true/false)
         * - clear it               ->  System.Linq.Context.Cache.clear()
         *
        */
        // f.e. turn on the cache
        System.Linq.Context.Cache.enable( true );

        /**
         * JOINS
        */
        var innerColl = [ 2, 10, 7 ];

        // final query - produces output
        var join_f1 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // examplary logic that calculates the output item !
                    var outputItem = outerCollectionMatchingItem * innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
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
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // examplary logic that calculates the output item !
                    var outputItem = outerCollectionMatchingItem * innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var join_p1 = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // examplary logic that calculates the output item !
                    var outputItem = outerCollectionMatchingItem * innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': null
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



        // final query - produces output
        var join_f2a = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    // you can do something with inner collection selector

                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;


                    // you can do something with inner collection selector


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // check the join
                    isJoin = innerCollectionItem === outerCollectionItemKeyValue;


                    // return the join bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();

        // final query - produces output
        var join_f2b = collection_of_integers.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                     * In this scenario the third parameter will be exactly the same returned input value !
                     * 
                     * Otherwise the third parameter will be some other returned value based on the logic provided !
                    */

                    if ( outerCollectionItem === outerCollectionItemKeyValue && innerCollectionItem === outerCollectionItemKeyValue ) return outerCollectionItemKeyValue;
                    else if ( outerCollectionItem !== outerCollectionItemKeyValue && innerCollectionItem !== outerCollectionItem ) return innerCollectionItem;

                    return innerCollectionItem;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // examplary logic that calculates the output item !
                    var outputItem = outerCollectionMatchingItem * innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();


        /**
         * LEFT JOINS
         * 
         *  In case of primitive types 'leftJoin' && 'innerJoin' query methods will work exactly the same !
         *  It means, that for primitive types 'leftJoin' && 'innerJoin' will work as 'innerJoin's !
         *  For primitive types you need to only use 'innerJoin' query methods !
         * 
         *  Creating 'left join' results for primitive types for defined array-type syntax only wouldn't make much sense !
         * 
         *  However, 'left join' results for primitive types for defined udf-type syntax only in some scenarios can make some sense !
         * 
         *  The third case, 'left join' results for primitive types for defined array-type & udf-type syntaxes conform to the implementation logic !!!
        */

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
        var leftJoin_f1 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'join_f1' uses the same filters, hence this query 'join_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var leftJoin_f1_cache = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var leftJoin_p1 = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': null
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



        // final query - produces output
        var leftJoin_f2a = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    // you can do something with inner collection selector

                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;


                    // you can do something with inner collection selector


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // check the join
                    isJoin = innerCollectionItem === outerCollectionItemKeyValue;


                    // return the join bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();

        // final query - produces output
        var leftJoin_f2b = collection_of_integers.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                     * In this scenario the third parameter will be exactly the same returned input value !
                     * 
                     * Otherwise the third parameter will be some other returned value based on the logic provided !
                    */

                    if ( outerCollectionItem === outerCollectionItemKeyValue && innerCollectionItem === outerCollectionItemKeyValue ) return outerCollectionItemKeyValue;
                    else if ( outerCollectionItem !== outerCollectionItemKeyValue && innerCollectionItem !== outerCollectionItem ) return innerCollectionItem;

                    return innerCollectionItem;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItem, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    // examplary logic that calculates the output item !
                    outputItem.outer = outerCollectionMatchingItem;
                    outputItem.inner = innerCollectionMatchingItem;
                    outputItem.multiplicationResult = outerCollectionMatchingItem * innerCollectionMatchingItem;
                    outputItem.divisionResult = outerCollectionMatchingItem / innerCollectionMatchingItem;

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();


        /**
         * GROUP JOINS
        */

        // final query - produces output
        var groupJoin_f1 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output
        var groupJoin_f1a = innerColl.groupJoin(
            {
                'innerColl': collection_of_integers,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupJoin_p1 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupJoin_f2 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    // you can do something with inner collection selector

                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;


                    // you can do something with inner collection selector


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // check the join
                    isJoin = innerCollectionItem === outerCollectionItemKeyValue;


                    // return the join bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItems, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    /**
                     * Examplary logic that creates the output item !
                    */
                    // create the outer value
                    outputItem.outer = outerCollectionMatchingItem;
                    // create the container for all inners that were joined to this outer value
                    outputItem.innerGrouping = Object.create( null );
                    // create the container's key
                    outputItem.innerGrouping.key = outerCollectionMatchingItem;

                    // create the container's dynamically fetched array of all inner values
                    var _pl = innerCollectionMatchingItems;
                    Object.defineProperty(
                        outputItem.innerGrouping,
                        'resultsView',
                        {
                            // only override getter
                            get: function ()
                            {
                                return _pl;
                            },

                            // make it visible for loop operations
                            enumerable: true
                        }
                    );

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();

        // final query - produces output
        var groupJoin_f2a = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue )
                {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();


        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        /*
        var groupJoin_f2b = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue) {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        var groupJoin_f5 = collection_of_integers.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue) {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();
        */


        /**
         * GROUP LEFT JOINS
        */

        // final query - produces output
        var groupLeftJoin_f1 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output
        var groupLeftJoin_f1a = innerColl.groupLeftJoin(
            {
                'innerColl': collection_of_integers,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupLeftJoin_p1 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    [ "", true ]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupLeftJoin_f2 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem, outerSelectorArray )
                {
                    /**
                     * Define some logic to determine whether current outer collection item is qualified to pass down the 'join logic'
                     * 
                     * This example just returns the input value, which will be further passed to the innerUdfSelector as a second parameter !
                    */

                    // you can do something with inner collection selector

                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, innerSelectorArray, /** lskv */ outerCollectionItemKeyValue )
                {
                    // is join
                    var isJoin = false;

                    if ( !innerCollectionItem ) return isJoin;


                    // you can do something with inner collection selector


                    /**
                     * Determine "join condition" - exemplary logic !
                    */

                    // check the join
                    isJoin = innerCollectionItem === outerCollectionItemKeyValue;


                    // return the join bool result
                    return isJoin;
                },
                'udfResultSelector': function ( outerCollectionMatchingItem, innerCollectionMatchingItems, joinContextObject )
                {
                    /**
                     * joinContextObject consists of:
                     *  - isInnerJoin -> true/false
                     *  - isLeftJoin -> true/false
                     *  - isGroupJoin -> true/false
                     *  - isGroupLeftJoin -> true/false
                     * 
                     * Only one of these four values can be set to true and vice-versa
                    */

                    // you can convert primitive value to object one for some reason
                    var outputItem = Object.create( null );

                    /**
                     * Examplary logic that creates the output item !
                    */
                    // create the outer value
                    outputItem.outer = outerCollectionMatchingItem;
                    // create the container for all inners that were joined to this outer value
                    outputItem.innerGrouping = Object.create( null );
                    // create the container's key
                    outputItem.innerGrouping.key = outerCollectionMatchingItem;

                    // create the container's dynamically fetched array of all inner values
                    var _pl = innerCollectionMatchingItems;
                    Object.defineProperty(
                        outputItem.innerGrouping,
                        'resultsView',
                        {
                            // only override getter
                            get: function ()
                            {
                                return _pl;
                            },

                            // make it visible for loop operations
                            enumerable: true
                        }
                    );

                    // return the output item
                    return outputItem;
                },
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();

        // final query - produces output
        var groupLeftJoin_f2a = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function ( outerCollectionItem )
                {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function ( innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue )
                {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();


        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        /*
        var groupLeftJoin_f2b = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue) {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();
        */

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Invalid logical configuration (query method interface definition) for GROUP_JOIN. Define both types of selectors for both collections or any-but-the-same type of selectors for both collections !
        var groupLeftJoin_f5 = collection_of_integers.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': null,
                // exemplary logic showing the use case, not the best performance approach
                'outerUdfSelector': function (outerCollectionItem) {
                    // return the output item
                    return outerCollectionItem;
                },
                'innerSelectorArray': [
                    [ "id", true ]
                ],
                // exemplary logic showing the use case, not the best performance approach
                'innerUdfSelector': function (innerCollectionItem, outerCollectionItem, outerCollectionItemKeyValue) {
                    // return the output item
                    return innerCollectionItem;
                },
                'udfResultSelector': udf_commons.udfPrimitiveGroupJoinResultSelector,
                'udfEqualityComparer': udf_commons.udfDefaultPrimitiveContentComparer
            }
        ).toArray();
        */

        // final query - produces output
        var elementAt_f1 = collection_of_integers.elementAt(
            {
                'index': 2
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The index was out of range. Must be non-negative and less than the size of the collection_of_integers. Parameter name: index
        var elementAt_f2 = collection_of_integers.elementAt(
            {
                'index': 100
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> The index was out of range. Must be non-negative and less than the size of the collection_of_integers. Parameter name: index
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
        var elementAtOrDefault_f4 = [].elementAtOrDefault(
            {
                'index': -2
            }
        );



        // final query - produces output
        var first_f1 = collection_of_integers.first(
            {
                'predicateArray': [
                    [ "", ">", 7 ]
                ]
            }
        );

        // final query - produces output
        var firstOrDefault_f1 = collection_of_integers.firstOrDefault(
            {
                'predicateArray': [
                    [ "", ">", 7 ]
                ]
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains no matching element.
        var first_f2 = collection_of_integers.first(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "", ">", 10 ]
                ]
            }
        );
        */

        // final query - produces output
        var firstOrDefault_f2 = collection_of_integers.firstOrDefault(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ],
                    [ "", ">", 10 ]
                ]
            }
        );

        // final query - produces output
        var last_f1 = collection_of_integers.last(
            {
                'predicateArray': [
                    [ "", ">", 7 ]
                ]
            }
        );

        // final query - produces output
        var lastOrDefault_f1 = collection_of_integers.lastOrDefault(
            {
                'predicateArray': [
                    [ "", ">", 7 ]
                ]
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains no matching element !
        var last_f2 = collection_of_integers.last(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ],
                    [ "", ">", 10 ]
                ]
            }
        );
        */

        // final query - produces output
        var lastOrDefault_f2 = collection_of_integers.lastOrDefault(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ],
                    [ "", ">", 10 ]
                ]
            }
        );


        // final query - produces output
        var single_f1 = collection_of_integers.single(
            {
                'predicateArray': [
                    [ "", "==", 5 ]
                ]
            }
        );

        // final query - produces output
        var singleOrDefault_f1 = collection_of_integers.singleOrDefault(
            {
                'predicateArray': [
                    [ "", ">", 13 ]
                ]
            }
        );

        /*
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        var single_f2 = collection_of_integers.single(
            {
                'predicateArray': [
                    [ "", ">", 6 ]
                ]
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        var singleOrDefault_f2 = collection_of_integers.singleOrDefault(
            {
                'predicateArray': [
                    [ "", ">", 6 ]
                ]
            }
        );

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        var single_f3 = collection_of_integers.single();
       
        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains more than one element !
        var singleOrDefault_f3 = collection_of_integers.singleOrDefault();

        // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Sequence contains no elements !
        var single_f4 = [].single();
        */

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
                    [ "", ">=", 2, true ],
                    [ "", "<", 10, true ]
                ]
            }
        );

        // final query - produces output
        var all_f1 = collection_of_integers.all(
            {
                'predicateArray': [
                    [ "", ">=", 2, true ],
                    [ "", "<", 10, true ]
                ]
            }
        );

        // final query - produces output
        var any_f2 = collection_of_decimals.any(
            {
                'predicateArray': [
                    [ "", ">", 10 ]
                ]
            }
        );

        // final query - produces output
        var all_f2 = collection_of_decimals.all(
            {
                'predicateArray': [
                    [ "", "<", 10 ]
                ]
            }
        );

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



        /**
         * Math examples - empty collection !
         * 
         */

        // final query - produces output [ find the minimum value in a generic sequence ]
        var emptyColl_min0 = [].min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var emptyColl_max0 = [].max();

        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Provide data for built-in selector 'property': [ 'some property goes here', true ], or custom 'udfValueSelector'
        //var emptyColl_average0 = [].average();



        // final query - produces output [ find the minimum value in a generic sequence ]
        var emptyColl_min1 = [].min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find the maximum value in a generic sequence ]
        var emptyColl_max1 = [].max(
            {
                'udfValueSelector': null
            }
        );

        /*
        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Provide data for built-in selector 'property': [ 'some property goes here', true ], or custom 'udfValueSelector'
        var emptyColl_average1 = [].average(
            {
                'udfValueSelector': null
            }
        );
        */


        /**
         * Math examples - non-empty collection !
         * 
         * Integers
         */

        // final query - produces output [ find the minimum value in a generic sequence ]
        var fullColl_int_min = collection_of_integers.min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var fullColl_int_max = collection_of_integers.max();

        // final query - produces output [ find the average value in a generic sequence ]
        var fullColl_int_average = collection_of_integers.average();


        // final query - produces output [ find item with the smallest value ]
        var fullColl_int_min2 = collection_of_integers.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_int_min2_cache = collection_of_integers.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value ]
        var fullColl_int_min3_using_user_cache_config = collection_of_integers.min(
            // query method interface for this query !
            {
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
                        token: 'udfValueSelector_fullColl_int_min3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the biggest value ]
        var fullColl_int_max2 = collection_of_integers.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_int_max2_cache = collection_of_integers.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the biggest value ]
        var fullColl_int_max3_using_user_cache_config = collection_of_integers.max(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the maximum value !
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
                        token: 'udfValueSelector_fullColl_int_max3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the average value ]
        var fullColl_int_average2 = collection_of_integers.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_int_average2_cache = collection_of_integers.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the average value ]
        var fullColl_int_average3_using_user_cache_config = collection_of_integers.average(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the average value !
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
                        token: 'udfValueSelector_fullColl_int_average3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );


        /**
         * Math examples - non-empty collection !
         * 
         * Decimals
         */

        // final query - produces output [ find the minimum value in a generic sequence ]
        var fullColl_decimal_min = collection_of_decimals.min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var fullColl_decimal_max = collection_of_decimals.max();

        // final query - produces output [ find the average value in a generic sequence ]
        var fullColl_decimal_average = collection_of_decimals.average();


        // final query - produces output [ find item with the smallest value ]
        var fullColl_decimal_min2 = collection_of_decimals.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_decimal_min2_cache = collection_of_decimals.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value ]
        var fullColl_decimal_min3_using_user_cache_config = collection_of_decimals.min(
            // query method interface for this query !
            {
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
                        token: 'udfValueSelector_fullColl_decimal_min3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_decimal_max2 = collection_of_decimals.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_decimal_max2_cache = collection_of_decimals.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_decimal_max3_using_user_cache_config = collection_of_decimals.max(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the maximum value !
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
                        token: 'udfValueSelector_fullColl_decimal_max3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the average value ]
        var fullColl_decimal_average2 = collection_of_decimals.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_decimal_average2_cache = collection_of_decimals.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the average value ]
        var fullColl_decimal_average3_using_user_cache_config = collection_of_decimals.average(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the average value !
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
                        token: 'udfValueSelector_fullColl_decimal_average3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );


        /**
         * Math examples - non-empty collection !
         * 
         * Strings
         */

        // final query - produces output [ find the minimum value in a generic sequence ]
        var fullColl_string_min = collection_of_strings.min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var fullColl_string_max = collection_of_strings.max();

        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object String] to type [object Number]
        //var fullColl_string_average = collection_of_strings.average();


        // final query - produces output [ find item with the smallest value ]
        var fullColl_string_min2 = collection_of_strings.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_string_min2_cache = collection_of_strings.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value ]
        var fullColl_string_min3_using_user_cache_config = collection_of_strings.min(
            // query method interface for this query !
            {
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
                        token: 'udfValueSelector_fullColl_string_min3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_string_max2 = collection_of_strings.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_string_max2_cache = collection_of_strings.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_string_max3_using_user_cache_config = collection_of_strings.max(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the maximum value !
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
                        token: 'udfValueSelector_fullColl_string_max3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        /*
        // final query - produces output [ find item with the average value ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object String] to type [object Number]
        var fullColl_string_average2 = collection_of_strings.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the average value ] - THIS QUERY USES CACHE - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object String] to type [object Number]
        var fullColl_string_average2_cache = collection_of_strings.average(
            {
                'udfValueSelector': null
            }
        );
        */

        // final query - produces output [ find item with the average value ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object String] to type [object Number]
        // var fullColl_string_average3_using_user_cache_config = collection_of_strings.average(
        //     // query method interface for this query !
        //     {
        //         'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
        //         {
        //             /**
        //              * Exemplary logic showing the use case
        //              * 
        //              * The goal of this value selector function is to further narrow down what we want to find as the average value !
        //              * Parameter of the function called 'collectionItemPropertyInQuestion' contains property value mentioned in the parameter called 'property': [ 'id', true ] of the query method interface !
        //             */

        //             // apply your own logic here !


        //             // ...


        //             // this is mandatory logic ! ⚠️
        //             collectionInQuestion[ collectionItemIndex ] = collectionItemPropertyInQuestion;
        //         }
        //     },
        //     // cache configuration for this query ! ⚠️ (OPTIONAL)
        //     {
        //         // use this cache config or not
        //         use: true,

        //         // array of cache objects for any query method interface's UDFs available for this query
        //         udfCacheConfig: [
        //             // cache config for UDF called 'udfValueSelector'
        //             {
        //                 // name of the UDF (the same as in the aforementioned query method interface)
        //                 name: 'udfValueSelector',

        //                 // use this cache config or not
        //                 useCache: true,

        //                 // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
        //                 token: 'udfValueSelector_fullColl_string_average3_using_user_cache_config'
        //             },

        //             // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
        //         ]
        //     }
        // );


        /**
         * Math examples - non-empty collection !
         * 
         * Booleans
         */

        // final query - produces output [ find the minimum value in a generic sequence ]
        var fullColl_boolean_min = collection_of_booleans.min();

        // final query - produces output [ find the maximum value in a generic sequence ]
        var fullColl_boolean_max = collection_of_booleans.max();

        // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object Boolean] to type [object Number]
        //var fullColl_boolean_average = collection_of_booleans.average();


        // final query - produces output [ find item with the smallest value ]
        var fullColl_boolean_min2 = collection_of_booleans.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_boolean_min2_cache = collection_of_booleans.min(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the smallest value ]
        var fullColl_boolean_min3_using_user_cache_config = collection_of_booleans.min(
            // query method interface for this query !
            {
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
                        token: 'udfValueSelector_fullColl_boolean_min3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_boolean_max2 = collection_of_booleans.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output - THIS QUERY USES CACHE
        var fullColl_boolean_max2_cache = collection_of_booleans.max(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the maximum value ]
        var fullColl_boolean_max3_using_user_cache_config = collection_of_booleans.max(
            // query method interface for this query !
            {
                'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
                {
                    /**
                     * Exemplary logic showing the use case
                     * 
                     * The goal of this value selector function is to further narrow down what we want to find as the maximum value !
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
                        token: 'udfValueSelector_fullColl_boolean_max3_using_user_cache_config'
                    },

                    // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
                ]
            }
        );
    
        /*
        // final query - produces output [ find item with the average value ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object Boolean] to type [object Number]
        var fullColl_boolean_average2 = collection_of_booleans.average(
            {
                'udfValueSelector': null
            }
        );

        // final query - produces output [ find item with the average value ] - THIS QUERY USES CACHE - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object Boolean] to type [object Number]
        var fullColl_boolean_average2_cache = collection_of_booleans.average(
            {
                'udfValueSelector': null
            }
        );
        */

        // // final query - produces output [ find item with the average value ] - THIS METHOD THROWS EXPECTED ERROR ! -> There is no implicit conversion from type [object Boolean] to type [object Number]
        // var fullColl_boolean_average3_using_user_cache_config = collection_of_booleans.average(
        //     // query method interface for this query !
        //     {
        //         'udfValueSelector': function ( collectionItemPropertyInQuestion, collectionItemIndex, collectionInQuestion )
        //         {
        //             /**
        //              * Exemplary logic showing the use case
        //              * 
        //              * The goal of this value selector function is to further narrow down what we want to find as the average value !
        //              * Parameter of the function called 'collectionItemPropertyInQuestion' contains property value mentioned in the parameter called 'property': [ 'id', true ] of the query method interface !
        //             */

        //             // apply your own logic here !


        //             // ...


        //             // this is mandatory logic ! ⚠️
        //             collectionInQuestion[ collectionItemIndex ] = collectionItemPropertyInQuestion;
        //         }
        //     },
        //     // cache configuration for this query ! ⚠️ (OPTIONAL)
        //     {
        //         // use this cache config or not
        //         use: true,

        //         // array of cache objects for any query method interface's UDFs available for this query
        //         udfCacheConfig: [
        //             // cache config for UDF called 'udfValueSelector'
        //             {
        //                 // name of the UDF (the same as in the aforementioned query method interface)
        //                 name: 'udfValueSelector',

        //                 // use this cache config or not
        //                 useCache: true,

        //                 // token of this UDF to be used in computing the cache key for this query (SHOULD BE UNIQUE IF REQUIRED, OR THE SAME AS IN DIFFERENT UDFs ACROSS WHOLE RANGE OF QUERIES)
        //                 token: 'udfValueSelector_fullColl_boolean_average3_using_user_cache_config'
        //             },

        //             // ... other cache config objects go here if required for any other UDFs available in this aforementioned query method interface !
        //         ]
        //     }
        // );





        /**
         * Misc cases:
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


        // partial query - produces intermediate query state
        var orderBy_p3 = collection_of_integers.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "", true ]
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
        //             [ "", true ]
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
                    [ "", true ]
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
        //             [ "", true ]
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
        //             [ "", true ]
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
                    [ "", true ]
                ],
                'udfComparer': null
            }
        );
        */


        // partial query - produces intermediate query state
        var groupBy_withCache_p1 = collection_of_integers.groupBy(
            {
                'predicateArray': [
                    [ "", true ]
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
                        token: 'udfEqualityComparer_groupBy_withCache_p1_primitive'
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
                    [ "", true ]
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
                        token: 'udfEqualityComparer_groupBy_withCache_p1_primitive'
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
                        token: 'groupBy_orderBy_withCache_p2_primitive'
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
                    [ "", ">=", 2, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var groupBy_s1_p = where_s1_p.groupBy(
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
        );

        // partial query - produces intermediate query state
        var orderBy_s1_p = where_s1_p.groupBy(
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
        // CODE WAS TESTED UNTIL HERE !
        debugger;
    };
} )();