import { ListActions, ListActionTypes } from './list.actions';
import { ListState, initialListState } from './list.state';

import { ListItem } from '../../../model/list-item.model';

export function listReducer(state = initialListState, action: ListActions): ListState {
    console.log('reducer', action.type);

    switch (action.type) {
        case ListActionTypes.GET_LIST: {
            return {
                ...state,
                loading: true
            };
        }

        case ListActionTypes.GET_LIST_SUCCESS: {
            const data = action.payload['items'];
            const totalPages = action.payload['totalPages'];
            return {
                ...state,
                data: data,
                totalPages: totalPages,
                loading: false,
                loaded: true
            };
        }

        case ListActionTypes.GET_LIST_ITEM: {
            return {
                ...state
            };
        }

        case ListActionTypes.CREATE_LIST_ITEM: {
            return {
                ...state
            };
        }

        case ListActionTypes.UPDATE_LIST_ITEM: {
            return {
                ...state
            };
        }

        case ListActionTypes.EDIT_LIST_ITEM: {
            const id = (<ListItem>action.payload).id;
            const data = state.data.map(item => {
                if (item.id === id) {
                    return { ...action.payload, editMode: true };
                }
                return item;
            });
            return {
                ...state,
                data
            };
        }

        case ListActionTypes.CANCEL_EDIT_LIST_ITEM: {
            const id = (<ListItem>action.payload).id;
            const data = state.data.map(item => {
                if (item.id === id) {
                    return { ...action.payload, editMode: false};
                }
                return item;
            });
            return {
                ...state,
                data
            };
        }

        case ListActionTypes.RESULT_FAILURE: {
            const error = action.payload;
            return {
                ...state,
                loading: false,
                loaded: false,
                error
            };
        }

        default: {
            return state;
        }
    }
}