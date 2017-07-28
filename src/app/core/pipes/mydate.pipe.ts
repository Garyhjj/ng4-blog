import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'sgMydate' })
export class MydatePipe implements PipeTransform {
  transform(value: string, format: string): string {
    if(Date.parse(value)){
      return moment("12-25-1995", "MM-DD-YYYY").format(format);
    } else {
      return value
    }

  }
}
