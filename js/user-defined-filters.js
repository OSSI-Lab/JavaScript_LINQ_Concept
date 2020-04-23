// context-wide available object
var my_custom_jlc_filters = {
    // filter 1 for usage with objects
    myFilter1 : function(min, max, currentObj) {
        var obj_id_prop_Value = currentObj['id'];

        if(obj_id_prop_Value > min && obj_id_prop_Value < max)
            return true;

        return false;
    },

    // filter 2 for usage with objects
    myFilter2 : function(idValue, currentObj) {
        var obj_id_prop_Value = currentObj['id'];

        if(obj_id_prop_Value > idValue)
            return true;

        return false;
    },

    // filter 3 for usage with primitives
    myFilter3 : function(anyCollection, currentPrimitiveValue) {
        // you can handle 'this' context here privided you binded this function when defining a query
        var someContext = this;

        // you can do something with passed some other collection
        var exists = anyCollection.indexOf(currentPrimitiveValue) > -1;

        // some examplary logic
        if(currentPrimitiveValue % 3 === 0 && exists)
            return true;

        return false;
    },

    compareObjAsc : function(itemCurrent, itemPrevious) {
        if(itemCurrent.id > itemPrevious.id)
            return 1;
        else
            return -1;
    },

    compareObjDesc : function(itemCurrent, itemPrevious) {
        if(itemCurrent.id > itemPrevious.id)
            return -1;
        else
            return 1;
    }
};


window.jlc_filters = window.jlc_filters || my_custom_jlc_filters;