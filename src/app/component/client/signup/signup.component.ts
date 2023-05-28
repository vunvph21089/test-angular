import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userForm = this.formBuilder.group({
    name:[null,[Validators.required]],
    email:[null,[Validators.required]],
    password:[null,[Validators.required]],
    confirmPassword:[null,[Validators.required]]
  })

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router
  ){

  }
  onHanleSubmit(){
    if(this.userForm.valid){
      if(this.userForm.value.confirmPassword !== this.userForm.value.password){
       alert('password ko chugn nhau')
      } else{
        const user :IUser ={
          name:this.userForm.value.name || "",
          email:this.userForm.value.email || "",
          password:this.userForm.value.password || "",
          role: 5
        }
        this.authService.signup(user).subscribe(
          (response) =>{
            console.log('tài khoản này đã đăng kí',response);        
          },
          (error) =>{
            console.error('đã xảy ra lỗi' , error);
            
          }
        )
      }
    
    }
  }
}
