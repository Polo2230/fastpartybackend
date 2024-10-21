const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const moongose = require("mongoose");
const eventRoutes = require("./routes/event.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const imageRoutes = require("./routes/image.route");
const ticketRoutes = require("./routes/ticket.route");

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/tickets', ticketRoutes);



moongose
  .connect(
    "mongodb+srv://fastpartyco:GQINzUpnZ5JmqFNC@cluster0.iiyma.mongodb.net/fastparty?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });
