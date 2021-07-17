const Book = require("./models/Book");

const books = [
  {
    title: "Six of Crows : Book 1",
    author: "Leigh Bardugo",
    publisher: "Hachette Children's Group",
    category: "Romance",
    cover:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7806/9781780622286.jpg",
    rating: 4.46,
    price: 15.24,
    description:
      "Nominated for the CILIP Carnegie Medal 2017, this fantasy epic from the No. 1 NEW YORK TIMES bestselling author of the Grisha trilogy is gripping, sweeping and memorable - perfect for fans of George R. R. Martin, Laini Taylor and Kristin Cashore. Criminal prodigy Kaz Brekker is offered a chance at a deadly heist that could make him rich beyond his wildest dreams - but he can't pull it off alone. A convict with a thirst for revenge. A sharpshooter who can't walk away from a wager. A runaway with a privileged past. A spy known as the Wraith. A Heartrender using her magic to survive the slums. A thief with a gift for unlikely escapes. Six dangerous outcasts. One impossible heist. Kaz's crew is the only thing that might stand between the world and destruction - if they don't kill each other first.",
  },
  {
    title: "Malibu Rising",
    author: "Taylor Jenkins Reid",
    publisher: "Cornerstone",
    category: "Romance",
    cover:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7863/9781786331533.jpg",
    rating: 4.22,
    price: 19.39,
    description:
      "Malibu: August, 1983. It's the day of Nina Riva's annual end-of-summer party, and anticipation is at a fever pitch. Everyone wants to be around the famous Rivas: Nina, the talented surfer and supermodel; brothers Jay and Hud, one a championship surfer, the other a renowned photographer; and their adored baby sister, Kit. Together, the siblings are a source of fascination in Malibu and the world over-especially as the offspring of the legendary singer, Mick Riva. By midnight the party will be completely out of control. By morning, the Riva mansion will have gone up in flames. But before that first spark in the early hours before dawn, the alcohol will flow, the music will play, and the loves and secrets that shaped this family's generations will all come bubbling to the surface.",
  },
  {
    title: "The Great Alone",
    author: "Kristin Hannah",
    publisher: "Pan MacMillan",
    category: "Romance",
    cover:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4472/9781447286035.jpg",
    rating: 4.35,
    price: 9.1,
    description:
      "From the worldwide number one bestselling author of The Nightingale comes Kristin Hannah's The Great Alone, a daring, beautiful, stay-up-all-night story about love and loss. The New York Times number one bestseller. A woman has to be tough as steel up here. You can't count on anyone to save you and your children. You have to be willing to save yourselves. Thirteen-year-old Leni is coming of age in a tumultuous time. Caught in the riptide of her parents' passionate, stormy relationship, she dares to hope that Alaska will lead to a better future for her family, and a place to belong. Her mother, Cora, will do anything and go anywhere for the man she loves, even if it means following him into the unknown.",
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    publisher: "Wordsworth Editions Ltd",
    category: "Romance",
    cover:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8532/9781853262715.jpg",
    rating: 4.06,
    price: 12.4,
    description:
      "Anna Karenina is one of the most loved and memorable heroines of literature. Her overwhelming charm dominates a novel of unparalleled richness and density. Tolstoy considered this book to be his first real attempt at a novel form, and it addresses the very nature of society at all levels,- of destiny, death, human relationships and the irreconcilable contradictions of existence. It ends tragically, and there is much that evokes despair, yet set beside this is an abounding joy in life's many ephemeral pleasures, and a profusion of comic relief.",
  },
  {
    title: "Call Me By Your Name",
    author: "Andre Aciman",
    publisher: "Atlantic Books",
    category: "Romance",
    cover:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7864/9781786495259.jpg",
    rating: 4.19,
    price: 9.63,
    description:
      "An Instant Classic and One of the Great Love Stories of Our Time Andre Aciman's Call Me by Your Name is the story of a sudden and powerful romance that blossoms between an adolescent boy and a summer guest at his parents' cliffside mansion on the Italian Riviera. Each is unprepared for the consequences of their attraction, when, during the restless summer weeks, unrelenting currents of obsession, fascination, and desire intensify their passion and test the charged ground between them. Recklessly, the two verge toward the one thing both fear they may never truly find again: total intimacy. It is an instant classic and one of the great love stories of our time.",
  },
];

const seedBooks = async () => {
  // populate db
  books.map(async (book, index) => {
    let b = new Book(book);
    await b.save();
    if (index === books.length - 1) {
      console.log("DONE!");
    }
  });
};

module.exports = seedBooks;
