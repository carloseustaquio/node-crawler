import * as CrawlerController from "../../Controllers/CrawlerController"
import MLProduct from "../../models/MLProduct"
import MLProductList from "../../models/MLProductList"
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http"
// mock data
import bodyWithoutSearch from "../mockData/bodyWithNoSearch.json"

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

  it("number of returns in body should be the same asked in limit", async () => {
    req.body = { search: "produto", limit: 2 }
    await CrawlerController.index(req, res, next)
    expect(res._getJSONData().length).toBe(2)
    expect(res._isEndCalled()).toBeTruthy()
  })
})