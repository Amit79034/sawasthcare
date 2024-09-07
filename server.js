const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const app = express();

// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, images)
app.use(express.static(__dirname + "/public"));

// Connect to MongoDB using mongoose
mongoose
  .connect("mongodb://localhost:27017/swasthcare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Create a schema for user details
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["patient", "staff"] },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

// Handle signup POST request
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();
    res.send(
      '<h1>Signup Successful</h1><p>You can now <a href="/login.html">login</a></p>'
    );
  } catch (err) {
    console.log(err);
    res.send(
      "<h1>Signup Failed</h1><p>There was an issue with your signup. Please try again.</p>"
    );
  }
});
// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, images)
app.use(express.static(__dirname + "/public"));

// Connect to MongoDB using mongoose

// Serve the login page
app.get("/signup", async (req, res) => {
  try {
    const user = User.create({ email, password });
  } catch (error) {}
});

// Handle login POST request
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  // Find a user by email, password, and role
  User.findOne({ email, password, role }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.send(
        `<h1>Welcome ${role}!</h1><p>You have successfully logged in.</p>`
      );
    } else {
      res.send("<h1>Login failed</h1><p>Invalid credentials</p>");
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
