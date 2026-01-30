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

   //Using Shadcn UI
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full p-6 flex justify-center">
      <Card className="w-full max-w-xl">


      <CardContent>
      <h1 className="flex items-center gap-6">Tools</h1>
      <div className="flex flex-row items-center justify-center">
        <div className="px-5">

        <label htmlFor="color">Stroke color</label>
        <input
          type="color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
        />

        </div>
        <div className="px-5">

        <label htmlFor="color">Canvas color</label>
        <input
          type="color"
          value={canvasColor}
          onChange={handleCanvasColorChange}
        />
        </div>
        <div className="px-5">

                <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={toggleEraseMode}
        >
          {eraseMode ? "Draw" : "Erase"}
        </button>
</div>
      </div>
      <div className="d-flex gap-2 align-items-center ">
        

        <label htmlFor="strokeWidth" className="form-label">
          Stroke width
        </label>
        <input
          disabled={eraseMode}
          type="range"
          className="form-range"
          min="1"
          max="20"
          step="1"
          id="strokeWidth"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
        <label htmlFor="eraserWidth" className="form-label">
          Eraser width
        </label>
        <input
          disabled={!eraseMode}
          type="range"
          className="form-range"
          min="1"
          max="40"
          step="1"
          id="eraserWidth"
          value={eraserWidth}
          onChange={handleEraserWidthChange}
        />
      </div>
      <h1>Canvas</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        height={canvasHeight}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        strokeColor={strokeColor}
        canvasColor={canvasColor}

      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        
        onClick={() => canvasRef.current?.clearCanvas()}>
          CLEAR
      </button>
      </CardContent>

     </Card>

    </div>
  );
}