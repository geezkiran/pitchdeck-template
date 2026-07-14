import { Slide } from "@/components/shared";

export function Blank8GridSlide() {
  return (
    <Slide id="blank-8-grid" variant="muted" contentClassName="justify-center">
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="min-h-0 min-w-0 rounded-[16px] bg-black/[0.05]"
          />
        ))}
      </div>
    </Slide>
  );
}
