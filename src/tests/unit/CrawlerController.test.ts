import * as CrawlerController from "../../Controllers/CrawlerController"
import Crawler from "../../models/Crawler"
import MLProduct from "../../models/MLProduct"
import MLProductList from "../../models/MLProductList"
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http"
// mock data
import bodyWithoutSearch from "../mockData/bodyWithNoSearch.json"

jest.mock("../../models/Crawler")

let req: MockRequest<any>, res: MockResponse<any>, next: jest.Mock

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe("CrawlerController.index", () => {
  it("should throw error if search is not defined", async () => {
    req.body = bodyWithoutSearch
    await CrawlerController.index(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})