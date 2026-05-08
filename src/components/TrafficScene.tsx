import React from 'react';
import { motion } from 'framer-motion';
import { SceneConfig, PersonGroup } from '../types';
interface TrafficSceneProps {
  config: SceneConfig;
  animationState:
  'idle' |
  'moving-top' |
  'moving-bottom' |
  'moving-straight' |
  'stop';
}
export function TrafficScene({ config, animationState }: TrafficSceneProps) {
  // Base coordinates
  const startX = 100;
  const startY = 200;
  const splitX = 350;
  const topY = 100;
  const bottomY = 300;
  const endX = 700;
  // Car dimensions
  const cW = 50;
  const cH = 26;
  // Animation variants for the car
  const carVariants = {
    idle: {
      x: startX,
      y: startY - cH / 2
    },
    'moving-top': {
      x: [startX, splitX, endX],
      y: [startY - cH / 2, startY - cH / 2, topY - cH / 2],
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    },
    'moving-bottom': {
      x: [startX, splitX, endX],
      y: [startY - cH / 2, startY - cH / 2, bottomY - cH / 2],
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    },
    'moving-straight': {
      x: [startX, endX],
      y: [startY - cH / 2, startY - cH / 2],
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    },
    stop: {
      x: [startX, splitX - 30],
      y: [startY - cH / 2, startY - cH / 2],
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  const renderPerson = (
  x: number,
  y: number,
  type: PersonGroup['type'],
  index: number) =>
  {
    const isSpecial = type === 'child' || type === 'school-child';
    const color =
    type === 'cyclist' ? '#2b5c8f' : type === 'driver' ? '#a39e93' : '#1a1a1a';
    const scale = isSpecial ? 0.7 : 1;
    return (
      <g
        key={`${type}-${index}`}
        transform={`translate(${x}, ${y}) scale(${scale})`}>
        
        <circle cx="0" cy="-15" r="6" fill={color} />
        <path
          d="M 0 -9 L 0 5 M -8 -2 L 8 -2 M -5 5 L -8 15 M 5 5 L 8 15"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none" />
        
        {type === 'cyclist' &&
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke={color}
          strokeWidth="2"
          fill="none" />

        }
      </g>);

  };
  const renderGroup = (
  group: PersonGroup | undefined,
  baseX: number,
  baseY: number) =>
  {
    if (!group) return null;
    const spacing = 25;
    const startOffset = -((group.count - 1) * spacing) / 2;
    return (
      <g>
        {Array.from({
          length: group.count
        }).map((_, i) =>
        renderPerson(baseX + startOffset + i * spacing, baseY, group.type, i)
        )}
        {group.label &&
        <text
          x={baseX}
          y={baseY - 40}
          textAnchor="middle"
          className="text-xs font-sans fill-muted font-medium">
          
            {group.label}
          </text>
        }
      </g>);

  };
  return (
    <div className="w-full aspect-video max-h-[400px] bg-paper rounded-xl border border-ink/10 overflow-hidden relative shadow-sm">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Environment / Roads */}
        <g
          stroke="#1a1a1a"
          strokeWidth="40"
          strokeOpacity="0.08"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="round">
          
          {config.layout === 'fork-road' &&
          <>
              <path d={`M 0 ${startY} L ${splitX} ${startY}`} />
              <path d={`M ${splitX} ${startY} L ${endX + 50} ${topY}`} />
              <path d={`M ${splitX} ${startY} L ${endX + 50} ${bottomY}`} />
            </>
          }

          {(config.layout === 'highway' ||
          config.layout === 'neighborhood' ||
          config.layout === 'crosswalk') &&
          <path d={`M 0 ${startY} L ${endX + 100} ${startY}`} />
          }

          {config.layout === 'intersection' &&
          <>
              <path d={`M 0 ${startY} L ${endX + 100} ${startY}`} />
              <path d={`M ${splitX} 0 L ${splitX} 400`} />
            </>
          }
        </g>

        {/* Road Markings (Dashed Lines) */}
        <g
          stroke="#f4ede0"
          strokeWidth="2"
          strokeDasharray="10, 15"
          fill="none">
          
          {config.layout === 'fork-road' &&
          <>
              <path
              d={`M 0 ${startY} L ${splitX} ${startY}`}
              stroke="#1a1a1a"
              strokeOpacity="0.2" />
            
              <path
              d={`M ${splitX} ${startY} L ${endX + 50} ${topY}`}
              stroke="#1a1a1a"
              strokeOpacity="0.2" />
            
              <path
              d={`M ${splitX} ${startY} L ${endX + 50} ${bottomY}`}
              stroke="#1a1a1a"
              strokeOpacity="0.2" />
            
            </>
          }

          {(config.layout === 'highway' ||
          config.layout === 'neighborhood' ||
          config.layout === 'crosswalk') &&
          <path
            d={`M 0 ${startY} L ${endX + 100} ${startY}`}
            stroke="#1a1a1a"
            strokeOpacity="0.2" />

          }

          {config.layout === 'intersection' &&
          <>
              <path
              d={`M 0 ${startY} L ${endX + 100} ${startY}`}
              stroke="#1a1a1a"
              strokeOpacity="0.2" />
            
              <path
              d={`M ${splitX} 0 L ${splitX} 400`}
              stroke="#1a1a1a"
              strokeOpacity="0.2" />
            
            </>
          }
        </g>

        {/* Crosswalk Stripes */}
        {config.layout === 'crosswalk' &&
        <g fill="#1a1a1a" fillOpacity="0.15">
            {Array.from({
            length: 6
          }).map((_, i) =>
          <rect
            key={`cw-${i}`}
            x={splitX - 20}
            y={startY - 18 + i * 6}
            width="40"
            height="3" />

          )}
          </g>
        }

        {/* People */}
        {config.layout === 'fork-road' &&
        <>
            {renderGroup(config.topRoad, 600, topY - 30)}
            {renderGroup(config.bottomRoad, 600, bottomY + 30)}
          </>
        }

        {config.layout === 'highway' &&
        <>
            {renderGroup(config.mainRoad, 550, startY - 40)}
            {renderGroup(config.sideElement, 550, startY + 50)}
          </>
        }

        {config.layout === 'crosswalk' &&
        <>
            {animationState === 'stop' ?
          <motion.g
            initial={{
              y: startY - 60
            }}
            animate={{
              y: startY
            }}
            transition={{
              duration: 0.5
            }}>
            
                {renderGroup(config.mainRoad, splitX, 0)}
              </motion.g> :

          renderGroup(config.mainRoad, splitX, startY - 40)
          }
            {renderGroup(config.sideElement, 600, startY + 50)}
          </>
        }

        {config.layout === 'neighborhood' &&
        <>
            {renderGroup(config.mainRoad, 500, startY - 30)}
            {renderGroup(config.sideElement, 500, startY + 50)}
          </>
        }

        {/* The Car */}
        <motion.g
          variants={carVariants}
          initial="idle"
          animate={animationState}>
          
          {/* Car Body */}
          <rect width={cW} height={cH} rx="6" fill="#c24127" />
          {/* Windows */}
          <rect
            x="12"
            y="4"
            width="12"
            height="18"
            rx="2"
            fill="#f4ede0"
            fillOpacity="0.9" />
          
          <rect
            x="28"
            y="4"
            width="10"
            height="18"
            rx="2"
            fill="#f4ede0"
            fillOpacity="0.9" />
          
          {/* Headlights */}
          <circle cx={cW} cy="6" r="2" fill="#e8c35d" />
          <circle cx={cW} cy={cH - 6} r="2" fill="#e8c35d" />
        </motion.g>
      </svg>
    </div>);

}