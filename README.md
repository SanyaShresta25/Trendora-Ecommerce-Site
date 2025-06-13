# 🛍️ Trendora – Async/Await + REST API

This project is a dynamic and responsive **product listing web app** built using modern JavaScript features like **`async/await`**, **`try...catch`**, and JSON manipulation. It integrates seamlessly with the [DummyJSON Products API](https://dummyjson.com/docs/products) to showcase real-time product data.

---

## 🔗 Live Preview

* 💻 **Solution URL**: [See the code](https://github.com/SanyaShresta25/Product-Pulse)
* 🌐 **Live Site URL**: [View it in action](https://product-pulse.vercel.app/)

---

## 📌 Project Objective

* Master **`async/await`** and `try...catch` for clean async code
* Work with **REST APIs** and parse JSON data
* Build a **searchable and filterable product listing** UI
* Emphasize modern, clean UI/UX principles

---

## 📘 Key Concepts

### 🔄 Why Async/Await?

* `async/await` syntax makes asynchronous JavaScript **more readable** and **easier to debug**
* Simplifies **error handling** using `try...catch`
* Avoids chaining `.then()` and `.catch()` like Promises

### ⚠️ Error Handling with Try...Catch

* Helps **gracefully handle network errors**
* Ensures UI feedback (like error messages or spinners) stays consistent even on failures

### 🧠 JSON in JavaScript

* `JSON.parse()` – Convert JSON string to JS object
* `JSON.stringify()` – Convert JS object to JSON string
* This project uses `response.json()` to parse API responses

---

## 🌐 APIs 101

> APIs connect frontend apps with real-world data. We used the **DummyJSON Products API** to get realistic product data for our app.

* API: [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)
* Endpoints used:

  * `https://dummyjson.com/products?limit=30` – fetch top 30 products
  * `https://dummyjson.com/products/categories` – fetch list of categories

---

## 🛠️ Built With

* ✅ HTML5 + CSS3 (Flexbox, Grid)
* ✨ JavaScript (ES6+, async/await)
* 🧠 DummyJSON API for real-time product data
* 🌈 Responsive, mobile-first UI

---

## ✨ Features

* View product cards with:

  * 🖼️ Thumbnail image with fallback
  * 🏷️ Category and Title
  * ⭐ Rating in star format
  * 💰 Price and discount
  * 🔘 "View Details" button
* 🔍 Filter by category (dropdown)
* ⏳ Loading and error states
* 📱 Fully responsive layout

---

## 🚀 How It Works

1. **Fetch products** using `async/await` and display them as cards
2. **Display loading spinner** while fetching
3. **Catch and log API errors** using `try...catch`
4. **Render product categories** in a dropdown filter
5. **Handle category selection** and filter product list dynamically
6. **Redirect to product details page** when clicking "View Details"

---

## 🧠 What I Learned

* Clean async logic using `async/await` with better **error handling**
* How to **parse and manipulate JSON** for UI rendering
* Dynamically **filter content based on API categories**
* Designing modular JavaScript classes like `ProductService` and `ProductRenderer`

---

## 👩‍💻 Author

* **Portfolio** – [Sanya Shresta Jathanna](https://sanyashresta.netlify.app/)
* **Frontend Mentor** – [@SanyaShresta25](https://www.frontendmentor.io/profile/SanyaShresta25)
* **GitHub** – [@SanyaShresta25](https://github.com/SanyaShresta25)

---

## 📚 Reference API

* [DummyJSON Products API](https://dummyjson.com/docs/products)

---

*Future updates will include search functionality, product pagination, skeleton loaders, and a separate details view! Stay tuned.*
