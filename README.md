# Task Manager

A simple task management application built with **HTML, CSS and Vanilla JavaScript** to practice DOM manipulation, application state management, form validation and browser persistence.

## Features

* Create new tasks
* Validate user input before creating tasks
* Display validation errors
* Mark tasks as completed
* Delete tasks
* Show an empty state when no tasks exist
* Persist tasks using `localStorage`
* Restore application state after refreshing the page
* Generate unique task identifiers

## Concepts Practiced

This project was built as a learning exercise with a strong focus on JavaScript fundamentals rather than frameworks.

Main concepts explored:

* DOM manipulation
* Event handling
* Application state management
* Separation of responsibilities
* Form validation
* Array methods (`map`, `find`, `findIndex`, `splice`)
* Browser storage (`localStorage`)
* JSON serialization (`JSON.stringify` / `JSON.parse`)
* Rendering UI from application state
* Basic accessibility (`aria-label`)

## Project Structure

The application follows a simple flow:

```text
User Interaction
        │
        ▼
 Read Form Data
        │
        ▼
 Validate Input
        │
        ▼
 Update Application State
        │
        ▼
 Persist State
        │
        ▼
 Render UI
```

## Technologies

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)

## Learning Goals

The objective of this project was to gain a deeper understanding of how a frontend application works without relying on frameworks or external libraries.

Instead of focusing on advanced features, the project emphasizes:

* writing small functions with a single responsibility;
* understanding how state changes over time;
* keeping the UI synchronized with the application state;
* persisting data between browser sessions;
* building a maintainable code structure.

## Future Improvements

Possible extensions include:

* Edit existing tasks
* Search and filter tasks
* Sort tasks
* Task categories
* Due dates
* Drag-and-drop task ordering
* Unit tests
* Modular JavaScript structure
* Backend persistence with an API

---

This project was created for educational purposes as part of a journey to strengthen JavaScript fundamentals and software engineering practices.
