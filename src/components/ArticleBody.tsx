import React from "react";
import Link from "next/link";

// Renders a constrained subset of markdown used by the blog article bodies:
// ## H2, ### H3, paragraphs, "- " bullets, "1." ordered lists, "> " quotes,
// GitHub-style tables, plus inline [label](/url) links and **bold**.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Tokenize on links and bold, preserving order.
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[1] !== undefined) {
      const label = match[1];
      const href = match[2];
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      nodes.push(
        isInternal ? (
          <Link
            key={`${keyPrefix}-l${i}`}
            href={href}
            className="text-teal-light hover:underline"
          >
            {label}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-l${i}`}
            href={href}
            className="text-teal-light hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="text-warm-white font-semibold">
          {match[3]}
        </strong>
      );
    }
    last = regex.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function splitRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      out.push(
        <h3
          key={key++}
          className="font-display text-warm-white text-[20px] md:text-[22px] mt-9 mb-3"
        >
          {renderInline(trimmed.slice(4), `h3-${key}`)}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      out.push(
        <h2
          key={key++}
          className="font-display text-warm-white text-[26px] md:text-[30px] mt-12 mb-4 leading-tight"
        >
          {renderInline(trimmed.slice(3), `h2-${key}`)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      out.push(
        <blockquote
          key={key++}
          className="border-l-2 border-teal/40 pl-5 my-6 text-mist italic"
        >
          {renderInline(trimmed.slice(2), `q-${key}`)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Table: header row followed by a separator row of dashes.
    if (
      trimmed.startsWith("|") &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|?$/.test(lines[i + 1].trim()) &&
      lines[i + 1].includes("-")
    ) {
      const header = splitRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i].trim()));
        i++;
      }
      out.push(
        <div key={key++} className="my-7 overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-warm-white/15">
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="py-3 pr-4 text-warm-white font-semibold align-top"
                  >
                    {renderInline(h, `th-${key}-${hi}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-warm-white/[0.07]">
                  {r.map((c, ci) => (
                    <td key={ci} className="py-3 pr-4 text-mist align-top">
                      {renderInline(c, `td-${key}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list.
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(
        <ul key={key++} className="my-5 space-y-2.5 list-none">
          {items.map((it, idx) => (
            <li key={idx} className="flex gap-3 text-mist leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
              <span>{renderInline(it, `li-${key}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list.
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      out.push(
        <ol key={key++} className="my-5 space-y-2.5 list-none counter-reset">
          {items.map((it, idx) => (
            <li key={idx} className="flex gap-3 text-mist leading-relaxed">
              <span className="text-teal-light font-semibold shrink-0">
                {idx + 1}.
              </span>
              <span>{renderInline(it, `oli-${key}-${idx}`)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph.
    out.push(
      <p key={key++} className="text-[17px] text-mist leading-relaxed my-5">
        {renderInline(trimmed, `p-${key}`)}
      </p>
    );
    i++;
  }

  return <div className="article-body">{out}</div>;
}
