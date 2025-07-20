# Trust Anchor: A Cryptographic Trust Layer for the Age of AI

**Submission for [Name of Hackathon]**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Trust Anchor is a complete cryptographic content verification system that gives AI a way to verify its sources, combating hallucination and misinformation at its core.

---

## 🚀 Live Demo Video (2 Mins)

**[PASTE YOUR 2-MINUTE LOOM/YOUTUBE VIDEO LINK HERE]**

## 🧠 The Problem

Modern AI is incredibly powerful, but its greatest weakness is "hallucination"—it confidently fabricates information. When an AI misrepresents a brand's products, services, or official statements, it erodes customer trust and can cause significant brand damage. In a world of synthetic media, how can we know what's real?

## ✅ Our Solution

Trust Anchor solves this by creating a **foundational trust layer** for web content. It's a "digital notary" system that allows brand owners and content creators to cryptographically sign their official content, creating a verifiable source of truth that both humans and AI can rely on.

### Key Features Demonstrated
* **Publisher Dashboard:** A simple web UI for generating keys and signing official content using the in-browser Web Crypto API.
* **Verifiable Meta Tag:** A single, portable `<meta>` tag that embeds the cryptographic proof of authenticity directly into any HTML page.
* **Custom GPT Action:** A fully integrated action for ChatGPT that allows anyone to ask the AI to verify a URL's content in real-time.
* **Secure Verification API:** A robust backend API that performs the cryptographic validation, built with Node.js and deployed on Vercel.

## 🏗️ Technical Architecture

Our system is designed for security and scalability, based on a three-part architecture:

1.  **Client-Side Signing:** The content owner uses our static web dashboard to generate a key pair and sign their content. The private key **never** leaves their browser, ensuring maximum security.
2.  **API-Based Verification:** Our Node.js backend, deployed on Vercel, exposes a single, secure API endpoint. This API receives a URL, independently fetches the content, and performs the cryptographic verification against the public key.
3.  **AI Integration:** A Custom GPT Action, defined by our `openapi.yaml` spec, allows ChatGPT to call our verification API, making the entire system accessible through natural language.

## 🛠️ Tech Stack & Tools

-   **Backend:** Node.js, Express.js
-   **Frontend:** HTML5, CSS, Vanilla JavaScript (Web Crypto API)
-   **Deployment:** Vercel
-   **AI Integration:** Custom GPT Action with an OpenAPI 3.0 specification
-   **Tunneling (for Demo):** ngrok

### API Documentation

Our API is formally documented using the OpenAPI standard. The complete contract, including schemas and examples, is available in this repository:

[**`openapi.yaml`**](./openapi.yaml)

## ⚙️ Setup and Installation

To run this project locally for evaluation:

1.  **Clone the Repository**
    ```bash
    git clone [PASTE YOUR GITHUB REPO URL HERE]
    cd [your-repo-name]
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    The project runs on port 3000 by default. No `.env` file is required for local execution.

4.  **Run the Backend Server**
    ```bash
    npm start
    ```
    The API will be live at `http://localhost:3000`.

5.  **Use the Application**
    -   Open `frontend/index.html` in your browser to access the Publisher Dashboard.
    -   Run the automated demo setup script: `node tests/demo-test.js` to prepare the verifiable demo page.
    -   Load the `/extension` directory as an unpacked extension in Chrome/Brave to test the browser integration.

## 🎬 Demo Scenarios

### Scene 1: The Problem
Demonstrates how AI can hallucinate about product specifications, showing the real-world impact of misinformation.

### Scene 2: Publisher Workflow
Shows how easy it is for content creators to add Trust Anchor verification to their pages using our dashboard.

### Scene 3: AI Verification
Demonstrates how ChatGPT can now verify content authenticity in real-time using our Custom GPT Action.

## 🔐 Security Features

- **Zero-Knowledge Design:** Private keys never leave the user's browser
- **Cryptographic Signatures:** Uses RSA-PSS for robust digital signatures
- **Content Integrity:** SHA-256 hashing ensures content hasn't been modified
- **Public Key Infrastructure:** Verifiable key management system

## 📊 Performance & Scalability

- **Lightweight:** Single meta tag integration
- **Fast:** Sub-second verification times
- **Scalable:** Stateless API design
- **Compatible:** Works with any web framework

## 🤝 Contributing

This is a hackathon submission. For questions or feedback, please open an issue in this repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 The Team: TrustAnchor

- **Nawaf Altalai**

---

**Built with ❤️ for a more trustworthy web**