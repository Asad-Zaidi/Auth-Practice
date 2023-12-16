const express = require('express');

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": { "firstName": "John", "lastName": "Doe", "DOB": "22-12-1990" },
  "annasmith@gamil.com": { "firstName": "Anna", "lastName": "smith", "DOB": "02-07-1983" },
  "peterjones@gamil.com": { "firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989" }
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  let email = req.params.email;
  // res.send(JSON.stringify(friends[email],null,4));
  res.send(friends[email])
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  if (req.body.email) {
    friends[req.body.email] = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "DOB": req.body.DOB
    }
  }
  res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});

router.put("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email]
  if (friend) {
    let DOB = req.body.DOB;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    if (DOB) {
      friend["DOB"] = DOB
    }
    if (firstName) {
      friend["firstName"] = firstName
    }
    if (lastName) {
      friend["lastName"] = lastName
    }
    friends[email] = friend;
    res.send(`Friend with the email ${email} updated.`);
  }
  else {
    res.send("Unable to find friend!");
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if (friends[email]) {
    delete friends[email];
    res.send(`Friend with the email ${email} deleted.`);
  }
  else {
    res.send("Unable to find friend!");
  }
});

module.exports = router;
