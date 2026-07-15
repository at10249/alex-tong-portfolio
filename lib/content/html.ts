// Small HTML-string builder helpers shared across the artifact content
// functions. Ported verbatim (in behavior) from the design reference's
// DCLogic class methods (aLink / linkBtn / sourceCard / chipTag / banner).
// Output is trusted, author-authored markup rendered via
// dangerouslySetInnerHTML — there is no user input in these strings.

export function aLink(id: string, label: string): string {
  return `<b data-art="${id}" style="color:var(--accent);font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px">${label}</b>`;
}

export function em(text: string): string {
  return `<b style="color:var(--accent);font-weight:600">${text}</b>`;
}

export function strongText(text: string): string {
  return `<b style="color:var(--text);font-weight:600">${text}</b>`;
}

export function linkBtn(link: string | undefined | null, label: string): string {
  if (link && link !== "#") {
    return `<a href="${link}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-family:var(--font);font-weight:500;font-size:11.5px;padding:8px 13px;border-radius:var(--r-sm);background:var(--accent);color:var(--accent-ink);text-decoration:none">${label} →</a>`;
  }
  return `<div style="margin-top:16px;font-family:var(--mono);font-size:10px;color:var(--faint);border:1px dashed var(--border);border-radius:6px;padding:7px 10px;display:inline-block">link coming soon — send me the URL to wire up</div>`;
}

export function sourceCard(link: string | undefined | null, label: string): string {
  if (!link || link === "#") return linkBtn(link, label);
  const domain = link.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return `<a href="${link}" target="_blank" rel="noopener" style="display:block;margin-top:16px;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;text-decoration:none;background:var(--panel2)">
      <div style="display:flex;align-items:center;gap:6px;padding:8px 11px;background:var(--chip);border-bottom:1px solid var(--border)"><span style="width:8px;height:8px;border-radius:50%;background:#e0725a"></span><span style="width:8px;height:8px;border-radius:50%;background:#d9b45a"></span><span style="width:8px;height:8px;border-radius:50%;background:#7bb585"></span><span style="margin-left:6px;font-family:var(--mono);font-size:10px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${domain}</span></div>
      <div style="padding:12px 13px"><div style="font-family:var(--font);font-size:8.5px;font-weight:600;letter-spacing:1px;color:var(--faint);text-transform:uppercase;margin-bottom:5px">Source</div><div style="font-family:var(--font);font-weight:600;font-size:12px;line-height:1.4;color:var(--text)">${label}</div><div style="margin-top:8px;font-family:var(--mono);font-size:10px;color:var(--accent)">Open source ↗</div></div>
    </a>`;
}

export function chipTag(tags: string | undefined | null): string {
  if (!tags) return "";
  const pills = tags
    .split(",")
    .map(
      (x) =>
        `<span style="font-family:var(--mono);font-size:8.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);border-radius:5px;padding:3px 8px">${x.trim()}</span>`
    )
    .join("");
  return `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:11px">${pills}</div>`;
}

export function banner(img: string | undefined | null): string {
  return img
    ? `<img src="${img}" alt="" style="width:100%;height:170px;object-fit:cover;border-radius:var(--r-md);margin-top:14px;border:1px solid var(--border)">`
    : "";
}
