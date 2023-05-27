import { Component } from '@angular/core';
import { ActivatedRoute , Router  } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ServicesService } from 'src/app/services/services.service';
import {FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  
  product!: IProduct

  productForm = this.formBuilder.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    ProductCateID:[0,[Validators.required]],
    img:['',[Validators.required, Validators.minLength(3)]],
    price:[0,[]]
  })

  constructor(
    private ServicesService :ServicesService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private redirect: Router
  ){
    this.router.paramMap.subscribe(param =>{
      const id = Number(param.get('id'));
      this.ServicesService.getProductById(id).subscribe(product =>{
        this.product = product
        this.productForm.patchValue({
          name: product.name,
          ProductCateID: product.ProductCateID,
          img: product.img,
          price: product.price        
        })
      })
    })


    this.getDataCate()
  }
  onHandleUpdate(){
    if(this.productForm.valid){
      const newProduct : IProduct = {
        id:this.product.id,
        name:this.productForm.value.name || "",
        ProductCateID:this.productForm.value.ProductCateID || 0,
        img:this.productForm.value.img || "",
        price:this.productForm.value.price || 0
        
      }
      this.ServicesService.editProduct(newProduct).subscribe(product =>{
        alert('sua thanh cong')
        this.redirect.navigate(['/admin/product'])
      })
    }
  }


  ProductCateID!:any
  getDataCate(){
    this.ServicesService.getAllCate().subscribe(data => {
      this.ProductCateID = data
    })
  }
}