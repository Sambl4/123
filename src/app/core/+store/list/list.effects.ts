import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as ListActions from './list.actions';
import { ListService } from '../../../list/list.service';

@Injectable()
export class ListEffects {
    @Effect()
    getList$ = this.actions$.pipe(
        ofType<ListActions.GetList>(ListActions.ListActionTypes.GET_LIST),
        switchMap(() =>
            this.listService.getList(1, 5).pipe(
                map(list => new ListActions.GetListSuccess(list)),
                catchError(err => of (new ListActions.ResultFailure(err)))
            )
        )
    );

    // getList$: Observable<Action> = this.actions$.pipe(
    //     ofType<ListActions.GetList>(ListActions.ListActionTypes.GET_LIST),
    //     switchMap((action: ListActions.GetList) =>
    //         this.listService.getList(1, 5)
    //         // .forkJoin(list => new ListActions.GetListSuccess(list))
    //         // .catch(err => new ListActions.GetListFailure(err))
    //     )
    // );
    constructor(private actions$: Actions, private listService: ListService) { }
}