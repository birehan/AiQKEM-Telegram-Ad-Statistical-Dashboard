import Post from "../types/posts";

export const getCreativeViewStat = (filteredData: Post[]) => {
  const creativeViewsMap = new Map<string, number>();

  filteredData.forEach((post) => {
    const creativeName = post.posted_ad_id.post_creative_id.name;
    const views = post.views;

    if (creativeViewsMap.has(creativeName)) {
      creativeViewsMap.set(
        creativeName,
        creativeViewsMap.get(creativeName)! + views
      );
    } else {
      creativeViewsMap.set(creativeName, views);
    }
  });

  const creativeNames = Array.from(creativeViewsMap.keys());
  const totalViews = Array.from(creativeViewsMap.values());

  return { creativeNames, totalViews };
};

export const getChannelViewStat = (filteredData: Post[]) => {
  const channelViewsMap = new Map<string, number>();

  filteredData.forEach((post) => {
    const channelTitle = post.posted_ad_id.channel_id.title;
    const views = post.views;

    if (channelViewsMap.has(channelTitle)) {
      channelViewsMap.set(
        channelTitle,
        channelViewsMap.get(channelTitle)! + views
      );
    } else {
      channelViewsMap.set(channelTitle, views);
    }
  });

  const channelTitles = Array.from(channelViewsMap.keys());
  const totalViews = Array.from(channelViewsMap.values());
  return { channelTitles, totalViews };
};

export const getViewsOverTime = (filteredData: Post[]) => {
  const timestampLastViewMap = new Map<number, number>();
  const firstTimestamp = Math.min(
    ...filteredData.flatMap((post) => post.recorded_at_timestamps)
  );
  const lastTimestamp = Math.max(
    ...filteredData.flatMap((post) => post.recorded_at_timestamps)
  );
  const timeStep = (lastTimestamp - firstTimestamp) / 4;

  for (let i = 0; i < 5; i++) {
    const startTime = firstTimestamp + i * timeStep;
    const endTime = startTime + timeStep;
    let sumViews = 0;

    filteredData.forEach((post) => {
      let lastViewInTimeRange = 0;
      post.recorded_at_timestamps.forEach((timestamp, index) => {
        const views = parseInt(post.views_list[index], 0);
        if (timestamp < endTime) {
          lastViewInTimeRange = views; // Update the last view within the time range
        }
      });

      sumViews += lastViewInTimeRange;
    });

    timestampLastViewMap.set(startTime, sumViews);
  }

  const timestamps = Array.from(timestampLastViewMap.keys());
  const cumulativeViews = Array.from(timestampLastViewMap.values());

  const formattedTimestamps = timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // You can format the timestamp as you prefer
  });

  return { formattedTimestamps, cumulativeViews };
};
