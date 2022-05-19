import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './news.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewsDataService } from 'src/app/services/news-data.service';
import { delay, of } from 'rxjs';
import { NewsItem } from 'src/app/interfaces/newsItem';
import { News } from 'src/app/interfaces/news';

const mockNewsItem: NewsItem = {
  title: 'Mock Title',
  link: '',
  keywords: [],
  creator: [],
  video_url: '',
  description: 'Mock Description',
  content: '',
  pubDate: '',
  image_url: '',
  source_id: '',
  country: [],
  category: [],
  language: ''
};

const mockNewsData: News = {
  status: 'success',
  totalResults: 20000,
  results: [mockNewsItem],
  nextPage: 1
};


describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let service: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    service = TestBed.inject(NewsDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNewsData and get response', fakeAsync(() => {

    spyOn(service, "getNewsDataFromAPI").and.callFake(() => {
      return of(mockNewsData).pipe(delay(2000));
    });

    component.getNewsData(false);
    tick(1000);
    expect(component.isLoading).toEqual(true);
    tick(1000);
    expect(component.isLoading).toEqual(false);
    expect(component.newsData).toEqual(mockNewsData);
  }));

  it('should render news card details successfully', fakeAsync(() => {
    component.newsData = mockNewsData;
    fixture.detectChanges();
    let matCardTitle = fixture.nativeElement.querySelector('mat-card-title');
    expect(matCardTitle.textContent).toContain('Mock Title');

    let matCardContent = fixture.nativeElement.querySelector('mat-card-content');
    expect(matCardContent.textContent).toContain('Mock Description');
  }));

  it('should call the getNewsDataFromAPI function every 10 seconds', fakeAsync(() => {
    const spy = spyOn(service, "getNewsDataFromAPI").and.callFake(() => {
      return of(mockNewsData);
    });
    component.loadNewsData();
    expect(spy).toHaveBeenCalledTimes(1);
    tick(10000)
    expect(spy).toHaveBeenCalledTimes(2);
    discardPeriodicTasks();
  }));
});


