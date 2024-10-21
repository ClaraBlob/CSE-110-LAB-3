import { render, screen, fireEvent, getByTestId} from "@testing-library/react";
import { assert } from "console";
import { dummyNotesList } from "./constants";
import { StickyNotes } from "./stickyNotes";
import { ToDoList } from "./toDoList";


describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

});

describe("Read Notes", () => {
 test("read created notes", () => {
   const dummyNotes = dummyNotesList;
   render(<StickyNotes/>);
   /*render(<StickyNotes/>);
   const createNoteButton = screen.getByText("Create Note");
   fireEvent.click(createNoteButton);
   const { container } = render(<StickyNotes />)
   
  expect(container.getElementsByClassName('note-item').length).toBe(7);*/



   //const elements = screen.getAllByClassName('my-class');

  dummyNotes.forEach(note=> {
    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(note.content)).toBeInTheDocument();
  });
  const title = screen.getAllByRole('heading', { name: 'title' });
  expect(title).toHaveLength(dummyNotes.length);
 });
 /* test("read created note", () => {
   const dummyNotes = dummyNotesList;
   render(<StickyNotes/>);

   const { container } = render(<StickyNotes />)

  expect(container.getElementsByClassName('note-item').length).toBe(6);



   //const elements = screen.getAllByClassName('my-class');

  dummyNotes.forEach(note=> {
    expect(screen.queryAllByText(note.title)).toBeInTheDocument();
    expect(screen.queryAllByText(note.content)).toBeInTheDocument();
    expect(screen.queryAllByText(note.label)).toBeInTheDocument();
  });
 });*/

});

describe("Change Theme", () => {

  test("Toggle theme button", () => {
    render(<StickyNotes/>);
    const toggleThemeButton = screen.getByText("Toggle Theme");
    expect(toggleThemeButton).toBeInTheDocument();
  });

  /*test("Theme change", () => {
    render(<StickyNotes/>);
    const toggleThemeButton = screen.getByText("Toggle Theme");
  });*/
});

describe("Updated Note", () => {
  test("check if note title is updated", () => {
    render(<StickyNotes/>);
    const updatedTitle = "hello";
    

    const changedTitle = screen.getAllByRole('heading', { name: 'title' });
    const editButton = screen.getAllByRole('button', {name : 'edit-button' });

    expect(editButton[0]).toBeInTheDocument();
    expect(changedTitle[0]).toBeInTheDocument();

    fireEvent.click(editButton[0]);
    fireEvent.click(changedTitle[0]);


   fireEvent.blur(changedTitle[0], { target: { textContent: updatedTitle } });

   expect(screen.getByText(updatedTitle)).toBeInTheDocument();
   expect(changedTitle[0].textContent).toBe(updatedTitle);

 });
 test ("check if note content is updated", () => {
  render(<StickyNotes/>);
  const updatedContent = "hi";

  const changedContent = screen.getAllByTestId('content');
  const editButton = screen.getAllByRole('button', {name : 'edit-button' });

  expect(editButton[0]).toBeInTheDocument();
  expect(changedContent[0]).toBeInTheDocument();

  fireEvent.click(editButton[0]);
  fireEvent.click(changedContent[0]);
  fireEvent.blur(changedContent[0], { target: { textContent: updatedContent } });

  expect(screen.getByText(updatedContent)).toBeInTheDocument();
  expect(changedContent[0].textContent).toBe(updatedContent);
 });

  test ("check if note label is updated", () => {
  render(<StickyNotes/>);
  const updatedLabel = "work";

  const changedLabel = screen.getAllByTestId('label');
  const editButton = screen.getAllByRole('button', {name : 'edit-button' });

  expect(editButton[0]).toBeInTheDocument();
  expect(changedLabel[0]).toBeInTheDocument();

  fireEvent.click(editButton[0]);
  fireEvent.click(changedLabel[0]);
  fireEvent.blur(changedLabel[0], { target: { textContent: updatedLabel } });

  expect(screen.getAllByText(updatedLabel)[0]).toBeInTheDocument();
  expect(changedLabel[0].textContent).toBe(updatedLabel);
 });
});

describe("Deleted Note", () => {
  test("check if note is deleted", () => {
    render(<StickyNotes/>);
    const deleteButton = screen.getAllByRole('button', { name: /delete-button/i } );
    fireEvent.click(deleteButton[0]);
    expect(deleteButton[0]).not.toBeInTheDocument();
 });
 
  test("check if there are 0 sticky notes", () => {
    render(<StickyNotes/>);
    const deleteButton = screen.getAllByRole('button', { name: /delete-button/i } );
    const title = screen.getAllByRole('heading', { name: 'title' });
    deleteButton.forEach((note) => {
      fireEvent.click(note);
      expect(title[0]).not.toBeInTheDocument();
      title.shift();
    })
    expect(title).toHaveLength(0);
 });
});



/*describe("Read To-Do List", () => {
  test("check banana and apple", () => {
   render(<ToDoList />);

   const bananas = screen.getByText("Bananas");
   expect(bananas).toBeInTheDocument();

   const apples = screen.getByText("Apples");
   expect(apples).toBeInTheDocument();
 });
});*/

/*describe("Check ToDo list number", () => {
  test("List number", () => {
   render(<ToDoList />);
  const checkbox = screen.getAllByRole('checkbox');
  fireEvent.click(checkbox[1]);
 });
});*/
