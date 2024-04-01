import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignTeamService } from '@app/main/pages/team/team.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class CardComponent {
  @Input() dataList: any;
  @Input() currentPage: number;
  @Input() totalPages: number;

  @Output() currentPageChange = new EventEmitter<number>(); // Emit updated currentPage

  constructor(
    private router: Router,
    private campaignTeamService: CampaignTeamService
  ) {}

  routeToDetails(id: string) {
    this.router.navigate([`campaign/teams/user-details/${id}`]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
      this.campaignTeamService.triggerApiCall$.next(false);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
      this.campaignTeamService.triggerApiCall$.next(false);
    }
  }
}
