import {Component, OnInit} from '@angular/core';
import {Member} from "../../../models/member";
import {MembersService} from "../../../services/members.service";
import {NgForOf} from "@angular/common";
import {MemberCardComponent} from "../member-card/member-card.component";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    NgForOf,
    MemberCardComponent,
    MatGridListModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  members: Member[] = []

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: members => this.members = members
    });
  }
}
