# Skill Execution and Synthesis Report

## Topic

**High drop-off rate during B2B SaaS onboarding (Drop-off increased from 40% to 65% in the last quarter).**

## Selected Skills

1. **Hypothesis Tree** (`hypothesis-tree`)
2. **Five Whys** (`five-whys`)
3. **Fogg Behavior Model** (`fogg-behavior-model`)
4. **Cognitive Load** (`cognitive-load`)
5. **Progressive Disclosure** (`progressive-disclosure`)

---

## 1. Execution Logs

### Skill 1: Hypothesis Tree

**Central Question:** Why did the onboarding drop-off rate increase from 40% to 65% in the last quarter?

#### Hypothesis Tree Structure

Increased Onboarding Drop-off
├── H1: Awareness / Expectation Mismatch
│ ├── H1.1: Marketing changed messaging, attracting the wrong users
│ └── H1.2: Users expect a different core feature upon first login
├── H2: Ability / Friction
│ ├── H2.1: The recent addition of the "Team Setup" step is too complex
│ └── H2.2: The new mandatory "Connect CRM" integration fails or takes too long
└── H3: Motivation / Value Realization
├── H3.1: Users don't see the "Aha!" moment quickly enough
└── H3.2: The perceived value doesn't justify the setup effort

#### Prioritized Testing Plan

_Priority 1:_ H2.2 (Connect CRM integration) - High impact, low effort to test.
_Priority 2:_ H2.1 (Team Setup complexity) - High impact, medium effort to test.

### Skill 2: Five Whys

**Problem Statement:** Users are abandoning the onboarding process during the new mandatory "Connect CRM" step.

#### Question Chain

1. **Why?** Because the CRM connection process frequently times out or throws confusing error messages.
2. **Why?** Because the API rate limits on the CRM provider's side are being hit during the initial bulk data sync.
3. **Why?** Because we attempt to sync the entire historical database of the user's CRM immediately upon connection.
4. **Why?** Because the onboarding flow was designed to show a fully populated dashboard as the first "Aha!" moment.
5. **Why?** Because we assumed users needed to see all their historical data to understand the product's value, rather than just a sample or recent data.

#### Root Cause

The product strategy incorrectly prioritized a "fully populated dashboard" over a "fast and successful connection," leading to a heavy, synchronous data fetch that fails due to API limits.

#### Recommended Solutions

- High Priority: Change the initial sync to only fetch the last 7 days of data, syncing the rest asynchronously in the background.
- Medium Priority: Make the CRM connection step optional during initial onboarding and prompt for it later.

### Skill 3: Fogg Behavior Model

**Target Behavior:** Complete the "Connect CRM" and "Team Setup" onboarding steps.

#### Current State

- **Motivation:** Score 3/5. Users want to use the tool, but the immediate benefit of connecting the CRM isn't fully clear before they've seen the product.
- **Ability:** Score 1/5. Connecting the CRM takes too much time (due to sync), and "Team Setup" requires coordinating with other colleagues immediately. (Mental & Time bottlenecks).
- **Prompt:** Score 4/5. The onboarding wizard explicitly prompts them to do it.

#### Diagnosis

**Primary Issue:** Ability.
**Root Cause:** The tasks required (full CRM sync + inviting team members) demand too much time, mental effort, and social coordination right at the beginning of the user journey.

#### Intervention Design

- **Intervention 1 (Ability):** Defer "Team Setup" until the user has successfully completed their first core task alone.
- **Intervention 2 (Ability):** Simplify CRM connection to a 1-click OAuth that syncs data in the background.

### Skill 4: Cognitive Load

**Feature/Flow:** New User Onboarding Flow (Account Creation -> Team Setup -> Connect CRM -> Dashboard)

#### Task Map

| Step | Description      | Intrinsic | Extraneous | Germane |
| ---- | ---------------- | --------- | ---------- | ------- |
| 1    | Account Creation | Low       | Low        | Low     |
| 2    | Team Setup       | High      | Medium     | Low     |
| 3    | Connect CRM      | High      | High       | Medium  |
| 4    | View Dashboard   | Medium    | Low        | High    |

#### Load Issues Identified

