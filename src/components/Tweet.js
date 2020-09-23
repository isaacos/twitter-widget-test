import React, { useState,useEffect } from 'react';
//react-widgets package needs to be imported
function Tweet(props){

  const [twitter, setTwitter] = useState(false);

  useEffect(() => {
    //adds twitter/widget scripts
      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
    return t;
      }(document, "script", "twitter-wjs"));
      setTwitter(window.twttr)
      console.log(document.getElementById('twitter-wjs'))
      return () => {
        document.body.removeChild(document.getElementById('twitter-wjs'));
      }
  }, [props.tweetId])

  useEffect(() => {
      if(twitter){
        (async() => {
          console.log("waiting for variable");
          while(!twitter.widgets) // checks for twitterWidget
          await new Promise(resolve => setTimeout(resolve, 1000));
          handleTwitterWidgetsPromise(twitter.widgets, props.tweetId);
        })();
      }
  }, [twitter, props.tweetId])

  function handleTwitterWidgetsPromise(twitterWidgets, tweetId){

    const tweetIdString = `${tweetId}`
    twitterWidgets.createTweet(
      tweetIdString,
      document.getElementById(tweetIdString),
      {
        theme: 'dark'
      }
    );
  }



  return (
    <div className="tweet-container" id={props.tweetId}>
    <h1>hi isaac</h1>
    </div>
  );
}

export default Tweet;
