import { cn } from "@/lib/utils";
import { HeadingBlock, Slide, SlideBody, SlideLead } from "@/components/shared";

type CompareCell = string;

interface CompareBrand {
  id: string;
  name: string;
  shortName: string;
  featured?: boolean;
}

interface CompareRow {
  feature: string;
  aarthi: CompareCell;
  metropolis: CompareCell;
  lal: CompareCell;
  orange: CompareCell;
}

const brands: CompareBrand[] = [
  { id: "aarthi", name: "Aarthi Scan & Labs", shortName: "Aarthi Scans", featured: true },
  { id: "orange", name: "Orange Health Labs", shortName: "Orange Health Labs" },
  { id: "lal", name: "Dr. Lal PathLabs", shortName: "Dr. Lal PathLabs" },
  { id: "metropolis", name: "Metropolis Healthcare", shortName: "Metropolis Healthcare" },
];

const compareRows: CompareRow[] = [
  {
    feature: "Cloud & digital stack",
    aarthi: "Web app + Mobile app, LIMS still fragmented across 200+ centres",
    orange: "Full-stack digital platform, hub logistics + instant bookings",
    lal: "Microsoft D365 unified ERP, LIMS, POS & home-collection apps",
    metropolis: "Integrated CRM–ERP; cloud-led digital transformation across lab & B2B ops",
  },
  {
    feature: "Artificial intelligence",
    aarthi: "8 AI radiology models ",
    orange: "Digital reporting & routing ops",
    lal: " ML logistics app; AI chatbot for bookings & tracking",
    metropolis: "MetAdvisor AI engine, AI prostate biopsy, karyotyping & lab workflow automation",
  },
  {
    feature: "Home collection & booking",
    aarthi: "Home blood collection in 12 states",
    orange: "30-min home collection in Bengaluru, Mumbai, Delhi-NCR & Hyderabad",
    lal: "Omni-channel app + home-collection portals",
    metropolis: "App booking with AI test suggestions; home ECG & vital checks ",
  },
  {
    feature: "Sample & data tracking",
    aarthi: "Smart Report & WhatsApp delivery",
    orange: "Digital report delivery within 6 hours",
    lal: "Live order status in app, sample pickup tracking",
    metropolis: "Real-time sample tracking, collection through to result",
  },
  {
    feature: "Preventive & personalised",
    aarthi: "Smart Report health scores & packages from ₹999; imaging + lab under one roof",
    orange: "Routine & preventive panels; personalisation limited vs national chains",
    lal: "Swasthfit preventive portfolio; 385 panels & 3,172 pathology tests; 28.8M patients FY25",
    metropolis: "TruHealth +24% YoY FY25; MetAdvisor personalised test recommendations",
  },
  {
    feature: "Report turnaround",
    aarthi: "6-hour TAT promise; delays often pre- & post-analytical despite Smart Report",
    orange: "6-hour report SLA; 30-min collection — benchmark for digital-first speed",
    lal: "Expected TAT in app; national-lab processing — no marketed 6-hour chain-wide SLA",
    metropolis: "AI shortens specialty TAT (e.g. karyotyping); standard lab TAT by test type",
  },
  {
    feature: "Network scale",
    aarthi: "FY25 ~₹301 cr revenue; 200+ integrated imaging + lab centres across 12 states",
    orange: "FY25 ~₹84–138 cr revenue; ~₹180 cr ARR; 75+ owned centres; 4–5 metro cities",
    lal: "FY25 ₹2,461 cr revenue; 298 labs; 28.3% EBITDA; 86M samples processed",
    metropolis: "FY25 ₹1,331 cr revenue; 24.4% adj. EBITDA; 19 markets incl. India & global labs",
  },
];

function CompareCellContent({
  value,
  featured,
}: {
  value: CompareCell;
  featured?: boolean;
}) {
  return (
    <p
      className={cn(
        "px-0.5 text-left text-[10px] font-medium leading-snug md:text-[11px] lg:text-xs",
        featured ? "text-foreground" : "text-muted"
      )}
    >
      {value}
    </p>
  );
}

