import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { News } from '../interfaces/news';
import { NewsItem } from '../interfaces/newsItem';
import { NewsDataService } from './news-data.service';


describe('NewsdataService', () => {
  let service: NewsDataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(NewsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve news data from the API via GET', () => {
    const newsItem: NewsItem = {
      title: 'test title',
      link: 'test link',
      keywords: [],
      creator: [],
      video_url: '',
      description: '',
      content: '',
      pubDate: '',
      image_url: '',
      source_id: '',
      country: [],
      category: [],
      language: ''
    };

    const newsData: News = {
      status: 'success',
      totalResults: 20000,
      results: [newsItem],
      nextPage: 1
    };

    service.getNewsDataFromAPI(0).subscribe(data => {
      expect(data.totalResults).toBe(20000);
      expect(data.status).toBe('success');
      expect(data.nextPage).toBe(1);
      expect(data).toEqual(newsData);
    });

    const request = httpMock.expectOne('https://newsdata.io/api/1/news?apiKey=pub_7432ccd13d3f1f2612e5cf852b4ed7f55371&language=en&page=0');
    expect(request.request.method).toBe('GET');
    request.flush(newsData);
  });
});
