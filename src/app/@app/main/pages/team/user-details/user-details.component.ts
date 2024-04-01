import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CampaignTeamService } from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '@core/interceptors/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  orderId: number;
  data: UserData;

  $subs: Subscription[] = [];

  constructor(
    private campaignTeamService: CampaignTeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderId = this.route.snapshot.params?.id;
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    const sub = this.campaignTeamService
      .viewUserDetails(this.orderId)
      .subscribe((result) => {
        this.data = result.data;
      });
    this.$subs.push(sub);
  }

  navigateBack() {
    this.router.navigate(['campaign/teams/users']);
  }

  ngOnDestroy(): void {
    this.$subs.forEach((sub) => sub.unsubscribe());
  }
}
