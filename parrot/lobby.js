import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getSocket } from '@/lib/realtime/socket';

function Lobby() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(''); // '', 'create', 'join'

  const [name, setName] = useState('Player');
  const [codeInput, setCodeInput] = useState('');

  const [lobby, setLobby] = useState(null); // { code, hostSocketId, players: [...] }

  const isHost = useMemo(() => {
    if (!socket || !lobby) return false;
    return lobby.hostSocketId === socket.id;
  }, [socket, lobby]);

  useEffect(() => {
    let mounted = true;
    const pendingTimerRef = { current: null };

    (async () => {
      console.log('[lobby] mounting, acquiring socket…');
      const s = await getSocket();
      if (!mounted) return;

      console.log('[lobby] got socket instance', { connected: s.connected, id: s.id });
      setSocket(s);

      const onConnect = () => {
        console.log('[lobby] socket connected', { id: s.id });
        setStatus('connected');
      };
      const onDisconnect = (reason) => {
        console.log('[lobby] socket disconnected', { reason });
        setStatus('disconnected');
      };
      const onError = ({ message }) => {
        console.log('[lobby] lobby:error', { message });
        setError(message || 'Unknown error');
      };
      const onUpdate = ({ lobby: nextLobby }) => {
        console.log('[lobby] lobby update received', {
          code: nextLobby?.code,
          hostSocketId: nextLobby?.hostSocketId,
          players: (nextLobby?.players || []).map((p) => p.name),
        });
        // Clear any pending create/join timers — the server sent an update.
        try {
          if (pendingTimer.current) {
            clearTimeout(pendingTimer.current);
            pendingTimer.current = null;
          }
        } catch {}
        setLobby(nextLobby);
      };

      s.on('connect', onConnect);
      s.on('disconnect', onDisconnect);
      s.on('lobby:error', onError);
      s.on('lobby:created', onUpdate);
      s.on('lobby:joined', onUpdate);
  s.on('lobby:update', onUpdate);

      // If someone hits /parrot?code=ABCD, auto-fill join code.
      try {
        const params = new URLSearchParams(window.location.search);
        const urlCode = params.get('code');
        if (urlCode) {
          console.log('[lobby] found code in URL', { urlCode });
          setCodeInput(urlCode.toUpperCase());
        }
      } catch {}

      if (s.connected) setStatus('connected');

      return () => {
        console.log('[lobby] unmounting, removing socket listeners');
        s.off('connect', onConnect);
        s.off('disconnect', onDisconnect);
        s.off('lobby:error', onError);
        s.off('lobby:created', onUpdate);
        s.off('lobby:joined', onUpdate);
        s.off('lobby:update', onUpdate);
        try {
          if (pendingTimer.current) {
            clearTimeout(pendingTimer.current);
            pendingTimer.current = null;
          }
        } catch {}
      };
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const ensureConnected = async () => {
    console.log('[lobby] ensureConnected() start', {
      hasSocket: !!socket,
      status,
      socketConnected: socket?.connected,
      socketId: socket?.id,
    });
    const s = socket || (await getSocket());
    if (!socket) setSocket(s);

    if (s.connected) return s;

    // Try to connect and wait briefly for the connection.
    try {
      s.connect();
    } catch {}

    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('connect_timeout')), 2500);
      s.once('connect', () => {
        clearTimeout(t);
        resolve();
      });
    });

    console.log('[lobby] ensureConnected() connected', { id: s.id });
    return s;
  };

  // Keep a ref for pending create/join timers so we can cancel when an update arrives
  const pendingTimer = useRef(null);

  const createLobby = async () => {
    setError('');
    setBusy('create');
    console.log('[lobby] createLobby click', { name });
    try {
      const s = await ensureConnected();
      console.log('[lobby] emitting lobby:create', { name, socketId: s.id });
      // Emit without client-side timeout; handle ack if server replies.
      // Also set a fallback timer in case ack/update doesn't arrive.
      try {
        if (pendingTimer.current) {
          clearTimeout(pendingTimer.current);
          pendingTimer.current = null;
        }
      } catch {}
      pendingTimer.current = setTimeout(() => {
        console.log('[lobby] createLobby fallback timer fired');
        setError('Create lobby timed out. The server may be slow — check logs.');
        pendingTimer.current = null;
      }, 8000);

      s.emit('lobby:create', { name }, (resp) => {
        try {
          if (pendingTimer.current) {
            clearTimeout(pendingTimer.current);
            pendingTimer.current = null;
          }
        } catch {}
        console.log('[lobby] lobby:create ack', resp);
        if (resp && resp.ok === false && resp.message) {
          setError(resp.message);
        }
      });
    } catch {
      console.log('[lobby] createLobby failed (connect/emit)');
      setError('Could not connect. Try again.');
    } finally {
      setBusy('');
    }
  };

  const joinLobby = async () => {
    setError('');
    setBusy('join');
    console.log('[lobby] joinLobby click', { name, codeInput });
    try {
      const s = await ensureConnected();
      console.log('[lobby] emitting lobby:join', { code: codeInput, name, socketId: s.id });
      try {
        if (pendingTimer.current) {
          clearTimeout(pendingTimer.current);
          pendingTimer.current = null;
        }
      } catch {}
      pendingTimer.current = setTimeout(() => {
        console.log('[lobby] joinLobby fallback timer fired');
        setError('Join lobby timed out. The server may be slow — check logs.');
        pendingTimer.current = null;
      }, 8000);

      s.emit('lobby:join', { code: codeInput, name }, (resp) => {
        try {
          if (pendingTimer.current) {
            clearTimeout(pendingTimer.current);
            pendingTimer.current = null;
          }
        } catch {}
        console.log('[lobby] lobby:join ack response', resp);
        if (resp && resp.ok === false && resp.message) {
          setError(resp.message);
        }
      });
    } catch {
      console.log('[lobby] joinLobby failed (connect/emit)');
      setError('Could not connect. Try again.');
    } finally {
      setBusy('');
    }
  };

  const leaveLobby = () => {
    setError('');
    console.log('[lobby] leaveLobby click', { code: lobby?.code, socketId: socket?.id });
    socket?.emit('lobby:leave');
    setLobby(null);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Parrot Lobby</h1>
              <div className="text-sm text-muted-foreground">
                Status: {status}
                {lobby?.code ? ` • Lobby: ${lobby.code}` : ''}
                {lobby?.code && isHost ? ' • Host' : ''}
              </div>
            </div>

            {lobby ? (
              <button
                className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:opacity-90"
                onClick={leaveLobby}
              >
                Leave lobby
              </button>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1 md:col-span-1">
              <label className="text-sm text-muted-foreground">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Player name"
                disabled={!!lobby}
              />
            </div>

            {!lobby ? (
              <>
                <div className="space-y-1 md:col-span-1">
                  <label className="text-sm text-muted-foreground">Join code</label>
                  <input
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="ABCD"
                  />
                </div>

                <div className="flex items-end gap-2 md:col-span-1">
                  <button
                    className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    onClick={createLobby}
                    disabled={status !== 'connected' || busy !== ''}
                  >
                    {busy === 'create' ? 'Creating…' : 'Create lobby'}
                  </button>
                  <button
                    className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
                    onClick={joinLobby}
                    disabled={status !== 'connected' || busy !== '' || !codeInput.trim()}
                  >
                    {busy === 'join' ? 'Joining…' : 'Join'}
                  </button>
                </div>
              </>
            ) : null}
          </div>

          {lobby ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Players ({lobby.players?.length || 0})
                </h2>
                <div className="text-xs text-muted-foreground">
                  Share link: <span className="select-all">/parrot?code={lobby.code}</span>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {(lobby.players || []).map((p) => (
                  <div
                    key={p.socketId}
                    className="flex items-center justify-between rounded-md border border-border/60 bg-card px-3 py-2"
                  >
                    <div className="truncate text-sm">{p.name}</div>
                    {p.socketId === lobby.hostSocketId ? (
                      <div className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                        Host
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            Rules

          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Lobby;