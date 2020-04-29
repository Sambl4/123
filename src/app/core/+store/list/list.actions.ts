import { Action } from '@ngrx/store';
import { ListItem } from '../../../model/list-item.model';

export enum ListActionTypes {
    GET_LIST = '[List] GET_LIST',
    GET_LIST_SUCCESS = '[List] GET_LIST_SUCCESS',
    GET_LIST_ITEM = '[List] GET_LIST_ITEM',
    CREATE_LIST_ITEM = '[List] CREATE_LIST_ITEM',
    UPDATE_LIST_ITEM = '[List] UPDATE_LIST_ITEM',
    EDIT_LIST_ITEM = '[List] EDIT_LIST_ITEM',
    CANCEL_EDIT_LIST_ITEM = '[List] CANCEL_EDIT_LIST_ITEM',
    RESULT_FAILURE = '[List] RESULT_FAILURE'
}

export class GetList implements Action {
    readonly type = ListActionTypes.GET_LIST;
    constructor(public payload: any = null) { }
}

export class GetListSuccess implements Action {
    readonly type = ListActionTypes.GET_LIST_SUCCESS;
    constructor(public payload: ListItem[]) {}
}

export class GetListItem implements Action {
    readonly type = ListActionTypes.GET_LIST_ITEM;
    constructor(public payload: number) {}
}

export class CreateListItem implements Action {
    readonly type = ListActionTypes.CREATE_LIST_ITEM;
    constructor(public payload: ListItem) {}
}

export class UpdateListItem implements Action {
    readonly type = ListActionTypes.UPDATE_LIST_ITEM;
    constructor(public payload: ListItem) {}
}

export class EditListItem implements Action {
    readonly type = ListActionTypes.EDIT_LIST_ITEM;
    constructor(public payload: ListItem) {}
}

export class CancelEditListItem implements Action {
    readonly type = ListActionTypes.CANCEL_EDIT_LIST_ITEM;
    constructor(public payload: ListItem) {}
}

export class ResultFailure implements Action {
    readonly type = ListActionTypes.RESULT_FAILURE;
    constructor(public payload: Error | string) {}
}

export type ListActions =
      GetList
    | GetListSuccess
    | GetListItem
    | CreateListItem
    | UpdateListItem
    | EditListItem
    | CancelEditListItem
    | ResultFailure;