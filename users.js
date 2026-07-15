// users.js

export const users = [
    {
        id: 1,
        username: "user_aaron",
        email: "aaron@example.com",
        password: "securePassword123",
        loanedBookIds: []
    },
    {
        id: 2,
        username: "user_moshe",
        email: "moshe@example.com",
        password: "mySafePassword456",
        loanedBookIds: [1]
    },
    {
        id: 3,
        username: "user_david",
        email: "david@example.com",
        password: "davidPass789",
        loanedBookIds: []
    }
];