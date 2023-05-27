import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ICatePro } from 'src/app/interface/cateProduct';

@Component({
  selector: 'app-edit-cate',
  templateUrl: './edit-cate.component.html',
  styleUrls: ['./edit-cate.component.scss']
})
export class EditCateComponent {
  category!: ICatePro;
  cateForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor(
    private CateService: ServicesService,
    private formBuilder: FormBuilder,  // Đổi tên biến FormBuilder thành formBuilder
    private route: ActivatedRoute,  // Đổi tên biến router thành route
    private router: Router,  // Đổi tên biến NextPage thành router
  ) {
  
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.CateService.getCategory(id).subscribe(data => {
        this.category = data;
        this.cateForm.patchValue({
          name: data.name,
        });
      });
    });
  }

  onHandleEdit() {
    if(this.cateForm.valid){
      const newCategory : ICatePro = {
        id:this.category.id,
        name:this.cateForm.value.name || "",      
      }
      this.CateService.editCate(newCategory).subscribe(category =>{
        console.log(category);
        this.router.navigate(['/admin/category'])
      })
    }
  }
}



