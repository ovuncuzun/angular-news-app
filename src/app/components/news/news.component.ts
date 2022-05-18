import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { News } from 'src/app/interfaces/news';
import { NewsDataService } from 'src/app/services/news-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsData: News | undefined;
  pageIndex: number = 0;
  isLoading: boolean = false;
  subscription: Subscription | undefined;

  constructor(private newsDataService: NewsDataService) { }

  ngOnInit(): void {
    this.loadNewsData();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadNewsData() {
    this.getNewsData(false);

    setInterval(() => {
      this.getNewsData(false);
    }, 10000);
  }

  getNewsData(isNextPage: boolean) {
    this.isLoading = true;
    this.subscription = this.newsDataService.getNewsDataFromAPI(this.pageIndex).subscribe(data => {
      this.newsData = data;
      this.isLoading = false;
      if (isNextPage) {
        this.scrollToTop();
      }
    })
  }

  loadNextPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.getNewsData(true);
  }

  navigateByURL(link: any) {
    window.open(link);
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
