import {Record} from 'immutable';

const StructureState = new Record({
    currentPage: 1,
    countTarifs: 5,
    currentSectionPages: 1
})

import {
        MOVE_PAGINATION,
        SET_QUANTITY_DISPLAY_TARIF,
        NEXT,
        PREV,
        FIRST_SECTION,
        LAST_SECTION,
        NUMBER,
        TAG_SEARCH,
        RESET_FILTERS,
        SORT_TARIFS,
        HANDLER_FILTERING_CHECKBOX,
        HANDLER_SLIDER,
        HANDLER_FILTERING_RADIO,
        SELECT_FILTER
        } from '../constans';

import {isNumeric} from '../helper/';

function returnToOnePage(state){
    return state
    .updateIn(['currentPage'], v => 1)
    .updateIn(['currentSectionPages'], v => 1)
}

export default (state = new StructureState(), action)=>{
    const {type} = action;
    switch(type){
        case SET_QUANTITY_DISPLAY_TARIF:
            const value = action.value;
            return state
            .updateIn(['countTarifs'], v => !isNumeric(value) ? 8 : value)
        case TAG_SEARCH:
        case HANDLER_FILTERING_CHECKBOX:
        case HANDLER_FILTERING_RADIO:
        case HANDLER_SLIDER:
        case SELECT_FILTER:
        case SORT_TARIFS:
            return returnToOnePage(state)
        case RESET_FILTERS:
            return state
            .updateIn(['currentPage'], v => 1)
            .updateIn(['currentSectionPages'], v => 1)
        case MOVE_PAGINATION:
            switch(action.param[0]){
                case FIRST_SECTION:
                    return state
                    .updateIn(['currentPage'], v => 1)
                    .updateIn(['currentSectionPages'], v => 1)
                break;
                case LAST_SECTION:
                   return state
                    .updateIn(['currentPage'], v => Math.ceil(action.param[2] / state.get("countTarifs")))
                    .updateIn(['currentSectionPages'], v => action.param[1])
                break;
                case NEXT:
                    let x;
                    if(state.get("currentPage") == Math.ceil(action.param[1] / state.get("countTarifs"))) return state
                    let dis = state.get('currentSectionPages') * 2 - 2; // 4 
                    console.log(dis)
                return state
                    .updateIn(['currentPage'], v => v+1)
                    .updateIn(['currentSectionPages'], v =>
                    // v == 2 && (state.get('countTarifs') * v) - 2 == state.get('currentPage') ?
                    // v + 1 :
                    v >= 2 && state.get('currentSectionPages') * state.get('countTarifs') == state.get('currentPage') + dis ? 
                    v + 1 :
                    state.get('countTarifs') * v  == state.get("currentPage") ?
                    v+1 : v)
                break;
                case PREV:
                    if(state.get("currentPage") == state.get("currentSectionPages")) return state 
                    let step = ((state.get('countTarifs') * state.get("currentSectionPages")) - state.get("countTarifs"));
                    return state
                    .updateIn(['currentPage'], v => v-1)
                    .updateIn(['currentSectionPages'], v => (step < (state.get('currentPage') - 1) ?
                    v : step / state.get("countTarifs")))
                break;
                case NUMBER:
                    return state
                    .updateIn(['currentPage'], v => action.param[1])
            default:
                return state
            }
        default:
            return state
    }
}