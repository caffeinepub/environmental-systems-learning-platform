import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EnvironmentalLaw {
    id: string;
    impactScore: bigint;
    name: string;
    description: string;
    yearEnacted: bigint;
    globeImpact: Array<GlobeImpact>;
}
export interface TreatyComparison {
    speciesProtectionDifference: bigint;
    treaty1Id: string;
    treaty2Id: string;
    complianceScoreDifference: bigint;
    emissionReductionDifference: bigint;
}
export interface EnvironmentalTreaty {
    id: string;
    globalImpactScore: bigint;
    yearSigned: bigint;
    name: string;
    description: string;
    comparisonData: TreatyComparisonData;
    participatingCountries: Array<string>;
}
export interface InteractiveTimeline {
    id: string;
    title: string;
    timelineEvents: Array<TimelineEvent>;
    globalImpactData: Array<GlobeImpact>;
    description: string;
    treatyComparison: TreatyComparisonData;
    interactiveActivities: Array<InteractiveActivity>;
    engagementScore: bigint;
}
export interface EnvironmentalLawProposal {
    id: string;
    votingPrincipals: Array<Principal>;
    status: LawProposalStatus;
    title: string;
    implementationPlan: string;
    votesAgainst: bigint;
    votesFor: bigint;
    expectedEnvironmentalImpact: bigint;
    supportingArguments: Array<string>;
    votingDeadline: bigint;
    description: string;
    submissionDate: bigint;
    purpose: string;
    proposedBy: Principal;
}
export interface TreatyComparisonData {
    reducedEmissions: bigint;
    protectedSpecies: bigint;
}
export interface TimelineEvent {
    id: string;
    region: string;
    publicAwarenessData: Array<string>;
    timestamp: bigint;
    environmentalChangeScore: bigint;
    eventType: LawTimelineEventType;
}
export interface GlobeImpact {
    region: string;
    climateChangeScore: bigint;
    biodiversityScore: bigint;
    airQualityScore: bigint;
}
export interface InteractiveActivity {
    id: string;
    title: string;
    activityType: ActivityType;
    participationData: Array<string>;
    completionScore: bigint;
}
export interface UserProfile {
    quizScores: Array<[string, bigint]>;
    name: string;
    badges: Array<string>;
    role: string;
    careerReflections: Array<string>;
    email: string;
    completedUnits: Array<bigint>;
}
export enum ActivityType {
    CaseStudy = "CaseStudy",
    Assessment = "Assessment",
    Quiz = "Quiz",
    Unit = "Unit",
    VirtualLab = "VirtualLab",
    Experiment = "Experiment",
    FieldTrip = "FieldTrip",
    Simulation = "Simulation",
    Project = "Project",
    Lesson = "Lesson"
}
export enum LawProposalStatus {
    UnderReview = "UnderReview",
    VotingInProgress = "VotingInProgress",
    Enacted = "Enacted",
    PendingReview = "PendingReview",
    Rejected = "Rejected"
}
export enum LawTimelineEventType {
    Enacted = "Enacted",
    Renewed = "Renewed",
    Updated = "Updated",
    Implemented = "Implemented",
    Amended = "Amended",
    Reviewed = "Reviewed",
    Challenged = "Challenged",
    Expired = "Expired"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    /**
     * / ---------------------------------
     * / Admin Functions for Content Management
     * / ---------------------------------
     */
    addEnvironmentalLaw(law: EnvironmentalLaw): Promise<void>;
    addEnvironmentalTreaty(treaty: EnvironmentalTreaty): Promise<void>;
    addInteractiveActivity(activity: InteractiveActivity): Promise<void>;
    addInteractiveTimeline(timeline: InteractiveTimeline): Promise<void>;
    addTimelineEvent(event: TimelineEvent): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / ---------------------------------
     * / Teacher Dashboard Functions
     * / ---------------------------------
     */
    getAllUserProfiles(): Promise<Array<UserProfile>>;
    /**
     * / ---------------------------------
     * / User Profile Functions
     * / ---------------------------------
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEnvironmentalLawProposal(proposalId: string): Promise<EnvironmentalLawProposal | null>;
    getEnvironmentalLawProposals(): Promise<Array<EnvironmentalLawProposal>>;
    /**
     * / ---------------------------------
     * / Public Query Functions (Read-Only)
     * / ---------------------------------
     */
    getEnvironmentalLaws(): Promise<Array<EnvironmentalLaw>>;
    getEnvironmentalTreaties(): Promise<Array<EnvironmentalTreaty>>;
    getInteractiveActivities(): Promise<Array<InteractiveActivity>>;
    getInteractiveTimelines(): Promise<Array<InteractiveTimeline>>;
    getStudentProgress(student: Principal): Promise<UserProfile | null>;
    getTimelineEventsByDecade(decadeStartYear: bigint, decadeEndYear: bigint): Promise<Array<TimelineEvent>>;
    getTimelineEventsByEventType(eventType: LawTimelineEventType): Promise<Array<TimelineEvent>>;
    getTimelineEventsByRegion(region: string): Promise<Array<TimelineEvent>>;
    getTreatyComparisons(): Promise<Array<TreatyComparison>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    /**
     * / ---------------------------------
     * / User Profile Types and Storage
     * / ---------------------------------
     */
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / ---------------------------------
     * / Environmental Law Functions
     * / ---------------------------------
     */
    submitEnvironmentalLawProposal(proposal: EnvironmentalLawProposal): Promise<void>;
    updateLawProposalStatus(proposalId: string, status: LawProposalStatus): Promise<void>;
    voteForLawProposal(proposalId: string, isFor: boolean): Promise<void>;
}
