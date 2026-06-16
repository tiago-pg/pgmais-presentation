"use client";

import { useEffect, useRef, useState } from "react";

interface Connection {
  from: string;
  to: string;
}

interface ConnectorLinesProps {
  connections: Connection[];
  containerId: string;
}

export default function ConnectorLines({ connections, containerId }: ConnectorLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    const update = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newLines = connections
        .map(({ from, to }) => {
          const fromEl = document.getElementById(from);
          const toEl = document.getElementById(to);
          if (!fromEl || !toEl) return null;
          if (fromEl.classList.contains("hidden") || toEl.classList.contains("hidden")) return null;

          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();

          const x1 = fromRect.right - containerRect.left;
          const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
          const x2 = toRect.left - containerRect.left;
          const y2 = toRect.top + toRect.height / 2 - containerRect.top;

          return { x1, y1, x2, y2 };
        })
        .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number }[];

      setLines(newLines);
    };

    update();
    window.addEventListener("resize", update);
    const observer = new MutationObserver(update);
    const container = document.getElementById(containerId);
    if (container) {
      observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [connections, containerId]);

  if (lines.length === 0) return null;

  return (
    <svg ref={svgRef} className="connector-overlay" aria-hidden="true">
      {lines.map((line, i) => {
        const cx = (line.x1 + line.x2) / 2;
        const cy = (line.y1 + line.y2) / 2;
        const arrowAngle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
        const arrowLen = 8;

        return (
          <g key={i}>
            <path
              d={`M${line.x1},${line.y1} C${cx},${line.y1} ${cx},${line.y2} ${line.x2},${line.y2}`}
            />
            <polygon
              className="connector-arrow"
              points={[
                `${line.x2},${line.y2}`,
                `${line.x2 - arrowLen * Math.cos(arrowAngle - 0.4)},${line.y2 - arrowLen * Math.sin(arrowAngle - 0.4)}`,
                `${line.x2 - arrowLen * Math.cos(arrowAngle + 0.4)},${line.y2 - arrowLen * Math.sin(arrowAngle + 0.4)}`,
              ].join(" ")}
            />
          </g>
        );
      })}
    </svg>
  );
}
