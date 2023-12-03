// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import { render, screen, fireEvent } from "@testing-library/react"
test('The page renders', () => {
  render(<AppClass />)
  const SubmitButton = screen.getby('Submit')
  expect(SubmitButton).toBeVisible()
})
test('Clicking submit without email causes error', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByText('Submit')
  fireEvent.click(SubmitButton)
  const errorText = screen.getByText('email is required')
  expect(errorText).toBeVisible()
})
test("Clicking up twice renders you can't go up error)", () => {
  render(<AppClass />)
  const upButton = screen.getByText('UP')
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  const errorUp = screen.getByText("You can't go")
  expect(errorUp).toBeVisible()
})
test('Submit with valid email returns win', () => {
  const emailInput = screen.getByLabelText('type email')
  fireEvent.type(emailInput, 'wearytwo@gmail.com')
  const winner = screen.getByText('win')
  expect(winner).toBeVisible()
})
test('Reset button works', () => {
  const upButton = screen.getByText("UP")
  fireEvent.click(upButton)
  const resetButton = screen.getByText('reset')
  fireEvent.click(resetButton)
  const winner = screen.getByText('win')
  expect(winner).not.toBeVisible()
})