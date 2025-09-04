# Real-Time Collaborative Whiteboard with AI Summarization

This project provides a full-stack, real-time collaborative whiteboard that enables multiple users to draw sketches, drop sticky notes, and then generate concise summaries of the board’s content using an AI summarization microservice. The system uses WebSockets for low-latency synchronization, a CRDT to merge concurrent edits, and a dedicated Python service to perform summarization.

## Features

* **Real-Time Collaboration:** Built on top of Socket.io and a CRDT (Yjs) to synchronize drawings and notes across all connected clients.
* **Sticky Notes and Drawing Tools:** Users can draw free-form lines and add textual sticky notes anywhere on the board.
* **AI Summarization:** A Python microservice exposes an HTTP endpoint that summarizes the text of all sticky notes on the board.
* **Modular Architecture:** Node.js powers the main application server, while a separate Python process encapsulates the AI service. The front-end is delivered as a single-page app served from the Node.js server.

## Tech Stack

| Layer            | Technology                                                |
|------------------|-----------------------------------------------------------|
| Backend Server   | Node.js, Express, Socket.io                              |
| CRDT             | Yjs (web-based CRDT)                                     |
| Front-End        | HTML5 Canvas, Vanilla JavaScript, Yjs WebSocket Provider |
| AI Service       | Python, Flask                                            |

## Running the Project

1. **Install dependencies for the Node.js server:**
   ```sh
   cd realtime-whiteboard-ai
   npm install
   ```
2. **Install dependencies for the Python summarizer:**
   ```sh
   cd summarizer
   pip install -r requirements.txt
   ```
3. **Run the summarization service:**
   ```sh
   cd summarizer
   python app.py
   ```
4. **Run the Node.js server:**
   ```sh
   cd ..
   node server.js
   ```
5. **Open the application** in your browser at `http://localhost:3000`. Share the link with collaborators to draw together.

## Usage

* Use your mouse to draw freely on the canvas.
* Click “Add Sticky Note” to place a text note on the board.
* When ready, click “Summarize Notes.” The board collects all note content and sends it to the Python summarizer. The response is displayed in the summary area.

## License

This project is released under the MIT License.
