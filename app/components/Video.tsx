'use client'
import Link from 'next/link'
/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  return (
    <section className="py-4 sm:px-10 px-5">
      <div className="screen-max-width">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          Encuentra tu vuelo deseado.
        </h2>
        <p className="text-gray font-semibold text-xl md:text-2xl py-2 text-center">
          En killa travel mira nuestras recomendaciones ⬇️
        </p>
        <Link href="/?filter=trending">
          <div className="mt-2 mb-14">
            <div className="relative h-full flex items-center justify-center ">
              <div className="overflow-hidden">
                <img
                  src="/frame.png"
                  alt="frame"
                  className="bg-transparent relative z-10"
                />
              </div>
              <div className="absolute w-[98%] h-[90%] rounded-[14px] sm:rounded-[56px] overflow-hidden">
                <video
                  className="pointer-events-none"
                  playsInline
                  preload="none"
                  muted
                  autoPlay
                  loop
                  ref={videoRef}
                >
                  <source src="/aiplane2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Video
