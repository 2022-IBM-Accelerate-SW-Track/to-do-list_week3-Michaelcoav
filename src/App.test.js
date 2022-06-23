import { fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('test that App component renders', () => {
  render(<App />, container);
 });


test('test that new-item-button is a button', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-button');
  expect(element.innerHTML.toLowerCase().includes("button")).toBe(true)
});


test('test that new-item-input is an input ', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-input');
  expect(element.innerHTML.toLowerCase().includes("input")).toBe(true)
});


test('test no duplicate items', () => {
  render(<App />, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: "Due Date"});
  const submitButton = screen.getByRole('button', {name: /Add/i});

  const dueDate1 = "06/29/2002";
  const dueDate2 = "06/30/2002";

  fireEvent.change(inputTask, {target: {value: "Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate1}});
  fireEvent.click(submitButton);

  fireEvent.change(inputTask, {target: {value: "Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate2}});
  fireEvent.click(submitButton);

  // checks if due date, is on the screen
  const dupTaskDate = screen.queryByText(new RegExp(dueDate2, "i"));

  // checks if there is one task, called Test
  const firstTask = screen.getByText(/Test/i);

  // expects the task to be in the document
  expect(firstTask).toBeInTheDocument();

  // expects the duplicate due date to not be in the document
  expect(dupTaskDate).toBeNull();
});


test ('test task with no due date can not be submitted', () => {
  render(<App />, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const submitButton = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, {target: {value: "Test"}});
  fireEvent.click(submitButton);

  // searches tasks with Test
  const noDueDate = screen.queryByText(/Test/i);

  // makes sure there are not task with Test, because no due date was submitted
  expect(noDueDate).toBeNull();
});


test ('test task without task name can not be submitted', () => {
  render(<App />, container);
  const inputDate = screen.getByRole('textbox', {name: 'Due Date'});
  const submitButton = screen.getByRole('button', {name: /Add/i});

  const dueDate = "06/22/2022";

  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(submitButton);

  // searches tasks with due date
  const noTaskName = screen.queryByText(new RegExp(dueDate, "i"));

  // makes sure there are not task with due date, because no task name was submitted
  expect(noTaskName).toBeNull();
});


test ('test late tasks have different colors', () => {
  render(<App />, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: "Due Date"});
  const submitButton = screen.getByRole('button', {name: /Add/i});

  const dueDate = "06/22/2002";

  fireEvent.change(inputTask, {target: {value: "Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(submitButton);

  // searches tasks, and gets background property
  const lateTask = screen.getByTestId(/Test/i).style.background;

  // expects the background property to be red
  expect(lateTask).toBe('red');
});


test ('test delete task', () => {
  render(<App />, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: "Due Date"});
  const submitButton = screen.getByRole('button', {name: /Add/i});

  const dueDate = "06/24/2002";

  fireEvent.change(inputTask, {target: {value: "Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(submitButton);

  // gets the checkbox role based on the label
  const deleteButton = screen.getByRole('checkbox', {label: "Delete Checkbox"});

  // checks if the delete button is in the document
  expect(deleteButton).toBeInTheDocument();
});