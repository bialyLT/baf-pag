import { DashboardHeader } from "@/components/panel-de-control/header";
import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { RadarChartSimple } from "@/components/charts/radar-chart-simple";
import { RadialChartGrid } from "@/components/charts/radial-chart-grid";
import { RadialShapeChart } from "@/components/charts/radial-shape-chart";
import { RadialStackedChart } from "@/components/charts/radial-stacked-chart";
import { RadialTextChart } from "@/components/charts/radial-text-chart";

export function StatsPage() {
  return (
    <>
      <DashboardHeader
        heading="Estadísticas"
        text="Análisis y métricas del sistema BAF"
      />
      
      <div className="grid gap-6">
        <ChartSection title="Gráficos de Área">
          <AreaChartStacked />
        </ChartSection>
        
        <ChartSection title="Gráficos de Barras">
          <div className="grid gap-4 md:grid-cols-2">
            <BarChartMixed />
            <InteractiveBarChart />
          </div>
        </ChartSection>
        
        <ChartSection title="Gráficos de Líneas">
          <LineChartMultiple />
        </ChartSection>
        
        <ChartSection title="Gráficos Radiales">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RadialChartGrid />
            <RadialShapeChart />
            <RadialStackedChart />
            <RadialTextChart />
            <RadarChartSimple />
          </div>
        </ChartSection>
      </div>
    </>
  );
}

function ChartSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  );
}
