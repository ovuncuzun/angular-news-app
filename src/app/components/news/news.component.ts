import { Component, OnInit } from '@angular/core';
import { NewsDataService } from 'src/app/services/news-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsData: any;
  pageIndex: number = 0;
  isLoading: boolean = false;

  constructor(private newsDataService: NewsDataService) { }

  ngOnInit(): void {
    this.loadNewsData();
  }

  loadNewsData() {
    this.getNewsData(false);
  }

  getNewsData(isNextPage: boolean) {
    this.isLoading = true;
    this.newsDataService.getNewsDataFromAPI(this.pageIndex).subscribe(data => {
      this.newsData = data;
      this.isLoading = false;
      console.log(data);
    })
  }

  loadNextPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.getNewsData(true);
  }

}
