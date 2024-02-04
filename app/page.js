"use client"; // this is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import gredentColor from "./generated.json";

const App = () => {
  const [particleSize, setParticleSize] = useState(200);
  const [animationDuration, setAnimationDuration] = useState(5);
  const [amount, setAmount] = useState(50);
  const [borderRadius, setBorderRadius] = useState(100);
  const [blur, setBlur] = useState(0);
  const [blendMode, setBlendMode] = useState("normal");

  const router = useRouter();
  const [copyHtml, setCopyHTML] = useState("Copy HTML");
  const [copyCss, setCopyCSS] = useState("Copy CSS");
  const [background_colors, setBackground] = useState(
    "radial-gradient(63.62% 69.52% at 100% 0%, rgba(247, 214, 98, 0.8) 0%, rgba(247, 214, 98, 0.17) 52.08%, rgba(247, 214, 98, 0) 100%), linear-gradient(208.42deg, rgb(240, 66, 42) 7.46%, rgba(240, 88, 42, 0.18) 42.58%, rgba(240, 101, 42, 0) 64.13%), radial-gradient(114.51% 122.83% at 0% -15.36%, rgb(231, 79, 106) 0%, rgba(231, 79, 106, 0.22) 66.72%, rgba(231, 79, 106, 0) 100%), linear-gradient(333.95deg, rgba(83, 208, 236, 0.85) -7.76%, rgba(83, 208, 236, 0.204) 19.67%, rgba(138, 137, 190, 0) 35.42%), radial-gradient(109.15% 148.57% at 4.46% 98.44%, rgb(27, 49, 128) 0%, rgba(27, 49, 128, 0) 100%), linear-gradient(141.57deg, rgb(78, 173, 235) 19.08%, rgba(78, 173, 235, 0) 98.72%)"
  );

  function hexToRgba(hex, opacity) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const handleParticleSizeChange = (e) => {
    setParticleSize(e.target.value);
  };

  const handleAnimationDurationChange = (e) => {
    setAnimationDuration(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const generateParticleCSS = (i) => {
    const blurRadius = (Math.random() + 0.5) * particleSize * 0.5;
    const x = Math.random() > 0.5 ? -1 : 1;

    return `
      .particle:nth-child(${i}) {
        backface-visibility: hidden;
        position: absolute;
        width: ${particleSize}px;
        height: ${particleSize}px;
        animation-duration: ${
          (Math.random() * (animationDuration * 10)) / 10 + 10
        }s;
        animation-delay: ${
          (-1 * (Math.random() * ((animationDuration + 10) * 10))) / 10
        }s;
        transform-origin: ${Math.random() * 50 - 25}vw ${
      Math.random() * 50 - 25
    }vh;
        animation-name: move;
        background: ${background_colors};
        border-radius: ${borderRadius}%;
        background-blend-mode: ${blendMode};
        filter: blur(${blur}px);
        top: ${Math.floor(Math.random() * 100)}%;
        left: ${Math.floor(Math.random() * 100)}%;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    `;
  };

  const generateCSS = () => {
    let css = `@keyframes move {
      100% {
        transform: translate3d(0, 0, 1px) rotate(360deg);
      }
    } `;
    for (let i = 1; i <= amount; i++) {
      css += generateParticleCSS(i);
    }
    return css;
  };

  const generateParticleHTML = (i) => {};
  const generateHTML = () => {
    let html = ``;
    html += `<div class="particle-container">`;
    for (let i = 1; i <= amount; i++) {
      html += '<div class="particle"></div>';
    }
    html += `</div>`;

    return html;
  };

  const particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(
      <div
        key={i}
        className="particle"
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          width: `${particleSize}px`,
          height: `${particleSize}px`,
          animationDuration: `${
            (Math.random() * (animationDuration * 10)) / 10 + 10
          }s`,
          animationDelay: `${
            (-1 * (Math.random() * ((animationDuration + 10) * 10))) / 10
          }s`,
          transformOrigin: `${Math.random() * 50 - 25}vw ${
            Math.random() * 50 - 25
          }vh`,
          animationName: 'move',
          background: `${background_colors}`,
          borderRadius: `${borderRadius}%`,
          backgroundBlendMode: `${blendMode}`,
          filter: `blur(${blur}px)`,
          top: `${Math.floor(Math.random() * 100)}%`,
          left: `${Math.floor(Math.random() * 100)}%`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      ></div>
    );
  }

  //   const htmlCode = `<div class="particle-container">
  //   ${Array(amount).fill('<div class="particle"></div>').join("")}
  // </div>`;

  const cssCode = generateCSS();

  const htmlCode = generateHTML();

  const handleBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
  };

  const handleBlurChange = (e) => {
    setBlur(e.target.value);
  };

  const handleColor = (bgColor, Bmode) => {
    console.log(bgColor);
    setBackground(bgColor);
    setBlendMode(Bmode);
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopyHTML("Copied!");
    setTimeout(() => {
      setCopyHTML("Copy HTML");
    }, 3000);
  };
  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopyCSS("Copied!");
    setTimeout(() => {
      setCopyCSS("Copy CSS");
    }, 3000);
  };

  return (
    <main
      className={`min-h-screen h-full md:p-20 p-4 md:flex flex-col md:overflow-hidden overflow-x-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black`}
    >
      <div
        className={`flex flex-grow sm:flex-row flex-col rounded-2xl gap-6 overflow-hidden`}
      >
        <div className="w-full h-60 sm:h-auto flex items-center justify-center sm:order-2 overflow-hidden relative bg-white rounded-2xl">
          <div className="particle-container">{particles}</div>
        </div>

        <div className="md:w-[380px] flex flex-col p-4 bg-opacity-25 rounded-2xl  backdrop-blur-3xl bg-slate-600 text-white border border-slate-700 sm:order-1">
          <div className="controls">
            <div className="mb-2">
              <label>Presets</label>
              <div className="w-full grid grid-cols-6 gap-2 mt-3">
                {gredentColor &&
                  gredentColor.map((item, i) => (
                    <div key={i} className="col-span-1 aspect-square ">
                      <button
                        type="button"
                        className="w-full aspect-square rounded-lg relative overflow-hidden border-2  border-white  border-opacity-40 transition duration-100 hover:border-opacity-100 backface"
                      >
                        <div className="w-[16px] h-[16px] absolute inset-0 z-10 flex items-center justify-center text-[12px] text-white font-semibold">
                          {i + 1}
                        </div>
                        <div
                          className="w-full h-full object-cover object-center blur-[5px] scale-[1.5] cursor-pointer"
                          onClick={() =>
                            handleColor(item.gradient, item.backgroundBlendMode)
                          }
                          style={{
                            background: item.gradient,
                            backgroundBlendMode: item.backgroundBlendMode,
                          }}
                        ></div>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="control">
              <label htmlFor="particle-size" className="text-sm text-slate-500">
                Particle Size:
              </label>
              <div className="flex items-center">
                <input
                  id="particle-size"
                  className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                  type="range"
                  min="1"
                  max="500"
                  value={particleSize}
                  onChange={handleParticleSizeChange}
                />
                <div className="ml-5">
                  <input
                    type={"text"}
                    readOnly
                    className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                    value={particleSize}
                  />
                </div>
              </div>
            </div>

            <div className="control">
              <label
                htmlFor="particle-amount"
                className="text-sm text-slate-500"
              >
                Particle Amount:
              </label>
              <div className="flex items-center">
                <input
                  id="particle-amount"
                  className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                  type="range"
                  min="1"
                  max="200"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <div className="ml-5">
                  <input
                    type={"text"}
                    readOnly
                    className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                    value={amount}
                  />
                </div>
              </div>
            </div>

            <div className="control">
              <label htmlFor="range_blur" className="text-sm text-slate-500">
                Blur:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="range_blur"
                  min="1"
                  max="100"
                  onChange={handleBlurChange}
                  value={blur}
                  className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                />
                <div className="ml-5">
                  <input
                    type={"text"}
                    readOnly
                    className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                    value={blur}
                  />
                </div>
              </div>
            </div>

            <div className="control">
              <label
                htmlFor="particle-animation-duration"
                className="text-sm text-slate-500"
              >
                Animation Duration:
              </label>
              <div className="flex items-center">
                <input
                  id="particle-animation-duration"
                  className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                  type="range"
                  min="1"
                  max="400"
                  value={animationDuration}
                  onChange={handleAnimationDurationChange}
                />
                <div className="ml-5">
                  <input
                    type={"text"}
                    readOnly
                    className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                    value={animationDuration}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-full max-h-28 flex-1 text-sm focus:border-none focus:outline-none p-2 rounded-xl resize-none scroll-small overflow-y-auto bg-transparent  bg-white bg-opacity-5 mb-5">
        </div> */}
          <button
            type="button"
            onClick={copyHTML}
            className="mt-auto w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          >
            {copyHtml}
          </button>
          <button
            type="button"
            onClick={copyCSS}
            className="mt-auto w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          >
            {copyCss}
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
