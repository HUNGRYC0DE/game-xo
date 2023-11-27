"use client";
import React, { useState } from "react";

const Xo = () => {
  const [round, setRound] = useState(0);
  const [game, setGame] = useState([]);
  const [players, setPlayers] = useState([]);
  const [bord, setBord] = useState([]);

  const handleResetBoard = () => {
    setBord([
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
      { activ: false, name: null, color: "bg-white" },
    ]);
    setPlayers([
      { block: 0, blockNum: [], name: "X", winner: false, winBlocks: [] },
      { block: 0, blockNum: [], name: "O", winner: false, winBlocks: [] },
    ]);
    setRound(0);
  };

  const handleClick = (index) => {
    if (
      bord[index].activ === false &&
      players.filter((item) => item.winner)[0]?.winner !== true
    ) {
      if (round % 2 == 0) {
        bord[index].activ = true;
        bord[index].name = players[0].name;
        players[0].block++;
        players[0].blockNum.push(index);
        players[0].blockNum = players[0].blockNum.sort();
      } else {
        bord[index].activ = true;
        bord[index].name = players[1].name;
        players[1].block++;
        players[1].blockNum.push(index);
        players[1].blockNum = players[1].blockNum.sort();
      }
      setRound(round + 1);
      Winner(bord);
    }
  };
  function Winner(bord) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        bord[a].name &&
        bord[a].name === bord[b].name &&
        bord[a].name === bord[c].name
      ) {
        players.flatMap((item) => {
          item.name === bord[a].name
            ? (item.winBlocks.push(lines[i]),
              (item.winner = true),
              bord.filter((a, b) =>
                item.winBlocks
                  .flat()
                  ?.map((c, d) => c === b && (a.color = "bg-green-400"))
              ))
            : bord.filter((a, b) =>
                item.blockNum
                  .flat()
                  ?.map((c, d) => c === b && (a.color = "bg-red-400"))
              );
        });
        setGame([
          ...game,
          { winner: players.filter((i) => i.winner)[0].name, bord: bord },
        ]);
      }
    }
  }
  return (
    <div className="flex gap-2 w-full">
      <div className="grid grid-cols-3 gap-1 min-w-[488px] ml-10 mt-20 relative">
        {(game.length === 0) & (players.length === 0) ? (
          ""
        ) : (
          <div className="col-span-3 bg bg-yellow-200 w-full h-40 flex justify-center items-center text-black text-[50px]">
            {players.filter((item) => item.winner)[0]?.winner
              ? `Winner ${players.filter((item) => item.winner)[0].name}`
              : round == 9
              ? "draw"
              : round % 2 == 0
              ? "X"
              : "O"}
          </div>
        )}

        {players.filter((item) => item.winner)[0]?.winner && (
          <span className="absolute w-[488px] h-[488px] top-[164px]"></span>
        )}
        {bord.map((item, index) => {
          return (
            <button
              onClick={() => handleClick(index)}
              key={index}
              className={`w-40 h-40 text-black text-[40px] ${item.color}`}
            >
              {item.name}
            </button>
          );
        })}
        <div className="col-span-3 flex items-center justify-center h-40">
          <button
            type="button"
            className="w-40 h-20 bg-slate-800 rounded-md text-[25px] font-bold"
            onClick={handleResetBoard}
          >
            {(game.length === 0) & (players.length === 0)
              ? "Start"
              : "Reset Board"}
          </button>
        </div>
      </div>
      <div className="w-full h-fit m-5 flex flex-wrap gap-3 mt-20 justify-between">
        <div className="w-full h-10 justify-around flex items-center bg-blue-400 text-black font-bold text-lg">
          <p className="">
            X = {game.filter((item) => item.winner === "X").length}
          </p>
          <p className="">History</p>
          <p className="">
            O = {game.filter((item) => item.winner === "O").length}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {game?.map((item, index) => {
            return (
              <div
                key={index}
                className="grid h-fit grid-cols-3 gap-1 Relative"
              >
                <span className="absolute w-[98px] h-[98px] "></span>
                {item.bord.map((i, b) => {
                  return (
                    <div
                      key={index + b}
                      className={`w-[30px] h-[30px] col-span-1 ${i.color} justify-center items-center flex text-black`}
                    >
                      {i.name}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Xo;
