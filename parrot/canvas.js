import {
  ReactSketchCanvas,
} from "react-sketch-canvas";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Canvas() {
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(20);

  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");


  const [score, setScore] = useState(0);
  const [canvasMode, setCanvasMode] = useState(false); 
  const [textInput, setTextInput] = useState("Enter text");

  // responsive canvas height: scale down on smaller screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function updateHeight() {
      const h = window.innerHeight || 800;
      // prefer a fraction of the viewport height but clamp between 300 and 650
      const newH = Math.max(300, Math.min(500, Math.floor(h * 0.6)));
      setCanvasHeight(newH);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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

  const toggleCanvasMode = () => {
    var test = !canvasMode
    setCanvasMode(test);
    canvasRef.current?.canvasMode(test);
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
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Tools</h2>
                
              </div>
           
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">Stroke color</label>
                      <input type="color" value={strokeColor} onChange={handleStrokeColorChange} />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm mb-1">Canvas color</label>
                      <input type="color" value={canvasColor} onChange={handleCanvasColorChange} />
                    </div>
                  </div>
                    {!eraseMode ? (
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
                    ) : (
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

                    )}

                 <div>
                    {/* Lock moved to the score area to reduce accidental scroll while drawing */}
                  </div>
                </div>
        
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-4">Canvas</h2>
                <div className="ml-4">

                  {canvasMode ? null : ( 

                  <button
                    type="button"
                    onClick={toggleEraseMode}
                    className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    {eraseMode ? 'Draw' : 'Erase'}
                  </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { toggleCanvasMode(); setEraseMode(false); }}
                    className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 ml-2"
                  >
                    {canvasMode ? 'Canvas' : 'Text'}
                  </button>
                </div>
              </div>


              {/* Keep the canvas props and element exactly as before to preserve behavior */}

              <div
                className="w-full bg-white rounded border border-border p-4 flex flex-col items-center"

              >

              {canvasMode ? (
                <div className="w-full bg-white rounded border border-border p-4 flex items-center justify-center" style={{ height: canvasHeight }}>
                  <input className="text-black text-center text-xl" value={textInput} style={{ fontSize: 88 }} onChange={(e) => setTextInput(e.target.value)}/>
                </div>
              ) : (
                <ReactSketchCanvas
                  ref={canvasRef}
                  height={canvasHeight}
                  strokeWidth={strokeWidth}
                  eraserWidth={eraserWidth}
                  strokeColor={strokeColor}
                  canvasColor={canvasColor}
                />
                              )}

                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => { canvasRef.current?.clearCanvas(); setTextInput("Enter text"); }}
                    className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    CLEAR
                  </button>

                  <div className="inline-flex items-center gap-2 bg-gray-600 rounded-md px-3 py-1">
                    <h1 className="text-sm font-medium">Score</h1>
                    <button
                      type="button"
                      onClick={() => setScore((s) => s - 1)}
                      aria-label="Decrease score"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white border border-border text-sm font-medium hover:bg-gray-100 text-black"
                    >
                      −
                    </button>

                    <div className="text-sm font-medium">{score}</div>

                    <button
                      type="button"
                      onClick={() => setScore((s) => s + 1)}
                      aria-label="Increase score"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white border border-border text-sm font-medium hover:bg-gray-100 text-black"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>

            </div>


          <div className="md:col-span-1 md:col-start-1 md:row-start-2">
            <h2 className="text-2xl font-semibold">Tips</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Use the color pickers to choose your stroke and canvas colors.</li>
              <li>Toggle between draw and erase modes with the button above the canvas.</li>
              <li>Adjust stroke and eraser widths with the sliders that appear based on the selected mode.</li>
              <li>Use the clear button to reset the canvas, and the score buttons to keep track of points.</li>
              <li>If you prefer to write answers instead of draw the Text mode can be used</li>
            </ul>
          </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}