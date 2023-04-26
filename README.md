# AnkiAce

You can visit here https://ankiace-production.web.app/

### What is anki?
**anki** - A computer program designed for learning through the method of spaced repetition, where the frequency of repetitions depends on the level and pace of mastering the material. My app is based on it.

# How it work
### 1. Sign In
First, you need to sign in using Google or email.

### 2. Main panel and menu
After signing in, we can see the **main panel** and **menu**

### 3. Creating a new deck
In the middle of the main panel, we can see a button labeled **"Stwórz nową talię" (in the future after add EN - "create new deck")**. Clicking on this button will take us to the **new deck creation panel**.

### 4. New deck creation panel
There we need to set 2 things to our deck: **title** and **color**. Dont worry, we can edit both values at any time.

### 5. Managing a created flashcard deck
After creating a flashcard deck, we can open it. Once we have opened the deck, in the upper right corner, we can see 3 options: **delete**, **edit**, and **add to favorites**

### 6. Creating a new flashcard
In the middle of the main panel, we can see a button that, when clicked, takes us to the **new flashcard creation panel**

### 7. Flashcard creation panel
In flashcard creation panel we need to write **front side of flashcard (question)** and **back side of flashcard (answer)**

### 8. Starting the study session
After creating flashcards, we can finally **start studying**. To begin studying, we need to click on the button in the upper left corner labeled **"Start nauka!" (in the future after add EN - "Start study!")** If there writes instead **"Odpoczynek" (in the future after add EN - "Rest")** don't worry! It means that you have learned all you need for now, and you can take a break or add new flashcards if you can't get enough of studying. ;D

### 8. Study panel
After starting the study, we can see the study panel. In the upper middle, we can see the **question (front side of the flashcard)**, and below it, there is a button labeled **"Sprawdz!" (in the future after adding EN - "Show answer!")**. After clicking on it, we can see the **answer (back side of the flashcard)** to the question. At the bottom of the study panel, there are three options:\
**1.** A red button labeled "Fatalnie" (in the future after adding EN - "Bad").\
**2.** A cream button labeled "Pół na pół" (in the future after adding EN - "Half and half").\
**3.** A green button labeled "Łatwe!" (in the future after adding EN - "Easy").


# How study its work?
First of all, read the question on the front side of the flashcard and answer it to yourself. Next, click on the **"Sprawdz!" (in the future after adding EN - "Show answer!")** button to check if your answer matches the answer on the back side of the flashcard. Then, decide how well you know the flashcard by selecting one of the options using the buttons at the bottom: bad, half and half, easy. The system will calculate when you need to review the flashcard again.

### Part of the code which calculates when the user should review the flashcard again.
```
src/Pages/MainPanel/Content/StudyPanel/StudyPanel.js -> function lvlRead(lvl)
```

**Whan properties in the object mean after return lvlRead(lvl)**
```
{
    medium: - time in minutes to next study after choose option half and half,
    mediumLVL: - next lvl after choose option half and half,
    mediumNext: - the word that will be on the button labeled "Pół na pół!" (in the future after add EN - "Half and half"),
    good: - time in minutes to next study after choose option easy,
    goodLVL: - next lvl after choose option easy,
    goodNext: - the word that will be on the button labeled "Łatwe!!" (in the future after add EN - "Easy")
}
```

# What was hard?
It was not easy for me to create the hook **useSevenDayWeek.js**. I spent a lot of time on it and needed to draw it out to understand how it works.

**useSevenDayWeek.js location:**
```
src/hooks/useSevenDayWeek.js
```
**The hook returns an array with 7 elements:**
```
{
    day: - day of the week (mon - sun) [1-7],
    date: - day of the month [1-31],
    future: - is this date in future from now? [true/false],
    theDay: - is this date today date? [true/false],,
    planned: - never used now but i kept it for potential development of the application
}
```
# What I learn?
### React Quill2
```
npm i react-quill
```
React-Quill is a React component library that enables easy creation of text editors with a user interface based on the WYSIWYG format. React-Quill uses the Quill.js library, which is based on JavaScript and allows for text editing using formatting templates, including bold, italics, underlines, lists, and headers. React-Quill adds a React interface to Quill.js, making it easy to integrate the text editor with a React application. This allows developers to create text editors of varying complexity and customized to the needs of their application.

### React Icons
```
npm i react-icons
```
React Icons is a library of popular icon packs that can be easily used in React projects. It provides a wide range of customizable, scalable, and accessible icons from popular icon sets such as Font Awesome, Material Design, and Feather Icons. React Icons enables developers to easily add icons to their React applications without having to manually manage and import individual icons.

### I experimented with the composition of folders and files.
I tried to organize most of the files and folders into the **/pages** folder and sorted them according to the part of the website ther are responsible for, but in the end, I think it was a bad idea. It's better to create a **/components** folder.
