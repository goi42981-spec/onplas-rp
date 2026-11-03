<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The Onplas site is a prebuilt bundle served from `public/onplas-rp/` (no original source was available); `src/routes/index.tsx` mounts it into `#root` and loads its helper scripts, and `TransitionBridge` renders the section/map transition overlays. Edit content by changing those files, not by rebuilding the bundle.
- Append new lore or mechanics text from `public/onplas-rp/rule-text-override.js` as DOM blocks guarded by a `data-*` marker so re-runs stay idempotent; section hero headings are animated letter by letter, so match their text with whitespace removed.

