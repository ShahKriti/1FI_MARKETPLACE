# 1Fi Marketplace

A React Native (Expo) + TypeScript implementation of the **1Fi Marketplace** feature, built as part of an SDE Intern assignment.

The project recreates the Shop experience and adds a fully functional **1Fi Marketplace** section with product browsing, product details, variant selection, EMI calculation, and order confirmation.

## 📱 Features

### Shop Screen

* Purple gradient hero banner
* Top Brands / Nearby Stores / 1Fi Marketplace segmented tabs
* Product search
* 1Fi Marketplace product grid
* Floating bottom navigation

### Marketplace

* Product cards with:

  * Product image
  * Brand and product name
  * Starting price
  * No Cost EMI badge
* Product detail screen
* Product image gallery
* Product variants
* Product highlights and description
* Ratings and pricing information

### EMI Flow

* EMI plans based on the selected product variant
* Dynamic EMI calculation
* No Cost EMI support
* EMI tenure and interest rate
* Total payable amount
* EMI plan selection
* Review & confirmation screen

### UI & States

* Loading states
* Error states with retry
* Empty states
* Reusable components
* Responsive scrolling using `FlatList`
* Consistent theme, spacing, and typography

## 🛠️ Tech Stack

* **React Native**
* **Expo**
* **TypeScript**
* **React Navigation**
* **JavaScript**
* **FlatList**
* **Git & GitHub**

## 📂 Project Structure

```text
1fi-marketplace/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
│
└── src/
    ├── components/
    │   ├── common/
    │   ├── marketplace/
    │   └── shop/
    │
    ├── data/
    │   ├── mockApi.ts
    │   ├── mockProducts.ts
    │   └── types.ts
    │
    ├── hooks/
    │   ├── useAsync.ts
    │   ├── useEmiPlans.ts
    │   ├── useProductDetail.ts
    │   └── useProducts.ts
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    │
    ├── screens/
    │   ├── marketplace/
    │   └── shop/
    │
    ├── theme/
    │   ├── colors.ts
    │   ├── index.ts
    │   ├── spacing.ts
    │   └── typography.ts
    │
    └── utils/
        ├── currency.ts
        └── emiCalculator.ts
```

## 💳 EMI Calculation

EMI values are **not hardcoded**.

The application calculates the EMI dynamically based on the selected product variant and EMI plan.

The calculation logic is separated into:

```text
src/utils/emiCalculator.ts
```

This makes the EMI calculation reusable and easy to test.

## 🔌 Data Layer

The project currently uses mock API functions to simulate backend requests.

```text
src/data/mockApi.ts
```

Screens access data through custom hooks instead of directly accessing mock data.

For example:

```text
useProducts()
useProductDetail()
useEmiPlans()
```

This structure makes it easier to replace the mock API with real backend APIs later.

## 🎨 Design Approach

The UI was designed to closely follow the provided 1Fi application screenshots.

Key design elements include:

* Deep violet primary color
* Lavender UI elements
* Rounded cards
* Soft shadows
* Purple gradient hero section
* Pill-shaped segmented navigation
* Floating bottom navigation
* Minimal product detail headers

Some original app assets were unavailable, so emoji/Unicode icons and placeholder artwork are used in a few areas.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShahKriti/1FI_MARKETPLACE.git
```

### 2. Open the project

```bash
cd 1FI_MARKETPLACE/1fi-marketplace
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Expo development server

```bash
npm start
```

You can then run the application using:

* Android emulator
* iOS simulator
* Expo Go
* Web browser

## 🧪 Testing the Error State

The mock API includes a configurable failure rate that can be used to test loading, error, and retry states.

Check:

```text
src/data/mockApi.ts
```

and adjust the simulated failure rate when required.

## 🔮 Future Improvements

If this project were connected to a production backend, I would:

* Replace the mock API with real API endpoints
* Add authentication
* Add real product images and application assets
* Add pagination for large product catalogs
* Add search debouncing
* Add unit tests for EMI calculations
* Add component tests for the EMI selection flow
* Use React Navigation's Bottom Tab Navigator
* Add real checkout/payment integration

## 👩‍💻 Author

**Kritika Shah**

B.Tech Information Technology — 2026

GitHub: [ShahKriti](https://github.com/ShahKriti)

---

⭐ If you find this project useful, feel free to explore the repository.

