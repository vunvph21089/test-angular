import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ICatePro } from 'src/app/interface/cateProduct';

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.scss']
})
export class AddCateComponent {
formCate = this.FormBuilder.group({
  name:["", [Validators.required, Validators.minLength(3)]]
})
  constructor(
    private CateService: ServicesService,
    private FormBuilder:FormBuilder,
    private NextPage :Router
  ){

  }

  onHandleAdd(){
    if(this.formCate.valid){
      const category :ICatePro ={
        name: this.formCate.value.name || "",
      }
      this.CateService.addCategory(category).subscribe((data) =>{
        console.log(data);
        alert("them thanh cong")
        this.NextPage.navigate(["/admin/category"])
      })
    }
  }
}
