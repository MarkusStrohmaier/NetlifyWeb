import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalculatorResults } from "./CalculatorResults";
import { SavingsChart } from "./SavingsChart";
import { SavingsPhaseManager } from "./SavingsPhaseManager";
import { PlusCircle, TrendingUp } from "lucide-react";

export interface SavingsPhase {
  id: string;
  fromMonth: number;
  monthlyAmount: number;
}

export interface CalculationResult {
  month: number;
  contribution: number;
  cumulativeContributions: number;
  interest: number;
  cumulativeInterest: number;
  total: number;
}

export function EtfSavingsPlanCalculator() {
  const [initialCapital, setInitialCapital] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [years, setYears] = useState<number>(30);
  const [savingsPhases, setSavingsPhases] = useState<SavingsPhase[]>([
    { id: "1", fromMonth: 1, monthlyAmount: 500 },
  ]);
  const [results, setResults] = useState<CalculationResult[] | null>(null);

  const addSavingsPhase = () => {
    const lastPhase = savingsPhases[savingsPhases.length - 1];
    const newFromMonth = lastPhase ? lastPhase.fromMonth + 12 : 1;
    
    setSavingsPhases([
      ...savingsPhases,
      {
        id: Date.now().toString(),
        fromMonth: newFromMonth,
        monthlyAmount: lastPhase?.monthlyAmount || 500,
      },
    ]);
  };

  const updateSavingsPhase = (id: string, field: keyof SavingsPhase, value: number) => {
    setSavingsPhases(
      savingsPhases.map((phase) =>
        phase.id === id ? { ...phase, [field]: value } : phase
      )
    );
  };

  const deleteSavingsPhase = (id: string) => {
    if (savingsPhases.length > 1) {
      setSavingsPhases(savingsPhases.filter((phase) => phase.id !== id));
    }
  };

  const calculateSavings = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    const sortedPhases = [...savingsPhases].sort((a, b) => a.fromMonth - b.fromMonth);
    
    const monthlyResults: CalculationResult[] = [];
    let currentBalance = initialCapital;
    let totalContributions = initialCapital;
    let totalInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
      // Finde die aktuelle Sparphase
      let monthlyContribution = 0;
      for (let i = sortedPhases.length - 1; i >= 0; i--) {
        if (month >= sortedPhases[i].fromMonth) {
          monthlyContribution = sortedPhases[i].monthlyAmount;
          break;
        }
      }

      // Berechne Zinsen auf das aktuelle Kapital
      const monthlyInterest = currentBalance * monthlyRate;
      
      // Füge monatliche Sparrate hinzu
      currentBalance += monthlyInterest + monthlyContribution;
      totalContributions += monthlyContribution;
      totalInterest += monthlyInterest;

      monthlyResults.push({
        month,
        contribution: monthlyContribution,
        cumulativeContributions: totalContributions,
        interest: monthlyInterest,
        cumulativeInterest: totalInterest,
        total: currentBalance,
      });
    }

    setResults(monthlyResults);
  };

  const totalMonths = years * 12;
  const finalResult = results?.[results.length - 1];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          ETF-Sparplanrechner
        </h1>
        <p className="text-muted-foreground">
          Berechne die zukünftige Entwicklung deines ETF-Sparplans mit flexiblen Sparraten
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Eingabebereich */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grundeinstellungen</CardTitle>
              <CardDescription>
                Lege die Basis-Parameter für deinen Sparplan fest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialCapital">Anfangskapital (€)</Label>
                <Input
                  id="initialCapital"
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  min="0"
                  step="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">
                  Erwartete jährliche Rendite (%)
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="0"
                  max="30"
                  step="0.1"
                />
                <p className="text-xs text-muted-foreground">
                  Historisch: MSCI World ~7-8% p.a.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Anlagedauer (Jahre)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min="1"
                  max="50"
                />
                <p className="text-xs text-muted-foreground">
                  Gesamt: {totalMonths} Monate
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sparraten-Phasen</CardTitle>
              <CardDescription>
                Definiere verschiedene Sparraten für unterschiedliche Zeiträume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SavingsPhaseManager
                phases={savingsPhases}
                totalMonths={totalMonths}
                onUpdate={updateSavingsPhase}
                onDelete={deleteSavingsPhase}
              />
              
              <Button
                onClick={addSavingsPhase}
                variant="outline"
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Weitere Sparphase hinzufügen
              </Button>

              <Button onClick={calculateSavings} className="w-full" size="lg">
                Berechnen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ergebnisbereich */}
        <div className="space-y-6">
          {results && finalResult ? (
            <>
              <CalculatorResults result={finalResult} interestRate={interestRate} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Vermögensentwicklung</CardTitle>
                  <CardDescription>
                    Visualisierung deines Kapitals über die Zeit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Übersicht</TabsTrigger>
                      <TabsTrigger value="detailed">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <SavingsChart data={results} type="stacked" />
                    </TabsContent>
                    <TabsContent value="detailed" className="mt-4">
                      <SavingsChart data={results} type="lines" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
                <h3>Bereit für die Berechnung</h3>
                <p className="text-muted-foreground max-w-sm">
                  Gib deine Parameter ein und klicke auf "Berechnen", um die Entwicklung deines Sparplans zu sehen.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
