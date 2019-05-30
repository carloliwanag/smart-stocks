export interface StockList {
  data: ReadonlyArray<Object>; // should fix this
}

export type StockNamesList = ReadonlyArray<StockNames>;

export interface StockNames {
  ticker: string;
  company_name: string;
}

export interface StockNamesResult {
  data: StockNamesList;
}
