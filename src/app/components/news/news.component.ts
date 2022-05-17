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

  constructor(private newsDataService: NewsDataService) { }

  ngOnInit(): void {
    this.loadNewsData();
  }

  loadNewsData() {
    this.getNewsData(false);
  }

  getNewsData(isNextPage: boolean) {
    this.newsDataService.getNewsDataFromAPI(this.pageIndex).subscribe(data => {
      this.newsData = data;
      console.log(data);
    })
  }

  loadNextPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.getNewsData(true);
  }

}
