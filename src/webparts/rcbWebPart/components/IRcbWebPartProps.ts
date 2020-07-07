import {SPHttpClient} from "@microsoft/sp-http";
export interface IRcbWebPartProps {
  description: string;
  spHttpClient:SPHttpClient;
  siteUrl:string;
}
