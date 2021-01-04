import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  currentCategoryId :number;
  searchMode:boolean; 

  constructor(private productService : ProductService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ()=>{
      this.listProducts();
    });
    
  }

  listProducts(){

    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){

      this.handleSearchProduct();
    }else{

    this.handleListProducts();
    }
  }



  handleListProducts(){


    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
          // get the "id" param string . converting string to number using '+' symbol
       
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }
    else{
          // no category id found... default value made 1   

      this.currentCategoryId= 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=> { 
        this.products =data;
      }
    )


  }
  handleSearchProduct(){
    const theKeyWord:string=this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyWord).subscribe(
      data=>{
        this.products=data;
      }
    )
  }

}
