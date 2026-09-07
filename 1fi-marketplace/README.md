# 1Fi Marketplace — Shop page feature

Implementation of the **1Fi Marketplace** section inside the Shop page, per the
SDE Intern assignment. Built with **React Native (Expo) + TypeScript**.

## What changed after seeing real screenshots

The first pass was built blind from the spec. After seeing screenshots of the
actual app, the whole Shop surface was rebuilt to match it:

- **Palette**: deep violet primary (`#6D28D9`), lavender chip/badge surfaces,
  soft-shadow cards instead of hard borders, off-white page background —
  replacing an earlier generic navy/teal guess.
- **Layout**: the real Shop screen is a purple gradient hero banner
  ("Shop today, Pay later using Mutual funds") followed by a **pill-shaped
  segmented switcher** (Top Brands / Nearby Stores) and a search bar — not a
  list of three separate menu cards. **1Fi Marketplace is added as a third
  segment** in that same switcher, since it doesn't exist in the real app yet
  (confirmed from the screenshots — only Top Brands and Nearby Stores are
  there today). Top Brands and Nearby Stores are left blank, per the
  assignment.
- **Bottom navigation**: the real app has a floating 5-tab bar (Home / Shop /
  EMI Dues / Limit / Profile) on every screen. It's replicated here; the four
  tabs outside this assignment's scope route to a lightweight placeholder
  screen (styled after the real "Profile" screen's left-aligned heading) so
  the bar is never a dead tap.
- **Headers**: drill-down screens (product detail, order confirmation) use a
  minimal floating circular back button rather than a bordered app bar,
  matching the app's borderless style.

> **Remaining honest gaps**: the hero banner's illustration (phone/laptop/car
> bursting from a shopping bag) is a custom asset I don't have, stood in with
> an emoji cluster so the copy/gradient/layout are faithful even though the
> artwork isn't. Icons throughout are Unicode/emoji rather than the app's
> real icon set, for the same reason. Bottom-tab navigation is approximated
> with stack `navigate`/`replace` calls rather than a real
> `@react-navigation/bottom-tabs` tab navigator, to avoid adding a dependency
> for four screens that are explicitly out of scope — swapping in a real tab
> navigator later is a contained change (`BottomTabBar` already models the
> five destinations).

## Running it

```bash
npm install
npm start        # then press i / a / w, or scan the QR code in Expo Go
```

## What's implemented

**Shop screen** (`ShopHomeScreen`) with hero banner, a 3-segment switcher, and
a search bar:
- **Top Brands** — blank, per spec.
- **Nearby Stores** — blank, per spec.
- **1Fi Marketplace** — fully built:
  - Searchable product grid (image, brand, name, starting price, "No Cost
    EMI" badge) as a `FlatList` with the hero/switcher/search as its header,
    so there's one scrollable surface rather than a list nested in a
    scroll view.
  - Product detail screen: image gallery with floating back button,
    name/brand/rating, price with MRP/discount, variant selector,
    highlights, description.
  - EMI section: plans are fetched (mocked) **per selected variant's
    price**, so switching variants re-triggers a calculation with its own
    loading state — not a static hardcoded list.
  - EMI plan selection (radio-style cards) showing tenure, monthly amount,
    interest rate or "No Cost EMI" badge, and total payable.
  - Sticky bottom bar with the selected plan's monthly amount and a
    **Proceed** CTA, disabled until a plan is chosen.
  - Review & Confirm screen summarizing product, variant, and EMI plan, with
    a final confirm action (mocked — no real payment).
  - Loading, error (with retry), and empty states throughout.
- **Bottom tab bar** (Home / Shop / EMI Dues / Limit / Profile) on every
  screen reached from Shop.

## Structure

```
src/
  theme/            color/typography/spacing tokens, matched to the real app
  navigation/        RootNavigator + typed param list
  data/
    types.ts          Product/Variant/EMI domain types
    mockProducts.ts    sample catalog (stand-in for a real backend)
    mockApi.ts         async functions with simulated delay + configurable
                        failure rate — the one file that would change to
                        point at a real backend
  utils/
    currency.ts        INR formatting, discount % calculation
    emiCalculator.ts    reducing-balance EMI math (pure, unit-testable)
  hooks/
    useAsync.ts            generic loading/error/data/refetch wrapper
    useProducts.ts, useProductDetail.ts, useEmiPlans.ts
  components/
    common/    ScreenContainer, AppHeader, CircularIconButton, Button,
               SearchBar, LoadingState, ErrorState, EmptyState, SectionHeader
    shop/      ShopHeroBanner, SegmentedTabs, ShopTopSection, BottomTabBar
    marketplace/  ProductCard, MarketplaceSection, VariantSelector,
                  EMIPlanCard, PriceSummaryBar
  screens/
    shop/         ShopHomeScreen, PlaceholderScreen (Home/EMI Dues/Limit/Profile)
    marketplace/  ProductDetailScreen, OrderConfirmationScreen
```

## Design decisions worth calling out

- **No hardcoded EMI numbers.** EMI plans are stored as *templates* (tenure,
  interest rate, processing fee, no-cost flag); monthly amount and total
  payable are computed on the fly against whichever variant price is
  selected, via `computeEmiPlan` (standard reducing-balance formula).
- **Data layer is fetch-shaped, not hardcoded into components.** Every screen
  reads through a hook that wraps a promise-returning `mockApi.ts` function.
  Screens never import `mockProducts.ts` directly.
- **Loading/error states are systematic.** `useAsync` is the one place that
  owns loading/error/refetch semantics; `LoadingState`/`ErrorState`/
  `EmptyState` are the one set of components that render them.
  `MOCK_API_CONFIG.simulatedFailureRate` in `mockApi.ts` can be bumped up to
  exercise the error/retry paths while testing.
- **One shared shell, three segments.** `ShopTopSection` (hero + switcher +
  search) is identical regardless of which segment is active — Marketplace
  isn't a bolted-on separate page, it plugs into the same shell Top Brands
  and Nearby Stores use.

## What I'd do next with more time / real access to the app

- Replace `mockApi.ts` with real API calls once endpoints exist.
- Swap the emoji icon set and hero illustration for the app's real assets.
- Move bottom-tab navigation to `@react-navigation/bottom-tabs`.
- Add unit tests for `emiCalculator.ts` and component tests for the EMI
  selection flow.
- Add pagination/search debouncing if the real catalog is large.
