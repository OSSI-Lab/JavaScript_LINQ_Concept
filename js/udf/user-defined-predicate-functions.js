/**
 * Context-wide available object definig all UDFs (predicates) 
*/

var my_custom_jlc_predicates = {
    udfWherePredicate: function(currentObject, collectionIndex) {
        /**
         * Examplary logic
        */

        var id = currentObject["id"];

        return id < 7;
    },

    udfPrimitiveWherePredicate: function(currentPrimitiveValue, collectionIndex) {
        /**
         * Examplary logic
        */
       
        return currentPrimitiveValue < collectionIndex;
    }    
};


window.jlc_predicates = window.jlc_predicates || my_custom_jlc_predicates;