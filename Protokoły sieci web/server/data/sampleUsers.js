const sampleUsers = [
  {
    username: "admin",
    password: "$2b$10$2qf4tbYL1tst1/mshP3NkedP0GwEbZNZLYQorXTE.GOxRBtAVQphy", // admin123
    roles: ["admin"]
  },
  {
    username: "user1",
    password: "$2b$10$6BQUvFaDiO8rPnb5WLjA2enO0569PzVkABB6T1PF2ibHRMtZYbr4a", // abc
    roles: ["user"]
  },
  {
    username: "user2",
    password: "$2b$10$M8FcI8y52CDVf37WseyHD.XtFk3MRQeO59k4GsH/ykN0FaHjxk1RC", // abc123
    roles: ["user"]
  }
]

module.exports = sampleUsers;