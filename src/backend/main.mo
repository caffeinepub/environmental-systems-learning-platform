import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent storage mixins
  include MixinStorage();

  /// ---------------------------------
  /// User Profile Types and Storage
  /// ---------------------------------

  public type UserProfile = {
    name : Text;
    role : Text; // "student" or "teacher"
    email : Text;
    completedUnits : [Nat];
    quizScores : [(Text, Nat)]; // (quizId, score)
    badges : [Text];
    careerReflections : [Text];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  /// ---------------------------------
  /// User Profile Functions
  /// ---------------------------------

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or admin access required");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  /// ---------------------------------
  /// Types and Modules
  /// ---------------------------------

  public type EnvironmentalLaw = {
    id : Text;
    name : Text;
    description : Text;
    yearEnacted : Nat;
    impactScore : Nat;
    globeImpact : [GlobeImpact];
  };

  public type EnvironmentalTreaty = {
    id : Text;
    name : Text;
    description : Text;
    yearSigned : Nat;
    globalImpactScore : Nat;
    comparisonData : TreatyComparisonData;
    participatingCountries : [Text];
  };

  public type TreatyComparisonData = {
    reducedEmissions : Nat;
    protectedSpecies : Nat;
  };

  public type GlobeImpact = {
    region : Text; // e.g. "North America", "Europe"
    climateChangeScore : Nat;
    biodiversityScore : Nat;
    airQualityScore : Nat;
  };

  public type TreatyComparison = {
    treaty1Id : Text;
    treaty2Id : Text;
    emissionReductionDifference : Int;
    speciesProtectionDifference : Int;
    complianceScoreDifference : Int;
  };

  public type TreatySimulationResult = {
    treatyId : Text;
    simulationYear : Nat;
    projectedImpact : Nat;
  };

  public type EnvironmentalLawProposal = {
    id : Text;
    title : Text;
    description : Text;
    proposedBy : Principal;
    supportingArguments : [Text];
    votingPrincipals : [Principal];
    votesFor : Nat;
    votesAgainst : Nat;
    status : LawProposalStatus;
    submissionDate : Int;
    votingDeadline : Int;
    purpose : Text;
    implementationPlan : Text;
    expectedEnvironmentalImpact : Nat;
  };

  public type LawProposalStatus = {
    #UnderReview;
    #VotingInProgress;
    #Enacted;
    #Rejected;
    #PendingReview;
  };

  public type InteractiveTimeline = {
    id : Text;
    title : Text;
    description : Text;
    timelineEvents : [TimelineEvent];
    interactiveActivities : [InteractiveActivity];
    globalImpactData : [GlobeImpact];
    treatyComparison : TreatyComparisonData;
    engagementScore : Nat;
  };

  public type TimelineEvent = {
    id : Text;
    eventType : LawTimelineEventType;
    timestamp : Int;
    environmentalChangeScore : Nat;
    publicAwarenessData : [Text];
    region : Text;
  };

  public type InteractiveActivity = {
    id : Text;
    title : Text;
    activityType : ActivityType;
    completionScore : Nat;
    participationData : [Text];
  };

  public type LawTimelineEventType = {
    #Enacted;
    #Challenged;
    #Renewed;
    #Amended;
    #Expired;
    #Implemented;
    #Updated;
    #Reviewed;
  };

  public type ActivityType = {
    #Quiz;
    #Simulation;
    #VirtualLab;
    #Assessment;
    #Project;
    #Experiment;
    #CaseStudy;
    #FieldTrip;
    #Lesson;
    #Unit;
  };

  module EnvironmentalLaw {
    public func compare(law1 : EnvironmentalLaw, law2 : EnvironmentalLaw) : Order.Order {
      switch (Nat.compare(law1.yearEnacted, law2.yearEnacted)) {
        case (#equal) { Text.compare(law1.name, law2.name) };
        case (order) { order };
      };
    };
  };

  module EnvironmentalTreaty {
    public func compare(treaty1 : EnvironmentalTreaty, treaty2 : EnvironmentalTreaty) : Order.Order {
      switch (Nat.compare(treaty1.yearSigned, treaty2.yearSigned)) {
        case (#equal) { Text.compare(treaty1.name, treaty2.name) };
        case (order) { order };
      };
    };
  };

  module GlobeImpact {
    public func compareByRegion(impact1 : GlobeImpact, impact2 : GlobeImpact) : Order.Order {
      Text.compare(impact1.region, impact2.region);
    };

    public func compareByClimateScore(impact1 : GlobeImpact, impact2 : GlobeImpact) : Order.Order {
      Nat.compare(impact1.climateChangeScore, impact2.climateChangeScore);
    };
  };

  /// ---------------------------------
  /// Persistent Storage
  /// ---------------------------------

  let environmentalLaws = Map.empty<Text, EnvironmentalLaw>();
  let environmentalTreaties = Map.empty<Text, EnvironmentalTreaty>();
  let treatyComparisons = Map.empty<Text, TreatyComparison>();
  let environmentalLawProposals = Map.empty<Text, EnvironmentalLawProposal>();
  let environmentalTimelines = Map.empty<Text, InteractiveTimeline>();
  let environmentalTimelineEvents = Map.empty<Text, TimelineEvent>();
  let environmentalActivities = Map.empty<Text, InteractiveActivity>();

  /// ---------------------------------
  /// Environmental Law Functions
  /// ---------------------------------

  public shared ({ caller }) func submitEnvironmentalLawProposal(proposal : EnvironmentalLawProposal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit proposals");
    };
    switch (environmentalLawProposals.get(proposal.id)) {
      case (null) {
        environmentalLawProposals.add(
          proposal.id,
          {
            proposal with
            proposedBy = caller;
            status = (#PendingReview : LawProposalStatus);
            submissionDate = Time.now();
          },
        );
      };
      case (?_) {
        Runtime.trap("Proposal with this id already exists");
      };
    };
  };

  public shared ({ caller }) func voteForLawProposal(proposalId : Text, isFor : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can vote on proposals");
    };
    switch (environmentalLawProposals.get(proposalId)) {
      case (null) { Runtime.trap("Proposal not found") };
      case (?proposal) {
        let updatedProposal = {
          proposal with
          votesFor = if (isFor) { proposal.votesFor + 1 } else {
            proposal.votesFor;
          };
          votesAgainst = if (not isFor) {
            proposal.votesAgainst + 1;
          } else { proposal.votesAgainst };
        };
        environmentalLawProposals.add(proposalId, updatedProposal);
      };
    };
  };

  public shared ({ caller }) func updateLawProposalStatus(proposalId : Text, status : LawProposalStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update proposal status");
    };
    switch (environmentalLawProposals.get(proposalId)) {
      case (null) { Runtime.trap("Proposal not found") };
      case (?proposal) {
        environmentalLawProposals.add(proposalId, { proposal with status });
      };
    };
  };

  public query ({ caller }) func getEnvironmentalLawProposals() : async [EnvironmentalLawProposal] {
    // Any user including guests can view proposals
    environmentalLawProposals.values().toArray();
  };

  public query ({ caller }) func getEnvironmentalLawProposal(proposalId : Text) : async ?EnvironmentalLawProposal {
    // Any user including guests can view a specific proposal
    environmentalLawProposals.get(proposalId);
  };

  public query ({ caller }) func getInteractiveTimelines() : async [InteractiveTimeline] {
    // Any user including guests can view timelines
    environmentalTimelines.values().toArray();
  };

  public query ({ caller }) func getTimelineEventsByEventType(eventType : LawTimelineEventType) : async [TimelineEvent] {
    // Any user including guests can view timeline events
    let filteredEvents = environmentalTimelineEvents.values().toArray().filter(
      func(e) { e.eventType == eventType }
    );
    filteredEvents;
  };

  public query ({ caller }) func getTimelineEventsByRegion(region : Text) : async [TimelineEvent] {
    // Any user including guests can view timeline events by region
    let filteredEvents = environmentalTimelineEvents.values().toArray().filter(
      func(e) { e.region == region }
    );
    filteredEvents;
  };

  public query ({ caller }) func getInteractiveActivities() : async [InteractiveActivity] {
    // Any user including guests can view activities
    environmentalActivities.values().toArray();
  };

  public query ({ caller }) func getTimelineEventsByDecade(decadeStartYear : Int, decadeEndYear : Int) : async [TimelineEvent] {
    // Any user including guests can view timeline events by decade
    let filteredEvents = environmentalTimelineEvents.values().toArray().filter(
      func(e) { e.timestamp >= decadeStartYear and e.timestamp <= decadeEndYear }
    );
    filteredEvents;
  };

  /// ---------------------------------
  /// Admin Functions for Content Management
  /// ---------------------------------

  public shared ({ caller }) func addEnvironmentalLaw(law : EnvironmentalLaw) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add environmental laws");
    };
    environmentalLaws.add(law.id, law);
  };

  public shared ({ caller }) func addEnvironmentalTreaty(treaty : EnvironmentalTreaty) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add environmental treaties");
    };
    environmentalTreaties.add(treaty.id, treaty);
  };

  public shared ({ caller }) func addInteractiveTimeline(timeline : InteractiveTimeline) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add interactive timelines");
    };
    environmentalTimelines.add(timeline.id, timeline);
  };

  public shared ({ caller }) func addTimelineEvent(event : TimelineEvent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add timeline events");
    };
    environmentalTimelineEvents.add(event.id, event);
  };

  public shared ({ caller }) func addInteractiveActivity(activity : InteractiveActivity) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add interactive activities");
    };
    environmentalActivities.add(activity.id, activity);
  };

  /// ---------------------------------
  /// Public Query Functions (Read-Only)
  /// ---------------------------------

  public query ({ caller }) func getEnvironmentalLaws() : async [EnvironmentalLaw] {
    // Any user including guests can view environmental laws
    environmentalLaws.values().toArray();
  };

  public query ({ caller }) func getEnvironmentalTreaties() : async [EnvironmentalTreaty] {
    // Any user including guests can view environmental treaties
    environmentalTreaties.values().toArray();
  };

  public query ({ caller }) func getTreatyComparisons() : async [TreatyComparison] {
    // Any user including guests can view treaty comparisons
    treatyComparisons.values().toArray();
  };

  /// ---------------------------------
  /// Teacher Dashboard Functions
  /// ---------------------------------

  public query ({ caller }) func getAllUserProfiles() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all user profiles");
    };
    userProfiles.values().toArray();
  };

  public query ({ caller }) func getStudentProgress(student : Principal) : async ?UserProfile {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view student progress");
    };
    userProfiles.get(student);
  };
};
