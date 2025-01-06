"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ConnectionState,
  createLocalTracks,
  LocalAudioTrack,
  LocalVideoTrack,
  Track,
  VideoPresets,
  createLocalVideoTrack,
  createLocalAudioTrack,
  LocalTrackPublication,
} from "livekit-client";
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
  isHosted,
}: {
  hostName: string;
  hostIdentity: string;
  isHosted: boolean;
}) {
  const connectionState = useConnectionState();
  const mediaStream = useRef<MediaStream | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const participant = useRemoteParticipant(hostIdentity);
  const localParticipant = useLocalParticipant();
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [audioPublicationInstance, setAudioPublicationInstance] = useState<any | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);
  const localTracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === localParticipant.localParticipant.identity);
  console.log(localTracks)

  const onCreateStream = async (roomName: string) => {
    setContent(
      <div>
        <LiveVideo participant={participant} isHosted={isHosted}></LiveVideo>
        <div className="">
          <BanubaCam
            createTracks={createTracks}
            applyAudioEffect={applyAudioEffect}
          />
        </div>
      </div>
    );
  };
  const createTracks = async () => {
    if (mediaStream.current) return;
    
    const canvas = document.querySelector("#webar-app canvas") as HTMLCanvasElement;
    if (!canvas) return;

    audioStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioTrack = audioStream.current.getAudioTracks()[0];
    
    mediaStream.current = canvas.captureStream(30);
    const publishTrack = mediaStream.current.getVideoTracks()[0];

    const audioPublication = await localParticipant.localParticipant.publishTrack(audioTrack, {
      source: Track.Source.Microphone,
    });
    
    const videoPublication = await localParticipant.localParticipant.publishTrack(publishTrack, {
      source: Track.Source.Camera,
    });

  };

  const applyAudioEffect = async (effect: DataVoiceParams) => {
    if (!audioPublicationInstance || !audioContext || !audioStream.current) return;

    await localParticipant.localParticipant.unpublishTrack(audioPublicationInstance);

    const audioTrack = audioStream.current.getAudioTracks()[0];
    const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));

    const oscillatorNode = audioContext.createOscillator();
    oscillatorNode.type = 'sawtooth';
    oscillatorNode.frequency.value = 440;
    oscillatorNode.start();

    const distortionNode = audioContext.createWaveShaper();
    const distortionAmount = 400;
    const samples = new Float32Array(44100);
    for (let i = 0; i < 44100; i++) {
      samples[i] = (3 + distortionAmount) * i / 44100 - (1 + distortionAmount);
    }
    distortionNode.curve = samples;

    const pitchNode = audioContext.createBiquadFilter();
    pitchNode.type = "lowshelf"; 
    pitchNode.frequency.value = effect.pitch * 200;
    pitchNode.gain.value = 25;

    const delayNode = audioContext.createDelay();
    delayNode.delayTime.value = effect.delay;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;

    source.connect(distortionNode);
    distortionNode.connect(pitchNode);
    oscillatorNode.connect(pitchNode);
    pitchNode.connect(delayNode);
    delayNode.connect(gainNode);

    const destination = audioContext.createMediaStreamDestination();
    gainNode.connect(destination);

    const processedTrack = destination.stream.getAudioTracks()[0];

    const audioPublication = await localParticipant.localParticipant.publishTrack(processedTrack, {
      source: Track.Source.Microphone,
    });

    setAudioPublicationInstance(processedTrack);
  };

  useEffect(() => {
    if (tracks.length === 0) {
      setContent(
        <OfflineVideo
          username={hostName}
          canCreate={isHosted}
          onCreateStream={onCreateStream}
        />
      );
    } else {
      setContent(<LiveVideo participant={participant} isHosted={isHosted} />);
    }
  }, [connectionState, hostName, isHosted, participant]);

  return <div className="group relative aspect-video border-b">{content}</div>;
}

export function VideoSkeleton() {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
