"use client";

import React, { useState, useTransition, useRef, ElementRef } from "react";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createIngress } from "@/actions/ingress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreateStreamResponse } from "@/app/libs/controller";
import { useRouter } from "next/navigation";


export function ConnectWebcamStreaming({ onCreateStream }: { onCreateStream: (roomName: string) => void }) {
  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [roomName, setRoomName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Create a Streamming Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new stream</DialogTitle>
        </DialogHeader>
        <Label>Room name</Label>
        <Input
          placeholder="Stream name..."
          className="max-w-sm"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <Label>Connect Webcam</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <Label>Connect Microphone</Label>
          <Switch />
        </div>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the currnet
            connection.
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={() => onCreateStream(roomName)} variant="primary">
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
