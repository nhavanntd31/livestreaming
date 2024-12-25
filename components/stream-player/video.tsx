"use client";

import React, { useEffect, useRef, useState } from "react";
import { ConnectionState, createLocalTracks, LocalAudioTrack, LocalVideoTrack, Track, VideoPresets, createLocalVideoTrack, createLocalAudioTrack, LocalTrackPublication } from "livekit-client";
import {
  useConnectionState,
  useLocalParticipant,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { BanubaCam } from "./banuba-cam";
import { DataVoiceParams } from "./filter-bar";

export function Video({
  hostName,
  hostIdentity,
  onCreateStream,
  isHosted,
}: {
  hostName: string;
  hostIdentity: string;
  onCreateStream: (roomName: string) => void;
  isHosted: boolean;
}) {
  const connectionState = useConnectionState();
  const mediaStream = useRef<MediaStream | null>(null);
  const participant = useRemoteParticipant(hostIdentity);
  const localParticipant = useLocalParticipant();
  const [audioPublicationInstance, setAudioPublicationInstance] = useState<any | null>(null);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);
  if (!isHosted){
    const allTracks = useTracks([
      Track.Source.Camera,
      Track.Source.Microphone,
    ])
  }
  let content;

  onCreateStream = async (roomName: string) => {
  }
  const createTracks = async () => {
    if(mediaStream.current) return;
    const canvas = document.querySelector("#webar-app canvas") as HTMLCanvasElement;
    console.log("canvas", canvas)
    if (!canvas) return;

    mediaStream.current = canvas.captureStream(30);
    const publishTrack = mediaStream.current.getVideoTracks()[0];
    const audioTrack = await createLocalAudioTrack({
      echoCancellation: true,
      noiseSuppression: true,
    });
    const videoPublication = await localParticipant.localParticipant.publishTrack(publishTrack, {
      source: Track.Source.Camera,
    });
    const audioPublication = await localParticipant.localParticipant.publishTrack(audioTrack);
    setAudioPublicationInstance(audioTrack)
  };

  const applyAudioEffect = async (effect: DataVoiceParams) => {
    // await localParticipant.localParticipant.unpublishTrack(audioPublicationInstance);

    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // const audioContext = new AudioContext();
    // const source = audioContext.createMediaStreamSource(stream);

    // const biquadFilter = audioContext.createBiquadFilter();
    // const gainNode = audioContext.createGain();

    // biquadFilter.type = 'bandpass';
    // biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);

    // source.connect(biquadFilter);
    // biquadFilter.connect(gainNode);

    // const destination1 = audioContext.createMediaStreamDestination();
    // gainNode.connect(destination1);

    // const destination2 = audioContext.createMediaStreamDestination();
    // gainNode.connect(destination2);

    // const destination3 = audioContext.createMediaStreamDestination();
    // gainNode.connect(destination3);

    // const [processedTrack] = destination1.stream.getAudioTracks().concat(
    //   destination2.stream.getAudioTracks(),
    //   destination3.stream.getAudioTracks()
    // );

    // const audioPublication = await localParticipant.localParticipant.publishTrack(processedTrack, {
        // source: Track.Source.Microphone,
    // });

  }
  content = <LiveVideo participant={participant} isHosted={isHosted} />;

  return (
    <div className="">
    {content}
    {isHosted && (
      <div className="">
        <BanubaCam createTracks={createTracks} applyAudioEffect={applyAudioEffect}/>
      </div>
    )}
  </div>
  );
}


export function VideoSkeleton() {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
