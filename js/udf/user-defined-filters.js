/**
 * Context-wide available object definig all UDFs (filters) 
*/

var my_custom_jlc_filters = {
    // filter 1 for usage with objects
    myFilter1: function ( min, max, currentObj )
    {
        var obj_id_prop_Value = currentObj[ 'id' ];

        if ( obj_id_prop_Value > min && obj_id_prop_Value < max )
            return true;

        return false;
    },

    // filter 2 for usage with objects
    myFilter2: function ( idValue, currentObj )
    {
        var obj_id_prop_Value = currentObj[ 'id' ];

        if ( obj_id_prop_Value > idValue )
            return true;

        return false;
    },

    // filter 3 for usage with primitives
    myFilter3: function ( anyCollection, currentPrimitiveValue )
    {
        // you can handle 'this' context here privided you binded this function when defining a query
        var someContext = this;

        // you can do something with passed some other collection
        var exists = anyCollection.indexOf( currentPrimitiveValue ) > -1;

        // some examplary logic
        if ( currentPrimitiveValue % 3 === 0 && exists )
            return true;

        return false;
    },

    compareObjAsc: function ( itemCurrent, itemPrevious )
    {
        if ( itemCurrent.id > itemPrevious.id )
            return 1;
        else
            return -1;
    },

    compareObjDesc: function ( itemCurrent, itemPrevious )
    {
        if ( itemCurrent.id > itemPrevious.id )
            return -1;
        else
            return 1;
    },

    // user-defined (group || dictionary) key - nothing extraordinary, just showing the examplary usage !
    udfGroupOrDictKeySelector: function ( currentItem, index_in_collection, collection )
    {
        var primitive_types = [ 'string', 'number', 'boolean' ];

        if ( primitive_types.indexOf( typeof currentItem ) > -1 )
            return currentItem;
        else
            return currentItem[ 'id' ]; // for objects assume that the key is stored in property name called 'id' 
    }
};


window.jlc_filters = window.jlc_filters || my_custom_jlc_filters;