import {Component, Input} from '@angular/core';
import {Member} from "../../../models/member";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {

  @Input() member: Member | undefined;
}
