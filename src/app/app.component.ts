import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {NavComponent} from "./components/nav/nav.component";
import {AccountService} from "./services/account.service";
import {User} from "./models/User";
import {HomeComponent} from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'flirtmoji-ui';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get('http://localhost:8080/api/v1/users').subscribe(data => {
      this.users = data;
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
