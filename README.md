# 🧊 eyeFridge

**eyeFridge** to inteligentna aplikacja do zarządzania zawartością lodówki. Projekt został stworzony na olimpiadę informatyczną, na której udało nam się zdobyć tytuł **finalisty**. 🏆

---

## 📖 Opis projektu

eyeFridge pozwala użytkownikom śledzić produkty przechowywane w lodówce w czasie rzeczywistym. Aplikacja wykorzystuje kamerę i sztuczną inteligencję do automatycznego rozpoznawania produktów spożywczych – wystarczy pokazać produkt kamerze, a system sam zadba o aktualizację stanu lodówki.

### Główne funkcjonalności

- 📸 **Rozpoznawanie produktów** – kamera przechwytuje obraz, który jest analizowany przez **LogMeal API** (AI do rozpoznawania żywności). Pozycja produktu względem osi kamery decyduje o akcji: lewa strona dodaje produkt do lodówki, prawa go usuwa.
- 📋 **Śledzenie zawartości lodówki** – lista produktów wraz z datą dodania, synchronizowana z bazą danych.
- ⏰ **Powiadomienia o przeterminowanych produktach** – push notyfikacje przypominające o produktach, którym kończy się termin ważności.
- 🛒 **Lista brakujących produktów** – podgląd artykułów, których brakuje w lodówce.
- 🌙 **Tryb jasny / ciemny** – pełne wsparcie dla motywu jasnego i ciemnego.

---

## 🛠️ Technologie

### Frontend – aplikacja mobilna

| Technologia | Opis |
|---|---|
| [React Native](https://reactnative.dev/) | Framework do budowy aplikacji mobilnych na iOS i Android |
| [Expo](https://expo.dev/) | Platforma ułatwiająca tworzenie i wdrażanie aplikacji React Native |
| [React Navigation](https://reactnavigation.org/) | Nawigacja między ekranami (native-stack, stack) |
| [React Native Paper](https://reactnativepaper.com/) | Komponenty Material Design (karty, przyciski, paski aplikacji) |
| [NativeWind](https://www.nativewind.dev/) + [Tailwind CSS](https://tailwindcss.com/) | Stylowanie komponentów przy użyciu klas Tailwind |
| [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Push notyfikacje o przeterminowanych produktach |

### Backend – serwer API

| Technologia | Opis |
|---|---|
| [Rust](https://www.rust-lang.org/) | Język programowania zapewniający wysoką wydajność i bezpieczeństwo pamięci |
| [Actix-web](https://actix.rs/) | Wydajny framework HTTP do budowy REST API |
| [Tokio](https://tokio.rs/) | Asynchroniczny runtime dla Rust |
| [Prisma Client Rust](https://prisma.brendonovich.dev/) | ORM do komunikacji z bazą danych |
| [nokhwa](https://github.com/l1npengtul/nokhwa) | Przechwytywanie obrazu z kamery |
| [reqwest](https://github.com/seanmonstar/reqwest) | Klient HTTP do komunikacji z zewnętrznymi API |
| [serde / serde_json](https://serde.rs/) | Serializacja i deserializacja danych JSON |

### Baza danych

| Technologia | Opis |
|---|---|
| [MySQL](https://www.mysql.com/) | Relacyjna baza danych do przechowywania zawartości lodówki |

### Zewnętrzne API

| API | Opis |
|---|---|
| [LogMeal API v2](https://www.logmeal.com/) | Rozpoznawanie i klasyfikacja produktów spożywczych na zdjęciach |

---

## 🗄️ Schemat bazy danych

```prisma
model Contents {
  id             Int      @id @default(autoincrement())
  type           String   // Nazwa produktu
  insertion_date DateTime // Data dodania do lodówki
}

model PullOut {
  id            Int      @id @default(autoincrement())
  type          String   // Nazwa produktu
  pull_out_data DateTime // Data wyjęcia z lodówki
}
```

---

## 🚀 Uruchomienie projektu

### Backend (Rust)

```bash
cd backend
cargo run
```

Serwer uruchomi się na `http://127.0.0.1:3001`.

### Frontend (React Native / Expo)

```bash
cd eyeFridge
npm install
npx expo start
```

---

## 📡 Endpointy API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/contents` | Pobiera zawartość lodówki posortowaną według daty dodania |
| `GET` | `/pull_out` | Pobiera historię usuniętych produktów |
| `GET` | `/do` | Uruchamia analizę obrazu z kamery i aktualizuje stan lodówki |

---

## 🏆 Olimpiada

Projekt **eyeFridge** został stworzony na potrzeby olimpiady informatycznej. Dzięki temu projektowi udało nam się zdobyć tytuł **finalisty** – jesteśmy z tego osiągnięcia bardzo dumni! 🎉
