import { MessageArray } from "./socket";

export const useFormattedTime = (time: Date) => (
  <div className="datetime">
    <span style={{ color: "var(--prime)", paddingRight: ".33rem" }}>{"<"}</span>
    {/* <span>{time.toLocaleDateString()}</span>
      <span className="time-at">{"@"}</span> */}
    <span>
      {time.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
    <span style={{ color: "var(--prime)", paddingLeft: ".33rem" }}>{">"}</span>
  </div>
);

export const useFormattedMessages = (
  messageData: MessageArray
): MessageArray => {
  const dataCopy = messageData.slice();
  let previous: string | null = "";

  for (let i = 0; i < dataCopy.length; i++) {
    if (
      previous &&
      (previous === dataCopy[i].author.username || previous === null)
    ) {
      dataCopy[i].author.username = null;
      continue;
    }
    previous = dataCopy[i].author.username;
  }

  return dataCopy;
};
