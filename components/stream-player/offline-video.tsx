import React from "react";
import { WifiOff } from "lucide-react";
import { ConnectWebcamStreaming } from "@/app/(dashboard)/u/[username]/keys/_components/connect-webcam";

export function OfflineVideo({ username, canCreate, onCreateStream }: { username: string, canCreate: boolean, onCreateStream: (roomName: string) => void }) {
  
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
      {canCreate && (
        <ConnectWebcamStreaming onCreateStream={onCreateStream} />
      )}
    </div>
  );
}
