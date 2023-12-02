// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import { render, screen, fireEvent } from "@testing-library/react"
test('The page renders', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByRole('button')
  expect(SubmitButton).toBeVisible()
})
test('Clicking submit without email causes error', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByRole('button')
  fireEvent.click(SubmitButton)
  const errorText = screen.getByText(/email is required/i)
  expect(errorText).toBeVisible()
})
