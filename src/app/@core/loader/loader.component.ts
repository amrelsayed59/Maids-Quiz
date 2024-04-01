import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() data: any;

  show: boolean = false;
  private subscription: Subscription;
  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
        this.cdRef.detectChanges(); // trigger change detection
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
