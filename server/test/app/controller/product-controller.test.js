const request = require('supertest')
const dbHandler = require('../db-handler');
beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


const payloads = require('./payloads')

describe('Check product endpoints', () => {
  const app = require('../../../src/app');

  // should create a product and get by id successfully
  it.only('should create a product and get by id successfully', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        "productName": "Black Berry",
        "sku": "black-berry",
        "cost": 10,
        "price": 20
      })
    expect(res.statusCode).toEqual(201)
    console.log(res.body);
    expect(res.body).not.toBeNull();
    expect(res.body.length).toEqual(24);
    const id = res.body;

    const res2 = await request(app)
      .get('/api/products/' + id);
    expect(res2.statusCode).toEqual(200)
    expect(res2.body.productName).toEqual("Black Berry");
    expect(res2.body.sku).toEqual("black-berry");
    expect(res2.body.cost).toEqual(10);
    expect(res2.body.price).toEqual(20);
    expect(res2.body._id).toEqual(id);
  })

  it('should return the result', async () => {
    const res = await request(app)
      .post('/api/products/search')
      .send({ searchText: '' })
    expect(res.statusCode).toEqual(200)
    console.log(res.body);
    expect(res.body).toEqual([]);
  })

  // should create 3 products and search by text successfully
  it('should create 3 products and search by text successfully', async () => {
    const res = await request(app)
      .post('/api/products')
      .send(payloads.product1)
    expect(res.statusCode).toEqual(201)
    console.log(res.body);
    expect(res.body).not.toBeNull();
    expect(res.body.length).toEqual(24);
    const id1 = res.body;
    const res2 = await request(app)
      .post('/api/products')
      .send(payloads.product2)
    expect(res2.statusCode).toEqual(201)
    console.log(res2.body);
    expect(res2.body).not.toBeNull();
    expect(res2.body.length).toEqual(24);
    const id2 = res2.body;
    const res3 = await request(app)
      .post('/api/products')
      .send(payloads.product3)
    expect(res3.statusCode).toEqual(201)
    console.log(res3.body);
    expect(res3.body).not.toBeNull();
    expect(res3.body.length).toEqual(24);
    const id3 = res3.body;
    const res4 = await request(app)
      .post('/api/products/search')
      .send({ searchText: 'Black' })
    expect(res4.statusCode).toEqual(200)
    console.log(res4.body);
    expect(res4.body).not.toBeNull();
    expect(res4.body.length).toEqual(3);
    expect(res4.body[0].productName).toEqual("BlackBerry");
    expect(res4.body[0].sku).toEqual("blackberry");
    expect(res4.body[0].cost).toEqual(10);
    expect(res4.body[0].price).toEqual(20);
    expect(res4.body[0]._id).toEqual(id1);
    expect(res4.body[1].productName).toEqual("BlackBerry");
    expect(res4.body[1].sku).toEqual("blackberry");
    expect(res4.body[1].cost).toEqual(10);
    expect(res4.body[1].price).toEqual(20);
    expect(res4.body[1]._id).toEqual(id2);
    expect(res4.body[2].productName).toEqual("BlackBerry");
    expect(res4.body[2].sku).toEqual("blackberry");
    expect(res4.body[2].cost).toEqual(10);
    expect(res4.body[2].price).toEqual(20);
    expect(res4.body[2]._id).toEqual(id3);

    // search product
    const res5 = await request(app)
      .post('/api/products/search')
      .send({ searchText: 'Black' })
    expect(res5.statusCode).toEqual(200)
    console.log(res5.body);
    expect(res5.body).not.toBeNull();
    expect(res5.body.length).toEqual(3);
    expect(res5.body[0].productName).toEqual("BlackBerry");

  });




  it('should should return validation error if "productName" is missing', async () => {
    const res = await request(app)
      .post('/api/products')
      .send(payloads.missingNamePayload)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('"productName" is not allowed to be empty')
  })
})