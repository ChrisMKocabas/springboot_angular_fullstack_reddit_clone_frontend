export class PostModel {
  id: number;
  postName: string;
  url: string;
  description: string;
  voteCount: number;
  userName: string;
  subredditName: string;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
  notificationStatus :boolean ;
  isExpanded: boolean;

  constructor() {
    this.id = 1;
    this.postName = '';
    this.url = '';
    this.description = '';
    this.voteCount = 0;
    this.userName = '';
    this.subredditName = '';
    this.commentCount = 0;
    this.duration = '';
    this.upVote = false;
    this.downVote = false;
    this.notificationStatus = true;
    this.isExpanded = false;
  }
}
