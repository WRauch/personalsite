import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import profilePic from '../images/Profile.jpg';

function About() {
  return (
    <div className="about">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-rows-2">
            {/* Top half: 2/3 text (left), 1/3 image (right) */}
              <div className="row-span-1">
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2">
                    <h1 className="text-3xl font-semibold mb-6">About Me</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Hi, I'm Spencer. I am a game designer who enjoys the process of 
                    </p>
                  </div>
                  <div className="md:col-span-1 flex items-start justify-center">
                    <Image
                      src={profilePic}
                      alt="Profile"
                      width={250}
                      height={220}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-md object-cover self-start w-full max-w-[250px]"
                    />
                  </div>
              </div>
            </div>

            {/* Horizontal divider */}
            <div className="row-start-2 row-span-1 pt-4">
              <hr className="border-border" />
              <div className="mt-4 text-lg text-muted-foreground">
                <p>
                  Bottom half content — add more details, links, or whatever you'd like to
                  display below the divider.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default About;