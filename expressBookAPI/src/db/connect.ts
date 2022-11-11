import { MongoClient, Collection, ObjectId } from "mongodb";

type Counter = {
  bookID: number;
  genreID: number;
};

export default class BookDatabase {
  uri: string;
  client: MongoClient;
  dbName: string;

  constructor(dbName: string, uri: string) {
    this.uri = uri;
    this.client = new MongoClient(this.uri);
    this.dbName = dbName;
  }

  async getNextBookID() {
    let id = 0;
    try {
      const db = await this.getDB();
      const col = db.collection<Counter>("Counter");
      const counter = await col.findOne();
      if (counter) {
        id = counter.bookID;
        counter.bookID++;
        await col.findOneAndReplace({}, counter);
      }
    } catch (error) {
      if (error instanceof Error) throw error;
    } finally {
      await this.closeClient();
    }
    return id;
  }

  async addBook(book: Book) {
    book.id = await this.getNextBookID();
    await this.performBookAction(async (col) => {
      await col.insertOne(book);
    });
  }

  async getBooks() {
    let books: Book[] = [];
    await this.performBookAction(async (col) => {
      books = (await col.find({}).toArray()) as Book[];
    });
    return books;
  }

  async getBook(id: number) {
    let book: Book | undefined;
    await this.performBookAction(async (col) => {
      book = (await col.findOne({ id: id })) as Book;
    });
    return book;
  }

  async updateBook(book: Book) {
    await this.performBookAction(async (col) => {
      await col.findOneAndReplace({ id: book.id }, book);
    });
  }

  async deleteBook(id: number) {
    await this.performBookAction(async (col) => {
      await col.findOneAndDelete({ id: id });
    });
  }

  async performBookAction(action: (col: Collection<Book>) => Promise<void>) {
    try {
      const db = await this.getDB();
      const col = db.collection<Book>("books");
      await action(col);
    } catch (error) {
      if (error instanceof Error) throw error;
    } finally {
      await this.closeClient();
    }
  }

  async getDB() {
    await this.client.connect();
    return this.client.db(this.dbName);
  }

  async closeClient() {
    this.client.close();
  }
}

// Replace the following with your Atlas connection string
// const url =
//   "mongodb+srv://katro:MongoTests@cluster0.b3np6jb.mongodb.net/?retryWrites=true&w=majority";
// const dbName = "books";

// const bookDB = new BookDatabase(dbName, url);
// const book: Book = {
//   id: 1,
//   title: "Test Title",
//   author: "Test Author",
//   genreID: 1,
// };

// async function run() {
//   // await bookDB.addBook(book);
//   // await bookDB.addBook(book);
//   // await bookDB.getBooks().then((books) => console.log(books));
//   // await bookDB.getBook(1).then((book) => console.log(book));
//   await bookDB.getNextBookID();
// }

// run();
// const client = new MongoClient(url);

// async function run() {
//   try {
//     await client.connect();
//     console.log("connected correctly to the server");
//     const db = client.db(dbName);
//     const col = db.collection("books");
//     const book: Book = {
//       id: 1,
//       title: "Test Title",
//       author: "Test Author",
//       genreID: 1,
//     };
//     const p = await col.insertOne(book);
//     console.log(p);
//   } finally {
//     await client.close();
//   }
// }

// run();
