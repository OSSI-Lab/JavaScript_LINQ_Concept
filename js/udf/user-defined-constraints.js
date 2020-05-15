// context-wide available object
var my_custom_jlc_constraints = {
    handleFirstLevelSorting: /**
     * @param {{ flag: any; }} constr_params
     */
        function ( constr_params )
        {
            // 'this' refers to the current action constraint object
            var self = this;

            // reference first-level sorting context object (flsco)
            var flsco = self.actionContext.sharedFirstLevelSortingCtx;

            // apply required constraint logic
            flsco.set( constr_params, self );


            // you need to somehow get access to all constraint chain in order to do some updates up the chain
        },

    handleSecondLevelSorting: /**
     * @param {any} constr_params
     */
        function ( constr_params )
        {
            // 'this' refers to the current action constraint object
            var self = this;

            // reference first-level sorting context object (flsco)
            var flsco = self.actionContext.sharedFirstLevelSortingCtx;

            // apply required constraint logic
            flsco.check();

            // you need to somehow get access to all constraint chain in order to do some updates up the chain
        },

    handleResetFirstLevelSorting: /**
     * @param {any} constr_params
     */
        function ( constr_params )
        {
            // 'this' refers to the current action constraint object
            var self = this;

            // reference first-level sorting context object (flsco)
            var flsco = self.actionContext.sharedFirstLevelSortingCtx;

            // apply required constraint logic
            flsco.set( constr_params, self );

            // you need to somehow get access to all constraint chain in order to do some updates up the chain
        },

};

window.udf_constraints = window.udf_constraints || my_custom_jlc_constraints;