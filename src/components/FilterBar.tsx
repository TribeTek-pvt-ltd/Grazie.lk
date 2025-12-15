"use client";

import { useState, useEffect } from "react";
import { filtersData } from "@/src/data/filters";

interface Filters {
  category: string;
  priceRange: [number, number];
  material: string;
}

interface FilterBarProps {
  setFilter: (filters: Filters) => void;
}

export default function FilterBar({ setFilter }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { categories, materials, pricePresets } = filtersData;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  useEffect(() => {
    setFilter({
      category: selectedCategory,
      priceRange,
      material: selectedMaterial,
    });
  }, [selectedCategory, priceRange, selectedMaterial, setFilter]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterial("All");
    setPriceRange([0, Infinity]);
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedMaterial !== "All" ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== Infinity ? 1 : 0);

  return (
    <div className="w-full bg-base backdrop-blur-sm py-6 md:py-8 border-b border-gold/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-dark font-heading text-xl flex items-center gap-2"
          >
            Filters
            <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-gold text-soft text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-accent/80 text-sm underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filters */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="md:flex md:gap-8 space-y-8 md:space-y-0">

            {/* Category */}
            <FilterGroup
              title="Category"
              options={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Price */}
            <div className="flex-1">
              <label className="block text-dark font-heading text-sm uppercase mb-3">
                Price Range
              </label>
              <div className="flex flex-wrap gap-3">
                {pricePresets.map((preset) => (
                  <FilterButton
                    key={preset.label}
                    active={
                      priceRange[0] === preset.range[0] &&
                      priceRange[1] === preset.range[1]
                    }
                    onClick={() =>
                      setPriceRange(preset.range as [number, number])
                    }
                  >
                    {preset.label}
                  </FilterButton>
                ))}
              </div>
            </div>

            {/* Material */}
            <FilterGroup
              title="Material"
              options={materials}
              selected={selectedMaterial}
              onSelect={setSelectedMaterial}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function FilterGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="block text-dark font-heading text-sm uppercase mb-3">
        {title}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <FilterButton
            key={opt}
            active={selected === opt}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-medium border transition-all
        ${
          active
            ? "bg-gold text-soft border-gold shadow-md"
            : "bg-soft border-gold/50 text-dark hover:bg-gold/10"
        }`}
    >
      {children}
    </button>
  );
}
