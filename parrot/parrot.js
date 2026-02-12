import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import profilePic from '../images/Profile.jpg';
import game2 from '../images/game2.jpg';
import RuleType from './ruletype';
import parrotDemo from '../images/parrotdemo.jpg';
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
                  <h1 className="text-3xl font-semibold mb-6 text-blue-500">Drawing Parrots</h1>
                  <h3 className="text-xl font-medium mb-5 text-red-400">A game about drawing parrots ... and other things</h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Drawing Parrots is a party game where one player judges the responses of other players based on how well they match a given prompt. 
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
                                      <p className="text-sm text-muted-foreground text-center mb-6">
                      Contact: <a href="mailto:cardmarmot37@gmail.com" className="underline underline-offset-2">cardmarmot37@gmail.com</a>
                    </p>
                  <Image
                    src={parrotDemo}
                    alt="Parrot"
                    width={220}
                    height={220}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-md object-cover w-full max-w-[220px] mb-2"
                  />
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
                      className="inline-flex items-center rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Order (Coming Soon)
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom (flexible) row */}
            <div className="pt-4">
              <hr className="border-border" />
              <div className="mt-4 text-lg text-muted-foreground">
                <h1 className="text-2xl font-medium mb-5 text-blue-500">Game Rules</h1>

                <p className="mb-3">
                  Each player gets a whiteboard and a marker. At the start of the game one player acts as the judge (chosen however you like).
                  The judge draws a card and reads the prompt to the group; some prompts also require the judge to submit an answer.
                </p>

                <p className="mb-3">
                  When everyone has an entry on their board, the judge reviews submissions and awards points according to the rules below.
                  The next judge is the player on the judge's left and the game continues until someone reaches the agreed target score (commonly 7).
                </p>

                <p className="mb-4">
                  The deck contains five prompt types, each marked with a symbol so you can include or remove types when building your card pile.
                  This makes it easy to tailor the game to your group.
                </p>

                <p className="mb-4">
                  Ties award a point to every tied player.  There is no single "right" answer to any open ended prompt
                  and the judge can choose to interpret these prompts any way they like. Scoring details for each prompt type are listed below.
                </p>

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
                          <circle cx="12" cy="7" r="4" />
                          <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
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
                    Each player, including the judge, must write a number from 1 to 5. All players matching the judge’s answer receive 1 point. A 1 should be assumed as not matching the prompt, and a 5 should be very closely matching the prompt. For example: How creative is the judge? A 5 is very creative, and a 1 is not very creative.
                  </RuleType>

                  <RuleType
                    icon={
                      <div className="w-6 h-6 text-gray-600 flex-shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <rect x="3" y="4" width="14" height="16" rx="2" />
                          <path d="M7 8h6M7 12h6M7 16h4" />
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
