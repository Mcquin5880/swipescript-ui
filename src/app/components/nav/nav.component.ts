import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {LoginRequest} from "../../model/LoginRequest";
import {LoginResponse} from "../../model/LoginResponse";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatToolbar,
    MatAnchor,
    MatButton
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  loginRequest: LoginRequest = { username: '', password: '' };
  loginResponse: LoginResponse = { message: '' };
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.loginRequest).subscribe({
      next: response => {
        console.log(response.message);
        this.loggedIn = true;
      },
      error: error => console.log(error.error.message)
    });
  }
}
