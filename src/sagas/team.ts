import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchError, fetchRequest, fetchSuccess } from '../actions/team';
import { callApi } from '../services/httpService';
import { TeamActionTypes } from '../types/team';

const API_ENDPOINT = 'https://api.opendota.com';

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
    try {
        const team = yield call(callApi, 'get', API_ENDPOINT, `/teams/${action.payload}`);
        const players = yield call(
            callApi,
            'get',
            API_ENDPOINT,
            `/teams/${action.payload}/players`
        );

        if (team.error || players.error) {
            yield put(fetchError(team.error || players.error));
        } else {
            yield put(fetchSuccess(team, players));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchError(err.stack!));
        } else {
            yield put(fetchError('An unknown error occurred.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield takeEvery(TeamActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
export default function* teamSaga() {
    yield all([fork(watchFetchRequest)]);
}
