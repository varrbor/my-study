class AutoNews {
  constructor() {
    this.news = "";
    this.subscribers = [];
  }

  setNews(text) {
    this.news = text;
    this.notifyAll();
  }

  notifyAll() {
    this.subscribers.forEach(sub => sub.inform(this.news));
  }

  register(observer) {
    this.subscribers.push(observer);
  }

  unregister(observer) {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }
}
class Jack {
    inform(message) {
        console.log(`Jack has been informed about: ${message.news}`);
    }
}
class Max {
    inform(message) {
        console.log(`Max has been informed about: ${message.news}`);
    }
}
const autoNews = new AutoNews();
autoNews.register(new Jack());
autoNews.register(new Max());

console.log(autoNews.setNews("New tesla price is 40000"));
