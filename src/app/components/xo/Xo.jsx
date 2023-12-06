"use client";
import React, { useEffect, useState } from "react";
import Player from "./components/player";

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
          {
            winner: players.filter((i) => i.winner)[0].name,
            bord: bord,
            show: false,
          },
        ]);
      }
    }
  }
  // players.filter((item) => item.winner && console.log(game));
  return (
    <div className="flex justify-center w-full">
      {/*X leyout*/}
      <Player player={"X"} game={game} />
      {/*X leyout*/}
      <div className="grid grid-cols-3 gap-1 min-w-[488px] relative">
        {(game.length === 0) & (players.length === 0) ? (
          ""
        ) : (
          <div className="col-span-3 bg bg-gradient-to-r from-blue-500 to-yellow-500 w-full h-40 flex justify-center items-center text-black text-[50px]">
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
            <div
              onClick={() => handleClick(index)}
              key={index}
              className={`w-40 h-40 text-black text-[40px] ${item.color} flex items-center justify-center`}
            >
              {item.name}
            </div>
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
      {/*O leyout*/}
      <Player player={"O"} game={game} />
      {/*O leyout*/}
    </div>
  );
};

export default Xo;
