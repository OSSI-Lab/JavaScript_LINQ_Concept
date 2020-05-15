(function () {
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




    window.goto_Primitives_MultipleMethodUsage = window.goto_Primitives_MultipleMethodUsage || function() {
        console.log('Primitives - multiple method usage');
        
        
        var coll_prim_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        var coll_prim_2 = [4, 1, 2, 3, 6, 7, 5, 8, 9, 10];


        var coll_primitives_orderBy = coll_prim_1.usingLinq()
                                                             // when sorting you have to provide the bool flag as the second parameter like with objects
                                                             .orderBy(
                                                                        {
                                                                            'keyPartSelectorArray' :	[
                                                                                                            ["", true]
                                                                                                        ]
                                                                        }
                                                                     )
                                                             .toArray();



        var coll_primitives_orderByDescending = coll_prim_1.usingLinq()
                                                                       // when sorting you have to provide the bool flag as the second parameter like with objects
                                                                       .orderByDescending(
                                                                                            {
                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                ["", true]
                                                                                                                            ]
                                                                                            }
                                                                                         )
                                                                       .toArray();



        var coll_primitives_orderByDescending_thenBy = coll_prim_1.usingLinq()
                                                                              // when sorting you have to provide the bool flag as the second parameter like with objects
                                                                              .orderByDescending(
                                                                                                    {									
                                                                                                        'keyPartSelectorArray' :	[
                                                                                                                                        ["", true]
                                                                                                                                    ]
                                                                                                    }
                                                                                                )
                                                                              /**
                                                                               * In this example this second-level sorting is already not necessary !
                                                                               * The previous sorting that took place sorted the data using "the key", i.e. unique value !
                                                                               * Hence, the further sorting doesn't make sense !
                                                                              */
                                                                              .thenBy(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["", true]
                                                                                                                        ]
                                                                                        }
                                                                                     )
                                                                              .toArray();



        var coll_primitives_toDictionary_orderByDescending_k = coll_prim_1.usingLinq()
                                                                                      .toDictionary(
                                                                                                        {
                                                                                                            'predicateArray' :	[
                                                                                                                                    ["", true]
                                                                                                                                ]
                                                                                                        }
                                                                                                   )
                                                                          .usingLinq()
                                                                                      /**
                                                                                       * In this example this first-level sorting uses valid syntax for sorting KVPs, here by the 'key' property !
                                                                                       * The syntax for sorting KVPs, here by the key value is ["key", true]
                                                                                       * In case of primitive values, sorting by key value means sorting by the KVP's property called 'key' !
                                                                                       * Hence, the attempt to sort succeeds !
                                                                                      */
                                                                                      .orderByDescending(
                                                                                                            {
                                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                                ["key", true]
                                                                                                                                            ]
                                                                                                            }
                                                                                                        )
                                                                                      /**
                                                                                       * In this example this second-level sorting is already not necessary !
                                                                                       * The previous sorting that took place sorted the data using "the key", i.e. unique value !
                                                                                       * Hence, the further sorting doesn't make sense !
                                                                                      */
                                                                                      .thenBy(
                                                                                                {
                                                                                                    'keyPartSelectorArray' :	[
                                                                                                                                    ["value.", true]
                                                                                                                                ]
                                                                                                }
                                                                                             )
                                                                                      .toArray();



        var coll_primitives_toDictionary_orderByDescending_v = coll_prim_1.usingLinq()
                                                                                      .toDictionary(
                                                                                                        {
                                                                                                            'predicateArray' :	[
                                                                                                                                    ["", true]
                                                                                                                                ]
                                                                                                        }
                                                                                                   )
                                                                          .usingLinq()
                                                                                      /**
                                                                                       * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value object itself !
                                                                                       * The syntax for sorting KVPs, here by value object, is ["value.", true]
                                                                                       * In case of primitive values, sorting by value object means sorting by the primitive value itself !
                                                                                       * Hence, the attempt to sort succeeds !
                                                                                      */
                                                                                      .orderByDescending(
                                                                                                            {
                                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                                ["value.", true]
                                                                                                                                            ]
                                                                                                            }
                                                                                                        )
                                                                                      /**
                                                                                       * In this example this second-level sorting is already not necessary !
                                                                                       * The previous sorting that took place sorted the data using "the key", i.e. unique value !
                                                                                       * Hence, the further sorting doesn't make sense !
                                                                                      */
                                                                                      .thenBy(
                                                                                                    {
                                                                                                        'keyPartSelectorArray' :	[
                                                                                                                                        ["key", true]
                                                                                                                                    ]
                                                                                                    }
                                                                                             )
                                                                                      .toArray();



        var coll_primitives_toDictionary_orderByDescending_u = coll_prim_1.usingLinq()
                                                                                      .toDictionary(
                                                                                                        {
                                                                                                            'udfGroupKeySelector' : jlc_filters.udfGroupOrDictKeySelector 
                                                                                                        }
                                                                                                   )
                                                                          .usingLinq()
                                                                                      /**
                                                                                       * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value object itself !
                                                                                       * The syntax for sorting KVPs, here by value object, is ["value.", true]
                                                                                       * In case of primitive values, sorting by value object means sorting by the primitive value itself !
                                                                                       * Hence, the attempt to sort succeeds !
                                                                                      */
                                                                                      .orderByDescending(
                                                                                                            {
                                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                                ["value.", true]
                                                                                                                                            ]
                                                                                                            }
                                                                                                        )
                                                                                      /**
                                                                                       * In this example this second-level sorting is already not necessary !
                                                                                       * The previous sorting that took place sorted the data using "the key", i.e. unique value !
                                                                                       * Hence, the further sorting doesn't make sense !
                                                                                      */
                                                                                      .thenBy(
                                                                                                    {
                                                                                                        'keyPartSelectorArray' :	[
                                                                                                                                        ["key", true]
                                                                                                                                    ]
                                                                                                    }
                                                                                             )
                                                                                      .toArray();



        var coll_prim_1_groupped = coll_prim_1.usingLinq()
                                                          // when grouping you have to provide the bool flag like with objects as the second parameter
                                                          .groupBy(
                                                                        {
                                                                            'predicateArray' :	[
                                                                                                    ["", true]
                                                                                                ]
                                                                        }
                                                                  )
                                                          .toArray();

        // process pre-yielded grouping primitives of 'groupBy' query method
        udf_commons.process_GroupBy_result(coll_prim_1_groupped);


        var coll_prim_1_dictionary = coll_prim_1.usingLinq()
                                                            // when converting to dictionary you have to provide the bool flag like with objects as the second parameter
                                                            .toDictionary(
                                                                                {
                                                                                    'predicateArray' :	[
                                                                                                            ["", true]
                                                                                                        ]
                                                                                }
                                                                         )
                                                                        

        
        /**
         * Other operations require from 3 to 4 parameters to be present 
        */
                      
        var a1 = coll_prim_1.usingLinq()
                                        .takeWhile(
                                                    {
                                                        'predicateArray' :	[
                                                                                ["", "<", 7]
                                                                            ]
                                                    }
                                                  )
                                        .toArray();

        var a2 = coll_prim_1.usingLinq()
                                        .skipWhile(
                                                    {
                                                        'predicateArray' :	[
                                                                                ["", "<", 7]
                                                                            ]
                                                    }                                            
                                                  )
                                        .toArray();
                                        
        var b1 = coll_prim_2.usingLinq()
                                        .takeWhile(
                                                    {
                                                        'predicateArray' :	[
                                                                                ["", "<", 7]
                                                                            ]
                                                    }                                            
                                                  )
                                        .toArray();

        var b2 = coll_prim_2.usingLinq()
                                        .skipWhile(
                                                    {
                                                        'predicateArray' :	[
                                                                                ["", "<", 7]
                                                                            ]
                                                    }                                            
                                                  )
                                        .toArray();                                        

        







        var nonEmpty_array = coll_prim_1.usingLinq()
                                                    .any();
 
        var all_primitives = coll_prim_1.usingLinq()
                                                    .all(		
                                                            {									
                                                                'predicateArray' :	[
                                                                                        ["", ">=", 2, true],
                                                                                        ["", ">=", 4, true],
                                                                                        ["           ", "<", 10, true]
                                                                                    ]
                                                            }
                                                        );
        
        
        var example_primitives_1 = coll_prim_1.usingLinq()
                                                          .where(
                                                                    {
                                                                        'predicateArray' :	[
                                                                                                ["", ">=", 2, true],
                                                                                                ["", "<", 10, true],
                                                                                                jlc_filters.myFilter3.bind(null, [111, 222, 333, 444])
                                                                                            ]
                                                                    }
                                                                )
                                                          .take(
                                                                    {
                                                                        'count' : 6
                                                                    }
                                                               )
                                                          .lastOrDefault(
                                                                            {									
                                                                                'predicateArray' :	[
                                                                                                        ["", ">", 5],
                                                                                                        ["", "<", 7]
                                                                                                    ]
                                                                            }
                                                                        );
        
        var example_primitives_2 = coll_prim_1.usingLinq()
                                                          .where(
                                                                    {
                                                                        'predicateArray' :	[
                                                                                                ["", ">=", 2, true],
                                                                                                ["", "<", 10, true]
                                                                                            ]
                                                                    }
                                                                )
                                                          .takeWhile(
                                                                        {
                                                                            'predicateArray' :	[
                                                                                                    ["", ">", 0]
                                                                                                ]
                                                                        }
                                                                    )
                                                          .skipWhile(
                                                                        {
                                                                            'predicateArray' :	[
                                                                                                    ["", "<", 6]
                                                                                                ]
                                                                        }
                                                                    )
                                                          .toArray();




        var new_coll = [100, 200, 300, 400];

        var coll_prim_1_merged = coll_prim_1.usingLinq()
                                                        .concat(
                                                                    {
                                                                        'inputCollection' : new_coll
                                                                    }
                                                               )
                                                        .toArray();

        var coll_prim_1_merged_append = coll_prim_1_merged.usingLinq()
                                                                      .append(
                                                                                {
                                                                                    'collectionItem' : 500
                                                                                }
                                                                             )
                                                                      .toArray();

        var coll_prim_1_merged_prepend = coll_prim_1_merged_append.usingLinq()
                                                                  .prepend(
                                                                                {
                                                                                    'collectionItem' : -1000
                                                                                }
                                                                          )
                                                                  .toArray();


        console.log('~ Primitives - multiple method usage');
    };
}
)();