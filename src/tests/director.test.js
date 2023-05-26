const request = require("supertest");
const app = require("../app.js");

let directorId;

test("POST /directors should create director", async () => {
  const director = {
    firstName: "Jhonny",
    lastName: "Deep",
    nationality: "United State",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/retrato-johnny-depp-1591602140.jpg?crop=0.669xw:1.00xh;0.160xw,0&resize=640:*",
    birthday: "1963-06-09",
  };
  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors should get all directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id should updated director", async () => {
  const updatedDirector = {
    firstName: "Jhonny updated",
  };
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(updatedDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedDirector.firstName);
});

test("DELETE /directors/:id should delete director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
