import fetch from 'cross-fetch'

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SELECT_SITE = 'SELECT_SITE';
export const INVALIDATE_SITE = 'INVALIDATE_SITE';


export function selectSite(site) {
    return {
        type: SELECT_SITE,
        site
    }
}

export function invalidateSite(site) {
    return {
        type: INVALIDATE_SITE,
        site
    }
}

function requestQuestions(site) {
    return {
        type: REQUEST_QUESTIONS,
        site
    }
}

function receiveQuestions(site, json) {

    return {
        type: RECEIVE_QUESTIONS,
        site,
        questions: json.items,
        receivedAt: Date.now()
    }
}

function fetchQuestions(site) {
    return dispatch => {
        dispatch(requestQuestions(site));
        let u = `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=creation&site=${site}`;
        return fetch(u)
            .then(response => response.json())
            .then(json => dispatch(receiveQuestions(site, json)))
    }
}

function shouldFetchQuestions(state, site) {
    const questions = state.questionsBySite[site];
    if (!questions) {
        return true;
    } else if (questions.isFetching) {
        return false;
    } else {
        return questions.didInvalidate
    }
}


export function fetchQuestionsIfNeeded(site) {
    return (dispatch, getState) => {
        if (shouldFetchQuestions(getState(), site)) {
            return dispatch(fetchQuestions(site))
        }
    }
}