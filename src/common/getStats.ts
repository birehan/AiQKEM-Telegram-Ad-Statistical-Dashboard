import Post from "../types/posts";

export const getCreativeViewStateTable = (filteredData: Post[]) => {
  const creativeDataMap = new Map<
    string,
    { totalViews: number; totalPosts: number; postsDetails: any[] }
  >();

  filteredData.forEach((post) => {
    const creativeName = post.posted_ad_id.post_creative_id.name;
    const views = post.views;

    if (creativeDataMap.has(creativeName)) {
      const existingData = creativeDataMap.get(creativeName)!;
      existingData.totalViews += views;
      existingData.totalPosts += 1;
      const curPost = {
        title: post.posted_ad_id.channel_id.title,
        views: post.views,
        createdAt: post.createdAt,
      };
      existingData.postsDetails.push(curPost);
    } else {
      creativeDataMap.set(creativeName, {
        totalViews: views,
        totalPosts: 1,
        postsDetails: [
          {
            title: post.posted_ad_id.channel_id.title,
            views: post.views,
            createdAt: post.createdAt,
          },
        ],
      });
    }
  });

  const sortedCreativeData = Array.from(creativeDataMap.entries()).sort(
    (a, b) => b[1].totalViews - a[1].totalViews
  );

  const result = sortedCreativeData.map(([creativeName, data]) => [
    creativeName,
    data.totalViews,
    data.totalPosts,
  ]);

  const postsDetails = sortedCreativeData.map(([, data]) => data.postsDetails);

  return { result, postsDetails };
};

export const getChannelViewStatTable = (filteredData: Post[]) => {
  const channelDataMap = new Map<
    string,
    { totalViews: number; totalPosts: number; postsDetails: any[] }
  >();

  filteredData.forEach((post) => {
    const channelTitle = post.posted_ad_id.channel_id.title;
    const views = post.views;

    if (channelDataMap.has(channelTitle)) {
      const existingData = channelDataMap.get(channelTitle)!;
      existingData.totalViews += views;
      existingData.totalPosts += 1;
      const curPost = {
        title: post.posted_ad_id.post_creative_id.name,
        views: post.views,
        createdAt: post.createdAt,
      };
      existingData.postsDetails.push(curPost);
    } else {
      channelDataMap.set(channelTitle, {
        totalViews: views,
        totalPosts: 1,
        postsDetails: [
          {
            title: post.posted_ad_id.post_creative_id.name,
            views: post.views,
            createdAt: post.createdAt,
          },
        ],
      });
    }
  });

  const sortedChannelData = Array.from(channelDataMap.entries()).sort(
    (a, b) => b[1].totalViews - a[1].totalViews
  );

  const result = sortedChannelData.map(([channelTitle, data]) => [
    channelTitle,
    data.totalViews,
    data.totalPosts,
  ]);

  const postsDetails = sortedChannelData.map(([, data]) => data.postsDetails);

  return { result, postsDetails };
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
