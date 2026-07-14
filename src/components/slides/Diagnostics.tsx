import { HeadingBlock, Slide } from "@/components/shared";

export function StatementSlide() {
  return (
    <Slide
      id="statement"
      variant="gradient"
      contentClassName="items-center justify-center"
    >
      <HeadingBlock
        size="xl"
        gradient
        className="max-w-8xl text-center text-[2.0625rem] leading-[1.15] sm:text-[2.8125rem] md:text-[3.5625rem] lg:text-[4.3125rem]"
      >
        Diagnostics is becoming more than <br />{" "}
        <span className="mx-1 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 align-middle leading-none text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="relative  h-[0.7em] w-[0.7em] shrink-0"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          <span className="relative top-[-0.08em]">one-time</span>
        </span>{" "}
        testing business
      </HeadingBlock>
    </Slide>
  );
}
