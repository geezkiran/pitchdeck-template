import { HeadingBlock, Slide, SlideBody } from "@/components/shared";

export function SwasthFitSlide() {
  return (
    <Slide
      id="swasthfit"
      className="pt-20 md:pt-16"
      contentClassName="gap-6 md:gap-8"
      centerContent={false}
    >
      <SlideBody className="mt-0">
        <div className="flex items-center gap-3">
          <HeadingBlock size="xl" className="text-left">
            <span className="text-black">SwasthFit</span>{" "}
            <span className="text-neutral-300">by Dr Lal PathLab</span>
          </HeadingBlock>
          <a
            href="https://media.lalpathlabs.com/2026-01/3638e680-09b9-4386-aff2-1da0575cfc12.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 translate-y-[14px] items-center gap-1 rounded-full bg-gray-400/[0.06] px-2.5 py-1 text-xs font-medium text-neutral-500 transition-colors hover:bg-gray-400/[0.1]"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
            </svg>
            lalpathlabs.com
          </a>
        </div>
      </SlideBody>

      <div className="grid h-64 md:h-80 grid-cols-3 gap-3 md:gap-4 mt-14 md:mt-20">
        <div className="min-h-0 min-w-0 rounded-[16px] bg-gray-400/[0.05]" />
        <div className="min-h-0 min-w-0 rounded-[16px] bg-gray-400/[0.05]" />
        <div className="min-h-0 min-w-0 rounded-[16px] bg-gray-400/[0.05]" />
      </div>
    </Slide>
  );
}
