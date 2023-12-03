// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import { render, screen, fireEvent } from "@testing-library/react"
test('The page renders', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByText(/submit/i)
  expect(SubmitButton).toBeVisible()
})
test('Clicking submit without email causes error', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByRole('button')
  fireEvent.click(SubmitButton)
  const errorText = screen.getByText(/email is required/i)
  expect(errorText).toBeVisible()
})
test("Clicking up twice renders you can't go up error)", () => {
  render(<AppClass />)
  const upButton = screen.getByText(/up/i)
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  fireEvent.click(upButton)
  const errorUp = screen.getByText(/you can't go/i)
  expect(errorUp).toBeVisible()
})
test('Submit with valid email returns win', () => {
  const emailInput = screen.getByLabelText(/email/i)
  fireEvent.type(emailInput, 'wearytwo@gmail.com')
  const winner = screen.getByText(/win/i)
  expect(winner).toBeVisible()
})
test('Reset button works', () => {
  const upButton = screen.getByText(/up/i)
  fireEvent.click(upButton)
  const resetButton = screen.getByText(/reset/i)
  fireEvent.click(resetButton)
  const winner = screen.getByText(/win/i)
  expect(winner).not.toBeVisible()
})