# Assignment4 Concentrator

## Project Description
<!-- you can include known bugs, design decisions, external references used... -->
In this assignment project I chose to use node.js+MongoDB Atlas+vue.js to accomplish
the tasks. There is no bug from my knowledge.
## Ethics Questions

### Question 1

> Give two possible chatroom moderation features and the reasons that you should implement each one

1. Don't allow empty message to be sent to the chatroom.
2. Set a max character limit on the message input.
Both features try to protect the environment of the chatroom. It prevents a user to
send nonsense or a huge amount of content to the chatroom. I have implemented these in
my code. There's another moderation feature I didn't implement but could be worthy to do: 
disable a user's send action for 2 second every time after he successfully sent a message.
It could prevent a user to send message too often to pollute the chatroom.
## Database Setup

<!-- required if you use custom MySQL setup instead of the MySQL database provided or if you use other databases like SQLite, PostgreSQL... -->