(function () {
    window.testing = window.testing || function() {
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
        
        var coll_toString = [
            {id: 1, name : "False software engineer", descr : "Earning a lot, learning nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 2, name : "False software developer", descr : "Earning quite a lot, playing new computer games !", quality : "F", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 3, name : "False software architect", descr : "Earning huge money, creating huge stupidity!", quality : "E", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 4, name : "False adolescent immature the rest ", descr : "Knowing nothing, learning nothing, being nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }}
        ];

        var example_toDictionary = coll_toString.usingLinq()
                                                            .toDictionary(
                                                                            {
                                                                                'predicateArray' :	[
                                                                                                        ["id", true]
                                                                                                    ]
                                                                            }
                                                                         );



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
    }
})();