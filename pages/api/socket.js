import { Server } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

function generateLobbyCode() {
  // Short, readable-ish code for sharing verbally.
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

// In-memory state (resets on server restart / deploy).
// For production you’d swap this for Redis or a DB.
const lobbies = global.__PARROT_LOBBIES__ || new Map();
global.__PARROT_LOBBIES__ = lobbies;

export default function handler(req, res) {
  if (!res.socket?.server) {
    res.status(500).json({ ok: false, error: 'No socket server available' });
    return;
  }

  if (res.socket.server.io) {
    res.end();
    return;
  }

  console.log('[socket] initializing Socket.IO server', {
    pid: process.pid,
    node: process.version,
  });

  const io = new Server(res.socket.server, {
    // IMPORTANT: Use a non-API path for the Socket.IO transport endpoint.
    // The API route (/api/socket) only initializes the server.
    path: '/socket.io',
    addTrailingSlash: false,
    // Allow same-origin requests; if you plan to host clients elsewhere,
    // restrict this to your domains and enable proper CORS in production.
    cors: {
      origin: true,
      methods: ['GET', 'POST']
    }
  });
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('[socket] client connected', { id: socket.id });

    socket.on('lobby:create', ({ name }, ack) => {
      try {
        console.log('[socket] lobby:create received', { id: socket.id, name });

        // If this socket was already in a lobby (e.g. UI didn't update),
        // clean it up first so we don't leave "ghost" lobbies around.
        if (socket.data?.lobbyCode) {
          console.log('[socket] lobby:create: leaving previous lobby first', {
            id: socket.id,
            prevCode: socket.data.lobbyCode,
          });
          leaveLobby(io, socket);
        }

        const playerName = (name || '').trim() || 'Player';

        let code = generateLobbyCode();
        while (lobbies.has(code)) code = generateLobbyCode();

        const lobby = {
          code,
          hostSocketId: socket.id,
          players: [{ socketId: socket.id, name: playerName }],
          createdAt: Date.now(),
        };
        lobbies.set(code, lobby);

        socket.join(code);
        socket.data.lobbyCode = code;
        socket.data.playerName = playerName;

        console.log('[socket] lobby created', {
          code,
          hostSocketId: lobby.hostSocketId,
          players: lobby.players.map((p) => p.name),
        });

        if (typeof ack === 'function') {
          console.log('[socket] lobby:create ack', { code, to: socket.id });
          ack({ ok: true, code });
        }

        socket.emit('lobby:created', { code, lobby: publicLobby(lobby) });
        io.to(code).emit('lobby:update', { lobby: publicLobby(lobby) });
      } catch (e) {
        console.log('[socket] lobby:create ERROR', {
          id: socket.id,
          message: e?.message,
          stack: e?.stack,
        });
        if (typeof ack === 'function') {
          ack({ ok: false, message: 'Server error creating lobby.' });
        }
        socket.emit('lobby:error', { message: 'Server error creating lobby.' });
      }
    });

    socket.on('lobby:join', ({ code, name }, ack) => {
      try {
        console.log('[socket] lobby:join received', { id: socket.id, code, name });
        const lobbyCode = (code || '').trim().toUpperCase();
        const playerName = (name || '').trim() || 'Player';
        const lobby = lobbies.get(lobbyCode);

        if (!lobby) {
          console.log('[socket] lobby not found', { lobbyCode });
          if (typeof ack === 'function') {
            console.log('[socket] lobby:join ack (not found)', {
              lobbyCode,
              to: socket.id,
            });
            ack({ ok: false, message: 'Lobby not found.' });
          }
          socket.emit('lobby:error', { message: 'Lobby not found.' });
          return;
        }

        // If they were already in a lobby, leave it first.
        if (socket.data?.lobbyCode && socket.data.lobbyCode !== lobbyCode) {
          console.log('[socket] lobby:join: leaving previous lobby first', {
            id: socket.id,
            prevCode: socket.data.lobbyCode,
            nextCode: lobbyCode,
          });
          leaveLobby(io, socket);
        }

        lobby.players = lobby.players.filter((p) => p.socketId !== socket.id);
        lobby.players.push({ socketId: socket.id, name: playerName });

        socket.join(lobbyCode);
        socket.data.lobbyCode = lobbyCode;
        socket.data.playerName = playerName;

        console.log('[socket] lobby joined', {
          lobbyCode,
          players: lobby.players.map((p) => p.name),
        });

        if (typeof ack === 'function') {
          console.log('[socket] lobby:join ack', { lobbyCode, to: socket.id });
          ack({ ok: true, code: lobbyCode });
        }

        socket.emit('lobby:joined', { code: lobbyCode, lobby: publicLobby(lobby) });
        io.to(lobbyCode).emit('lobby:update', { lobby: publicLobby(lobby) });
      } catch (e) {
        console.log('[socket] lobby:join ERROR', {
          id: socket.id,
          message: e?.message,
          stack: e?.stack,
        });
        if (typeof ack === 'function') {
          ack({ ok: false, message: 'Server error joining lobby.' });
        }
        socket.emit('lobby:error', { message: 'Server error joining lobby.' });
      }
    });

    socket.on('lobby:leave', () => {
      console.log('[socket] lobby:leave received', { id: socket.id, code: socket.data?.lobbyCode });
      leaveLobby(io, socket);
    });

    socket.on('disconnect', () => {
      console.log('[socket] client disconnected', { id: socket.id, code: socket.data?.lobbyCode });
      leaveLobby(io, socket);
    });
  });

  // Return a small JSON body so the client fetch() resolves with a 200 response.
  res.status(200).json({ ok: true });
}

function publicLobby(lobby) {
  return {
    code: lobby.code,
    hostSocketId: lobby.hostSocketId,
    players: lobby.players.map((p) => ({ name: p.name, socketId: p.socketId })),
    createdAt: lobby.createdAt,
  };
}

function leaveLobby(io, socket) {
  const code = socket.data?.lobbyCode;
  if (!code) return;

  const lobby = lobbies.get(code);
  if (!lobby) return;

  console.log('[socket] leaving lobby', {
    id: socket.id,
    code,
    wasHost: lobby.hostSocketId === socket.id,
  });

  lobby.players = lobby.players.filter((p) => p.socketId !== socket.id);
  socket.leave(code);
  socket.data.lobbyCode = undefined;

  if (lobby.hostSocketId === socket.id) {
    lobby.hostSocketId = lobby.players[0]?.socketId || null;
  }

  if (lobby.players.length === 0) {
    console.log('[socket] lobby deleted (empty)', { code });
    lobbies.delete(code);
    return;
  }

  console.log('[socket] lobby updated after leave', {
    code,
    hostSocketId: lobby.hostSocketId,
    players: lobby.players.map((p) => p.name),
  });
  io.to(code).emit('lobby:update', { lobby: publicLobby(lobby) });
}

