printjson(db.people.mapReduce(
    function() {
        emit(
            this.sex, {
                count: 1,
                weight: parseFloat(this.weight), 
                height: parseFloat(this.height)
            }
        );  
    }, 
    function(key, values) {
        return {
            count: values.map(item => item.count).reduce((a, b) => a + b, 0), 
            weight: values.map(item => item.height).reduce((a, b) => a + b, 0), 
            height: values.map(item => item.weight).reduce((a, b) => a + b, 0)
        };
    }, 
    {
        out: {inline: 1},
        finalize: function(key, value){
                return {
                    avgHeight: value.height / value.count,
                    avgWeight: value.weight / value.count
                };
            }
    }
   
));