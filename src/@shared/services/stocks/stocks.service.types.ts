export interface StockList {
  data: ReadonlyArray<Object>; // should fix this
}

export interface StockNamesResult {
  data: StockSearchList;
}
export interface StockSearch {
  ticker: string;
  company_name: string;
}
export type StockSearchList = ReadonlyArray<StockSearch>;

export interface FOIAResult {
  data: FOIAList;
}
export interface FOIA {
  companyname?: string;
  receiveddate: string;
  requestdescription: string;
  requestername: string;
  requestid: string;
}
export type FOIAList = ReadonlyArray<FOIA>;

export interface StockNewsResult {
  TOP_NEWS: ReadonlyArray<string>;
}
export interface StockNews {
  date: string;
  title: string;
  url: string;
}
export type StockNewsList = ReadonlyArray<StockNews>;

export interface StockSentimentResult {
  data: StockSentiments;
}

export interface StockSentiments {
  news_sentiment: ReadonlyArray<StockSentiment>;
  special_sentiment_102: ReadonlyArray<StockSentiment>;
  general_sentiment: ReadonlyArray<StockSentiment>;
}

export interface StockSentiment {
  date: string;
  overall_sentiment: number;
}

export interface StockDetailSearch {
  symbol: string;
  date: string;
}

export interface StockWordCloudResult {
  data: StockWordCloud;
}

export interface StockWordCloud {
  [key: string]: string;
}


export interface EventsMap {
  category: string,
  city: string,
  from: string,
  isp: string,
  lat: number,
  organizationName: string,
  metroCode: string,
  website: string,
  bio: string,
  timezone: string,
  phone: string,
  flag: string,
  facebook: string,
  companyName: string,
  ip: string,
  date: string,
  compName: string,
  organizationUrl: string,
  googlePlus: string,
  country: string,
  symbol: string,
  address: string,
  youtube: string,
  logoUrl: string,
  lon: number,
  time: string,
  organization: string,
  resolution:string,
  browser: string,
  domain: string,
  twitter: string,
  accuracyRadius: number,
  postalCode: string,
  os: string,
  continent: string
}
