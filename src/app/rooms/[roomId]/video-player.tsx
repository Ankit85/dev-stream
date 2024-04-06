"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  VideoPreview,
  CallStats,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateToken } from "./actions";

export const DevStreamVideoPlayer = ({ room }: { room: Room }) => {
  const session = useSession();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const apiKey = "avjk2xdzwvmk";

  useEffect(() => {
    if (!room) return;
    if (!session.data) return;

    const client = new StreamVideoClient({
      apiKey: apiKey,
      user: {
        id: session.data.user.id,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateToken(),
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });

    setCall(call);

    return () => {
      call.leave().catch((e) => console.error("error while leaving call", e));
      client
        .disconnectUser()
        .catch((e) => console.error("Failed to leave the call", e));

      setClient(null);
      setCall(null);
    };
  }, [session, room]);

  if (!client || !call) return null;

  return (
    call &&
    client && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamTheme>
          {/* <CallStats /> */}
        </StreamCall>
      </StreamVideo>
    )
  );
};
