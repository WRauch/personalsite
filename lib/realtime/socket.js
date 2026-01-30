import { io } from 'socket.io-client';

let socket;

export async function getSocket() {
  if (socket) return socket;

  // Ensure the server-side Socket.IO instance is initialized.
  console.log('[realtime] initializing socket server via /api/socket');
  await fetch('/api/socket');

  console.log('[realtime] creating socket.io client');
  // Pass undefined as the first argument so the options object is the second param
  // (io(url?, options?)). This ensures the options are not treated as the url.
  socket = io(undefined, {
    // IMPORTANT: this is the Socket.IO transport endpoint, NOT the init route.
    // Using a non-API path avoids conflicts with Next's route handling.
    path: '/socket.io',
    addTrailingSlash: false,
    // keep the default transports; allow automatic reconnection
    reconnection: true,
  });

  socket.on('connect', () => {
    console.log('[realtime] connected', { id: socket.id });
  });
  socket.on('disconnect', (reason) => {
    console.log('[realtime] disconnected', { reason });
  });
  socket.on('connect_error', (err) => {
    console.log('[realtime] connect_error', {
      message: err?.message,
      name: err?.name,
      stack: err?.stack,
    });
  });

  return socket;
}

