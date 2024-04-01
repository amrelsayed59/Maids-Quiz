import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '@core/services';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignTeamService {

  dataList$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  triggerApiCall$ = new Subject<boolean>();


  constructor(private globalService: GlobalService) {}

  getAllData(per_page?: number, page?: number) {
    if (this.dataList$.value?.data?.length > 0) return this.dataList$;
    
    let params = new HttpParams();
    if (per_page) params = params.set('per_page', per_page);
    if (page) params = params.set('page', page);
    return this.globalService.get(`https://reqres.in/api/users`, params);
  }

  cacheData(data: any) {
    if (!this.dataList$.value?.data?.length || this.dataList$.value !== data) {
      this.dataList$.next(data);
    }
  }

  viewUserDetails(id: number) {
    return this.globalService.get(`https://reqres.in/api/users/${id}`);
  }
}
