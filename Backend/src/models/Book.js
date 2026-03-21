const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: "anonymous"
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: [
            "Fiction",
            "Non-Fiction",
            "Fantasy",
            "Science Fiction",
            "Mystery",
            "Thriller",
            "Horror",
            "Romance",
            "Historical Fiction",
            "Adventure",
            "Young Adult (YA)",
            "Children's",
            "Dystopian",
            "Magical Realism",
            "Paranormal",
            "Crime",
            "Suspense",
            "Drama",
            "Action",
            "Satire",
            "Humor",
            "Poetry",
            "Graphic Novel",
            "Short Story",
            "Biography",
            "Autobiography",
            "Memoir",
            "Self-Help",
            "Health & Wellness",
            "Travel",
            "Guide / How-To",
            "Science",
            "Philosophy",
            "Religion & Spirituality",
            "Psychology",
            "Business & Economics",
            "True Crime",
            "Essays",
            "Cookbook",
            "Art & Photography",
            "Education",
            "Politics",
            "Sports",
            "Technology",
            "Classics",
            "Mythology",
            "Western",
            "War",
            "LGBTQ+",
            "Chick Lit",
            "Urban Fiction",
            "Gothic",
            "Cyberpunk",
            "Steampunk",
            "Space Opera",
            "Alternate History",
            "Fairy Tale",
            "Folklore",
            "Epic Fantasy",
            "Dark Fantasy"
        ],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publishedBy: {
        type: String,
        required: false,
        default: "anonymous"
    },
    quantity: {
        type: Number,
        required: true
    },
    bookPhoto: {
        type: Buffer,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Book", bookSchema);