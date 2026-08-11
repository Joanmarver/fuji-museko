---
name: caveman-mode
description: "Activate caveman mode whenever the user's message contains the literal command /caveman, regardless of what comes before or after it in the message. The command can appear alone (/caveman), followed by a level number (e.g. /caveman 3), or as /caveman off to deactivate it. This mode does NOT change Claude's speaking style, tone, or vocabulary in any way: it only controls how brief the response is and how much secondary information gets omitted, on a numeric scale. The first time it is activated in a conversation, it locks in a default level to be reused on future activations without a number. ALWAYS use this skill whenever /caveman appears in the user's message, no matter the language of the conversation."
---

# Caveman Mode (brevity control)

Important: this skill does NOT change Claude's style, tone, or vocabulary in any way. Claude keeps speaking exactly as it normally would — same voice, same language as the conversation (do not switch languages because of this skill). The only thing the level changes is **how much Claude says**: response length and how much secondary information gets omitted.

**Language note:** this SKILL.md is written in English, but that has no effect on the language Claude responds in. Claude must always keep responding in the language the user is using in the conversation (in this case, Spanish), regardless of the language this skill file is written in.

## Activation syntax

- `/caveman` (no number) → uses the conversation's **default level** (see below for how it's set).
- `/caveman N` (where N is 1-5) → activates that specific level and makes it the new default.
- `/caveman off` or `/caveman stop` → deactivates the mode, responses go back to normal and complete.
- The mode stays active on every following response until it's turned off or the level is changed.
- Never mention or repeat the command in the response — just apply the level starting from that message onward.

## Setting the default level

The first time the user types `/caveman` in the conversation:

- If they typed it with a number (e.g. `/caveman 2`), that number becomes the default for the rest of the conversation.
- If they typed it with no number (`/caveman` alone), ask briefly, in the conversation's language (Spanish), something like: "¿Qué nivel quieres como predeterminado, del 1 al 5?" before applying anything. Once they answer, use that level for this and every future bare `/caveman`.

If the user later types `/caveman N` with a different number, that N becomes the new default (overwrites the previous one).

## The levels

### Level 1 — Light
Slightly more compact than a normal answer: trims filler, intros, and repetition, but keeps all relevant information, including examples if they add value.

### Level 2 — Concise
Only the essential information. No extra examples unless explicitly requested. Short sentences, short paragraphs. Secondary context that doesn't change the answer gets dropped.

### Level 3 — Compact
Answers as lists or very short sentences, almost no connectors. Nuance, alternatives, and secondary caveats get omitted (not critical safety warnings). Straight to the point.

### Level 4 — Minimal
The response is trimmed to exactly what's needed to resolve the request: few words, no "why" explanation unless it's essential. Every detail that isn't the core of the answer gets omitted.

### Level 5 — Extreme
The response is reduced to its shortest possible form: a word, a single data point, a number, a minimal sentence. Almost everything else is omitted (context, nuance, alternatives, explanation). Just the raw answer or result.

## What is NEVER omitted, at any level

- Safety, health, or legal warnings when relevant to the question.
- Exact technical data explicitly requested (numbers, code, commands, names) — the surrounding explanation can be dropped, but not the data itself if that's what was asked for.
- Any piece of information whose absence would make the answer wrong or misleading, not just incomplete.

If following the requested level would make the response useless or dangerously incomplete for what's being asked, prioritize correctness and add the minimum needed, even if that means going slightly past the level.

## Turning it off

On receiving `/caveman off` or `/caveman stop`, confirm briefly in the conversation's language (e.g. "Modo caveman desactivado.") and go back to full, normal responses from then on.
