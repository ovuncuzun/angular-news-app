import { NewsItem } from "./newsItem";

export interface News {
    status: string;
    totalResults: number;
    results: NewsItem[];
    nextPage: number;
}
