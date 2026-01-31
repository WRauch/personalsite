import {
  ReactSketchCanvas,
} from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Canvas() {
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(20);

  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(600);

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleCanvasColorChange = (e) => {
    setCanvasColor(e.target.value);
  };

  const toggleEraseMode = () => {
    var cur = !eraseMode
    setEraseMode(cur);
    canvasRef.current?.eraseMode(cur);
  };

  const handleStrokeWidthChange = (e) => {
    setStrokeWidth(e.target.value);
  };

  const handleEraserWidthChange = (e) => {
    setEraserWidth(e.target.value);
  };

  // Keep functionality exactly the same — only tweak visual layout
  return (
    <div className="parrot-canvas w-full">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Tools</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Stroke color</label>
                  <input type="color" value={strokeColor} onChange={handleStrokeColorChange} />
                </div>

                <div>
                  <label className="block text-sm mb-1">Canvas color</label>
                  <input type="color" value={canvasColor} onChange={handleCanvasColorChange} />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={toggleEraseMode}
                    className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    {eraseMode ? 'Draw' : 'Erase'}
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">Stroke width</label>
                  <input
                    disabled={eraseMode}
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={strokeWidth}
                    onChange={handleStrokeWidthChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Eraser width</label>
                  <input
                    disabled={!eraseMode}
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={eraserWidth}
                    onChange={handleEraserWidthChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Canvas</h2>

              {/* Keep the canvas props and element exactly as before to preserve behavior */}
              <div className="w-full bg-white rounded border border-border p-4 flex flex-col items-center">
                <ReactSketchCanvas
                  ref={canvasRef}
                  height={canvasHeight}
                  strokeWidth={strokeWidth}
                  eraserWidth={eraserWidth}
                  strokeColor={strokeColor}
                  canvasColor={canvasColor}
                />

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => canvasRef.current?.clearCanvas()}
                    className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}