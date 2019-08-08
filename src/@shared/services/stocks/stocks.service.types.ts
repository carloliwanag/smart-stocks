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

export interface EventsMapResult {
  data: EventsMapResultObject;
}

export interface EventsMapResultObject {
  result: EventsMapList;
}

export type EventsMapList = ReadonlyArray<EventsMap>;

// export interface EventsMap {
//   category: string;
//   city: string;
//   from: string;
//   isp: string;
//   lat: string;
//   organizationName: string;
//   metroCode: string;
//   website: string;
//   bio: string;
//   timezone: string;
//   phone: string;
//   flag: string;
//   facebook: string;
//   companyName: string;
//   ip: string;
//   date: string;
//   compName: string;
//   organizationUrl: string;
//   googlePlus: string;
//   country: string;
//   symbol: string;
//   address: string;
//   youtube: string;
//   logoUrl: string;
//   lon: string;
//   time: string;
//   organization: string;
//   resolution: string;
//   browser: string;
//   domain: string;
//   twitter: string;
//   accuracyRadius: number;
//   postalCode: string;
//   os: string;
//   continent: string;
//   Latitude: string;
//   Longitude: string;
// }

export interface EventsMap {
  "Acuracy radius": string;
  Address: string;
  Bio: string;
  Browser: string;
  Category: string;
  City: string;
  "Company Name": string;
  Continent: string;
  Country: string;
  Date: string;
  Domain: string;
  Facebook?: string;
  Flag: string;
  From: string;
  "Google+"?: string;
  IP: string;
  ISP: string;
  Latitude: string;
  "Logo URL": string;
  Longitude: string;
  "Metro code": string;
  OS: string;
  Organization: string;
  "Organization Name": string;
  "Organization URL": string;
  Phone: string;
  "Postal code": string;
  Resolution: string;
  Time: string;
  "Time zone": string;
  Twitter?: string;
  Website?: string;
  Youtube?: string;
  company_name: string;
  symbol: string;
}

export type ChatterVolumeList = ReadonlyArray<ChatterVolume>;

export interface ChatterVolume {
  date: string;
  total_likes: number;
  total_retweets: number;
}

export interface ContactResult {
  data: Contact;
}

export interface Contact {
  "Exec Name"?: string;
  "Email 2"?: string;
  "Email 1"?: string;
  "Mkt Cap"?: string;
  Website?: string;
  Description?: string;
  Exchange?: string;
  Symbol?: string;
  source?: string;
  Link?: string;
  Address?: string;
  "Exec Last Name"?: string;
  "Exec Middle Name"?: string;
  Name?: string;
  Industry?: string;
  Sector?: string;
  ExecTitle?: string;
  "Exec First Name"?: string;
  "Exec Salutation"?: string;
  Telephone?: string;
  "Exec Pay"?: string;
  cap_type?: string;
}
