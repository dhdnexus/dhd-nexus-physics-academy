import Canvas from "./Canvas";
import Controls from "./Controls";
import GraphPanel from "../GraphPanel";
import MeasurementPanel from "./MeasurementPanel";
import RouteSelector from "./RouteSelector";

export default function InteractiveLab() {
  return (
    <section className="space-y-8">
      <Canvas />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column */}

        <div className="space-y-8">
          <RouteSelector />

          <MeasurementPanel />
        </div>

        {/* Right Column */}

        <div className="space-y-8 lg:col-span-2">
          <Controls />

          <GraphPanel />
        </div>
      </div>
    </section>
  );
}
