import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {NavComponent} from "./components/nav/nav.component";
import {AccountService} from "./services/account.service";
import {User} from "./models/user";
import {HomeComponent} from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'SwipeScript';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
