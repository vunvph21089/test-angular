import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { IProduct } from '../interface/product';
import { ICatePro } from '../interface/cateProduct';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private  http: HttpClient
  ) {}

  // Products ------------------------------------------------------
  getAllProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`http://localhost:3000/products`)
  }
  getProductById(id: number):Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
  }
  addProduct(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>(`http://localhost:3000/products`,product)
  }
  editProduct(product: IProduct): Observable<IProduct>{
    return this.http.patch<IProduct>(`http://localhost:3000/products/${product.id}`,product)
  }
  deleteProduct(id :any): Observable<IProduct>{
    return this.http.delete<IProduct>(`http://localhost:3000/products/${id}`)
  }
  getProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    const url = `http://localhost:3000/products?ProductCateID=${categoryId}`;
    return this.http.get<IProduct[]>(url);
  }
  // deleteProductsByCategoryId(categoryId: number): Observable<any> {
  //   const url = `http://localhost:3000/products?ProductCateID=${categoryId}`;
  //   return this.http.delete(url);
  // }




  // Cart ---------------------------------------------------------
  getCart(){
    let cartJson = sessionStorage.getItem('cart')
    if(cartJson){
      return JSON.parse(cartJson)
    } else{
      return []
    }
  }

  saveCart( carts:any){
    let cartJson = JSON.stringify(carts)
    sessionStorage.setItem('cart',cartJson)
  }

  getCartQuatity(){
    let carts = this.getCart();
    console.log(carts);
    let total :number = 0
    carts.forEach((item :any) => {
      total += item.quantity
    });
    return total
  }

  getCartPrice(){
    let carts = this.getCart();
    console.log(carts);
    
    let total :number = 0
    // for( let item of carts){
    //   total += item.quantity * item.price
    // }
    carts.forEach((item :any) => {
      total += item.quantity * item.price
    });
    return total
  }


  // Categories ---------------------------------------------------------
    addCategory(category :ICatePro):Observable<ICatePro>{
      return this.http.post<ICatePro>(`http://localhost:3000/cateProducts`,category)
    }
    getCategory(id :number):Observable<ICatePro>{
      return this.http.get<ICatePro>(`http://localhost:3000/cateProducts/${id}`)
    }
    getAllCate():Observable<ICatePro[]>{
      return this.http.get<ICatePro[]>(`http://localhost:3000/cateProducts`)
    }

    editCate(category :ICatePro):Observable<ICatePro>{
      return this.http.patch<ICatePro>(`http://localhost:3000/cateProducts/${category.id}`,category)
    }

    removeCate(id :any):Observable<ICatePro>{
      return this.http.delete<ICatePro>(`http://localhost:3000/cateProducts/${id}`)
    }
    getCategoryById(id: number): Observable<ICatePro> {
      const url = `http://localhost:3000/categories/${id}`;
      return this.http.get<ICatePro>(url);
    }
  


    // deleteCategoryAndProducts(categoryId: number): Observable<any> {
    //   // Gọi API để xóa danh mục và sản phẩm liên quan
    //   const url = `http://localhost:3000/categories/${categoryId}/delete-with-products`;
    //   return this.http.delete(url);
    // }



  }


