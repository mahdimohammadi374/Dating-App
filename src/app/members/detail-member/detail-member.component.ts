import { IMember } from './../../_models/member';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { IUser } from 'src/app/_models/account.models';
import { IMessage } from 'src/app/_models/message';
import { AccountService } from 'src/app/_services/account.service';

import { MemberService } from 'src/app/_services/member.service';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-detail-member',
  templateUrl: './detail-member.component.html',
  styleUrls: ['./detail-member.component.css'],
})
export class DetailMemberComponent implements OnInit {
  member!: IMember;
  galleryOptions: NgxGalleryOptions[] = [];
  gallryImages: NgxGalleryImage[] = [];
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  activeTab: TabDirective;
  tabId = 0;
  currentUser: IUser | null;
  constructor(
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private accountService: AccountService,
    private router: Router
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        this.currentUser = response;
      },
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadOptions();
    this.route.queryParams.subscribe((params) => {
      this.tabId = +params['tabs'] ?? 0;
      if (params['tabs']) {
        this.selectedTab(this.tabId);
      }
    });
  }

  selectedTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  loadMember() {
    this.member = this.route.snapshot.data['member'];
    this.gallryImages = this.getImages();
  }

  //privates
  private loadOptions() {
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  private getImages() {
    const images: NgxGalleryImage[] = [];
    this.member.photos.forEach((item) => {
      images.push({
        big: item.url,
        medium: item.url,
        small: item.url,
      });
    });
    return images;
  }
  onTabChange(tab: TabDirective) {
    this.activeTab = tab;
    if (this.activeTab.heading == 'Messages') {
      this.messageService.createHubConnection(
        this.currentUser!,
        this.member.userName
      );
      // this.loadMessageThread();
    } else {
      this.messageService.stopHubConnection();
    }
  }
}
