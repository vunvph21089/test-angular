import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  userForm = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  onHanleSubmit() {
    if (this.userForm.valid) {
      const user: IUser = {
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
      };
      this.authService.signin(user).subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000);
        }
      );
    }
  }
}
