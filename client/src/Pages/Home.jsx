import React from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/user";


function Home() {
  const dispatch=useDispatch();
  const isAuth=useSelector((state)=>state.users.status);
  console.log(isAuth)
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
    link.download = `eraser_example.${ext}`;
    link.click();
  };
  const Logout=()=>{
    localStorage.clear();
    dispatch(logout());
  }
  return (
    <div className="w-screen min-h-screen">
      <div className="flex justify-between items-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
            <h1>Design.in</h1>
            <button onClick={Logout}>Logout</button>
          </div>
       <h1>FabricJS React Sample</h1>
       <button onClick={onAddCircle}>Add circle</button>
       <button onClick={onAddRectangle}>Add Rectangle</button>
       <button onClick={onAddText}>Add Text</button>
       <button onClick={removeObjectFromCanvas}>Remove</button>
       <input type="file" onChange={onAddBackground} />
       <input type="file" multiple onChange={onUploadImage} />
       <button onClick={downloadImage}>to Image</button>
       <FabricJSCanvas className="sample-canvas" onReady={onReady} />
     </div>
  );
}

export default Home;

