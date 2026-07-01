import type { ReactNode } from "react";
import { DeckContainer } from "@/components/deck";
import { slideLabels, slides } from "@/components/slides";

function isSlideComponent(component: unknown): component is () => ReactNode {
  return typeof component === "function";
}

export default function Home() {
  return (
    <main>
      <DeckContainer slideLabels={slideLabels}>
        {slides.map((SlideComponent, index) => {
          if (!isSlideComponent(SlideComponent)) {
            throw new Error(
              `Slide "${slideLabels[index] ?? index}" failed to load. Restart with: npm run dev:clean`
            );
          }

          return <SlideComponent key={slideLabels[index]} />;
        })}
      </DeckContainer>
    </main>
  );
}
