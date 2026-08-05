import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Link } from '@inertiajs/react';

const BubbleTC = () => {
  const [bottomOffset, setBottomOffset] = useState('2rem');

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      // Calcula cuánto del footer es visible en la pantalla
      if (footerRect.top <= window.innerHeight) {
        const visibleFooterHeight = window.innerHeight - footerRect.top;
        // Mantenerlo 2rem (32px) por encima del footer
        setBottomOffset(`calc(${visibleFooterHeight}px + 2rem)`);
      } else {
        setBottomOffset('2rem');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Timeout para asegurar que el DOM cargó completo antes del cálculo inicial
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <StyledWrapper style={{ bottom: bottomOffset }} className="group flex items-center">
      <Link href="/trade" className="bubble">
        <img src="/logo.png" alt="Clúster Cafetalero" className="bubble-img" />
        <span className="bubble-shadow-overlay"></span>
      </Link>

      {/* Mensaje flotante (Tooltip) */}
      <div className="absolute left-full ml-4 px-4 py-2.5 bg-brand text-[#F4F1EA] text-sm font-semibold rounded-lg shadow-xl opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-[60]">
        Registra tu Tienda o Finca de Café
        {/* Triángulo apuntando a la burbuja */}
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 bg-brand-mint rotate-45 rounded-sm"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  label, .bubble {
    display: block;
    -webkit-tap-highlight-color: transparent;
  }

  label {
    animation: float74 4s ease-in-out infinite;
  }

  .bubble, .bubble:before, .bubble:after {
    transition-duration: 0.2s;
  }

  .bubble, .bubble:after {
    border-radius: 50%;
  }

  .bubble {
    font-size: 32px; /* Scales the entire bubble (em units) by 2x */
    cursor: pointer;
    position: relative;
    width: 3em;
    height: 3em;
    transform-style: preserve-3d;
    transition-property: box-shadow, transform, width, height;
    transition-timing-function: ease-in-out, ease-in-out, var(--bubbleTiming), var(--bubbleTiming);
    will-change: transform;
    -webkit-appearance: none;
    appearance: none;
    z-index: 0;
    border: none;
    outline: none;
    background-color: white;
  }

  .bubble-shadow-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    pointer-events: none;
    z-index: 2;
    background-image: radial-gradient(8% 8% at 22% 28%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 23% 27%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 24% 26%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 25% 25%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 26% 24%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 27% 23%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%),
  		radial-gradient(8% 8% at 28% 22%,hsl(0,0%,100%) 45%,hsla(0,0%,100%,0) 50%);
    box-shadow: 0 -0.06em 0.1em hsl(0,0%,100%) inset,
  		0 -0.15em 0.4em hsl(0,0%,45%) inset,
  		0 0.05em 0.05em hsl(0,0%,45%) inset,
  		0.05em 0 0.1em hsl(0,0%,100%) inset,
  		-0.05em 0 0.1em hsl(0,0%,100%) inset,
  		0 0.1em 0.4em hsl(0,0%,60%) inset;
  }

  .bubble-img {
    width: 75%;
    height: 75%;
    object-fit: contain;
    position: absolute;
    top: 12.5%;
    left: 12.5%;
    z-index: 1;
    pointer-events: none;
  }

  .bubble:before, .bubble:after {
    content: "";
    display: block;
    position: absolute;
    transition-timing-function: var(--bubbleTiming);
  }

  .bubble:before {
    border-radius: 0.75em;
    box-shadow: 0 0 0 0.5em hsl(0,0%,100%) inset;
    filter: drop-shadow(0 0 0.6em hsla(0,0%,0%,0.3));
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,-1px);
    z-index: 2;
    pointer-events: none;
  }

  .bubble:after {
    background: radial-gradient(100% 100% at center,hsla(0,0%,0%,0) 35%,hsla(0,0%,0%,0.2) 48%,hsla(0,0%,0%,0) 50%);
    filter: blur(4px);
    top: 0.6em;
    left: 0.6em;
    width: 100%;
    height: 100%;
    transform: translate3d(0,0,-1px);
    z-index: 2;
    pointer-events: none;
  }

  .bubble:focus, .bubble:hover {
    transform: scale(1.1);
    outline: none;
  }

  .bubble:focus:active, .bubble:hover:active {
    width: 3.6em;
    height: 2.4em;
  }

  .bubble:focus:before, .bubble:hover:before {
    filter: drop-shadow(0 0 0.75em hsla(0,0%,0%,0.3));
  }

  .bubble:focus:after, .bubble:hover:after {
    transform: translate3d(0.15em,0.15em,-1px);
  }

  .bubble:checked {
    box-shadow: 0 -0.06em 0.1em hsl(120,90%,100%) inset,
  		0 -0.15em 0.4em hsl(120,90%,45%) inset,
  		0 0.05em 0.05em hsl(120,90%,45%) inset,
  		0.05em 0 0.1em hsl(120,90%,100%) inset,
  		-0.05em 0 0.1em hsl(120,90%,100%) inset,
  		0 0.1em 0.4em hsl(120,90%,60%) inset;
  }

  .bubble:checked:before {
    border-radius: 0.25em;
    width: 0.5em;
  }
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    label {
      animation: none;
    }

    .bubble, .bubble:before, .bubble:after {
      transition-duration: 0s;
    }

    .bubble:focus, .bubble:hover {
      transform: scale(1);
    }

    .bubble:focus:active, .bubble:hover:active {
      width: 3em;
      height: 3em;
    }

    .bubble:focus:before, .bubble:hover:before {
      filter: drop-shadow(0 0 0.6em hsla(0,0%,0%,0.3));
    }

    .bubble:focus:after, .bubble:hover:after {
      transform: translate3d(0,0,-1px);
    }
  }
  /* Animations */
  @keyframes float74 {
    from, to {
      transform: translate(0,3%);
    }

    25% {
      transform: translate(-3%,0);
    }

    50% {
      transform: translate(0,-3%);
    }

    75% {
      transform: translate(3%,0);
    }
  }

  /* Posicionamiento flotante controlado por React */
  position: fixed;
  left: 2rem;
  z-index: 50;
  transition: bottom 0.05s linear;
`;

export default BubbleTC;
