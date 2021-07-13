interface IView{
    show(resource: IResource): string;
}

interface IResource {
    getTitle():string;
    getUrl():string;
    getList(): any[];
}

class LongView implements IView{
    show(resource: IResource): string {
        return `<div>${resource.getTitle()}</div><img src="${resource.getUrl()}" />`
    }

}

class ShortView implements IView{

    show(resource: IResource): string {
        return `<div>${resource.getTitle()}</div>`
    }

}

interface IAlbum {
    name: string;
    genre: string;
    year: number;
}

interface IArtist {
    firstName: string;
    lastName: string;
    albums: IAlbum[];
    image: string;
}

class Artist implements IArtist{
    albums: IAlbum[];
    firstName: string;
    lastName: string;
    image: string;
    constructor(firstName: string, lastName:string, image: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.image = image
        this.albums = []
    }

    addAlbum(album: IAlbum):void{
        this.albums.push(album)
    }

    getAlbums():IAlbum[]{
        return this.albums
    }

    getName(){
        return `${this.firstName} ${this.lastName}`
    }

    getImage(){
        return this.image
    }
}

class ArtistResource implements IResource{
    artist: Artist;

    constructor(artist: Artist) {
        this.artist = artist
    }

    getList(): any[] {
        return this.artist.getAlbums()
    }

    getTitle(): string {
        return this.artist.getName()
    }

    getUrl(): string {
        return this.artist.getImage()
    }

}

interface IBook {
    title: string;
    year: number;
    numberOfPages: number;
    phrases: string[];
}

class Book implements IBook{
    numberOfPages: number;
    title: string;
    year: number;
    phrases: string[];
    constructor(title:string,year:number, numberOfPages:number) {
        this.title = title
        this.year = year
        this.numberOfPages = numberOfPages
        this.phrases = []
    }

    addPhrase(phrase: string):void{
        this.phrases.push(phrase)
    }

    getPhrases():string[]{
        return this.phrases
    }

    getBookName():string{
        return this.title
    }
    getPublishYear():number{
        return this.year
    }
}

class BookResource implements IResource{
    book: Book;
    constructor(book:Book) {
        this.book = book
    }
    getList(): any[] {
        return this.book.getPhrases();
    }

    getTitle(): string {
        return this.book.getBookName()
    }

    getUrl(): string {
        return this.book.getPhrases()[0];
    }

}


const artist = new Artist('david', 'hanan', 'http://image.com')
const artistResource = new ArtistResource(artist)
const book = new Book('The Chaser', 1920, 230)
book.addPhrase('This is a Pitiful')
const bookResource = new BookResource(book)
const longView = new LongView()
const shortView = new ShortView()

console.log(longView.show(artistResource))
console.log(shortView.show(artistResource))

console.log(longView.show(bookResource))
console.log(shortView.show(bookResource))
