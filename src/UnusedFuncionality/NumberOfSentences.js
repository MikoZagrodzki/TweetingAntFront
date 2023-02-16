import { useState } from "react";

function NumberOfSentences() {
    const [numberSentences, setNumberSentences] = useState(1);

    // if (
    //   gptPromptAndCompletions?.length - 1 === numberSentences ||
    //   gptPromptAndCompletions?.length > numberSentences
    // ) {
    //   // let lastElem = gptPromptAndCompletions[gptPromptAndCompletions.length - 1];
    //   // let cutIndex = lastElem.search(/[.!?]/);

    //   // if (cutIndex !== -1) {
    //   //   lastElem = lastElem.slice(0, cutIndex + 1);
    //   // } else {
    //   //   getApiGpt();
    //   // }
    //   // gptPromptAndCompletions[gptPromptAndCompletions.length - 1] = lastElem;
    //   setGptPromptAndCompletions(gptPromptAndCompletions);
    //   setInputChatGpt("");
    //   setNumberSentences(1);
    //   return;
    // }

  return (
    <select
    value={numberSentences}
    onChange={(e) => {
      setNumberSentences(e.target.value);
    }}
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
  )
}

export default NumberOfSentences