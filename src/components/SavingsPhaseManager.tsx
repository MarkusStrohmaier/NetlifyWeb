import { SavingsPhase } from "./EtfSavingsPlanCalculator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface SavingsPhaseManagerProps {
  phases: SavingsPhase[];
  totalMonths: number;
  onUpdate: (id: string, field: keyof SavingsPhase, value: number) => void;
  onDelete: (id: string) => void;
}

export function SavingsPhaseManager({
  phases,
  totalMonths,
  onUpdate,
  onDelete,
}: SavingsPhaseManagerProps) {
  const sortedPhases = [...phases].sort((a, b) => a.fromMonth - b.fromMonth);

  return (
    <div className="space-y-4">
      {sortedPhases.map((phase, index) => {
        const fromYear = Math.floor((phase.fromMonth - 1) / 12) + 1;
        const fromMonthInYear = ((phase.fromMonth - 1) % 12) + 1;
        const nextPhase = sortedPhases[index + 1];
        const toMonth = nextPhase ? nextPhase.fromMonth - 1 : totalMonths;
        const duration = toMonth - phase.fromMonth + 1;

        return (
          <div
            key={phase.id}
            className="border rounded-lg p-4 space-y-3 bg-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Phase {index + 1}</Badge>
                <span className="text-sm text-muted-foreground">
                  {duration} Monate
                </span>
              </div>
              {phases.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(phase.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`fromMonth-${phase.id}`}>Ab Monat</Label>
                <Input
                  id={`fromMonth-${phase.id}`}
                  type="number"
                  value={phase.fromMonth}
                  onChange={(e) =>
                    onUpdate(phase.id, "fromMonth", Number(e.target.value))
                  }
                  min={index === 0 ? 1 : sortedPhases[index - 1].fromMonth + 1}
                  max={totalMonths}
                />
                <p className="text-xs text-muted-foreground">
                  Jahr {fromYear}, Monat {fromMonthInYear}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`amount-${phase.id}`}>Monatlich (€)</Label>
                <Input
                  id={`amount-${phase.id}`}
                  type="number"
                  value={phase.monthlyAmount}
                  onChange={(e) =>
                    onUpdate(phase.id, "monthlyAmount", Number(e.target.value))
                  }
                  min="0"
                  step="50"
                />
                <p className="text-xs text-muted-foreground">
                  {duration * phase.monthlyAmount} € gesamt
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
