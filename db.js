// db.js

const books = [
    {
        id: 1,
        name: "Duties of the Heart",
        category: "Ethics",
        price: 75,
        isLoaned: true,
        loans: [
            {
                loanDate: new Date("2026-05-10"),
                clientId: "C-201"
            },
            {
                loanDate: new Date("2026-07-01"),
                clientId: "C-205"
            }
        ]
    },
    {
        id: 2,
        name: "The Path of the Just",
        category: "Ethics",
        price: 80,
        isLoaned: false,
        loans: [
            {
                loanDate: new Date("2026-04-15"),
                clientId: "C-202"
            }
        ]
    },
    {
        id: 3,
        name: "Ethics of the Fathers", 
        category: "Philosophy",
        price: 60,
        isLoaned: false,
        loans: [] 
    },
    {
        id: 4,
        name: "The Book of Knowledge",
        category: "Philosophy",
        price: 95,
        isLoaned: true,
        loans: [
            {
                loanDate: new Date("2026-06-20"),
                clientId: "C-209"
            }
        ]
    },
    {
        id: 5,
        name: "Stories of Great Tzaddikim",
        category: "History",
        price: 55,
        isLoaned: false,
        loans: [
            {
                loanDate: new Date("2026-03-12"),
                clientId: "C-211"
            }
        ]
    },
    {
        id: 6,
        name: "The Kuzari",
        category: "Philosophy",
        price: 85,
        isLoaned: false,
        loans: []
    }
];

module.exports = { books };