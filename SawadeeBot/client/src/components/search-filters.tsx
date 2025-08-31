import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  filters: {
    search: string;
    position: string;
    category: string;
  };
  onFiltersChange: (filters: any) => void;
  className?: string;
}

const positions = [
  { value: "", label: "ทุกตำแหน่ง" },
  { value: "executive", label: "ผู้บริหารระดับสูง" },
  { value: "manager", label: "ผู้จัดการ" },
  { value: "team-lead", label: "หัวหน้าทีม" },
  { value: "employee", label: "พนักงาน" },
  { value: "analyst", label: "นักวิเคราะห์" },
  { value: "developer", label: "นักพัฒนา" },
  { value: "designer", label: "นักออกแบบ" },
  { value: "sales", label: "ฝ่ายขาย" },
  { value: "marketing", label: "ฝ่ายการตลาด" },
  { value: "hr", label: "ฝ่ายทรัพยากรบุคคล" },
  { value: "finance", label: "ฝ่ายการเงิน" },
];

const categories = [
  { value: "", label: "ทุกหมวดหมู่" },
  { value: "leadership", label: "ทักษะการเป็นผู้นำ" },
  { value: "technical", label: "ทักษะเทคนิค" },
  { value: "communication", label: "การสื่อสาร" },
  { value: "management", label: "การจัดการ" },
  { value: "sales", label: "การขาย" },
  { value: "marketing", label: "การตลาด" },
  { value: "finance", label: "การเงิน" },
  { value: "popular", label: "ยอดนิยม" },
];

export default function SearchFilters({ filters, onFiltersChange, className }: SearchFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: localSearch });
  };

  const handlePositionChange = (position: string) => {
    onFiltersChange({ ...filters, position });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    onFiltersChange({ search: "", position: "", category: "" });
  };

  const hasActiveFilters = filters.search || filters.position || filters.category;

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search Input */}
          <div className="md:col-span-5">
            <Label htmlFor="search" className="block text-sm font-medium text-card-foreground mb-2">
              ค้นหาเนื้อหา
            </Label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                id="search"
                type="text"
                placeholder="ค้นหาชื่อคอร์ส หรือ หัวข้อที่สนใจ..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pr-10"
                data-testid="input-content-search"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-search-submit"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Position Filter */}
          <div className="md:col-span-3">
            <Label className="block text-sm font-medium text-card-foreground mb-2">
              กรองตามตำแหน่งงาน
            </Label>
            <Select value={filters.position} onValueChange={handlePositionChange}>
              <SelectTrigger data-testid="select-position">
                <SelectValue placeholder="เลือกตำแหน่ง" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem 
                    key={position.value} 
                    value={position.value}
                    data-testid={`option-position-${position.value || "all"}`}
                  >
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <Label className="block text-sm font-medium text-card-foreground mb-2">
              หมวดหมู่
            </Label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem 
                    key={category.value} 
                    value={category.value}
                    data-testid={`option-category-${category.value || "all"}`}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          <div className="md:col-span-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              className="w-full"
              data-testid="button-clear-filters"
            >
              <i className="fas fa-times mr-1"></i>
              ล้าง
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">กรองที่ใช้:</span>
              {filters.search && (
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  data-testid="badge-filter-search"
                >
                  ค้นหา: "{filters.search}"
                </Badge>
              )}
              {filters.position && (
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  data-testid="badge-filter-position"
                >
                  ตำแหน่ง: {positions.find(p => p.value === filters.position)?.label}
                </Badge>
              )}
              {filters.category && (
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  data-testid="badge-filter-category"
                >
                  หมวดหมู่: {categories.find(c => c.value === filters.category)?.label}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
