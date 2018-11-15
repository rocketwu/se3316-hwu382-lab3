import { Item } from './item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDBService {

  private _items:Item[];
  constructor(private httpclient:HttpClient) {
  }



  getItems():Observable<Item[]>{
    return this.httpclient.get<Item[]>('https://se3316-hwu382-lab3-hwu382.c9users.io/carts');
  }

  // addItem(item:Item):Observable<Item>{
  //   console.log(item);
  //   let httpOptions={headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //   })};
  //   return this.httpclient.post<Item>('https://se3316-hwu382-lab3-hwu382.c9users.io/carts',item,httpOptions);

  // }

  addItem(item:Item):Observable<string>{
    console.log(item);
    let httpOptions={headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    })};

    let body="name="+item.name+"&price="+item.price+"&tax="+item.tax;
    return this.httpclient.post<string>('https://se3316-hwu382-lab3-hwu382.c9users.io/carts',body,httpOptions);

  }

}
