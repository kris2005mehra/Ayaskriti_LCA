import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const core = document.createElement("div");
    const ring = document.createElement("div");

    core.className = "cursor-core";
    ring.className = "cursor-ring";

    document.body.appendChild(core);
    document.body.appendChild(ring);

    let ringX = 0;
    let ringY = 0;

    const move = (e: MouseEvent) => {
      const { clientX, clientY, movementX, movementY } = e;

      // Core follows instantly
      core.style.left = `${clientX}px`;
      core.style.top = `${clientY}px`;

      // Ring follows smoothly
      ringX += (clientX - ringX) * 0.15;
      ringY += (clientY - ringY) * 0.15;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      // Spark shards
      const speed = Math.abs(movementX) + Math.abs(movementY);
      if (speed > 8) {
        const spark = document.createElement("div");
        spark.className = "cursor-spark";
        spark.style.left = `${clientX}px`;
        spark.style.top = `${clientY}px`;

        const angle =
          Math.atan2(movementY, movementX) * (180 / Math.PI) +
          (Math.random() * 40 - 20);

        spark.style.transform = `rotate(${angle}deg)`;

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 400);
      }
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      core.remove();
      ring.remove();
    };
  }, []);

  return null;
}
