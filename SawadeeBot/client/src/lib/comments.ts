export class RedditComment {
  author: string;
  text: string;

  constructor(author: string, text: string) {
    this.author = author;
    this.text = text;
  }
}

export class FancyComment extends RedditComment {
  italics = false;
  bold = false;

  constructor(author: string, text: string) {
    super(author, text);
  }
}
