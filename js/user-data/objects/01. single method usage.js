(function () {
    window.goto_Objects_SingleMethodUsage = window.goto_Objects_SingleMethodUsage || function() {
        console.log('Objects - single method usage');


        var coll_1 = [
            {id: 1, name : "Object 1", ne : {ne_id : 1, ne_name : "NO 1"}, valid : true, lite : false, descr : "Descr 1", quality : "A"},
            {id: 7, name : "Object 7", ne : {ne_id : 7, ne_name : "NO 7"}, valid : true, lite : false, descr : "Descr 7", quality : "D"},
            {id: 8, name : "Object 8", ne : {ne_id : 8, ne_name : "NO 8"}, valid : true, lite : false, descr : "Descr 8", quality : "E"},
            {id: 9, name : "Object 9", ne : {ne_id : 9, ne_name : "NO 9"}, valid : true, lite : true, descr : "Descr 9", quality : "F"},
            {id: 2, name : "Object 2", ne : {ne_id : 2, ne_name : "NO 2"}, valid : true, lite : false, descr : "Descr 2", quality : "A"},
            {id: 3, name : "Object 3", ne: null, 						   valid : false, lite : false, descr: "Descr 3", quality: "C" },
            {id: 4, name : "Object 4", ne : {ne_id : 4, ne_name : "NO 4"}, valid : true, lite : false, descr : "Descr 4", quality : "B"},
            {id: 5, name : "Object 5", ne : {ne_id : 5, ne_name : "NO 5"}, valid : true, lite : false, descr : "Descr 5", quality : "A"},
            {id: 6, name : "Object 6", ne : {ne_id : 6, ne_name : "NO 6"}, valid : true, lite : true, descr : "Descr 6", quality : "C"},
            {id: 10, name : "Object 4", ne : {ne_id : 10, ne_name : "NO 10"}, valid : true, lite : true, descr : "Descr 4", quality : "A"}
        ];
        
        /**
         * Who you are ?
         * https://thesaurus.yourdictionary.com/childish 
        */
        var coll_toString = [
            {id: 1, name : "False software engineer", descr : "Earning a lot, learning nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 2, name : "False software developer", descr : "Earning quite a lot, playing new computer games !", quality : "F", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 3, name : "False software architect", descr : "Earning huge money, creating huge stupidity!", quality : "E", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }},
            {id: 4, name : "False adolescent immature the rest ", descr : "Knowing nothing, learning nothing, being nothing !", quality : "D", toString() {return "#" + this.id + "-" + this.descr + "-" + this.quality; }}
        ];

        // 1.


        console.log('~ Objects - single method usage');
    }
}
)();