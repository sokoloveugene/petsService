import { Pipe, PipeTransform } from '@angular/core';
import { shopItemInterface } from '../../interfaces';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(
    products: shopItemInterface[],
    search: string,
    animalFilters: string[],
    categoryFilters: string[]
  ): shopItemInterface[] {
    switch (true) {
      case search.trim() &&
        animalFilters.length === 0 &&
        categoryFilters.length === 0:
        return products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

      case !search.trim() &&
        animalFilters.length > 0 &&
        categoryFilters.length === 0:
        return products.filter((p) => animalFilters.includes(p.animal));

      case !search.trim() &&
        animalFilters.length === 0 &&
        categoryFilters.length > 0:
        return products.filter((p) => categoryFilters.includes(p.category));

      case !search.trim() &&
        animalFilters.length > 0 &&
        categoryFilters.length > 0:
        return products.filter(
          (p) =>
            categoryFilters.includes(p.category) &&
            animalFilters.includes(p.animal)
        );

      case search.trim() &&
        animalFilters.length > 0 &&
        categoryFilters.length === 0:
        return products.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            animalFilters.includes(p.animal)
        );

      case search.trim() &&
        animalFilters.length === 0 &&
        categoryFilters.length > 0:
        return products.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            categoryFilters.includes(p.category)
        );

      case search.trim() &&
        animalFilters.length > 0 &&
        categoryFilters.length > 0:
        return products.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            categoryFilters.includes(p.category) &&
            animalFilters.includes(p.animal)
        );

      default:
        return products;
    }
  }
}
