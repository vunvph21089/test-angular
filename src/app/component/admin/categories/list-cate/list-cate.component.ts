// import { Component } from '@angular/core';
// import { ICatePro } from 'src/app/interface/cateProduct';
// import { ServicesService } from 'src/app/services/services.service';
// import { IProduct } from 'src/app/interface/product';
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-list-cate',
//   templateUrl: './list-cate.component.html',
//   styleUrls: ['./list-cate.component.scss']
// })
// export class ListCateComponent {
//  cateList!:ICatePro[] ;
 

//   constructor(
//     private cateService : ServicesService,
//     private route: ActivatedRoute
//   ){
//     this.cateService.getAllCate().subscribe(data => {
//       this.cateList = data
//     })

//   }


//  removeItem(id:number){
//   const confirm = window.confirm('Are you sure you want to remove this item')
//   if(confirm){
//     // this.cateService.deleteProductsByCategoryId(id).subscribe(data => {
//     //   console.log(data);
      
//     // })
    
//     this.cateService.removeCate(id).subscribe(() => {
//       this.cateList = this.cateList.filter(item => item.id !== id)
//     })
//   }
//  }
// }

import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ICatePro } from 'src/app/interface/cateProduct';
import { IProduct } from 'src/app/interface/product';

@Component({
  selector: 'app-list-cate',
  templateUrl: './list-cate.component.html',
  styleUrls: ['./list-cate.component.scss']
})
export class ListCateComponent implements OnInit {
  cateList: ICatePro[] = [];
  productListCateId: IProduct[] = [];

  constructor(private cateService: ServicesService) {}

  ngOnInit() {
    this.cateService.getAllCate().subscribe(data => {
      this.cateList = data;     
    });
  }

  removeItem(id: number) {
    const confirm = window.confirm('Are you sure you want to remove this item?');
    if (confirm) {
      
      if (this.cateList.length > 0) {         
       this.cateService.getProductsByCategoryId(id).subscribe(products => {
          this.productListCateId = products;
          this.productListCateId.forEach(product => {
            this.cateService.deleteProduct(product.id).subscribe();
          });       
        });
      }
      this.cateService.removeCate(id).subscribe(() => {
        this.cateList = this.cateList.filter(item => item.id !== id);
      });
    }

  }
}
