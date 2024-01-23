import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  userLogin!:boolean
  constructor(private service:DataService) { }

  ngOnInit(): void {
    const obj = {
      a: "search-customers",
      recordsPerPage: "40",
      page: 1
    }
    // this.service.getCustomer(obj).subscribe((res)=>{
    //   console.log(res,"dddddddddd");
      
    // });
  }

  addCustomer(){
    
  }

}
