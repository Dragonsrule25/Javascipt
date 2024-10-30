function quietTimes(events, activity) {
    let totalTime = 0;
    let lastTime = 0;
    const filteredEvents = events
      .filter(event => event.activity === activity)
      .map(event => event.time)
      .sort((a, b) => a - b);
    for (let time of filteredEvents) {
      if (time > lastTime) {
        totalTime += time - lastTime;
        lastTime = time + 1;
      }
    }
    return totalTime;
  }
  const events = [
    { time: 1, activity: "reading" },
    { time: 2, activity: "reading" },
    { time: 3, activity: "working" },
    { time: 5, activity: "reading" },
    { time: 6, activity: "reading" }
  ];
  console.log(quietTimes(events, "reading"));  