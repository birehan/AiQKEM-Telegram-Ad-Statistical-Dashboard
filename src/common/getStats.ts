import Post from "../types/posts";

export const getAllCreativeViewStat = (filteredData: Post[]) => {
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

  const sortedCreativeViews = Array.from(creativeViewsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const sortedCreativeNames = sortedCreativeViews.map(
    ([creativeName]) => creativeName
  );
  const sortedTotalViews = sortedCreativeViews.map(([, views]) => views);

  return { creativeNames: sortedCreativeNames, totalViews: sortedTotalViews };
};

export const getAllChannelViewStat = (filteredData: Post[]) => {
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

  const sortedChannelViews = Array.from(channelViewsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const sortedChannelTitles = sortedChannelViews.map(
    ([channelTitle]) => channelTitle
  );
  const sortedTotalViews = sortedChannelViews.map(([, views]) => views);

  return { channelTitles: sortedChannelTitles, totalViews: sortedTotalViews };
};

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

  const sortedCreativeViews = Array.from(creativeViewsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const top5CreativeViews = sortedCreativeViews.slice(0, 5);

  const otherCreativeViews = sortedCreativeViews
    .slice(5)
    .reduce((sum, [, views]) => sum + views, 0);

  const creativeNames = top5CreativeViews.map(([creativeName]) => creativeName);
  const totalViews = top5CreativeViews.map(([, views]) => views);

  if (otherCreativeViews > 0) {
    creativeNames.push(`Others (${sortedCreativeViews.length - 5})`);
    totalViews.push(otherCreativeViews);
  }

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

  const sortedChannelViews = Array.from(channelViewsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const top5ChannelViews = sortedChannelViews.slice(0, 5);

  const otherChannelViews = sortedChannelViews
    .slice(5)
    .reduce((sum, [, views]) => sum + views, 0);

  const channelTitles = top5ChannelViews.map(([channelTitle]) => channelTitle);
  const totalViews = top5ChannelViews.map(([, views]) => views);

  if (otherChannelViews > 0) {
    channelTitles.push(`Others (${sortedChannelViews.length - 5})`);
    totalViews.push(otherChannelViews);
  }

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
