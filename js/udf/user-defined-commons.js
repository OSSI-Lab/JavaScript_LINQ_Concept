// context-wide available object
var my_custom_jlc_common = {
    // user-defined groupBy result data processor
    process_GroupBy_result: function (groupBy_result_object, yieldOnDemand)
    {
        if (yieldOnDemand)
            groupBy_result_object = groupBy_result_object.toArray();

        for (var i = 0, length = groupBy_result_object.length; i < length; i++)
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
    udfEqualityComparer: function (kC, kP)
    {
        /**
         * Reference this context, here being the sortMetaObject storing all relevant metadata about type of sorting operation
         * 
         *  this.sortMetaObject -> sortMetaObject
         *  this.selectors      -> selectors
        */
        var sortMetaObject = this.sortMetaObject;
        var selectors = this.selectors;

        // compare strings
        if(typeof kC === 'string') {
            // nothing extraordinary, just showing the examplary usage !
            if (kC.length > kP.length) return 1;
            else if (kC.length < kP.length) return -1;
            else return 0;
        }
        // compare numbers
        else if(typeof kC === 'number') {
            // nothing extraordinary, just showing the examplary usage !
            if (kC > kP) return 1;
            else if (kC < kP) return -1;
            else return 0;
        }
        // compare booleans
        else if(typeof kC === 'boolean') {
            // nothing extraordinary, just showing the examplary usage !
            if (kC > kP) return 1;
            else if (kC < kP) return -1;
            else return 0;
        }
        // compare booleans
        else if(typeof kC === 'object') {
            //extract property -  nothing extraordinary, just showing the examplary usage !
            var property = selectors[0][0];

            /**
             * Read values from both objects
            */
            kC = kC[property];
            kP = kP[property]; 

            /**
             * Compare both values
            */
            if (kC > kP) return 1;
            else if (kC < kP) return -1;
            else return 0;
        }
    },

    udfSelector : function(item, selectors, index) {
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

    udfResultSelector : function(inputItem, inputItemProcessedByUdfSelector) {
        /**
         * Provide the logic valid for your cases !
         * 
         * This is only exemplary implementation logic.
        */

        var finalItem = Object.create(null);

        finalItem.original = inputItem;
        finalItem.processedOriginal = inputItemProcessedByUdfSelector;

         return finalItem;
    }
};

window.udf_commons = window.udf_commons || my_custom_jlc_common;