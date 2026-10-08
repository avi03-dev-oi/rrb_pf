# Road to Rainbow — implementation plan

## Product
A responsive one-page portfolio for biology educator Manisha Dhar and Road to Rainbow, following the supplied wireframe section order and content. The first release is a static browser experience with interactions implemented in vanilla JavaScript so the preview stays fast and portable.

## Design direction
- **Design movement:** warm editorial education meets hand-drawn botanical field notes.
- **Core principles:** optimistic learning, generous whitespace, human warmth, and quiet precision.
- **Color philosophy:** cream and cloud-white create a notebook-like canvas; deep ink navy gives academic confidence; lilac and soft green carry biology and calm; sunshine yellow is the ownable CTA highlight.
- **Layout paradigm:** alternating editorial bands with asymmetric split compositions, floating annotations, and offset cards rather than a generic centered grid.
- **Signature elements:** underlined marker strokes, botanical line motifs, and biology micro-illustrations (DNA/cells/leaves).
- **Interaction philosophy:** every control should feel like turning a page or moving a study card—soft, tactile, and legible.
- **Animation:** a cell loader on entry; scroll reveals with short staggered lifts; slow floating DNA/leaf motifs; spring-like card hover; cross-fade gallery filtering; reduced-motion fallbacks.
- **Typography:** Plus Jakarta Sans for UI and body copy, with Space Grotesk for display headlines and labels.
- **Brand essence:** a patient, modern biology guide who turns complex science into a brighter next step. Personality: warm, curious, assured.
- **Brand voice:** clear and encouraging. Example lines: “Let curiosity lead.” / “Your next chapter can begin with one good question.”
- **Wordmark:** stacked “Road to / Rainbow” with a small hand-drawn rainbow arc and leaf seed mark.
- **Signature brand color:** sunshine yellow `#FFE568`.

## Structure
- `index.html`: semantic page shell and all sections.
- `styles.css`: tokens, responsive layout, illustration details, and motion.
- `app.js`: loader, scroll spy/reveal, mobile nav, carousel, gallery filters, and form state.
- `assets/`: crops from the user-supplied wireframe for continuity.
- `server.mjs` / `build.mjs`: preview and static build utilities.
- `public/manus-routes.json`: page route declaration.
