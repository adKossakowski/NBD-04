printjson(db.people.mapReduce(
    function() {
        for(var i = 0; i < this.credit.length; i++){
            emit(this.credit[i].currency, {count: 1, balance: parseFloat(this.credit[i].balance)});
        } 
    }, 
    function(key, values) {
        return {
            count: values.map(item => item.count).reduce((a, b) => a + b, 0), 
            balance: values.map(item => item.balance).reduce((a, b) => a + b, 0)
        }
    }, 
    { 
        query: {nationality: "Poland", sex: "Female"},
        out: {inline: 1} ,
        finalize: function (key, value){
            return {
                avg: value.balance / value.count,
                sum: value.balance
            }
        }
    }
));
