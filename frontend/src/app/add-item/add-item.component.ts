import { CartDBService } from './../cart-db.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private cartServer:CartDBService) { }

  ngOnInit() {
  }

  addItem(name:string,price:number,tax:number){
    let item=new Item();
    item.name=name;
    item.price=price;
    item.tax=tax;

    this.cartServer.addItem(item).subscribe();
  }

}
