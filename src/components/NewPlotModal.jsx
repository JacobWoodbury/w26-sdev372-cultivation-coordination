import { useEffect, useState } from "react";

export default function NewPlotModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(3);

  useEffect(() => {
    if (!open) return;
    setName("");
    setDescription("");
    setLength(3);
    setWidth(3);
  }, [open]);

  async function submit(e) {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      length: Number(length),
      width: Number(width),
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <h3>New plot</h3>
          <button className="modalClose" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modalForm" onSubmit={submit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            placeholder="Plot Name"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            type="text"
            placeholder="Plot Description"
          />
          <div className="modalGrid2">
            <input
              value={length}
              onChange={(e) => setLength(e.target.value)}
              name="length"
              type="number"
              min="1"
              placeholder="Length (ft)"
            />
            <input
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              name="width"
              type="number"
              min="1"
              placeholder="Width (ft)"
            />
          </div>

          <div className="modalActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="submission" type="submit">
              Create plot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

