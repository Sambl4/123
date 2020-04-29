import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'durationFormat'})

export class DurationFormatPipe implements PipeTransform {
    transform(value: number): string {
        const hours: number = Math.floor(value / 60);
        const minutes: number = Math.round((value / 60 - hours) * 60);
      return value < 60 ? value + ' min.' : hours + ' h.   ' + minutes + ' min.';
    }
}
