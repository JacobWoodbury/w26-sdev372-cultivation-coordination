import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Garden from './components/Garden';
import Toolbar from './components/Toolbar';
import NewPlotModal from './components/NewPlotModal';
import { deletePlot, fetchPlots, savePlot } from './api/plots';
import {
  emptyCell,
  normalizePlotPlantsGrid,
  plantCell,
} from './utils/plotCells';

function App() {
  const [plots, setPlots] = useState([]);
  const [currentPlotId, setCurrentPlotId] = useState(null);
  /** null = paint dirt (empty cells); otherwise brush for planting with thumbnail */
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [newPlotOpen, setNewPlotOpen] = useState(false);

  const getPlots = () => {
    fetchPlots()
      .then((data) =>
        setPlots(
          (Array.isArray(data) ? data : []).map((p) => ({
            ...p,
            plants: normalizePlotPlantsGrid(p.plants),
          }))
        )
      )
      .catch(() => setPlots([]));
  };

  useEffect(() => {
    getPlots();
  }, []);

  const currentPlot = useMemo(
    () => plots.find((p) => p.id === currentPlotId) ?? null,
    [plots, currentPlotId]
  );

  function createPlotGrid(width, length) {
    const grid = [];
    for (let i = 0; i < width; i++) {
      const row = [];
      for (let j = 0; j < length; j++) row.push(emptyCell());
      grid.push(row);
    }
    return grid;
  }

  async function onCreatePlot({ name, description, width, length }) {
    const plot = {
      name,
      description,
      plants: createPlotGrid(width, length),
    };

    const saved = await savePlot(plot);
    const normalized = {
      ...saved,
      plants: normalizePlotPlantsGrid(saved.plants),
    };
    setPlots((prev) => [...prev, normalized]);
    setCurrentPlotId(normalized.id);
  }

  function onPlant(index) {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id !== currentPlotId) return p;
        const newPlants = p.plants.map((row, ri) =>
          row.map((cell, cj) => {
            if (ri !== index.i || cj !== index.j) return cell;
            if (!selectedPlant) return emptyCell();
            return plantCell({
              plantId: selectedPlant.id,
              commonName: selectedPlant.common_name,
              thumbnailUrl: selectedPlant.thumbnailUrl,
            });
          })
        );
        return { ...p, plants: newPlants };
      })
    );
  }

  async function onSaveCurrentPlot() {
    const plot = plots.find((p) => p.id === currentPlotId);
    if (!plot) return;

    const saved = await savePlot({
      id: plot.id,
      name: plot.name,
      description: plot.description,
      plants: plot.plants,
    });

    const normalized = {
      ...saved,
      plants: normalizePlotPlantsGrid(saved.plants),
    };
    setPlots((prev) => prev.map((p) => (p.id === currentPlotId ? normalized : p)));
    setCurrentPlotId(normalized.id);
  }

  async function onDeleteCurrentPlot() {
    const plot = plots.find((p) => p.id === currentPlotId);
    if (!plot) return;

    await deletePlot(plot.id);
    setPlots((prev) => prev.filter((p) => p.id !== plot.id));
    setCurrentPlotId(null);
  }

  return (
    <div className="appLayout">
      <Toolbar
        plots={plots}
        onSelectPlot={setCurrentPlotId}
        onOpenNewPlot={() => setNewPlotOpen(true)}
      />

      <main className="appMain">
        <h1>Home</h1>

        {currentPlotId != null && (
          <div className="plotActions">
            <button onClick={onSaveCurrentPlot}>Save plot</button>
            <button onClick={onDeleteCurrentPlot}>Delete plot</button>
          </div>
        )}
        
        <Garden
          selectedPlant={selectedPlant}
          onSelectPlant={setSelectedPlant}
          plot={currentPlot}
          onPlant={onPlant}
        />
      </main>

      <NewPlotModal
        open={newPlotOpen}
        onClose={() => setNewPlotOpen(false)}
        onSubmit={onCreatePlot}
      />
    </div>
  );
}

export default App;
