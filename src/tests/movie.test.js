const request = require("supertest");
const app = require("../app.js");
const Actor = require("../models/Actor.js");
const Director = require("../models/Director.js");
const Genre = require("../models/Genre.js");
require("../models");

let movieId;

test("POST /movies should create movie", async () => {
  const movie = {
    name: "Piratas del Caribe",
    image:
      "https://pics.filmaffinity.com/Piratas_del_Caribe_La_maldiciaon_de_la_Perla_Negra-627724446-large.jpg",
    synopsis:
      "El capitán Barbossa le roba el barco al pirata Jack Sparrow y secuestra a Elizabeth, amiga de Will Turner. Barbossa y su tripulación son víctimas de un conjuro que los condena a vivir eternamente y a transformarse cada noche en esqueletos vivientes.",
    releaseYear: 2003,
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies should get all movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
});

test("PUT /movies/:id should updated movie", async () => {
  const updatedMovie = {
    name: "Piratas del Caribe updated",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(updatedMovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedMovie.name);
});

test("POST /movies/:id/actors should set actors to movie", async () => {
  const actor = await Actor.create({
    firstName: "Jonny",
    lastName: "Deep",
    nationality: "United State",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/retrato-johnny-depp-1591602140.jpg?crop=0.669xw:1.00xh;0.160xw,0&resize=640:*",
    birthday: "1963-06-09",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /:id/directors should set directors to movie", async () => {
  const director = await Director.create({
    firstName: "Jhonny",
    lastName: "Deep",
    nationality: "United State",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/retrato-johnny-depp-1591602140.jpg?crop=0.669xw:1.00xh;0.160xw,0&resize=640:*",
    birthday: "1963-06-09",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /:id/genres should set genres to movie", async () => {
  const genre = await Genre.create({
    name: "Action",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delete movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
