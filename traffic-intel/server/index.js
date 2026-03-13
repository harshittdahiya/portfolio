import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const incidents = [
  {
    id: 1,
    title: 'Minor collision near campus gate',
    location: 'University Road',
    description: 'Two cars collided. No serious injuries reported.',
    severity: 'Low',
    time: '2025-03-14T09:10:00Z',
    lat: 28.6139,
    lng: 77.2090
  },
];

app.get('/api/incidents', (req, res) => {
  res.json(incidents);
});

app.post('/api/incidents', (req, res) => {
  const incident = req.body;
  if (!incident.title || !incident.location || !incident.description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newIncident = {
    id: incidents.length + 1,
    severity: incident.severity || 'Medium',
    time: new Date().toISOString(),
    lat: incident.lat || 28.6139,
    lng: incident.lng || 77.2090,
    ...incident,
  };
  incidents.unshift(newIncident);
  io.emit('incident:new', newIncident);
  res.status(201).json(newIncident);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Traffic Intelligence API running on http://localhost:${PORT}`);
});
