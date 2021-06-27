printjson(db.people.mapReduce(
    function() {
        var w = parseFloat(this.weight);
        var h = parseFloat(this.height);
        var bmi = w / h * h;
        emit(
            this.nationality, {count: 1, minBmi: bmi, maxBmi: bmi, sumBmi: bmi}
        );  
    }, 
    function(key, values) {
        return {
            count: values.map(item => item.count).reduce((a, b) => a + b, 0),
            minBmi: values.map(item => item.minBmi).reduce((a, b) => {
                if(a < b) return a;
                else return b
                }, 1000), 
            maxBmi: values.map(item => item.maxBmi).reduce((a, b) => {
                if(a > b) return a;
                else return b
                }, 0),
            sumBmi: values.map(item => item.sumBmi).reduce((a, b) => a + b, 0)
        };
    }, 
    {
        out: {inline: 1},
        finalize: function(key, value){
            return {
                avg: value.sumBmi / value.count,
                max: value.maxBmi,
                min: value.minBmi
            }
        }
        
    }
   
));