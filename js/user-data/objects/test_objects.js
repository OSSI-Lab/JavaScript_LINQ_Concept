( function ()
{
    window.testObjects = window.testObjects || function ()
    {
        console.log( 'Objects' );

        var collection = [
            {
                id: 2,
                name: "Product 2",
                img: 'image 2',
                price: 2.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 2, name: "Order of Product 2", item: { size: 2, discount: 10} }
            },
            {
                id: 3,
                name: "Product 3",
                img: 'image 3',
                price: 3.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 3, name: "Order of Product 3", item: { size: 3, discount: 10} }
            },
            {
                id: 1,
                name: "Product 1",
                img: 'image 1',
                price: 1.99,
                onsale: 0.0,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 1, name: "Order of Product 1", item: { size: 1, discount: 10} }
            },
            {
                id: 9,
                name: "Product 9",
                img: 'image 9',
                price: 4,
                onsale: 3,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 9, name: "Order of Product 5", item: { size: 9, discount: 10} }
            },
            {
                id: 4,
                name: "Product 4",
                img: 'image 4',
                price: 4,
                onsale: 3,
                tags: "Leash",
                description: "A fresh taste on a collar,",
                order: { id: 4, name: "Order of Product 4", item: { size: 4, discount: 10} }
            },
            {
                id: 5,
                name: "Product 5",
                img: 'image 5',
                price: 1.99,
                onsale: 2,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 5, name: "Order of Product 5", item: { size: 5, discount: 10} }
            },
            {
                id: 6,
                name: "Product 6",
                img: 'image 6',
                price: 2.99,
                onsale: 0.0,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 6, name: "Order of Product 5", item: { size: 5, discount: 10} }
            },
            {
                id: 7,
                name: "Product 7",
                img: 'image 3',
                price: 3.99,
                onsale: 3.0,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: null
            },
            {
                id: 8,
                name: "Product 8",
                img: 'image 8',
                price: 4,
                onsale: 3,
                tags: "Tag 5",
                description: "A fresh taste on a collar,"
            },
            {
                id: 10,
                name: "Product 10",
                img: 'image 10',
                price: 1.99,
                onsale: 2,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 10, name: "Order of Product 10", item: { size: 10, discount: 10} }
            },
            {
                id: 10,
                name: "Product 10",
                img: 'image 10',
                price: 1.99,
                onsale: 2,
                tags: "Tag 5",
                description: "A fresh taste on a collar,",
                order: { id: 10, name: "Order of Product 10", item: { size: 10, discount: 10} }
            }
        ];

        var collection_toString = [
            { id: 1, name: "False software engineer", descr: "Earning a lot, learning nothing !", quality: "D", toString () { return "#" + this.id + "-" + this.descr + "-" + this.quality; } },
            { id: 2, name: "False software developer", descr: "Earning quite a lot, playing new computer games !", quality: "F", toString () { return "#" + this.id + "-" + this.descr + "-" + this.quality; } },
            { id: 3, name: "False software architect", descr: "Earning huge money, creating huge stupidity!", quality: "E", toString () { return "#" + this.id + "-" + this.descr + "-" + this.quality; } },
            { id: 4, name: "False adolescent immature the rest ", descr: "Knowing nothing, learning nothing, being nothing !", quality: "D", toString () { return "#" + this.id + "-" + this.descr + "-" + this.quality; } }
        ];



        // final query - produces output
        var where_f1 = collection.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.id", "<", 10, true ]
                ]
            }
        ).toArray();

        // final query - produces output
        var groupBy_f1 = collection.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupProjector': null,
                'udfGroupElementsProjector': null,
                'udfGroupResultValueSelector': null,

            }
        ).toArray();

        // partial query - produces intermediate query state
        var where_p1 = collection.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.id", "<", 10, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var groupBy_p1 = collection.groupBy(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "tags", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': udf_commons.udfEqualityComparer,
                'udfGroupProjector': null,
                'udfGroupElementsProjector': null,
                'udfGroupResultValueSelector': null,

            }
        );

        // partial query - produces intermediate query state
        var where_p2 = collection_toString.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var where_p1_takeWhile_p1 = where_p1.takeWhile(
            {
                'predicateArray': [
                    [ "id", "<", 7 ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var where_p2_skipWhile_p1 = where_p2.skipWhile(
            {
                'predicateArray': [
                    [ "id", "<", 4 ]
                ]
            }
        );

        // final query - produces output
        var where_f2 = collection.where(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "order.id", "<", 10, true ]
                ]
            }
        ).toArray();




        // when you're done with all querying regarding some collections, you can tidy them up by removing some internally generated stuff
        System.Linq.Context.tidyUp( collection, collection_toString );



        // final query - produces output
        var concat_f1 = collection.concatenate(
            {
                'collectionOrItem':
                    [
                        {
                            id: 11,
                            name: "Product 11",
                            img: 'image 11',
                            price: 1.99,
                            onsale: 0.0,
                            tags: "Leash",
                            description: "A fresh taste on a collar,",
                            order: { id: 11, name: "Order of Product 11" }
                        },
                        {
                            id: 12,
                            name: "Product 12",
                            img: 'image 12',
                            price: 2.99,
                            onsale: 0.0,
                            tags: "Leash",
                            description: "A fresh taste on a collar,",
                            order: { id: 12, name: "Order of Product 12" }
                        }
                    ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var concat_p1 = collection.concatenate(
            {
                'collectionOrItem':
                    [
                        {
                            id: 11,
                            name: "Product 11",
                            img: 'image 11',
                            price: 1.99,
                            onsale: 0.0,
                            tags: "Leash",
                            description: "A fresh taste on a collar,",
                            order: { id: 11, name: "Order of Product 11" }
                        },
                        {
                            id: 12,
                            name: "Product 12",
                            img: 'image 12',
                            price: 2.99,
                            onsale: 0.0,
                            tags: "Leash",
                            description: "A fresh taste on a collar,",
                            order: { id: 12, name: "Order of Product 12" }
                        }
                    ]
            }
        );

        // final query - produces output
        var append_f1 = collection.append(
            {
                'collectionOrItem':
                {
                    id: 11,
                    name: "Product 11",
                    img: 'image 11',
                    price: 1.99,
                    onsale: 0.0,
                    tags: "Leash",
                    description: "A fresh taste on a collar,",
                    order: { id: 11, name: "Order of Product 11" }
                }
            }
        ).toArray();


        // partial query - produces intermediate query state
        var append_p1 = collection.append(
            {
                'collectionOrItem':
                {
                    id: 11,
                    name: "Product 11",
                    img: 'image 11',
                    price: 1.99,
                    onsale: 0.0,
                    tags: "Leash",
                    description: "A fresh taste on a collar,",
                    order: { id: 11, name: "Order of Product 11" }
                }
            }
        );

        // final query - produces output
        var prepend_f1 = collection.prepend(
            {
                'collectionOrItem':
                {
                    id: -1,
                    name: "Product -1",
                    img: 'image -1',
                    price: 1.99,
                    onsale: 0.0,
                    tags: "Leash",
                    description: "A fresh taste on a collar,",
                    order: { id: -1, name: "Order of Product -1" }
                }
            }
        ).toArray();

        // partial query - produces intermediate query state
        var prepend_p1 = collection.prepend(
            {
                'collectionOrItem':
                {
                    id: -1,
                    name: "Product -1",
                    img: 'image -1',
                    price: 1.99,
                    onsale: 0.0,
                    tags: "Leash",
                    description: "A fresh taste on a collar,",
                    order: { id: -1, name: "Order of Product -1" }
                }
            }
        );

        // final query - produces output
        var contains_f1 = collection.contains(
            {
                'collectionOrItem':
                {
                    id: -1,
                    name: "Product -1",
                    img: 'image -1',
                    price: 1.99,
                    onsale: 0.0,
                    tags: "Leash",
                    description: "A fresh taste on a collar,",
                    order: { id: -1, name: "Order of Product -1" }
                },
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        );

        // final query - produces output
        var contains_f2 = collection.contains(
            {
                'collectionOrItem':
                {
                    id: 7,
                    name: "Product 7",
                    img: 'image 3',
                    price: 3.99,
                    onsale: 3.0,
                    tags: "Tag 5",
                    description: "A fresh taste on a collar,",
                    order: null
                },
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        );

        // final query - produces output
        var contains_f3 = collection.contains(
            {
                'collectionOrItem':
                {
                    id: 5,
                    name: "Product 5",
                    img: 'image 5',
                    price: 1.99,
                    onsale: 2,
                    tags: "Tag 5",
                    description: "A fresh taste on a collar,",
                    order: { id: 5, name: "Order of Product 5" }
                },
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        );

        // final query - produces output
        var contains_f4 = collection.contains(
            {
                'collectionOrItem':
                {
                    id: 5,
                    name: "Product 5",
                    img: 'image 5',
                    price: 1.99,
                    onsale: 2,
                    tags: "Tag 5",
                    description: "A fresh taste on a collar,",
                    order: { id: 5, name: "Order of Product 5," }
                },
                'udfEqualityComparer': null,
                'strongSearch': true
            }
        );

        // partial query - produces intermediate query state
        var distinct_p1 = collection.distinct(
            {
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var distinct_f1 = collection.distinct(
            {
                'udfEqualityComparer': null
            }
        ).toArray();

        // final query - produces output
        var except_f1 = collection.except(
            {
                'collectionOrItem':
                {
                    id: 7,
                    name: "Product 7",
                    img: 'image 3',
                    price: 3.99,
                    onsale: 3.0,
                    tags: "Tag 5",
                    description: "A fresh taste on a collar,",
                    order: null
                },
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        ).toArray();

        // partial query - produces intermediate query state
        var except_p1 = collection.except(
            {
                'collectionOrItem':
                {
                    id: 7,
                    name: "Product 7",
                    img: 'image 3',
                    price: 3.99,
                    onsale: 3.0,
                    tags: "Tag 5",
                    description: "A fresh taste on a collar,",
                    order: null
                },
                'udfEqualityComparer': null,
                'strongSearch': false
            }
        );

        // final query - produces output
        var skip_f1 = collection.skip(
            {
                'count': 2
            }
        ).toArray();

        // final query - produces output
        var skipWhile_f1 = collection.skipWhile(
            {
                'predicateArray': [
                    [ "id", "<", 7 ]
                ]
            }
        ).toArray();

        // final query - produces output
        var take_f1 = collection.take(
            {
                'count': 2
            }
        ).toArray();

        // final query - produces output
        var takeWhile_f1 = collection.takeWhile(
            {
                'predicateArray': [
                    [ "id", "<", 7 ]
                ]
            }
        ).toArray();

        // partial query - produces intermediate query state
        var skip_p1 = collection.skip(
            {
                'count': 2
            }
        );

        // partial query - produces intermediate query state
        var skipWhile_p1 = collection.skipWhile(
            {
                'predicateArray': [
                    [ "id", "<", 7 ]
                ]
            }
        );

        // partial query - produces intermediate query state
        var take_p1 = collection.take(
            {
                'count': 2
            }
        );

        // partial query - produces intermediate query state
        var takeWhile_p1 = collection.takeWhile(
            {
                'predicateArray': [
                    [ "id", "<", 7 ]
                ]
            }
        );

        // final query - produces output
        var orderBy_f1 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var orderByDescending_f1 = collection.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var thenBy_f1 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "name", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // final query - produces output
        var thenByDescending_f1 = collection.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "name", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var orderBy_p1 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var orderByDescending_p1 = collection.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var thenBy_p1 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "name", true ]
                ],
                'udfComparer': null
            }
        );

        // partial query - produces intermediate query state
        var thenByDescending_p1 = collection.orderByDescending(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).thenByDescending(
            {
                'keyPartSelectorArray': [
                    [ "name", true ]
                ],
                'udfComparer': null
            }
        );


        // partial query - produces intermediate query state
        var orderBy_p2 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "price", true ]
                ],
                'udfComparer': null
            }
        );
        // partial query - produces intermediate query state
        var thenBy_p2 = orderBy_p2.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        );

        // final query - produces output
        var toArray_f1 = collection.toArray();


        // final query - produces output
        var toDictionary_f1 = collection.toDictionary(
            {
                'predicateArray': [
                    [ "id", true ],
                    [ " - ", false ],
                    [ "img", true ]
                ],
                'udfGroupKeySelector': null,
                'udfEqualityComparer': null,
                'udfGroupResultValueSelector': null,

            }
        );

        // final query - produces output
        var defaultIfEmpty_f1 = collection.defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: true, // return default value provided by the user if collection is empty

                    udv: Object.create( null ) // user default value (udv)
                }
            }
        );

        // final query - produces output
        var defaultIfEmpty_f2 = [].defaultIfEmpty(
            {
                'fallbackOnDefault': {
                    yes: true, // return default value provided by the user if collection is empty

                    udv: Object.create( null, { 'message': { value: 'Empty colection !' } } ) // user default value (udv) must be anything valid in JavaScript
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
        var reverse_f1 = collection.reverseAllOrSubset();

        // final query - produces output
        var reverse_f2 = collection.reverseAllOrSubset(
            {
                'index': 4,
                'count': 4
            }
        );

        // final query - produces output
        var select_f1 = collection.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                     ["order", true]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f1 = collection.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    ["order", true]
                ],
                // define library UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var select_f2 = collection.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                     ["order.item.size", true]
                ],
                // define inline UDF selector
                'udfSelector': null,
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        /*
        // final query - produces output    -> throws Error because 'order.item.size' is not iterable   -> error message = 'Selected property [ order.item.size ] is not iterable in the context of "selectMany" !'
        var selectMany_f2 = collection.selectMany(
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
        var select_f3 = collection.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    ["id", true], ["name", true], ["img", true], ["order", true]
                ],
                // define inline UDF selector
                'udfSelector': function(item, selectors, index) {
                    /**
                     * Provide the logic valid for your cases !
                     * 
                     * This is only exemplary implementation logic.
                    */

                    // declare select result object
                    var result = Object.create(null);

                    /**
                     * Select all required props
                    */
                    result.id = item['id'];
                    result.name = item['name'];
                    result.img = item['img'];
                    result.order = item['order'];

                    // if original positional index in the collection is required, add it
                    if(index !== undefined)
                        result.collectionPositionalIndex = index;

                    // return select result object
                    return result;
                },
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // final query - produces output
        var selectMany_f3 = collection.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    ["id", true], ["name", true], ["img", true], ["order", true]
                ],
                // define library UDF selector
                'udfSelector': udf_commons.udfSelector,
                'udfResultSelector': null, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        ).toArray();

        // partial query - produces intermediate query state
        var select_p1 = collection.select(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */
                'selectorArray': [
                    ["id", true], ["name", true], ["img", true], ["order", true]
                ],
                // define inline UDF selector
                'udfSelector': function(item, selectors, index) {
                    /**
                     * Provide the logic valid for your cases !
                     * 
                     * This is only exemplary implementation logic.
                    */

                    // declare select result object
                    var result = Object.create(null);

                    /**
                     * Select all required props
                    */
                    result.id = item['id'];
                    result.name = item['name'];
                    result.img = item['img'];
                    result.order = item['order'];

                    // if original positional index in the collection is required, add it
                    if(index !== undefined)
                        result.collectionPositionalIndex = index;

                    // return select result object
                    return result;
                },
                'udfResultSelector': null, // 'select' does not require UDF results selector !
                'incorporateIndex': true
            }
        );

        // partial query - produces intermediate query state
        var selectMany_p1 = collection.selectMany(
            {
                /**
                 * Selecting multiple properties requires providing custom UDF selector.
                 * 
                 * Selecting single property invokes library internal LDF selector, leaving custom UDF selector to be null ! 
                */

                'selectorArray': [
                    ["id", true], ["name", true], ["img", true], ["order", true]
                ],
                // define library UDF selector
                'udfSelector': udf_commons.udfSelector,
                'udfResultSelector': udf_commons.udfResultSelector, // 'selectMany' allows for optional UDF results selector !
                'incorporateIndex': true
            }
        );

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
        var join_f1 = collection.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var join_p1 = collection.innerJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var leftJoin_f1 = collection.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var leftJoin_p1 = collection.leftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupJoin_f1 = collection.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupJoin_p1 = collection.groupJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // final query - produces output
        var groupLeftJoin_f1 = collection.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        ).toArray();

        // partial query - produces intermediate query state
        var groupLeftJoin_p1 = collection.groupLeftJoin(
            {
                'innerColl': innerColl,
                'outerSelectorArray': [
                    ["id", true]
                ],
                'outerUdfSelector': null,
                'innerSelectorArray': [
                    ["id", true]
                ],
                'innerUdfSelector': null,
                'udfResultSelector': null,
                'udfEqualityComparer': null
            }
        );

        // CODE WAS TESTED UNTIL HERE !
        debugger;




        var elementAt = collection.elementAt(
            {
                'index': 2
            }
        );

        var elementAtOrDefault = collection.elementAtOrDefault(
            {
                'index': 2
            }
        );

        var first = collection.first(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var firstOrDefault = collection.firstOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var last = collection.last(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var lastOrDefault = collection.lastOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var single = collection.single(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var singleOrDefault = collection.singleOrDefault(
            {
                'predicateArray': [
                    [ "id", ">", 7 ]
                ]
            }
        );

        var min = collection.min(
            {
                'property': 'id',
                'udfValueSelector': null
            }
        );

        var max = collection.max(
            {
                'property': 'id',
                'udfValueSelector': null
            }
        );

        var average = collection.average(
            {
                'property': 'id',
                'udfValueSelector': null
            }
        );

        var any = collection.any(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "id", "<", 10, true ]
                ]
            }
        );

        var all = collection.all(
            {
                'predicateArray': [
                    [ "id", ">=", 2, true ],
                    [ "id", "<", 10, true ]
                ]
            }
        );


        // partial query - produces intermediate query state
        var orderBy_p3 = collection.orderBy(
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
        var orderBy_p3_take_p1_thenBy_p1 = orderBy_p3_take_p1.thenBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        );
        // final query - produces output
        var orderBy_p3_take_p1_thenBy_p1_toArray_f1 = orderBy_p3_take_p1_thenBy_p1.toArray();


        // final query - produces output
        var orderBy_take_thenBy_toArray_f1 = collection.orderBy(
            {
                'keyPartSelectorArray': [
                    [ "id", true ]
                ],
                'udfComparer': null
            }
        ).take(
            {
                'count': 2
            }
        ).thenBy(
            {
                'keyPartSelectorArray': [
                    [ "name", true ]
                ],
                'udfComparer': null
            }
        ).toArray();

        console.log( '~ Objects' );
    };
} )();