// API
export const callAPI = () => {
    return{
        type: "API",
        meta:[
            // "http://cc.wifire.ru:4000/tarifs",
            "./data/tarifs.json",
            "./data/default_params.json",
            "./data/tags.json"
        ]
    }
}
//end API
