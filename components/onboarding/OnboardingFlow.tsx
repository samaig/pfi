"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  Heart,
  User,
  School,
  Home,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronsUpDown,
  CheckCircle2,
  Check,
} from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logo } from "@/components/logo";
import { saveOnboardingStep, completeOnboarding } from "@/app/actions/user";
import ukTowns from "@/lib/data/uk-towns.json";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────── */

interface InitialData {
  identity_type?: string | null;
  child_count?: string | null;
  child_age_buckets?: string[] | null;
  town?: string | null;
  support_needs?: string[] | null;
  onboarding_completed?: boolean | null;
}

interface OnboardingFlowProps {
  userId: string;
  initialData: InitialData;
}

/* ─── Constants ─────────────────────────────────────────── */

const IDENTITY_OPTIONS = [
  { value: "PARENT", label: "Parent", Icon: Baby },
  { value: "EXPECTANT_PARENT", label: "Expectant parent", Icon: Heart },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say", Icon: User },
];

const COUNT_OPTIONS = ["Expecting", "1", "2", "3", "4", "5+"];

const AGE_OPTIONS = ["Expecting", "0–1", "2–4", "5–11", "12+"];

const SUPPORT_OPTIONS = [
  { value: "Childcare & Nurseries", label: "Childcare & Nurseries", Icon: School },
  { value: "Pregnancy & Postpartum", label: "Pregnancy & Postpartum", Icon: Heart },
  { value: "Home Support", label: "Home Support", Icon: Home },
  { value: "Baby & Early Years", label: "Baby & Early Years", Icon: Baby },
  { value: "After-School & Tutoring", label: "After-School & Tutoring", Icon: BookOpen },
  { value: "Wellbeing & Mental Health", label: "Wellbeing & Mental Health", Icon: Sparkles },
];

/* ─── Animation helpers ─────────────────────────────────── */

function getVariants(direction: number) {
  return {
    enter: { x: direction * 56, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: direction * -56, opacity: 0 },
  };
}

const transition = { duration: 0.15, ease: "easeInOut" as const };

/* ─── Sub-components ────────────────────────────────────── */

function IdentityOption({
  option,
  selected,
  onSelect,
}: {
  option: (typeof IDENTITY_OPTIONS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const { label, Icon } = option;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 w-full rounded-2xl px-5 py-4 text-left transition-all duration-150",
        "border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
        selected
          ? "border-2 border-[#117A65] bg-[#E6F2EF]"
          : "border border-[#E7E2DA] bg-white hover:border-[#117A65]/60 hover:bg-[#F0F8F6]"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full shrink-0",
          selected ? "bg-[#117A65]/15" : "bg-[#F7F4EF]"
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5",
            selected ? "text-[#117A65]" : "text-[#6F6F6F]"
          )}
        />
      </span>
      <span
        className={cn(
          "text-base font-medium",
          selected ? "text-[#117A65]" : "text-[#1C1C1C]"
        )}
      >
        {label}
      </span>
      {selected && (
        <Check className="w-4 h-4 text-[#117A65] ml-auto shrink-0" />
      )}
    </button>
  );
}

function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
        selected
          ? "bg-[#117A65] border-[#117A65] text-white"
          : "bg-white border-[#E7E2DA] text-[#1C1C1C] hover:border-[#117A65]/60 hover:bg-[#F0F8F6]"
      )}
    >
      {label}
    </button>
  );
}

