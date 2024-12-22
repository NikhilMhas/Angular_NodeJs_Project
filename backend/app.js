
    require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io"); 

const app = express();


const server = http.createServer(app);


const io = socketIo(server);


app.use(express.static('public'));  


app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('welcome', { message: 'Welcome to the real-time communication app!' });

    socket.on('message-from-client', (data) => {
        console.log('Message from client:', data);
   
        socket.emit('message-from-server', { message: 'Message received on the server' });
    });

  
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Define routes
const authRouter = require('./routes/authRoute');
const projectRouter = require('./routes/projectRoute');

app.get("/", (req, res) => {
  res.status(200).json({
    status: 'success',
    message: "Rest API is working",
  });
});

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects/', projectRouter);

app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Route Not Found",
    });
});

const PORT = process.env.APP_PORT;
server.listen(PORT, () => {
    console.log("Server is running at", PORT);
});
