import React, { use, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Gameplay() {

    const players = useState(['Alice', 'Bob', 'Charlie']);
    const gameState = useState()

 
    const handleStart = () => {
        // Logic to start the game
        console.log("Starting game...");
    }       
    return (    
    <div className=" bg-gray-100 dark:bg-gray-900 w-full p-6 flex justify-center">
            <div>
            <Card className="w-full max-w-xl mb-4">
            <CardContent>
                    <div>  
                <h1 className="text-lg font-medium mb-2">
                    Players
                </h1>
                <ul>
                    {players[0].map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
                </div>
            </CardContent>  
            </Card>
            </div>

                

        <Card className="w-full max-w-xl">
            <CardContent>
        <div>

            <h1>
                Gameplay Screen     
            </h1>  
            <button className='justify-right ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleStart}>
                Start Game
            </button>
        </div>
            </CardContent>
        </Card>
    </div>
    );
}   
export default Gameplay;