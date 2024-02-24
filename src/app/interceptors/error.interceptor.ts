import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {SnackbarService} from "../services/snackbar.service";
import {catchError} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";

let snackbarService: SnackbarService;
let router: Router;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    snackbarService = inject(SnackbarService);
    router = inject(Router);


  return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch(error.status) {
          case 400:
            console.log(error.error.message);
            snackbarService.showError(error.error.message)
            break;
          case 401:
            snackbarService.showError(error.error.message);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            snackbarService.showError("Something unexpected went wrong");
            console.log(error);
            break;
        }
        throw error;
      })
  )
};
