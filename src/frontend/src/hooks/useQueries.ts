import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Greeting } from "../backend";
import { useActor } from "./useActor";

export function useCreateGreeting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      linkId,
      recipientName,
      message,
    }: { linkId: string; recipientName: string; message: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.createGreeting(linkId, recipientName, message);
      return linkId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["greetings"] });
    },
  });
}

export function useGetGreeting(linkId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Greeting>({
    queryKey: ["greeting", linkId],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getGreeting(linkId);
    },
    enabled: !!actor && !isFetching && !!linkId,
    retry: 1,
  });
}
