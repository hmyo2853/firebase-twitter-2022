import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      // data를 하나씩 펼쳐진 prev []에 넣는다.
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

  const onInputChange = (e) => {
    const {
      target: { value },
    } = e;
    setInputText(value);
  };
  const onInputSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("tweets").add({
      tweet: inputText,
      createAt: Date.now(),
    });
    setInputText("");
  };

  console.log(tweets);
  return (
    <>
      <form onSubmit={onInputSubmit}>
        <input
          type="text"
          value={inputText}
          maxLength={120}
          placeholder="How are you today?"
          onChange={onInputChange}
          required
        />
        <input type="submit" value="submit" />
      </form>
      <div>
        {tweets.map((message) => (
          <div key={message.id}>
            <h4>{message.tweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
