/**
 * ⚠️ 
 * 📢
 * 
 * Testing things that are common for primitive and object types, or these things that are more difficult to test in JavaScript !
*/


window.testCommonStuff = window.testCommonStuff || function ()
{
    console.log( 'Common stuff' );


    var collection_of_integers = [ 1, 3, 2, 4, 7, 6, 5, 8, 9, 3, 2 ];

    var collection_of_decimals = [ 2.1, 4.4, 5.3, 2.1, 7.8, 4.6, 10.0 ];

    var collection_of_strings = [ "one", "two", "four", "five", "five", "three" ];

    var collection_of_booleans = [ true, false, false, true ];

    var unique_collection = [ 1, 3, 7, 2, 9, 8, 10 ];


    // final query - produces output [example of query method definition caching]
    var where_f1 = collection_of_strings.where(
        {
            'predicateArray': [
                [ "", "==", "two" ]
            ]
        }
    ).where(
        {
            'predicateArray': [
                [ "", "==", "one" ]
            ]
        }
    ).toArray();

    // final query - produces output [example of query method definition caching]
    var where_f2 = collection_of_strings.where(
        {
            'predicateArray': [
                [ "", "<>", "two" ]
            ]
        }
    ).where(
        {
            'predicateArray': [
                [ "", "<>", "one" ]
            ]
        }
    ).toArray();

    // partial query - produces intermediate query state [example of query method definition caching - part 1]
    var where_p3_2 = collection_of_strings.where(
        {
            'predicateArray': [
                [ "", "<!>", "two" ]
            ]
        }
    );
    // partial query - produces intermediate query state [example of query method definition caching - part 2]
    var where_p3_2A = where_p3_2.where(
        {
            'predicateArray': [
                [ "", "<!>", "one" ]
            ]
        }
    );

    // final query - produces output
    var where_p3_2A_f = where_p3_2A.toArray();



    /**
     * At any point you can interact with cache
     *
     * - enable/disable it      ->  System.Linq.Context.Cache.enable(true/false)
     * - clear it               ->  System.Linq.Context.Cache.clear()
     *
    */
    // f.e. turn off the cache
    System.Linq.Context.Cache.enable( false );


    // partial query - produces intermediate query state
    var where_s1_p = collection_of_integers.where(
        {
            'predicateArray': [
                [ "", ">=", 2, true ]
            ]
        }
    );

    // partial query - produces intermediate query state
    var groupBy_p1 = where_s1_p.groupBy(
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

    // final query - produces output
    var groupBy_f1 = groupBy_p1.toArray();

    // final query - produces output
    var toDictionary_f1 = groupBy_p1.toDictionary(
        {
            'predicateArray': [
                [ "key", true ]
            ],
            'udfGroupKeySelector': null,
            'udfEqualityComparer': null,
            'udfGroupResultValueSelector': null
        }
    );

    // final query - produces output
    var toDictionary_f2 = groupBy_f1.toDictionary(
        {
            'predicateArray': [
                [ "key", true ]
            ],
            'udfGroupKeySelector': null,
            'udfEqualityComparer': null,
            'udfGroupResultValueSelector': null
        }
    );

    // final query - produces output
    var firstOrDefault_f1 = collection_of_integers.where(
        {
            'predicateArray': [
                [ "", ">=", 1000, true ]
            ]
        }
    ).firstOrDefault();

    // final query - produces output
    var firstOrDefault_f2 = collection_of_decimals.where(
        {
            'predicateArray': [
                [ "", ">=", 1000.0, true ]
            ]
        }
    ).firstOrDefault();

    // final query - produces output
    var firstOrDefault_f3 = [ false, false ].where(
        {
            'predicateArray': [
                [ "", "==", true ]
            ]
        }
    ).firstOrDefault();

    // final query - produces output
    var firstOrDefault_f4 = collection_of_strings.where(
        {
            'predicateArray': [
                [ "", "==", "Ha ha ha !" ]
            ]
        }
    ).firstOrDefault();

    // final query - produces output
    var firstOrDefault_f5 = [].firstOrDefault(
        {
            'predicateArray': [
                [ "", ">", 7 ]
            ]
        }
    );

    // final query - produces output
    var lastOrDefault_f1 = [].lastOrDefault(
        {
            'predicateArray': [
                [ "", ">", 7 ]
            ]
        }
    );

    // final query - produces output
    var elementAtOrDefault_f1 = [].elementAtOrDefault(
        {
            'index': 200
        }
    );

    // final query - produces output
    var singleOrDefault_f1 = [].singleOrDefault(
        {
            'predicateArray': [
                [ "", ">", 150 ]
            ]
        }
    );



    // final query - produces output [ find the minimum value in a generic sequence ]
    var min_f1 = [].min();

    // final query - produces output [ find the maximum value in a generic sequence ]
    var max_f1 = [].max();

    // final query - produces output [ find the average value in a generic sequence ] - THIS METHOD THROWS EXPECTED ERROR ! -> Provide data for built-in selector 'property': [ 'some property goes here', true ], or custom 'udfValueSelector'.
    //var average_f1 = [].average();



    // The following code was not tested yet !

    /*
    // final query - produces output [ find item with the smallest value of property called 'id' ] - THIS METHOD THROWS EXPECTED ERROR ! -> The sequence has no elements.
    var min_f2 = [].min(
        {
            'property': [ "", true ],
            'udfValueSelector': null
        }
    );

    // final query - produces output [ find item with the smallest value of property called 'id' ] - THIS METHOD THROWS EXPECTED ERROR ! -> The sequence has no elements.
    var max_f2 = [].max(
        {
            'property': [ "", true ],
            'udfValueSelector': null
        }
    );


    // final query - produces output [ find item with the smallest value of property called 'id' ] - THIS METHOD THROWS EXPECTED ERROR ! -> The sequence has no elements.
    var average_f2 = [].average(
        {
            'property': [ "", true ],
            'udfValueSelector': null
        }
    );
    */



    // final query - produces output
    var any_f1 = [].any();

    // final query - produces output - THIS METHOD THROWS EXPECTED ERROR ! -> Query method called 'all' has to have 'params' object provided !
    //var all_f1 = [].all();

    // final query - produces output
    var any_f2 = [].any(
        {
            'predicateArray': [
                [ "", ">", 10 ]
            ]
        }
    );

    // final query - produces output
    var all_f2 = [].all(
        {
            'predicateArray': [
                [ "", "<", 10 ]
            ]
        }
    );


    // final query - produces output
    var defaultIfEmpty = [].defaultIfEmpty(
        {
            'fallbackOnDefault': {
                yes: true, // return default value provided by the user if collection is empty

                udv: Number.MIN_VALUE // user default value (udv)
            }
        }
    );

    // final query - produces output
    var defaultIfEmpty2 = [].defaultIfEmpty(
        {
            'fallbackOnDefault': {
                yes: false, // return default value provided by the user if collection is empty
            }
        }
    );


    console.log( '~ Common stuff' );
    // CODE WAS TESTED UNTIL HERE !
    debugger;
};