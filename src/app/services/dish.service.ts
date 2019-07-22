import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable <Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable <string[]> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}
