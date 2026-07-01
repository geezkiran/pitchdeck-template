import { cn } from "@/lib/utils";
import { HeadingBlock, Slide } from "@/components/shared";

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
  { id: "aarthi", name: "Aarthi Scan & Labs", shortName: "Aarthi Labs", featured: true },
  { id: "orange", name: "Orange Health Labs", shortName: "Orange Health" },
  { id: "lal", name: "Dr. Lal PathLabs", shortName: "Dr. Lal's" },
  { id: "metropolis", name: "Metropolis Healthcare", shortName: "Metropolis" },
];

const compareRows: CompareRow[] = [
  {
    feature: "Public disclosure",
    aarthi: "Limited consolidated filings; fragmented across franchises",
    metropolis: "Publicly listed; extensive corporate reporting",
    lal: "Publicly listed; detailed quarterly & annual filings",
    orange: "Private; limited public financial disclosures",
  },
  {
    feature: "Revenue / scale",
    aarthi: "Regional multi-city chain; smaller national footprint",
    metropolis: "Large national chain; high consolidated revenue",
    lal: "FY25 ~₹2,461 cr; ~20.9M samples/quarter",
    orange: "Smaller scale; urban footprint growing",
  },
  {
    feature: "Revenue per patient",
    aarthi: "Not centrally disclosed; likely lower ARPU",
    metropolis: "Large test menu; packages lift cross-sell & ARPU",
    lal: "~₹887/patient; ~3.07 tests/patient (Q4 FY25)",
    orange: "Not disclosed; varies by city & home-collection mix",
  },
  {
    feature: "EBITDA margin",
    aarthi: "Not publicly reported (consolidated)",
    metropolis: "Strong; industry-leading at national scale",
    lal: "~28.3% (FY25)",
    orange: "Not publicly disclosed",
  },
  {
    feature: "PAT margin",
    aarthi: "Not available publicly",
    metropolis: "Healthy; scale & centralized operations",
    lal: "~20% (FY25)",
    orange: "Not publicly disclosed",
  },
  {
    feature: "Pricing transparency",
    aarthi: "Fragmented local pricing; less centralized",
    metropolis: "High transparency; standardized packages",
    lal: "Strong app visibility; national pricing & tie-ups",
    orange: "Competitive urban pricing; less exhaustive lists",
  },
  {
    feature: "Expansion & capex",
    aarthi: "Organic regional growth; imaging capex (MRI/CT)",
    metropolis: "Network expansion & lab automation",
    lal: "Heavy network & digital investment",
    orange: "Urban home-collection; asset-light partner labs",
  },
  {
    feature: "Profitability drivers",
    aarthi: "Constrained by scale & inconsistent pricing",
    metropolis: "Scale, packages & centralized lab processing",
    lal: "Scale, ARPU, digital channels & corporate contracts",
    orange: "Service/collection-centric; partner-lab dependent",
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

  return (
    <div className="deck-compare-table -mx-1 min-w-0">
      <div className="overflow-x-auto overscroll-x-contain pb-1">
        <div className="min-w-[720px] lg:min-w-0">
          <div className="grid grid-cols-[minmax(6.5rem,1fr)_repeat(4,minmax(5.75rem,1fr))] gap-0">
            <div className="sticky left-0 z-20 min-h-[2.75rem] bg-surface md:min-h-[3rem]" aria-hidden />

            {brands.map((brand) => (
              <div
                key={brand.id}
                className={cn(
                  "flex min-h-[2.75rem] flex-col justify-end px-2 pb-3 md:min-h-[3rem] md:px-3",
                  brand.featured &&
                    "min-h-[3rem] rounded-t-[14px] bg-background pt-1 md:min-h-[3.25rem] md:pt-1.5"
                )}
              >
                <p
                  className={cn(
                    "text-center text-base font-semibold leading-tight tracking-[-0.02em] md:text-lg lg:text-lg",
                    brand.featured ? "text-blue-500" : "text-muted"
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
                        brand.featured && "bg-background"
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
                  className="rounded-b-[14px] bg-background pb-5 md:pb-6"
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
      className="justify-start pt-14 md:pt-16"
      contentClassName="gap-5 md:gap-6"
      footer={
        <p className="text-right text-[10px] leading-snug text-muted/70 md:text-[11px]">
          Based on publicly available financial disclosures and company filings where available.
        </p>
      }
    >
      <HeadingBlock size="lg">Current Market Positioning</HeadingBlock>
      <DiagnosticCompareTable />
    </Slide>
  );
}
