(function () {
    window.goto_Objects_SortingRelationshipUsage = window.goto_Objects_SortingRelationshipUsage || function() {
        console.log('Objects - sorting relationship');


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


        // 1. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 1
        var example_partial_1st_2nd_part1 = coll_1.usingLinq()
                                                              .orderBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["name", true]
                                                                                                            ]
                                                                            }
                                                                      );
        // 1. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 2
        var example_partial_1st_2nd_part2 = example_partial_1st_2nd_part1
                                                              .thenBy(
                                                                        {
                                                                            'keyPartSelectorArray' :	[
                                                                                                            ["quality", true],
                                                                                                            ["-"], // second parameter 'false' is not required as either 'false' or 'undefined' evaluates to something falsy after all
                                                                                                            ["id", true]
                                                                                                        ]
                                                                        }
                                                                     );
        // 1. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 3
        example_partial_1st_2nd_part2 = example_partial_1st_2nd_part2.toArray();



        // 2. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 1
        var example_2_partial_1st_2nd_part1 = coll_1.usingLinq()
                                                                .orderBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["name", true]
                                                                                                            ]
                                                                            }
                                                                        );

        // new query flow doesn't affect the partial query sorting involving 1st and 2nd sorting operations and the relationship between them !
        var example_between_1_and_2 = coll_1.usingLinq()
                                                        .take(4);

        // 2. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 2
        var example_2_partial_1st_2nd_part2 = example_2_partial_1st_2nd_part1
                                                                .thenBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["quality", true],
                                                                                                                ["-"], // second parameter 'false' is not required as either 'false' or 'undefined' evaluates to something falsy after all
                                                                                                                ["id", true]
                                                                                                            ]
                                                                            }
                                                                       );
         // 2. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 3
        example_2_partial_1st_2nd_part2 = example_2_partial_1st_2nd_part2.toArray();



        /**
         * ⚠️
         * The following two examples will throw an error due to the violation of sorting rules that involve 1st & 2nd sorting operations and the relationship between them !
         * 
         * -  🛑 example 3. shows the "injection" of 'take' query method between 'orderBy' and 'thenBy' which causes the error !
         * 
         * -  example 4. is splitted into two partial queries:
         *     ✔️ - part 1 marks that 'orderBy' will be used to sort the data in the first place
         *     🛑 - part 2 marks that 'thenBy' will be used to sort the data in the second place, but it is preceded by 'take' query method which causes the error !
         * 
         * Comment out these two queries - 3. & 4. - to proceed with other examples !
        */
/*
        // 3. sorting involving 1st & 2nd sorting operations and the relationship between them - whole query
        var example_3_partial_1st_2nd_part1 = coll_1.usingLinq()
                                                                .orderBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["name", true]
                                                                                                            ]
                                                                            }
                                                                        )
                                                                
                                                                // any non-sorting operations always reset the 1st level sorting regardless of whether such 1st level sorting took place or not
                                                                .take(4)
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



        // 4. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 1
        var example_4_partial_1st_2nd_part1 = coll_1.usingLinq()
                                                                .orderBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["name", true]
                                                                                                            ]
                                                                            }
                                                                        );
        // 4. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 2
        var example_4_partial_1st_2nd_part2 = example_4_partial_1st_2nd_part1
                                                                             // any non-sorting operations always reset the 1st level sorting regardless of whether such 1st level sorting took place or not
                                                                             .take(4)
                                                                             .thenBy(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["quality", true],
                                                                                                                            ["-"], // second parameter 'false' is not required as either 'false' or 'undefined' evaluates to something falsy after all
                                                                                                                            ["id", true]
                                                                                                                        ]
                                                                                        }
                                                                                    );
        // 4. partial sorting involving 1st & 2nd sorting operations and the relationship between them - part 3
        example_4_partial_1st_2nd_part2 = example_4_partial_1st_2nd_part2.toArray();
*/


        // 5. the classic example  - sorting collection in ASC way
        var example_where_orderByAscending = coll_1.usingLinq()
                                                               .orderBy(
                                                                            {
                                                                                'keyPartSelectorArray' :	[
                                                                                                                ["id", true]
                                                                                                            ]
                                                                            }
                                                                       )
                                                               .toArray();



        // 6. the classic example  - sorting collection in DESC way
        var example_where_orderByDescending = coll_1.usingLinq()
                                                                .orderByDescending(
                                                                                        {
                                                                                            'keyPartSelectorArray' :	[
                                                                                                                            ["id", true]
                                                                                                                        ]
                                                                                        }
                                                                                  )
                                                                .toArray();



        /**
         * 7. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them (classic example)!
         * 
         * CIT -> PLAIN
         * 
         * ✔️
        */
        var example_where_orderByDescending_thenBy_1 = coll_1.usingLinq()
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
         * 8. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them !
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
         * 9. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them !
         * 
         * CIT -> KVP -> Value
         * 
         * ⚠️ Objects must implement toString() method that returns unique value of the object !
         * ✔️ In this case they do have such method.
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
         * 10. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them !
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
         * 11. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them !
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
         * 12. The following example shows the usage of 1st & 2nd level sorting operations and the reationship between them !
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


        console.log('~ Objects - sorting relationship');
    }
}
)();