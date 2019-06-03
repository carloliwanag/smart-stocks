export interface StockList {
  data: ReadonlyArray<Object>; // should fix this
}

export type StockSearchList = ReadonlyArray<StockSearch>;
export type FOIAList = ReadonlyArray<FOIA>;

export interface StockSearch {
  ticker: string;
  company_name: string;
}

export interface StockNamesResult {
  data: StockSearchList;
}

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
