import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CampaignTeamService } from '../team.service';
import { ApiResponse, UserData } from '@core/interceptors/user.model';
import { LoaderService } from '@core/loader/loader.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  dataList: UserData[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 4; // Number of items per page

  $subs: Subscription[] = [];

  constructor(
    private campaignTeamService: CampaignTeamService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    // to refresh user data
    const sub = this.campaignTeamService.triggerApiCall$.subscribe(
      (cacheData) => {
        this.getOrder(cacheData);
      }
    );
    this.$subs.push(sub);

    this.getOrder(true);
  }

  getOrder(cacheData: boolean = false) {
    this.loaderService.show();

    // Reset dataList$ here only if cacheData is false
    if (!cacheData) this.campaignTeamService.dataList$.next({});

    const sub = this.campaignTeamService
      .getAllData(this.pageSize, this.currentPage)
      .subscribe((result: ApiResponse) => {
        this.loaderService.hide();
        if (result && Object.keys(result).length > 0) {
          this.dataList = result.data;
          this.currentPage = result.page;
          this.pageSize = result.per_page;
          this.totalPages = Math.ceil(result.total / this.pageSize);

          // Cache the result after processing
          this.campaignTeamService.cacheData(result);
        }
      });
    this.$subs.push(sub);
  }

  onPageChange(page: number) {
    this.currentPage = page; // Update currentPage
  }

  ngOnDestroy(): void {
    this.$subs.forEach((sub) => sub.unsubscribe());
  }
}
