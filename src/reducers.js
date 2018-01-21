import {combineReducers} from 'redux'
import {
    SELECT_SITE,
    INVALIDATE_SITE,
    REQUEST_QUESTIONS,
    RECEIVE_QUESTIONS
} from './actions';


function selectedSite(state = 'stackoverflow', action) {
    switch (action.type) {
        case SELECT_SITE:
            return action.site;
        default:
            return state
    }
}


function questions(state = {
                       isFetching: false,
                       didInvalidate: false,
                       items: []
                   },
                   action) {
    switch (action.type) {
        case INVALIDATE_SITE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_QUESTIONS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_QUESTIONS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.questions,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function questionsBySite(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SITE:
        case RECEIVE_QUESTIONS:
        case REQUEST_QUESTIONS:
            return Object.assign({}, state, {
                [action.site]: questions(state[action.site], action)
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    questionsBySite,
    selectedSite
});

export default rootReducer