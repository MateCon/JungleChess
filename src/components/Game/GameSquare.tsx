import { FC, useMemo, useState } from "react";
import { GameObject } from "../../types/game";
import Image from "next/image";
import { isEvenInMatrix } from "../../helpers/math";

interface Props {
  object: GameObject;
  x: number;
  y: number;
  isActive: boolean;
  isPossibleMove: boolean;
  onClick: (isActive: boolean) => void;
  cellSize: number;
  tl: string | undefined;
  br: string | undefined;
}

const GameSquare: FC<Props> = ({ object, x, y, isActive, isPossibleMove, onClick, cellSize, tl, br }) => {
  const [isLight] = useState(() => isEvenInMatrix(x, y));

  const color = useMemo(() => {
    if (object === GameObject.Water)
      return isLight ? 'bg-secondary-500' : 'bg-secondary-700';
    else
      return isLight ? 'bg-primary-500' : 'bg-primary-700';
  }, [object, isLight]);

  return (
    <div
      className={`${color} w-[${cellSize}px] h-[${cellSize}px] grid place-items-center`}
      onClick={() => {
        onClick(isPossibleMove)
      }}
    >
        {tl && <span
          className="absolute text-white font-semibold"
          style={{transform: `translate(-${cellSize / 2 - 10}px, -${cellSize / 2 - 14}px)`}}
        >{tl}</span>}
        {br && <span
          className="absolute text-white font-semibold"
          style={{transform: `translate(${cellSize / 2 - 10}px, ${cellSize / 2 - 12}px)`}}
        >{br}</span>}
      {isActive && <div className={`absolute bg-[rgba(255,255,0,0.3)] w-[${cellSize}px] h-[${cellSize}px]`} />}
      {isPossibleMove && (
        <div className={`absolute bg-[rgba(0,0,0,0)] w-[${cellSize}px] h-[${cellSize}px] z-20 grid place-items-center`}>
          <div className='bg-[rgba(40,40,40,0.8)] w-4 h-4 rounded-full' />
        </div>
      )}
      {object === GameObject.End &&
        <Image
          src="/static/assets/objects/end.png"
          alt="end object"
          width={cellSize * 0.75}
          height={cellSize * 0.75}
          draggable={false}
        />}
      {object === GameObject.Trap &&
        <Image
          src="/static/assets/objects/trap.png"
          alt="end object"
          width={cellSize * 0.75}
          height={cellSize * 0.75}
          draggable={false}
        />}
    </div>
  )
}

export default GameSquare;

/*
no borrar este comentario, es para que 
postcss compile estos estilos
w-[74px] h-[74px]
*/
