# DevLog — Sledilnik delovnega časa

Enostranska aplikacija za sledenje delovnega časa in upravljanje nalog po projektih.  
Zgrajena z Angular 19 kot portfolio projekt — brez zalednega sistema, brez podatkovne baze, deluje v celoti v brskalniku.

---

## Hiter začetek

**Zahteve:** Node.js 18+, npm

```bash
# Kloniraj repozitorij
git clone https://github.com/DmitriiKasapov/pet-angular.git
cd pet-angular

# Namesti odvisnosti
npm install

# Zaženi razvojni strežnik
npm start
```

Odpri naslov, prikazan v terminalu, v brskalniku.

> Ob prvem zagonu aplikacija samodejno naloži demo podatke: 3 projekte, 11 nalog, 15 vnosov worklog in 5 komentarjev — tako lahko takoj preizkusiš vse funkcije.

---

## Shranjevanje podatkov

Vsi podatki so shranjeni v **localStorage** — nič se ne pošilja na strežnik.  
Za ponastavitev na izvirne demo podatke: odpri DevTools → Application → Local Storage → izbriši vse ključe, ki se začnejo z `worklog-`.

---

## Tehnologije

- **Angular 19** — samostojne komponente, signali, leno nalaganje poti
- **TypeScript** — stroga tipizacija
- **Tailwind CSS v4** — utilitarno oblikovanje z dizajnerskimi žetoni
- **Reactive Forms** — upravljanje obrazcev in validacija
- **Brez zunanjih UI knjižnic** — vse komponente so napisane ročno

---

## Funkcionalnosti

### Tedenska tabla `/board` ← privzeta stran
- Vizualna časovna mreža za tekoči teden (Pon–Ned)
- Vsi vnosi worklog so prikazani kot bloki na mreži
- **Klik na stolpec** — ustvari nov vnos za ta dan
- **Povleci blok** med dnevi — premakni vnos
- **Raztegni blok** za spodnji rob — spremeni trajanje
- **Uredi ali izbriši** vnos z gumbi ob lebdenju
- Navigacija med tedni: Nazaj / Naprej; gumb »Today« vrne na tekoči teden

### Projekti `/projects`
- Seznam vseh projektov z imenom, kodo in opisom
- **Ustvari projekt** — ime, kratka koda (npr. `INT`), opis, barva
- **Iskanje** projektov po imenu, kodi ali imenu naloge
- Klik na projekt odpre njegovo stran

### Stran projekta `/projects/:id`
- **Zavihek »Naloge«** — seznam nalog s statusnimi oznakami in zabeleženi urami
  - Iskanje nalog po kodi ali naslovu
  - **Ustvari nalogo** — naslov, opis, status, ocena ur
  - Klik na nalogo odpre njeno stran
- **Zavihek »Analitika«** — ure po nalogah s progresnimi vrsticami, razvrščeno po porabljenem času

### Stran naloge `/tasks/:id`
- Polne informacije o nalogi: koda, naslov, opis, status, ocena
- **Spremeni status** — V načrtovanju → V teku → Končano
- **Zabeleži čas** — datum, čas začetka, trajanje, neobvezen komentar
- Seznam vnosov s skupnimi urami
- **Komentarji** — dodaj, uredi, izbriši

### Analitika `/analytics`
- Tedenski povzetek: skupne ure in število vnosov
- **Po dnevih** — stolpčni grafikon za vsak dan v tednu
- **Po projektih** — barvne vrstice, razvrščeno po urah padajoče
- **Po nalogah** — tabela s kodo, naslovom, projektom, statusom in urami
- Navigacija med tedni; gumb »Today« vrne na tekoči teden