- **Intrinsic Load Problems:** Team Setup requires knowing colleagues' roles and emails immediately.
- **Extraneous Load Problems:** Connect CRM has technical jargon and confusing error states if API limits are hit.

#### Recommendations

- **High Priority:** Remove "Team Setup" from the critical path to reduce intrinsic load.
- **High Priority:** Redesign the CRM connection screen to remove technical API jargon and clarify what is happening during the background sync.

### Skill 5: Progressive Disclosure

**Interface:** Onboarding Wizard

#### Element Inventory

- **E1:** Account Creation (Essential -> Always visible)
- **E2:** Basic Profile Setup (Important -> Level 1)
- **E3:** Connect CRM (Important -> Level 1)
- **E4:** Advanced CRM Mapping (Advanced -> Level 2)
- **E5:** Team Setup (Advanced -> Level 2)

#### Disclosure Hierarchy

- **Level 0 (Always visible):** Account Creation, Welcome Screen with 1 core action (e.g., "Create your first project").
- **Level 1 (One interaction):** "Connect your CRM to import existing projects" (Triggered after first project is created or via a clear banner).
- **Level 2 (Two interactions):** "Invite your team to collaborate" (Triggered after the user experiences the value of the tool themselves).

#### Expected Impact

- Task completion rate for initial onboarding increases from 35% to 80%.
- Time to complete initial onboarding reduces from 15 mins to 2 mins.

---

## 2. Clustering & Mapping

The insights gathered from the five frameworks can be clustered into three core operational areas:

### Cluster A: Strategic Alignment & Core Assumptions (The "Why")

- **Source Skills:** Hypothesis Tree, Five Whys
- **Insight:** We assumed users needed a fully populated, multi-player dashboard to experience value. This assumption led to a bloated, failure-prone onboarding process.
- **Action:** Shift the strategic definition of the "Aha!" moment from "Full Historical Data + Team" to "First Successful Single-Player Action + Recent Data Sample."

### Cluster B: Behavioral & Mental Friction (The "What")

- **Source Skills:** Fogg Behavior Model, Cognitive Load
- **Insight:** The onboarding steps exceed the user's current motivation level because the _ability_ required (time, mental effort, social coordination) is too high. The cognitive load of configuring integrations and team roles upfront is overwhelming.
- **Action:** Drastically reduce the required ability. Lower cognitive load by deferring complex decisions (like team roles) until the user is acclimated to the software.

### Cluster C: Interface & Experience Design (The "How")

- **Source Skills:** Progressive Disclosure
- **Insight:** Presenting all setup tasks in a linear, mandatory wizard violates progressive disclosure principles.
- **Action:** Restructure the UI to reveal complexity gradually. Level 0 = Create Account & First Action. Level 1 = Integrations. Level 2 = Team Invites.

---

## 3. Synthetisch (Synthesis)

**The Synthesis:**
The recent spike in onboarding drop-offs is a systemic failure caused by **front-loading complexity**. By attempting to force users into a fully configured, multi-player state before they have experienced the core value of the product, we have inadvertently spiked both _cognitive load_ and _friction (decreased ability)_.

The root cause of technical failures (CRM sync timeouts) and behavioral failures (abandoning at Team Setup) stem from the same strategic misstep: prioritizing a "complete" initial state over a "successful" initial state.

**The Unified Solution Plan:**

1. **Redefine the Onboarding Goal:** The goal is no longer a fully configured account, but rather the completion of one successful, single-player core task.
2. **Apply Progressive Disclosure:** Break the monolithic onboarding wizard into contextual prompts.
   - _Day 1:_ Account creation + 1 simple task.
   - _Day 2:_ Prompt to connect CRM (syncing only recent data asynchronously).
   - _Day 3+ (Post-Value):_ Prompt to invite team members.
3. **Fix the Technical Bottleneck:** Refactor the CRM integration to perform a lightweight, asynchronous sync to prevent the API timeouts identified in the Five Whys analysis.

By addressing the strategic assumption (Five Whys/Hypothesis Tree), restructuring the behavioral expectations (Fogg/Cognitive Load), and redesigning the interface delivery (Progressive Disclosure), we can confidently reverse the drop-off trend.
