// context-wide available object
var my_custom_jlc_common = {
    // user-defined groupBy result data processor
    process_GroupBy_result: function ( groupBy_result_object, yieldOnDemand )
    {
        if ( yieldOnDemand )
            groupBy_result_object = groupBy_result_object.toArray();

        for ( var i = 0, length = groupBy_result_object.length; i < length; i++ )
        {
            // access grouping object
            var grouping = groupBy_result_object[ i ];

            // get the key
            var key = grouping.key;

            // get array of values ON DEMAND !!!! (right here, right now)
            var values = grouping.resultsView;

            // do other stuff...
        }
    },

    // user-defined equality comparator
    udfEqualityComparer: function ( kC, kP )
    {
        /**
         * Reference this context, here being the sortMetaObject storing all relevant metadata about type of sorting operation
         * 
         *  this.sortMetaObject         -> sortMetaObject
         *  this.selectors              -> selectors
         *  this.isAscOtherwiseDesc     -> isAscOtherwiseDesc
        */
        var sortMetaObject = this.sortMetaObject;
        var selectors = this.selectors;
        var isAscOtherwiseDesc = this.isAscOtherwiseDesc;

        // compare strings
        if ( typeof kC === 'string' )
        {
            // sort in ascending order
            if(isAscOtherwiseDesc) {
                if ( kC > kP ) return 1;
                else if ( kC < kP ) return -1;
                else return 0;
            }

            // otherwise sort in descending order
            if ( kC > kP ) return -1;
            else if ( kC < kP ) return 1;
            else return 0;
        }
        // compare numbers
        else if ( typeof kC === 'number' )
        {
            // sort in ascending order
            if(isAscOtherwiseDesc) {
                if ( kC > kP ) return 1;
                else if ( kC < kP ) return -1;
                else return 0;
            }

            // otherwise sort in descending order
            if ( kC > kP ) return -1;
            else if ( kC < kP ) return 1;
            else return 0;
        }
        // compare booleans
        else if ( typeof kC === 'boolean' )
        {
            // sort in ascending order
            if(isAscOtherwiseDesc) {
                if ( kC === true && kP === false ) return 1;
                else if ( kC === false && kP === true ) return -1;
                else return 0;
            }

            // otherwise sort in descending order
            if ( kC === true && kP === false ) return -1;
            else if ( kC === false && kP === true ) return 1;
            else return 0;
        }
        // compare booleans
        else if ( typeof kC === 'object' )
        {
            if ( selectors )
            {
                //extract property -  nothing extraordinary, just showing the examplary usage !
                var property = selectors[ 0 ][ 0 ];

                /**
                 * Read values from both objects
                */
                kC = kC[ property ];
                kP = kP[ property ];
            }


            /**
             * Compare both values
            */

            // sort in ascending order
            if(isAscOtherwiseDesc) {
                if ( kC > kP ) return 1;
                else if ( kC < kP ) return -1;
                else return 0;
            }

            // otherwise sort in descending order
            if ( kC > kP ) return -1;
            else if ( kC < kP ) return 1;
            else return 0;
        }
    },

    /**
     * Objects !
    */

    udfDefaultObjectContentComparer: function ( obj1, obj2 )
    {
        /**
         * Define logic of your custom object content comparer to compare the content of two objects.
         * 
         * The required value to return is true/false
        */

        var haveTheSameContent = use_DOCC_C_I_1L( obj1, obj2 );


        return haveTheSameContent;



        /**
         * Local helper methods
        */
        function use_DOCC_C_I_1L ( obj1, obj2 )
        {
            // are two objects equal
            var match_found = false;


            // both objects are null or undefined, hence considered to be equal
            if ( !obj1 && !obj2 )
            {
                // match found
                match_found = true;

                // return match result
                return match_found;
            }


            // get all props if object non-empty
            var propNames_1 = Object.getOwnPropertyNames( obj1 || Object.create( null ) );
            var propNames_2 = Object.getOwnPropertyNames( obj2 || Object.create( null ) );

            // if the number of props are different
            if ( propNames_1.length !== propNames_2.length ) return match_found;

            // sort property names natively
            propNames_1.sort();
            propNames_2.sort();

            // compare object's property name vs object's property name
            for ( var i = 0; i < propNames_1.length; i++ )
                if ( propNames_1[ i ] !== propNames_2[ i ] ) return match_found;

            // compare current level values of these two object
            for ( var i = 0; i < propNames_1.length; i++ )
            {
                // get two values to compare
                var o1_v = obj1[ propNames_1[ i ] ];
                var o2_v = obj2[ propNames_2[ i ] ];

                // if both types are different
                if ( typeof o1_v !== typeof o2_v ) return match_found;

                // check if both values are primitive
                var v_prim = is_PT_I_2L( o1_v || o2_v );

                // if are primitive and not equal
                if ( v_prim && o1_v !== o2_v ) return match_found;
                // if are objects
                else if ( !v_prim )
                {
                    // check these two nested objects recursively
                    match_found = use_DOCC_C_I_1L( o1_v, o2_v );

                    // if inequality found, break the comparison
                    if ( !match_found ) return match_found;
                }
            }


            /**
             *
             * Otherwise all props are of the same type and have the same values, i.e. both objects are equal
            */
            // match found
            match_found = true;

            // return match result
            return match_found;



            /**
             * Local helper functions
            */
            function is_PT_I_2L ( o )
            {
                return [ 'string', 'number', 'boolean' ].indexOf( typeof o ) > -1;
            }
        }
    },

    udfObjectGroupKeySelector: function ( coll_item )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        /**
         * Define array holding grouping or sorting logic key.
         * 
         * Each key part object must conform to this shape.
         *      {
         *          value: "some value",
         *          isValidProperty: true/false,
         *          isComplex: true/false
         *      }
        */
        var key = [];

        /**
         * User-defined hard-coded key selector array.
         * 
         * You have at your disposal current collection item being grouped to extract keySelectorArray.
        */
        var keySelectorArray = [
            [ "id", true ],
            [ " - ", false ],
            [ "tags", true ]
        ];

        // loop over all key selectors
        for ( var i = 0; i < keySelectorArray.length; i++ )
        {
            // access the current key selector component
            var ksc = keySelectorArray[ i ];

            // get the component value
            var c_v = ksc[ 0 ];

            // is this a real property of the object
            var is = ksc[ 1 ];

            // store object representing part of the key
            key.push( { value: c_v, isValidProperty: is, isComplex: c_v.indexOf( '.' ) > 0 } );
        }

        // return array holding grouping or sorting logic key
        return key;
    },

    udfObjectGroupKeyProjector: function ( keyValue )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        /**
         * Do some logic with grouping key !
         * 
         * Exemplary logic here !
        */
        return keyValue;
    },

    udfObjectGroupElementSelector: function ( coll_item )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        /**
         * Do some logic with group item - f.e. provide a new shape of this item !
         * 
         * Exemplary logic here !
        */

        // declare output object
        var newShape = Object.create( null );

        newShape.createdAt = Date.now;
        newShape.value = coll_item;

        // return output object
        return newShape;
    },

    udfObjectGroupResultValueSelector: function ( groupKey, groupItems, isDictionary )
    {
        /**
         * Do some logic with grouping key (groupKey) and all item falling into this group (groupItems) - f.e. provide a new object consisting of some math calculations !
         * 
         * Exemplary logic here !
        */

        // declare output object
        var newShape = Object.create( null );

        newShape.key = groupKey;

        // dictionary has to always be a dictionary, i.e. KVP object {key: some_key, value: some_value}
        if ( isDictionary )
        {
            // create value object
            var value = Object.create( null );

            value.groupHasAnyItems = hasAnyItems_I_1L( groupItems );
            value.groupHasUniqueItems = hasUniqueItems_I_1L( groupItems );
            value.price = extractValueObjectProperty_I_1L( groupItems );

            // assign value object to value property of KVP
            newShape.value = value;
        }
        else
        {
            newShape.groupHasAnyItems = hasAnyItems_I_1L( groupItems );
            newShape.groupHasUniqueItems = hasUniqueItems_I_1L( groupItems );
        }

        // return output object
        return newShape;



        /**
         * Local helper functions
        */
        function hasAnyItems_I_1L ( group )
        {
            /**
             * Exemplary logic here !
            */
            return true;
        }

        function hasUniqueItems_I_1L ( group )
        {
            /**
             * Exemplary logic here !
            */
            return true;
        }

        function extractValueObjectProperty_I_1L ( valueObject )
        {
            /**
             * Exemplary logic here !
            */
            return valueObject.price;
        }
    },

    udfSelector: function ( item, selectors, index )
    {
        /**
         * Provide the logic valid for your cases !
         * 
         * This is only exemplary implementation logic.
        */

        // declare select result object
        var result = Object.create( null );

        /**
         * Select all required props
        */
        result.id = item[ 'id' ];
        result.name = item[ 'name' ];
        result.img = item[ 'img' ];
        result.order = item[ 'order' ];

        // if original positional index in the collection is required, add it
        if ( index !== undefined )
            result.collectionPositionalIndex = index;

        // return select result object
        return result;
    },

    udfResultSelector: function ( inputItem, inputItemProcessedByUdfSelector )
    {
        /**
         * Provide the logic valid for your cases !
         * 
         * This is only exemplary implementation logic.
        */

        var finalItem = Object.create( null );

        finalItem.original = inputItem;
        finalItem.processedOriginal = inputItemProcessedByUdfSelector;

        return finalItem;
    },



    /**
     * Primitives !
    */

    udfDefaultPrimitiveContentComparer: function ( obj1, obj2 )
    {
        /**
         * Define logic of your custom object content comparer to compare the content of two objects.
         * 
         * The required value to return is true/false
        */

        var haveTheSameContent = udf_commons.udfEqualityComparer( obj1, obj2 ) === 0;


        return haveTheSameContent;
    },

    udfPrimitiveGroupKeySelector: function ( coll_item )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        // return the key
        return coll_item;
    },

    udfPrimitiveGroupKeyProjector: function ( keyValue )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        /**
         * Do some logic with grouping key !
         * 
         * Exemplary logic here !
        */
        return keyValue;
    },

    udfPrimitiveGroupElementSelector: function ( coll_item )
    {
        // JLC context accessible from here
        var jlcCtx = this;

        /**
         * Do some logic with group item - f.e. provide a new shape of this item !
         * 
         * Exemplary logic here !
        */

        // declare output object
        var newShape = Object.create( null );

        newShape.createdAt = Date.now();
        newShape.value = coll_item;

        // return output object
        return newShape;
    },

    udfPrimitiveGroupResultValueSelector: function ( groupKey, groupItems, isDictionary )
    {
        /**
         * Do some logic with grouping key (groupKey) and all item falling into this group (groupItems) - f.e. provide a new object consisting of some math calculations !
         * 
         * Exemplary logic here !
        */

        // declare output object
        var newShape = Object.create( null );

        newShape.key = groupKey;

        // dictionary has to always be a dictionary, i.e. KVP object {key: some_key, value: some_value}
        if ( isDictionary )
        {
            // create value object
            var value = Object.create( null );

            value.groupHasAnyItems = hasAnyItems_I_1L( groupItems );
            value.groupHasUniqueItems = hasUniqueItems_I_1L( groupItems );
            value.price = extractValueObjectProperty_I_1L( groupItems );

            // assign value object to value property of KVP
            newShape.value = value;
        }
        else
        {
            newShape.groupHasAnyItems = hasAnyItems_I_1L( groupItems );
            newShape.groupHasUniqueItems = hasUniqueItems_I_1L( groupItems );
        }

        // return output object
        return newShape;



        /**
         * Local helper functions
        */
        function hasAnyItems_I_1L ( group )
        {
            /**
             * Exemplary logic here !
            */
            return true;
        }

        function hasUniqueItems_I_1L ( group )
        {
            /**
             * Exemplary logic here !
            */
            return true;
        }

        function extractValueObjectProperty_I_1L ( valueObject )
        {
            /**
             * Exemplary logic here !
            */
            return valueObject.price;
        }
    },

    udfPrimitiveSelector: function ( item, selectors, index )
    {
        /**
         * Provide the logic valid for your cases !
         * 
         * This is only exemplary implementation logic.
        */

        // declare select result object
        var result = Object.create( null );

        /**
         * Select all required props
        */
        result.isBool = item === true || item === false;
        result.isString = typeof item === 'string';
        // ...and so on and so forth

        // if original positional index in the collection is required, add it
        if ( index !== undefined )
            result.collectionPositionalIndex = index;

        // return select result object
        return result;
    },

    udfPrimitiveResultSelector: function ( inputItem, itemIndexOrUndefined )
    {
        /**
         * Result selector for primitive type has to return a value of string primitive type !
         * The return value has to any string !
         *
         * 
         * Provide the logic valid for your cases !
         * 
         * This is only exemplary implementation logic.
        */

        var output;

        // handle string primitive type
        if(inputItem[ "length" ])
            output = flattenValue_I_3L(inputItem);
        // handle other primitive type and convert it to string type
        else {
                if(itemIndexOrUndefined || itemIndexOrUndefined === 0)
                    output = flattenValue_I_3L(inputItem + "#" + itemIndexOrUndefined);
                else
                    output = flattenValue_I_3L(inputItem.toString());
        }


        return output;



        /**
         * Local helper functions
        */
        function flattenValue_I_3L ( value )
        {
            // declare an array
            var output = [];

            // flatten the value
            for ( let v of value ) output.push( v );
            
            // return the array
            return output;
        }
    }

};

window.udf_commons = window.udf_commons || my_custom_jlc_common;