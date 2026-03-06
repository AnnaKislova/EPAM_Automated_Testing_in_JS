import { testData } from "../data/bookingData";

let token;
let bookingId;

test("Create token", async () => {
  const response = await fetch(`${testData.baseUrl}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin",
      password: "password123"
    })
  });

  const body = await response.json();
  token = body.token;

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(body.token).toBeDefined();

});

test("Create booking", async () => {
  const response = await fetch(`${testData.baseUrl}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`
    },
    body: JSON.stringify(testData.bookingData)
  });

  const body = await response.json();
  bookingId = body.bookingid;

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(body.bookingid).toBeDefined();
  expect(typeof body.bookingid).toBe("number");
  expect(typeof body.booking).toBe("object");
  expect(body.booking.firstname).toBe(testData.bookingData.firstname);
  expect(body.booking.lastname).toBe(testData.bookingData.lastname);
   
});

test("Get booking by ID", async () => {
  const response = await fetch(`${testData.baseUrl}/booking/${bookingId}`, {
    method: "GET",
    headers: {"Cookie": `token=${token}`},
  });

  const body = await response.json();
  
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(typeof body).toBe("object");
  expect(body.firstname).toBe(testData.bookingData.firstname);
  expect(body.lastname).toBe(testData.bookingData.lastname);

});

test("Update booking", async () => {
  const response = await fetch(`${testData.baseUrl}/booking/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`
    },
    body: JSON.stringify(testData.updatedBookingData)
  });

  const body = await response.json();
  
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(typeof body).toBe("object");
  expect(body).toEqual(testData.updatedBookingData);

});  

test("Delete booking", async () => {
  const response = await fetch(`${testData.baseUrl}/booking/${bookingId}`, {
    method: "DELETE",
    headers: { "Cookie": `token=${token}`},
  });

  const body = await response.text();
  
  expect(response.status).toBe(201);
  expect(body).toBe("Created");

  const responseGet = await fetch(`${testData.baseUrl}/booking/${bookingId}`, {
    method: "GET",
    headers: { "Cookie": `token=${token}`},
  });

  const bodyGet = await responseGet.text();
  
  expect(responseGet.status).toBe(404);
  expect(bodyGet).toContain("Not Found");

});
