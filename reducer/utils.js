import {OrderedMap, Map, List} from 'immutable';

export const arrToMap = (arr, Record) => {
    return arr.reduce(
        (acc,item) => acc.set(item.position, Record ? new Record(item) : item),
        new OrderedMap({}) 
    )
}

export const arrToRecord = (arr, Record) =>{
    console.log(arr)
    console.log(Record)
    arr = arr.map((item =>{
        return new Record(item)
    }))
}

export const objToMap = (obj, Record) =>{
    for(let key in obj){
       obj[key] = new Record(obj[key])
    }
    return obj
}
export const objToList = (obj) =>{
    for(let key in obj){
        obj[key] = new List(obj[key])
     }
     return obj
}
// input arr
// output Record{OrderedMap{name:Record{property}}}