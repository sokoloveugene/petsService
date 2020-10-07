import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearsOfExperince'
})
export class YearsOfExperincePipe implements PipeTransform {

  transform(startCareerYear: number): number {
    return new Date().getFullYear() - startCareerYear
  }

}
