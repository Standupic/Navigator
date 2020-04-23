import "regenerator-runtime/runtime";
import {createFilters,
    greatestValue,
    createLabels,
    createHideShowData} from '../helper';

// import  data from '../data/tarifs2.json';
// import  defaultParams from '../data/default_params.json';
// import  tags from '../data/tags.json';


import
{LOAD_DATA_BEGIN,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAILURE,
    LOAD_FILTERS,
    LOAD_DATA,
    LOAD_TAGS,
} from '../constans';

// const mode = process.env.NODE_ENV;


const doRequest = async (url) =>{
    const params = await fetch(url);
    const data = await params.json();
    return data;
}

let result = (store) => (next) => async (action) => {
    if(!action.meta || action.type !== "API"){
        return next(action)
    }
    const {meta} = action
    next({
        type: LOAD_DATA_BEGIN
    });

    try {
        const data = await doRequest(meta[0])
        const defaultParams = await doRequest(meta[1])
        const labels = await createLabels(defaultParams)
        const hideShowData = await createHideShowData(defaultParams)
        next({
            type: LOAD_DATA,
            response: {
                data,
                labels,
                hideShowData
            }
        })
        const filters  = await createFilters(defaultParams, data)
        next({
            type: LOAD_FILTERS,
            response: filters
        })
        const tagsParams = await doRequest(meta[2])
        const tags = await greatestValue(tagsParams)
        next({
            type: LOAD_TAGS,
            response: {
                tags
            },
        })
        next({
            type: LOAD_DATA_SUCCESS,
        })
    }catch(error){
        next({
            type: LOAD_DATA_FAILURE,
            response: {error} // replace on error
        })
    };
}
export default result
