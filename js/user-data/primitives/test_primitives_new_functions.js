(function () {
    window.testPrimitives_NewFunctions = window.testPrimitives_NewFunctions || function () {
        console.log('Primitives - new functions');


        var collection = [1,2,3,4,5,6,7,8,9,10];

        var collection_2 = ["a", "b"];

        var collection_3 = [3.0];

        var collection_4 = [];



        debugger
        // final query - produces output
        var aggregate_f1 = collection.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f1' uses the same filters, hence this query 'aggregate_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f1_cache = collection.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f2 = collection.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f3 = collection_2.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f3' uses the same filters, hence this query 'aggregate_f3_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f3_cache = collection_2.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f4 = collection_2.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f5 = collection_3.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f5' uses the same filters, hence this query 'aggregate_f5_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f5_cache = collection_3.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f6 = collection_3.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f7 = collection_4.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f7' uses the same filters, hence this query 'aggregate_f7_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f7_cache = collection_4.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f8 = collection_4.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );


        /**
         * At any point you can interact with cache
         *
         * - enable/disable it      ->  System.Linq.Context.Cache.enable(true/false)
         * - clear it               ->  System.Linq.Context.Cache.clear()
         *
        */

        /**
         * Turn off the cache in order to show the seed example, because there is no way to cache the user-defined functions.
         * Hence without the cache being turned off this would use the cached query result.
        */
        System.Linq.Context.Cache.enable(false);

        // final query - produces output
        var aggregate_f9 = collection_2.aggregate(
            {
                'func': udf_commons.udfPrimitiveAggregateResultSelector,
                'seed': "seed 1",
                'resultSelector': udf_commons.udfPrimitiveAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f10 = collection_3.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': 7.0,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f11 = collection_4.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': true,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        console.log('~ Primitives - new functions');
        // CODE WAS TESTED UNTIL HERE !
        debugger;
    };
})();