function SupportCard({
  option,
  selected,
  onToggle,
}: {
  option: (typeof SUPPORT_OPTIONS)[number];
  selected: boolean;
  onToggle: () => void;
}) {
  const { label, Icon } = option;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-5 text-center transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
        selected
          ? "border-2 border-[#117A65] bg-[#E6F2EF]"
          : "border border-[#E7E2DA] bg-white hover:border-[#117A65]/60 hover:bg-[#F0F8F6]"
      )}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5">
          <Check className="w-3.5 h-3.5 text-[#117A65]" />
        </span>
      )}
      <span
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-full",
          selected ? "bg-[#117A65]/15" : "bg-[#F7F4EF]"
        )}
      >
        <Icon
          className={cn(
            "w-4 h-4",
            selected ? "text-[#117A65]" : "text-[#6F6F6F]"
          )}
        />
      </span>
      <span
        className={cn(
          "text-sm font-medium leading-snug",
          selected ? "text-[#117A65]" : "text-[#1C1C1C]"
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Main component ────────────────────────────────────── */

export function OnboardingFlow({ userId, initialData }: OnboardingFlowProps) {
  const router = useRouter();

  // Derive initial town value from stored label
  const initialTownValue =
    initialData.town
      ? (ukTowns.find((t) => t.label === initialData.town)?.value ?? "")
      : "";

  // Per-screen state – pre-filled from DB
  const [selectedIdentity, setSelectedIdentity] = useState<string>(
    initialData.identity_type ?? ""
  );
  const [selectedCounts, setSelectedCounts] = useState<string[]>(
    initialData.child_count ? initialData.child_count.split(",") : []
  );
  const [selectedAges, setSelectedAges] = useState<string[]>(
    initialData.child_age_buckets ?? []
  );
  const [selectedTown, setSelectedTown] = useState<string>(initialTownValue);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(
    initialData.support_needs ?? []
  );

  // Navigation
  const [currentScreen, setCurrentScreen] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // UI
  const [townOpen, setTownOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* ── Helpers ── */

  function goTo(screen: number, dir: number) {
    setDirection(dir);
    setCurrentScreen(screen);
  }

  function toggleCount(val: string) {
    setSelectedCounts((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function toggleAge(val: string) {
    setSelectedAges((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function toggleNeed(val: string) {
    setSelectedNeeds((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  /* ── Save helpers ── */

  async function saveIdentity(value: string | null) {
    await saveOnboardingStep(userId, { identity_type: value });
  }

  async function saveCount(value: string | null) {
    await saveOnboardingStep(userId, { child_count: value });
  }

  async function saveAges(value: string[] | null) {
    await saveOnboardingStep(userId, { child_age_buckets: value });
  }

  async function saveTown(value: string | null) {
    // Save the full label, not the kebab value
    const label = value
      ? (ukTowns.find((t) => t.value === value)?.label ?? null)
      : null;
    await saveOnboardingStep(userId, { town: label });
  }

  async function saveNeeds(value: string[] | null) {
    await saveOnboardingStep(userId, { support_needs: value });
  }

  /* ── Navigation handlers ── */

  async function handleContinueIdentity(skip = false) {
    setIsSaving(true);
    try {
      await saveIdentity(skip ? null : selectedIdentity || null);
    } catch (_) {}
    setIsSaving(false);
    goTo(4, 1);
  }

  async function handleContinueCount(skip = false) {
    setIsSaving(true);
    try {
      await saveCount(skip || selectedCounts.length === 0 ? null : selectedCounts.join(","));
    } catch (_) {}
    setIsSaving(false);
    goTo(5, 1);
  }

  async function handleContinueAges(skip = false) {
    setIsSaving(true);
    try {
      await saveAges(skip || selectedAges.length === 0 ? null : selectedAges);
    } catch (_) {}
    setIsSaving(false);
    goTo(6, 1);
  }

  async function handleContinueTown(skip = false) {
    setIsSaving(true);
    try {
      await saveTown(skip ? null : selectedTown || null);
    } catch (_) {}
    setIsSaving(false);
    goTo(7, 1);
  }

  async function handleFinish() {
    setIsSaving(true);
    try {
      await saveNeeds(selectedNeeds.length > 0 ? selectedNeeds : null);
      await completeOnboarding(userId);
    } catch (_) {}
    setIsSaving(false);
    goTo(8, 1);
  }

  async function handleSkipNeeds() {
    setIsSaving(true);
    try {
      await completeOnboarding(userId);
    } catch (_) {}
    setIsSaving(false);
    goTo(8, 1);
  }

  async function handleSkipAll() {
    setIsSaving(true);
    try {
      await completeOnboarding(userId);
    } catch (_) {}
    setIsSaving(false);
    router.push("/home");
  }

  // Auto-redirect from completion screen
  useEffect(() => {
    if (currentScreen === 8) {
      const timer = setTimeout(() => router.push("/home"), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, router]);

  /* ── Progress ── */

  const progressStep = currentScreen >= 3 ? currentScreen - 2 : 0;
  const progressPct = currentScreen >= 3 ? ((currentScreen - 2) / 5) * 100 : 0;

  /* ── Variants ── */

  const variants = getVariants(direction);

  /* ─────────────────────────────────────────────────────── */
  /*  Render                                                 */
  /* ─────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col">
      {/* ── Header ── */}
      <header className="w-full px-6 sm:px-10 pt-6 pb-4 flex flex-col gap-3">
        {/* Row: back + logo | progress label */}
        <div className="flex items-center">
          {/* Left: back button + logo */}
          <div className="flex items-center gap-3 flex-1">
            {currentScreen >= 3 && currentScreen <= 7 && (
              <button
                type="button"
                onClick={() => goTo(currentScreen - 1, -1)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#E7E2DA]/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65]"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-[#1C1C1C]" />
              </button>
            )}
            <Logo />
          </div>

          {/* Right: step label */}
          {currentScreen >= 3 && currentScreen <= 7 && (
            <span className="text-[13px] text-[#6F6F6F] font-medium tabular-nums">
              Step {progressStep} of 5
            </span>
          )}
        </div>

        {/* Progress bar (screens 3-7) */}
        {currentScreen >= 3 && currentScreen <= 7 && (
          <div className="w-full h-[4px] rounded-full bg-[#E7E2DA] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#117A65]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>
        )}
      </header>

      {/* ── Content ── */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-8 py-6 overflow-hidden">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ════ SCREEN 1 — Welcome ════ */}
            {currentScreen === 1 && (
              <motion.div
                key="screen-1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      Welcome to Parentfits.
                    </h1>
                    <p className="text-[17px] text-[#6F6F6F] leading-relaxed">
                      Your dedicated parent support hub with everything you need
                      as a parent, in one place.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goTo(2, 1)}
                    className="w-full sm:w-auto bg-[#117A65] hover:bg-[#0e6354] text-white font-medium text-[15px] px-8 py-3.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 2 — Personalise ════ */}
            {currentScreen === 2 && (
              <motion.div
                key="screen-2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      Help us tailor this to you
                    </h1>
                    <p className="text-[17px] text-[#6F6F6F] leading-relaxed">
                      Answer a few quick questions so we can show you the most
                      relevant support.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => goTo(3, 1)}
                      className="w-full sm:w-auto bg-[#117A65] hover:bg-[#0e6354] text-white font-medium text-[15px] px-8 py-3.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2"
                    >
                      Get started
                    </button>
                    <button
                      type="button"
                      onClick={handleSkipAll}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors text-center py-1 focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 3 — Identity ════ */}
            {currentScreen === 3 && (
              <motion.div
                key="screen-3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[26px] sm:text-[28px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      Which best describes you?
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    {IDENTITY_OPTIONS.map((opt) => (
                      <IdentityOption
                        key={opt.value}
                        option={opt}
                        selected={selectedIdentity === opt.value}
                        onSelect={() =>
                          setSelectedIdentity(
                            selectedIdentity === opt.value ? "" : opt.value
                          )
                        }
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleContinueIdentity(true)}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContinueIdentity(false)}
                      disabled={!selectedIdentity || isSaving}
                      className={cn(
                        "bg-[#117A65] text-white font-medium text-[15px] px-7 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
                        !selectedIdentity || isSaving
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#0e6354]"
                      )}
                    >
                      {isSaving ? "Saving…" : "Continue"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 4 — Child Count ════ */}
            {currentScreen === 4 && (
              <motion.div
                key="screen-4"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[26px] sm:text-[28px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      How many children do you have?
                    </h2>
                    <p className="text-[14px] text-[#6F6F6F]">
                      You can select more than one.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {COUNT_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={selectedCounts.includes(opt)}
                        onToggle={() => toggleCount(opt)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleContinueCount(true)}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContinueCount(false)}
                      disabled={isSaving}
                      className={cn(
                        "bg-[#117A65] text-white font-medium text-[15px] px-7 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
                        isSaving
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#0e6354]"
                      )}
                    >
                      {isSaving ? "Saving…" : "Continue"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 5 — Child Ages ════ */}
            {currentScreen === 5 && (
              <motion.div
                key="screen-5"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[26px] sm:text-[28px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      How old are your child(ren)?
                    </h2>
                    <p className="text-[14px] text-[#6F6F6F]">
                      Select all that apply.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {AGE_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={selectedAges.includes(opt)}
                        onToggle={() => toggleAge(opt)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleContinueAges(true)}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContinueAges(false)}
                      disabled={isSaving}
                      className={cn(
                        "bg-[#117A65] text-white font-medium text-[15px] px-7 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
                        isSaving
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#0e6354]"
                      )}
                    >
                      {isSaving ? "Saving…" : "Continue"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 6 — Location ════ */}
            {currentScreen === 6 && (
              <motion.div
                key="screen-6"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[26px] sm:text-[28px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      Where are you based?
                    </h2>
                    <p className="text-[14px] text-[#6F6F6F]">
                      We use this to show nearby and relevant support.
                    </p>
                  </div>

                  {/* Town combobox */}
                  <Popover open={townOpen} onOpenChange={setTownOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={townOpen}
                        className="w-full flex items-center justify-between rounded-xl border border-[#E7E2DA] bg-white px-4 py-3.5 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2 hover:border-[#117A65]/60 transition-colors"
                      >
                        <span
                          className={
                            selectedTown ? "text-[#1C1C1C]" : "text-[#9C9C9C]"
                          }
                        >
                          {selectedTown
                            ? ukTowns.find((t) => t.value === selectedTown)
                                ?.label
                            : "Search for your town…"}
                        </span>
                        <ChevronsUpDown className="w-4 h-4 text-[#9C9C9C] shrink-0 ml-2" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-[var(--radix-popover-trigger-width)]"
                      align="start"
                      sideOffset={6}
                    >
                      <Command>
                        <CommandInput placeholder="Type to search…" />
                        <CommandList className="max-h-[200px]">
                          <CommandEmpty>No town found.</CommandEmpty>
                          <CommandGroup>
                            {ukTowns.map((town) => (
                              <CommandItem
                                key={town.value}
                                value={town.label}
                                onSelect={() => {
                                  setSelectedTown(town.value);
                                  setTownOpen(false);
                                }}
                              >
                                {town.label}
                                {selectedTown === town.value && (
                                  <Check className="ml-auto w-4 h-4 text-[#117A65]" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleContinueTown(true)}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContinueTown(false)}
                      disabled={isSaving}
                      className={cn(
                        "bg-[#117A65] text-white font-medium text-[15px] px-7 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
                        isSaving
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#0e6354]"
                      )}
                    >
                      {isSaving ? "Saving…" : "Continue"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 7 — Support Needs ════ */}
            {currentScreen === 7 && (
              <motion.div
                key="screen-7"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[26px] sm:text-[28px] font-semibold text-[#1C1C1C] leading-tight tracking-tight">
                      What kind of support matters most right now?
                    </h2>
                    <p className="text-[14px] text-[#6F6F6F]">
                      Select all that apply.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {SUPPORT_OPTIONS.map((opt) => (
                      <SupportCard
                        key={opt.value}
                        option={opt}
                        selected={selectedNeeds.includes(opt.value)}
                        onToggle={() => toggleNeed(opt.value)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={handleSkipNeeds}
                      className="text-[14px] text-[#6F6F6F] hover:text-[#1C1C1C] transition-colors focus:outline-none focus-visible:underline"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      onClick={handleFinish}
                      disabled={isSaving}
                      className={cn(
                        "bg-[#117A65] text-white font-medium text-[15px] px-7 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#117A65] focus-visible:ring-offset-2",
                        isSaving
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#0e6354]"
                      )}
                    >
                      {isSaving ? "Saving…" : "Finish"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ SCREEN 8 — Complete ════ */}
            {currentScreen === 8 && (
              <motion.div
                key="screen-8"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <div className="flex flex-col items-center text-center space-y-5 py-8">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#3A9D7A]" />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-[28px] font-semibold text-[#1C1C1C] tracking-tight">
                      You&apos;re all set
                    </h2>
                    <p className="text-[16px] text-[#6F6F6F] leading-relaxed max-w-[320px]">
                      We&apos;ll use this to personalise your experience. You can
                      update your preferences anytime.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
