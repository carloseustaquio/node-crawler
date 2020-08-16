import Page from "./Page"

export default interface ProductPage extends Page {
  link: string
  name: string
  price: number
  store: string | null
  state: string | null
}