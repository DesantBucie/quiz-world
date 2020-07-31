# Aplikacja QuizWorld - pod nazwą kodową Antila - jest to prosty quiz onile, który posiada kategorie pytań.

Używaliśmy do tworzenia aplikacji programu Visual Studio oraz Visual Studio Code.

Samuel Kalwik - backend
Jakub Truszkowski - frontend

Aplikacja zbudowana jest z dwóch modułów - Frontend i Backend. Frontent wykonany jest przy użyciu frameworka
React.js. Backend to zasadniczo WebAPI - wykonane przy użyciu frameworka .Net Core. Wystwia one kilka adresów
URL, z których frontend konsumuje dane w formacie JSON. Aplikacja przy pierwszym użyciu automatycznie tworzy bazę
danych z predefiniowanym zestawem pytań w trzech kategoriach. Wszystkie dane są w niej na stałe zapisane, właściwa 
aplikacja korzysta z nich.


## Użyte narzędzia:
-Reactjs - framework,
-typescirpt - tworzenie interfejsu użytkownika i zapewnienia bezpieczeństwa typów danych.
-git - system rozwoju
-redux - szybki zapis stanu zmiennych
-bootstrap - biblioteka css, aby zapewnić stronie kompatybilność na różnych urządzeniach.
-npm - menedżer pakietów JS/TS
-C# - klasowy język podobny do Javy, rozwijany jako wielkofunkcyjne zastępstwo c++
-Entity - framework służący połączeniu bazy danych z aplikacją
-axios - klient odbierający lub wysyłąjący dane przez API.

1.1 React to biblioteka javascript rozwijana przez facebook, zapewnia pewne szablony rozwoju aplikacji, 
podział na komponenty poszczególnych składników
1.2 Typescirpt to w pełni kompatybilna nadbiblioteka języka javascript, 
która kompiluje się do normalnego kodu JS, zapewnia jednak takie rozwiązania jak określenie typu zmiennej np.
```
type State = {
    numer:number,
    lancuch_znakow:string,
    tablica:Array<any>,
    objekt:object
} 
```
1.3. Git ułatwia pracę w kilka osób, pokazując dokładnie zmiany i umożliwiając powrotu do staszych wersji kodu.
1.4. Redux to oparty na funkcjach "magazyn" zmiennych, dość trudny w implementacji.
1.5. Bootstrap - framework css stworzony przez programistów twittera, steruje szerokościami elementów 
w zależności od wielkości ekranu. 
1.6.npm - node packet manager - wszystkie powyższe pakiety poza gitem są pobrane dzięki temu narzędziu
1.7 C# - używany na backendzie jak WebAPI i biblioteki. Aplikacja składa się z trzech części - WebAPI, Antila.Core 
i Antila.Data. WebAPI wystawia kilka adresów URL, z których frontend może konsumować dane. W Antila.Core znajduje się
rdzeń aplikacji, czyli podstawowe modele danych. Antila.Data służy do komunikacji z bazą danych przy użyciu Entity 
Framework. Znajduje się w niej interfejs, który używany jest do komunikacji z WebAPI.
1.8 Baza danych MS SQL - baza danych typu SQL z której pytania wysyłane są dzieki backendowi do frontu i odbierane
interfejsem programistycznym tzw API przez axios. 
1.9 Axios - Odbiera pytania z bazy danych i ustawia dla nich zmienne

## Napotkane Problemy:
1.Frontend
1.1- Idea Reacta jest odmienna w stosunku do normalnego html, kod html/xml zwracają funkcje JS/TS.
1.2- Style jeśli używane w pliku TSX są przypisywane do zmiennych, i mają inne nazwy lub wartości niż normalny css.
1.3- axios jest tylko obietnicą, wiec może zawieść, dlatego potrzeba ekranu ponownego załadowania.
1.4- setState funkcja ustawiania stanu zmiennej, jest asynchroniczna, co oznacza, że wykona się tylko na zawołanie, 
dopiero poźniej zmieniając stan, użyte zostało await co oznacza oczekiwanie na zwrot wyniku funkcji.
1.5. - iteracja przez tablicę pytań zawodziła, szczególnie gdy ilośc pytań jest zmienna od sesji.
1.6 - Typescript jak nazwa wskazuje jest bezpiecznie typowany, co zmusza do określania typów zmiennych.
1.7- Redux był czymś kompletnie niezrozumiałym i nadal trochę jest, do przechowywania jednej zmiennej potrzebny było
bardzo duzo kodu, ale jest szybko.

![Alt text](.github/React1.png?raw=true "Strona Główna")
![Alt text](.github/React2.png?raw=true "Wybór Kategorii")
![Alt text](.github/React3.png?raw=true "Pytanie")
![Alt text](.github/React4.png?raw=true "Podsumowanie")
