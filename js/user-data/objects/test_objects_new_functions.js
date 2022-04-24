(function () {
    window.testObjects_NewFunctions = window.testObjects_NewFunctions || function () {
        console.log('Objects - new functions');


        var collection = [
            {
                id: 2,
                name: "Product 2",
                img: 'image 2',
                price: 2.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 2, name: "Order of Product 2", item: { size: 2, discount: 10 } }
            },
            {
                id: 3,
                name: "Product 3",
                img: 'image 3',
                price: 3.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 3, name: "Order of Product 3", item: { size: 3, discount: 10 } }
            },
            {
                id: 1,
                name: "Product 1",
                img: 'image 1',
                price: 1.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 1, name: "Order of Product 1", item: { size: 1, discount: 10 } }
            },
            {
                id: 9,
                name: "Product 9",
                img: 'image 9',
                price: 9.99,
                onsale: 3,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 9, name: "Order of Product 5", item: { size: 9, discount: 10 } }
            },
            {
                id: 4,
                name: "Product 4",
                img: 'image 4',
                price: 4.99,
                onsale: 3,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 4, name: "Order of Product 4", item: { size: 4, discount: 10 } }
            },
            {
                id: 5,
                name: "Product 5",
                img: 'image 5',
                price: 5.99,
                onsale: 2,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 5, name: "Order of Product 5", item: { size: 5, discount: 10 } }
            },
            {
                id: 6,
                name: "Product 6",
                img: 'image 6',
                price: 6.99,
                onsale: 0.0,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 6, name: "Order of Product 5", item: { size: 5, discount: 10 } }
            },
            {
                id: 7,
                name: "Product 7",
                img: 'image 3',
                price: 7.99,
                onsale: 3.0,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: null
            },
            {
                id: 8,
                name: "Product 8",
                img: 'image 8',
                price: 11.99,
                onsale: 3,
                tags: "Tag 8",
                description: "A fresh taste on a collar,"
            },
            {
                id: 10,
                name: "Product 10",
                img: 'image 10a',
                price: 10.99,
                onsale: 2,
                tags: "Tag 10a",
                description: "A fresh taste on a collar,",
                order: { id: 10, name: "Order of Product 10", item: { size: 10, discount: 10 } }
            },
            {
                id: 10,
                name: "Product 10",
                img: 'image 10b',
                price: 10.99,
                onsale: 2,
                tags: "Tag 10b",
                description: "A fresh taste on a collar,",
                order: { id: 10, name: "Order of Product 10", item: { size: 10, discount: 10 } }
            }
        ];

        var collection_2 = [
            {
                id: 1,
                name: "Person 1"
            },
            {
                id: 2,
                name: "Person 2"
            }
        ];

        var collection_3 = [
            {
                id: 1,
                name: "Person 1"
            }
        ];

        var collection_4 = [];



        debugger
        // final query - produces output
        var aggregate_f1 = collection.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f1' uses the same filters, hence this query 'aggregate_f1_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f1_cache = collection.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f2 = collection.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f3 = collection_2.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f3' uses the same filters, hence this query 'aggregate_f3_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f3_cache = collection_2.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f4 = collection_2.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f5 = collection_3.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f5' uses the same filters, hence this query 'aggregate_f5_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f5_cache = collection_3.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f6 = collection_3.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': null
            }
        );

        // final query - produces output
        var aggregate_f7 = collection_4.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output - THIS QUERY USES CACHE ->
        /*
            Query called 'aggregate_f7' uses the same filters, hence this query 'aggregate_f7_cache' only fetches data from cache,
            running away from all the expensive operations of the POL, i.e. Physical Operations Layer.
        */
        var aggregate_f7_cache = collection_4.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': null,
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f8 = collection_4.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
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
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': { id: 1, name: "Seed 1" },
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f10 = collection_3.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': { id: 1, name: "Seed 1" },
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        // final query - produces output
        var aggregate_f11 = collection_4.aggregate(
            {
                'func': udf_commons.udfObjectAggregateResultSelector,
                'seed': { id: 1, name: "Seed 1" },
                'resultSelector': udf_commons.udfObjectAggregateFinalResultSelector
            }
        );

        console.log('~ Objects - new functions');
        // CODE WAS TESTED UNTIL HERE !
        debugger;
    };
})();