import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, EnvironmentalLaw, EnvironmentalTreaty, InteractiveTimeline, EnvironmentalLawProposal, TreatyComparison } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetEnvironmentalLaws() {
  const { actor, isFetching } = useActor();

  return useQuery<EnvironmentalLaw[]>({
    queryKey: ['environmentalLaws'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnvironmentalLaws();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEnvironmentalTreaties() {
  const { actor, isFetching } = useActor();

  return useQuery<EnvironmentalTreaty[]>({
    queryKey: ['environmentalTreaties'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnvironmentalTreaties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInteractiveTimelines() {
  const { actor, isFetching } = useActor();

  return useQuery<InteractiveTimeline[]>({
    queryKey: ['interactiveTimelines'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInteractiveTimelines();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTreatyComparisons() {
  const { actor, isFetching } = useActor();

  return useQuery<TreatyComparison[]>({
    queryKey: ['treatyComparisons'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTreatyComparisons();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEnvironmentalLawProposals() {
  const { actor, isFetching } = useActor();

  return useQuery<EnvironmentalLawProposal[]>({
    queryKey: ['environmentalLawProposals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnvironmentalLawProposals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnvironmentalLawProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (proposal: EnvironmentalLawProposal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitEnvironmentalLawProposal(proposal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['environmentalLawProposals'] });
    },
  });
}

export function useVoteForLawProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, isFor }: { proposalId: string; isFor: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.voteForLawProposal(proposalId, isFor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['environmentalLawProposals'] });
    },
  });
}

export function useGetAllUserProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['allUserProfiles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
