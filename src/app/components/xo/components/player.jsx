import React, { useEffect } from "react";

const Player = ({ player, game }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span
        className={`w-full h-[160px] ${
          player === "X" ? "bg-blue-500" : "bg-yellow-500"
        } flex justify-center items-center text-[100px]`}
      >
        <p className="">
          {`${player} = ${
            game?.filter((item) => item.winner === player).length
          }`}
        </p>
      </span>
      <div className="flex justify-around gap-2 flex-wrap mx-2">
        {game
          ?.filter((item) => item.winner === player)
          .map((item, index) => {
            return (
              <div
                key={index}
                className={`relative ${
                  item.show && "blur"
                } blur hover:blur-none`}
              >
                <div className="grid h-fit grid-cols-3 gap-1 ">
                  {item.bord.map((i, b) => {
                    return (
                      <span
                        key={index + b}
                        className={`w-[30px] h-[30px] col-span-1 ${i.color} justify-center items-center flex text-black`}
                      >
                        {i.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Player;
