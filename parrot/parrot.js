import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import profilePic from '../images/Profile.jpg';
import game2 from '../images/game2.jpg';
import RuleType from './ruletype';
import qrCode from '../images/qr-code.png';
import gameTotal from '../images/gametotal.jpg';

function Parrot() {
  const [lightbox, setLightbox] = useState(null); // { src, alt, rotated }

  function openLightbox(src, alt = '', rotated = false) {
    setLightbox({ src, alt, rotated });
  }

  function closeLightbox() {
    setLightbox(null);
  }
  return (
    <div className="parrot-page">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid" style={{ gridTemplateRows: 'auto 1fr' }}>
            {/* Top (fixed-size) row */}
            <div>
              <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-semibold mb-6 text-blue-500">Parrot</h1>
                  <h3 className="text-xl font-medium mb-5 text-red-400">A game about drawing parrots and mimicking your friends</h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Parrot is a party game where one player judges the responses of other players based on how well they match a given prompt. 
                    There are 5 prompt categories with prompts ranging from drawing the coolest parrot to which player would make the best storybook 
                    villain. The game is designed around allowing players to get creative with their answers using whiteboards and markers.
                    The complete ruleset for the game is below. Check it out and see if it sounds good to you.
                  </p>

              <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

              <div className="md:col-span-1">
                    <div className="w-full flex justify-center mt-6">
                    <div className="w-full max-w-3xl">
                      <h2 className="text-xl font-medium mb-3 text-red-400">Game Details</h2>
                        <ul className="text-md list-disc pl-6">
                          <li>3-8 players</li>
                          <li>~45 minutes (depending on # players)</li>
                          <li>Ages 10+ recommended</li>
                          <li>Party game</li>
                        </ul>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="w-full flex justify-center mt-6">
                    <div className="w-full max-w-3xl">
                      <h2 className="text-xl font-medium mb-3 text-red-400">Game Contents</h2>
                        <ul className="text-md list-disc pl-6">
                          <li>225 Prompt cards (45 of each type)</li>
                          <li>8 Small whiteboards</li>
                          <li>8 Dry-erase markers</li>
                          <li>1 Rules sheet </li>
                        </ul>
                    </div>
                  </div>

 

                  </div>


                </div>
                </div>

                <div className="md:col-span-1 flex items-center justify-center flex-col">

                  <h2 className="text-lg font-medium mb-3 text-green-600">
                    <a href="https://youtu.be/AzflXyeR_OE" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer" aria-label="Open video demo in new tab">Video Demo</a>
                  </h2>
                  <a href="https://youtu.be/AzflXyeR_OE" target="_blank" rel="noopener noreferrer" aria-label="Open video demo in new tab">
                    <Image
                      src={qrCode}
                      alt="Parrot QR code"
                      width={220}
                      height={220}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-md object-cover w-full max-w-[220px] mb-2"
                    />
                  </a>
                  <div className="mt-4 flex flex-col items-center gap-3">


                    <a
                      href="/game"
                      className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 mb-2"
                      role="button"
                    >
                      Try It (Coming Soon)
                    </a>

                     <a
                      href="/parrot/order"
                      className="inline-flex items-center rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 mb-6"
                    >
                      Order (Coming Soon)
                    </a>
                  </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Contact: <a href="mailto:cardmarmot37@gmail.com" className="underline underline-offset-2">cardmarmot37@gmail.com</a>
                    </p>
                </div>
              </div>
            </div>

            {/* Bottom (flexible) row */}
            <div className="pt-4">
              <hr className="border-border" />
              <div className="mt-4 text-lg text-muted-foreground">
                <h1 className="text-2xl font-medium mb-5 text-blue-500">Game Rules</h1>

                <h2 className="text-lg font-semibold mb-2 text-red-400">Game Setup:</h2>
                <p className="mb-3">Each player receives: 1 Whiteboard, 1 Marker</p>

                <p className="mb-3">Choose which of the 5 prompt types you would like to play with. You may use any combination of prompts from just 1 to all 5. 
                  More details about the prompt types can be found in the "Prompt Types" section below.
                </p>

                <h2 className="text-lg font-semibold mb-2 mt-4 text-red-400">Deck Setup:</h2>
                <p className="mb-2 "><strong className='text-green-600'>Mode 1:</strong> Add all cards of the chosen types to the same deck and shuffle them together. It will be difficult to keep all the cards stacked in one pile, so making multiple shuffled piles is recommended.</p>

                <p className="mb-3"><strong className='text-green-600'>Mode 2:</strong> Keep the cards of each type in separate shuffled piles. For each round of play, each judge draws a card from the same 
                pile so that all players judge the same types of prompts each round. If your group really cares about
                 competitive integrity, this is a fairer way to play.</p>
 
                <h2 className="text-lg font-semibold mb-2 mt-4 text-red-400">Gameplay:</h2>
                <p className="mb-3">One player begins the game as the judge and draws a card from the center pile, reading the card aloud to all players. After all players have an answer to the prompt, the judge awards points based on the type of prompt.</p>

                <p className="mb-3">The player to the judge's left becomes the next judge and repeats the process. Play continues with each player becoming the judge in sequence until one player reaches 7 points. Based on your group's appetite, you can play to any number of points you would like.</p>

                <p className="mb-3">Ties award a point to every tied player. There is no single "right" way to answer any prompt, and the judge can choose to interpret the prompts any way they like.</p>

                <h2 className="text-lg font-semibold mb-2 text-red-400">Prompt Types:</h2>

                <div className="space-y-5">
                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-blue-500 flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path d="M3 21v-3l11-11 3 3L7 21H3z" />
                          <path d="M14 7l3 3" />
                        </svg>
                      </div>
                    }
                    title="(Drawing):"
                  >
                    Each player, other than the judge, must draw what is stated on the card. Then the judge chooses one player's drawing as the best, and they receive 1 point. The suggested drawing time is 2 minutes, but you can choose your own time limit.
                  </RuleType>

                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-pink-500 flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path d="M21 11.5a4.5 4.5 0 0 0-7.5-3.5L12 9l-1.5-1A4.5 4.5 0 0 0 3 11.5c0 5 9 10.5 9 10.5s9-5.5 9-10.5z" />
                        </svg>
                      </div>
                    }
                    title="(Open-Ended):"
                  >
                    Each player, other than the judge, must write a short answer to the prompt on the card. The judge will choose the player with the best answer, and they will receive 1 point.
                  </RuleType>

                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-yellow-500 flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" />
                        </svg>
                      </div>
                    }
                    title="(Choosing A Player):"
                  >
                    Each player, including the judge, must write down the name of one of the players playing the game (including the judge), who best matches the prompt. All players matching the judge’s answer receive 1 point.
                  </RuleType>

                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-green-600 flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path d="M3 10h18" />
                          <path d="M6 6v8" />
                          <path d="M18 6v8" />
                          <path d="M4 18h16" />
                        </svg>
                      </div>
                    }
                    title="(Scale of 1-5):"
                  >
                    Each player, including the judge, must write a number from 1 to 5. All players matching the judge’s answer receive 1 point. 
                  </RuleType>

                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-white flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <circle cx="4" cy="6" r="1.5"  fill='currentColor'/>
                          <circle cx="4" cy="12" r="1.5"  fill='currentColor'/>
                          <circle cx="4" cy="18" r="1.5"  fill='currentColor'/>
                          <path d="M8 6h12M8 12h12M8 18h12" />
                        </svg>
                      </div>
                    }
                    title="(Choosing From A List):"
                  >
                    There are 5 options listed on the card. Each player, including the judge, must write one of those answers down. All players who match the judge's answer receive 1 point.
                  </RuleType>
                </div>


              </div>
            </div>

                {/* Bottom (flexible) row */}
            <div className="pt-4">
              <hr className="border-border" />



              <div className="mt-4 text-sm text-muted-foreground">
                <h1 className="text-2xl font-medium mb-5 text-blue-500">Game Images</h1>
                </div>



              <div className="w-full">
                <div className="w-full flex flex-col items-center gap-3">
                  <figure className="w-full max-w-3xl mb-4">
                    <figcaption className="text-center text-lg font-medium mb-2 text-red-400">Total Game</figcaption>
                    <div
                      className="w-full flex items-center justify-center bg-gray-50 rounded-md border border-border p-4 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(gameTotal, 'Game total layout')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(gameTotal, 'Game total layout'); }}
                    >
                      <Image
                        src={gameTotal}
                        alt="Game total layout"
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-contain rounded-md"
                        style={{ maxHeight: 420 }}
                      />
                    </div>
                  </figure>

                  <figure className="w-full max-w-3xl">
                    <figcaption className="text-center text-lg font-medium mb-2 text-red-400">5 Prompt Types</figcaption>
                    <div
                      className="w-full flex items-center justify-center bg-gray-50 rounded-md border border-border p-4 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(game2, '5 Prompt Types layout')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(game2, '5 Prompt Types layout'); }}
                    >
                      <Image
                        src={game2}
                        alt="Game 1 layout"
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-contain rounded-md"
                        style={{ maxHeight: 420 }}
                      />
                    </div>
                  </figure>
                </div>
              </div>

            </div>
          </div>
        
        {/* Lightbox overlay */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-[95vw] max-h-[95vh] p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-transparent flex flex-col items-center">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={1200}
                  height={900}
                  style={{ maxWidth: '90vw', maxHeight: '80vh' }}
                  className={`object-contain ${lightbox.rotated ? 'rotate-90' : ''}`}
                />
                <button
                  onClick={closeLightbox}
                  className="mt-3 px-3 py-1 rounded bg-white text-sm text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        </CardContent>
      </Card>
    </div>
  );
}

export default Parrot;
