import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

function Orders() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('parrotOrders');
      if (raw) setSavedOrders(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);


  const [selectedTest, setSelectedTest] = useState('Full-Game');

  return (
    <div className="parrot-orders">
      <Card className="w-full">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Order Drawing Parrots</h1>

          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">Select version to order</label>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="w-full rounded border px-3 py-2 bg-white text-black"
            >
              <option value="Full-Game">Full Game</option>
              <option value="Just-Cards">Just Cards (No whiteboards/markers)</option>
            </select>

            <div className="text-lg text-muted-foreground">Copy Below <strong>{selectedTest}</strong></div>
          </div>


        </CardContent>
      </Card>
    </div>
  );
}

export default Orders;
