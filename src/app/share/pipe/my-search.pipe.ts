import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ListItem } from '../../model/list-item.model';

@Pipe({name: 'searchByTitle'})

export class SearchByTitlePipe implements PipeTransform {
    transform(array: ListItem[], searchValue: string): ListItem[] {
        searchValue = searchValue.toLowerCase();

    return _.filter(array, (item) => {item.title.toLowerCase().includes(searchValue); });
    }
}
