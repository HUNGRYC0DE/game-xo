"use client";
import React, { useState } from "react";

const Xo = () => {
  const [round, setRound] = useState(0);

  const [players, setPlayers] = useState([
    { block: 0, blockNum: [], name: "X", winner: false, winBlocks: [] },
    { block: 0, blockNum: [], name: "O", winner: false, winBlocks: [] },
  ]);

  const [bord, setBord] = useState([
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
    { activ: false, name: null },
  ]);

  const handleResetBoard = () => {
    setBord([
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
      { activ: false, name: null },
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
        players.map((item) => {
          item.name === bord[a].name &&
            (item.winBlocks.push(lines[i]), (item.winner = true));
        });
      }
    }
  }
  players.filter(
    (item) =>
      item.winner &&
      console.log({
        player: item.name,
        winblock: [...new Set(item.winBlocks.flat())].sort(),
      })
  );
  return (
    <div className="grid grid-cols-3 gap-1 mt-20">
      <div className="col-span-3 bg bg-yellow-200 w-full h-40 flex justify-center items-center text-black text-[50px]">
        {players.filter((item) => item.winner)[0]?.winner
          ? `Winner ${players.filter((item) => item.winner)[0].name}`
          : round == 9
          ? "draw"
          : round % 2 == 0
          ? "X"
          : "O"}
      </div>
      {bord.map((item, index) => {
        return (
          <button
            onClick={() => handleClick(index)}
            key={index}
            className={`w-40 h-40 text-black text-[40px] ${
              players
                .filter((item) => item.winner)[0]
                ?.winBlocks.flat()
                .sort()
                .filter((item) => index === item)[0] === index
                ? "bg-green-600"
                : "bg-white"
            }`}
          >
            {item.name}
          </button>
        );
      })}
      <div className="col-span-3 flex items-center justify-center h-40">
        <button
          type="button"
          className="w-40 h-20 bg-slate-800 rounded-md text-lg font-bold"
          onClick={handleResetBoard}
        >
          reset board
        </button>
      </div>
    </div>
  );
};

export default Xo;
