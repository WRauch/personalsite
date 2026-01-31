import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import placeholder from '../images/Profile.jpg';
import marmot from '../images/marmot.jpg';

function Home() {

  return (
    <div className="home">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-rows-3">
            {/* Top half: 2/3 text (left), 1/3 image (right) */}
            <div className="row-span-1">
              <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The home page for all things Marmot Games. Check out some of the things I am working on.
                    From developing my own games to my opinion about the most recent Magic the Gathering draft 
                    format, everything Marmot Games related will be posted here.
                  </p>
                </div>

                <div className="md:col-span-1 flex items-start justify-center">
                  <Image
                    src={marmot}
                    alt="Marmot"
                    width={220}
                    height={220}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-md object-cover self-start w-full max-w-[220px]"
                  />
                </div>
              </div>
            </div>

            {/* Horizontal divider and bottom content (inverted layout) */}
            <div className="row-start-2 row-span-1 pt-4">
              <hr className="border-border" />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Right 2/3: paragraph and details (show first on small screens) */}
                <div className="md:col-span-2 order-1 md:order-2 text-lg text-muted-foreground">
                  <h2 className="text-2xl font-medium mb-5 text-blue-500">Drawing Parrots</h2>

                  <p className="text-lg leading-relaxed mb-5">
                    Drawing Parrots is a party game where one player judges the responses of other players
                    based on how well they match a given prompt. There are 5 prompt categories with prompts ranging from
                    drawing the coolest parrot to which player would make the best storybook villain. The game is
                    designed around allowing players to get creative with their answers using whiteboards and markers.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Check out more information on the <a href="/parrot" className="underline underline-offset-2">Parrot</a> page of the site!
                  </p>
                </div>

                {/* Left 1/3: heading + image under it (moves after text on small screens) */}
                <div className="md:col-span-1 order-2 md:order-1">
                  <div className="flex items-start justify-center">
                    <Image
                      src={placeholder}
                      alt="Drawing Parrots placeholder"
                      width={220}
                      height={220}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="rounded-md object-cover w-full max-w-[160px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          
            {/* Divider and third section: same formatting, image on the right */}
            <div className="row-start-3 row-span-1 pt-6">
              <hr className="border-border" />
              <div className="mt-6 h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 text-lg text-muted-foreground">
                  <h2 className="text-2xl font-medium mb-5 text-orange-500">Magic</h2>
                  <p className="text-lg leading-relaxed mb-3">
                    I am an avid Magic player and enjoy discussing limited formats. 
                    Generally I focus on draft, and I like to analyze data from <a href='https://17lands.com/card_data' className="underline underline-offset-2">17Lands.com</a> 
                    <s/> to learn more about what is going on in each format.
                  </p>
                  <p className="text-lg leading-relaxed">
                    I upload videos about limited to my <a href='https://www.youtube.com/@cardmarmot' className="underline underline-offset-2">YouTube channel</a>.
                  </p>
                </div>

                <div className="md:col-span-1 flex items-start justify-center">
                  <Image
                    src={marmot}
                    alt="Marmot"
                    width={220}
                    height={220}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-md object-cover w-full max-w-[220px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;