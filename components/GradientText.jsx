import React from "react";

export default function GradientText({
  children,
  className = '',
  colors = ['#0a0a0a', '#e8e4ed', '#0a0a0a'],
  animationSpeed = 2,
  showBorder = false
}) {
  // Génère une clé unique pour l'animation afin d'éviter les conflits CSS
  const animationKey = React.useMemo(
    () => `gradient-move-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // Crée dynamiquement la règle @keyframes pour l'animation du gradient
  React.useEffect(() => {
    const styleId = `gradient-text-style-${animationKey}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @keyframes ${animationKey} {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.getElementById(styleId)) {
        document.getElementById(styleId).remove();
      }
    };
  }, [animationKey]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 200%',
    backgroundPosition: '0% 50%',
    animation: `${animationKey} ${animationSpeed}s ease-in-out infinite`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const borderGradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 200%',
    backgroundPosition: '0% 50%',
    animation: `${animationKey} ${animationSpeed}s ease-in-out infinite`
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            ...borderGradientStyle,
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
      )}
      <span
        className="inline-block relative z-2"
        style={gradientStyle}
      >
        {children}
      </span>
    </div>
  );
}
