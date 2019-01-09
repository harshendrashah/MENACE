function changeValue(map, steps, actionType){
    
    let i,j;

    switch(actionType){

        case 0:                 // won
            for(i in steps){
                if(i != (steps.length - 1)){
                    for(j in map[steps[i].perm].val){
                        if(map[steps[i].perm].val[j].perm == steps[i+1].perm){
                            map[steps[i].perm].val[j].value += 3;  
                        }
                    }                    
                }
            }
            break;

        case 1:               // draw
            for(i in steps){
                if(i != (steps.length - 1)){
                    for(j in map[steps[i].perm].val){
                        if(map[steps[i].perm].val[j].perm == steps[i+1].perm){
                            map[steps[i].perm].val[j].value += 1;  
                        }
                    }                    
                }
            }
            break;

        case 2:                // lost
            for(i in steps){
                if(i != (steps.length - 1)){
                    for(j in map[steps[i].perm].val){
                        if(map[steps[i].perm].val[j].perm == steps[i+1].perm){
                            map[steps[i].perm].val[j].value -= 1;  
                        }
                    }                    
                }
            }
            break;                          
    }

    return map;
}

function move(map, currentPerm){

    let max = 0;
    let nextState = "";
    let i,tot = 0;
    let rand = Math.random();
    let probCount = 0;

    for( i in map[currentPerm].val){
        tot +=  map[currentPerm].val[i].value;   
    }
    
    for(i in map[currentPerm].val){
        probCount += (map[currentPerm].val[i].value / tot);

        if(probCount > rand){
            nextState = map[currentPerm].val[i].perm;
            break;
        }
    }
    console.log(nextState, rand, probCount)
    return nextState;
}


function checkFinish(){
    
}

// The method that prints all  
// possible strings of length k. 
// It is mainly a wrapper over  
// recursive function printAllKLengthRec() 
function printAllKLength(set, k) 
{ 
    let n = set.length;  
    printAllKLengthRec(set, "", n, k); 
} 
  
// The main recursive method 
// to print all possible  
// strings of length k 
function printAllKLengthRec(set, prefix, n, k) 
{ 
      
    // Base case: k is 0, 
    // print prefix 
    if (k == 0)  
    { 
        //console.log(prefix)
        perm.push(prefix)                      
        return; 
    } 
  
    // One by one add all characters  
    // from set and recursively  
    // call for k equals to k-1 
    for (let i = 0; i < n; ++i) 
    { 
  
        // Next character of input added 
        let newPrefix = `${prefix}${set[i]}`;  
        // k is decreased, because  
        // we have added a new character 
        printAllKLengthRec(set, newPrefix,  
                                n, k - 1);  
    }
    //delete i; 
}

let perm  = [] ;
let set = ['1','2','0']
printAllKLength(set,9) 

/*
for(let j in perm){
    console.log(perm[j],j)
}
*/
let map = {};

for (i in perm){
    
    let count = 0 ;
    let val = [];
    for(j=0;j< perm[i].length; j++){
        
        if(perm[i][j] === '0'){
            let valString = perm[i].slice(0,j) + "2" + perm[i].slice(j+1,perm[i].length)
            val.push({perm: valString, value: 4})
            count++;            
        }
            
    }

    map[perm[i]] = {count : count, val: val}
    //console.log(perm[i], i, count) //Use the output method of your choice}
}
/*
for(m in map)
    console.log(map[m],m)
*/
move(map,"000000000")
