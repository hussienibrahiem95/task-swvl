const requests_set = new Set()
const mx_requests = 3
const limit_time = 60 * 60 * 1000  // in miliseconds
exports.add_request =(request_time)=>{
    return new Promise ( (resolve , reject) =>{
        if(requests_set.size <= 1){
            requests_set.add(request_time);
            resolve('process request');
        }
        let first_time = requests_set.values().next().value;
        let last_time = getLastValue(requests_set); 
        if(last_time - first_time <= limit_time){ // check if time less than < 60 seconds 
            if(requests_set.size < mx_requests ){ // can process this request MAX requests per minute 10  
                requests_set.add(request_time);
                resolve('process request');
            }
            else
            reject('limit requests');
        }
        else {
            requests_set.add(request_time);
            resolve('process request');
        }
    })
}
exports.remove_request = (request_time)=>{
    if(requests_set.has(request_time)){
        requests_set.delete(request_time);
        return 1; // deleted sucessfully
    }
    return 0; // not deleted it not in set
}
function getLastValue(set){
    let value;
    for(value of set);
        return value;
}


