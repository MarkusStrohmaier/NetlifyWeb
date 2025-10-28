import { CalculationResult } from "./EtfSavingsPlanCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Wallet, PiggyBank, Percent } from "lucide-react";

interface CalculatorResultsProps {
  result: CalculationResult;
  interestRate: number;
}

export function CalculatorResults({ result, interestRate }: CalculatorResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const contributionPercentage = (result.cumulativeContributions / result.total) * 100;
  const interestPercentage = (result.cumulativeInterest / result.total) * 100;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-white">Endkapital</CardTitle>
          <CardDescription className="text-blue-100">
            Nach {Math.floor(result.month / 12)} Jahren und {result.month % 12} Monaten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-4xl">{formatCurrency(result.total)}</p>
            <div className="flex items-center gap-2 text-blue-100">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">
                Ø {interestRate}% Rendite pro Jahr
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Einzahlungen</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl">{formatCurrency(result.cumulativeContributions)}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${contributionPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12">
                  {contributionPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Zinserträge</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl">{formatCurrency(result.cumulativeInterest)}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${interestPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12">
                  {interestPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Deine Einzahlungen</span>
              <span>{formatCurrency(result.cumulativeContributions)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Gewinn durch Zinsen</span>
              <span className="text-green-600 dark:text-green-400">
                + {formatCurrency(result.cumulativeInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span>Gesamtvermögen</span>
              <span>{formatCurrency(result.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
