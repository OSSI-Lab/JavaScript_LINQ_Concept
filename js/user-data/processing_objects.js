(function () {

    window.goToObjects = window.goToObjects || function() {

        var coll_1 = [
            {id: 1, name : "Object 1", ne : {ne_id : 1, ne_name : "NO 1"}, valid : true, lite : false, descr : "Descr 1", quality : "A"},
            {id: 7, name : "Object 7", ne : {ne_id : 7, ne_name : "NO 7"}, valid : true, lite : false, descr : "Descr 7", quality : "D"},
            {id: 8, name : "Object 8", ne : {ne_id : 8, ne_name : "NO 8"}, valid : true, lite : false, descr : "Descr 8", quality : "E"},
            {id: 9, name : "Object 9", ne : {ne_id : 9, ne_name : "NO 9"}, valid : true, lite : true, descr : "Descr 9", quality : "F"},			
            {id: 2, name : "Object 2", ne : {ne_id : 2, ne_name : "NO 2"}, valid : true, lite : false, descr : "Descr 2", quality : "A"},
            {id: 3, name : "Object 3", ne: null, 						   valid : false, lite : false, descr: "Descr 3", quality: "C" },
            {id: 4, name : "Object 4", ne : {ne_id : 4, ne_name : "NO 4"}, valid : true, lite : false, descr : "Descr 4", quality : "B"},
            {id: 5, name : "Object 5", ne : {ne_id : 5, ne_name : "NO 5"}, valid : true, lite : false, descr : "Descr 5", quality : "A"},
            {id: 6, name : "Object 6", ne : {ne_id : 6, ne_name : "NO 6"}, valid : true, lite : true, descr : "Descr 6", quality : "C"},
            {id: 10, name : "Object 4", ne : {ne_id : 10, ne_name : "NO 10"}, valid : true, lite : true, descr : "Descr 4", quality : "A"}
        ];
        
        /**
         * Who you are ?
         * https://thesaurus.yourdictionary.com/childish 
        */
        var coll_toString = [
            {id: 1, name : "False software engineer", descr : "Earning a lot, learning nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 2, name : "False software developer", descr : "Earning quite a lot, playing new computer games !", quality : "F", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 3, name : "False software architect", descr : "Earning huge money, creating huge stupidity!", quality : "E", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 4, name : "False adolescent immature the rest ", descr : "Knowing nothing, learning nothing, being nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }}
        ];

        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them (classic example)!
         * 
         * CIT -> PLAIN
         * 
         * ✔️
        */
        var example_where_orderByDescending_thenBy_1 = coll_1.usingLinq()
                                                                         .where(
                                                                                    {
                                                                                        'predicateArray' :	[
                                                                                                                ["ne.ne_id", "<", 100, true]
                                                                                                            ]
                                                                                    }
                                                                               )
                                                                         .orderByDescending(
                                                                                                {
                                                                                                    'keyPartSelectorArray' :	[
                                                                                                                                    ["name", true]
                                                                                                                                ]
                                                                                                }
                                                                                           )
                                                                         .thenBy(
                                                                                    {
                                                                                        'keyPartSelectorArray' :	[
                                                                                                                        ["quality", true],
                                                                                                                        ["-"], // second parameter 'false' is not required as either 'false' or 'undefined' evaluates to something falsy after all
                                                                                                                        ["id", true]
                                                                                                                    ]
                                                                                    }
                                                                                )
                                                                         /**
                                                                          * In this example this thrid sorting in a row (second 2nd level sorting) is already not necessary !
                                                                          * The previous sorting that took place sorted the data using "the key", i.e. unique value !
                                                                          * Hence, the further sorting doesn't make sense !  
                                                                         */
                                                                         .thenByDescending(
                                                                                                {
                                                                                                    'keyPartSelectorArray' :	[
                                                                                                                                    ["lite", true]
                                                                                                                                ]
                                                                                                }
                                                                                          )
                                                                         .toArray();



        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> KVP -> Value -> PLAIN
         * 
         * ✔️
        */
        var example_toDictionary_orderBy_ValuePLAIN = coll_toString.usingLinq()
                                                                               .toDictionary(
                                                                                                {
                                                                                                    'predicateArray' :	[
                                                                                                                            ["id", true]
                                                                                                                        ]
                                                                                                }
                                                                                            )
                                                                   .usingLinq()
                                                                               /**
                                                                                * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value's property called 'quality' !
                                                                                * The syntax for sorting KVPs, here by value's property, is ["value.property_name", true]
                                                                                * 
                                                                                * This is normal PLAIN sorting in the context of KVP's Value object ! 
                                                                                * Hence, the attempt to sort succeeds !
                                                                               */
                                                                               .orderBy(
                                                                                            {
                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                ["value.quality", true]
                                                                                                                            ]
                                                                                            }
                                                                                       )
                                                                               /**
                                                                                * In this example this second-level sorting is necessary !
                                                                                * The previous sorting that took place, sorted the data using "the non-key" called "value.quality", i.e. non-unique value !
                                                                                * Hence, the further sorting does make sense !
                                                                               */
                                                                               .thenByDescending(
                                                                                                    {
                                                                                                        'keyPartSelectorArray' :	[
                                                                                                                                        ["key", true]
                                                                                                                                    ]
                                                                                                    }
                                                                                                )
                                                                               .toArray();



        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> KVP -> Value
         * 
         * ⚠️ Objects must implement toString() method that returns unique value of the object !
         * ✔️ In this case the do have such method.
        */
        var example_toDictionary_orderBy_Value_valid = coll_toString.usingLinq()
                                                                                .toDictionary(
                                                                                                {
                                                                                                    'predicateArray' :	[
                                                                                                                            ["id", true]
                                                                                                                        ]
                                                                                                }
                                                                                             )
                                                                    .usingLinq()
                                                                                /**
                                                                                 * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value object itself !
                                                                                 * The syntax for sorting KVPs, here by value object, is ["value.", true]  
                                                                                 * Objects that are required to have implementation of method "toString()" - which by design must return unique value - do implement it !
                                                                                 * Hence, the attempt to sort succeeds !
                                                                                */                                                                    
                                                                                .orderBy(
                                                                                            {
                                                                                                'keyPartSelectorArray' :	[
                                                                                                                                ["value.", true]
                                                                                                                            ]
                                                                                            }
                                                                                        )
                                                                                /**
                                                                                 * In this example this second-level sorting is already not necessary !
                                                                                 * The previous sorting that took place, sorted the data using "the key" called "value.", i.e. unique value !
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



        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> GROUPING -> Key
         * 
         * ✔️
        */    
        var example_where_groupBy = coll_1.usingLinq()
                                                      .groupBy(
                                                                    {
                                                                        'predicateArray' :	[
                                                                                                ["id", true],
                                                                                                [" - ", false],
                                                                                                ["descr", true]
                                                                                            ],

                                                                        'udfEqualityComparer' : udf_commons.udfEqualityComparer
                                                                    }
                                                              )
                                                      /**
                                                       * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value object itself !
                                                       * The syntax for sorting KVPs, here by value object, is ["value.", true]  
                                                       * Objects that are required to have implementation of method "toString()" - which by design must return unique value - do implement it !
                                                       * Hence, the attempt to sort succeeds !
                                                      */                                                                    
                                                      .orderBy(
                                                                    {
                                                                        'keyPartSelectorArray' :	[
                                                                                                        ["key", true]
                                                                                                    ]
                                                                    }
                                                              )
                                                      /**
                                                       * In this example this second-level sorting is already not necessary !
                                                       * The previous sorting that took place, sorted the data using "the key" called "key", i.e. unique value !
                                                       * Moreover, second-level sorting would only allow to sort according to the key again as it is with grouped objects !
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



        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> KVP -> Value
         * 
         * ⚠️ Objects must implement toString() method that returns unique value of the object !
         * 🛑  In this case they lack such method.
        */
        var example_toDictionary_orderBy_Value_invalid = coll_1.usingLinq()
                                                                           .toDictionary(
                                                                                            {
                                                                                                'predicateArray' :	[
                                                                                                                        ["id", true],
                                                                                                                        [" - ", false],
                                                                                                                        ["quality", true]
                                                                                                                    ]
                                                                                            }
                                                                                        )
                                                               .usingLinq()
                                                                           /**
                                                                            * In this example this first-level sorting uses valid syntax for sorting KVPs, here by value object itself !
                                                                            * The syntax for sorting KVPs, here by value object, is ["value.", true]  
                                                                            * But objects that are required to have implementation of method "toString()" - which by design must return unique value - are missing it !
                                                                            * Hence, the attempt to sort fails !
                                                                           */                                                                    
                                                                           .orderBy(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["value.", true]
                                                                                                                        ]
                                                                                        }
                                                                                   )
                                                                           /**
                                                                            * In this example this second-level sorting  - that will never take place - is already not necessary !
                                                                            * The previous sorting failed trying to sort the data using "the key" called "value.", i.e. unique value due to the above requirement for all collection objects to have implementation of "toString()" !
                                                                            * Nevertheless, even if the previous sorting would have been succeeded, further sorting wouldn't make sense !
                                                                           */
                                                                           .thenBy(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["key", true]
                                                                                                                        ]
                                                                                        }
                                                                                  )
                                                                           .toArray();



        /**
         * The following example shows the usage of 1st && 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> PLAIN -> Value
         * 
         * 🛑 Objects of type CIT === PLAIN do not allow sorting by their own value ! 
         * 🛑 Objects must implement toString() method that returns unique value of the object !
         * 🛑 In this case they lack such method. 
        */
        var example_where_orderBy_value = coll_1.usingLinq()
                                                            /**
                                                             * In this example this first-level sorting uses invalid syntax for sorting PLAINs, here by value object itself !
                                                             * The syntax for sorting PLAINs is ["object's property_name", true] || ["object's nested object's property_name", true]
                                                             * Hence, the attempt to sort fails !
                                                            */
                                                            .orderBy(
                                                                        {
                                                                            'keyPartSelectorArray' :	[
                                                                                                            ["value.", true]
                                                                                                        ]
                                                                        }
                                                                    )
                                                            /**
                                                             * In this example this second-level sorting would have never taken place !
                                                             * The previous sorting failed trying to sort the data using "the key" called "value.", i.e. unique value due to the invalid syntax !
                                                             * Hence, the attempt to sort fails !
                                                            */                                                     
                                                            .thenBy(
                                                                        {
                                                                            'keyPartSelectorArray' :	[
                                                                                                            ["quality", true],
                                                                                                             ["-"], // second parameter 'false' is not required as either 'false' or 'undefined' evaluates to something falsy after all
                                                                                                             ["id", true]
                                                                                                        ]
                                                                        }
                                                                   )
                                                            .toArray();




        

        
        var example_where = coll_1.usingLinq()
                                              .where(
                                                        {									
                                                            'predicateArray' :	[
                                                                                    ["id", ">=", 2, true],
                                                                                    ["ne.ne_id", "<", 10, true]
                                                                                ]
                                                        }
                                                    );
        
        var example_where_groupBy = example_where
                                                 .groupBy(
                                                            {
                                                                'predicateArray' :	[
                                                                                        ["id", true],
                                                                                        [" - ", false],
                                                                                        ["descr", true]
                                                                                    ]
                                                            }
                                                         );

        var example_where_groupBy_with_empty_joiner = example_where
                                                                   .groupBy(
                                                                                {
                                                                                    'predicateArray' :	[
                                                                                                            ["id", true],
                                                                                                            ["                ", false],
                                                                                                            ["descr", true]
                                                                                                        ]
                                                                                }
                                                                           )
                                                                   .toArray();
        var example_where_groupBy_with_empty_joiner_yield_on_demand = example_where
                                                                                   .groupBy(
                                                                                                {
                                                                                                    'predicateArray' :	[
                                                                                                                            ["id", true],
                                                                                                                            ["                ", false],
                                                                                                                            ["descr", true]
                                                                                                                        ]
                                                                                                }
                                                                                           );
        // process pre-yielded grouping objects of 'groupBy' query method
        udf_commons.process_GroupBy_result(example_where_groupBy_with_empty_joiner);

        // process on-demand-yielded grouping objects of 'groupBy' query method
        udf_commons.process_GroupBy_result(example_where_groupBy_with_empty_joiner_yield_on_demand, true);



        var example_where_groupBy_array = example_where_groupBy
                                                               .toArray();
        
        var example_where_groupBy_array_2 = example_where
                                                         .groupBy(
                                                                    {
                                                                        'predicateArray' :	[
                                                                                                ["id", true],
                                                                                                [" - ", false],
                                                                                                ["descr", true]
                                                                                            ]
                                                                    }
                                                                 )
                                                         .toArray();
        
        var example_where_take_5 = example_where
                                                .take(
                                                        {
                                                            'count' : 5
                                                        }
                                                     );
        
        var example_where_skip_3 = example_where
                                                .skip(
                                                        {
                                                            'count' : 3
                                                        }
                                                     );
        
        var example_where_take_2 = example_where
                                                .take(
                                                        {
                                                            'count' : 2
                                                        }
                                                     );

        var example_where_take_2_skip_3 = example_where_take_2
                                                              .skip(
                                                                        {
                                                                            'count' : 3
                                                                        }
                                                                   );
        
        
        
        
        var example_where_array = example_where
                                               .toArray();
        
        var example_where_take_5_array = example_where_take_5
                                                             .toArray();

        var example_where_take_5_first_or_default = example_where_take_5
                                                                        .firstOrDefault(
                                                                                            {
                                                                                                'predicateArray' :	[
                                                                                                                        ["id", ">", 1234567890]
                                                                                                                    ]
                                                                                            }
                                                                                       );
        var example_where_take_5_last = example_where_take_5
                                                            .last();
        var example_where_take_5_last_or_default = example_where_take_5
                                                                       .lastOrDefault(
                                                                                        {
                                                                                            'predicateArray' :	[
                                                                                                                    ["id", ">", 7],
                                                                                                                    ["id", "<", 9]
                                                                                                                ]
                                                                                        }
                                                                                     );

        var example_where_take_5_last_or_default_2 = example_where_take_5
                                                                         .lastOrDefault(
                                                                                            {
                                                                                                'predicateArray' :	[
                                                                                                                        ["id", ">", 5],
                                                                                                                        ["id", "<", 7]
                                                                                                                    ]
                                                                                            }
                                                                                       );
        
        // running whole query at once rather than breaking it into partial ones
        var example_where_take_5_last_or_default_3 = coll_1.usingLinq()
                                                                       .where(
                                                                                {
                                                                                    'predicateArray' :	[
                                                                                                            ["id", ">=", 2, true],
                                                                                                            ["ne.ne_id", "<", 10, true]
                                                                                                        ]
                                                                                }
                                                                             )
                                                                       .take(
                                                                                {
                                                                                    'count' : 5
                                                                                }
                                                                            )
                                                                       .lastOrDefault(
                                                                                        {									
                                                                                            'predicateArray' :	[
                                                                                                                    ["id", ">", 5],
                                                                                                                    ["id", "<", 7]
                                                                                                                ]
                                                                                        }
                                                                                     );
        
        
        var example_where_skip_3_array = example_where_skip_3
                                                             .toArray();
        var example_where_skip_3_dictionary = example_where_skip_3
                                                                  .toDictionary(
                                                                                    {
                                                                                        'predicateArray' :	[
                                                                                                                ["id", true],
                                                                                                                [" - ", false],
                                                                                                                ["quality", true]
                                                                                                            ]
                                                                                    }
                                                                               );
        var example_where_skip_3_dictionary_arrayList = example_where_skip_3
                                                                            .toDictionary(
                                                                                            {
                                                                                                'predicateArray' :	[
                                                                                                                        ["id", true],
                                                                                                                        [" - ", false],
                                                                                                                        ["quality", true]
                                                                                                                    ]
                                                                                            }
                                                                                         );
        var example_where_skip_3_groupBy = example_where_skip_3
                                                               .groupBy(
                                                                            {
                                                                                'predicateArray' :	[
                                                                                                        ["id", true],
                                                                                                        [" - ", false],
                                                                                                        ["quality", true]
                                                                                                    ]
                                                                            }
                                                                       )
                                                               .toArray();
        
        var example_where_skip_3_groupBy_3 = coll_1.usingLinq()
                                                               .groupBy(
                                                                            {
                                                                                'predicateArray' :	[
                                                                                                        ["name", true]
                                                                                                    ]
                                                                            }
                                                                       )
                                                               .toArray();
        
        // process pre-yielded grouping objects of 'groupBy' query method
        udf_commons.process_GroupBy_result(example_where_skip_3_groupBy_3);

        
        
        var example_take_2_skip_array = example_where_take_2_skip_3
                                                                   .toArray();
        
        
        var example_where_skip_3_usingLinq_where = example_where_skip_3
                                                                       .toArray()
                                                                       /**
                                                                        * Enable Linq after producing final result with invocation of toArray()
                                                                        * 
                                                                        * Guess why it's the natural and logical way of enabling continuation of Linq in JavaScript 
                                                                       */
                                                                       .usingLinq()
                                                                       .where(
                                                                                {									
                                                                                    'predicateArray' :	[
                                                                                                            ["id", ">=", 2, true],
                                                                                                            ["ne.ne_id", "<", 10, true]
                                                                                                        ]
                                                                                }
                                                                             )
                                                                       .toArray();
        
        var example_where_orderByAscending = coll_1.usingLinq()
                                                               .where(
                                                                        {									
                                                                            'predicateArray' :	[
                                                                                                    ["ne.ne_id", "<", 10, true]
                                                                                                ]
                                                                        }
                                                                     )
                                                               .orderBy(
                                                                            {									
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["name", true]
                                                                                                            ]
                                                                            }
                                                                       )
                                                               .toArray();
        
        var example_where_orderByDescending = coll_1.usingLinq()
                                                                .where(
                                                                            {
                                                                                'predicateArray' :	[
                                                                                                        ["ne.ne_id", "<", 10, true]
                                                                                                    ]
                                                                            }
                                                                      )
                                                                .orderByDescending(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["name", true]
                                                                                                                        ]
                                                                                        }
                                                                                  )
                                                                .toArray();


        

        var new_coll = [
            {id: 11, name : "Object 4", ne : {ne_id : 11, ne_name : "NO 11"}, valid : true, lite : true, descr : "Descr 4", quality : "A"},
            {id: 12, name : "Object 3", ne : {ne_id : 12, ne_name : "NO 12"}, valid : true, lite : true, descr : "Descr 3", quality : "A"}
        ];


        var coll_1_merged = coll_1.usingLinq()
                                              .concat(
                                                        {
                                                            'inputCollection' : new_coll
                                                        }
                                                     )
                                              .toArray();
        
        var coll_1_merged_append = coll_1_merged.usingLinq()
                                                            .append(
                                                                        {
                                                                            'collectionItem' : {id: 13, name : "Object 1", ne : {ne_id : 13, ne_name : "NO 13"}, valid : true, lite : true, descr : "Descr 1", quality : "F"}
                                                                        }
                                                                   )
                                                            .toArray();
        
        var coll_1_merged_append_prepend = coll_1_merged_append.usingLinq()
                                                                          .prepend(
                                                                                        {
                                                                                            'collectionItem' : {id: -1, name : "----", ne : {ne_id : -1, ne_name : "NO -1"}, valid : false, lite : false, descr : "Descr -1", quality : "-"}
                                                                                        }
                                                                                  )
                                                                          .toArray();
    }
}
)();