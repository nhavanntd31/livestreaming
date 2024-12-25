"use client"

import React from "react"
import { Webcam, Player, Module, Effect, Dom } from "@banuba/webar"
import FilterBar from "./filter-bar"

export function BanubaCam({ createTracks, applyAudioEffect }: { createTracks: () => void, applyAudioEffect: (effect: any) => void }) {
  const [player, setPlayer] = React.useState<Player | null>(null)
  const [currentEffect, setCurrentEffect] = React.useState<any>(null)
  const initPlayer = async () => {
    if (player) return

    const newPlayer = await Player.create({ 
      clientToken: process.env.NEXT_PUBLIC_BANUBA_CLIENT_TOKEN || ""
    })

    await newPlayer.addModule(new Module("modules/background.zip"))
    await newPlayer.addModule(new Module("modules/body.zip")) 
    await newPlayer.addModule(new Module("modules/eyes.zip"))
    await newPlayer.addModule(new Module("modules/face_tracker.zip"))
    await newPlayer.addModule(new Module("modules/hair.zip"))
    await newPlayer.addModule(new Module("modules/hands.zip"))
    await newPlayer.addModule(new Module("modules/lips.zip"))
    await newPlayer.addModule(new Module("modules/skin.zip"))

    newPlayer.use(new Webcam())
    newPlayer.play()

    Dom.render(newPlayer, "#webar-app")
    setPlayer(newPlayer)

    setTimeout(() => {
      createTracks()
    }, 100)
  }

  React.useLayoutEffect(() => {
    initPlayer()
    return () => {
      Dom.unmount("#webar-app")
    }
  }, [])

  const applyEffect = (effect: any) => {
    if (player) {
      const effectApply = new Effect(`assets/effects/${effect}`)
      player.applyEffect(effectApply)
      setCurrentEffect(effectApply)
      Dom.render(player, "#webar-app")
    }
  }

  const applyEffectWithParams = (params: any) => {
    if (player) {
      currentEffect.evalJs(params)
      Dom.render(player, "#webar-app")
    }
  }

  const applyVoiceEffectWithParams = (params: any) => {
    applyAudioEffect(params)
  }
  return (
    <div>
      <div className="hidden">
        <div id="webar-app" className="max-w-[600px] w-full"></div>
      </div>
      <FilterBar applyEffect={applyEffect} applyEffectWithParams={applyEffectWithParams} applyVoiceEffectWithParams={applyVoiceEffectWithParams}/>
    </div>
  )
}

export default BanubaCam