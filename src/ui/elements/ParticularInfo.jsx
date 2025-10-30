function ParticularInfo({ children, borderColor = "#ffffff70" }) {
  return (
    <div
      className="
        relative flex flex-col items-center justify-center gap-2
        rounded-xl p-4 text-xl text-dark-blue
        bg-transparent-gray 
        shadow-md
        transition-all duration-300
      "
      style={{ border: borderColor, boxShadow: borderColor }}
    >
      {children}
    </div>
  );
}
export default ParticularInfo;
