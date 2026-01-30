import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function Joingame() {

 
    const handleJoin = () => {
        // Logic to join the game using the entered name and game code
        console.log("Joining game...");
    }

  return (
  <div className=" bg-gray-100 dark:bg-gray-900 w-full p-6 flex justify-center">


        <Card className="w-full max-w-xl">
            <CardContent>

        <div>
            <h1>
                Join Parrot Game
            </h1>       

            <input type="text" placeholder="Enter Your Name" className="border border-gray-300 rounded-md p-2 w-full mt-4"/>
            <input type="text" placeholder="Enter Game Code" className="border border-gray-300 rounded-md p-2 w-full mt-4"/>


            <button className='justify-right mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleJoin}>
                Join
            </button>   
        </div>
            </CardContent>
        </Card>



    </div>
  );
}
export default Joingame;