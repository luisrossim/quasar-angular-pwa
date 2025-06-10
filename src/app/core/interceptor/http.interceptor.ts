import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { tap } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastService = inject(ToastService);

  setTimeout(() => loadingService.setLoading(true), 0);

  // req = req.clone({
  //   withCredentials: true
  // });

  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        loadingService.setLoading(false);
        if (error.status === 403) {
          toastService.error403();
        }
      },
      complete: () => {
        loadingService.setLoading(false);
      },
    })
  );
};
