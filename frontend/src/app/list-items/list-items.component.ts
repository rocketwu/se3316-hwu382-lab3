import { CartDBService } from './../cart-db.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  constructor(private http:HttpClient, private cartService:CartDBService) { }
  items:Item[];
  ngOnInit() {
    this.getItems();
  }

  getItems():void{
    this.cartService.getItems().subscribe(items=>this.items=items);
  }

}
