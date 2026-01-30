import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getSocket } from '@/lib/realtime/socket';

function generateLobbyCode() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

// Simple localStorage-backed lobby store for testing only.
function readLobbies() {
  try {
    const raw = localStorage.getItem('testing_lobbies');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLobbies(obj) {
  try {
    localStorage.setItem('testing_lobbies', JSON.stringify(obj));
  } catch {}
}

function Testing() {
  const [name, setName] = useState('Player');
  const [code, setCode] = useState('');
  const [lobby, setLobby] = useState(null);
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [useSockets, setUseSockets] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const socketRef = useRef(null);

  useEffect(() => {
    // If a lobby code is in the URL (?code=ABCD), prefill join
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get('code');
      if (urlCode) setJoinCode(urlCode.toUpperCase());
    } catch {}
  }, []);

  // When user enables sockets, connect and wire up listeners
  useEffect(() => {
    let mounted = true;
    let s = null;

    if (!useSockets) return;

    (async () => {
      try {
        s = await getSocket();
        if (!mounted) return;
        socketRef.current = s;
        setSocketStatus(s.connected ? 'connected' : 'connecting');

        const onConnect = () => setSocketStatus('connected');
        const onDisconnect = () => setSocketStatus('disconnected');
        const onError = ({ message }) => setError(message || 'Socket error');
        const onUpdate = ({ lobby: nextLobby }) => {
          setLobby(nextLobby);
          setCode(nextLobby?.code || '');
        };

        s.on('connect', onConnect);
        s.on('disconnect', onDisconnect);
        s.on('lobby:error', onError);
        s.on('lobby:created', onUpdate);
        s.on('lobby:joined', onUpdate);
        s.on('lobby:update', onUpdate);

        // If already connected, try to restore lobby state (no-op otherwise)
        if (s.connected && s.data?.lobbyCode) {
          setCode(s.data.lobbyCode);
        }

        // cleanup
        return () => {
          try {
            s.off('connect', onConnect);
            s.off('disconnect', onDisconnect);
            s.off('lobby:error', onError);
            s.off('lobby:created', onUpdate);
            s.off('lobby:joined', onUpdate);
            s.off('lobby:update', onUpdate);
          } catch {}
        };
      } catch (e) {
        console.log('[testing] socket init error', e?.message);
        setError('Could not initialize socket');
        setSocketStatus('disconnected');
      }
    })();

    return () => {
      mounted = false;
      socketRef.current = null;
    };
  }, [useSockets]);

  const createLobby = () => {
    setError('');
    if (!useSockets) {
      const lobbies = readLobbies();
      let c = generateLobbyCode();
      while (lobbies[c]) c = generateLobbyCode();

      const newLobby = {
        code: c,
        host: name || 'Player',
        players: [{ name: name || 'Player', id: Date.now().toString() }],
        createdAt: Date.now(),
      };

      lobbies[c] = newLobby;
      writeLobbies(lobbies);
      setLobby(newLobby);
      setCode(c);
      return;
    }

    // Socket path
    (async () => {
      try {
        const s = socketRef.current || (await getSocket());
        socketRef.current = s;
        s.emit('lobby:create', { name }, (resp) => {
          console.log('[testing] lobby:create ack', resp);
          if (resp && resp.ok === false && resp.message) setError(resp.message);
          if (resp && resp.ok && resp.code) setCode(resp.code);
          // rely on lobby:created to update players list
        });
      } catch (e) {
        console.log('[testing] create socket error', e?.message);
        setError('Socket create failed');
      }
    })();
  };

  const joinLobby = () => {
    setError('');
    if (!useSockets) {
      const lobbies = readLobbies();
      const c = (joinCode || '').trim().toUpperCase();
      if (!c) return setError('Enter a code to join.');
      const found = lobbies[c];
      if (!found) return setError('Lobby not found (local test).');

      // Add player if not already present
      const exists = found.players.find((p) => p.name === name);
      if (!exists) {
        found.players.push({ name: name || 'Player', id: Date.now().toString() });
        lobbies[c] = found;
        writeLobbies(lobbies);
      }

      setLobby(found);
      setCode(c);
      return;
    }

    (async () => {
      try {
        const s = socketRef.current || (await getSocket());
        socketRef.current = s;
        const c = (joinCode || '').trim().toUpperCase();
        if (!c) return setError('Enter a code to join.');
        s.emit('lobby:join', { code: c, name }, (resp) => {
          console.log('[testing] lobby:join ack', resp);
          if (resp && resp.ok === false && resp.message) setError(resp.message);
          if (resp && resp.ok) setCode(c);
        });
      } catch (e) {
        console.log('[testing] join socket error', e?.message);
        setError('Socket join failed');
      }
    })();
  };

  const leaveLobby = () => {
    if (!lobby) return;
    if (!useSockets) {
      const lobbies = readLobbies();
      const c = lobby.code;
      const updated = (lobbies[c]?.players || []).filter((p) => p.name !== name);
      if (updated.length === 0) {
        delete lobbies[c];
      } else {
        lobbies[c].players = updated;
        if (lobbies[c].host === name) {
          lobbies[c].host = updated[0].name;
        }
      }
      writeLobbies(lobbies);
      setLobby(null);
      setCode('');
      return;
    }

    try {
      const s = socketRef.current;
      s?.emit('lobby:leave');
    } catch (e) {
      console.log('[testing] leave socket error', e?.message);
    }
    setLobby(null);
    setCode('');
  };

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?code=${code}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-semibold">Lobby Testing (local)</h1>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSockets}
                  onChange={(e) => setUseSockets(e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Use real sockets</span>
              </label>
              <div className="text-xs text-muted-foreground">{socketStatus}</div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3 mb-4">
            <div>
              <label className="text-sm text-muted-foreground">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Join code</label>
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="ABCD"
              />
            </div>

            <div className="flex items-end gap-2">
              <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground" onClick={createLobby}>
                Create (local)
              </button>
              <button className="rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground" onClick={joinLobby}>
                Join (local)
              </button>
            </div>
          </div>

          {error ? <div className="text-destructive">{error}</div> : null}

          {lobby ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Lobby</div>
                  <div className="text-lg font-medium">{lobby.code}</div>
                </div>
                <div className="text-sm text-muted-foreground">Host: {lobby.host}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Players</div>
                <ul className="list-disc pl-5">
                  {lobby.players.map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <button className="rounded-md bg-secondary px-3 py-2 text-sm" onClick={copyLink}>Copy link</button>
                <button className="rounded-md bg-destructive px-3 py-2 text-sm text-destructive-foreground" onClick={leaveLobby}>Leave</button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No local lobby joined.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Testing;