const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Response Message types"
  interface ResponseMessage {
    success: Boolean!
    message: String!
  }

  type Error {
    fieldName: String!
    message: String!
  }

  type User {
    id: ID!
    email: String!
    avatar: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    publisher: String!
    category: String!
    cover: String!
    rating: Float!
    price: Float!
    description: String!
  }

  type OrderItem {
    title: String!
    quantity: Int!
  }

  type Order {
    orderID: String!
    items: [OrderItem!]
    createdAt: String!
    method: String!
    total: String!
    status: String!
  }

  type RegisterResponse implements ResponseMessage {
    success: Boolean!
    message: String!
    errors: [Error!]
  }

  type LoginResponse implements ResponseMessage {
    success: Boolean!
    message: String!
    errors: [Error!]
    access_token: String
    refresh_token: String
    user: User
  }

  type RefreshResponse implements ResponseMessage {
    success: Boolean!
    message: String!
    access_token: String
    user: User
  }

  type FeaturedBooksReponse {
    success: Boolean!
    books: [Book!]
  }

  type SingleBookResponse {
    success: Boolean!
    bookDetails: Book!
  }

  type HeroBooksResponse {
    success: Boolean!
    heroBooks: [Book!]
  }

  type CreateCheckoutSessionResponse {
    sessionUrl: String!
  }

  type OrderDetailsResponse {
    success: Boolean!
    message: String!
    orderID: String
  }

  type AllOrdersResponse {
    success: Boolean!
    orders: [Order!]
  }

  type PaypalCheckoutResponse {
    success: Boolean!
    message: String!
  }

  type LogoutResponse {
    success: Boolean!
    message: String!
  }

  type SearchBooksResponse {
    success: Boolean!
    books: [Book!]
  }

  "Input types"
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input Product {
    id: ID
    title: String
    author: String
    publisher: String
    category: String
    cover: String
    rating: Float
    price: Float
    description: String
    quantity: Int
  }

  input OrderDetailsInput {
    sessionID: String!
    userID: ID!
  }

  "Query type endpoints"
  type Query {
    demo: String!
    refreshToken: RefreshResponse!
    logOutUser: LogoutResponse!
    featuredBooks(catName: String!): FeaturedBooksReponse!
    singleBook(bookID: ID!): SingleBookResponse!
    heroBooks: HeroBooksResponse!
    orderDetails(orderDetailsInput: OrderDetailsInput): OrderDetailsResponse!
    allOrders(userID: String!): AllOrdersResponse!
    searchBooks(query: String!): SearchBooksResponse!
  }

  "Mutation type endpoints"
  type Mutation {
    "Register a new account"
    registerAccount(registerInput: RegisterInput): RegisterResponse!
    "Log the user in and return the access token as the response"
    loginUser(loginInput: LoginInput): LoginResponse!
    createCheckoutSession(
      createCheckoutSessionInput: [Product!]!
    ): CreateCheckoutSessionResponse!
    paypalCheckout(order: String!, userID: String!): PaypalCheckoutResponse!
  }
`;

module.exports = typeDefs;
