export default interface Post {
  _id: string;
  views: number;
  forwards: number;
  posted_ad_id: {
    _id: string;
    post_creative_id: {
      _id: string;
      name: string;
    };
    message_id: number;
    channel_id: {
      _id: string;
      title: string;
    };
    is_pinned: boolean;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  views_list: string[];
  forwards_list: number[];
  recorded_at_timestamps: number[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}


// createdAt


// total posts
  // createdAt and latest view