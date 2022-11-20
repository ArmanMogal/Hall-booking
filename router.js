import express from "express";
import uniqid from "uniqid";

const router = express.Router();

let rooms = [];
let roomNo = 100;
let bookings = [];
let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
let time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;

router.get("/", function (request, response) {
  response.status(200).send({
    output: "Homepage",
  });
});

router.get("/getAllRooms", function (request, response) {
  if (rooms.length) {
    response.status(200).send({
      output: rooms,
    });
  } else {
    response.status(200).send({
      message: "No rooms created",
    });
  }
});

// Get All Customers list with Booked Data
router.get("/getAllBookings", function (request, response) {
  if (bookings.length) {
    response.status(200).send({
      output: bookings,
    });
  } else {
    response.status(200).send({
      message: "No bookings available",
    });
  }
});

// Get All Rooms list with Booked Data
router.get("/getRoomBookings", function (request, response) {
  if (rooms.length) {
    const roomsList = rooms.map((room) => ({
      roomNo: room.roomNo,
      bookings: room.bookings,
    }));
    response.status(200).send({
      output: roomsList,
    });
  } else {
    response.status(200).send({
      message: "No rooms created",
    });
  }
});

router.post("/createRoom", function (request, response) {
    let room = {};
    room.id = uniqid();
    room.roomNo = roomNo;
    room.bookings = [];
    let isCorrect = true;
  
    if (request.body.noSeats) {
      if (!Number.isInteger(request.body.noSeats)) {
        response
          .status(400)
          .send({ output: "Enter only integer values for Number of Seats" });
        isCorrect = false;
        return;
      }
    } else {
      response
        .status(400)
        .send({ output: "Please specify No of seats for Room" });
      isCorrect = false;
      return;
    }
    if (request.body.amenities) {
      if (!Array.isArray(request.body.amenities)) {
        response
          .status(400)
          .send({ output: "Amenities list accepts only array of strings" });
        isCorrect = false;
        return;
      }
    } else {
      response.status(400).send({
        output: "Please specify all Amenities for Room in Array format",
      });
      isCorrect = false;
      return;
    }
    if (request.body.pricePerHour) {
      if (isNaN(request.body.pricePerHour)) {
        response
          .status(400)
          .send({ output: "Enter only digits for Price per Hour" });
        isCorrect = false;
        return;
      }
    } else {
      response
        .status(400)
        .send({ output: "Please specify price per hour for Room" });
      isCorrect = false;
      return;
    }
  
    if (isCorrect) {
      room.noSeats = request.body.noSeats;
      room.amenities = request.body.amenities;
      room.pricePerHour = request.body.pricePerHour;
      rooms.push(room);
      roomNo++;
      response.status(200).send({ output: "Room Created Successfully" });
    }
  });

export const hallRouter = router;