import React from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, saveWork, WorkStatus } from "../redux/features/user";
import { useEffect } from "react";

function Home() {
  const work = {
    objects: [
      {
        type: "circle",
        version: "5.2.4",
        originX: "left",
        originY: "top",
        left: 100,
        top: 100,
        width: 40,
        height: 40,
        fill: "rgba(255, 255, 255, 0.0)",
        stroke: "#000000",
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeDashOffset: 0,
        strokeLineJoin: "miter",
        strokeUniform: false,
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: "",
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        skewX: 0,
        skewY: 0,
        radius: 20,
        startAngle: 0,
        endAngle: 360,
      },
      {
        type: "rect",
        version: "5.2.4",
        originX: "left",
        originY: "top",
        left: 221.24,
        top: 101.96,
        width: 40,
        height: 40,
        fill: "rgba(255, 255, 255, 0.0)",
        stroke: "#000000",
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeDashOffset: 0,
        strokeLineJoin: "miter",
        strokeUniform: false,
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: "",
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        skewX: 0,
        skewY: 0,
        rx: 0,
        ry: 0,
      },
    ],
  };
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.users.status);
  console.log(isAuth);
  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };
  const onAddText = () => {
    editor.addText("Text");
  };

  const load = (e) => {
    editor.canvas.loadFromJSON(work, () => {
      console.log("loaded Successfully");
    });
  };
  const onAddBackground = (e) => {
    const image = e.target.files[0];
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      editor.canvas.setBackgroundImage(img);
      editor.canvas.renderAll();
    });
  };

  const onUploadImage = (e) => {
    const image = e.target.files[0];
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };

  const removeObjectFromCanvas = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const downloadImage = () => {
    const ext = "png";
    const base64 = editor.canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `design.in_work.${ext}`;
    link.click();
  };

  const save = () => {
    const canvasWork = JSON.stringify(editor.canvas.toDatalessJSON());
    console.log(canvasWork);
    dispatch(saveWork(canvasWork)).then((data) => {
      console.log(data);
    });
  };
  const Logout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="flex justify-between items-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
        <h1>Design.in</h1>
        <button onClick={Logout}>Logout</button>
      </div>
      <h1 className="font-bold text-center">
        Note:-Add Background the Image size cannot be resized && Add Image the
        size of image Rezisable
      </h1>
      <h1>FabricJS</h1>
      <div className="flex flex-row justify-between gap-4">
        <div className="bg-teal-400 mt-10 flex flex-col w-48 justify-center items-center gap-4">
          <button onClick={load} className="border-2 p-2 text-white font-bold">
            Load Your Previous Work
          </button>
          <button
            onClick={onAddCircle}
            className="border-2 p-2 text-white font-bold"
          >
            Add circle
          </button>
          <button
            className="border-2 p-2 text-white font-bold"
            onClick={onAddRectangle}
          >
            Add Rectangle
          </button>
          <button
            className="border-2 p-2 text-white font-bold"
            onClick={onAddText}
          >
            Add Text
          </button>
          <button
            className="border-2 p-2 text-white font-bold"
            onClick={removeObjectFromCanvas}
          >
            Remove
          </button>
          <label className="cursor-pointer mt-4">
            <input type="file" onChange={onAddBackground} className="hidden" />
            <span className="border-2 p-2 text-white font-bold">
              Add Background
            </span>
          </label>
          <label className="cursor-pointer mt-4">
            <input
              type="file"
              multiple
              onChange={onUploadImage}
              className="hidden"
            />
            <span className="border-2 p-2 text-white font-bold">
              Add Images
            </span>
          </label>
          <button
            className="border-2 p-2 text-white font-bold mt-4"
            onClick={downloadImage}
          >
            To Image
          </button>
          <button onClick={save} className="border-2 p-2 text-white font-bold">
            Save
          </button>
        </div>
        <FabricJSCanvas
          className="sample-canvas bg-white border-4 w-96 h-screen flex-1"
          onReady={onReady}
        />
      </div>
    </div>
  );
}

export default Home;
