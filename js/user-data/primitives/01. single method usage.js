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




window.goto_Primitives_SingleMethodUsage = window.goto_Primitives_SingleMethodUsage || function() {
    console.log('Primitives - single method usage');
    
    
    var coll_prim_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var coll_prim_2 = [4, 1, 2, 3, 6, 7, 5, 8, 9, 10];


    console.log('~ Primitives - single method usage');
};
}
)();