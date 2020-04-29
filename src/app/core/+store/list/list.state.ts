import { ListItem } from '../../../model/list-item.model';

export interface ListState {
    data: ReadonlyArray<ListItem>;
    readonly totalPages: number;
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string;
}

export const initialListState: ListState = {
    data: [],
    totalPages: 0,
    loading: false,
    loaded: false,
    error: null
};