import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

private baseUrl= 'http://localhost:8080/api/products';
private categoryUrl= 'http://localhost:8080/api/product-category';

  constructor(private httpClient : HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(Response => Response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(Response => Response._embedded.productCategory)
    );
  }

  searchProducts(theKeyWord: string):Observable<Product[]> {

    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
    return this.getProducts(searchUrl);
    
  }

  private getProducts(searchUrl:string){

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(
      response=>response._embedded.products
    ));
  }

  getProduct(theProductId:number):Observable<Product>{

    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);


  }


}

interface GetResponseProducts {

  _embedded :{

    products: Product[];
  }
}

interface GetResponseProductCategory {

  _embedded :{

    productCategory: ProductCategory[];
  }
}