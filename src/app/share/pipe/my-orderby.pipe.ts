import { Pipe, PipeTransform } from '@angular/core';
import { ListItem } from '../../model/list-item.model';

@Pipe({name: 'orderBycreationDate'})

export class OrderBycreationDatePipe implements PipeTransform {
    transform(value: ListItem[]): ListItem[] {
    return value.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
    }
}
