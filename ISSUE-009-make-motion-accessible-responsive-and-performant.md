# Make the complete motion journey accessible and responsive

Type: AFK

## What to build

Apply a coherent three-level motion system across the completed journey: primary project-media transitions, secondary content entrances, and tertiary affordance feedback. Provide an equivalent reduced-motion experience, simplify mobile choreography, preserve keyboard and touch access, and keep animation work within a measured performance budget.

## Acceptance criteria

- [ ] `prefers-reduced-motion` disables smooth scrolling, scrubbed timelines, continuous marquees, and nonessential pointer motion while retaining all content.
- [ ] Only project media uses extended scroll-synced choreography; ordinary content uses short entrance timelines.
- [ ] Mobile avoids pinned content and long artificial scroll budgets.
- [ ] Important content and actions never depend on hover or the custom cursor.
- [ ] GSAP selectors are scoped, ScrollTriggers clean up correctly, and plugins are registered once at the established root.
- [ ] Keyboard focus is visible and follows the visual reading order.
- [ ] Runtime checks find no clipped text, trapped scroll, overlapping sections, or sustained off-screen animation.

## Blocked by

- `ISSUE-003-build-project-playground.md`
- `ISSUE-005-polish-project-playground-previews.md`
- `ISSUE-006-document-project-entry-workflow.md`
- `ISSUE-007-reframe-about-and-experience.md`
- `ISSUE-008-deliver-focused-contact-ending.md`