function DiagnosticCompareTable() {
  const brandKeys = ["aarthi", "orange", "lal", "metropolis"] as const;
  const highlightedBoxClass =
    "bg-background pl-3 pr-2 mr-3 md:pl-4 md:pr-2.5 md:mr-4";

  return (
    <div className="deck-compare-table w-full min-w-0 lg:mx-auto">
      <div className="overflow-x-auto overscroll-x-contain pb-1 lg:overflow-visible lg:pb-0">
        <div className="min-w-[720px] lg:mx-auto lg:min-w-0 lg:w-full">
          <div className="grid grid-cols-[minmax(6.5rem,1fr)_repeat(4,minmax(5.75rem,1fr))] gap-0 lg:grid-cols-[minmax(8rem,1.15fr)_repeat(4,minmax(0,1fr))]">
            <div className="sticky left-0 z-20 min-h-[2.75rem] bg-surface md:min-h-[3rem]" aria-hidden />

            {brands.map((brand) => (
              <div
                key={brand.id}
                className={cn(
                  "flex min-h-[2.75rem] flex-col justify-end px-2 pb-3 md:min-h-[3rem] md:px-3",
                  brand.featured &&
                    cn(
                      highlightedBoxClass,
                      "min-h-[3rem] rounded-t-[14px] pt-1 md:min-h-[3.25rem] md:pt-1.5"
                    )
                )}
              >
                <p
                  className={cn(
                    "text-left text-base font-semibold leading-tight tracking-[-0.02em] md:text-lg lg:text-lg",
                    brand.featured ? "text-primary" : "text-muted"
                  )}
                >
                  {brand.shortName}
                </p>
              </div>
            ))}

            {compareRows.map((row, rowIndex) => (
              <div key={row.feature} className="contents">
                <div
                  className={cn(
                    "sticky left-0 z-10 flex items-start bg-surface py-2.5 pr-2 md:py-3 md:pr-3",
                    rowIndex > 0 && "border-t border-surface-border"
                  )}
                >
                  <p className="text-[11px] font-semibold leading-snug tracking-[-0.01em] text-muted md:text-xs lg:text-[13px]">
                    {row.feature}
                  </p>
                </div>

                {brandKeys.map((key) => {
                  const brand = brands.find((b) => b.id === key)!;
                  return (
                    <div
                      key={`${row.feature}-${key}`}
                      className={cn(
                        "flex items-start justify-start px-2 py-2.5 md:px-2.5 md:py-3",
                        rowIndex > 0 &&
                          !brand.featured &&
                          "border-t border-surface-border",
                        brand.featured && highlightedBoxClass
                      )}
                    >
                      <CompareCellContent
                        value={row[key]}
                        featured={brand.featured}
                      />
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="sticky left-0 z-10 bg-surface" aria-hidden />
            {brandKeys.map((key) => {
              const brand = brands.find((b) => b.id === key)!;
              return brand.featured ? (
                <div
                  key={`${key}-pad`}
                  className={cn(highlightedBoxClass, "rounded-b-[14px] pb-2 md:pb-2")}
                  aria-hidden
                />
              ) : (
                <div key={`${key}-pad`} aria-hidden />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompetitiveSlide() {
  return (
    <Slide
      id="competitive-landscape"
      variant="muted"
      pinFooter
      className="pt-14 md:pt-10"
      contentClassName="gap-2 md:gap-3"
      footerClassName="bottom-20 md:bottom-24"
      footer={
        <p className="text-right text-[10px] leading-snug text-muted/70 md:text-[11px]">
           Competitor data from FY25 public filings, investor releases & company
          disclosures where available.
        </p>
      }
    >
      <SlideLead>
        <HeadingBlock size="lg">Current Market Landscape</HeadingBlock>
      </SlideLead>
      <SlideBody className="mt-0">
        <DiagnosticCompareTable />
      </SlideBody>
    </Slide>
  );
}
