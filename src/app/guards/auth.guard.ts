import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toaster = inject(MatSnackBar);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        toaster.open('You Shall Not Pass!! 🧙 ...unless you log in', 'Close', {
          duration: 3500,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        return false;
      }
    })
  )
};
