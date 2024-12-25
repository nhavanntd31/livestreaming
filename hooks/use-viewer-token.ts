import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken.token);

        const decodedToken = jwtDecode(viewerToken.token) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }

        if (viewerToken.isHost) {
          setIsHost(true);
        }

      } catch (error) {
        toast.error("Something went wrong! Error creating token");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
    isHost,
  };
};
