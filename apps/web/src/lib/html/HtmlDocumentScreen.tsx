import React from "react";

function extractBodyClass(html: string) {
  const match = html.match(/<body[^>]*class="([^"]*)"/i);
  return match?.[1] ?? "";
}

function extractBodyInner(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? "";
}

function extractHeadStyles(html: string) {
  // Preserve Stitch's `<style>...</style>` blocks (we intentionally ignore
  // scripts/links in `<head>` since the app is already styled via Tailwind).
  return Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((m) => m[1])
    .join("\n");
}

export function HtmlDocumentScreen({ html }: { html: string }) {
  const bodyClass = extractBodyClass(html);
  const bodyInner = extractBodyInner(html);
  const styles = extractHeadStyles(html);

  return (
    <div className={bodyClass || undefined}>
      {styles ? (
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: bodyInner }} />
    </div>
  );
}

