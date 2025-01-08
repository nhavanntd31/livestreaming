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

export enum AudioEffect {
  CHIPMUNK = "Chipmunk",
  CUTE = "Cute",
  ROBOT = "Robot",
  GIGACHAD = "Gigachad",
  TROLL = "Troll",
  GHOST = "Ghost",
  DEFAULT = "Default",
}

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

  const onCreateStream = async (roomName: string, effect: AudioEffect) => {
    setContent(
      <div>
        <LiveVideo participant={participant} isHosted={isHosted}></LiveVideo>
        <div className="">
          <BanubaCam
            createTracks={() => createTracks(effect)}
            applyAudioEffect={applyAudioEffect}
          />
        </div>
      </div>
    );
  };
  const createTracks = async (effect: AudioEffect) => {
    if (mediaStream.current) return;
    
    const canvas = document.querySelector("#webar-app canvas") as HTMLCanvasElement;
    if (!canvas) return;

    audioStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioTrack = audioStream.current.getAudioTracks()[0];

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));

    let destination = audioContext.createMediaStreamDestination();

    if (effect !== AudioEffect.DEFAULT) {
      const bufferSize = 4096;
      const pitchShifter = audioContext.createScriptProcessor(bufferSize, 1, 1);
      const lowPassFilter = audioContext.createBiquadFilter();
      const highPassFilter = audioContext.createBiquadFilter();

      lowPassFilter.type = 'lowpass';
      lowPassFilter.frequency.value = 8000;
      lowPassFilter.Q.value = 0.7;

      highPassFilter.type = 'highpass';
      highPassFilter.frequency.value = 300;
      highPassFilter.Q.value = 0.7;

      const pitchRatio = 1.5;

      pitchShifter.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const outputData = event.outputBuffer.getChannelData(0);

        for (let i = 0; i < inputData.length; i++) {
          const index = Math.floor(i * pitchRatio);
          if (index < inputData.length) {
            outputData[i] = inputData[index] * 0.8;
          }
        }
      };
      
      switch(effect) {
        case AudioEffect.CHIPMUNK:
          source.connect(highPassFilter);
          highPassFilter.connect(lowPassFilter);
          lowPassFilter.connect(pitchShifter);
          pitchShifter.connect(destination);
          break;
        case AudioEffect.ROBOT:
          const delayNodeRobot = audioContext.createDelay();
          delayNodeRobot.delayTime.value = 0.1;

          const distortionNodeRobot = audioContext.createWaveShaper();
          const samplesRobot = 44100;
          const curveRobot = new Float32Array(samplesRobot);
          const degRobot = Math.PI / 180;
          for (let i = 0; i < samplesRobot; ++i) {
            const x = (i * 2) / samplesRobot - 1;
            curveRobot[i] = (3 + 400) * x * 20 * degRobot / (Math.PI + 400 * Math.abs(x));
          }
          distortionNodeRobot.curve = curveRobot;
          distortionNodeRobot.oversample = '4x';


          const gain = audioContext.createGain();
          gain.gain.value = 0.3;

          source.connect(delayNodeRobot);
          delayNodeRobot.connect(distortionNodeRobot);
          distortionNodeRobot.connect(gain);
          gain.connect(destination);
          break;
        case AudioEffect.GHOST:
          const delayNode = audioContext.createDelay();
          delayNode.delayTime.value = 0.3;

          const filterNode = audioContext.createBiquadFilter();
          filterNode.type = "lowpass";
          filterNode.frequency.value = 600;

          const reverbNode = audioContext.createConvolver();
          const seconds = 3;
          const length = audioContext.sampleRate * seconds;
          const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
          const impulseL = impulse.getChannelData(0);
          const impulseR = impulse.getChannelData(1);

          for (let i = 0; i < length; i++) {
            const decay = Math.pow(1 - i / length, 2);
            impulseL[i] = (Math.random() * 2 - 1) * decay;
            impulseR[i] = (Math.random() * 2 - 1) * decay;
          }
          reverbNode.buffer = impulse;

          const gainNode = audioContext.createGain();
          gainNode.gain.value = 4.0;

          source.connect(delayNode);
          delayNode.connect(filterNode);
          filterNode.connect(reverbNode);
          reverbNode.connect(gainNode);
          gainNode.connect(destination);
          break;
        case AudioEffect.GIGACHAD:
          const delayNodeGiga = audioContext.createDelay();
          delayNodeGiga.delayTime.value = 0.1;

          const filterNodeGiga = audioContext.createBiquadFilter();
          filterNodeGiga.type = 'lowpass';
          filterNodeGiga.frequency.value = 4000;
          filterNodeGiga.Q.value = 0.5;

          const distortionNode = audioContext.createWaveShaper();
          const samples = 44100;
          const curve = new Float32Array(samples);
          const deg = Math.PI / 180;
          for (let i = 0; i < samples; ++i) {
            const x = (i * 2) / samples - 1;
            curve[i] = Math.tanh((3 + 400) * x * 10 * deg) * 0.8;
          }
          distortionNode.curve = curve;
          distortionNode.oversample = '4x';

          const gainNodeGiga = audioContext.createGain();
          gainNodeGiga.gain.value = 0.6;

          source.connect(filterNodeGiga);
          filterNodeGiga.connect(delayNodeGiga);
          delayNodeGiga.connect(distortionNode);
          distortionNode.connect(gainNodeGiga);
          gainNodeGiga.connect(destination);
          break;
        case AudioEffect.TROLL:
          console.log("Troll")
          break;
      }

   
    } else {
      source.connect(destination);
    }

    const processedTrack = destination.stream.getAudioTracks()[0];
    
    mediaStream.current = canvas.captureStream(30);
    const publishTrack = mediaStream.current.getVideoTracks()[0];

    const audioPublication = await localParticipant.localParticipant.publishTrack(processedTrack, {
      source: Track.Source.Microphone,
    });
    
    const videoPublication = await localParticipant.localParticipant.publishTrack(publishTrack, {
      source: Track.Source.Camera,
    });

    setAudioContext(audioContext);
  };

  const applyAudioEffect = async (effect: DataVoiceParams) => {
  

  };

  useEffect(() => {
    if (tracks.length === 0) {
      setContent(
        <OfflineVideo
          username={hostName}
          canCreate={isHosted}
          onCreateStream={(onCreateStream)}
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
