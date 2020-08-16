export default interface Page {
  crawlerRun($: CheerioSelector, url?: string): any
}