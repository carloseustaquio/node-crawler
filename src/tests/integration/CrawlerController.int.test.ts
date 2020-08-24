import request from "supertest"
import app from "../../app"

const endpointUrl = "/crawler/"

describe(endpointUrl, () => {
  describe("POST", () => {
    test("passing valid body", async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({
          search: "cadeado",
          limit: 2
        })

      const body = response.body

      expect(response.status).toBe(200)
      expect(body.length).toBe(2)
      expect(Array.isArray(body)).toBeTruthy()
      expect(typeof body[0].link).toBe("string")
      expect(typeof body[0].name).toBe("string")
      expect(typeof body[0].price).toBe("number")
      expect(body[0].store).toBeDefined()
      expect(body[0].state).toBeDefined()
    })

    test("return 404 if not found", async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({
          search: "aljgçargiunarçoglia",
          limit: 2
        })

      expect(response.status).toBe(500)
    })

  })
})