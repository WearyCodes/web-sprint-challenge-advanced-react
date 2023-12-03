// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import { render, screen, fireEvent } from "@testing-library/react"
test('The page renders', () => {
  render(<AppClass />)
  const SubmitButton = screen.queryByText('Submit')
  expect(SubmitButton).toBeVisible()
})
test('Clicking submit without email causes error', () => {
  render(<AppClass />)
  const SubmitButton = screen.queryByText('Submit')
  fireEvent.click(SubmitButton)
  const errorText = screen.queryByText('email is required')
  expect(errorText).toBeVisible()
})
test("Clicking up twice renders you can't go up error)", () => {
  render(<AppClass />)
  const upButton = screen.queryByText('UP')
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  const errorUp = screen.queryByText("You can't go")
  expect(errorUp).toBeVisible()
})
test('Submit with valid email returns win', () => {
  const emailInput = screen.queryByLabelText('type email')
  fireEvent.type(emailInput, 'wearytwo@gmail.com')
  const winner = screen.queryByText('win')
  expect(winner).toBeVisible()
})
test('Reset button works', () => {
  const upButton = screen.queryByText("UP")
  fireEvent.click(upButton)
  const resetButton = screen.queryByText('reset')
  fireEvent.click(resetButton)
  const winner = screen.queryByText('win')
  expect(winner).not.toBeVisible()
})