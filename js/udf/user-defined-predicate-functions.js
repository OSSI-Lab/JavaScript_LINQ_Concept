/**
 * Context-wide available object definig all UDFs (predicates) 
*/

var my_custom_jlc_predicates = {
    udfWherePredicate: function(currentObject, collectionIndex) {
        var id = currentObject["id"];

        return id < 7;
    }
};


window.jlc_predicates = window.jlc_predicates || my_custom_jlc_predicates;