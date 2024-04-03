import { HttpInterceptorFn } from '@angular/common/http';
import { StorageKeyEnum } from '../enums/storage-key.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem(StorageKeyEnum.Token);

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next(authReq);
  }

  return next(req);
};
