printjson(db.people.mapReduce(
    function() {
        emit(this.job, this.job);
    }, 
    function(key, values) {
        return values.length;
    }, 
    { out: {inline: 1} }
   
));