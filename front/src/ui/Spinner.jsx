function Spinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="w-24 h-24 rounded-full animate-spin"
        style={{
          background: "conic-gradient(#0000 10%, #023047)", // your dark blue
          WebkitMask:
            "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
          mask: "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
          animationDuration: "1.5s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
}

export default Spinner;
