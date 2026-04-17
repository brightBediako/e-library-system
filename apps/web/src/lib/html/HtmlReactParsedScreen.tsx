import React from "react";
import parse from "html-react-parser";

function extractBodyClass(html: string) {
  const match = html.match(/<body[^>]*class="([^"]*)"/i);
  return match?.[1] ?? "";
}

function extractBodyInner(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? "";
}

function extractHeadStyles(html: string) {
  return Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((m) => m[1])
    .join("\n");
}

export function HtmlReactParsedScreen({ html }: { html: string }) {
  const bodyClass = extractBodyClass(html);
  const bodyInner = extractBodyInner(html);
  const styles = extractHeadStyles(html);

  // `html-react-parser` outputs React nodes, so we avoid `dangerouslySetInnerHTML`.
  const nodes = parse(bodyInner);

  return (
    <div className={bodyClass || undefined}>
      {styles ? <style>{styles}</style> : null}
      {nodes}
    </div>
  );
}

