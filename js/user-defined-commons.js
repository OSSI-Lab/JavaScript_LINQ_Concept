// context-wide available object
var my_custom_jlc_common = {
    process_GroupBy_result : function (groupBy_result_object, yieldOnDemand) {
        if(yieldOnDemand)
            groupBy_result_object = groupBy_result_object.toArray();

        for(var i = 0, length = groupBy_result_object.length; i < length; i++) {
            // access grouping object
            var grouping = groupBy_result_object[i];

            // get the key
            var key = grouping.key;

            // get array of values ON DEMAND !!!! (right here, right now)
            var values = grouping.resultsView;

            // do other stuff...
        }
    }
};

window.udf_commons = window.udf_commons || my_custom_jlc_common;